# 🎨 Strata Studio — VS Code Extension

**Strata Studio** is a visual color theme studio and design system generator for VS Code. Browse 100 curated color themes across 10 aesthetic categories, customize colors and Google Fonts live on an interactive preview canvas, and export single-file HTML showcases or AI system-prompt Markdown specifications.

---

## ✨ Features

- **100 Curated Themes**: High-Trust Fintech, Cyberpunk & Sci-Fi, Dark Luxury & Obsidian, Neon & Synthesizer, Neo-Brutalist & Bold, Warm Editorial & Paper, Organic Earth & Biophilic, Monochromatic Minimal, Deep Space & Cosmic, and Retro & Vintage.
- **Live Preview Canvas**: Toggle between Desktop and Mobile preview modes to observe theme colors and typography on realistic UI components.
- **Custom Color & Typography Editor**: Tweak any of the 17 theme color tokens live, inspect WCAG contrast ratios, and select from Google Fonts.
- **Single-File Exports**: Export standalone HTML pages with CSS custom properties or AI system-prompt Markdown specs for LLMs.
- **VS Code Integration**: Native `cmd+shift+t` keybinding, persistent state storage (`globalState`), settings management, and save dialog integration.

---

## 🚀 Quick Start

1. Open VS Code Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux).
2. Type **Strata Studio: Open Strata Studio** (or press `Cmd+Shift+T`).
3. Select a preset theme or customize colors and typography live.
4. Export your theme definition as an HTML page or Markdown spec.

---

## 🛠️ Build & Development

### Commands

```bash
# Install dependencies
npm install

# Build extension host + React webview
npm run build

# Watch mode for dual build pipelines
npm run watch

# Run typecheck across both compilation targets
npm run typecheck

# Package extension into .vsix file
npx @vscode/vsce package --no-dependencies
```

### F5 Debugging in VS Code

1. Open the project in VS Code.
2. Press `F5` (or go to **Run and Debug** and click **Run Extension**).
3. A new Extension Development Host window will open with Strata Studio pre-loaded.
4. Run `Cmd+Shift+T` or **Open Strata Studio** from the Command Palette.

---

## 📄 License

[MIT License](LICENSE) © 2026 Strata Studio
