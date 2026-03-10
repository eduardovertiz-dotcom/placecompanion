import type { SpaceVertical } from "@/types/property";

export interface VerticalFormConfig {
  label: string;
  description: string;
  visitorLabel: string;
  defaultPersonality: string;
  defaultGreeting: string;
  servicePlaceholder: string;
  faqQuestionPlaceholder: string;
  faqAnswerPlaceholder: string;
  suggestions: string[];
}

export const VERTICAL_FORM_CONFIGS: Record<SpaceVertical, VerticalFormConfig> = {
  hotel_resort: {
    label: "Hotels & Resorts",
    description: "Elevate the guest experience with an AI companion available around the clock.",
    visitorLabel: "guest",
    defaultPersonality:
      "You are a warm, professional, and helpful AI companion. You respond clearly and concisely, always with a friendly tone.",
    defaultGreeting:
      "Welcome! I'm {name}, your AI companion. How can I help you today?",
    servicePlaceholder: "e.g. Pool open daily from 8am to 8pm",
    faqQuestionPlaceholder: "What time is check-in?",
    faqAnswerPlaceholder:
      "Check-in starts at 3:00 PM. Early check-in is available subject to room availability.",
    suggestions: [
      "What time is check-in?",
      "Is breakfast included?",
      "Is there parking available?",
      "What's nearby to visit?",
      "Can I get a late checkout?",
    ],
  },

  hospital_clinic: {
    label: "Hospitals & Clinics",
    description:
      "Guide patients and visitors with empathy and precision through any healthcare facility.",
    visitorLabel: "patient",
    defaultPersonality:
      "You are an empathetic, clear, and accurate assistant for a healthcare facility. You help patients and visitors navigate the space and find the information they need. You always maintain a calm, professional tone.",
    defaultGreeting: "Hello, I'm {name}. How can I help you today?",
    servicePlaceholder: "e.g. Emergency room open 24 hours",
    faqQuestionPlaceholder: "Where is the cardiology department?",
    faqAnswerPlaceholder:
      "The cardiology department is in Wing B, third floor. Follow the blue signs from the main entrance.",
    suggestions: [
      "Where is the emergency room?",
      "How do I schedule an appointment?",
      "Where can I park?",
      "Is there a pharmacy on-site?",
      "Where is the cafeteria?",
    ],
  },

  airport_transport: {
    label: "Airports & Transport",
    description:
      "Instant answers for every traveler, in their language, at any terminal in the world.",
    visitorLabel: "passenger",
    defaultPersonality:
      "You are an efficient and precise assistant in a transport environment. You help passengers navigate the terminal, find their gate, access services, and plan connections. You are fast and accurate.",
    defaultGreeting: "Welcome! I'm {name}. How can I help you today?",
    servicePlaceholder: "e.g. VIP Lounge in Terminal A — Priority Pass access",
    faqQuestionPlaceholder: "How do I get to the city center?",
    faqAnswerPlaceholder:
      "You can take the express train from Level -1, departing every 15 minutes.",
    suggestions: [
      "Where is my departure gate?",
      "Is there a VIP lounge nearby?",
      "How do I get to the city center?",
      "Where can I find food before my flight?",
      "Is there a luggage storage service?",
    ],
  },

  residential: {
    label: "Residential Buildings",
    description:
      "Streamline communication between residents and management with an always-on assistant.",
    visitorLabel: "resident",
    defaultPersonality:
      "You are a friendly and professional assistant for the building's residents. You help with service requests, amenity information, reservations, and building announcements.",
    defaultGreeting: "Hi! I'm {name}, your building assistant. How can I help?",
    servicePlaceholder: "e.g. Rooftop available daily from 9am to 10pm",
    faqQuestionPlaceholder: "How do I book the event room?",
    faqAnswerPlaceholder:
      "Send a request through this chat with your preferred date and time. We'll confirm availability within 24 hours.",
    suggestions: [
      "How do I submit a maintenance request?",
      "How do I book the event room?",
      "What are the gym hours?",
      "How do I register a visitor?",
      "Who do I contact for package pickup?",
    ],
  },

  shopping_retail: {
    label: "Shopping Malls & Retail",
    description:
      "Turn every visit into a personalized experience with instant wayfinding and promotions.",
    visitorLabel: "visitor",
    defaultPersonality:
      "You are a dynamic and helpful assistant for a retail space. You help visitors find stores, discover active promotions, and access the center's services.",
    defaultGreeting: "Welcome! I'm {name}. Looking for something specific today?",
    servicePlaceholder: "e.g. Food court on Level 3, open 10am–10pm",
    faqQuestionPlaceholder: "Where is the Nike store?",
    faqAnswerPlaceholder:
      "The Nike store is on Level 2, north wing. Open Monday–Sunday, 10am–9pm.",
    suggestions: [
      "Where is the food court?",
      "What are today's promotions?",
      "Where can I find a pharmacy?",
      "Is there free Wi-Fi?",
      "Where is the nearest ATM?",
    ],
  },

  university_campus: {
    label: "Universities & Campuses",
    description:
      "A smart guide for students, faculty, and visitors on any university campus.",
    visitorLabel: "student",
    defaultPersonality:
      "You are a knowledgeable and friendly campus assistant. You help students, faculty, and visitors navigate the campus, find departments, and access information about events and enrollment.",
    defaultGreeting: "Welcome! I'm {name}, your campus assistant. How can I help?",
    servicePlaceholder: "e.g. Library open Monday–Friday, 7am–10pm",
    faqQuestionPlaceholder: "How do I register for courses?",
    faqAnswerPlaceholder:
      "Course registration is done through the student portal. The registration window opens January 15.",
    suggestions: [
      "How do I register for courses?",
      "Where is the main library?",
      "What events are happening this week?",
      "Where is the student services office?",
      "How do I get a student ID?",
    ],
  },
};
