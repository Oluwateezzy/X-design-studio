import * as vscode from 'vscode';
import type { GoogleFontItem } from './messages';

const CACHE_KEY = 'googleFontsCatalogCache';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedCatalog {
  timestamp: number;
  items: GoogleFontItem[];
}

export async function fetchGoogleFontsCatalog(
  apiKey: string,
  globalState: vscode.Memento
): Promise<{ items: GoogleFontItem[]; fromApi: boolean }> {
  if (!apiKey) {
    return { items: [], fromApi: false };
  }

  // Check cache in globalState
  const cached = globalState.get<CachedCatalog>(CACHE_KEY);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS && cached.items.length > 0) {
    return { items: cached.items, fromApi: true };
  }

  try {
    const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${encodeURIComponent(apiKey)}&sort=popularity`);
    if (!res.ok) {
      throw new Error(`Google Fonts API HTTP error ${res.status}`);
    }

    const data = (await res.json()) as { items?: Array<{ family: string; category: string; variants?: string[]; subsets?: string[] }> };
    if (data.items && Array.isArray(data.items)) {
      const items: GoogleFontItem[] = data.items.map(font => ({
        family: font.family,
        category: font.category,
        variants: font.variants,
        subsets: font.subsets
      }));

      // Store in globalState cache
      await globalState.update(CACHE_KEY, {
        timestamp: Date.now(),
        items
      });

      return { items, fromApi: true };
    }
  } catch (err) {
    console.warn('Failed to fetch Google Fonts API from extension host:', err);
  }

  // Return cached if expired but available, or empty
  if (cached && cached.items.length > 0) {
    return { items: cached.items, fromApi: true };
  }

  return { items: [], fromApi: false };
}
