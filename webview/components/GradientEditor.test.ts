import type { ColorToken, GradientConfig } from '../lib/types/color-token.js';
import { colorTokenToCss, createFlatToken, createGradientToken, isGradient } from '../lib/types/color-token.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// Helper simulating Flat -> Gradient toggle logic
function toggleToGradient(flatToken: ColorToken): ColorToken {
  const defaultGradient: GradientConfig = {
    type: 'linear',
    angle: 135,
    stops: [
      { color: flatToken.hex, position: 0 },
      { color: '#1E3A8A', position: 100 },
    ],
  };
  return createGradientToken(flatToken.hex, defaultGradient);
}

// Helper simulating Gradient -> Flat toggle logic
function toggleToFlat(gradToken: ColorToken): ColorToken {
  return createFlatToken(gradToken.hex);
}

// Helper simulating Add Stop logic
function addStopMidpoint(token: ColorToken): ColorToken {
  if (!token.gradient) return token;
  const sorted = [...token.gradient.stops].sort((a, b) => a.position - b.position);
  const midPos = Math.round((sorted[0].position + sorted[1].position) / 2);
  const updatedStops = [...sorted];
  updatedStops.splice(1, 0, { color: sorted[0].color, position: midPos });
  return createGradientToken(token.hex, { ...token.gradient, stops: updatedStops });
}

// Helper simulating Remove Stop logic
function removeStop(token: ColorToken, index: number): ColorToken {
  if (!token.gradient || token.gradient.stops.length <= 2) return token;
  const updatedStops = token.gradient.stops.filter((_, i) => i !== index);
  return createGradientToken(token.hex, { ...token.gradient, stops: updatedStops });
}

// Test 1: Flat -> Gradient toggle
const flat = createFlatToken('#3B82F6');
const toggledGrad = toggleToGradient(flat);
assertEqual(isGradient(toggledGrad), true, 'isGradient(toggledGrad)');
assertEqual(toggledGrad.hex, '#3B82F6', 'toggledGrad.hex');
assertEqual(toggledGrad.gradient!.stops.length, 2, 'toggledGrad 2 stops');
assertEqual(toggledGrad.gradient!.stops[0].color, '#3B82F6', 'stop 0 color');
console.log('✔ Toggling Flat -> Gradient creates default 2-stop gradient with hex');

// Test 2: Gradient -> Flat toggle
const toggledFlat = toggleToFlat(toggledGrad);
assertEqual(isGradient(toggledFlat), false, 'isGradient(toggledFlat)');
assertEqual(toggledFlat.hex, '#3B82F6', 'toggledFlat hex preserved');
console.log('✔ Toggling Gradient -> Flat preserves hex');

// Test 3: Add Stop inserts at midpoint
const with3Stops = addStopMidpoint(toggledGrad);
assertEqual(with3Stops.gradient!.stops.length, 3, '3 stops count');
assertEqual(with3Stops.gradient!.stops[1].position, 50, 'midpoint position 50');
console.log('✔ Adding stop inserts at midpoint (50%)');

// Test 4: Remove Stop (when > 2)
const backTo2Stops = removeStop(with3Stops, 1);
assertEqual(backTo2Stops.gradient!.stops.length, 2, 'back to 2 stops');
console.log('✔ Removing stop (when > 2) removes correctly');

// Test 5: CSS Preview rendering
const previewCss = colorTokenToCss(toggledGrad);
assertEqual(previewCss, 'linear-gradient(135deg, #3B82F6 0%, #1E3A8A 100%)', 'CSS gradient output');
console.log('✔ Preview bar shows accurate gradient rendering');

console.log('\nAll GradientEditor logic tests passed successfully!');
