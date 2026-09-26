import { useState } from "react";
import { PRESET_THEMES, type ThemeConfig } from "./lib/themes-dataset";
import { Navbar } from "./components/Navbar";
import { ThemeSelectorPanel } from "./components/ThemeSelectorPanel";
import { ColorEditorPanel } from "./components/ColorEditorPanel";
import { LivePreviewCanvas } from "./components/LivePreviewCanvas";
import { ExportModal } from "./components/ExportModal";
import { FontSelectorModal } from "./components/FontSelectorModal";

export function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(PRESET_THEMES[0]);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isFontModalOpen, setIsFontModalOpen] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<"html" | "markdown">("html");

  const handleSelectTheme = (theme: ThemeConfig) => {
    setActiveTheme(JSON.parse(JSON.stringify(theme)));
  };

  const handleColorChange = (key: keyof ThemeConfig["colors"], value: string) => {
    setActiveTheme((prev) => {
      // Sanitize hex strings to prevent invalid 7-digit hex inputs (#5889988 -> #588998)
      let sanitizedVal = value;
      if (sanitizedVal.startsWith("#") && sanitizedVal.length === 8) {
        sanitizedVal = sanitizedVal.slice(0, 7);
      }

      const updatedColors = {
        ...prev.colors,
        [key]: sanitizedVal,
      };

      // Automatically recompute gradient, ambient glowing orbs, and badges if primary or secondary colors are updated
      if (key === "primary" || key === "secondary") {
        const prim = updatedColors.primary;
        const sec = updatedColors.secondary;

        updatedColors.btnGradient = `linear-gradient(135deg, ${prim} 0%, ${sec} 100%)`;

        if (prim.startsWith("#")) {
          const hexPrim = prim.length > 7 ? prim.slice(0, 7) : prim;
          updatedColors.heroGlow1 = `${hexPrim}40`;
          updatedColors.badgeBg = `${hexPrim}20`;
          updatedColors.badgeBorder = `${hexPrim}50`;
          updatedColors.badgeText = hexPrim;
          updatedColors.accent = hexPrim;
        }

        if (sec.startsWith("#")) {
          const hexSec = sec.length > 7 ? sec.slice(0, 7) : sec;
          updatedColors.heroGlow2 = `${hexSec}33`;
        }
      }

      return {
        ...prev,
        colors: updatedColors,
      };
    });
  };

  const handleFontSelect = (fontName: string, fontFamily: string, fontGoogleUrl: string) => {
    setActiveTheme((prev) => ({
      ...prev,
      fontName,
      fontFamily,
      fontGoogleUrl,
    }));
  };

  const handleResetTheme = () => {
    const original = PRESET_THEMES.find((t) => t.id === activeTheme.id) || PRESET_THEMES[0];
    setActiveTheme(JSON.parse(JSON.stringify(original)));
  };

  const handleRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * PRESET_THEMES.length);
    setActiveTheme(JSON.parse(JSON.stringify(PRESET_THEMES[randomIndex])));
  };

  const handleOpenExport = (tab: "html" | "markdown") => {
    setExportTab(tab);
    setIsExportOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTheme={activeTheme}
        onOpenExport={handleOpenExport}
        onRandomTheme={handleRandomTheme}
      />

      {/* Main Studio Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left: 100 Themes Filter & List Panel */}
        <ThemeSelectorPanel
          activeThemeId={activeTheme.id}
          onSelectTheme={handleSelectTheme}
        />

        {/* Center: Live Interactive Canvas Preview */}
        <LivePreviewCanvas theme={activeTheme} />

        {/* Right: Live Color Overrides & Contrast Tuner */}
        <ColorEditorPanel
          activeTheme={activeTheme}
          onColorChange={handleColorChange}
          onFontChange={handleFontSelect}
          onOpenFontModal={() => setIsFontModalOpen(true)}
          onResetTheme={handleResetTheme}
        />
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        initialTab={exportTab}
        activeTheme={activeTheme}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Google Fonts Selector Modal */}
      <FontSelectorModal
        isOpen={isFontModalOpen}
        activeFontName={activeTheme.fontName}
        onClose={() => setIsFontModalOpen(false)}
        onSelectFont={handleFontSelect}
      />
    </div>
  );
}

export default App;
