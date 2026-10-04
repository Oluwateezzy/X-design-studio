import type { ThemeConfigV2 } from './types/theme-config-v2.js';
export type { ThemeConfigV2 };

export interface ThemeConfig {
  id: string;
  number: number;
  name: string;
  category: string;
  personality: string;
  fontFamily: string;
  fontName: string;
  fontGoogleUrl: string;
  colors: {
    bg: string;
    primary: string;
    secondary: string;
    accent: string;
    cardBg: string;
    cardBorder: string;
    textColor: string;
    mutedText: string;
    btnGradient: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    heroGlow1: string;
    heroGlow2: string;
    success: string;
    warning: string;
    error: string;
  };
}

export type ThemeConfigAny = ThemeConfig | ThemeConfigV2;

export function isThemeV2(theme: ThemeConfigAny): theme is ThemeConfigV2 {
  return 'version' in theme && theme.version === 2;
}

export interface GoogleFontItem {
  family: string;
  category: string;
  variants?: string[];
  subsets?: string[];
}

export type WebviewToExtensionMessage =
  | { type: 'exportFile'; fileName: string; content: string; format: 'html' | 'md' | 'json' | 'css' }
  | { type: 'copyToClipboard'; text: string }
  | { type: 'saveThemeState'; theme: ThemeConfig }
  | { type: 'saveThemeStateV2'; theme: ThemeConfigV2 }
  | { type: 'fetchGoogleFonts'; apiKey?: string }
  | { type: 'showInfoMessage'; message: string }
  | { type: 'openExternal'; url: string }
  | { type: 'openFullStudio' }
  | { type: 'getPersistedState' }
  | { type: 'saveFavorites'; themeIds: string[] }

  // V2 Project & System Messages
  | { type: 'createProject'; name: string; description: string; source?: { type: 'scratch' | 'codebase' | 'url' | 'designMd'; source?: string } }
  | { type: 'openProject'; projectPath: string }
  | { type: 'listProjects' }
  | { type: 'saveGlobalTheme'; theme: ThemeConfigV2 }
  | { type: 'createPage'; name: string; description: string; componentSlugs?: string[] }
  | { type: 'savePage'; slug: string; config: unknown }
  | { type: 'deletePage'; slug: string }
  | { type: 'getPage'; slug: string }
  | { type: 'listPages' }
  | { type: 'createComponent'; name: string; category: string; description: string }
  | { type: 'saveComponent'; slug: string; config: unknown; html: string }
  | { type: 'deleteComponent'; slug: string }
  | { type: 'getComponent'; slug: string }
  | { type: 'listComponents' }
  | { type: 'regenerateFiles'; target: 'global' | 'page' | 'component'; slug?: string }
  | { type: 'importFromSource'; sourceType: 'codebase' | 'url' | 'designMd'; source: string };

export type ExtensionToWebviewMessage =
  | { type: 'restoreState'; theme?: ThemeConfig; favorites?: string[] }
  | { type: 'restoreStateV2'; theme?: ThemeConfigV2; favorites?: string[] }
  | { type: 'googleFontsResult'; items: GoogleFontItem[]; fromApi: boolean }
  | { type: 'fileSaved'; fileName: string; success: boolean }
  | { type: 'settingsChanged'; key: string; value: unknown }
  // V2 Project & System Messages
  | { type: 'projectList'; projects: unknown[] }
  | { type: 'projectLoaded'; manifest: unknown; theme: ThemeConfigV2; pages: unknown[]; components: unknown[] }
  | { type: 'pageLoaded'; config: unknown; resolvedTheme: ThemeConfigV2 }
  | { type: 'componentLoaded'; config: unknown; html: string }
  | { type: 'pageList'; pages: unknown[] }
  | { type: 'componentList'; components: unknown[] }
  | { type: 'importResult'; success: boolean; theme?: ThemeConfigV2; errors?: string[] }
  | { type: 'filesRegenerated'; target: 'global' | 'page' | 'component'; slug?: string; success: boolean };
