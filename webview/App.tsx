import { useState, useEffect, useRef } from "react";
import { PRESET_THEMES, type ThemeConfigV2 } from "./lib/themes-dataset";
import type { ThemeConfig } from "../src/messages";
import type { ColorToken } from "./lib/types/color-token";
import { migrateV1ToV2 } from "./lib/theme-migrator";
import { LivePreviewCanvas } from "./components/LivePreviewCanvas";
import { ExportModal } from "./components/ExportModal";
import { FontSelectorModal } from "./components/FontSelectorModal";
import { SidebarView } from "./components/SidebarView";
import { Navbar } from "./components/Navbar";
import { ColorEditorPanel } from "./components/ColorEditorPanel";
import { postMessage, onMessage, getState, setState } from "./vscode-bridge";
import { loadGoogleFont } from "./lib/google-fonts-api";

declare global {
  interface Window {
    VSCODE_VIEW_MODE?: string;
  }
}

export function App() {
  const isIncomingUpdate = useRef<boolean>(true);

  const [activeTheme, setActiveTheme] = useState<ThemeConfigV2>(() => {
    const saved = getState<ThemeConfigV2 | ThemeConfig>();
    if (saved) {
      if ('version' in saved && saved.version === 2) {
        return saved as ThemeConfigV2;
      }
      return migrateV1ToV2(saved as ThemeConfig);
    }

    return PRESET_THEMES[0];
  });

  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [activeProjectName, setActiveProjectName] = useState<string | undefined>(undefined);
  const [showRightPanel, setShowRightPanel] = useState<boolean>(false);

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

  // Request persisted state and project info from Extension Host on mount
  useEffect(() => {
    postMessage({ type: "getPersistedState" });
    postMessage({ type: "listProjects" });

    const cleanup = onMessage((msg) => {
      if (msg.type === "restoreState" && msg.theme) {
        isIncomingUpdate.current = true;
        setActiveTheme(migrateV1ToV2(msg.theme));
      } else if (msg.type === "restoreStateV2" && msg.theme) {
        isIncomingUpdate.current = true;
        setActiveTheme(msg.theme);
      } else if (msg.type === "projectLoaded") {
        isIncomingUpdate.current = true;
        if (msg.theme) {
          setActiveTheme(msg.theme);
        }
        if (msg.manifest) {
          setActiveProjectSlug(msg.manifest.slug);
          setActiveProjectName(msg.manifest.name);
        }
      } else if (msg.type === "projectList") {
        if (msg.activeProjectSlug) {
          setActiveProjectSlug(msg.activeProjectSlug);
          const found = msg.projects?.find((p) => p.slug === msg.activeProjectSlug);
          if (found) {
            setActiveProjectName(found.name);
          }
        }
      }
    });

    return cleanup;
  }, []);

  // Save active theme state to Extension Host and Webview State API on change
  useEffect(() => {
    if (!activeTheme) return;

    if (isIncomingUpdate.current) {
      isIncomingUpdate.current = false;
      setState(activeTheme);
      return;
    }

    postMessage({ type: "saveThemeStateV2", theme: activeTheme });
    setState(activeTheme);
  }, [activeTheme]);

  const handleSelectTheme = (v2Theme: ThemeConfigV2) => {
    setActiveTheme(JSON.parse(JSON.stringify(v2Theme)));
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
    window.parent.postMessage({ type: "openFullStudio" }, "*");
  };

  if (isSidebarMode) {
    return (
      <>
        <SidebarView
          activeTheme={activeTheme}
          activeProjectSlug={activeProjectSlug}
          onSelectTheme={handleSelectTheme}
          onRandomTheme={handleRandomTheme}
          onColorChange={handleColorChange}
          onFontChange={handleFontSelect}
          onResetTheme={handleResetTheme}
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
      {/* Canvas Header Navbar */}
      <Navbar
        activeTheme={activeTheme}
        activeProjectName={activeProjectName}
        showRightPanel={showRightPanel}
        onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
        onOpenExport={handleOpenExport}
        onRandomTheme={handleRandomTheme}
      />

      {/* Pure Live Preview Canvas for Currently Active Project/Theme */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <div className="flex h-full w-full overflow-hidden">
          <div className="flex-1 h-full overflow-hidden">
            <LivePreviewCanvas theme={activeTheme} />
          </div>

          {showRightPanel && (
            <div className="w-80 h-full border-l border-[var(--vscode-border)] overflow-y-auto shrink-0 bg-[var(--vscode-input-bg)]/30">
              <ColorEditorPanel
                activeTheme={activeTheme}
                onColorChange={handleColorChange}
                onFontChange={handleFontSelect}
                onOpenFontModal={() => setIsFontModalOpen(true)}
                onResetTheme={handleResetTheme}
              />
            </div>
          )}
        </div>
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
