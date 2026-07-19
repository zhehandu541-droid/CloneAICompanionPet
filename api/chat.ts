// Vercel serverless function — proxies chat messages to OpenAI GPT-5 Nano.
//
// Why this file exists: the Tend frontend is a static Vite/React app with no
// backend of its own, so it cannot safely hold an API key (anything shipped
// to the browser can be read by anyone). This function runs only on Vercel's
// server, reads the key from an environment variable, and is the one place
// that talks to the real OpenAI API. The frontend calls POST /api/chat and
// never sees the key.
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
// Setup:
//   1. npm install (pulls in the `openai` package, added to package.json)
//   2. In the Vercel project settings, add an environment variable named
//      OPENAI_API_KEY with your key from platform.openai.com.
//   3. Deploy. Vercel automatically turns every file under /api into an
//      endpoint at the matching path — no extra config needed for a Vite app.
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the voice of a gentle companion pet inside "Tend", a prototype app that helps someone living with type 1 diabetes reflect on their day.

Ground rules — follow these strictly:
- This is a dissertation prototype. There is no real CGM/pump connection; all glucose, activity, sleep, and food data in the app is simulated. Never imply it is real medical data.
- Never give medical advice, a diagnosis, a dosing recommendation, or anything that reads as clinical guidance. If asked something clinical, gently say that's a question for their real care team, then stay warm and supportive.
- Keep replies short — 2 to 5 sentences. Write in plain, warm prose, no bullet points or lists, no headers.
- Your tone is calm, kind, and non-judgmental, like a steady companion, not a customer-support assistant. Never mention rewards, streaks, or scores.`;

type ChatTurn = { from: "user" | "pet"; text: string };

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

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
    const responseText = choice?.message?.content ?? "";
    const finishReason = choice?.finish_reason;
    const reasoningTokens = completion.usage?.completion_tokens_details?.reasoning_tokens;

    // Server-side diagnostic log — status/shape info only, never the API key
    // or the full completion object (which could include request echoes).
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
