import { useState, useEffect } from "react";
import { PRESET_THEMES, type ThemeConfig } from "./lib/themes-dataset";
import { Navbar } from "./components/Navbar";
import { ThemeSelectorPanel } from "./components/ThemeSelectorPanel";
import { ColorEditorPanel } from "./components/ColorEditorPanel";
import { LivePreviewCanvas } from "./components/LivePreviewCanvas";
import { ExportModal } from "./components/ExportModal";
import { FontSelectorModal } from "./components/FontSelectorModal";
import { SidebarView } from "./components/SidebarView";
import { postMessage, onMessage, getState, setState } from "./vscode-bridge";
import { loadGoogleFont } from "./lib/google-fonts-api";

declare global {
  interface Window {
    VSCODE_VIEW_MODE?: string;
  }
}

export function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(() => {
    const savedWebviewState = getState<ThemeConfig>();
    return savedWebviewState || PRESET_THEMES[0];
  });
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isFontModalOpen, setIsFontModalOpen] = useState<boolean>(false);
  const [exportTab, setExportTab] = useState<"html" | "markdown">("html");

  // Determine if running inside VS Code sidebar vs full editor panel
  const [isSidebarMode, setIsSidebarMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        window.VSCODE_VIEW_MODE === "sidebar" ||
        window.location.search.includes("mode=sidebar") ||
        window.innerWidth < 480
      );
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.VSCODE_VIEW_MODE === "sidebar") return;
      setIsSidebarMode(window.innerWidth < 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load Google Font whenever active theme changes
  useEffect(() => {
    if (activeTheme?.fontName) {
      loadGoogleFont(activeTheme.fontName);
    }
  }, [activeTheme?.fontName]);

  // Request persisted state from Extension Host on mount
  useEffect(() => {
    postMessage({ type: "getPersistedState" });

    const cleanup = onMessage((msg) => {
      if (msg.type === "restoreState" && msg.theme) {
        setActiveTheme(msg.theme);
      }
    });

    return cleanup;
  }, []);

  // Save active theme state to Extension Host and Webview State API on change
  useEffect(() => {
    if (activeTheme) {
      postMessage({ type: "saveThemeState", theme: activeTheme });
      setState(activeTheme);
    }
  }, [activeTheme]);

  const handleSelectTheme = (theme: ThemeConfig) => {
    setActiveTheme(JSON.parse(JSON.stringify(theme)));
  };

  const handleColorChange = (key: keyof ThemeConfig["colors"], value: string) => {
    setActiveTheme((prev) => {
      let sanitizedVal = value;
      if (sanitizedVal.startsWith("#") && sanitizedVal.length === 8) {
        sanitizedVal = sanitizedVal.slice(0, 7);
      }

      const updatedColors = {
        ...prev.colors,
        [key]: sanitizedVal,
      };

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
    loadGoogleFont(fontName);
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

  const handleOpenFullStudio = () => {
    postMessage({ type: "openExternal", url: "command:xDesignSystem.open" });
    // Also post openFullStudio for Extension Host handler
    window.parent.postMessage({ type: "openFullStudio" }, "*");
  };

  if (isSidebarMode) {
    return (
      <SidebarView
        activeTheme={activeTheme}
        onSelectTheme={handleSelectTheme}
        onRandomTheme={handleRandomTheme}
        onColorChange={handleColorChange}
        onResetTheme={handleResetTheme}
        onOpenFullStudio={handleOpenFullStudio}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[var(--vscode-app-bg)] text-[var(--vscode-app-fg)] overflow-hidden font-sans">
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
