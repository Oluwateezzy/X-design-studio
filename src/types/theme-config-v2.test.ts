import { createFlatToken, createGradientToken } from './color-token.js';
import type { ThemeConfigV2 } from './theme-config-v2.js';
import type { ThemeConfig, ThemeConfigAny } from '../messages.js';
import { isThemeV2 } from '../messages.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// Sample V1 ThemeConfig
const v1Theme: ThemeConfig = {
  id: 'v1-sample',
  number: 1,
  name: 'Sample V1',
  category: 'Modern',
  personality: 'Clean',
  fontFamily: 'Inter, sans-serif',
  fontName: 'Inter',
  fontGoogleUrl: 'https://fonts.googleapis.com/css2?family=Inter',
  colors: {
    bg: '#0F172A',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    cardBg: '#1E293B',
    cardBorder: '#334155',
    textColor: '#F8FAFC',
    mutedText: '#94A3B8',
    btnGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    badgeBg: 'rgba(59, 130, 246, 0.1)',
    badgeBorder: 'rgba(59, 130, 246, 0.3)',
    badgeText: '#3B82F6',
    heroGlow1: 'rgba(59, 130, 246, 0.15)',
    heroGlow2: 'rgba(139, 92, 246, 0.15)',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};

// Sample V2 ThemeConfigV2
const v2Theme: ThemeConfigV2 = {
  id: 'v2-sample',
  version: 2,
  name: 'Sample V2',
  category: 'Modern',
  personality: 'Clean',
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontName: 'Inter',
    fontGoogleUrl: 'https://fonts.googleapis.com/css2?family=Inter',
    baseFontSize: 16,
    lineHeight: 1.5,
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  colors: {
    bg: createFlatToken('#0F172A'),
    primary: createFlatToken('#3B82F6'),
    secondary: createFlatToken('#8B5CF6'),
    accent: createFlatToken('#F59E0B'),
    surface: createFlatToken('#1E293B'),
    surfaceBorder: createFlatToken('#334155'),
    text: createFlatToken('#F8FAFC'),
    textMuted: createFlatToken('#94A3B8'),
    cta: createGradientToken('#3B82F6', {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '#3B82F6', position: 0 },
        { color: '#8B5CF6', position: 100 },
      ],
    }),
    badge: {
      bg: createFlatToken('#1E3A8A'),
      border: createFlatToken('#3B82F6'),
      text: createFlatToken('#93C5FD'),
    },
    glow: {
      primary: createFlatToken('#3B82F6'),
      secondary: createFlatToken('#8B5CF6'),
    },
    semantic: {
      success: createFlatToken('#22C55E'),
      warning: createFlatToken('#F59E0B'),
      error: createFlatToken('#EF4444'),
      info: createFlatToken('#3B82F6'),
    },
  },
  spacing: {
    unit: 4,
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      pill: '9999px',
    },
  },
  motion: {
    enableAnimations: true,
    transitionDuration: '0.3s',
    transitionEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    enableGlowOrbs: true,
    enableBadgePulse: true,
    enableHoverLift: true,
  },
};

// Test Discrimination
const unionV1: ThemeConfigAny = v1Theme;
const unionV2: ThemeConfigAny = v2Theme;

assertEqual(isThemeV2(unionV1), false, 'isThemeV2(v1)');
assertEqual(isThemeV2(unionV2), true, 'isThemeV2(v2)');

console.log('✔ ThemeConfigV2 type discrimination tests passed');
console.log('✔ ThemeConfigV2 structure validation passed');
