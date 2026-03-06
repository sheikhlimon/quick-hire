// Color palette for dynamic badge generation
export const COLOR_PALETTE = [
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-lime-100", text: "text-lime-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-stone-100", text: "text-stone-700" },
];

// Simple string hash function
const stringHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Dynamic color generation based on badge text (works for any badge type)
export const getBadgeStyles = (text: string): { bg: string; text: string } => {
  if (!text) return { bg: "bg-gray-100", text: "text-gray-700" };
  const hash = stringHash(text);
  const index = hash % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
};
