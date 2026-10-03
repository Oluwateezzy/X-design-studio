import type { ColorToken } from './color-token.js';

export interface ThemeConfigV2 {
  id: string;
  version: 2;
  name: string;
  category: string;
  personality: string;

  // Typography
  typography: {
    fontFamily: string;
    fontName: string;
    fontGoogleUrl: string;
    headingFont?: string;
    headingFontGoogleUrl?: string;
    baseFontSize: number;
    lineHeight: number;
    fontWeights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
  };

  // Colours — each is a ColorToken (flat + optional gradient)
  colors: {
    bg: ColorToken;
    primary: ColorToken;
    secondary: ColorToken;
    accent: ColorToken;
    surface: ColorToken;
    surfaceBorder: ColorToken;
    text: ColorToken;
    textMuted: ColorToken;
    cta: ColorToken;
    badge: {
      bg: ColorToken;
      border: ColorToken;
      text: ColorToken;
    };
    glow: {
      primary: ColorToken;
      secondary: ColorToken;
    };
    semantic: {
      success: ColorToken;
      warning: ColorToken;
      error: ColorToken;
      info: ColorToken;
    };
  };

  // Spacing & Radius tokens
  spacing: {
    unit: number;
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      pill: string;
    };
  };

  // Animations & Motion
  motion: {
    enableAnimations: boolean;
    transitionDuration: string;
    transitionEasing: string;
    enableGlowOrbs: boolean;
    enableBadgePulse: boolean;
    enableHoverLift: boolean;
  };
}
