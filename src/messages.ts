import type { ThemeConfigV2 } from './types/theme-config-v2.js';
import type { ProjectManifest, ProjectCreationSource } from './types/project.js';
import type { PageConfig } from './types/page.js';
import type { ComponentConfig, ComponentCategory } from './types/component.js';

export type {
  ThemeConfigV2,
  ProjectManifest,
  ProjectCreationSource,
  PageConfig,
  ComponentConfig,
  ComponentCategory,
};

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

// V1 Messages
export type WebviewToExtensionMessageV1 =
  | { type: 'exportFile'; fileName: string; content: string; format: 'html' | 'md' | 'json' | 'css' }
  | { type: 'copyToClipboard'; text: string }
  | { type: 'saveThemeState'; theme: ThemeConfig }
  | { type: 'saveThemeStateV2'; theme: ThemeConfigV2 }
  | { type: 'fetchGoogleFonts'; apiKey?: string }
  | { type: 'showInfoMessage'; message: string }
  | { type: 'openExternal'; url: string }
  | { type: 'openFullStudio' }
  | { type: 'getPersistedState' }
  | { type: 'saveFavorites'; themeIds: string[] };

export type ExtensionToWebviewMessageV1 =
  | { type: 'restoreState'; theme?: ThemeConfig; favorites?: string[] }
  | { type: 'restoreStateV2'; theme?: ThemeConfigV2; favorites?: string[] }
  | { type: 'googleFontsResult'; items: GoogleFontItem[]; fromApi: boolean }
  | { type: 'fileSaved'; fileName: string; success: boolean }
  | { type: 'settingsChanged'; key: string; value: unknown };

// V2 Messages — Architecture §4.3
export type WebviewToExtensionMessageV2 =
  | { type: 'createProject'; name: string; description: string; source?: ProjectCreationSource }
  | { type: 'openProject'; projectPath: string }
  | { type: 'listProjects' }
  | { type: 'saveGlobalTheme'; theme: ThemeConfigV2 }
  | { type: 'createPage'; name: string; description: string; componentSlugs?: string[] }
  | { type: 'savePage'; slug: string; config: PageConfig }
  | { type: 'deletePage'; slug: string }
  | { type: 'getPage'; slug: string }
  | { type: 'listPages' }
  | { type: 'createComponent'; name: string; category: ComponentCategory | string; description: string }
  | { type: 'saveComponent'; slug: string; config: ComponentConfig; html: string }
  | { type: 'deleteComponent'; slug: string }
  | { type: 'getComponent'; slug: string }
  | { type: 'listComponents' }
  | { type: 'regenerateFiles'; target: 'global' | 'page' | 'component'; slug?: string }
  | { type: 'importFromSource'; sourceType: 'codebase' | 'url' | 'designMd'; source: string };

export type ExtensionToWebviewMessageV2 =
  | { type: 'projectList'; projects: ProjectManifest[] }
  | { type: 'projectLoaded'; manifest: ProjectManifest; theme: ThemeConfigV2; pages: PageConfig[]; components: ComponentConfig[] }
  | { type: 'pageLoaded'; config: PageConfig; resolvedTheme: ThemeConfigV2 }
  | { type: 'componentLoaded'; config: ComponentConfig; html: string }
  | { type: 'pageList'; pages: PageConfig[] }
  | { type: 'componentList'; components: ComponentConfig[] }
  | { type: 'importResult'; success: boolean; theme?: ThemeConfigV2; errors?: string[] }
  | { type: 'filesRegenerated'; target: 'global' | 'page' | 'component'; slug?: string; success: boolean };

// Composite Message Types
export type WebviewToExtensionMessage = WebviewToExtensionMessageV1 | WebviewToExtensionMessageV2;
export type ExtensionToWebviewMessage = ExtensionToWebviewMessageV1 | ExtensionToWebviewMessageV2;

// Message Type Sets for Type Guard Discrimination
export const V2_WEBVIEW_MESSAGE_TYPES: ReadonlySet<string> = new Set([
  'createProject',
  'openProject',
  'listProjects',
  'saveGlobalTheme',
  'createPage',
  'savePage',
  'deletePage',
  'getPage',
  'listPages',
  'createComponent',
  'saveComponent',
  'deleteComponent',
  'getComponent',
  'listComponents',
  'regenerateFiles',
  'importFromSource',
]);

export const V2_EXTENSION_MESSAGE_TYPES: ReadonlySet<string> = new Set([
  'projectList',
  'projectLoaded',
  'pageLoaded',
  'componentLoaded',
  'pageList',
  'componentList',
  'importResult',
  'filesRegenerated',
]);

/**
 * Type guard for V2 Webview -> Extension messages
 */
export function isV2WebviewMessage(msg: unknown): msg is WebviewToExtensionMessageV2 {
  return (
    typeof msg === 'object' &&
    msg !== null &&
    'type' in msg &&
    typeof (msg as { type: unknown }).type === 'string' &&
    V2_WEBVIEW_MESSAGE_TYPES.has((msg as { type: string }).type)
  );
}

/**
 * Type guard for V2 Extension -> Webview messages
 */
export function isV2ExtensionMessage(msg: unknown): msg is ExtensionToWebviewMessageV2 {
  return (
    typeof msg === 'object' &&
    msg !== null &&
    'type' in msg &&
    typeof (msg as { type: unknown }).type === 'string' &&
    V2_EXTENSION_MESSAGE_TYPES.has((msg as { type: string }).type)
  );
}

/**
 * General Type guard for any V2 message (Webview or Extension)
 */
export function isV2Message(
  msg: unknown
): msg is WebviewToExtensionMessageV2 | ExtensionToWebviewMessageV2 {
  return isV2WebviewMessage(msg) || isV2ExtensionMessage(msg);
}

