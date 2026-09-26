import React from "react";
import { Sliders, RotateCcw, ShieldCheck, Type, Globe } from "lucide-react";
import type { ThemeConfig } from "../lib/themes-dataset";
import { AVAILABLE_FONTS } from "../lib/themes-dataset";
import { loadGoogleFont, getFontFamilyCss, getFontGoogleUrlParam } from "../lib/google-fonts-api";
import { checkWcag } from "../lib/color-utils";

interface ColorEditorPanelProps {
  activeTheme: ThemeConfig;
  onColorChange: (key: keyof ThemeConfig["colors"], value: string) => void;
  onFontChange: (fontName: string, fontFamily: string, fontGoogleUrl: string) => void;
  onOpenFontModal: () => void;
  onResetTheme: () => void;
}

export const ColorEditorPanel: React.FC<ColorEditorPanelProps> = ({
  activeTheme,
  onColorChange,
  onFontChange,
  onOpenFontModal,
  onResetTheme,
}) => {
  const textContrast = checkWcag(activeTheme.colors.textColor, activeTheme.colors.bg);
  const accentContrast = checkWcag(activeTheme.colors.accent, activeTheme.colors.bg);

  const colorFields: Array<{ key: keyof ThemeConfig["colors"]; label: string }> = [
    { key: "bg", label: "App Background" },
    { key: "primary", label: "Primary Color" },
    { key: "secondary", label: "Secondary Color" },
    { key: "accent", label: "Accent Glow" },
    { key: "textColor", label: "Text Color" },
    { key: "mutedText", label: "Muted Text" },
    { key: "cardBorder", label: "Card Border" },
    { key: "badgeBg", label: "Badge Surface" },
    { key: "badgeText", label: "Badge Text" },
    { key: "success", label: "Success Color" },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border-l border-slate-800/80 w-full lg:w-80 shrink-0">
      {/* Editor Header */}
      <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h2 className="text-xs font-semibold text-slate-100">Theme & Motion Tuner</h2>
        </div>
        <button
          onClick={onResetTheme}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition cursor-pointer"
          title="Reset to Theme Preset"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Google Typography Card */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 space-y-2.5">
        <div className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-400" />
            <span>Google Typography</span>
          </span>
          <span className="text-[10px] text-indigo-400 font-mono font-semibold">
            {activeTheme.fontName}
          </span>
        </div>

        {/* Quick Select Dropdown */}
        <select
          value={activeTheme.fontName}
          onChange={(e) => {
            const fontName = e.target.value;
            const fontObj = AVAILABLE_FONTS.find((f) => f.name === fontName);
            if (fontObj) {
              loadGoogleFont(fontObj.name);
              onFontChange(fontObj.name, fontObj.family, fontObj.googleParam);
            } else {
              loadGoogleFont(fontName);
              const familyCss = getFontFamilyCss(fontName);
              const googleUrl = getFontGoogleUrlParam(fontName);
              onFontChange(fontName, familyCss, googleUrl);
            }
          }}
          className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer font-sans"
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font.name} value={font.name}>
              {font.name} ({font.category})
            </option>
          ))}
          {!AVAILABLE_FONTS.some((f) => f.name === activeTheme.fontName) && (
            <option value={activeTheme.fontName}>
              {activeTheme.fontName} (Active)
            </option>
          )}
        </select>

        {/* Full Modal Launcher */}
        <button
          onClick={onOpenFontModal}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 hover:border-indigo-500 rounded-lg text-indigo-300 transition cursor-pointer group"
        >
          <span className="flex items-center gap-2 font-medium text-[11px]">
            <Globe className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition" />
            <span>Browse 1,950+ Fonts</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
            Open Catalog →
          </span>
        </button>
      </div>

      {/* WCAG Contrast Health Box */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800/80 space-y-2">
        <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>WCAG Contrast Health</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded bg-slate-900 border border-slate-800 flex flex-col">
            <span className="text-slate-400">Text vs BG</span>
            <span className={`font-mono font-semibold ${textContrast.wcagAA ? "text-emerald-400" : "text-amber-400"}`}>
              {textContrast.ratio}:1 ({textContrast.wcagAAA ? "AAA" : textContrast.wcagAA ? "AA" : "Fail"})
            </span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 flex flex-col">
            <span className="text-slate-400">Accent vs BG</span>
            <span className={`font-mono font-semibold ${accentContrast.wcagAA ? "text-emerald-400" : "text-amber-400"}`}>
              {accentContrast.ratio}:1 ({accentContrast.wcagAAA ? "AAA" : accentContrast.wcagAA ? "AA" : "Fail"})
            </span>
          </div>
        </div>
      </div>

      {/* Color Controls */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="text-[11px] text-slate-400 font-medium px-1">
          Custom Color Overrides
        </div>

        {colorFields.map(({ key, label }) => {
          const val = activeTheme.colors[key] || "#000000";
          const isHex = val.startsWith("#");
          const pickerVal = isHex ? (val.length === 9 ? val.slice(0, 7) : val) : "#000000";

          return (
            <div
              key={key}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-2">
                {isHex ? (
                  <input
                    type="color"
                    value={pickerVal}
                    onChange={(e) => onColorChange(key, e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                ) : (
                  <div
                    className="w-6 h-6 rounded border border-white/20 shrink-0"
                    style={{ backgroundColor: val }}
                  />
                )}
                <span className="text-xs font-medium text-slate-200">{label}</span>
              </div>

              <input
                type="text"
                value={val}
                onChange={(e) => onColorChange(key, e.target.value)}
                className="w-24 px-2 py-1 text-[11px] font-mono bg-slate-900 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-indigo-500 text-right"
              />
            </div>
          );
        })}

        {/* Gradient Editor Field */}
        <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 space-y-1.5">
          <span className="text-xs font-medium text-slate-200 block">Button Gradient</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-white/20 shrink-0"
              style={{ background: activeTheme.colors.btnGradient }}
            />
            <input
              type="text"
              value={activeTheme.colors.btnGradient}
              onChange={(e) => onColorChange("btnGradient", e.target.value)}
              className="w-full px-2 py-1 text-[10px] font-mono bg-slate-900 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
