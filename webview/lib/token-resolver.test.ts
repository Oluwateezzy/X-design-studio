import { PRESET_THEMES } from './themes-dataset.js';
import {
  deepMergeTheme,
  resolvePageTheme,
  resolveComponentTokens,
  getOverriddenKeys,
} from './token-resolver.js';
import type { PageConfig, PageComponentRef, ComponentConfig } from '../../src/types/index.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertDeepEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('Testing Token Inheritance Resolver (Task 2.3)...');

const globalTheme = PRESET_THEMES[0]; // Obsidian Vault (#0B0F19 bg, #1E3A8A primary)

// Test deepMergeTheme directly
const mergedDirect = deepMergeTheme(globalTheme, {
  colors: {
    primary: { hex: '#00FF00', gradient: null },
  } as any,
});
assertEqual(mergedDirect.colors.primary.hex, '#00FF00', 'deepMergeTheme overrides primary hex');
assertEqual(mergedDirect.colors.bg.hex, globalTheme.colors.bg.hex, 'deepMergeTheme preserves non-overridden bg hex');
console.log('✔ deepMergeTheme() correctly merges themes');


// Validation Criterion 1: resolvePageTheme(global, emptyOverrides) returns global unchanged
const emptyPage: PageConfig = {
  slug: 'empty-page',
  name: 'Empty Page',
  description: 'Page with no overrides',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  overrides: {},
  components: [],
};

const resolvedEmptyPageTheme = resolvePageTheme(globalTheme, emptyPage);
assertDeepEqual(resolvedEmptyPageTheme, globalTheme, 'Empty page overrides returns global theme unchanged');
console.log('✔ resolvePageTheme(global, emptyOverrides) returns global unchanged');

// Validation Criterion 2: resolvePageTheme(global, { colors: { primary: ... } }) overrides only primary
const customPrimaryPage: PageConfig = {
  slug: 'custom-primary-page',
  name: 'Custom Primary Page',
  description: 'Page overriding primary color',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  overrides: {
    colors: {
      primary: { hex: '#FF0000', gradient: null },
    } as any,
  },
  components: [],
};

const resolvedPrimaryPageTheme = resolvePageTheme(globalTheme, customPrimaryPage);
assertEqual(resolvedPrimaryPageTheme.colors.primary.hex, '#FF0000', 'Page primary color overridden to #FF0000');
assertEqual(resolvedPrimaryPageTheme.colors.bg.hex, globalTheme.colors.bg.hex, 'Page background color remains unchanged from global');
assertEqual(resolvedPrimaryPageTheme.colors.secondary.hex, globalTheme.colors.secondary.hex, 'Page secondary color remains unchanged from global');
console.log('✔ resolvePageTheme overrides only specified primary token');

// Validation Criterion 3: Nested objects merge correctly (badge.bg override doesn't erase badge.text)
const badgeOverridePage: PageConfig = {
  slug: 'badge-page',
  name: 'Badge Page',
  description: 'Page overriding badge bg only',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  overrides: {
    colors: {
      badge: {
        bg: { hex: '#112233', gradient: null },
      },
    } as any,
  },
  components: [],
};

const resolvedBadgeTheme = resolvePageTheme(globalTheme, badgeOverridePage);
assertEqual(resolvedBadgeTheme.colors.badge.bg.hex, '#112233', 'Badge bg overridden to #112233');
assertEqual(resolvedBadgeTheme.colors.badge.text.hex, globalTheme.colors.badge.text.hex, 'Badge text color preserved');
assertEqual(resolvedBadgeTheme.colors.badge.border.hex, globalTheme.colors.badge.border.hex, 'Badge border color preserved');
console.log('✔ Nested objects merge correctly (badge.bg override doesn\'t erase badge.text)');

// Validation Criterion 4: getOverriddenKeys() correctly identifies overridden paths
const multiOverridePage: PageConfig = {
  slug: 'multi-page',
  name: 'Multi Override Page',
  description: 'Page with multiple token overrides',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  overrides: {
    colors: {
      primary: { hex: '#FF0000', gradient: null },
      badge: {
        bg: { hex: '#112233', gradient: null },
      },
    } as any,
    typography: {
      fontName: 'Outfit',
    } as any,
  },
  components: [],
};

const overriddenKeys = getOverriddenKeys(globalTheme, multiOverridePage);
assertEqual(overriddenKeys.includes('colors.primary'), true, 'getOverriddenKeys includes colors.primary');
assertEqual(overriddenKeys.includes('colors.badge.bg'), true, 'getOverriddenKeys includes colors.badge.bg');
assertEqual(overriddenKeys.includes('typography.fontName'), true, 'getOverriddenKeys includes typography.fontName');
assertEqual(overriddenKeys.includes('colors.bg'), false, 'getOverriddenKeys excludes non-overridden colors.bg');
console.log('✔ getOverriddenKeys() correctly identifies overridden paths');

// Validation Criterion 5: resolveComponentTokens 4-tier hierarchy (Global -> Page -> Component -> PageRef)
const heroComponent: ComponentConfig = {
  slug: 'hero-banner',
  name: 'Hero Banner',
  category: 'hero',
  description: 'Hero component',
  createdAt: '2026-10-04T00:00:00.000Z',
  updatedAt: '2026-10-04T00:00:00.000Z',
  tokens: {
    colors: {
      secondary: { hex: '#555555', gradient: null },
      accent: { hex: '#666666', gradient: null },
    } as any,
  },
  transitions: [],
};

const pageRef: PageComponentRef = {
  slug: 'hero-banner',
  overrides: {
    colors: {
      accent: { hex: '#999999', gradient: null },
    } as any,
  },
};

const resolvedCompTokens = resolveComponentTokens(
  globalTheme,
  multiOverridePage,
  heroComponent,
  pageRef
);

assertEqual(resolvedCompTokens.colors.primary.hex, '#FF0000', 'Tier 2 (Page override) applied for primary');
assertEqual(resolvedCompTokens.colors.secondary.hex, '#555555', 'Tier 3 (Component token override) applied for secondary');
assertEqual(resolvedCompTokens.colors.accent.hex, '#999999', 'Tier 4 (PageComponentRef override) applied for accent');
assertEqual(resolvedCompTokens.colors.bg.hex, globalTheme.colors.bg.hex, 'Tier 1 (Global default) preserved for bg');

console.log('✔ resolveComponentTokens() 4-tier hierarchy tests passed');
console.log('\nAll Task 2.3 Token Inheritance Resolver unit tests passed successfully!');
