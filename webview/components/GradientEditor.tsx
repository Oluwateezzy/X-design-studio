import React from 'react';
import { Layers, Plus, Trash2, Sliders, Palette } from 'lucide-react';
import type { ColorToken, GradientConfig, GradientStop } from '../lib/types/color-token.js';
import { colorTokenToCss, isGradient } from '../lib/types/color-token.js';

export interface GradientEditorProps {
  token: ColorToken;
  label: string;
  onChange: (token: ColorToken) => void;
  className?: string;
}

/**
 * Utility to shift hex brightness for auto-generating a second gradient stop.
 */
function adjustColorBrightness(hex: string, percent: number): string {
  if (!hex || !hex.startsWith('#')) return '#1E3A8A';
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6 && cleanHex.length !== 3) return '#1E3A8A';
  
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map((c) => c + c).join('')
    : cleanHex;

  const num = parseInt(fullHex, 16);
  if (isNaN(num)) return '#1E3A8A';

  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = ((num >> 8) & 0x00ff) + amt;
  let B = (num & 0x0000ff) + amt;

  R = Math.min(255, Math.max(0, R));
  G = Math.min(255, Math.max(0, G));
  B = Math.min(255, Math.max(0, B));

  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`.toUpperCase();
}

export const GradientEditor: React.FC<GradientEditorProps> = ({
  token,
  label,
  onChange,
  className = '',
}) => {
  const hasGradient = isGradient(token);
  const cssValue = colorTokenToCss(token);

  // Toggle between Flat and Gradient mode
  const handleToggleMode = (mode: 'flat' | 'gradient') => {
    if (mode === 'flat') {
      onChange({
        hex: token.hex,
        gradient: null,
      });
    } else {
      if (token.gradient) return;
      const secondColor = adjustColorBrightness(token.hex, -30);
      const defaultGradient: GradientConfig = {
        type: 'linear',
        angle: 135,
        stops: [
          { color: token.hex, position: 0 },
          { color: secondColor !== token.hex ? secondColor : '#1E3A8A', position: 100 },
        ],
      };
      onChange({
        hex: token.hex,
        gradient: defaultGradient,
      });
    }
  };

  // Change base hex color
  const handleHexChange = (newHex: string) => {
    if (!hasGradient) {
      onChange({
        hex: newHex,
        gradient: null,
      });
    } else if (token.gradient) {
      // Update first stop color or hex
      const updatedStops = [...token.gradient.stops];
      if (updatedStops.length > 0) {
        updatedStops[0] = { ...updatedStops[0], color: newHex };
      }
      onChange({
        hex: newHex,
        gradient: {
          ...token.gradient,
          stops: updatedStops,
        },
      });
    }
  };

  // Update gradient configuration
  const updateGradient = (partial: Partial<GradientConfig>) => {
    if (!token.gradient) return;
    onChange({
      hex: token.hex,
      gradient: {
        ...token.gradient,
        ...partial,
      },
    });
  };

  // Add a stop at the midpoint of the largest gap
  const handleAddStop = () => {
    if (!token.gradient || token.gradient.stops.length >= 5) return;
    const sorted = [...token.gradient.stops].sort((a, b) => a.position - b.position);

    let maxGap = -1;
    let gapIndex = 0;

    for (let i = 0; i < sorted.length - 1; i++) {
      const gap = sorted[i + 1].position - sorted[i].position;
      if (gap > maxGap) {
        maxGap = gap;
        gapIndex = i;
      }
    }

    const prevStop = sorted[gapIndex];
    const nextStop = sorted[gapIndex + 1];
    const midPos = Math.round((prevStop.position + nextStop.position) / 2);
    const midColor = prevStop.color;

    const updatedStops = [...sorted];
    updatedStops.splice(gapIndex + 1, 0, { color: midColor, position: midPos });

    updateGradient({ stops: updatedStops });
  };

  // Remove a stop
  const handleRemoveStop = (index: number) => {
    if (!token.gradient || token.gradient.stops.length <= 2) return;
    const updatedStops = token.gradient.stops.filter((_, i) => i !== index);
    updateGradient({ stops: updatedStops });
  };

  // Update a single stop
  const handleUpdateStop = (index: number, partialStop: Partial<GradientStop>) => {
    if (!token.gradient) return;
    const updatedStops = token.gradient.stops.map((stop, i) =>
      i === index ? { ...stop, ...partialStop } : stop
    );
    updateGradient({ stops: updatedStops });
  };

  return (
    <div
      className={`p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-md space-y-3 ${className}`}
    >
      {/* Header & Mode Switcher */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Palette className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-200 truncate">{label}</span>
        </div>

        {/* Mode Toggle Pills */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => handleToggleMode('flat')}
            className={`px-2 py-1 text-[10px] font-medium rounded-md transition cursor-pointer ${
              !hasGradient
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Flat
          </button>
          <button
            type="button"
            onClick={() => handleToggleMode('gradient')}
            className={`px-2 py-1 text-[10px] font-medium rounded-md transition cursor-pointer ${
              hasGradient
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gradient
          </button>
        </div>
      </div>

      {/* Live Gradient / Color Preview Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Live Preview</span>
          <span className="font-mono text-[9px] text-indigo-300 truncate max-w-[180px]">
            {cssValue}
          </span>
        </div>
        <div
          className="w-full h-7 rounded-lg border border-slate-700/80 shadow-inner transition-all duration-200"
          style={{ background: cssValue }}
        />
      </div>

      {/* Flat Mode Controls */}
      {!hasGradient && (
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={token.hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0 shrink-0"
            />
            <span className="text-xs text-slate-300">Base Color</span>
          </div>
          <input
            type="text"
            value={token.hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-24 px-2 py-1 text-[11px] font-mono bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-indigo-500 text-right"
          />
        </div>
      )}

      {/* Gradient Mode Controls */}
      {hasGradient && token.gradient && (
        <div className="space-y-3 pt-1 border-t border-slate-800/60">
          {/* Type Selector & Angle Dial */}
          <div className="grid grid-cols-2 gap-2">
            {/* Gradient Type */}
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <Layers className="w-3 h-3 text-indigo-400" />
                <span>Type</span>
              </label>
              <select
                value={token.gradient.type}
                onChange={(e) =>
                  updateGradient({
                    type: e.target.value as 'linear' | 'radial' | 'conic',
                  })
                }
                className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded-md text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
              </select>
            </div>

            {/* Angle Controls */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-indigo-400" />
                  <span>Angle</span>
                </span>
                <span className="font-mono text-indigo-300 font-semibold">
                  {token.gradient.angle}°
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={token.gradient.angle}
                disabled={token.gradient.type === 'radial'}
                onChange={(e) => updateGradient({ angle: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-40"
              />
            </div>
          </div>

          {/* Color Stops Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-300">
                Color Stops ({token.gradient.stops.length}/5)
              </span>
              <button
                type="button"
                onClick={handleAddStop}
                disabled={token.gradient.stops.length >= 5}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-3 h-3" />
                <span>Add Stop</span>
              </button>
            </div>

            {/* Stop Items */}
            <div className="space-y-1.5">
              {token.gradient.stops.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-1.5 rounded-md bg-slate-950/80 border border-slate-800/80"
                >
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => handleUpdateStop(index, { color: e.target.value })}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0 shrink-0"
                  />

                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => handleUpdateStop(index, { color: e.target.value })}
                    className="w-16 px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-indigo-500"
                  />

                  {/* Position Slider */}
                  <div className="flex-1 flex items-center gap-1 min-w-0">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) =>
                        handleUpdateStop(index, { position: parseInt(e.target.value, 10) })
                      }
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <span className="text-[9px] font-mono text-slate-400 w-7 text-right shrink-0">
                      {stop.position}%
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveStop(index)}
                    disabled={token.gradient!.stops.length <= 2}
                    className="p-1 text-slate-500 hover:text-rose-400 transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed shrink-0"
                    title="Remove stop"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
