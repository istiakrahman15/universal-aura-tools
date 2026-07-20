"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Palette, Settings, Sliders } from "lucide-react";

interface GradientPreset {
  name: string;
  gradient: string;
  color1: string;
  color2: string;
  deg: number;
}

const PRESETS: GradientPreset[] = [
  { name: "Aura Purple-Blue", gradient: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)", color1: "#8B5CF6", color2: "#3B82F6", deg: 135 },
  { name: "SaaS Indigo", gradient: "linear-gradient(45deg, #6366F1 0%, #A5B4FC 100%)", color1: "#6366F1", color2: "#A5B4FC", deg: 45 },
  { name: "Cosmic Neon", gradient: "linear-gradient(90deg, #F43F5E 0%, #D946EF 100%)", color1: "#F43F5E", color2: "#D946EF", deg: 90 },
  { name: "Apple Teal", gradient: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)", color1: "#06B6D4", color2: "#3B82F6", deg: 135 },
  { name: "Sunset Gold", gradient: "linear-gradient(120deg, #F59E0B 0%, #EF4444 100%)", color1: "#F59E0B", color2: "#EF4444", deg: 120 },
  { name: "Emerald Mint", gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)", color1: "#10B981", color2: "#059669", deg: 135 },
];

export function ColorPicker() {
  const { showToast, addToHistory } = useAppState();
  const [color1, setColor1] = useState("#8B5CF6");
  const [color2, setColor2] = useState("#3B82F6");
  const [deg, setDeg] = useState(135);
  const [copiedGrad, setCopiedGrad] = useState(false);
  const [copiedColor1, setCopiedColor1] = useState(false);
  const [copiedColor2, setCopiedColor2] = useState(false);

  const gradientCode = `linear-gradient(${deg}deg, ${color1} 0%, ${color2} 100%)`;

  const copyGradient = () => {
    navigator.clipboard.writeText(`background: ${gradientCode};`);
    setCopiedGrad(true);
    addToHistory("color-picker", "Gradient Generator", `Created gradient code (${color1} to ${color2})`);
    showToast("Gradient CSS copied to clipboard!", "success");
    setTimeout(() => setCopiedGrad(false), 2000);
  };

  const copyColor = (color: string, isFirst: boolean) => {
    navigator.clipboard.writeText(color);
    if (isFirst) {
      setCopiedColor1(true);
      setTimeout(() => setCopiedColor1(false), 2000);
    } else {
      setCopiedColor2(true);
      setTimeout(() => setCopiedColor2(false), 2000);
    }
    showToast(`Hex code ${color} copied!`, "success");
  };

  const applyPreset = (preset: GradientPreset) => {
    setColor1(preset.color1);
    setColor2(preset.color2);
    setDeg(preset.deg);
    showToast(`Preset "${preset.name}" applied!`, "info");
  };

  const resetColors = () => {
    setColor1("#8B5CF6");
    setColor2("#3B82F6");
    setDeg(135);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      
      {/* Column 1: Workspace & Controllers (7 cols) */}
      <div className="xl:col-span-7 flex flex-col gap-6">
        
        {/* Swatch & Controls Card */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Palette size={15} />
              Gradient Customizer
            </h3>
            <button
              onClick={resetColors}
              className="text-xs text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
            >
              <RefreshCw size={12} />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Color 1 Picker */}
            <div className="flex flex-col gap-2">
              <label htmlFor="color1Input" className="text-xs font-semibold text-neutral-500">First Gradient Stop</label>
              <div className="flex items-center gap-3">
                <input
                  id="color1Input"
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 cursor-pointer overflow-hidden p-0"
                />
                <div className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 font-mono text-sm uppercase">
                  <span>{color1}</span>
                  <button
                    onClick={() => copyColor(color1, true)}
                    className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
                  >
                    {copiedColor1 ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Color 2 Picker */}
            <div className="flex flex-col gap-2">
              <label htmlFor="color2Input" className="text-xs font-semibold text-neutral-500">Second Gradient Stop</label>
              <div className="flex items-center gap-3">
                <input
                  id="color2Input"
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 cursor-pointer overflow-hidden p-0"
                />
                <div className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 font-mono text-sm uppercase">
                  <span>{color2}</span>
                  <button
                    onClick={() => copyColor(color2, false)}
                    className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
                  >
                    {copiedColor2 ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Angle Slider */}
          <div className="flex flex-col gap-2.5 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
              <label htmlFor="degRange">Rotation Angle</label>
              <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                {deg}°
              </span>
            </div>
            <input
              id="degRange"
              type="range"
              min={0}
              max={360}
              value={deg}
              onChange={(e) => setDeg(Number(e.target.value))}
              className="w-full accent-violet-600 dark:accent-violet-500 cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none"
            />
          </div>

        </div>

        {/* CSS Code Output Card */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">CSS Stylesheet Code</span>
            <button
              onClick={copyGradient}
              className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:opacity-85 transition-opacity flex items-center gap-1 cursor-pointer"
            >
              {copiedGrad ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copiedGrad ? "Copied CSS!" : "Copy CSS Background"}</span>
            </button>
          </div>
          <pre className="font-mono text-xs p-3.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-950/50 leading-relaxed text-neutral-600 dark:text-neutral-300 overflow-x-auto break-all whitespace-pre-wrap select-all">
            background: {color1};{"\n"}
            background: {gradientCode};
          </pre>
        </div>

      </div>

      {/* Column 2: Visual Preview & Presets (5 cols) */}
      <div className="xl:col-span-5 flex flex-col gap-6">
        
        {/* Real-time color/gradient display canvas */}
        <div
          className="w-full aspect-[4/3] rounded-2xl shadow-lg relative border border-neutral-200/30 dark:border-neutral-800/10 transition-all duration-300"
          style={{ background: gradientCode }}
        >
          {/* Glass floating pill */}
          <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl glass border shadow-md flex items-center justify-between text-xs">
            <div className="flex flex-col gap-0.5 text-neutral-800 dark:text-neutral-150">
              <span className="font-bold">Aura Palette Mesh</span>
              <span className="font-mono font-medium opacity-75">{color1} → {color2}</span>
            </div>
            <span className="font-mono font-bold bg-white/40 dark:bg-black/30 px-2 py-1 rounded">
              {deg}°
            </span>
          </div>
        </div>

        {/* Presets Board */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Premium Aura Presets</h4>
          <div className="grid grid-cols-2 gap-3">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(p)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left transition-all cursor-pointer group"
              >
                <div
                  className="w-8 h-8 rounded-lg border border-neutral-200/20 shrink-0"
                  style={{ background: p.gradient }}
                />
                <span className="text-xs font-semibold truncate text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-neutral-100">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
