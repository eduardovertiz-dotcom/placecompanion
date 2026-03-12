import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { buildSystemPrompt } from "@/lib/build-system-prompt";
import type { PropertyConfig } from "@/types/property";
import { demoConfig } from "@/lib/demo-config";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type SimpleMessage = { role: string; content: string };
type PartsMessage = { role: string; parts: Array<{ type: string; text?: string }> };

function normalizeMessages(messages: (SimpleMessage | PartsMessage)[]) {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => {
      const role = m.role as "user" | "assistant";
      if ("content" in m) {
        return { role, content: m.content };
      }
      const text = m.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("");
      return { role, content: text };
    });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, propertyConfig, rawSystemPrompt } = body as {
      messages: (SimpleMessage | PartsMessage)[];
      propertyConfig?: PropertyConfig | { systemPrompt: string };
      rawSystemPrompt?: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages array is required" }, { status: 400 });
    }

    let systemPrompt: string;
    if (rawSystemPrompt) {
      systemPrompt = rawSystemPrompt;
    } else if (propertyConfig && "systemPrompt" in propertyConfig) {
      systemPrompt = propertyConfig.systemPrompt;
    } else {
      systemPrompt = buildSystemPrompt((propertyConfig as PropertyConfig) ?? demoConfig);
    }

    const result = streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: systemPrompt,
      messages: normalizeMessages(messages),
      maxOutputTokens: 1024,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[chat/route]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
