# 🎨 Strata Studio — Visual Theme Studio for VS Code

**Strata Studio** is a visual color theme studio and design system generator built directly into VS Code as a Webview extension. Browse **100 curated color themes** across 10 aesthetic categories, customize colors and Google Fonts live on a realistic interactive preview canvas, inspect WCAG contrast health ratios, and export single-file HTML showcases or AI system-prompt Markdown specifications.

---

## ✨ Features

- 🎭 **100 Curated Color Themes**: Includes High-Trust Fintech, Cyberpunk & Sci-Fi, Dark Luxury & Obsidian, Neon & Synthesizer, Neo-Brutalist & Bold, Warm Editorial & Paper, Organic Earth & Biophilic, Monochromatic Minimal, Deep Space & Cosmic, and Retro & Vintage.
- 📱 **Interactive Live Preview Canvas**: Toggle between **Desktop** and **Mobile View** to see how color palettes and typography render on actual UI components in real time.
- 🎛️ **Live Color & Typography Editor**: Override any of the 17 theme color tokens live. Recomputes gradients, badge borders, and hero glowing orbs automatically.
- 🛡️ **WCAG Contrast Health Analysis**: Instant WCAG AA & AAA contrast ratio analysis for body text vs background and accent text vs background.
- 🔤 **Google Fonts Catalog**: Browse and search 1,950+ Google Fonts directly inside VS Code with live font preview.
- 📄 **Single-File HTML & AI Prompt Exports**:
  - **HTML Page**: Export a complete, standalone HTML page containing CSS custom variables and responsive layout.
  - **AI System Prompt Spec (`THEME_SPEC.md`)**: Export detailed Markdown design specifications tailored for AI coding assistants (e.g. Gemini, Claude, ChatGPT).
- 💾 **Persistent Session State**: Your selected theme automatically persists across VS Code restarts.

---

## ⌨️ Keyboard Shortcuts

| Command | Action | Keybinding (Mac) | Keybinding (Win/Linux) |
|:--------|:-------|:-----------------|:-----------------------|
| `strataStudio.open` | Open Strata Studio | `Cmd+Shift+T` | `Ctrl+Shift+T` |

---

## ⚙️ Configuration Settings

Manage extension options via VS Code Settings (**Preferences → Settings** or `Cmd+,` searching for `Strata Studio`):

| Setting Key | Type | Default | Description |
|:------------|:-----|:--------|:------------|
| `strataStudio.googleFontsApiKey` | `string` | `""` | Optional Google Fonts API Key for browsing the full 1,950+ font catalog |
| `strataStudio.defaultExportFormat` | `string` | `"vsCodeTheme"` | Default theme export format (`vsCodeTheme`, `tailwindConfig`, `cssVariables`, `jsonTheme`) |

---

## 🔑 Google Fonts API Key Setup (Optional)

1. Get a free API Key from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Open VS Code Settings (`Cmd+,`).
3. Search for **Strata Studio: Google Fonts Api Key**.
4. Paste your API key into the setting field.
5. Open Strata Studio font catalog to search and preview 1,950+ Google Fonts.

---

## 🛠️ Development & Building

```bash
# Install dependencies
npm install

# Build extension host & webview
npm run build

# Watch mode for dual pipelines
npm run watch

# Typecheck TypeScript targets
npm run typecheck

# Package VSIX for distribution
npx @vscode/vsce package --no-dependencies
```

---

## 📄 License

[MIT License](LICENSE) © 2026 Strata Studio
