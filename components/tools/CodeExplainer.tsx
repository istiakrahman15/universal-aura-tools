"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, Sparkles, RefreshCw, Terminal } from "lucide-react";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Rust",
  "Go",
  "C++",
  "Java",
  "HTML & CSS",
];

export function CodeExplainer() {
  const { showToast, addToHistory } = useAppState();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runExplain = async () => {
    if (!code.trim()) {
      showToast("Please enter a code snippet.", "error");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "code-explain",
          prompt: code,
          payload: { language },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOutput(data.text);
        addToHistory("code-explainer", "Code Explainer", `Explained ${language} code snippet`);
        showToast("Explanation compiled!", "success");
      } else {
        throw new Error(data.error || "Failed to explain code snippet.");
      }
    } catch (err: any) {
      showToast(err.message || "An error occurred.", "error");
      setOutput(`Error: ${err.message || "Could not complete explanation."}`);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Explanation copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setCode("");
    setOutput("");
  };

  const loadSample = () => {
    setCode(`// Find Fibonacci Sequence with Memoization
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        
        {/* Language Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="codeLanguageSelect" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Programming Language</label>
          <select
            id="codeLanguageSelect"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <button
            onClick={runExplain}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors flex items-center justify-center gap-2 cursor-pointer h-[42px]"
          >
            <Sparkles size={14} className={loading ? "animate-spin" : ""} />
            {loading ? "Analyzing Code..." : "Explain Code Block"}
          </button>
        </div>

      </div>

      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        
        {/* Code Input */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Source Code Snippet</span>
            <div className="flex items-center gap-3">
              <button
                onClick={loadSample}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer font-semibold"
              >
                Load Sample Snippet
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
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your function, class, or script lines to analyze..."
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none font-mono text-xs leading-relaxed min-h-[220px]"
          />
        </div>

        {/* Breakdown Output */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">AI Code Breakdown</span>
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
                <span className="text-xs font-semibold text-neutral-400">Gemini is analyzing structure and variables...</span>
              </div>
            ) : output ? (
              <div className="whitespace-pre-wrap font-sans prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
                {output}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Terminal className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Click &quot;Explain Code Block&quot; to review AI coding mentor output</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
