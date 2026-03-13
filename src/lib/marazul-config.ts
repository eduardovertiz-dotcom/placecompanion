import type { PropertyConfig } from "@/types/property";
import type { ChatConfig } from "@/components/chat-interface";

export const marazulConfig: PropertyConfig = {
  id: "marazul-riviera-maya",
  name: "MarAzul Riviera Maya",
  type: "hotel_resort",
  location: {
    city: "Riviera Maya",
    country: "Mexico",
  },
  language: {
    primary: "en",
    supported: ["en", "es"],
  },
  companion: {
    name: "Marina",
    personality:
      "You are Marina, the AI Guest Companion for MarAzul Riviera Maya, part of the MarAzul Collection — 5 boutique coastal hotels across Mexico. Use a warm concierge tone. Recommend internal services first. Respond in the guest's language. Be concise but complete.",
    greeting:
      "Bienvenido to MarAzul Riviera Maya. I'm Marina, your AI guest companion. How can I help you today?",
  },
  services: [
    "Casa Marina Restaurant: beachfront, breakfast 7–11am, dinner 6–10pm, Yucatecan cuisine",
    "Spa Ixchel: 9am–7pm — deep tissue $85, Mayan stone therapy $120, jade facial $65",
    "Beach club: cenote access, paddle boards, kayaks, open sunrise to sunset",
    "Rooftop bar: 5pm–midnight, mezcal cocktails",
    "Pool: 7am–10pm",
    "Gym: 24 hours",
    "Mercado de Artesanías: 5 min walk",
    "Café Selvática: 4 min walk, open 7am–3pm",
    "Snorkel rentals: 3 min walk, $20/day",
    "Cenote Azul: 15 min taxi",
  ],
  faqs: [
    {
      question: "Where is breakfast served?",
      answer:
        "Breakfast is served at Casa Marina Restaurant on the beachfront, daily from 7 to 11 AM.",
    },
    {
      question: "Do you have surf lessons?",
      answer:
        "We don't offer surf lessons directly, but snorkel rentals are available 3 minutes away at $20/day. Our concierge can arrange surf lessons through local operators.",
    },
    {
      question: "How late is the pool open?",
      answer: "The pool is open from 7 AM to 10 PM daily.",
    },
    {
      question: "Where is the nearest pharmacy?",
      answer:
        "The nearest pharmacy is about a 7-minute walk. Our concierge can provide exact directions.",
    },
  ],
  suggestions: [
    "Where is breakfast served?",
    "Do you have surf lessons?",
    "How late is the pool open?",
    "Where is the nearest pharmacy?",
    "¿Tienen servicio de spa?",
  ],
  contact: {
    email: "marina@marazulrivieramaya.mx",
  },
  branding: {
    primaryColor: "#2D9E6B",
  },
};

export const marazulChatConfig: ChatConfig = {
  hotelName: "MarAzul Riviera Maya",
  assistantName: "Marina",
  collection: "MarAzul Collection",
  systemPrompt: marazulConfig.companion.personality,
  suggestionChips: marazulConfig.suggestions,
  mobileChipsLimit: 2,
};
