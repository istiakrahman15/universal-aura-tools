"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, FileText, Clock, AlignLeft } from "lucide-react";

export function WordCounter() {
  const { showToast, addToHistory } = useAppState();
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, "").length;
  
  // Clean word splits
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  // Sentences and paragraphs
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

  // Times
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute average
  const speakingTime = Math.ceil(wordCount / 130); // 130 words per minute average speaking

  // Extra stats
  const averageWordLength = wordCount > 0 ? (charNoSpaces / wordCount).toFixed(1) : "0";

  const loadSample = () => {
    setText(`Universal Aura Tools is a state-of-the-art suite of useful utilities.
Built with Next.js, React, Tailwind CSS, and Framer Motion, it offers a premium, sleek user interface comparable to major modern platforms like Vercel, Linear, and Stripe.

With zero backend dependencies for core modules and powered by the latest Gemini models for AI workflows, Aura is highly scalable and blazingly fast. Made with absolute care by Istiak Rahman.`);
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Text copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText("");
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Counters display row (Stats block) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Words stat */}
        <div className="p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Words</span>
          <span className="font-mono text-2xl font-bold text-violet-600 dark:text-violet-400">{wordCount}</span>
        </div>

        {/* Characters stat */}
        <div className="p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Characters</span>
          <span className="font-mono text-2xl font-bold text-indigo-600 dark:text-indigo-400">{charCount}</span>
        </div>

        {/* Sentences stat */}
        <div className="p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Sentences</span>
          <span className="font-mono text-2xl font-bold text-cyan-600 dark:text-cyan-400">{sentences}</span>
        </div>

        {/* Paragraphs stat */}
        <div className="p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Paragraphs</span>
          <span className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">{paragraphs}</span>
        </div>

      </div>

      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Editor (2 columns on desktop) */}
        <div className="lg:col-span-2 flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Input Content</span>
            <div className="flex items-center gap-3">
              <button
                onClick={loadSample}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer font-semibold"
              >
                Load Sample Text
              </button>
              <button
                onClick={copyText}
                className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>Copy</span>
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
            placeholder="Type or paste your document text here to count characters, words, sentences, and compute reading estimations..."
            className="w-full min-h-[250px] flex-1 p-4 bg-transparent border-none outline-none resize-none text-sm leading-relaxed"
          />
        </div>

        {/* Detailed Times & Stats Card (1 column on desktop) */}
        <div className="flex flex-col gap-6">
          
          {/* Read/Speak estimations */}
          <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Clock size={14} />
              Estimated Timings
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/40 dark:border-neutral-800/40">
                <span className="text-xs font-semibold text-neutral-500">Average Reading Time</span>
                <span className="font-mono text-sm font-bold text-violet-600 dark:text-violet-400">
                  ~ {readingTime} {readingTime === 1 ? "min" : "mins"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/40 dark:border-neutral-800/40">
                <span className="text-xs font-semibold text-neutral-500">Average Speaking Time</span>
                <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  ~ {speakingTime} {speakingTime === 1 ? "min" : "mins"}
                </span>
              </div>
            </div>
          </div>

          {/* Density indicators */}
          <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <AlignLeft size={14} />
              Formatting Insights
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800/50 pb-2">
                <span>Characters (no spaces)</span>
                <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">{charNoSpaces}</span>
              </li>
              <li className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800/50 pb-2">
                <span>Average Word Length</span>
                <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">{averageWordLength} chars</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Density Spaces Percentage</span>
                <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">
                  {charCount > 0 ? ((charCount - charNoSpaces) / charCount * 100).toFixed(1) : "0"}%
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
