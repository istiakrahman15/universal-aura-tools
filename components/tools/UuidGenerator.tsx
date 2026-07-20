"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Fingerprint, Settings, Sparkles } from "lucide-react";

export function UuidGenerator() {
  const { showToast, addToHistory } = useAppState();
  const [count, setCount] = useState(5);
  const [noHyphens, setNoHyphens] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUuidv4 = () => {
    // Cryptographically secure UUID generator
    try {
      if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
    } catch {}

    // Math.random fallback for environments without randomUUID
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateBulk = () => {
    const limit = Math.max(1, Math.min(500, count));
    const generated: string[] = [];
    for (let i = 0; i < limit; i++) {
      let id = generateUuidv4();
      if (noHyphens) {
        id = id.replace(/-/g, "");
      }
      if (uppercase) {
        id = id.toUpperCase();
      }
      generated.push(id);
    }
    setUuids(generated);
    addToHistory("uuid-generator", "UUID Generator", `Generated ${limit} UUID(s)`);
    showToast(`Successfully generated ${limit} UUID(s)!`, "success");
  };

  const copyAll = () => {
    if (uuids.length === 0) return;
    const textToCopy = uuids.join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast("All UUIDs copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Configuration row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        
        {/* Bulk Count */}
        <div className="flex flex-col gap-2">
          <label htmlFor="uuidCountInput" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Number of UUIDs</label>
          <div className="flex items-center gap-2">
            <input
              id="uuidCountInput"
              type="number"
              min={1}
              max={500}
              value={count}
              onChange={(e) => setCount(Math.min(500, Math.max(1, Number(e.target.value))))}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold focus:border-violet-500 outline-none"
            />
          </div>
          <span className="text-[10px] text-neutral-400">Generate up to 500 IDs in a single batch.</span>
        </div>

        {/* Formatting Flags */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Formatting Options</span>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={noHyphens}
                onChange={(e) => setNoHyphens(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 accent-violet-600 cursor-pointer"
              />
              Remove Hyphens (32-char hex)
            </label>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 accent-violet-600 cursor-pointer"
              />
              Convert to UPPERCASE
            </label>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-end">
          <button
            onClick={generateBulk}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors flex items-center justify-center gap-2 cursor-pointer h-11"
          >
            <Fingerprint size={15} />
            Generate UUIDs
          </button>
        </div>

      </div>

      {/* UUIDs scrollable output list */}
      <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Generated Identifiers</span>
          {uuids.length > 0 && (
            <button
              onClick={copyAll}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? "Copied All" : "Copy All"}</span>
            </button>
          )}
        </div>
        <div className="p-4 bg-neutral-50/30 dark:bg-neutral-950/20 font-mono text-sm min-h-[220px] max-h-[400px] overflow-y-auto leading-relaxed relative">
          {uuids.length > 0 ? (
            <div className="flex flex-col gap-1">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center justify-between group py-1 border-b border-neutral-100/50 dark:border-neutral-800/30 last:border-0">
                  <span className="text-neutral-800 dark:text-neutral-200 break-all">{uuid}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(uuid);
                      showToast("Copied single UUID", "success");
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer ml-4 shrink-0"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <Fingerprint className="text-neutral-300 dark:text-neutral-700 mb-2 animate-pulse" size={36} />
              <span className="text-xs font-semibold text-neutral-400">Click generate to view UUID identifiers</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
