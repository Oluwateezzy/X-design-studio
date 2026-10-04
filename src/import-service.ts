import * as vscode from 'vscode';
import { PRESET_THEMES } from './themes-dataset.js';
import type { ThemeConfigV2 } from './types/index.js';

export interface ImportResult {
  success: boolean;
  theme: ThemeConfigV2 | null;
  warnings: string[];
  errors: string[];
}

/**
 * Service for extracting theme tokens from existing codebases, web URLs, or design-MD files.
 */
export class ImportService {
  /**
   * Scans a codebase directory for CSS/SCSS/LESS files, Tailwind configs, and HTML font links to build a V2 ThemeConfig.
   */
  async importFromCodebase(folderUri: vscode.Uri): Promise<ImportResult> {
    const warnings: string[] = [];
    const errors: string[] = [];

    try {
      // Start with base theme so no tokens are left undefined
      const baseTheme: ThemeConfigV2 = JSON.parse(JSON.stringify(PRESET_THEMES[0]));
      baseTheme.name = 'Imported Codebase Theme';
      baseTheme.id = `imported-${Date.now()}`;

      const extractedColors: Record<string, string> = {};
      const fontInfo: { name: string | null; url: string | null } = { name: null, url: null };

      // Scan directory recursively
      await this.scanDirectory(folderUri, extractedColors, (fontName, fontUrl) => {
        if (!fontInfo.name && fontName) fontInfo.name = fontName;
        if (!fontInfo.url && fontUrl) fontInfo.url = fontUrl;
      }, warnings);

      if (Object.keys(extractedColors).length === 0 && !fontInfo.name) {
        warnings.push('No CSS custom properties or Tailwind colors were found in the codebase. Used default preset theme fallback.');
      }

      // Map extracted colors onto theme
      this.mapColorsToTheme(baseTheme, extractedColors, warnings);

      // Map extracted font if present
      if (fontInfo.name) {
        const fontNameStr = fontInfo.name;
        baseTheme.typography.fontName = fontNameStr;
        baseTheme.typography.fontFamily = `'${fontNameStr}', sans-serif`;
        if (fontInfo.url) {
          baseTheme.typography.fontGoogleUrl = fontInfo.url;
        } else {
          const encoded = fontNameStr.replace(/\s+/g, '+');
          baseTheme.typography.fontGoogleUrl = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;600;700;800&display=swap`;
        }
      }



      return {
        success: true,
        theme: baseTheme,
        warnings,
        errors,
      };
    } catch (err: any) {
      console.error('[ImportService] Codebase import error:', err);
      errors.push(`Failed to scan codebase: ${err?.message || String(err)}`);
      return {
        success: false,
        theme: null,
        warnings,
        errors,
      };
    }
  }

  /**
   * Imports theme tokens from a web URL by fetching HTML and stylesheet assets.
   */
  async importFromUrl(url: string): Promise<ImportResult> {
    const warnings: string[] = [];
    const errors: string[] = [];

    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const htmlText = await res.text();
      const baseTheme: ThemeConfigV2 = JSON.parse(JSON.stringify(PRESET_THEMES[0]));
      baseTheme.name = `Imported from ${new URL(url).hostname}`;
      baseTheme.id = `url-import-${Date.now()}`;

      const extractedColors: Record<string, string> = {};

      // Extract inline <style> CSS variables
      this.extractCssVariables(htmlText, extractedColors, warnings);

      // Extract Google Font <link>
      const fontMatch = htmlText.match(/href=["'](https:\/\/fonts\.googleapis\.com\/css2\?[^"']+)["']/i);
      if (fontMatch) {
        const fontUrl = fontMatch[1];
        baseTheme.typography.fontGoogleUrl = fontUrl;
        const familyParam = new URL(fontUrl).searchParams.get('family');
        if (familyParam) {
          const fontName = familyParam.split(':')[0].replace(/\+/g, ' ');
          baseTheme.typography.fontName = fontName;
          baseTheme.typography.fontFamily = `'${fontName}', sans-serif`;
        }
      }

      this.mapColorsToTheme(baseTheme, extractedColors, warnings);

      return {
        success: true,
        theme: baseTheme,
        warnings,
        errors,
      };
    } catch (err: any) {
      errors.push(`Failed to import from URL ${url}: ${err?.message || String(err)}`);
      return {
        success: false,
        theme: null,
        warnings,
        errors,
      };
    }
  }

  /**
   * Imports theme tokens from a design-MD file.
   */
  async importFromDesignMd(fileUri: vscode.Uri): Promise<ImportResult> {
    const warnings: string[] = [];
    const errors: string[] = [];

    try {
      const data = await vscode.workspace.fs.readFile(fileUri);
      const text = new TextDecoder().decode(data);

      const baseTheme: ThemeConfigV2 = JSON.parse(JSON.stringify(PRESET_THEMES[0]));
      baseTheme.name = 'Imported Design Spec';
      baseTheme.id = `design-md-${Date.now()}`;

      // Extract hex color codes from markdown file
      const hexMatches = text.match(/#([0-9a-fA-F]{3,8})\b/g) || [];
      const extractedColors: Record<string, string> = {};

      // Parse markdown table rows or lines containing --var or color names
      const lines = text.split('\n');
      for (const line of lines) {
        const varMatch = line.match(/(?:--|`)([a-zA-Z0-9_-]+)(?:`|\s*:)\s*.*?(#[0-9a-fA-F]{3,8})/);
        if (varMatch) {
          const varName = varMatch[1];
          const hex = this.normalizeHex(varMatch[2]);
          if (hex) {
            extractedColors[varName] = hex;
          }
        }
      }

      // If no named variables matched, map raw hexes to primary/bg/secondary
      if (Object.keys(extractedColors).length === 0 && hexMatches.length > 0) {
        const uniqueHexes = Array.from(new Set(hexMatches.map((h: string) => this.normalizeHex(h)).filter(Boolean))) as string[];
        if (uniqueHexes[0]) baseTheme.colors.bg.hex = uniqueHexes[0];
        if (uniqueHexes[1]) baseTheme.colors.primary.hex = uniqueHexes[1];
        if (uniqueHexes[2]) baseTheme.colors.secondary.hex = uniqueHexes[2];
        if (uniqueHexes[3]) baseTheme.colors.accent.hex = uniqueHexes[3];
      } else {
        this.mapColorsToTheme(baseTheme, extractedColors, warnings);
      }


      // Extract typography if present
      const fontMatch = text.match(/Typography\*?\*?:\s*(?:Google Font\s*)?[\*`]?([A-Za-z0-9\s]+)[\*`]?/i);
      if (fontMatch && fontMatch[1]) {
        const fontName = fontMatch[1].trim();
        baseTheme.typography.fontName = fontName;
        baseTheme.typography.fontFamily = `'${fontName}', sans-serif`;
      }

      return {
        success: true,
        theme: baseTheme,
        warnings,
        errors,
      };
    } catch (err: any) {
      errors.push(`Failed to read design-MD file: ${err?.message || String(err)}`);
      return {
        success: false,
        theme: null,
        warnings,
        errors,
      };
    }
  }

  // ─── Helper Methods ────────────────────────────────────────────────────────

  private async scanDirectory(
    dirUri: vscode.Uri,
    extractedColors: Record<string, string>,
    onFontFound: (name: string | null, url: string | null) => void,
    warnings: string[]
  ): Promise<void> {
    try {
      const entries = await vscode.workspace.fs.readDirectory(dirUri);

      for (const [name, type] of entries) {
        // Ignore node_modules, .git, and dist
        if (name === 'node_modules' || name === '.git' || name === 'dist' || name === '.x-design-system') {
          continue;
        }

        const childUri = vscode.Uri.joinPath(dirUri, name);

        if (type === vscode.FileType.Directory) {
          await this.scanDirectory(childUri, extractedColors, onFontFound, warnings);
        } else if (type === vscode.FileType.File) {
          const lowerName = name.toLowerCase();
          if (lowerName.endsWith('.css') || lowerName.endsWith('.scss') || lowerName.endsWith('.less')) {
            const data = await vscode.workspace.fs.readFile(childUri);
            const content = new TextDecoder().decode(data);
            this.extractCssVariables(content, extractedColors, warnings);
          } else if (lowerName.includes('tailwind.config')) {
            const data = await vscode.workspace.fs.readFile(childUri);
            const content = new TextDecoder().decode(data);
            this.extractTailwindConfigColors(content, extractedColors, onFontFound);
          } else if (lowerName.endsWith('.html') || lowerName.endsWith('.tsx') || lowerName.endsWith('.jsx')) {
            const data = await vscode.workspace.fs.readFile(childUri);
            const content = new TextDecoder().decode(data);
            this.extractFontFromHtmlOrTsx(content, onFontFound);
          }
        }
      }
    } catch (err) {
      // Ignore read errors for individual folders
    }
  }

  public extractCssVariables(content: string, extractedColors: Record<string, string>, _warnings: string[]): void {

    // Regex matching CSS custom properties e.g. --primary: #3B82F6; or --theme-bg: #0B0F19;
    const varRegex = /--(?:theme-|color-)?([a-zA-Z0-9_-]+)\s*:\s*([^;}\n]+);?/g;
    let match: RegExpExecArray | null;

    while ((match = varRegex.exec(content)) !== null) {
      const varName = match[1].trim().toLowerCase();
      const valStr = match[2].trim();

      const hexMatch = valStr.match(/#([0-9a-fA-F]{3,8})\b/);
      if (hexMatch) {
        const hex = this.normalizeHex(hexMatch[0]);
        if (hex) {
          extractedColors[varName] = hex;
        }
      }
    }
  }

  public extractTailwindConfigColors(
    content: string,
    extractedColors: Record<string, string>,
    onFontFound: (name: string | null, url: string | null) => void
  ): void {
    // Matches keys in theme.extend.colors e.g. primary: '#3B82F6' or 'secondary': '#1E3A8A'
    const colorRegex = /['"]?([a-zA-Z0-9_-]+)['"]?\s*:\s*['"](#[0-9a-fA-F]{3,8})['"]/g;
    let match: RegExpExecArray | null;

    while ((match = colorRegex.exec(content)) !== null) {
      const key = match[1].toLowerCase();
      const hex = this.normalizeHex(match[2]);
      if (hex) {
        extractedColors[key] = hex;
      }
    }

    // Matches fontFamily e.g. fontFamily: { sans: ['Outfit', 'sans-serif'] }
    const fontMatch = content.match(/fontFamily\s*:\s*\{\s*sans\s*:\s*\[\s*['"]([^'"]+)['"]/);
    if (fontMatch && fontMatch[1]) {
      onFontFound(fontMatch[1], null);
    }
  }

  public extractFontFromHtmlOrTsx(content: string, onFontFound: (name: string | null, url: string | null) => void): void {
    const linkMatch = content.match(/href=["'](https:\/\/fonts\.googleapis\.com\/css2\?[^"']+)["']/i);
    if (linkMatch) {
      const fontUrl = linkMatch[1];
      const familyParam = new URL(fontUrl).searchParams.get('family');
      if (familyParam) {
        const fontName = familyParam.split(':')[0].replace(/\+/g, ' ');
        onFontFound(fontName, fontUrl);
      }
    }
  }

  private mapColorsToTheme(theme: ThemeConfigV2, extractedColors: Record<string, string>, warnings: string[]): void {
    const mappedVars = new Set<string>();

    for (const [key, hex] of Object.entries(extractedColors)) {
      const normKey = key.toLowerCase();

      if (normKey === 'primary' || normKey === 'main' || normKey === 'brand') {
        theme.colors.primary.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'secondary') {
        theme.colors.secondary.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'accent') {
        theme.colors.accent.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'bg' || normKey === 'background' || normKey === 'base') {
        theme.colors.bg.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'surface' || normKey === 'card' || normKey === 'cardbg' || normKey === 'card-bg') {
        theme.colors.surface.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'border' || normKey === 'cardborder' || normKey === 'card-border' || normKey === 'surfaceborder' || normKey === 'surface-border') {
        theme.colors.surfaceBorder.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'text' || normKey === 'textcolor' || normKey === 'text-color' || normKey === 'foreground') {
        theme.colors.text.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'muted' || normKey === 'mutedtext' || normKey === 'textmuted' || normKey === 'text-muted' || normKey === 'muted-text') {
        theme.colors.textMuted.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'cta' || normKey === 'button' || normKey === 'btn') {
        theme.colors.cta.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'badge-bg' || normKey === 'badgebg') {
        theme.colors.badge.bg.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'badge-text' || normKey === 'badgetext') {
        theme.colors.badge.text.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'badge-border' || normKey === 'badgeborder') {
        theme.colors.badge.border.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'success') {
        theme.colors.semantic.success.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'warning') {
        theme.colors.semantic.warning.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'error' || normKey === 'danger') {
        theme.colors.semantic.error.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'info') {
        theme.colors.semantic.info.hex = hex;
        mappedVars.add(key);
      } else {
        warnings.push(`Unmapped CSS custom property: --${key} (${hex})`);
      }
    }
  }

  private normalizeHex(hexRaw: string): string | null {
    let clean = hexRaw.trim().replace(/^#/, '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    if (clean.length === 6) {
      return '#' + clean.toUpperCase();
    }
    if (clean.length === 8) {
      return '#' + clean.substring(0, 6).toUpperCase();
    }
    return null;
  }
}
