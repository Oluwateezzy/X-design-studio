export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientConfig {
  type: 'linear' | 'radial' | 'conic';
  angle: number;
  stops: GradientStop[];
}

export interface ColorToken {
  hex: string;
  gradient: GradientConfig | null;
}

/**
 * Checks if a ColorToken has an active gradient configuration.
 */
export function isGradient(token: ColorToken): boolean {
  return token.gradient !== null && Array.isArray(token.gradient.stops) && token.gradient.stops.length > 0;
}

/**
 * Helper to create a flat ColorToken with no gradient.
 */
export function createFlatToken(hex: string): ColorToken {
  return {
    hex,
    gradient: null,
  };
}

/**
 * Helper to create a gradient ColorToken.
 */
export function createGradientToken(hex: string, gradient: GradientConfig): ColorToken {
  return {
    hex,
    gradient,
  };
}

/**
 * Converts a ColorToken to its CSS string representation (hex color or CSS gradient).
 */
export function colorTokenToCss(token: ColorToken): string {
  if (!token.gradient || !Array.isArray(token.gradient.stops) || token.gradient.stops.length === 0) {
    return token.hex;
  }

  const { type, angle, stops } = token.gradient;
  const stopsCss = stops.map((stop) => `${stop.color} ${stop.position}%`).join(', ');

  switch (type) {
    case 'linear':
      return `linear-gradient(${angle}deg, ${stopsCss})`;
    case 'radial':
      return `radial-gradient(circle, ${stopsCss})`;
    case 'conic':
      return `conic-gradient(from ${angle}deg, ${stopsCss})`;
    default:
      return `linear-gradient(${angle}deg, ${stopsCss})`;
  }
}
