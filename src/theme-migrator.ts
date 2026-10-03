import type { ThemeConfig } from './messages.js';
import type { ThemeConfigV2 } from './types/theme-config-v2.js';
import type { GradientConfig, GradientStop } from './types/color-token.js';
import { createFlatToken, createGradientToken, colorTokenToCss } from './types/color-token.js';

/**
 * Converts an RGBA/RGB/Hex string to a 6-character hex string (#RRGGBB).
 * Strips alpha values or translucent alpha channels.
 */
export function rgbaToHex(colorStr: string): string {
  if (!colorStr) return '#000000';
  const trimmed = colorStr.trim();

  // Handle #RRGGBBAA or #RRGGBB or #RGB
  if (trimmed.startsWith('#')) {
    const hexClean = trimmed.replace('#', '');
    if (hexClean.length === 3) {
      const r = hexClean[0];
      const g = hexClean[1];
      const b = hexClean[2];
      return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
    }
    if (hexClean.length >= 6) {
      return `#${hexClean.substring(0, 6)}`.toUpperCase();
    }
  }

  // Handle rgba(r, g, b, a) or rgb(r, g, b)
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (rgbMatch) {
    const r = Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10)));
    const g = Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10)));
    const b = Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10)));

    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`.toUpperCase();
  }

  // Handle hsla(h, s%, l%, a) or hsl(h, s%, l%)
  const hslMatch = trimmed.match(/^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10) / 360;
    const s = parseInt(hslMatch[2], 10) / 100;
    const l = parseInt(hslMatch[3], 10) / 100;

    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const rHex = Math.round(r * 255).toString(16).padStart(2, '0');
    const gHex = Math.round(g * 255).toString(16).padStart(2, '0');
    const bHex = Math.round(b * 255).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`.toUpperCase();
  }

  // Fallback if not recognized
  return trimmed;
}

/**
 * Parses a CSS gradient string into a GradientConfig object or null if invalid.
 * Example input: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)"
 */
export function parseCssGradient(cssString: string): GradientConfig | null {
  if (!cssString || typeof cssString !== 'string') {
    return null;
  }

  const trimmed = cssString.trim();
  const gradientMatch = trimmed.match(/^(linear|radial|conic)-gradient\((.*)\)$/i);
  if (!gradientMatch) {
    return null;
  }

  const type = gradientMatch[1].toLowerCase() as 'linear' | 'radial' | 'conic';
  const rawArgs = gradientMatch[2];

  // Split arguments by comma outside of parentheses
  const args: string[] = [];
  let current = '';
  let parenCount = 0;

  for (let i = 0; i < rawArgs.length; i++) {
    const char = rawArgs[i];
    if (char === '(') parenCount++;
    else if (char === ')') parenCount--;

    if (char === ',' && parenCount === 0) {
      args.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    args.push(current.trim());
  }

  if (args.length === 0) {
    return null;
  }

  let angle = 180;
  let stopStartIndex = 0;

  // Check if first arg specifies angle or direction
  const firstArg = args[0].toLowerCase();
  if (type === 'linear') {
    if (firstArg.endsWith('deg')) {
      angle = parseFloat(firstArg);
      stopStartIndex = 1;
    } else if (firstArg.startsWith('to ')) {
      stopStartIndex = 1;
      if (firstArg === 'to top') angle = 0;
      else if (firstArg === 'to right') angle = 90;
      else if (firstArg === 'to bottom') angle = 180;
      else if (firstArg === 'to left') angle = 270;
      else if (firstArg === 'to top right' || firstArg === 'to right top') angle = 45;
      else if (firstArg === 'to bottom right' || firstArg === 'to right bottom') angle = 135;
      else if (firstArg === 'to bottom left' || firstArg === 'to left bottom') angle = 225;
      else if (firstArg === 'to top left' || firstArg === 'to left top') angle = 315;
    }
  } else if (type === 'conic') {
    if (firstArg.startsWith('from ') && firstArg.includes('deg')) {
      const degMatch = firstArg.match(/from\s+([\d.]+)deg/);
      if (degMatch) {
        angle = parseFloat(degMatch[1]);
      }
      stopStartIndex = 1;
    } else {
      angle = 0;
    }
  } else if (type === 'radial') {
    angle = 0;
    if (firstArg.startsWith('circle') || firstArg.startsWith('ellipse') || firstArg.includes('at ')) {
      stopStartIndex = 1;
    }
  }

  const rawStops = args.slice(stopStartIndex);
  if (rawStops.length < 2) {
    return null;
  }

  const stops: GradientStop[] = [];
  const totalRaw = rawStops.length;

  for (let i = 0; i < totalRaw; i++) {
    const rawStop = rawStops[i].trim();
    const stopMatch = rawStop.match(/^(.*?)(?:\s+([\d.]+)%)?$/);
    if (!stopMatch) continue;

    const rawColor = stopMatch[1].trim();
    const posStr = stopMatch[2];

    const color = rgbaToHex(rawColor);
    let position: number;

    if (posStr !== undefined) {
      position = parseFloat(posStr);
    } else {
      position = Math.round((i / (totalRaw - 1)) * 100);
    }

    stops.push({ color, position });
  }

  if (stops.length < 2) {
    return null;
  }

  return {
    type,
    angle,
    stops,
  };
}

/**
 * Migrates a V1 ThemeConfig object to a ThemeConfigV2 object.
 */
export function migrateV1ToV2(v1: ThemeConfig): ThemeConfigV2 {
  const parsedGradient = parseCssGradient(v1.colors.btnGradient);
  const primaryHex = rgbaToHex(v1.colors.primary);

  const ctaToken = parsedGradient
    ? createGradientToken(primaryHex, parsedGradient)
    : createFlatToken(primaryHex);

  return {
    id: v1.id,
    version: 2,
    name: v1.name,
    category: v1.category,
    personality: v1.personality,

    typography: {
      fontFamily: v1.fontFamily,
      fontName: v1.fontName,
      fontGoogleUrl: v1.fontGoogleUrl,
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
      bg: createFlatToken(rgbaToHex(v1.colors.bg)),
      primary: createFlatToken(primaryHex),
      secondary: createFlatToken(rgbaToHex(v1.colors.secondary)),
      accent: createFlatToken(rgbaToHex(v1.colors.accent)),
      surface: createFlatToken(rgbaToHex(v1.colors.cardBg)),
      surfaceBorder: createFlatToken(rgbaToHex(v1.colors.cardBorder)),
      text: createFlatToken(rgbaToHex(v1.colors.textColor)),
      textMuted: createFlatToken(rgbaToHex(v1.colors.mutedText)),
      cta: ctaToken,
      badge: {
        bg: createFlatToken(rgbaToHex(v1.colors.badgeBg)),
        border: createFlatToken(rgbaToHex(v1.colors.badgeBorder)),
        text: createFlatToken(rgbaToHex(v1.colors.badgeText)),
      },
      glow: {
        primary: createFlatToken(rgbaToHex(v1.colors.heroGlow1)),
        secondary: createFlatToken(rgbaToHex(v1.colors.heroGlow2)),
      },
      semantic: {
        success: createFlatToken(rgbaToHex(v1.colors.success)),
        warning: createFlatToken(rgbaToHex(v1.colors.warning)),
        error: createFlatToken(rgbaToHex(v1.colors.error)),
        info: createFlatToken(primaryHex),
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
}

/**
 * Converts a ThemeConfigV2 back to a V1 ThemeConfig for backward-compatible rendering.
 */
export function v2ToV1(v2: ThemeConfigV2): ThemeConfig {
  const numId = parseInt(v2.id.replace(/\D/g, ''), 10);
  return {
    id: v2.id,
    number: isNaN(numId) ? 1 : numId,
    name: v2.name,
    category: v2.category,
    personality: v2.personality,
    fontFamily: v2.typography.fontFamily,
    fontName: v2.typography.fontName,
    fontGoogleUrl: v2.typography.fontGoogleUrl,
    colors: {
      bg: colorTokenToCss(v2.colors.bg),
      primary: colorTokenToCss(v2.colors.primary),
      secondary: colorTokenToCss(v2.colors.secondary),
      accent: colorTokenToCss(v2.colors.accent),
      cardBg: colorTokenToCss(v2.colors.surface),
      cardBorder: colorTokenToCss(v2.colors.surfaceBorder),
      textColor: colorTokenToCss(v2.colors.text),
      mutedText: colorTokenToCss(v2.colors.textMuted),
      btnGradient: colorTokenToCss(v2.colors.cta),
      badgeBg: colorTokenToCss(v2.colors.badge.bg),
      badgeBorder: colorTokenToCss(v2.colors.badge.border),
      badgeText: colorTokenToCss(v2.colors.badge.text),
      heroGlow1: colorTokenToCss(v2.colors.glow.primary),
      heroGlow2: colorTokenToCss(v2.colors.glow.secondary),
      success: colorTokenToCss(v2.colors.semantic.success),
      warning: colorTokenToCss(v2.colors.semantic.warning),
      error: colorTokenToCss(v2.colors.semantic.error),
    },
  };
}
