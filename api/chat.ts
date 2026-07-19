// Vercel serverless function — proxies chat messages to Claude Haiku 4.5.
//
// Why this file exists: the Tend frontend is a static Vite/React app with no
// backend of its own, so it cannot safely hold an Anthropic API key (anything
// shipped to the browser can be read by anyone). This function runs only on
// Vercel's server, reads the key from an environment variable, and is the one
// place that talks to the real Anthropic API. The frontend calls POST /api/chat
// and never sees the key.
//
// Setup:
//   1. npm install (pulls in @anthropic-ai/sdk, added to package.json)
//   2. In the Vercel project settings, add an environment variable named
//      ANTHROPIC_API_KEY with your key from the Anthropic console.
//   3. Deploy. Vercel automatically turns every file under /api into an
//      endpoint at the matching path — no extra config needed for a Vite app.
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured on the server." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    const { message, history, context } = body as { message?: string; history?: ChatTurn[]; context?: string };

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing 'message' in request body." });
      return;
    }

    // Keep only the last few turns so requests stay small and cheap.
    const priorTurns = Array.isArray(history) ? history.slice(-10) : [];
    const messages = [
      ...priorTurns.map(m => ({
        role: (m.from === "user" ? "user" : "assistant") as "user" | "assistant",
        content: m.text,
      })),
      { role: "user" as const, content: message },
    ];

    const system = context
      ? `${SYSTEM_PROMPT}\n\nContext about the user's (simulated) recent data, for reference only:\n${context}`
      : SYSTEM_PROMPT;

    const completion = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system,
      messages,
    });

    const textBlock = completion.content.find(block => block.type === "text");
    const reply = textBlock && "text" in textBlock ? textBlock.text : "";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("api/chat error:", err);
    res.status(500).json({ error: "Something went wrong reaching the companion." });
  }
}
