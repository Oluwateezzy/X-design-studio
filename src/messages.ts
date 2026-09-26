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
  | { type: 'fetchGoogleFonts'; apiKey?: string }
  | { type: 'showInfoMessage'; message: string }
  | { type: 'openExternal'; url: string }
  | { type: 'getPersistedState' }
  | { type: 'saveFavorites'; themeIds: string[] };

export type ExtensionToWebviewMessage =
  | { type: 'restoreState'; theme?: ThemeConfig; favorites?: string[] }
  | { type: 'googleFontsResult'; items: GoogleFontItem[]; fromApi: boolean }
  | { type: 'fileSaved'; fileName: string; success: boolean }
  | { type: 'settingsChanged'; key: string; value: unknown };
