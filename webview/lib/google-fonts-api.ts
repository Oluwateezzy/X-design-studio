export interface GoogleFontItem {
  family: string;
  category: "sans-serif" | "serif" | "monospace" | "display" | "handwriting";
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
}

const STORAGE_KEY_API = "vescrow_google_fonts_key";
const STORAGE_KEY_CACHE = "vescrow_google_fonts_cache_v1";
const DEFAULT_GOOGLE_FONTS_API_KEY = "AIzaSyDLpWAHLDyjbvSMPs5Jqlmj9aevVtDVU-M";

export const FALLBACK_GOOGLE_FONTS: GoogleFontItem[] = [
  { family: "Plus Jakarta Sans", category: "sans-serif", variants: ["400", "600", "700", "800"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Outfit", category: "sans-serif", variants: ["400", "500", "600", "700", "800"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Space Grotesk", category: "sans-serif", variants: ["400", "500", "600", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Inter", category: "sans-serif", variants: ["400", "500", "600", "700", "800"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Syne", category: "display", variants: ["500", "700", "800"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Cinzel", category: "serif", variants: ["500", "700", "900"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Playfair Display", category: "serif", variants: ["400", "600", "800"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Instrument Serif", category: "serif", variants: ["400"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "JetBrains Mono", category: "monospace", variants: ["400", "500", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Press Start 2P", category: "display", variants: ["400"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Roboto", category: "sans-serif", variants: ["400", "500", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Poppins", category: "sans-serif", variants: ["400", "600", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Montserrat", category: "sans-serif", variants: ["400", "600", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Lora", category: "serif", variants: ["400", "600", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Merriweather", category: "serif", variants: ["400", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Fira Code", category: "monospace", variants: ["400", "600", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Caveat", category: "handwriting", variants: ["400", "600", "700"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Pacifico", category: "handwriting", variants: ["400"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Bebas Neue", category: "display", variants: ["400"], subsets: ["latin"], version: "v1", lastModified: "" },
  { family: "Oswald", category: "sans-serif", variants: ["400", "600", "700"], subsets: ["latin"], version: "v1", lastModified: "" }
];

export function getSavedApiKey(): string {
  return localStorage.getItem(STORAGE_KEY_API) || DEFAULT_GOOGLE_FONTS_API_KEY;
}

export function saveApiKey(key: string): void {
  if (key.trim()) {
    localStorage.setItem(STORAGE_KEY_API, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_API);
  }
}

export async function fetchGoogleFontsCatalog(apiKey?: string): Promise<{ items: GoogleFontItem[]; fromApi: boolean }> {
  const keyToUse = apiKey || getSavedApiKey();

  // Try cached fonts first if available
  const cached = localStorage.getItem(STORAGE_KEY_CACHE);
  if (cached && !apiKey) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 100) {
        return { items: parsed, fromApi: true };
      }
    } catch {
      // Ignore cache parse error
    }
  }

  if (!keyToUse) {
    return { items: FALLBACK_GOOGLE_FONTS, fromApi: false };
  }

  try {
    const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${encodeURIComponent(keyToUse)}&sort=popularity`);
    if (!res.ok) {
      throw new Error(`Google Fonts API error ${res.status}`);
    }
    const data = await res.json();
    if (data.items && Array.isArray(data.items)) {
      const items: GoogleFontItem[] = data.items.map((font: { family: string; category: GoogleFontItem["category"]; variants: string[]; subsets: string[]; version: string; lastModified: string }) => ({
        family: font.family,
        category: font.category,
        variants: font.variants || [],
        subsets: font.subsets || [],
        version: font.version || "",
        lastModified: font.lastModified || ""
      }));

      localStorage.setItem(STORAGE_KEY_CACHE, JSON.stringify(items));
      return { items, fromApi: true };
    }
  } catch (error) {
    console.warn("Failed to fetch Google Fonts API, falling back to local dataset:", error);
  }

  return { items: FALLBACK_GOOGLE_FONTS, fromApi: false };
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
