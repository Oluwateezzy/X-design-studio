import type { ThemeConfigV2 } from './theme-config-v2.js';

export enum ComponentCategory {
  HERO = 'hero',
  CARD = 'card',
  BUTTON = 'button',
  TABLE = 'table',
  NAV = 'nav',
  HEADER = 'header',
  FOOTER = 'footer',
  SIDEBAR = 'sidebar',
  FORM = 'form',
  MODAL = 'modal',
  BADGE = 'badge',
  CUSTOM = 'custom',
}

export interface ComponentTransition {
  trigger: 'hover' | 'focus' | 'active' | 'enter' | 'exit' | 'scroll';
  property: string; // CSS property
  duration: string;
  easing: string;
  delay?: string;
}

export interface ComponentConfig {
  slug: string;
  name: string;
  category: ComponentCategory | string; // e.g. 'hero', 'card', 'button', 'table', 'nav'
  description: string;
  createdAt: string;
  updatedAt: string;

  // Component-specific design tokens (extend/override global)
  tokens: {
    colors?: Partial<ThemeConfigV2['colors']>;
    typography?: Partial<ThemeConfigV2['typography']>;
    spacing?: Partial<ThemeConfigV2['spacing']>;
    motion?: Partial<ThemeConfigV2['motion']>;
  };

  // Animation/transition specific to this component
  transitions: ComponentTransition[];
}
