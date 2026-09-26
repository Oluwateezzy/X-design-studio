import { postMessage } from "../vscode-bridge";
import type { GoogleFontItem } from "../../src/messages";

export type { GoogleFontItem };

export const FALLBACK_GOOGLE_FONTS: GoogleFontItem[] = [
  { family: "Plus Jakarta Sans", category: "sans-serif", variants: ["400", "600", "700", "800"], subsets: ["latin"] },
  { family: "Outfit", category: "sans-serif", variants: ["400", "500", "600", "700", "800"], subsets: ["latin"] },
  { family: "Space Grotesk", category: "sans-serif", variants: ["400", "500", "600", "700"], subsets: ["latin"] },
  { family: "Inter", category: "sans-serif", variants: ["400", "500", "600", "700", "800"], subsets: ["latin"] },
  { family: "Syne", category: "display", variants: ["500", "700", "800"], subsets: ["latin"] },
  { family: "Cinzel", category: "serif", variants: ["500", "700", "900"], subsets: ["latin"] },
  { family: "Playfair Display", category: "serif", variants: ["400", "600", "800"], subsets: ["latin"] },
  { family: "Instrument Serif", category: "serif", variants: ["400"], subsets: ["latin"] },
  { family: "JetBrains Mono", category: "monospace", variants: ["400", "500", "700"], subsets: ["latin"] },
  { family: "Press Start 2P", category: "display", variants: ["400"], subsets: ["latin"] },
  { family: "Roboto", category: "sans-serif", variants: ["400", "500", "700"], subsets: ["latin"] },
  { family: "Poppins", category: "sans-serif", variants: ["400", "600", "700"], subsets: ["latin"] },
  { family: "Montserrat", category: "sans-serif", variants: ["400", "600", "700"], subsets: ["latin"] },
  { family: "Lora", category: "serif", variants: ["400", "600", "700"], subsets: ["latin"] },
  { family: "Merriweather", category: "serif", variants: ["400", "700"], subsets: ["latin"] },
  { family: "Fira Code", category: "monospace", variants: ["400", "600", "700"], subsets: ["latin"] },
  { family: "Caveat", category: "handwriting", variants: ["400", "600", "700"], subsets: ["latin"] },
  { family: "Pacifico", category: "handwriting", variants: ["400"], subsets: ["latin"] },
  { family: "Bebas Neue", category: "display", variants: ["400"], subsets: ["latin"] },
  { family: "Oswald", category: "sans-serif", variants: ["400", "600", "700"], subsets: ["latin"] }
];

export function requestGoogleFontsCatalog(apiKey?: string): void {
  postMessage({ type: "fetchGoogleFonts", apiKey });
}

export function loadGoogleFont(family: string): void {
  const fontId = `google-font-${family.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  if (document.getElementById(fontId)) return;

  const fontParam = family.replace(/\s+/g, "+");
  const link = document.createElement("link");
  link.id = fontId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontParam}&display=swap`;
  document.head.appendChild(link);
}

export function getFontGoogleUrlParam(family: string): string {
  return `${family.replace(/\s+/g, "+")}&display=swap`;
}

export function getFontFamilyCss(family: string, category?: string): string {
  let genericFallback = "sans-serif";
  if (category === "serif") genericFallback = "serif";
  if (category === "monospace") genericFallback = "monospace";
  if (category === "cursive" || category === "handwriting") genericFallback = "cursive";
  return `'${family}', ${genericFallback}`;
}
