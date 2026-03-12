import { streamText, convertToModelMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt } from "@/lib/build-system-prompt";
import type { PropertyConfig } from "@/types/property";
import { demoConfig } from "@/lib/demo-config";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, propertyConfig } = body as {
      messages: Array<{ role: string; parts: Array<{ type: string; text?: string }> }>;
      propertyConfig?: PropertyConfig;
    };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    const config = propertyConfig ?? demoConfig;
    const systemPrompt = buildSystemPrompt(config);

    const modelMessages = await convertToModelMessages(
      messages as Parameters<typeof convertToModelMessages>[0],
    );

    const result = streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: 1024,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[chat/route]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
