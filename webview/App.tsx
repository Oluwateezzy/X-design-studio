import { useState, useEffect } from "react";
import { PRESET_THEMES, type ThemeConfig } from "./lib/themes-dataset";
import type { ThemeConfigV2 } from "./lib/types/theme-config-v2";
import type { ColorToken } from "./lib/types/color-token";
import { migrateV1ToV2 } from "./lib/theme-migrator";
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
  const [activeTheme, setActiveTheme] = useState<ThemeConfigV2>(() => {
    const saved = getState<ThemeConfigV2 | ThemeConfig>();
    if (saved) {
      if ('version' in saved && saved.version === 2) {
        return saved as ThemeConfigV2;
      }
      return migrateV1ToV2(saved as ThemeConfig);
    }
    return migrateV1ToV2(PRESET_THEMES[0]);
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

  // Load Google Font whenever active theme font changes
  useEffect(() => {
    if (activeTheme?.typography?.fontName) {
      loadGoogleFont(activeTheme.typography.fontName);
    }
  }, [activeTheme?.typography?.fontName]);

  // Request persisted state from Extension Host on mount
  useEffect(() => {
    postMessage({ type: "getPersistedState" });

    const cleanup = onMessage((msg) => {
      if (msg.type === "restoreState" && msg.theme) {
        setActiveTheme(migrateV1ToV2(msg.theme));
      } else if (msg.type === "restoreStateV2" && msg.theme) {
        setActiveTheme(msg.theme);
      }
    });

    return cleanup;
  }, []);

  // Save active theme state to Extension Host and Webview State API on change
  useEffect(() => {
    if (activeTheme) {
      postMessage({ type: "saveThemeStateV2", theme: activeTheme });
      setState(activeTheme);
    }
  }, [activeTheme]);

  const handleSelectTheme = (v1Theme: ThemeConfig) => {
    setActiveTheme(migrateV1ToV2(v1Theme));
  };

  const handleColorChange = (path: string, token: ColorToken) => {
    setActiveTheme((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as ThemeConfigV2;
      const keys = path.replace(/^colors\./, '').split('.');

      let target: Record<string, unknown> = next.colors as unknown as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]] as Record<string, unknown>;
      }
      target[keys[keys.length - 1]] = token;

      return next;
    });
  };

  const handleFontSelect = (fontName: string, fontFamily: string, fontGoogleUrl: string) => {
    loadGoogleFont(fontName);
    setActiveTheme((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        fontName,
        fontFamily,
        fontGoogleUrl,
      },
    }));
  };

  const handleResetTheme = () => {
    const original = PRESET_THEMES.find((t) => t.id === activeTheme.id) || PRESET_THEMES[0];
    setActiveTheme(migrateV1ToV2(original));
  };

  const handleRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * PRESET_THEMES.length);
    setActiveTheme(migrateV1ToV2(PRESET_THEMES[randomIndex]));
  };

  const handleOpenExport = (tab: "html" | "markdown") => {
    setExportTab(tab);
    setIsExportOpen(true);
  };

  const handleOpenFullStudio = () => {
    postMessage({ type: "openExternal", url: "command:xDesignSystem.open" });
    window.parent.postMessage({ type: "openFullStudio" }, "*");
  };

  if (isSidebarMode) {
    return (
      <>
        <SidebarView
          activeTheme={activeTheme}
          onSelectTheme={handleSelectTheme}
          onRandomTheme={handleRandomTheme}
          onColorChange={handleColorChange}
          onFontChange={handleFontSelect}
          onResetTheme={handleResetTheme}
          onOpenExport={handleOpenExport}
          onOpenFullStudio={handleOpenFullStudio}
        />

        {/* Export Modal */}
        <ExportModal
          isOpen={isExportOpen}
          initialTab={exportTab}
          activeTheme={activeTheme}
          onClose={() => setIsExportOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[var(--vscode-app-bg)] text-[var(--vscode-app-fg)] overflow-hidden font-sans">
      {/* 100% Full-Screen Live Interactive Canvas */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <LivePreviewCanvas theme={activeTheme} />
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
        activeFontName={activeTheme.typography.fontName}
        onClose={() => setIsFontModalOpen(false)}
        onSelectFont={handleFontSelect}
      />
    </div>
  );
}

export default App;
