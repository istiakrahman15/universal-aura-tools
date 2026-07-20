"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, Sparkles, RefreshCw, Languages } from "lucide-react";

const LANGUAGES = [
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Japanese", code: "ja" },
  { name: "Hindi", code: "hi" },
  { name: "Arabic", code: "ar" },
  { name: "Bengali", code: "bn" },
  { name: "Portuguese", code: "pt" },
  { name: "Italian", code: "it" },
  { name: "Chinese (Simplified)", code: "zh-cn" },
];

export function AiTranslator() {
  const { showToast, addToHistory } = useAppState();
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runTranslation = async () => {
    if (!text.trim()) {
      showToast("Please enter some text to translate.", "error");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "translate",
          prompt: text,
          payload: { targetLang },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOutput(data.text);
        addToHistory("ai-translator", "AI Translator", `Translated source text into ${targetLang}`);
        showToast(`Translated to ${targetLang}!`, "success");
      } else {
        throw new Error(data.error || "Failed to translate text.");
      }
    } catch (err: any) {
      showToast(err.message || "An error occurred.", "error");
      setOutput(`Error: ${err.message || "Could not complete translation."}`);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Translation copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText("");
    setOutput("");
  };

  const loadSample = () => {
    setText("Hello, welcome to Universal Aura Tools! This is a state-of-the-art developer suite designed to make your daily coding workflow smooth, elegant, and efficient.");
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Config row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        
        {/* Target language selector */}
        <div className="flex flex-col gap-2">
          <label htmlFor="targetLanguageSelect" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Target Language</label>
          <select
            id="targetLanguageSelect"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <button
            onClick={runTranslation}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors flex items-center justify-center gap-2 cursor-pointer h-[42px]"
          >
            <Sparkles size={14} className={loading ? "animate-spin" : ""} />
            {loading ? "Translating Content..." : "Translate Text"}
          </button>
        </div>

      </div>

      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[320px]">
        
        {/* Source Box */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">English Source</span>
            <div className="flex items-center gap-3">
              <button
                onClick={loadSample}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer font-semibold"
              >
                Load Sample Text
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste any text or paragraphs in English to translate..."
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none text-sm leading-relaxed min-h-[220px]"
          />
        </div>

        {/* Translation Box */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">{targetLang} Translation</span>
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
          <div className="w-full flex-1 p-4 overflow-auto min-h-[220px] bg-neutral-50/30 dark:bg-neutral-950/20 text-sm leading-relaxed relative font-medium text-neutral-800 dark:text-neutral-200">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Sparkles className="text-violet-500 animate-spin mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Gemini is translating content...</span>
              </div>
            ) : output ? (
              <div className="whitespace-pre-wrap font-sans text-neutral-800 dark:text-neutral-200">
                {output}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Languages className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Click &quot;Translate Text&quot; to review AI translation output</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
