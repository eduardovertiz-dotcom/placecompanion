import type { PropertyConfig, SpaceVertical } from "@/types/property";

type PromptBuilder = (config: PropertyConfig) => string;

function basePrompt(
  config: PropertyConfig,
  roleIntro: string,
  extraInstructions: string[],
): string {
  const servicesText = config.services.length
    ? `- ${config.services.join("\n- ")}`
    : "Not specified.";

  const faqsText = config.faqs.length
    ? config.faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")
    : "None provided.";

  const contactLines = [
    config.contact.phone ? `Phone: ${config.contact.phone}` : "",
    config.contact.whatsapp ? `WhatsApp: ${config.contact.whatsapp}` : "",
    config.contact.email ? `Email: ${config.contact.email}` : "",
  ].filter(Boolean);

  const instructions = [
    ...extraInstructions,
    "Be concise and helpful. Avoid unnecessary filler.",
    "Always respond in the same language the visitor writes in.",
    "Never invent information not present in this context.",
  ];

  return `${config.companion.personality}

${roleIntro}

SPACE: ${config.name}
LOCATION: ${config.location.city}, ${config.location.country}${config.location.address ? `\nADDRESS: ${config.location.address}` : ""}

SERVICES & INFORMATION:
${servicesText}

FREQUENTLY ASKED QUESTIONS:
${faqsText}

CONTACT:
${contactLines.length ? contactLines.join("\n") : "Not specified."}

INSTRUCTIONS:
${instructions.map((i) => `- ${i}`).join("\n")}`;
}

const VERTICAL_BUILDERS: Record<SpaceVertical, PromptBuilder> = {
  hotel_resort: (config) =>
    basePrompt(
      config,
      "You are the digital AI companion for this hotel or resort. Your role is to assist guests throughout their stay.",
      [
        "Help with room services, local recommendations, check-in/out, and reservations.",
        "If you cannot resolve something, offer to connect the guest with front desk staff.",
      ],
    ),

  hospital_clinic: (config) =>
    basePrompt(
      config,
      "You are the digital assistant for this healthcare facility. Your role is to guide patients and visitors.",
      [
        "Help with navigation, department information, general schedules, and facility services.",
        "IMPORTANT: Do not provide medical diagnoses or treatment recommendations. Always refer clinical questions to medical staff.",
        "If someone describes an emergency, immediately direct them to the emergency department or local emergency services.",
      ],
    ),

  airport_transport: (config) =>
    basePrompt(
      config,
      "You are the digital assistant for this transport terminal. Your role is to guide passengers.",
      [
        "Help with gate information, terminal services, retail, transport connections, and general wayfinding.",
        "For real-time flight data (delays, cancellations), clarify you do not have live data access and direct passengers to information boards or their airline.",
      ],
    ),

  residential: (config) =>
    basePrompt(
      config,
      "You are the digital assistant for this residential building. Your role is to support residents day-to-day.",
      [
        "Help with maintenance requests, amenity bookings, visitor information, and building announcements.",
        "If you cannot resolve something, offer to escalate to building management.",
      ],
    ),

  shopping_retail: (config) =>
    basePrompt(
      config,
      "You are the digital assistant for this retail space. Your role is to guide visitors.",
      [
        "Help visitors locate stores, discover promotions, check opening hours, and access available services.",
        "Proactively share relevant offers or events when they are related to the conversation.",
      ],
    ),

  university_campus: (config) =>
    basePrompt(
      config,
      "You are the digital assistant for this university campus. Your role is to support students, faculty, and visitors.",
      [
        "Help navigate the campus, find departments, and access academic and event information.",
        "For specific administrative tasks, direct users to the student services office or the relevant portal.",
      ],
    ),
};

export function buildSystemPrompt(config: PropertyConfig): string {
  return VERTICAL_BUILDERS[config.type](config);
}
