"use client";

import React, { useState, useRef } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Upload, Image as ImageIcon, Download, Settings, Sliders, RefreshCw } from "lucide-react";

export function ImageResizer() {
  const { showToast, addToHistory } = useAppState();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [origWidth, setOrigWidth] = useState<number | null>(null);
  const [origHeight, setOrigHeight] = useState<number | null>(null);
  const [targetWidth, setTargetWidth] = useState<string>("800");
  const [targetHeight, setTargetHeight] = useState<string>("600");
  const [lockRatio, setLockRatio] = useState(true);
  const [resizedSrc, setResizedSrc] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    loadImage(file);
  };

  const loadImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file (PNG, JPG, WEBP).", "error");
      return;
    }
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const src = event.target.result as string;
        setImageSrc(src);

        const img = new Image();
        img.src = src;
        img.onload = () => {
          setOrigWidth(img.width);
          setOrigHeight(img.height);
          setTargetWidth(img.width.toString());
          setTargetHeight(img.height.toString());
          setResizedSrc(null);
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: string) => {
    setTargetWidth(val);
    const num = Number(val);
    if (lockRatio && num && origWidth && origHeight) {
      const computed = Math.round((num * origHeight) / origWidth);
      setTargetHeight(computed.toString());
    }
  };

  const handleHeightChange = (val: string) => {
    setTargetHeight(val);
    const num = Number(val);
    if (lockRatio && num && origWidth && origHeight) {
      const computed = Math.round((num * origWidth) / origHeight);
      setTargetWidth(computed.toString());
    }
  };

  const runResize = () => {
    if (!imageSrc) return;
    const w = Number(targetWidth);
    const h = Number(targetHeight);

    if (isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
      showToast("Please enter valid width and height numbers.", "error");
      return;
    }

    setIsCompiling(true);

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsCompiling(false);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setResizedSrc(url);
            addToHistory("image-resizer", "Image Resizer", `Resized image: ${fileName}`);
            showToast("Image resized successfully!", "success");
          }
          setIsCompiling(false);
        },
        "image/png"
      );
    };
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
          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">Upload image to resize</span>
          <span className="text-xs text-neutral-400 mt-1">Supports PNG, JPG, JPEG, WEBP formats</span>
        </div>
      )}

      {imageSrc && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="xl:col-span-1 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Settings size={15} />
              Resize settings
            </h3>

            {/* Inputs Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="targetWidthInput" className="text-xs font-semibold text-neutral-500">Width (px)</label>
                <input
                  id="targetWidthInput"
                  type="number"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none focus:border-violet-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="targetHeightInput" className="text-xs font-semibold text-neutral-500">Height (px)</label>
                <input
                  id="targetHeightInput"
                  type="number"
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Lock Ratio */}
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={lockRatio}
                onChange={(e) => setLockRatio(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 accent-violet-600"
              />
              Lock Aspect Ratio
            </label>

            <button
              onClick={runResize}
              disabled={isCompiling}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors cursor-pointer flex items-center justify-center gap-2 h-11"
            >
              {isCompiling ? "Processing..." : "Resize Image"}
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                setImageSrc(null);
                setResizedSrc(null);
              }}
              className="w-full py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 font-semibold text-xs transition-colors cursor-pointer"
            >
              Upload Different Image
            </button>
          </div>

          {/* View Output side-by-side */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Original Card */}
            <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-500 uppercase tracking-wider">Original image</span>
                <span className="font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  {origWidth}x{origHeight}px
                </span>
              </div>
              <div className="p-4 flex items-center justify-center flex-1 bg-neutral-100/10 dark:bg-neutral-950/20 min-h-[220px]">
                <img
                  src={imageSrc}
                  alt="Original workspace preview"
                  className="max-h-[260px] object-contain rounded-xl border border-neutral-200/40 dark:border-neutral-800/40"
                />
              </div>
            </div>

            {/* Resized Card */}
            <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-500 uppercase tracking-wider">Resized output</span>
                {resizedSrc && (
                  <span className="font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                    {targetWidth}x{targetHeight}px
                  </span>
                )}
              </div>
              <div className="p-4 flex items-center justify-center flex-1 bg-neutral-100/10 dark:bg-neutral-950/20 min-h-[220px] relative">
                {resizedSrc ? (
                  <div className="flex flex-col items-center gap-4 w-full">
                    <img
                      src={resizedSrc}
                      alt="Resized output outcome"
                      className="max-h-[200px] object-contain rounded-xl border border-neutral-200/40 dark:border-neutral-800/40"
                    />
                    <a
                      href={resizedSrc}
                      download={`resized_${fileName}`}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download size={13} />
                      Download Resized PNG
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <ImageIcon className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                    <span className="text-xs font-semibold text-neutral-400">Click &quot;Resize Image&quot; to compile preview</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
