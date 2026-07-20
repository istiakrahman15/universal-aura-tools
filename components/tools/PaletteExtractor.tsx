"use client";

import React, { useState, useRef } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Upload, Image as ImageIcon, Copy, Check, Palette, Sparkles, RefreshCw } from "lucide-react";

export function PaletteExtractor() {
  const { showToast, addToHistory } = useAppState();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    loadImage(file);
  };

  const loadImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string);
        extractPalette(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const extractPalette = (src: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Downsample for fast local color analyzing
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);

      const imgData = ctx.getImageData(0, 0, 50, 50).data;
      const colorCounts: { [key: string]: number } = {};

      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const a = imgData[i + 3];

        if (a < 128) continue; // Skip alpha transparent pixels

        // Round RGB values slightly to cluster colors
        const rd = Math.round(r / 16) * 16;
        const gd = Math.round(g / 16) * 16;
        const bd = Math.round(b / 16) * 16;

        const hex = rgbToHex(rd, gd, bd);
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }

      // Sort by frequency
      const sorted = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
      
      // Select up to 6 distinct colors
      const distinct: string[] = [];
      for (const hex of sorted) {
        if (distinct.length >= 6) break;
        // Avoid near-identical colors
        if (!distinct.some((c) => colorDistance(c, hex) < 80)) {
          distinct.push(hex);
        }
      }

      // Fallback colors if too few
      while (distinct.length < 6 && distinct.length > 0) {
        distinct.push(lightenColor(distinct[0], distinct.length * 0.15));
      }

      setColors(distinct);
      setIsProcessing(false);
      addToHistory("palette-extractor", "Palette Extractor", "Extracted dominant colors from image");
      showToast("Dominant color palette extracted!", "success");
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (c: number) => {
      const hex = Math.max(0, Math.min(255, c)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
  };

  const colorDistance = (c1: string, c2: string) => {
    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };
    const rgb1 = hexToRgb(c1);
    const rgb2 = hexToRgb(c2);
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
  };

  const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.slice(1), 16),
      amt = Math.round(2.55 * (percent * 100)),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    showToast(`Hex code ${hex} copied!`, "success");
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6">
      
      {!imageSrc && (
        <div
          onClick={triggerUpload}
          className="h-64 border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-violet-500/50 bg-neutral-50/50 dark:bg-neutral-900/10 hover:bg-neutral-50 dark:hover:bg-neutral-900/25 transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-violet-500 group-hover:scale-110 transition-all mb-4">
            <Upload size={24} />
          </div>
          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">Upload image to extract palette</span>
          <span className="text-xs text-neutral-400 mt-1">Supports PNG, JPG, JPEG, WEBP formats</span>
        </div>
      )}

      {imageSrc && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Column 1: Image view (5 cols) */}
          <div className="xl:col-span-5 flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Source Image</span>
              <button
                onClick={() => {
                  setImageSrc(null);
                  setColors([]);
                }}
                className="text-xs text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
              >
                <RefreshCw size={12} />
                Change Image
              </button>
            </div>
            <div className="p-4 flex items-center justify-center flex-1 bg-neutral-100/10 dark:bg-neutral-950/20 min-h-[250px]">
              <img
                src={imageSrc}
                alt="Uploaded source file"
                className="max-h-[300px] object-contain rounded-xl border border-neutral-200/40 dark:border-neutral-800/40"
              />
            </div>
          </div>

          {/* Column 2: Extracted colors (7 cols) */}
          <div className="xl:col-span-7 flex flex-col gap-5">
            <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-5">
                <Palette size={15} />
                Extracted Dominant Swatches
              </h3>

              {isProcessing ? (
                <div className="h-32 flex flex-col items-center justify-center">
                  <Sparkles className="text-violet-500 animate-spin mb-2" size={24} />
                  <span className="text-xs font-semibold text-neutral-400">Analyzing pixels and extracting color values...</span>
                </div>
              ) : colors.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      onClick={() => copyColor(color)}
                      className="p-3.5 rounded-2xl border border-neutral-200/50 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-all flex flex-col gap-3 group shadow-sm hover:shadow-md"
                    >
                      <div
                        className="w-full h-14 rounded-xl border border-neutral-200/20 shadow-inner"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex items-center justify-between text-xs font-bold font-mono text-neutral-700 dark:text-neutral-300 uppercase">
                        <span>{color}</span>
                        <span className="text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                          {copiedColor === color ? <Check size={14} className="text-emerald-500" /> : <Copy size={12} />}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <span className="text-xs font-semibold text-neutral-400">Waiting for image analyzing...</span>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
