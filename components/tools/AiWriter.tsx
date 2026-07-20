"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, Sparkles, RefreshCw, PenTool } from "lucide-react";

const TYPES = [
  { label: "Professional Email", value: "email" },
  { label: "Blog Post Article", value: "blog" },
  { label: "Social Caption", value: "social" },
  { label: "Hooky Heading / Slogan", value: "headline" },
];

const TONES = [
  { label: "Professional", value: "professional" },
  { label: "Casual", value: "casual" },
  { label: "Creative & Inspired", value: "creative" },
  { label: "Persuasive & Magnetic", value: "persuasive" },
];

export function AiWriter() {
  const { showToast, addToHistory } = useAppState();
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("email");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runWriter = async () => {
    if (!prompt.trim()) {
      showToast("Please write a topic or instruction for writing.", "error");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "write",
          prompt: prompt,
          payload: { type, tone },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOutput(data.text);
        addToHistory("ai-writer", "AI Copywriter", `Created premium draft for "${prompt.slice(0, 30)}..."`);
        showToast("Content generated!", "success");
      } else {
        throw new Error(data.error || "Failed to generate draft content.");
      }
    } catch (err: any) {
      showToast(err.message || "An error occurred.", "error");
      setOutput(`Error: ${err.message || "Could not complete content copywriting."}`);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Copywrite content copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setPrompt("");
    setOutput("");
  };

  const loadSample = () => {
    setPrompt("An invitation email to developers inviting them to sign up for Universal Aura Tools, highlighting glassmorphism styling and offline first utility features.");
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        
        {/* Content Type */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contentTypeSelect" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Content Type</label>
          <select
            id="contentTypeSelect"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tone of Voice */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contentToneSelect" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Tone of Voice</label>
          <select
            id="contentToneSelect"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          >
            {TONES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <button
            onClick={runWriter}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors flex items-center justify-center gap-2 cursor-pointer h-[42px]"
          >
            <Sparkles size={14} className={loading ? "animate-spin" : ""} />
            {loading ? "Generating Draft..." : "Generate Content"}
          </button>
        </div>

      </div>

      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        
        {/* Instructions Input */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Writing Instructions</span>
            <div className="flex items-center gap-3">
              <button
                onClick={loadSample}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer font-semibold"
              >
                Load Sample Prompt
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
            placeholder="Write details of the topic, keywords to include, or structural objectives..."
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none text-sm leading-relaxed min-h-[220px]"
          />
        </div>

        {/* Draft Output */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">AI Draft Copy</span>
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
                <span className="text-xs font-semibold text-neutral-400">Gemini is drafting copy...</span>
              </div>
            ) : output ? (
              <div className="whitespace-pre-wrap font-sans prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
                {output}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <PenTool className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Click &quot;Generate Content&quot; to review AI copywriter output</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
