// Shared class names for the playful "sticker" look used across the app
// (matches the landing page: thick borders, offset shadows, candy colors).

export const popCard = "shadow-pop-lg rounded-3xl border-2 border-black/60 bg-card";

const popButtonBase =
  "shadow-pop inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-black/60 font-heading font-bold transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-50";

export function popButton(color: "primary" | "lime" | "sun" | "sky" | "coral" | "grape" | "card" = "primary", size: "sm" | "md" | "lg" = "md") {
  const colors = {
    primary: "bg-primary text-primary-foreground",
    lime: "bg-lime text-primary-foreground",
    sun: "bg-sun text-primary-foreground",
    sky: "bg-sky text-primary-foreground",
    coral: "bg-coral text-primary-foreground",
    grape: "bg-grape text-primary-foreground",
    card: "bg-card text-foreground",
  } as const;
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5", lg: "px-6 py-3.5 text-lg" } as const;
  return `${popButtonBase} ${colors[color]} ${sizes[size]}`;
}

export type CategoryKey = "TOEIC" | "IELTS" | "GENERAL";

export const categoryStyles: Record<CategoryKey, { label: string; bg: string; text: string }> = {
  TOEIC: { label: "TOEIC", bg: "bg-sky", text: "text-sky" },
  IELTS: { label: "IELTS", bg: "bg-grape", text: "text-grape" },
  GENERAL: { label: "General", bg: "bg-sun", text: "text-sun" },
};
