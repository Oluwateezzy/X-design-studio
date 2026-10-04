import type { ThemeConfigV2 } from "./types/theme-config-v2";
import { colorTokenToCss } from "./types/color-token";
import { hexToHsl, checkWcag } from "./color-utils";

export function generateThemeMarkdown(theme: ThemeConfigV2): string {
  const { colors, name, category, personality, typography } = theme;
  const number = parseInt(theme.id.replace(/\D/g, ""), 10) || 1;

  const bgCss = colorTokenToCss(colors.bg);
  const primaryCss = colorTokenToCss(colors.primary);
  const secondaryCss = colorTokenToCss(colors.secondary);
  const accentCss = colorTokenToCss(colors.accent);
  const surfaceCss = colorTokenToCss(colors.surface);
  const surfaceBorderCss = colorTokenToCss(colors.surfaceBorder);
  const textCss = colorTokenToCss(colors.text);
  const textMutedCss = colorTokenToCss(colors.textMuted);
  const ctaCss = colorTokenToCss(colors.cta);
  const badgeBgCss = colorTokenToCss(colors.badge.bg);
  const badgeBorderCss = colorTokenToCss(colors.badge.border);
  const badgeTextCss = colorTokenToCss(colors.badge.text);
  const glow1Css = colorTokenToCss(colors.glow.primary);
  const glow2Css = colorTokenToCss(colors.glow.secondary);

  const bgHsl = hexToHsl(colors.bg.hex);
  const primaryHsl = hexToHsl(colors.primary.hex);
  const accentHsl = hexToHsl(colors.accent.hex);

  const textContrast = checkWcag(colors.text.hex, colors.bg.hex);
  const mutedContrast = checkWcag(colors.textMuted.hex, colors.bg.hex);
  const accentContrast = checkWcag(colors.accent.hex, colors.bg.hex);

  return `# Theme Specification: ${name} (Theme #${number})

**Category**: ${category}  
**Brand Personality**: ${personality}  
**Typography**: Google Font **${typography.fontName}** (\`font-family: ${typography.fontFamily}\`)  

---

## 1. Typography & Google Fonts Setup

Include this Google Fonts link in your \`<head>\` or \`index.html\`:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${typography.fontGoogleUrl}&display=swap" rel="stylesheet">
\`\`\`

---

## 2. Color Palette Tokens (V2 System)

| Token Name | Hex Value | HSL Value | Target Usage |
| :--- | :--- | :--- | :--- |
| **Background (\`--theme-bg\`)** | \`${colors.bg.hex}\` | \`hsl(${bgHsl.h}, ${bgHsl.s}%, ${bgHsl.l}%)\` | Main app background, body, dark canvas |
| **Primary (\`--theme-primary\`)** | \`${colors.primary.hex}\` | \`hsl(${primaryHsl.h}, ${primaryHsl.s}%, ${primaryHsl.l}%)\` | Primary brand background, header fill, solid cards |
| **Secondary (\`--theme-secondary\`)** | \`${colors.secondary.hex}\` | - | Secondary actions, hover fills, subtle highlights |
| **Accent (\`--theme-accent\`)** | \`${colors.accent.hex}\` | \`hsl(${accentHsl.h}, ${accentHsl.s}%, ${accentHsl.l}%)\` | Hero text highlight, focus rings, key indicators |
| **Card Surface (\`--theme-card-bg\`)** | \`${colors.surface.hex}\` | Glass / Translucent | Card containers, modal popups, tables |
| **Card Border (\`--theme-card-border\`)** | \`${colors.surfaceBorder.hex}\` | Semi-transparent | Card edges, subtle grid dividers |
| **Text Primary (\`--theme-text-color\`)** | \`${colors.text.hex}\` | High Contrast | Headings, primary body copy, numbers |
| **Text Muted (\`--theme-muted-text\`)** | \`${colors.textMuted.hex}\` | Medium Contrast | Subtitles, table headers, captions |
| **Badge BG (\`--theme-badge-bg\`)** | \`${colors.badge.bg.hex}\` | Translucent Accent | Pill tags, status pill backgrounds |
| **Badge Text (\`--theme-badge-text\`)** | \`${colors.badge.text.hex}\` | Vibrant | Pill tag text, badge labels |

---

## 3. WCAG Contrast Analysis

- **Primary Text on Background**: Ratio **${textContrast.ratio}:1** — **${textContrast.scoreText}**
- **Muted Text on Background**: Ratio **${mutedContrast.ratio}:1** — **${mutedContrast.scoreText}**
- **Accent Color on Background**: Ratio **${accentContrast.ratio}:1** — **${accentContrast.scoreText}**

---

## 4. CSS Custom Variables & Keyframe Motion Directives

Add these variables and keyframe animations to your global CSS:

\`\`\`css
:root {
  --theme-font: ${typography.fontFamily};
  --theme-bg: ${bgCss};
  --theme-primary: ${primaryCss};
  --theme-secondary: ${secondaryCss};
  --theme-accent: ${accentCss};
  --theme-card-bg: ${surfaceCss};
  --theme-card-border: ${surfaceBorderCss};
  --theme-text-color: ${textCss};
  --theme-muted-text: ${textMutedCss};
  --theme-btn-gradient: ${ctaCss};
  --theme-badge-bg: ${badgeBgCss};
  --theme-badge-border: ${badgeBorderCss};
  --theme-badge-text: ${badgeTextCss};
  --theme-hero-glow-1: ${glow1Css};
  --theme-hero-glow-2: ${glow2Css};
}

/* Fluid Web Motion & Glow Animations */
@keyframes floatOrb1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -30px) scale(1.15); }
}

@keyframes floatOrb2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-35px, 25px) scale(1.2); }
}

@keyframes pulseBadge {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.04); opacity: 1; }
}
\`\`\`

---

## 5. AI Coding Assistant Prompt

*Copy and paste the prompt block below directly into your AI coding assistant (Gemini, Antigravity, Claude, ChatGPT, Cursor) to enforce this theme and motion system in your project:*

\`\`\`text
You are an expert UI engineer building a web application with the "${name}" design theme.

### Theme Guidelines & Identity
- **Theme Name**: ${name} (#${number})
- **Category**: ${category}
- **Brand Personality**: ${personality}
- **Typography Font Family**: Use Google Font "${typography.fontName}" (\`font-family: ${typography.fontFamily}\`).

### Google Fonts Setup
Add the font link to head:
\`<link href="https://fonts.googleapis.com/css2?family=${typography.fontGoogleUrl}&display=swap" rel="stylesheet">\`

### Design System Tokens
Apply these CSS custom variables across all UI components:
- Application Font: ${typography.fontFamily}
- Application Background: ${bgCss}
- Primary Brand Color: ${primaryCss}
- Accent Color: ${accentCss}
- Surface / Card Background: ${surfaceCss}
- Card Border: ${surfaceBorderCss}
- Text Color: ${textCss}
- Muted Text Color: ${textMutedCss}
- Button / CTA Style: ${ctaCss}
- Badge Background: ${badgeBgCss}
- Badge Text: ${badgeTextCss}
- Hero Glow Primary: ${glow1Css}
- Hero Glow Secondary: ${glow2Css}

### Component Styling & Animation Directives
1. **Typography & Layout**: Set \`font-family: ${typography.fontFamily}\`, \`background-color: ${bgCss}\`, and body copy text color to \`${textCss}\`.
2. **Cards & Glassmorphic Surfaces**: Use \`background: ${surfaceCss}\`, \`border: 1px solid ${surfaceBorderCss}\`, and \`backdrop-filter: blur(12px)\`. Add smooth card hover lifts (\`transform: translateY(-3px)\`).
3. **Buttons & CTAs**: Primary buttons use \`background: ${ctaCss}\` with \`box-shadow: 0 6px 20px ${glow1Css}\`. Secondary buttons use transparent background with border \`${surfaceBorderCss}\`. Add active scale micro-interactions.
4. **Status Badges & Chips**: Use \`background: ${badgeBgCss}\`, \`border: 1px solid ${badgeBorderCss}\`, and text color \`${badgeTextCss}\` with subtle \`pulseBadge\` animations.
5. **Ambient Fluid Motion**: Add floating blurred radial ambient glows using \`@keyframes floatOrb1\` and \`floatOrb2\` with \`${glow1Css}\` and \`${glow2Css}\`.

Follow these tokens and animation rules strictly. Do NOT create a static, generic, motionless app.
\`\`\`
`;
}

