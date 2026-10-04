import type { ThemeConfigV2, PageConfig, PageComponentRef, ComponentConfig } from './types/index.js';

/**
 * Checks if a value is a plain JavaScript object (not null, array, Date, etc.)
 */
export function isPlainObject(item: unknown): item is Record<string, unknown> {
  return (
    item !== null &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof Date) &&
    !(item instanceof RegExp)
  );
}

/**
 * Performs a recursive deep merge of base theme with overrides.
 * - null/undefined in overrides inherits from base
 * - defined values in overrides replace base values
 * - nested objects merge recursively
 * - arrays (e.g. gradient stops) replace completely
 */
export function deepMergeTheme(
  base: ThemeConfigV2,
  overrides?: Partial<ThemeConfigV2>
): ThemeConfigV2 {
  if (!overrides || Object.keys(overrides).length === 0) {
    return JSON.parse(JSON.stringify(base));
  }

  function mergeObjects<T>(target: T, source: unknown): T {
    if (source === undefined || source === null) {
      return JSON.parse(JSON.stringify(target));
    }

    if (!isPlainObject(target) || !isPlainObject(source)) {
      return (Array.isArray(source) ? [...source] : source) as unknown as T;
    }

    const result = JSON.parse(JSON.stringify(target)) as Record<string, unknown>;

    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = result[key];

      if (sourceVal === undefined || sourceVal === null) {
        continue; // inherit from parent
      }

      if (Array.isArray(sourceVal)) {
        result[key] = [...sourceVal]; // replace arrays completely
      } else if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
        result[key] = mergeObjects(targetVal, sourceVal);
      } else {
        result[key] = sourceVal;
      }
    }

    return result as T;
  }

  return mergeObjects(base, overrides);
}

/**
 * Resolves the theme for a specific page by applying page overrides onto the global theme.
 */
export function resolvePageTheme(
  global: ThemeConfigV2,
  page: PageConfig
): ThemeConfigV2 {
  if (!page || !page.overrides) {
    return JSON.parse(JSON.stringify(global));
  }
  return deepMergeTheme(global, page.overrides as Partial<ThemeConfigV2>);
}

/**
 * Resolves the final theme tokens for a component instance on a page,
 * enforcing the 4-tier inheritance chain:
 * Global → Page → Component → Page-Component Reference Override.
 */
export function resolveComponentTokens(
  global: ThemeConfigV2,
  page: PageConfig,
  component: ComponentConfig,
  pageRef?: PageComponentRef
): ThemeConfigV2 {
  // Step 1 & 2: Global -> Page Overrides
  let theme = resolvePageTheme(global, page);

  // Step 3: Component-level tokens override
  if (component && component.tokens) {
    theme = deepMergeTheme(theme, component.tokens as Partial<ThemeConfigV2>);
  }

  // Step 4: Page-Component instance reference override
  if (pageRef && pageRef.overrides) {
    theme = deepMergeTheme(theme, pageRef.overrides as Partial<ThemeConfigV2>);
  }

  return theme;
}

/**
 * Scans page overrides and returns a list of dot-notation key paths that have been customized
 * relative to the global theme (e.g. ['colors.primary', 'colors.badge.bg', 'typography.fontName']).
 */
export function getOverriddenKeys(
  _global: ThemeConfigV2,
  page: PageConfig
): string[] {

  if (!page || !page.overrides) {
    return [];
  }

  const paths: string[] = [];

  function collectPaths(obj: Record<string, unknown>, currentPath: string) {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val === undefined || val === null) {
        continue;
      }

      const newPath = currentPath ? `${currentPath}.${key}` : key;

      if (isPlainObject(val) && Object.keys(val).length > 0) {
        // ColorToken ({ hex, gradient }) is treated as a single token path
        if ('hex' in val && typeof val.hex === 'string') {
          paths.push(newPath);
        } else {
          collectPaths(val as Record<string, unknown>, newPath);
        }
      } else {
        paths.push(newPath);
      }
    }
  }

  collectPaths(page.overrides as Record<string, unknown>, '');
  return paths;
}

