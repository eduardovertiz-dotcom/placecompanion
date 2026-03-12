import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type ChatMessage = { role: string; content: string };
type Extracted = Record<string, unknown> | null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, extracted } = body as {
      messages: ChatMessage[];
      extracted: Extracted;
    };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    // Use the systemPrompt baked in by /api/extract, or fall back to a generic one
    const systemPrompt =
      (extracted?.systemPrompt as string | undefined) ??
      `You are the AI Guest Companion for ${(extracted?.hotelName as string) || "this hotel"}. Answer guest questions helpfully and concisely. Only use information you have been given. Respond in the same language the guest writes in.`;

    const normalized = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const result = streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: systemPrompt,
      messages: normalized,
      maxOutputTokens: 512,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[preview-chat/route]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
