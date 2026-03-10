export type SpaceVertical =
  | "hotel_resort"
  | "hospital_clinic"
  | "airport_transport"
  | "residential"
  | "shopping_retail"
  | "university_campus";

export type SupportedLanguage = "es" | "en" | "pt" | "fr" | "de" | "zh";

export interface PropertyConfig {
  id: string;
  name: string;
  type: SpaceVertical;
  location: {
    city: string;
    country: string;
    address?: string;
  };
  language: {
    primary: SupportedLanguage;
    supported: SupportedLanguage[];
  };
  companion: {
    name: string;
    personality: string;
    greeting: string;
  };
  services: string[];
  faqs: Array<{ question: string; answer: string }>;
  suggestions?: string[];
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    website?: string;
  };
  branding?: {
    primaryColor?: string;
    logo?: string;
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
