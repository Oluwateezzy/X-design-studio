import React, { useState } from "react";
import {
  Palette,
  Box,
  FileText,
  MousePointer,
  Tag,
  Sparkles,
  CheckCircle2,
  Type,
  Ruler,
  Film,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  Filter,
} from "lucide-react";
import type { ThemeConfigV2 } from "../lib/types/theme-config-v2";
import type { ColorToken } from "../lib/types/color-token";
import { PRESET_THEMES, THEME_CATEGORIES } from "../lib/themes-dataset";
import { GradientEditor } from "./GradientEditor";
import { LivePreviewCanvas } from "./LivePreviewCanvas";
import { TypographyEditor } from "./TypographyEditor";

export interface GlobalThemeEditorProps {
  theme: ThemeConfigV2;
  onChangeTheme: (nextTheme: ThemeConfigV2) => void;
  onOpenFontModal?: () => void;
}

export const GlobalThemeEditor: React.FC<GlobalThemeEditorProps> = ({
  theme,
  onChangeTheme,
  onOpenFontModal,
}) => {
  // Collapsible section state for all 10 sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    coreColors: true,
    surfaceColors: false,
    textColors: false,
    ctaButton: false,
    badgeSystem: false,
    glowAmbient: false,
    semanticColors: false,
    typography: false,
    spacingRadius: false,
    motionAnimation: false,
  });

  // Preset filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Find original preset theme for section resets
  const getBasePreset = (): ThemeConfigV2 => {
    return PRESET_THEMES.find((t) => t.id === theme.id) || PRESET_THEMES[0];
  };

  // Helper to update color token at nested path
  const handleColorChange = (path: string[], token: ColorToken) => {
    const next = JSON.parse(JSON.stringify(theme)) as ThemeConfigV2;
    let obj: any = next.colors;
    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]];
    }
    obj[path[path.length - 1]] = token;
    onChangeTheme(next);
  };

  // Helper to apply whole preset theme
  const handleApplyPreset = (presetId: string) => {
    const found = PRESET_THEMES.find((p) => p.id === presetId);
    if (found) {
      onChangeTheme(JSON.parse(JSON.stringify(found)));
    }
  };

  // Section level resets
  const handleResetSection = (sectionKey: string) => {
    const basePreset = getBasePreset();
    const next = JSON.parse(JSON.stringify(theme)) as ThemeConfigV2;

    switch (sectionKey) {
      case "coreColors":
        next.colors.bg = JSON.parse(JSON.stringify(basePreset.colors.bg));
        next.colors.primary = JSON.parse(JSON.stringify(basePreset.colors.primary));
        next.colors.secondary = JSON.parse(JSON.stringify(basePreset.colors.secondary));
        next.colors.accent = JSON.parse(JSON.stringify(basePreset.colors.accent));
        break;

      case "surfaceColors":
        next.colors.surface = JSON.parse(JSON.stringify(basePreset.colors.surface));
        next.colors.surfaceBorder = JSON.parse(JSON.stringify(basePreset.colors.surfaceBorder));
        break;

      case "textColors":
        next.colors.text = JSON.parse(JSON.stringify(basePreset.colors.text));
        next.colors.textMuted = JSON.parse(JSON.stringify(basePreset.colors.textMuted));
        break;

      case "ctaButton":
        next.colors.cta = JSON.parse(JSON.stringify(basePreset.colors.cta));
        break;

      case "badgeSystem":
        next.colors.badge = JSON.parse(JSON.stringify(basePreset.colors.badge));
        break;

      case "glowAmbient":
        next.colors.glow = JSON.parse(JSON.stringify(basePreset.colors.glow));
        break;

      case "semanticColors":
        next.colors.semantic = JSON.parse(JSON.stringify(basePreset.colors.semantic));
        break;

      case "typography":
        next.typography = JSON.parse(JSON.stringify(basePreset.typography));
        break;

      case "spacingRadius":
        next.spacing = JSON.parse(JSON.stringify(basePreset.spacing));
        break;

      case "motionAnimation":
        next.motion = JSON.parse(JSON.stringify(basePreset.motion));
        break;

      default:
        break;
    }

    onChangeTheme(next);
  };

  // Filter preset themes by category
  const filteredPresets = PRESET_THEMES.filter((p) =>
    selectedCategory === "All" ? true : p.category === selectedCategory
  );

  return (
    <div className="flex flex-col h-full w-full bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] overflow-hidden">
      {/* Top Header & Preset Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-[var(--vscode-border)] bg-[var(--vscode-sideBar-background)]/50 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold tracking-tight text-[var(--vscode-foreground)]">
              Global Theme Editor
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              V2 Architecture
            </span>
          </div>
          <p className="text-xs opacity-70 line-clamp-1 mt-0.5">
            Customize design tokens, colour models, typography, spacing, and motion.
          </p>
        </div>

        {/* Preset Quick-Switch Dropdown & Category Filter */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] rounded-xl px-2.5 py-1.5 shadow-sm text-xs">
            <Filter className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs font-medium text-[var(--vscode-foreground)] focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              {THEME_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Quick-Switch */}
          <div className="flex items-center gap-1.5 bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] rounded-xl px-3 py-1.5 shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <select
              value={theme.id}
              onChange={(e) => handleApplyPreset(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[var(--vscode-foreground)] focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              {filteredPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name} ({preset.category})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT COLUMN: Scrollable Token Editors */}
        <div className="w-full md:w-1/2 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 border-r border-[var(--vscode-border)]">
          {/* SECTION 1: 🎨 Core Colours */}
          <CollapsibleSection
            icon={<Palette className="w-4 h-4 text-indigo-400" />}
            title="Core Colours"
            subtitle="Base background, primary fill, secondary accent, and accent glow"
            isOpen={openSections.coreColors}
            onToggle={() => toggleSection("coreColors")}
            onReset={() => handleResetSection("coreColors")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GradientEditor
                label="Background (bg)"
                token={theme.colors.bg}
                onChange={(t) => handleColorChange(["bg"], t)}
              />
              <GradientEditor
                label="Primary Fill (primary)"
                token={theme.colors.primary}
                onChange={(t) => handleColorChange(["primary"], t)}
              />
              <GradientEditor
                label="Secondary Accent (secondary)"
                token={theme.colors.secondary}
                onChange={(t) => handleColorChange(["secondary"], t)}
              />
              <GradientEditor
                label="Accent Highlight (accent)"
                token={theme.colors.accent}
                onChange={(t) => handleColorChange(["accent"], t)}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION 2: 📦 Surface Colours */}
          <CollapsibleSection
            icon={<Box className="w-4 h-4 text-purple-400" />}
            title="Surface Colours"
            subtitle="Card surfaces, modals, containers, and borders"
            isOpen={openSections.surfaceColors}
            onToggle={() => toggleSection("surfaceColors")}
            onReset={() => handleResetSection("surfaceColors")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GradientEditor
                label="Surface Background (surface)"
                token={theme.colors.surface}
                onChange={(t) => handleColorChange(["surface"], t)}
              />
              <GradientEditor
                label="Surface Border (surfaceBorder)"
                token={theme.colors.surfaceBorder}
                onChange={(t) => handleColorChange(["surfaceBorder"], t)}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION 3: 📝 Text Colours */}
          <CollapsibleSection
            icon={<FileText className="w-4 h-4 text-sky-400" />}
            title="Text Colours"
            subtitle="Primary body text and muted secondary text"
            isOpen={openSections.textColors}
            onToggle={() => toggleSection("textColors")}
            onReset={() => handleResetSection("textColors")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GradientEditor
                label="Primary Text (text)"
                token={theme.colors.text}
                onChange={(t) => handleColorChange(["text"], t)}
              />
              <GradientEditor
                label="Muted Text (textMuted)"
                token={theme.colors.textMuted}
                onChange={(t) => handleColorChange(["textMuted"], t)}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION 4: 🔘 CTA / Button */}
          <CollapsibleSection
            icon={<MousePointer className="w-4 h-4 text-amber-400" />}
            title="CTA / Button"
            subtitle="Primary action buttons with prominent gradient controls"
            isOpen={openSections.ctaButton}
            onToggle={() => toggleSection("ctaButton")}
            onReset={() => handleResetSection("ctaButton")}
          >
            <div className="space-y-3">
              <p className="text-xs opacity-75">
                The Call-To-Action (CTA) token drives interactive buttons across your design system. Flat colours or multi-stop gradients are fully supported.
              </p>
              <GradientEditor
                label="Call to Action (cta)"
                token={theme.colors.cta}
                onChange={(t) => handleColorChange(["cta"], t)}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION 5: 🏷️ Badge System */}
          <CollapsibleSection
            icon={<Tag className="w-4 h-4 text-emerald-400" />}
            title="Badge System"
            subtitle="Status tags, pill badges, and highlight chips"
            isOpen={openSections.badgeSystem}
            onToggle={() => toggleSection("badgeSystem")}
            onReset={() => handleResetSection("badgeSystem")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GradientEditor
                label="Badge Fill (badge.bg)"
                token={theme.colors.badge.bg}
                onChange={(t) => handleColorChange(["badge", "bg"], t)}
              />
              <GradientEditor
                label="Badge Border (badge.border)"
                token={theme.colors.badge.border}
                onChange={(t) => handleColorChange(["badge", "border"], t)}
              />
              <GradientEditor
                label="Badge Text (badge.text)"
                token={theme.colors.badge.text}
                onChange={(t) => handleColorChange(["badge", "text"], t)}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION 6: ✨ Glow & Ambient */}
          <CollapsibleSection
            icon={<Sparkles className="w-4 h-4 text-amber-400" />}
            title="Glow & Ambient"
            subtitle="Floating background orbs, rim highlights, and ambient light"
            isOpen={openSections.glowAmbient}
            onToggle={() => toggleSection("glowAmbient")}
            onReset={() => handleResetSection("glowAmbient")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GradientEditor
                label="Primary Glow (glow.primary)"
                token={theme.colors.glow.primary}
                onChange={(t) => handleColorChange(["glow", "primary"], t)}
              />
              <GradientEditor
                label="Secondary Glow (glow.secondary)"
                token={theme.colors.glow.secondary}
                onChange={(t) => handleColorChange(["glow", "secondary"], t)}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION 7: ✅ Semantic Colours */}
          <CollapsibleSection
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            title="Semantic Colours"
            subtitle="Success, warning, error, and informational state indicators"
            isOpen={openSections.semanticColors}
            onToggle={() => toggleSection("semanticColors")}
            onReset={() => handleResetSection("semanticColors")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GradientEditor
                label="Success (semantic.success)"
                token={theme.colors.semantic.success}
                onChange={(t) => handleColorChange(["semantic", "success"], t)}
              />
              <GradientEditor
                label="Warning (semantic.warning)"
                token={theme.colors.semantic.warning}
                onChange={(t) => handleColorChange(["semantic", "warning"], t)}
              />
              <GradientEditor
                label="Error (semantic.error)"
                token={theme.colors.semantic.error}
                onChange={(t) => handleColorChange(["semantic", "error"], t)}
              />
              <GradientEditor
                label="Info (semantic.info)"
                token={theme.colors.semantic.info}
                onChange={(t) => handleColorChange(["semantic", "info"], t)}
              />
            </div>
          </CollapsibleSection>

          {/* SECTION 8: 🔤 Typography */}
          <CollapsibleSection
            icon={<Type className="w-4 h-4 text-indigo-400" />}
            title="Typography"
            subtitle="Google Fonts, scale sizes, line heights, and font weight tokens"
            isOpen={openSections.typography}
            onToggle={() => toggleSection("typography")}
            onReset={() => handleResetSection("typography")}
          >
            <TypographyEditor
              typography={theme.typography}
              onChange={(updatedTypography) =>
                onChangeTheme({
                  ...theme,
                  typography: updatedTypography,
                })
              }
              onOpenFontModal={() => onOpenFontModal?.()}
            />
          </CollapsibleSection>

          {/* SECTION 9: 📐 Spacing & Radius */}
          <CollapsibleSection
            icon={<Ruler className="w-4 h-4 text-emerald-400" />}
            title="Spacing & Radius"
            subtitle="Base layout grid unit and border radius scale tokens"
            isOpen={openSections.spacingRadius}
            onToggle={() => toggleSection("spacingRadius")}
            onReset={() => handleResetSection("spacingRadius")}
          >
            <div className="space-y-4">
              {/* Base Unit */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Base Grid Unit</span>
                  <span className="font-mono text-emerald-400">{theme.spacing.unit}px</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={16}
                  step={2}
                  value={theme.spacing.unit}
                  onChange={(e) =>
                    onChangeTheme({
                      ...theme,
                      spacing: {
                        ...theme.spacing,
                        unit: parseInt(e.target.value, 10),
                      },
                    })
                  }
                  className="w-full h-1.5 bg-[var(--vscode-input-background)] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Border Radii Grid */}
              <div className="space-y-2 pt-2 border-t border-[var(--vscode-border)]/60">
                <span className="text-xs font-semibold text-[var(--vscode-foreground)] block">
                  Border Radius Tokens
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {(["sm", "md", "lg", "xl", "pill"] as const).map((rKey) => (
                    <div key={rKey} className="space-y-1">
                      <label className="text-[10px] font-medium opacity-70 uppercase tracking-wider block">
                        {rKey}
                      </label>
                      <input
                        type="text"
                        value={theme.spacing.borderRadius[rKey]}
                        onChange={(e) =>
                          onChangeTheme({
                            ...theme,
                            spacing: {
                              ...theme.spacing,
                              borderRadius: {
                                ...theme.spacing.borderRadius,
                                [rKey]: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-2 py-1 text-xs font-mono rounded bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] text-[var(--vscode-foreground)] focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* SECTION 10: 🎬 Motion & Animation */}
          <CollapsibleSection
            icon={<Film className="w-4 h-4 text-purple-400" />}
            title="Motion & Animation"
            subtitle="Global transition flags, duration, cubic-bezier easing, and ambient effects"
            isOpen={openSections.motionAnimation}
            onToggle={() => toggleSection("motionAnimation")}
            onReset={() => handleResetSection("motionAnimation")}
          >
            <div className="space-y-4">
              {/* Duration & Easing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--vscode-foreground)]">
                    Transition Duration
                  </label>
                  <input
                    type="text"
                    value={theme.motion.transitionDuration}
                    onChange={(e) =>
                      onChangeTheme({
                        ...theme,
                        motion: {
                          ...theme.motion,
                          transitionDuration: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. 0.3s"
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] text-xs font-mono text-[var(--vscode-foreground)] focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--vscode-foreground)]">
                    Transition Easing
                  </label>
                  <input
                    type="text"
                    value={theme.motion.transitionEasing}
                    onChange={(e) =>
                      onChangeTheme({
                        ...theme,
                        motion: {
                          ...theme.motion,
                          transitionEasing: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. cubic-bezier(0.16, 1, 0.3, 1)"
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] text-xs font-mono text-[var(--vscode-foreground)] focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Animation Feature Switches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[var(--vscode-border)]/60">
                <ToggleSwitch
                  label="Enable Global Animations"
                  checked={theme.motion.enableAnimations}
                  onChange={(val) =>
                    onChangeTheme({
                      ...theme,
                      motion: { ...theme.motion, enableAnimations: val },
                    })
                  }
                />

                <ToggleSwitch
                  label="Enable Glow Orbs"
                  checked={theme.motion.enableGlowOrbs}
                  onChange={(val) =>
                    onChangeTheme({
                      ...theme,
                      motion: { ...theme.motion, enableGlowOrbs: val },
                    })
                  }
                />

                <ToggleSwitch
                  label="Enable Badge Pulse"
                  checked={theme.motion.enableBadgePulse}
                  onChange={(val) =>
                    onChangeTheme({
                      ...theme,
                      motion: { ...theme.motion, enableBadgePulse: val },
                    })
                  }
                />

                <ToggleSwitch
                  label="Enable Hover Lift"
                  checked={theme.motion.enableHoverLift}
                  onChange={(val) =>
                    onChangeTheme({
                      ...theme,
                      motion: { ...theme.motion, enableHoverLift: val },
                    })
                  }
                />
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* RIGHT COLUMN: Mini Live Preview Canvas */}
        <div className="w-full md:w-1/2 flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative border-t md:border-t-0 md:border-l border-[var(--vscode-border)]">
          <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between z-10 shrink-0">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Token Preview Canvas
            </span>
            <span className="text-[11px] font-mono text-indigo-400">
              {theme.name} • {theme.category}
            </span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <LivePreviewCanvas theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper Components */

interface CollapsibleSectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  icon,
  title,
  subtitle,
  isOpen,
  onToggle,
  onReset,
  children,
}) => {
  return (
    <div className="rounded-2xl bg-[var(--vscode-sideBar-background)]/80 border border-[var(--vscode-border)] shadow-sm overflow-hidden transition-all duration-200">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--vscode-input-background)]/30 transition select-none"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--vscode-foreground)] flex items-center gap-2">
              <span>{title}</span>
            </h3>
            <p className="text-xs opacity-65 truncate max-w-md">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--vscode-input-background)] border border-[var(--vscode-border)] text-[11px] font-medium text-[var(--vscode-foreground)] hover:border-indigo-500/50 transition cursor-pointer"
            title="Revert section to preset defaults"
          >
            <RotateCcw className="w-3 h-3 text-indigo-400" />
            <span className="hidden sm:inline">Reset Section</span>
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content Body */}
      {isOpen && (
        <div className="p-4 border-t border-[var(--vscode-border)]/60 bg-[var(--vscode-editor-background)]/40 animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--vscode-input-background)]/40 border border-[var(--vscode-border)]/60 cursor-pointer hover:bg-[var(--vscode-input-background)]/80 transition">
      <span className="text-xs font-medium text-[var(--vscode-foreground)]">{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer ${
          checked ? "bg-indigo-600 justify-end" : "bg-slate-700 justify-start"
        }`}
      >
        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform" />
      </div>
    </label>
  );
};

export default GlobalThemeEditor;
