"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Columns2, AlertTriangle, Play } from "lucide-react";

interface DiffLine {
  text: string;
  type: "added" | "removed" | "equal";
}

export function TextCompare() {
  const { showToast, addToHistory } = useAppState();
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  const compareText = () => {
    const linesA = textA.split("\n");
    const linesB = textB.split("\n");
    const result: DiffLine[] = [];

    const maxLines = Math.max(linesA.length, linesB.length);

    for (let i = 0; i < maxLines; i++) {
      const lineA = linesA[i];
      const lineB = linesB[i];

      if (lineA === undefined) {
        result.push({ text: lineB, type: "added" });
      } else if (lineB === undefined) {
        result.push({ text: lineA, type: "removed" });
      } else if (lineA === lineB) {
        result.push({ text: lineA, type: "equal" });
      } else {
        result.push({ text: `- ${lineA}`, type: "removed" });
        result.push({ text: `+ ${lineB}`, type: "added" });
      }
    }

    setDiff(result);
    addToHistory("text-compare", "Diff Checker", "Compared two document versions");
    showToast("Texts compared successfully!", "success");
  };

  const loadSample = () => {
    setTextA(`// Old config
const settings = {
  theme: 'dark',
  sidebar: true,
  debug: false
};`);
    setTextB(`// New config
const settings = {
  theme: 'dark',
  sidebar: false,
  debug: true,
  logs: 'verbose'
};`);
    setDiff(null);
  };

  const clearAll = () => {
    setTextA("");
    setTextB("");
    setDiff(null);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
        <button
          onClick={loadSample}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition-all cursor-pointer"
        >
          Load Demo Diff
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-red-500/10 text-xs font-semibold text-neutral-500 hover:text-red-500 transition-all flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Side-by-side Input boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Text A */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Original Document (Left)</span>
          </div>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Paste your original text segment here..."
            className="w-full h-44 p-4 bg-transparent border-none outline-none resize-none font-mono text-xs leading-relaxed"
          />
        </div>

        {/* Text B */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Modified Document (Right)</span>
          </div>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="Paste your edited text segment here..."
            className="w-full h-44 p-4 bg-transparent border-none outline-none resize-none font-mono text-xs leading-relaxed"
          />
        </div>

      </div>

      {/* Action button */}
      <div className="flex justify-center">
        <button
          onClick={compareText}
          className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-500/10 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Play size={13} />
          Analyze Differences
        </button>
      </div>

      {/* Diff Result View */}
      {diff && (
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Columns2 size={14} />
              Difference Line Breakdown
            </span>
          </div>
          <div className="p-4 overflow-auto font-mono text-xs leading-relaxed min-h-[160px] bg-neutral-50/40 dark:bg-neutral-950/20 max-h-[450px]">
            {diff.map((line, index) => (
              <div
                key={index}
                className={`py-0.5 px-2 rounded-md ${
                  line.type === "added"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                    : line.type === "removed"
                    ? "bg-red-500/10 text-red-600 dark:text-red-400 font-semibold line-through"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {line.text || " "}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
