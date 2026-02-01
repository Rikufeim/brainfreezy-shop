export const DEPOSIT_AMOUNT = 49; // euros
export const DEPOSIT_CURRENCY = "EUR";

export const SERVICES = [
  {
    id: "custom-web-app",
    label: "Custom Web App",
    description: "Full-stack web applications tailored to your needs",
  },
  {
    id: "custom-landing-page",
    label: "Custom Landing Page",
    description: "High-converting landing pages for your products",
  },
  {
    id: "custom-tracker",
    label: "Custom Tracker",
    description: "Analytics and tracking solutions for your business",
  },
  {
    id: "custom-prompt-pack",
    label: "Custom Prompt Pack",
    description: "AI prompt templates and workflows designed for your needs",
  },
] as const;

export const CONTACT_METHODS = [
  { value: "telegram", label: "Telegram" },
  { value: "discord", label: "Discord" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "email", label: "Email" },
] as const;

export const BUDGET_RANGES = [
  { value: "<1k", label: "Under €1,000" },
  { value: "1k-3k", label: "€1,000 - €3,000" },
  { value: "3k-10k", label: "€3,000 - €10,000" },
  { value: "10k+", label: "€10,000+" },
] as const;
