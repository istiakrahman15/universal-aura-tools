"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, Sparkles, RefreshCw, AlertTriangle, FileText, LayoutList } from "lucide-react";

export function AiSummarizer() {
  const { showToast, addToHistory } = useAppState();
  const [text, setText] = useState("");
  const [length, setLength] = useState("medium");
  const [format, setFormat] = useState("paragraph");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runSummary = async () => {
    if (!text.trim()) {
      showToast("Please enter some text to summarize.", "error");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "summarize",
          prompt: text,
          payload: { length, format },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOutput(data.text);
        addToHistory("ai-summarizer", "AI Summarizer", "Summarized source document");
        showToast("Summary generated successfully!", "success");
      } else {
        throw new Error(data.error || "Failed to generate summary.");
      }
    } catch (err: any) {
      showToast(err.message || "An error occurred.", "error");
      setOutput(`Error: ${err.message || "Could not generate summary."}`);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast("Summary copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setText(`Artificial Intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence of humans and other animals. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.

The term "artificial intelligence" had previously been used to describe machines that mimic and display human cognitive skills that are associated with the human mind, such as "learning" and "problem-solving". This definition has since been rejected by major AI researchers who now describe AI in terms of rationality and acting rationally, which does not limit how intelligence can be spelled out.

AI applications include advanced web search engines, recommendation systems (used by YouTube, Amazon, and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Waymo), generative or creative tools (ChatGPT, Midjourney, and Gemini), and competing at the highest level in strategic games (such as chess and Go).`);
  };

  const clearAll = () => {
    setText("");
    setOutput("");
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        
        {/* Length setting */}
        <div className="flex flex-col gap-2">
          <label htmlFor="summaryLengthSelect" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Summary Length</label>
          <select
            id="summaryLengthSelect"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          >
            <option value="short">Short (1-2 sentences)</option>
            <option value="medium">Medium (1-2 paragraphs)</option>
            <option value="long">Long (Detailed breakdown)</option>
          </select>
        </div>

        {/* Format setting */}
        <div className="flex flex-col gap-2">
          <label htmlFor="summaryFormatSelect" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Output Layout</label>
          <select
            id="summaryFormatSelect"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          >
            <option value="paragraph">Flowing Paragraphs</option>
            <option value="bullets">Key Bullet Points</option>
          </select>
        </div>

        {/* Action button */}
        <div className="flex items-end">
          <button
            onClick={runSummary}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold text-xs shadow-md shadow-violet-500/10 transition-colors flex items-center justify-center gap-2 cursor-pointer h-[42px]"
          >
            <Sparkles size={14} className={loading ? "animate-spin" : ""} />
            {loading ? "Generating Summary..." : "Summarize Article"}
          </button>
        </div>

      </div>

      {/* Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        
        {/* Source Text Input */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Source Document</span>
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
            placeholder="Paste your long-form article, research paragraphs, or custom transcript here..."
            className="w-full flex-1 p-4 bg-transparent border-none outline-none resize-none text-sm leading-relaxed min-h-[250px]"
          />
        </div>

        {/* Output Area */}
        <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">AI Summary Output</span>
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
          <div className="w-full flex-1 p-4 overflow-auto min-h-[250px] bg-neutral-50/30 dark:bg-neutral-950/20 text-sm leading-relaxed relative font-medium text-neutral-800 dark:text-neutral-200">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Sparkles className="text-violet-500 animate-spin mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Gemini is processing and generating summary...</span>
              </div>
            ) : output ? (
              <div className="whitespace-pre-wrap font-sans prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
                {output}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <FileText className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
                <span className="text-xs font-semibold text-neutral-400">Click &quot;Summarize Article&quot; to review AI generated summary</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
