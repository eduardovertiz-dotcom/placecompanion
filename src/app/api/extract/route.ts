import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buffer: Buffer) => Promise<{ text: string }>;

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 12000);
}

async function fetchUrlText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PlaceCompanionBot/1.0)" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Failed to fetch URL: ${res.status}`);
  const html = await res.text();
  return stripHtml(html);
}

export async function POST(req: Request) {
  try {
    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const body = await req.json();
    const { text, url, files } = body as {
      text?: string;
      url?: string;
      files?: Array<{ name: string; base64: string }>;
    };
    console.log("[extract] request:", { hasUrl: !!url, hasText: !!text, fileCount: files?.length ?? 0 });

    if (!text && !url && (!files || files.length === 0)) {
      return Response.json({ error: "Provide a website URL, documents, or text description" }, { status: 400 });
    }

    let combinedText = "";

    // Source 1: URL
    if (url) {
      try {
        const scraped = await fetchUrlText(url);
        combinedText += `\n\n[WEBSITE CONTENT]\n${scraped}`;
        console.log("[extract] scraped URL, length:", scraped.length);
      } catch {
        console.warn("[extract] URL fetch failed, continuing with other sources");
        if (!text && (!files || files.length === 0)) {
          return Response.json(
            { error: "Could not fetch that URL. Try uploading a document or pasting your hotel text instead." },
            { status: 422 },
          );
        }
      }
    }

    // Source 2: PDF files
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const buffer = Buffer.from(file.base64, "base64");
          const parsed = await pdfParse(buffer);
          combinedText += `\n\n[DOCUMENT: ${file.name}]\n${parsed.text.slice(0, 8000)}`;
          console.log("[extract] parsed PDF:", file.name, "length:", parsed.text.length);
        } catch (e) {
          console.warn("[extract] failed to parse PDF:", file.name, e);
        }
      }
    }

    // Source 3: Additional text
    if (text) {
      combinedText += `\n\n[ADDITIONAL INFO]\n${text.slice(0, 6000)}`;
    }

    const sourceText = combinedText.trim().slice(0, 20000);

    if (sourceText.length < 30) {
      return Response.json(
        { error: "Not enough content found. Try adding more detail or uploading a document." },
        { status: 422 },
      );
    }

    console.log("[extract] calling AI, combined length:", sourceText.length);
    const { text: raw } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: `You are a hotel information extractor. Given raw hotel text or website content, extract structured information and return ONLY valid JSON with no markdown, no explanation, no code fences.`,
      messages: [
        {
          role: "user",
          content: `Extract hotel information from the text below. Return a JSON object with exactly these fields:
{
  "hotelName": "string or null",
  "restaurant": { "found": boolean, "name": "string or null", "hours": "string or null" },
  "spa": { "found": boolean, "name": "string or null", "hours": "string or null" },
  "amenities": { "found": boolean, "list": ["array of strings"] },
  "policies": { "found": boolean, "checkIn": "string or null", "checkOut": "string or null", "other": "string or null" },
  "nearby": { "found": boolean, "list": ["array of strings"] },
  "location": "string or null",
  "summary": "2-3 sentence summary of this hotel for an AI assistant to use as context"
}

Hotel text:
${sourceText}`,
        },
      ],
      maxOutputTokens: 1024,
    });

    console.log("[extract] AI response (first 500):", raw.slice(0, 500));
    // Strip markdown code fences if present
    const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    let extracted: Record<string, unknown>;
    try {
      extracted = JSON.parse(cleaned);
    } catch (e) {
      console.error("[extract] JSON parse failed. Raw response:", raw.slice(0, 500), e);
      return Response.json(
        { error: "Could not parse hotel information. Please try again." },
        { status: 422 },
      );
    }

    // Build a system prompt from extracted data for use in /api/preview-chat
    const lines: string[] = [];
    lines.push(`You are the AI Guest Companion for ${extracted.hotelName || "this hotel"}.`);
    if (extracted.summary) lines.push(String(extracted.summary));
    if (extracted.location) lines.push(`Location: ${extracted.location}`);

    const restaurant = extracted.restaurant as { found?: boolean; name?: string; hours?: string } | undefined;
    if (restaurant?.found) {
      lines.push(`Restaurant: ${restaurant.name || "on-site dining available"}${restaurant.hours ? ` (${restaurant.hours})` : ""}`);
    }
    const spa = extracted.spa as { found?: boolean; name?: string; hours?: string } | undefined;
    if (spa?.found) {
      lines.push(`Spa: ${spa.name || "spa & wellness available"}${spa.hours ? ` (${spa.hours})` : ""}`);
    }
    const amenities = extracted.amenities as { found?: boolean; list?: string[] } | undefined;
    if (amenities?.found && amenities.list?.length) {
      lines.push(`Amenities: ${amenities.list.join(", ")}`);
    }
    const policies = extracted.policies as { found?: boolean; checkIn?: string; checkOut?: string; other?: string } | undefined;
    if (policies?.found) {
      if (policies.checkIn) lines.push(`Check-in: ${policies.checkIn}`);
      if (policies.checkOut) lines.push(`Check-out: ${policies.checkOut}`);
      if (policies.other) lines.push(`Policies: ${policies.other}`);
    }
    const nearby = extracted.nearby as { found?: boolean; list?: string[] } | undefined;
    if (nearby?.found && nearby.list?.length) {
      lines.push(`Nearby: ${nearby.list.join(", ")}`);
    }

    lines.push("");
    lines.push("Answer guest questions concisely and helpfully. Only use information provided above. Always respond in the same language the guest writes in.");

    extracted.systemPrompt = lines.join("\n");

    console.log("[extract] success, hotelName:", extracted.hotelName);
    return Response.json({ extracted });
  } catch (err) {
    console.error("[extract/route] unhandled error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: `Internal server error: ${message}` }, { status: 500 });
  }
}
