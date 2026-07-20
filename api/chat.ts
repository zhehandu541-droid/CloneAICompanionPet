// Vercel serverless function — proxies chat messages to OpenAI GPT-5 Nano.
//
// Why this file exists: the Tend frontend is a static Vite/React app with no
// backend of its own, so it cannot safely hold an API key (anything shipped
// to the browser can be read by anyone). This function runs only on Vercel's
// server, reads the key from an environment variable, and is the one place
// that talks to the real OpenAI API. The frontend calls POST /api/chat and
// never sees the key. The key is read only from process.env.OPENAI_API_KEY —
// it is never hard-coded, never sent to the client, and never logged.
//
// API used: Chat Completions (`openai.chat.completions.create`), NOT the
// Responses API. Text is read from `completion.choices[0].message.content`.
//
// Known gotcha (root cause of a real bug, see comment near max_completion_tokens
// below): GPT-5-family "reasoning" models — including gpt-5-nano — can spend
// their entire max_completion_tokens budget on hidden reasoning tokens and
// return message.content === "" with finish_reason "length", even though the
// HTTP call itself succeeds. That looked, from the outside, like the AI
// "wasn't being called" when it actually was — the response just had no
// visible text in it. We now treat an empty reply as a failure (500) instead
// of silently returning it with 200.
//
// MEDICAL-SAFETY DESIGN (added — see README-level comment blocks below):
//   1. A hardened system prompt tells the model what it may and may not say.
//   2. A deterministic PRE-CHECK runs on the user's message before the model
//      is ever called. Requests that ask for insulin dosing, treatment
//      changes, or a diagnosis are intercepted here and answered with a
//      fixed, non-AI-generated safety message — the model never sees them.
//      This exists because an LLM's own judgement is not a reliable safety
//      boundary on its own; a deterministic check in front of it is.
//   3. A lightweight OUTPUT check scans the model's reply before it's sent
//      to the frontend, as a second line of defence in case the model still
//      produces something dosing- or diagnosis-shaped despite the system
//      prompt (e.g. if a user rephrases a blocked question in a way the
//      pre-check regexes don't catch, but the model answers unsafely anyway).
//
// Setup:
//   1. npm install (pulls in the `openai` package, added to package.json)
//   2. In the Vercel project settings, add an environment variable named
//      OPENAI_API_KEY with your key from platform.openai.com.
//   3. Deploy. Vercel automatically turns every file under /api into an
//      endpoint at the matching path — no extra config needed for a Vite app.
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are Tend, an AI virtual companion in a low-pressure gamified CGM research prototype. All glucose information shown in this prototype is simulated.

You may provide general educational explanations of glucose trends, suggest non-diagnostic contextual factors that a user may wish to record, support lightweight reflection, and provide calm emotional support.

You must not diagnose, calculate or recommend insulin doses, recommend changes to basal insulin, medication, pump settings, carbohydrate ratios, glucose targets, or treatment plans. Do not claim that a particular factor caused a glucose change.

When a user asks for diagnosis, insulin dosing, treatment changes, or urgent medical decisions, clearly state that you cannot provide that advice. Encourage the user to follow their personal care plan or contact a qualified diabetes healthcare professional. If the user describes severe symptoms or an emergency, advise them to seek urgent medical assistance.

Keep responses concise, calm, non-judgmental, and suitable for a research prototype.

Additional style notes: keep replies to roughly 2-5 sentences of plain, warm prose — no bullet points, no headers, no mention of rewards, streaks, or scores.`;

// ────────────────────────────────────────────────────────────────────────
// 1. DETERMINISTIC PRE-CHECK
// Runs before any request reaches OpenAI. Deliberately simple, readable
// regexes rather than a "smart" classifier — the goal is a predictable,
// auditable safety boundary, not maximum recall. Ordinary trend/context
// questions ("what should I record after a meal?") must never match these.
// ────────────────────────────────────────────────────────────────────────

const DOSE_SIGNALS: RegExp[] = [
  /\bhow (much|many)\b[^.?!]{0,25}\b(insulin|units?)\b/i, // "how much insulin", "how many units"
  /\b(units?)\b[^.?!]{0,25}\b(inject|take|dose)\b/i,      // "units...inject/take/dose"
  /\bcorrection (dose|factor)\b/i,
  /\bcarb(ohydrate)?\s*ratio\b/i,
  /\b(increase|decrease|adjust|change|raise|lower)\b[^.?!]{0,25}\bbasal\b/i,
  /\bbasal\b[^.?!]{0,25}\b(insulin|rate|dose|dosage)\b/i,
  /\bpump settings?\b/i,
  /\bbolus\b/i,
  /\binsulin\s*(dose|dosage|amount)\b/i,
  /\bshould i\s*(take|inject|increase|decrease|adjust|lower|raise)\b[^.?!]{0,25}\binsulin\b/i,
  /\bshould i change\b[^.?!]{0,25}\b(pump|medication|dose|dosage)\b/i,
  /\b(what('?s| is)|tell me) my (correction|insulin)\s*(dose|dosage)\b/i,
];

const DIAGNOSIS_SIGNALS: RegExp[] = [
  /\bdiagnos/i, // diagnose / diagnosis / diagnosed
  /\bwhat caused\b/i,
  /\bwhy\s*(is|did|was)\b[^.?!]{0,40}\b(glucose|sugar|bg|blood sugar)\b[^.?!]{0,25}\b(high|low|spik\w*|drop\w*)\b/i,
  /\bdo i have\b[^.?!]{0,20}\b(diabetes|dka|hypoglycemia|hyperglycemia)\b/i,
  /\bam i\b[^.?!]{0,15}\b(diabetic|hypoglycemic|hyperglycemic)\b/i,
  /\btreat\b[^.?!]{0,20}\b(my )?(diabetes|condition)\b/i,
  /\bcure\b[^.?!]{0,20}\b(my )?diabetes\b/i,
  /\bmedically manage\b/i,
  /\bchange (my )?medication\b/i,
];

const DOSE_FALLBACK_MESSAGE =
  "I cannot calculate insulin doses or recommend treatment changes. Please follow your personal treatment plan or contact your diabetes care team.";

const DIAGNOSIS_FALLBACK_MESSAGE =
  "I cannot diagnose the cause of a glucose reading. I can help you consider general context you may wish to review, such as meals, activity, stress, illness, sleep, or medication timing.";

const GENERIC_SAFETY_MESSAGE =
  "I can help explain general glucose patterns and suggest context you may wish to record, but I cannot provide diagnosis, insulin-dosing advice, or treatment changes. Please follow your personal care plan or contact your diabetes care team.";

function checkSafetyPreCheck(message: string): { blocked: boolean; message?: string } {
  const isDose = DOSE_SIGNALS.some(re => re.test(message));
  if (isDose) return { blocked: true, message: DOSE_FALLBACK_MESSAGE };

  const isDiagnosis = DIAGNOSIS_SIGNALS.some(re => re.test(message));
  if (isDiagnosis) return { blocked: true, message: DIAGNOSIS_FALLBACK_MESSAGE };

  return { blocked: false };
}

// ────────────────────────────────────────────────────────────────────────
// 3. OUTPUT SAFETY CHECK
// A second, lightweight pass over the model's own reply. Only fires on
// fairly specific shapes (a numeric insulin amount, an explicit instruction
// to change basal/pump/medication, or a confident diagnostic claim) so it
// does not accidentally swallow ordinary mmol/L numbers or trend talk.
// ────────────────────────────────────────────────────────────────────────

const OUTPUT_UNSAFE_PATTERNS: RegExp[] = [
  /\b\d+(\.\d+)?\s*(units?|u)\b[^.?!]{0,30}\binsulin\b/i,
  /\binsulin\b[^.?!]{0,30}\b\d+(\.\d+)?\s*(units?|u)\b/i,
  /\b(increase|decrease|raise|lower|reduce|adjust)\b[^.?!]{0,40}\bbasal\b/i,
  /\b(increase|decrease|raise|lower|reduce|change|adjust)\b[^.?!]{0,40}\b(pump settings?|medication|dosage|correction dose|carb(ohydrate)?\s*ratio)\b/i,
  /\byou (definitely|certainly|clearly) have\b/i,
  /\bthis (confirms|proves) (that )?you have\b/i,
  /\bi (can confirm|confirm) that you have\b/i,
  /\byour diagnosis is\b/i,
];

function checkOutputSafety(text: string): boolean {
  return OUTPUT_UNSAFE_PATTERNS.some(re => re.test(text));
}

type ChatTurn = { from: "user" | "pet"; text: string };

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // 6. API SECURITY — the key is read only from the environment, never
  // logged, never echoed to the client, and this file never runs in the
  // browser (it's a Vercel serverless function under /api).
  if (!process.env.OPENAI_API_KEY) {
    console.error("api/chat: OPENAI_API_KEY is not set.");
    res.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    const { message, history, context } = body as { message?: string; history?: ChatTurn[]; context?: string };

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing 'message' in request body." });
      return;
    }

    // Deterministic pre-check — runs before OpenAI is ever called. No user
    // message content is logged here or anywhere else in this file.
    const preCheck = checkSafetyPreCheck(message);
    if (preCheck.blocked) {
      console.log("api/chat: request intercepted by safety pre-check");
      res.status(200).json({ type: "safety_boundary", message: preCheck.message });
      return;
    }

    const system = context
      ? `${SYSTEM_PROMPT}\n\nContext about the user's (simulated) recent data, for reference only:\n${context}`
      : SYSTEM_PROMPT;

    // Keep only the last few turns so requests stay small and cheap.
    const priorTurns = Array.isArray(history) ? history.slice(-10) : [];
    const messages = [
      { role: "system" as const, content: system },
      ...priorTurns.map(m => ({
        role: (m.from === "user" ? "user" : "assistant") as "user" | "assistant",
        content: m.text,
      })),
      { role: "user" as const, content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      // GPT-5-family reasoning models spend part of this budget on hidden
      // reasoning tokens before writing any visible content. 300 was too
      // tight and could leave zero tokens for the actual reply. 600 gives
      // headroom; reasoning_effort: "low" also reduces how much of the
      // budget reasoning eats into for a short, conversational reply like this.
      max_completion_tokens: 600,
      reasoning_effort: "low",
      messages,
    });

    const choice = completion.choices[0];
    let responseText = choice?.message?.content ?? "";
    const finishReason = choice?.finish_reason;
    const reasoningTokens = completion.usage?.completion_tokens_details?.reasoning_tokens;

    // Server-side diagnostic log — status/shape info only, never the API key,
    // never the user's message, and never the model's reply text (health-
    // adjacent content shouldn't be logged unnecessarily).
    console.log("api/chat: OpenAI response", {
      status: 200,
      finishReason,
      reasoningTokens,
      replyLength: responseText.length,
    });

    if (!responseText.trim()) {
      // The call succeeded (no exception), but produced no visible text —
      // most likely the reasoning-token-budget issue described above.
      // Treat this as a failure rather than returning an empty 200.
      console.error("api/chat: OpenAI returned empty content", { finishReason, reasoningTokens });
      res.status(500).json({ error: "OpenAI returned an empty response." });
      return;
    }

    // Output safety check — second line of defence behind the pre-check.
    if (checkOutputSafety(responseText)) {
      console.log("api/chat: model reply blocked by output safety check");
      responseText = GENERIC_SAFETY_MESSAGE;
    }

    res.status(200).json({ reply: responseText, source: "openai" });
  } catch (err) {
    // Log a safe subset only — err.message and err.status, never the raw
    // error object (which can embed request headers/config) and never the key.
    const safeMessage = err instanceof Error ? err.message : "Unknown error";
    const status = (err as { status?: number })?.status;
    console.error("api/chat: OpenAI request failed", { status, message: safeMessage });
    res.status(500).json({ error: "Something went wrong reaching the companion." });
  }
}
