import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type ChatMessage = { role: string; content: string };
type Extracted = Record<string, unknown> | null;

const HALLUCINATION_GUARDRAIL = `Only recommend specific restaurants, businesses, attractions or services if they are explicitly mentioned in the hotel's knowledge base. For general destination questions, provide helpful guidance about the area but never invent or assume specific business names, addresses, hours, or prices that are not in your knowledge base.`

const STYLE_INSTRUCTIONS: Record<string, string> = {
  warm_local: "Speak like a warm, genuine local friend. Personal, conversational, use the guest's name when known.",
  refined_concierge: "Speak with the polish of a five-star concierge. Precise, professional, impeccable.",
  barefoot_luxury: "Relaxed and warm but never casual to a fault. Think luxury beach resort — effortlessly refined.",
  playful_explorer: "Fun, enthusiastic, and adventurous. Use occasional emojis. Make guests excited to explore.",
  zen_mindful: "Calm, unhurried, thoughtful. Every response feels considered and serene.",
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, extracted, conversationalStyle } = body as {
      messages: ChatMessage[];
      extracted: Extracted;
      conversationalStyle?: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    const basePrompt =
      (extracted?.systemPrompt as string | undefined) ??
      `You are the AI Guest Companion for ${(extracted?.hotelName as string) || "this hotel"}. Answer guest questions helpfully and concisely. Only use information you have been given. Respond in the same language the guest writes in.`;

    const styleKey = conversationalStyle || "warm_local";
    const styleInstruction = STYLE_INSTRUCTIONS[styleKey] ?? STYLE_INSTRUCTIONS.warm_local;
    const systemPrompt = `${basePrompt}\n\nCOMMUNICATION STYLE: ${styleInstruction}\n\nGUARANTEED ACCURACY: ${HALLUCINATION_GUARDRAIL}`;

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
