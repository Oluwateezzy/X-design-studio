import React, { useState } from 'react';
import { Sliders, RotateCcw, ShieldCheck, Type, Globe, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import type { ThemeConfigV2 } from '../lib/types/theme-config-v2';
import type { ColorToken } from '../lib/types/color-token';
import { isGradient, colorTokenToCss } from '../lib/types/color-token';
import { AVAILABLE_FONTS } from '../lib/themes-dataset';
import { loadGoogleFont, getFontFamilyCss, getFontGoogleUrlParam } from '../lib/google-fonts-api';
import { checkWcag } from '../lib/color-utils';
import { GradientEditor } from './GradientEditor';

export interface ColorEditorPanelProps {
  activeTheme: ThemeConfigV2;
  onColorChange: (path: string, token: ColorToken) => void;
  onFontChange: (fontName: string, fontFamily: string, fontGoogleUrl: string) => void;
  onOpenFontModal: () => void;
  onResetTheme: () => void;
}

interface ColorFieldDef {
  path: string; // e.g. "colors.primary"
  label: string;
}

interface ColorGroupDef {
  title: string;
  fields: ColorFieldDef[];
}

export const ColorEditorPanel: React.FC<ColorEditorPanelProps> = ({
  activeTheme,
  onColorChange,
  onFontChange,
  onOpenFontModal,
  onResetTheme,
}) => {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  // WCAG contrast health check using token hex values
  const textContrast = checkWcag(
    activeTheme.colors.text.hex,
    activeTheme.colors.bg.hex
  );
  const accentContrast = checkWcag(
    activeTheme.colors.accent.hex,
    activeTheme.colors.bg.hex
  );

  // Semantic color groupings
  const colorGroups: ColorGroupDef[] = [
    {
      title: 'Core Colors',
      fields: [
        { path: 'colors.bg', label: 'App Background' },
        { path: 'colors.primary', label: 'Primary Color' },
        { path: 'colors.secondary', label: 'Secondary Color' },
        { path: 'colors.accent', label: 'Accent Glow' },
        { path: 'colors.text', label: 'Text Color' },
        { path: 'colors.textMuted', label: 'Muted Text' },
      ],
    },
    {
      title: 'Surface & Card',
      fields: [
        { path: 'colors.surface', label: 'Card Surface' },
        { path: 'colors.surfaceBorder', label: 'Surface Border' },
      ],
    },
    {
      title: 'CTA & Buttons',
      fields: [{ path: 'colors.cta', label: 'CTA Button' }],
    },
    {
      title: 'Badge & Status Pill',
      fields: [
        { path: 'colors.badge.bg', label: 'Badge Surface' },
        { path: 'colors.badge.border', label: 'Badge Border' },
        { path: 'colors.badge.text', label: 'Badge Text' },
      ],
    },
    {
      title: 'Glow Orbs',
      fields: [
        { path: 'colors.glow.primary', label: 'Primary Glow' },
        { path: 'colors.glow.secondary', label: 'Secondary Glow' },
      ],
    },
    {
      title: 'Semantic State',
      fields: [
        { path: 'colors.semantic.success', label: 'Success Color' },
        { path: 'colors.semantic.warning', label: 'Warning Color' },
        { path: 'colors.semantic.error', label: 'Error Color' },
        { path: 'colors.semantic.info', label: 'Info Color' },
      ],
    },
  ];

  // Helper to extract nested ColorToken by path
  const getTokenByPath = (path: string): ColorToken => {
    const keys = path.replace(/^colors\./, '').split('.');
    let curr: unknown = activeTheme.colors;
    for (const key of keys) {
      if (curr && typeof curr === 'object' && key in (curr as Record<string, unknown>)) {
        curr = (curr as Record<string, unknown>)[key];
      } else {
        return { hex: '#000000', gradient: null };
      }
    }
    return curr as ColorToken;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--vscode-sidebar-bg)] overflow-hidden">
      {/* Editor Header */}
      <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h2 className="text-xs font-semibold text-slate-100">Theme & Token Tuner</h2>
        </div>
        <button
          type="button"
          onClick={onResetTheme}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition cursor-pointer"
          title="Reset to Theme Preset"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Google Typography Card */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 space-y-2.5 shrink-0">
        <div className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-400" />
            <span>Google Typography</span>
          </span>
          <span className="text-[10px] text-indigo-400 font-mono font-semibold">
            {activeTheme.typography.fontName}
          </span>
        </div>

        {/* Quick Select Dropdown */}
        <select
          value={activeTheme.typography.fontName}
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
          {!AVAILABLE_FONTS.some((f) => f.name === activeTheme.typography.fontName) && (
            <option value={activeTheme.typography.fontName}>
              {activeTheme.typography.fontName} (Active)
            </option>
          )}
        </select>

        {/* Full Modal Launcher */}
        <button
          type="button"
          onClick={onOpenFontModal}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 hover:border-indigo-500 rounded-lg text-indigo-300 transition cursor-pointer group"
        >
          <span className="flex items-center gap-2 font-medium text-[11px]">
            <Globe className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition" />
            <span>Browse 1,950+ Fonts</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
            Catalog →
          </span>
        </button>
      </div>

      {/* WCAG Contrast Health Box */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800/80 space-y-2 shrink-0">
        <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>WCAG Contrast Health</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded bg-slate-900 border border-slate-800 flex flex-col">
            <span className="text-slate-400">Text vs BG</span>
            <span
              className={`font-mono font-semibold ${
                textContrast.wcagAA ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {textContrast.ratio}:1 ({textContrast.wcagAAA ? 'AAA' : textContrast.wcagAA ? 'AA' : 'Fail'})
            </span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 flex flex-col">
            <span className="text-slate-400">Accent vs BG</span>
            <span
              className={`font-mono font-semibold ${
                accentContrast.wcagAA ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {accentContrast.ratio}:1 ({accentContrast.wcagAAA ? 'AAA' : accentContrast.wcagAA ? 'AA' : 'Fail'})
            </span>
          </div>
        </div>
      </div>

      {/* Semantic Color Groups Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {colorGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <div className="text-[11px] font-semibold text-indigo-300/90 tracking-wide uppercase px-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>{group.title}</span>
            </div>

            <div className="space-y-1.5">
              {group.fields.map(({ path, label }) => {
                const token = getTokenByPath(path);
                const hasGrad = isGradient(token);
                const isExpanded = expandedPath === path;
                const cssBg = colorTokenToCss(token);

                return (
                  <div key={path} className="rounded-lg overflow-hidden transition border border-slate-800/80 bg-slate-950/50">
                    {/* Collapsed Row Summary */}
                    <div
                      onClick={() => setExpandedPath(isExpanded ? null : path)}
                      className="flex items-center justify-between p-2.5 hover:bg-slate-900/80 transition cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-5 h-5 rounded-md border border-white/20 shrink-0 shadow-xs"
                          style={{ background: cssBg }}
                        />
                        <span className="text-xs font-medium text-slate-200 truncate">{label}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                            hasGrad
                              ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                              : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                          }`}
                        >
                          {hasGrad ? 'Gradient' : 'Flat'}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Inline GradientEditor when expanded */}
                    {isExpanded && (
                      <div className="p-2 bg-slate-950 border-t border-slate-800/80">
                        <GradientEditor
                          token={token}
                          label={label}
                          onChange={(newToken) => onColorChange(path, newToken)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
