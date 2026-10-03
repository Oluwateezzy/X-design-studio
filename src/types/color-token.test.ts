import type { ColorToken, GradientConfig } from './color-token.js';
import {
  colorTokenToCss,
  createFlatToken,
  createGradientToken,
  isGradient,
} from './color-token.js';

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

// Test 1: Flat Token Creation & CSS Conversion
const flatToken: ColorToken = createFlatToken('#3B82F6');
assertEqual(flatToken.hex, '#3B82F6', 'flatToken.hex');
assertEqual(flatToken.gradient, null, 'flatToken.gradient');
assertEqual(isGradient(flatToken), false, 'isGradient(flatToken)');
assertEqual(colorTokenToCss(flatToken), '#3B82F6', 'colorTokenToCss(flatToken)');
console.log('✔ Flat token tests passed');

// Test 2: Gradient Token Creation & CSS Conversion (Linear)
const gradientConfig: GradientConfig = {
  type: 'linear',
  angle: 135,
  stops: [
    { color: '#1E3A8A', position: 0 },
    { color: '#3B82F6', position: 100 },
  ],
};

const gradientToken: ColorToken = createGradientToken('#3B82F6', gradientConfig);
assertEqual(gradientToken.hex, '#3B82F6', 'gradientToken.hex');
assertDeepEqual(gradientToken.gradient, gradientConfig, 'gradientToken.gradient');
assertEqual(isGradient(gradientToken), true, 'isGradient(gradientToken)');
assertEqual(
  colorTokenToCss(gradientToken),
  'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  'colorTokenToCss(gradientToken)'
);
console.log('✔ Gradient token (linear) tests passed');

// Test 3: Radial Gradient CSS Conversion
const radialConfig: GradientConfig = {
  type: 'radial',
  angle: 0,
  stops: [
    { color: '#FF0000', position: 0 },
    { color: '#0000FF', position: 100 },
  ],
};
const radialToken = createGradientToken('#FF0000', radialConfig);
assertEqual(
  colorTokenToCss(radialToken),
  'radial-gradient(circle, #FF0000 0%, #0000FF 100%)',
  'colorTokenToCss(radialToken)'
);
console.log('✔ Gradient token (radial) tests passed');

// Test 4: Conic Gradient CSS Conversion
const conicConfig: GradientConfig = {
  type: 'conic',
  angle: 90,
  stops: [
    { color: '#00FF00', position: 0 },
    { color: '#FFFF00', position: 100 },
  ],
};
const conicToken = createGradientToken('#00FF00', conicConfig);
assertEqual(
  colorTokenToCss(conicToken),
  'conic-gradient(from 90deg, #00FF00 0%, #FFFF00 100%)',
  'colorTokenToCss(conicToken)'
);
console.log('✔ Gradient token (conic) tests passed');

console.log('\nAll ColorToken unit tests passed successfully!');
