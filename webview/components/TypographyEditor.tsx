import React, { useState, useEffect } from "react";
import {
  Type,
  Globe,
  Sliders,
  Sparkles,
  Heading,
} from "lucide-react";
import type { ThemeConfigV2 } from "../lib/types/theme-config-v2";
import { AVAILABLE_FONTS } from "../lib/themes-dataset";
import {
  loadGoogleFont,
  getFontFamilyCss,
  getFontGoogleUrlParam,
} from "../lib/google-fonts-api";

export interface TypographyEditorProps {
  typography: ThemeConfigV2["typography"];
  onChange: (updatedTypography: ThemeConfigV2["typography"]) => void;
  onOpenFontModal?: (target: "primary" | "heading") => void;
  className?: string;
}

export const TypographyEditor: React.FC<TypographyEditorProps> = ({
  typography,
  onChange,
  onOpenFontModal,
  className = "",
}) => {
  const [enableHeadingFont, setEnableHeadingFont] = useState<boolean>(
    Boolean(typography.headingFont)
  );

  const [sampleText, setSampleText] = useState<string>(
    "The quick brown fox jumps over the lazy dog"
  );

  // Auto-load Google Fonts whenever font names change
  useEffect(() => {
    if (typography.fontName) {
      loadGoogleFont(typography.fontName);
    }
  }, [typography.fontName]);

  useEffect(() => {
    if (typography.headingFont) {
      loadGoogleFont(typography.headingFont);
    }
  }, [typography.headingFont]);

  // Handle Primary Font change
  const handlePrimaryFontChange = (fontName: string) => {
    loadGoogleFont(fontName);
    const fontOpt = AVAILABLE_FONTS.find((f) => f.name === fontName);
    const familyCss = fontOpt ? fontOpt.family : getFontFamilyCss(fontName);
    const googleParam = fontOpt ? fontOpt.googleParam : getFontGoogleUrlParam(fontName);

    onChange({
      ...typography,
      fontName,
      fontFamily: familyCss,
      fontGoogleUrl: googleParam,
    });
  };

  // Handle Heading Font change
  const handleHeadingFontChange = (fontName: string) => {
    if (!fontName) {
      onChange({
        ...typography,
        headingFont: undefined,
        headingFontGoogleUrl: undefined,
      });
      return;
    }

    loadGoogleFont(fontName);
    const fontOpt = AVAILABLE_FONTS.find((f) => f.name === fontName);
    const googleParam = fontOpt ? fontOpt.googleParam : getFontGoogleUrlParam(fontName);

    onChange({
      ...typography,
      headingFont: fontName,
      headingFontGoogleUrl: googleParam,
    });
  };

  // Toggle Heading Font Override
  const handleToggleHeadingFont = (enabled: boolean) => {
    setEnableHeadingFont(enabled);
    if (!enabled) {
      onChange({
        ...typography,
        headingFont: undefined,
        headingFontGoogleUrl: undefined,
      });
    } else {
      const defaultHeading = typography.fontName || "Outfit";
      handleHeadingFontChange(defaultHeading);
    }
  };

  // Handle weight updates
  const handleWeightChange = (
    key: keyof ThemeConfigV2["typography"]["fontWeights"],
    value: number
  ) => {
    const clamped = Math.min(900, Math.max(100, value));
    onChange({
      ...typography,
      fontWeights: {
        ...typography.fontWeights,
        [key]: clamped,
      },
    });
  };

  const activeHeadingFontCss = typography.headingFont
    ? getFontFamilyCss(typography.headingFont)
    : typography.fontFamily;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SECTION 1: Font Family Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
        {/* Primary Body Font */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-indigo-400" />
              <span>Primary Body Font</span>
            </label>
            <span className="text-[10px] font-mono text-indigo-300 font-semibold">
              {typography.fontName}
            </span>
          </div>

          <div className="flex gap-2">
            <select
              value={typography.fontName}
              onChange={(e) => handlePrimaryFontChange(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer font-sans"
            >
              {AVAILABLE_FONTS.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name} ({font.category})
                </option>
              ))}
              {!AVAILABLE_FONTS.some((f) => f.name === typography.fontName) && (
                <option value={typography.fontName}>{typography.fontName} (Active)</option>
              )}
            </select>

            {onOpenFontModal && (
              <button
                type="button"
                onClick={() => onOpenFontModal("primary")}
                className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition cursor-pointer shrink-0"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Browse All</span>
              </button>
            )}
          </div>
        </div>

        {/* Heading Font Override */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer">
              <Heading className="w-4 h-4 text-purple-400" />
              <span>Heading Font Override</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={enableHeadingFont}
                onChange={(e) => handleToggleHeadingFont(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-[11px] text-slate-400">
                {enableHeadingFont ? "Enabled" : "Inherit Body"}
              </span>
            </label>
          </div>

          {enableHeadingFont ? (
            <div className="flex gap-2 animate-in fade-in duration-200">
              <select
                value={typography.headingFont || typography.fontName}
                onChange={(e) => handleHeadingFontChange(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer font-sans"
              >
                {AVAILABLE_FONTS.map((font) => (
                  <option key={font.name} value={font.name}>
                    {font.name} ({font.category})
                  </option>
                ))}
              </select>

              {onOpenFontModal && (
                <button
                  type="button"
                  onClick={() => onOpenFontModal("heading")}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 transition cursor-pointer shrink-0"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Browse All</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs text-slate-400 italic">
              Headings use primary body font ({typography.fontName})
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Font Size & Line Height Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
        {/* Base Font Size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Base Font Size</span>
            </span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={10}
                max={36}
                value={typography.baseFontSize}
                onChange={(e) =>
                  onChange({
                    ...typography,
                    baseFontSize: parseInt(e.target.value, 10) || 16,
                  })
                }
                className="w-14 px-2 py-0.5 text-right font-mono text-xs bg-slate-950 border border-slate-800 rounded-md text-indigo-300 focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">px</span>
            </div>
          </div>
          <input
            type="range"
            min={12}
            max={32}
            step={1}
            value={typography.baseFontSize}
            onChange={(e) =>
              onChange({
                ...typography,
                baseFontSize: parseInt(e.target.value, 10),
              })
            }
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Line Height */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Line Height</span>
            </span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1.0}
                max={3.0}
                step={0.05}
                value={typography.lineHeight}
                onChange={(e) =>
                  onChange({
                    ...typography,
                    lineHeight: parseFloat(e.target.value) || 1.5,
                  })
                }
                className="w-14 px-2 py-0.5 text-right font-mono text-xs bg-slate-950 border border-slate-800 rounded-md text-purple-300 focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">lh</span>
            </div>
          </div>
          <input
            type="range"
            min={1.0}
            max={2.5}
            step={0.05}
            value={typography.lineHeight}
            onChange={(e) =>
              onChange({
                ...typography,
                lineHeight: parseFloat(e.target.value),
              })
            }
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>

      {/* SECTION 3: Visual Font Weight Swatches */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200">Font Weight Scale & Swatches</h3>
          </div>
          <span className="text-[10px] text-slate-400">
            Rendered in {typography.fontName}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(
            [
              { key: "regular", label: "Regular", defaultVal: 400 },
              { key: "medium", label: "Medium", defaultVal: 500 },
              { key: "semibold", label: "Semibold", defaultVal: 600 },
              { key: "bold", label: "Bold", defaultVal: 700 },
              { key: "extrabold", label: "Extrabold", defaultVal: 800 },
            ] as const
          ).map(({ key, label, defaultVal }) => {
            const currentWeight = typography.fontWeights[key] || defaultVal;
            return (
              <div
                key={key}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-2 hover:border-indigo-500/40 transition"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300">{label}</span>
                  <input
                    type="number"
                    min={100}
                    max={900}
                    step={100}
                    value={currentWeight}
                    onChange={(e) =>
                      handleWeightChange(key, parseInt(e.target.value, 10) || defaultVal)
                    }
                    className="w-12 px-1 py-0.5 font-mono text-[10px] text-center bg-slate-900 border border-slate-800 rounded text-indigo-300 focus:outline-none"
                  />
                </div>

                {/* Swatch Sample Render */}
                <div
                  className="py-2 px-2.5 rounded-lg bg-slate-900 border border-slate-800/80 overflow-hidden text-center"
                  style={{
                    fontFamily: typography.fontFamily,
                    fontWeight: currentWeight,
                    fontSize: `${Math.min(18, Math.max(13, typography.baseFontSize))}px`,
                  }}
                >
                  <span className="text-slate-100 truncate block">Aa Bb Cc ({currentWeight})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: Live Interactive Typography Specimen & Preview */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold text-slate-200 tracking-tight">
              Live Real-Time Typography Specimen
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Type sample text..."
              className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-300 w-52 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Specimen Render */}
        <div className="space-y-4">
          {/* Main Heading 1 */}
          <div>
            <span className="text-[10px] font-mono text-purple-400 block mb-1">
              Heading 1 (Weight 800) • {typography.headingFont || typography.fontName}
            </span>
            <h1
              className="text-3xl font-extrabold text-slate-100 tracking-tight leading-tight"
              style={{
                fontFamily: activeHeadingFontCss,
                fontWeight: typography.fontWeights.extrabold,
                lineHeight: typography.lineHeight,
              }}
            >
              {sampleText}
            </h1>
          </div>

          {/* Subheading 2 */}
          <div>
            <span className="text-[10px] font-mono text-indigo-400 block mb-1">
              Heading 2 (Weight 600) • {typography.headingFont || typography.fontName}
            </span>
            <h2
              className="text-xl font-semibold text-slate-200 tracking-tight"
              style={{
                fontFamily: activeHeadingFontCss,
                fontWeight: typography.fontWeights.semibold,
                lineHeight: typography.lineHeight,
              }}
            >
              Building scalable design system specs with real-time Google Font rendering
            </h2>
          </div>

          {/* Body Paragraph */}
          <div>
            <span className="text-[10px] font-mono text-emerald-400 block mb-1">
              Body Paragraph (Weight 400 • {typography.baseFontSize}px • LH {typography.lineHeight}) • {typography.fontName}
            </span>
            <p
              className="text-slate-300 max-w-3xl"
              style={{
                fontFamily: typography.fontFamily,
                fontWeight: typography.fontWeights.regular,
                fontSize: `${typography.baseFontSize}px`,
                lineHeight: typography.lineHeight,
              }}
            >
              Typography tokens define the hierarchy and personality of your web application. Modifying base font sizes, line height multipliers, and font weights instantly cascade across all components and page configurations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyEditor;
