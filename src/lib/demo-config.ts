import type { PropertyConfig } from "@/types/property";

export const demoConfig: PropertyConfig = {
  id: "hotel-la-palma-demo",
  name: "Hotel La Palma",
  type: "hotel_resort",
  location: {
    city: "Mexico City",
    country: "Mexico",
    address: "Av. Reforma 123, Colonia Juárez",
  },
  language: {
    primary: "en",
    supported: ["en", "es"],
  },
  companion: {
    name: "Palma",
    personality:
      "You are a warm, professional, and knowledgeable AI companion at Hotel La Palma in Mexico City. You help guests with their needs efficiently and with a friendly tone.",
    greeting:
      "Welcome to Hotel La Palma! I'm Palma, your AI Companion. How can I help you today?\nTambién puedo atenderte en español · Je parle aussi français · 我也会说中文",
  },
  services: [
    "Express check-in available from 2:00 PM",
    "Check-out until 12:00 PM",
    "24-hour room service",
    "Gym and pool on the 10th floor",
    "Restaurant La Terraza open 7:00 AM – 11:00 PM",
    "Valet parking available",
    "Airport transfers",
    "Tour desk with local excursions",
    "Express laundry service",
    "Free Wi-Fi in all areas",
  ],
  faqs: [
    {
      question: "What time is check-in?",
      answer:
        "Standard check-in starts at 2:00 PM. Early check-in is available subject to room availability.",
    },
    {
      question: "Is breakfast included?",
      answer:
        "Breakfast buffet is included with Deluxe and Suite rates. For standard rooms it can be added for $20 USD per person.",
    },
    {
      question: "Do you allow pets?",
      answer:
        "Yes, we are pet-friendly. We accept pets up to 10 kg with an additional charge of $15 USD per night.",
    },
    {
      question: "How do I get to the city center?",
      answer:
        "The Zócalo is about 15 minutes by taxi or Uber. You can also take the Metro from Insurgentes station (Line 1) and transfer at Balderas.",
    },
  ],
  suggestions: [
    "What time is check-in?",
    "Is breakfast included?",
    "Is there parking available?",
    "What's nearby to visit?",
    "Can I get a late checkout?",
  ],
  contact: {
    phone: "+52 55 1234 5678",
    whatsapp: "+52 55 1234 5678",
    email: "hello@hotellapalma.mx",
    website: "https://hotellapalma.mx",
  },
  branding: {
    primaryColor: "#1a6b3a",
  },
};
