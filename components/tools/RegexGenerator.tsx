"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, Sparkles, RefreshCw, Hash } from "lucide-react";

export function RegexGenerator() {
  const { showToast, addToHistory } = useAppState();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runRegex = async () => {
    if (!prompt.trim()) {
      showToast("Please write a pattern requirement first.", "error");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "regex",
          prompt: prompt,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOutput(data.text);
        addToHistory("regex-generator", "Regex Generator", `Generated regex: "${prompt.slice(0, 30)}..."`);
        showToast("Regular expression formulated!", "success");
      } else {
        throw new Error(data.error || "Failed to formulate pattern.");
      }
    } catch (err: any) {
      showToast(err.message || "An error occurred.", "error");
      setOutput(`Error: ${err.message || "Could not complete regex formulation."}`);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Regex output copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setPrompt("");
    setOutput("");
  };

  const loadSample = () => {
    setPrompt("Matches a valid international telephone number with optional country code (+X), and optional hyphens or spaces.");
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        
        {/* Instructions Input */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Pattern Requirement Description</span>
            <div className="flex items-center gap-3">
              <button
                onClick={loadSample}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer font-semibold"
              >
                Load Sample Pattern
              </button>
              <button
                onClick={clearAll}
                className="text-xs text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
              >
                <RefreshCw size={12} />
                Reset
              </button>
            </div>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what pattern you want to match in detail (e.g. Email address validator, positive float numbers, or custom CSV rows)..."
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none text-sm leading-relaxed min-h-[180px]"
          />
          <div className="p-3 bg-neutral-50/30 dark:bg-neutral-900/30 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-end">
            <button
              onClick={runRegex}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={13} className={loading ? "animate-spin" : ""} />
              {loading ? "Formulating Pattern..." : "Formulate Regex Pattern"}
            </button>
          </div>
        </div>

        {/* Breakdown Output */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">AI Pattern Breakdown</span>
            {output && !output.startsWith("Error:") && (
              <button
                onClick={copyResult}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>
          <div className="w-full flex-1 p-4 overflow-auto min-h-[220px] bg-neutral-50/30 dark:bg-neutral-950/20 text-sm leading-relaxed relative text-neutral-800 dark:text-neutral-200">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Sparkles className="text-violet-500 animate-spin mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Gemini is formulating regular expression...</span>
              </div>
            ) : output ? (
              <div className="whitespace-pre-wrap font-sans prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
                {output}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Hash className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Describe pattern and click generate to formulate regex</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
