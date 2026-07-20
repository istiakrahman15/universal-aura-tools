"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Braces, Minimize2, AlertTriangle, Sparkles } from "lucide-react";

export function JsonFormatter() {
  const { showToast, addToHistory } = useAppState();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tabSize, setTabSize] = useState(2);

  const formatJson = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to format.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, tabSize);
      setOutput(formatted);
      setError(null);
      addToHistory("json-formatter", "JSON Formatter", "Formatted raw JSON input");
      showToast("JSON formatted successfully!", "success");
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax.");
      showToast("Invalid JSON syntax", "error");
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to minify.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
      addToHistory("json-formatter", "JSON Formatter", "Minified raw JSON input");
      showToast("JSON minified successfully!", "success");
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax.");
      showToast("Invalid JSON syntax", "error");
    }
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
    setError(null);
  };

  const loadSample = () => {
    const sample = {
      name: "Universal Aura Tools",
      version: 3.0,
      active: true,
      features: ["JSON Formatter", "AI Summarizer", "UUID Generator", "Cryptographic Hashes"],
      developer: {
        name: "Istiak Rahman",
        github: "https://github.com/istiakrahman15"
      },
      stats: {
        rating: 4.9,
        categoryCount: 5,
        totalTools: 18
      }
    };
    setInput(JSON.stringify(sample, null, 2));
    setError(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
        <div className="flex items-center gap-3">
          <label htmlFor="tabSizeSelect" className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Tab Spacing:
          </label>
          <select
            id="tabSizeSelect"
            value={tabSize}
            onChange={(e) => setTabSize(Number(e.target.value))}
            className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value={8}>8 Spaces</option>
          </select>
          <button
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition-all cursor-pointer"
          >
            Load Sample
          </button>
        </div>
        <button
          onClick={clearAll}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-red-500/10 text-xs font-semibold text-neutral-500 hover:text-red-500 transition-all flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
        
        {/* Input Card */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Raw Input JSON</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your raw, unformatted JSON here... e.g. {"name":"Aura","active":true}'
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed min-h-[300px]"
          />
          <div className="p-3 bg-neutral-50/30 dark:bg-neutral-900/30 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center gap-2">
            <button
              onClick={formatJson}
              className="flex-1 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Braces size={13} />
              Format & Validate
            </button>
            <button
              onClick={minifyJson}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Minimize2 size={13} />
              Minify
            </button>
          </div>
        </div>

        {/* Output Card */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Formatted Output</span>
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
          <div className="w-full flex-1 p-4 overflow-auto min-h-[300px] bg-neutral-50/30 dark:bg-neutral-950/20 font-mono text-sm leading-relaxed relative">
            {error ? (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 text-xs flex gap-3 leading-relaxed">
                <AlertTriangle size={18} className="shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold">JSON Syntax Error</span>
                  <p className="font-mono break-all">{error}</p>
                </div>
              </div>
            ) : output ? (
              <pre className="whitespace-pre">{output}</pre>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Braces className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Waiting for Formatted Output</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
