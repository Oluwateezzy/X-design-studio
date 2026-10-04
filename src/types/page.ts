import type { ThemeConfigV2 } from './theme-config-v2.js';
import type { ComponentConfig } from './component.js';

export interface PageComponentRef {
  slug: string; // references components/{slug}/
  // Page-local overrides for this specific component instance
  overrides?: Partial<ComponentConfig['tokens']>;
}

export interface PageConfig {
  slug: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  // Inheritance: which tokens override the global theme
  overrides: {
    colors?: Partial<ThemeConfigV2['colors']>;
    typography?: Partial<ThemeConfigV2['typography']>;
    spacing?: Partial<ThemeConfigV2['spacing']>;
    motion?: Partial<ThemeConfigV2['motion']>;
  };

  // Components used on this page (references component slugs)
  components: PageComponentRef[];
}
