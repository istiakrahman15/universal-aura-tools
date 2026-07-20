"use client";

import React, { useState, useRef } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, Upload, Image as ImageIcon, Download, Settings, Sliders } from "lucide-react";

export function ImageCompressor() {
  const { showToast, addToHistory } = useAppState();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1200);
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
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string);
        setCompressedSrc(null);
        setCompressedSize(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!imageSrc) return;
    setIsCompiling(true);

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Maintain Aspect Ratio Resize
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsCompiling(false);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Export as compressed blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const compressedUrl = URL.createObjectURL(blob);
            setCompressedSrc(compressedUrl);
            addToHistory("image-compressor", "Image Compressor", `Compressed image: ${fileName}`);
            showToast("Image compressed successfully!", "success");
          }
          setIsCompiling(false);
        },
        "image/jpeg",
        quality
      );
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Upload Drag area */}
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
          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-200">Drag & drop your image, or browse</span>
          <span className="text-xs text-neutral-400 mt-1">Supports PNG, JPG, JPEG, WEBP formats up to 10MB</span>
        </div>
      )}

      {/* Editor & Sliders Workspace */}
      {imageSrc && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="xl:col-span-1 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Sliders size={15} />
              Compression Settings
            </h3>

            {/* Quality Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500">
                <label htmlFor="qualityRange">Compression Quality</label>
                <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                id="qualityRange"
                type="range"
                min={0.1}
                max={1.0}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-violet-600 dark:accent-violet-500 cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none"
              />
            </div>

            {/* Max Width Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500">
                <label htmlFor="widthRange">Max Width (pixels)</label>
                <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                  {maxWidth}px
                </span>
              </div>
              <input
                id="widthRange"
                type="range"
                min={400}
                max={3000}
                step={100}
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="w-full accent-violet-600 dark:accent-violet-500 cursor-pointer h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none"
              />
            </div>

            <button
              onClick={compressImage}
              disabled={isCompiling}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors cursor-pointer flex items-center justify-center gap-2 h-11 disabled:opacity-50"
            >
              {isCompiling ? "Processing..." : "Run Compression"}
            </button>

            {/* Change source image button */}
            <button
              onClick={() => {
                setImageSrc(null);
                setCompressedSrc(null);
              }}
              className="w-full py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 font-semibold text-xs transition-colors cursor-pointer"
            >
              Upload Different Image
            </button>
          </div>

          {/* Side-by-side Visual comparison */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Original Card */}
            <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-500 uppercase tracking-wider">Original image</span>
                <span className="font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  {fileSize ? formatSize(fileSize) : "N/A"}
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

            {/* Compressed Card */}
            <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-500 uppercase tracking-wider">Compressed image</span>
                {compressedSize && (
                  <span className="font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                    {formatSize(compressedSize)}
                  </span>
                )}
              </div>
              <div className="p-4 flex items-center justify-center flex-1 bg-neutral-100/10 dark:bg-neutral-950/20 min-h-[220px] relative">
                {compressedSrc ? (
                  <div className="flex flex-col items-center gap-4 w-full">
                    <img
                      src={compressedSrc}
                      alt="Compressed workspace outcome"
                      className="max-h-[200px] object-contain rounded-xl border border-neutral-200/40 dark:border-neutral-800/40"
                    />
                    <a
                      href={compressedSrc}
                      download={`compressed_${fileName}`}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download size={13} />
                      Download JPG
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <ImageIcon className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                    <span className="text-xs font-semibold text-neutral-400">Click &quot;Run Compression&quot; to compile preview</span>
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
