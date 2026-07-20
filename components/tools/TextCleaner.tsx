"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Brush, ArrowDownAz, Trash2 } from "lucide-react";

export function TextCleaner() {
  const { showToast, addToHistory } = useAppState();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const getLines = () => input.split("\n");

  const removeDuplicates = () => {
    if (!input.trim()) return;
    const lines = getLines();
    const cleaned = [...new Set(lines)];
    setOutput(cleaned.join("\n"));
    addToHistory("text-cleaner", "Line Organizer", "Removed duplicate lines");
    showToast("Removed duplicate lines!", "success");
  };

  const sortLinesAsc = () => {
    if (!input.trim()) return;
    const lines = getLines();
    const sorted = [...lines].sort((a, b) => a.localeCompare(b));
    setOutput(sorted.join("\n"));
    addToHistory("text-cleaner", "Line Organizer", "Sorted lines ascendingly");
    showToast("Sorted lines A to Z!", "success");
  };

  const sortLinesDesc = () => {
    if (!input.trim()) return;
    const lines = getLines();
    const sorted = [...lines].sort((a, b) => b.localeCompare(a));
    setOutput(sorted.join("\n"));
    addToHistory("text-cleaner", "Line Organizer", "Sorted lines descendingly");
    showToast("Sorted lines Z to A!", "success");
  };

  const removeBlankLines = () => {
    if (!input.trim()) return;
    const lines = getLines();
    const nonBlank = lines.filter((line) => line.trim().length > 0);
    setOutput(nonBlank.join("\n"));
    addToHistory("text-cleaner", "Line Organizer", "Removed empty blank lines");
    showToast("Removed empty lines!", "success");
  };

  const stripSpaces = () => {
    if (!input.trim()) return;
    const lines = getLines();
    const trimmed = lines.map((line) => line.trim());
    setOutput(trimmed.join("\n"));
    addToHistory("text-cleaner", "Line Organizer", "Trimmed lines leading/trailing spaces");
    showToast("Trimmed line white spaces!", "success");
  };

  const reverseLines = () => {
    if (!input.trim()) return;
    const lines = getLines();
    const reversed = [...lines].reverse();
    setOutput(reversed.join("\n"));
    addToHistory("text-cleaner", "Line Organizer", "Reversed lines layout sequence");
    showToast("Reversed lines list!", "success");
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Output copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    setInput(`apple
banana
apple
  orange  
cherry

banana`);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Controls panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
        <button
          onClick={loadSample}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition-all cursor-pointer"
        >
          Load Sample list
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-red-500/10 text-xs font-semibold text-neutral-500 hover:text-red-500 transition-all flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        {/* Input area */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Unfiltered list</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw line rows here (e.g. lists, keyword records, duplicate values)..."
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed min-h-[250px]"
          />
        </div>

        {/* Output area */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Organized output</span>
            {output && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>
          <div className="w-full flex-1 p-4 overflow-auto min-h-[250px] bg-neutral-50/30 dark:bg-neutral-950/20 font-mono text-sm leading-relaxed relative">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Brush className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Click actions below to filter and sort lines</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Organizer Controls deck */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <button
          onClick={removeDuplicates}
          className="px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Trash2 size={13} className="text-violet-500" />
          No Duplicates
        </button>
        <button
          onClick={sortLinesAsc}
          className="px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <ArrowDownAz size={13} className="text-indigo-500" />
          Sort (A-Z)
        </button>
        <button
          onClick={sortLinesDesc}
          className="px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <ArrowDownAz size={13} className="text-cyan-500" />
          Sort (Z-A)
        </button>
        <button
          onClick={removeBlankLines}
          className="px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Brush size={13} className="text-emerald-500" />
          Strip Blank lines
        </button>
        <button
          onClick={stripSpaces}
          className="px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Brush size={13} className="text-amber-500" />
          Trim Spaces
        </button>
        <button
          onClick={reverseLines}
          className="px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <RefreshCw size={13} className="text-rose-500" />
          Reverse list
        </button>
      </div>

    </div>
  );
}
