import type { ThemeConfig } from "./themes-dataset";
import { hexToHsl, checkWcag } from "./color-utils";

export function generateThemeMarkdown(theme: ThemeConfig): string {
  const { colors, name, category, personality, number, fontFamily, fontName, fontGoogleUrl } = theme;

  const bgHsl = hexToHsl(colors.bg);
  const primaryHsl = hexToHsl(colors.primary);
  const accentHsl = hexToHsl(colors.accent);

  const textContrast = checkWcag(colors.textColor, colors.bg);
  const mutedContrast = checkWcag(colors.mutedText, colors.bg);
  const accentContrast = checkWcag(colors.accent, colors.bg);

  return `# Theme Specification: ${name} (Theme #${number})

**Category**: ${category}  
**Brand Personality**: ${personality}  
**Typography**: Google Font **${fontName}** (\`font-family: ${fontFamily}\`)  

---

## 1. Typography & Google Fonts Setup

Include this Google Fonts link in your \`<head>\` or \`index.html\`:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${fontGoogleUrl}&display=swap" rel="stylesheet">
\`\`\`

---

## 2. Color Palette Tokens

| Token Name | Hex Value | HSL Value | Target Usage |
| :--- | :--- | :--- | :--- |
| **Background (\`--theme-bg\`)** | \`${colors.bg}\` | \`hsl(${bgHsl.h}, ${bgHsl.s}%, ${bgHsl.l}%)\` | Main app background, body, dark canvas |
| **Primary (\`--theme-primary\`)** | \`${colors.primary}\` | \`hsl(${primaryHsl.h}, ${primaryHsl.s}%, ${primaryHsl.l}%)\` | Primary brand background, header fill, solid cards |
| **Secondary (\`--theme-secondary\`)** | \`${colors.secondary}\` | - | Secondary actions, hover fills, subtle highlights |
| **Accent (\`--theme-accent\`)** | \`${colors.accent}\` | \`hsl(${accentHsl.h}, ${accentHsl.s}%, ${accentHsl.l}%)\` | Hero text highlight, focus rings, key indicators |
| **Card Surface (\`--theme-card-bg\`)** | \`${colors.cardBg}\` | Glass / Translucent | Card containers, modal popups, tables |
| **Card Border (\`--theme-card-border\`)** | \`${colors.cardBorder}\` | Semi-transparent | Card edges, subtle grid dividers |
| **Text Primary (\`--theme-text-color\`)** | \`${colors.textColor}\` | High Contrast | Headings, primary body copy, numbers |
| **Text Muted (\`--theme-muted-text\`)** | \`${colors.mutedText}\` | Medium Contrast | Subtitles, table headers, captions |
| **Badge BG (\`--theme-badge-bg\`)** | \`${colors.badgeBg}\` | Translucent Accent | Pill tags, status pill backgrounds |
| **Badge Text (\`--theme-badge-text\`)** | \`${colors.badgeText}\` | Vibrant | Pill tag text, badge labels |

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
  --theme-font: ${fontFamily};
  --theme-bg: ${colors.bg};
  --theme-primary: ${colors.primary};
  --theme-secondary: ${colors.secondary};
  --theme-accent: ${colors.accent};
  --theme-card-bg: ${colors.cardBg};
  --theme-card-border: ${colors.cardBorder};
  --theme-text-color: ${colors.textColor};
  --theme-muted-text: ${colors.mutedText};
  --theme-btn-gradient: ${colors.btnGradient};
  --theme-badge-bg: ${colors.badgeBg};
  --theme-badge-border: ${colors.badgeBorder};
  --theme-badge-text: ${colors.badgeText};
  --theme-hero-glow-1: ${colors.heroGlow1};
  --theme-hero-glow-2: ${colors.heroGlow2};
  --theme-success: ${colors.success};
  --theme-warning: ${colors.warning};
  --theme-error: ${colors.error};
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
- **Typography Font Family**: Use Google Font "${fontName}" (\`font-family: ${fontFamily}\`).

### Google Fonts Setup
Add the font link to head:
\`<link href="https://fonts.googleapis.com/css2?family=${fontGoogleUrl}&display=swap" rel="stylesheet">\`

### Design System Tokens
Apply these CSS custom variables across all UI components:
- Application Font: ${fontFamily}
- Application Background: ${colors.bg}
- Primary Brand Color: ${colors.primary}
- Accent Color: ${colors.accent}
- Surface / Card Background: ${colors.cardBg}
- Card Border: ${colors.cardBorder}
- Text Color: ${colors.textColor}
- Muted Text Color: ${colors.mutedText}
- Button Gradient: ${colors.btnGradient}
- Badge Background: ${colors.badgeBg}
- Badge Text: ${colors.badgeText}
- Hero Glow Primary: ${colors.heroGlow1}
- Hero Glow Secondary: ${colors.heroGlow2}

### Component Styling & Animation Directives
1. **Typography & Layout**: Set \`font-family: ${fontFamily}\`, \`background-color: ${colors.bg}\`, and body copy text color to \`${colors.textColor}\`.
2. **Cards & Glassmorphic Surfaces**: Use \`background: ${colors.cardBg}\`, \`border: 1px solid ${colors.cardBorder}\`, and \`backdrop-filter: blur(12px)\`. Add smooth card hover lifts (\`transform: translateY(-3px)\`).
3. **Buttons & CTAs**: Primary buttons use \`background: ${colors.btnGradient}\` with \`box-shadow: 0 6px 20px ${colors.heroGlow1}\`. Secondary buttons use transparent background with border \`${colors.cardBorder}\`. Add active scale micro-interactions.
4. **Status Badges & Chips**: Use \`background: ${colors.badgeBg}\`, \`border: 1px solid ${colors.badgeBorder}\`, and text color \`${colors.badgeText}\` with subtle \`pulseBadge\` animations.
5. **Ambient Fluid Motion**: Add floating blurred radial ambient glows using \`@keyframes floatOrb1\` and \`floatOrb2\` with \`${colors.heroGlow1}\` and \`${colors.heroGlow2}\`.

Follow these tokens and animation rules strictly. Do NOT create a static, generic, motionless app.
\`\`\`
`;
}
