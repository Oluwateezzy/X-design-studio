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
   * Imports theme tokens from a web URL by fetching HTML and parsing CSS custom properties, Google Fonts, title metadata, and color frequency heuristics.
   */
  async importFromUrl(url: string, timeoutMs: number = 10000): Promise<ImportResult> {
    const warnings: string[] = [];
    const errors: string[] = [];

    let normalizedUrl = url ? url.trim() : '';
    if (!normalizedUrl) {
      return {
        success: false,
        theme: null,
        warnings: [],
        errors: ['Invalid URL provided: URL cannot be empty.'],
      };
    }

    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(normalizedUrl);
    } catch {
      return {
        success: false,
        theme: null,
        warnings: [],
        errors: [`Invalid URL format: '${url}' is not a valid web URL.`],
      };
    }

    // Set up 10-second timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(parsedUrl.toString(), {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (VS Code Extension; X-Design-System-Studio)',
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
      }

      const htmlText = await res.text();
      const baseTheme: ThemeConfigV2 = JSON.parse(JSON.stringify(PRESET_THEMES[0]));
      baseTheme.id = `url-import-${Date.now()}`;

      // 1. Extract <title> or <meta og:title> for project / theme naming
      const titleMatch = htmlText.match(/<title[^>]*>([^<]+)<\/title>/i) ||
                         htmlText.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
      if (titleMatch && titleMatch[1].trim()) {
        baseTheme.name = `Imported: ${titleMatch[1].trim()}`;
      } else {
        baseTheme.name = `Imported from ${parsedUrl.hostname}`;
      }

      const extractedColors: Record<string, string> = {};

      // 2. Extract <style> blocks and parse CSS custom properties
      const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
      let styleMatch: RegExpExecArray | null;
      while ((styleMatch = styleRegex.exec(htmlText)) !== null) {
        this.extractCssVariables(styleMatch[1], extractedColors, warnings);
      }

      // Also parse any root/body CSS custom properties in the main HTML text
      this.extractCssVariables(htmlText, extractedColors, warnings);

      // 3. Extract Google Font <link> tags
      const fontMatch = htmlText.match(/href=["'](https:\/\/fonts\.googleapis\.com\/css2\?[^"']+)["']/i);
      if (fontMatch) {
        const fontUrl = fontMatch[1];
        baseTheme.typography.fontGoogleUrl = fontUrl;
        try {
          const familyParam = new URL(fontUrl).searchParams.get('family');
          if (familyParam) {
            const fontName = familyParam.split(':')[0].replace(/\+/g, ' ');
            baseTheme.typography.fontName = fontName;
            baseTheme.typography.fontFamily = `'${fontName}', sans-serif`;
          }
        } catch {
          // Ignore URL searchParams error
        }
      }

      // 4. Color Frequency Heuristics for inline style="" and attributes
      const hexCounts = new Map<string, number>();
      const hexRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
      let colorMatch: RegExpExecArray | null;

      while ((colorMatch = hexRegex.exec(htmlText)) !== null) {
        const hex = this.normalizeHex(colorMatch[0]);
        if (hex) {
          hexCounts.set(hex, (hexCounts.get(hex) || 0) + 1);
        }
      }

      // Rank colors by frequency if named CSS variables were sparse
      if (Object.keys(extractedColors).length < 2 && hexCounts.size > 0) {
        const sortedColors = Array.from(hexCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([hex]) => hex);

        if (sortedColors[0] && !extractedColors['bg']) {
          extractedColors['bg'] = sortedColors[0];
        }
        if (sortedColors[1] && !extractedColors['primary']) {
          extractedColors['primary'] = sortedColors[1];
        }
        if (sortedColors[2] && !extractedColors['secondary']) {
          extractedColors['secondary'] = sortedColors[2];
        }
        if (sortedColors[3] && !extractedColors['accent']) {
          extractedColors['accent'] = sortedColors[3];
        }
      }

      // Map colors onto baseTheme
      this.mapColorsToTheme(baseTheme, extractedColors, warnings);

      return {
        success: true,
        theme: baseTheme,
        warnings,
        errors,
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isAbort = err?.name === 'AbortError' || String(err).includes('aborted');
      const errorMsg = isAbort
        ? `Request timed out after ${timeoutMs / 1000} seconds when fetching ${normalizedUrl}`
        : `Failed to import from URL ${normalizedUrl}: ${err?.message || String(err)}`;

      errors.push(errorMsg);
      return {
        success: false,
        theme: null,
        warnings,
        errors,
      };
    }
  }


  /**
   * Imports theme tokens from a design-MD file (X Design System spec or generic Markdown).
   */
  async importFromDesignMd(fileUri: vscode.Uri): Promise<ImportResult> {
    const warnings: string[] = [];
    const errors: string[] = [];

    if (!fileUri || !fileUri.fsPath) {
      return {
        success: false,
        theme: null,
        warnings: [],
        errors: ['Invalid file URI provided.'],
      };
    }

    const lowerPath = fileUri.fsPath.toLowerCase();
    // Validate file extension for non-markdown binary files
    if (
      lowerPath.endsWith('.png') ||
      lowerPath.endsWith('.jpg') ||
      lowerPath.endsWith('.jpeg') ||
      lowerPath.endsWith('.gif') ||
      lowerPath.endsWith('.exe') ||
      lowerPath.endsWith('.zip') ||
      lowerPath.endsWith('.pdf') ||
      lowerPath.endsWith('.bin')
    ) {
      return {
        success: false,
        theme: null,
        warnings: [],
        errors: [`Invalid file type: File '${fileUri.fsPath}' is not a Markdown (.md) document.`],
      };
    }

    let text: string;
    try {
      const data = await vscode.workspace.fs.readFile(fileUri);
      text = new TextDecoder().decode(data);
    } catch (err: any) {
      return {
        success: false,
        theme: null,
        warnings: [],
        errors: [`Failed to read design-MD file: ${err?.message || String(err)}`],
      };
    }

    if (!text || text.trim().length === 0) {
      return {
        success: false,
        theme: null,
        warnings: [],
        errors: ['Design-MD file is empty.'],
      };
    }

    const baseTheme: ThemeConfigV2 = JSON.parse(JSON.stringify(PRESET_THEMES[0]));
    baseTheme.id = `design-md-${Date.now()}`;
    baseTheme.name = 'Imported Design Spec';

    // 1. Detect Theme Title / Name
    const specTitleMatch = text.match(/# Theme Specification:\s*([^\n#\(\)]+)/i) ||
                           text.match(/# ([^\n#]+)/) ||
                           text.match(/\*\*Theme Name\*\*:\s*([^\n\*]+)/i);
    if (specTitleMatch && specTitleMatch[1].trim()) {
      baseTheme.name = specTitleMatch[1].trim();
    }

    // 2. Detect Category & Personality
    const categoryMatch = text.match(/\*\*Category\*\*:\s*([^\n\*]+)/i);
    if (categoryMatch && categoryMatch[1].trim()) {
      baseTheme.category = categoryMatch[1].trim();
    }

    const personalityMatch = text.match(/\*\*Brand Personality\*\*:\s*([^\n\*]+)/i);
    if (personalityMatch && personalityMatch[1].trim()) {
      baseTheme.personality = personalityMatch[1].trim();
    }

    // 3. Extract Typography & Google Fonts
    const fontNameMatch = text.match(/Google Font \*\*([^\*]+)\*\*/i) ||
                          text.match(/Typography\*?\*?:\s*(?:Google Font\s*)?[\*`]?([A-Za-z0-9\s]+)[\*`]?/i);
    if (fontNameMatch && fontNameMatch[1].trim()) {
      const fontName = fontNameMatch[1].trim();
      baseTheme.typography.fontName = fontName;
      baseTheme.typography.fontFamily = `'${fontName}', sans-serif`;
    }

    const fontFamilyMatch = text.match(/font-family:\s*['"]?([^"';]+)['"]?/i) ||
                            text.match(/--theme-font:\s*['"]?([^"';]+)['"]?/i);
    if (fontFamilyMatch && fontFamilyMatch[1].trim()) {
      baseTheme.typography.fontFamily = fontFamilyMatch[1].trim();
    }

    const fontLinkMatch = text.match(/href=["'](https:\/\/fonts\.googleapis\.com\/css2\?[^"']+)["']/i);
    if (fontLinkMatch) {
      const fontUrl = fontLinkMatch[1];
      baseTheme.typography.fontGoogleUrl = fontUrl;
      try {
        const familyParam = new URL(fontUrl).searchParams.get('family');
        if (familyParam) {
          const fontName = familyParam.split(':')[0].replace(/\+/g, ' ');
          baseTheme.typography.fontName = fontName;
          if (!baseTheme.typography.fontFamily || baseTheme.typography.fontFamily.includes('Inter')) {
            baseTheme.typography.fontFamily = `'${fontName}', sans-serif`;
          }
        }
      } catch {
        // Ignore URL parse errors
      }
    }

    const extractedColors: Record<string, string> = {};

    // 4. Parse CSS Custom Properties in code blocks / `:root`
    this.extractCssVariables(text, extractedColors, warnings);

    // 5. Parse Markdown Table rows for Token Name & Hex Value
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.includes('|')) {
        const cells = line.split('|').map((c) => c.trim()).filter((c) => c.length > 0);
        if (cells.length >= 2) {
          // Look for token name in cell 0 or cell 1
          const tokenMatch = cells[0].match(/`?(--[a-zA-Z0-9_-]+|[a-zA-Z0-9_.-]+)`?/) ||
                             cells[0].match(/\*\*([^\*]+)\*\*/);
          const hexMatch = (cells[1] + ' ' + (cells[2] || '')).match(/#([0-9a-fA-F]{3,8})\b/);

          if (tokenMatch && hexMatch) {
            const rawToken = tokenMatch[1].replace(/[\(\)`]/g, '').trim();
            const hex = this.normalizeHex(hexMatch[0]);
            if (hex) {
              extractedColors[rawToken] = hex;
            }
          }
        }
      } else {
        // Parse key-value lines like `Primary: #3B82F6` or `- **Accent**: #F59E0B`
        const varMatch = line.match(/(?:--|`|\*\*|^)([a-zA-Z0-9_-]+)(?:`|\*\*|\s*:)\s*.*?(#[0-9a-fA-F]{3,8})/);
        if (varMatch) {
          const varName = varMatch[1].trim();
          const hex = this.normalizeHex(varMatch[2]);
          if (hex) {
            extractedColors[varName] = hex;
          }
        }
      }
    }

    // 6. Check if any tokens/colors/fonts were recognized
    const hexMatches = text.match(/#([0-9a-fA-F]{3,8})\b/g) || [];
    const hasTokens = Object.keys(extractedColors).length > 0 ||
                      hexMatches.length > 0 ||
                      Boolean(fontNameMatch || fontLinkMatch || fontLinkMatch);

    if (!hasTokens) {
      return {
        success: false,
        theme: null,
        warnings: [],
        errors: ['No recognizable CSS variables, color tables, or theme tokens found in the Markdown file.'],
      };
    }

    // Map extracted colors onto theme
    if (Object.keys(extractedColors).length > 0) {
      this.mapColorsToTheme(baseTheme, extractedColors, warnings);
    } else if (hexMatches.length > 0) {
      const uniqueHexes = Array.from(new Set(hexMatches.map((h) => this.normalizeHex(h)).filter(Boolean))) as string[];
      if (uniqueHexes[0]) baseTheme.colors.bg.hex = uniqueHexes[0];
      if (uniqueHexes[1]) baseTheme.colors.primary.hex = uniqueHexes[1];
      if (uniqueHexes[2]) baseTheme.colors.secondary.hex = uniqueHexes[2];
      if (uniqueHexes[3]) baseTheme.colors.accent.hex = uniqueHexes[3];
    }

    return {
      success: true,
      theme: baseTheme,
      warnings,
      errors,
    };
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
      const normKey = key
        .toLowerCase()
        .replace(/^--/, '')
        .replace(/^theme-/, '')
        .replace(/^color-/, '');

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
      } else if (normKey === 'cta' || normKey === 'button' || normKey === 'btn' || normKey === 'btn-gradient') {
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
      } else if (normKey === 'hero-glow-1' || normKey === 'glow-1' || normKey === 'glow1' || normKey === 'glow-primary') {
        theme.colors.glow.primary.hex = hex;
        mappedVars.add(key);
      } else if (normKey === 'hero-glow-2' || normKey === 'glow-2' || normKey === 'glow2' || normKey === 'glow-secondary') {
        theme.colors.glow.secondary.hex = hex;
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

