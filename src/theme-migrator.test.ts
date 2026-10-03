import { migrateV1ToV2, parseCssGradient, rgbaToHex } from './theme-migrator.js';
import { colorTokenToCss } from './types/color-token.js';
import type { ThemeConfig } from './messages.js';

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

// Validation Criterion 1: parseCssGradient
const parsedGrad = parseCssGradient('linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)');
assertDeepEqual(parsedGrad, {
  type: 'linear',
  angle: 135,
  stops: [
    { color: '#1E3A8A', position: 0 },
    { color: '#3B82F6', position: 100 },
  ],
}, 'parseCssGradient linear 135deg');
console.log('✔ parseCssGradient test passed');

// Validation Criterion 2: rgbaToHex
const hexResult = rgbaToHex('rgba(17, 24, 39, 0.8)');
assertEqual(hexResult, '#111827', 'rgbaToHex rgba(17, 24, 39, 0.8)');
console.log('✔ rgbaToHex test passed');

// Validation Criterion 3: Round-trip test (V1 -> V2 -> CSS output matches original V1 btnGradient)
const sampleV1: ThemeConfig = {
  id: 'sample-v1',
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
    btnGradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
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

const migratedV2 = migrateV1ToV2(sampleV1);
const generatedCtaCss = colorTokenToCss(migratedV2.colors.cta);
assertEqual(generatedCtaCss, sampleV1.colors.btnGradient, 'Round-trip CSS gradient match');
console.log('✔ Round-trip V1 -> V2 -> CSS output test passed');

console.log('\nAll ThemeMigrator core tests passed successfully!');
