"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Type, ArrowDownUp } from "lucide-react";

export function CaseConverter() {
  const { showToast, addToHistory } = useAppState();
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const convertUpper = () => {
    if (!text) return;
    setText(text.toUpperCase());
    addToHistory("case-converter", "Case Converter", "Converted text to UPPERCASE");
    showToast("Converted to UPPERCASE!", "success");
  };

  const convertLower = () => {
    if (!text) return;
    setText(text.toLowerCase());
    addToHistory("case-converter", "Case Converter", "Converted text to lowercase");
    showToast("Converted to lowercase!", "success");
  };

  const convertTitle = () => {
    if (!text) return;
    const titleCased = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(titleCased);
    addToHistory("case-converter", "Case Converter", "Converted text to Title Case");
    showToast("Converted to Title Case!", "success");
  };

  const convertSentence = () => {
    if (!text) return;
    const sentenceCased = text
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-z])/g, (m) => m.toUpperCase());
    setText(sentenceCased);
    addToHistory("case-converter", "Case Converter", "Converted text to Sentence Case");
    showToast("Converted to Sentence case!", "success");
  };

  const convertCamel = () => {
    if (!text) return;
    const camelCased = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "");
    setText(camelCased);
    addToHistory("case-converter", "Case Converter", "Converted text to camelCase");
    showToast("Converted to camelCase!", "success");
  };

  const convertSlug = () => {
    if (!text) return;
    const slugCased = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setText(slugCased);
    addToHistory("case-converter", "Case Converter", "Converted text to slug-case");
    showToast("Converted to slug-case!", "success");
  };

  const reverseText = () => {
    if (!text) return;
    setText(text.split("").reverse().join(""));
    addToHistory("case-converter", "Case Converter", "Reversed text sequence");
    showToast("Text reversed!", "success");
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Output copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText("");
  };

  const loadSample = () => {
    setText("UNIVERSAL AURA TOOLS. beautiful premium offline first developer and utility suite.");
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Workspace card */}
      <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Workspace Editor</span>
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
          placeholder="Type or paste your text here to convert casing options instantly..."
          className="w-full min-h-[220px] p-4 bg-transparent border-none outline-none resize-none text-sm leading-relaxed"
        />
      </div>

      {/* Buttons Deck (Convertors grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={convertUpper}
          className="px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Type size={14} className="uppercase" />
          UPPERCASE
        </button>
        <button
          onClick={convertLower}
          className="px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Type size={14} className="lowercase" />
          lowercase
        </button>
        <button
          onClick={convertTitle}
          className="px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Type size={14} />
          Title Case
        </button>
        <button
          onClick={convertSentence}
          className="px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Type size={14} />
          Sentence case
        </button>
        <button
          onClick={convertCamel}
          className="px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Type size={14} className="italic" />
          camelCase
        </button>
        <button
          onClick={convertSlug}
          className="px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Type size={14} />
          slug-case
        </button>
        <button
          onClick={reverseText}
          className="px-4 py-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowDownUp size={14} />
          Reverse String
        </button>
      </div>

    </div>
  );
}
