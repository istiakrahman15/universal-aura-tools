/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, Percent, RefreshCw } from "lucide-react";

export function PercentageCalculator() {
  const { showToast, addToHistory } = useAppState();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sub-calc 1: What is X% of Y?
  const [x1, setX1] = useState("15");
  const [y1, setY1] = useState("200");
  const [res1, setRes1] = useState("");

  // Sub-calc 2: X is what percent of Y?
  const [x2, setX2] = useState("30");
  const [y2, setY2] = useState("150");
  const [res2, setRes2] = useState("");

  // Sub-calc 3: Percent increase/decrease from X to Y
  const [x3, setX3] = useState("50");
  const [y3, setY3] = useState("80");
  const [res3, setRes3] = useState("");

  // Trigger Calculations
  useEffect(() => {
    const valX1 = Number(x1);
    const valY1 = Number(y1);
    if (!isNaN(valX1) && !isNaN(valY1) && valY1 !== 0) {
      setRes1(Number(((valX1 / 100) * valY1).toFixed(4)).toString());
    } else {
      setRes1("");
    }
  }, [x1, y1]);

  useEffect(() => {
    const valX2 = Number(x2);
    const valY2 = Number(y2);
    if (!isNaN(valX2) && !isNaN(valY2) && valY2 !== 0) {
      setRes2(Number(((valX2 / valY2) * 100).toFixed(4)).toString() + "%");
    } else {
      setRes2("");
    }
  }, [x2, y2]);

  useEffect(() => {
    const valX3 = Number(x3);
    const valY3 = Number(y3);
    if (!isNaN(valX3) && !isNaN(valY3) && valX3 !== 0) {
      const diff = valY3 - valX3;
      const pct = (diff / valX3) * 100;
      const type = pct >= 0 ? "increase" : "decrease";
      setRes3(`${Math.abs(pct).toFixed(2)}% ${type}`);
    } else {
      setRes3("");
    }
  }, [x3, y3]);

  const copyToClipboard = (key: string, value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    addToHistory("percentage-calculator", "Percentage Calculator", `Computed ratio: ${value}`);
    showToast("Result copied to clipboard!", "success");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const clearAll = () => {
    setX1(""); setY1(""); setRes1("");
    setX2(""); setY2(""); setRes2("");
    setX3(""); setY3(""); setRes3("");
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Reset control */}
      <div className="flex justify-end">
        <button
          onClick={clearAll}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-red-500/10 text-xs font-semibold text-neutral-500 hover:text-red-500 transition-all flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={12} />
          Reset All
        </button>
      </div>

      {/* Grid of calculators */}
      <div className="flex flex-col gap-6">
        
        {/* Calc 1: What is X% of Y? */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0 w-full md:w-36">Value Finder</span>
          <div className="flex flex-wrap items-center gap-2.5 w-full">
            <span className="text-sm font-medium">What is</span>
            <input
              aria-label="Percentage value"
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              className="w-20 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold outline-none text-center"
            />
            <span className="text-sm font-medium">% of</span>
            <input
              aria-label="Base value"
              type="number"
              value={y1}
              onChange={(e) => setY1(e.target.value)}
              className="w-28 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold outline-none text-center"
            />
            <span className="text-sm font-medium">?</span>
            
            {/* Outcome */}
            <div className="ml-auto flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-600/10 px-3 py-1.5 rounded-xl border border-violet-500/10 min-w-[80px] text-center">
                {res1 || "—"}
              </span>
              {res1 && (
                <button
                  onClick={() => copyToClipboard("res1", res1)}
                  className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  {copiedKey === "res1" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Calc 2: X is what percent of Y? */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0 w-full md:w-36">Ratio Finder</span>
          <div className="flex flex-wrap items-center gap-2.5 w-full">
            <input
              aria-label="First value"
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold outline-none text-center"
            />
            <span className="text-sm font-medium">is what percent of</span>
            <input
              aria-label="Second value"
              type="number"
              value={y2}
              onChange={(e) => setY2(e.target.value)}
              className="w-28 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold outline-none text-center"
            />
            <span className="text-sm font-medium">?</span>
            
            {/* Outcome */}
            <div className="ml-auto flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-600/10 px-3 py-1.5 rounded-xl border border-indigo-500/10 min-w-[80px] text-center">
                {res2 || "—"}
              </span>
              {res2 && (
                <button
                  onClick={() => copyToClipboard("res2", res2)}
                  className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  {copiedKey === "res2" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Calc 3: Percentage increase / decrease */}
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0 w-full md:w-36">Gains / Losses</span>
          <div className="flex flex-wrap items-center gap-2.5 w-full">
            <span className="text-sm font-medium">From value</span>
            <input
              aria-label="Initial value"
              type="number"
              value={x3}
              onChange={(e) => setX3(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold outline-none text-center"
            />
            <span className="text-sm font-medium">to value</span>
            <input
              aria-label="Final value"
              type="number"
              value={y3}
              onChange={(e) => setY3(e.target.value)}
              className="w-28 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold outline-none text-center"
            />
            
            {/* Outcome */}
            <div className="ml-auto flex items-center gap-3">
              <span className={`font-mono text-sm font-bold px-3 py-1.5 rounded-xl border min-w-[80px] text-center ${
                res3.includes("increase")
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-600/10 border-emerald-500/10"
                  : res3.includes("decrease")
                  ? "text-red-600 dark:text-red-400 bg-red-600/10 border-red-500/10"
                  : "text-neutral-500 bg-neutral-100 dark:bg-neutral-850"
              }`}>
                {res3 || "—"}
              </span>
              {res3 && (
                <button
                  onClick={() => copyToClipboard("res3", res3)}
                  className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  {copiedKey === "res3" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
