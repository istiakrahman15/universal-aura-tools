"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Binary, ArrowRightLeft } from "lucide-react";

export function Base64() {
  const { showToast, addToHistory } = useAppState();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const encode = () => {
    if (!input.trim()) {
      setError("Please enter some text to encode.");
      return;
    }
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError(null);
      addToHistory("base64", "Base64 Encoder", "Encoded raw string to Base64");
      showToast("Encoded to Base64!", "success");
    } catch (err: any) {
      setError("Encoding failed: " + err.message);
    }
  };

  const decode = () => {
    if (!input.trim()) {
      setError("Please enter a valid Base64 string to decode.");
      return;
    }
    try {
      const decoded = decodeURIComponent(escape(atob(input.trim())));
      setOutput(decoded);
      setError(null);
      addToHistory("base64", "Base64 Decoder", "Decoded Base64 to raw string");
      showToast("Decoded Base64 successfully!", "success");
    } catch (err: any) {
      setError("Invalid Base64 string. Please check the format.");
      showToast("Decoding failed", "error");
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

  return (
    <div className="flex flex-col gap-6">
      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setInput("Hello, Universal Aura Tools! Elegant SaaS utility suite.")}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition-all cursor-pointer"
          >
            Load Sample Text
          </button>
          <button
            onClick={() => setInput("SGVsbG8sIFVuaXZlcnNhbCBBdXJhIFRvb2xzISBFbGVnYW50IFNhYVMgdXRpbGl0eSBzdWl0ZS4=")}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition-all cursor-pointer"
          >
            Load Sample Base64
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

      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        {/* Input Card */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Source String</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter raw text to encode OR base64 content to decode here..."
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed min-h-[250px]"
          />
          <div className="p-3 bg-neutral-50/30 dark:bg-neutral-900/30 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center gap-2">
            <button
              onClick={encode}
              className="flex-1 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Binary size={13} />
              Encode Text
            </button>
            <button
              onClick={decode}
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowRightLeft size={13} />
              Decode Base64
            </button>
          </div>
        </div>

        {/* Output Card */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Converted Output</span>
            {output && !error && (
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
            {error ? (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 text-xs">
                <span className="font-bold">Base64 Error:</span>
                <p className="mt-1">{error}</p>
              </div>
            ) : output ? (
              <p className="break-all whitespace-pre-wrap">{output}</p>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Binary className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Waiting for conversion output</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
