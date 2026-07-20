"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Delete, CornerDownLeft } from "lucide-react";

export function Calculator() {
  const { showToast, addToHistory } = useAppState();
  const [display, setDisplay] = useState("");
  const [equation, setEquation] = useState("");
  const [copied, setCopied] = useState(false);

  const handleNum = (num: string) => {
    setDisplay((prev) => prev + num);
    setEquation((prev) => prev + num);
  };

  const handleOp = (op: string) => {
    setDisplay("");
    setEquation((prev) => {
      const trimmed = prev.trim();
      const lastChar = trimmed.slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        return trimmed.slice(0, -1) + op;
      }
      return prev + op;
    });
  };

  const clearAll = () => {
    setDisplay("");
    setEquation("");
  };

  const deleteLast = () => {
    setDisplay((prev) => prev.slice(0, -1));
    setEquation((prev) => prev.slice(0, -1));
  };

  const calculateResult = () => {
    if (!equation.trim()) return;
    try {
      // Replace symbols for standard eval execution
      let evalExpr = equation
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/\^/g, "**");

      // Count bracket mismatch
      const openBrackets = (evalExpr.match(/\(/g) || []).length;
      const closeBrackets = (evalExpr.match(/\)/g) || []).length;
      const bracketDiff = openBrackets - closeBrackets;
      if (bracketDiff > 0) {
        evalExpr += ")".repeat(bracketDiff);
      }

      // Safe evaluation of mathematical calculations
      const mathResult = Function(`"use strict"; return (${evalExpr})`)();
      
      if (isNaN(mathResult) || !isFinite(mathResult)) {
        throw new Error("Invalid output");
      }

      const formattedResult = Number(mathResult.toFixed(8)).toString();
      setDisplay(formattedResult);
      setEquation(formattedResult);
      addToHistory("calculator", "Calculator", `Computed equation: ${equation} = ${formattedResult}`);
      showToast("Calculation completed!", "success");
    } catch (err) {
      setDisplay("Error");
      setEquation("");
      showToast("Math calculation error", "error");
    }
  };

  const copyResult = () => {
    if (!display || display === "Error") return;
    navigator.clipboard.writeText(display);
    setCopied(true);
    showToast("Result copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const scientificFunc = (func: string) => {
    setDisplay("");
    setEquation((prev) => prev + func + "(");
  };

  const addConstant = (constant: string) => {
    setDisplay(constant);
    setEquation((prev) => prev + constant);
  };

  return (
    <div className="max-w-md mx-auto flex flex-col gap-5 p-5 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl relative overflow-hidden">
      
      {/* Visual Screen */}
      <div className="p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-950/50 border border-neutral-200/40 dark:border-neutral-800/40 flex flex-col items-end justify-between min-h-[96px] relative group">
        <div className="text-xs font-mono font-medium text-neutral-400 break-all select-none max-w-full truncate">
          {equation || "0"}
        </div>
        <div className="text-2xl font-mono font-bold text-neutral-800 dark:text-neutral-100 select-all max-w-full truncate">
          {display || "0"}
        </div>
        {display && display !== "Error" && (
          <button
            onClick={copyResult}
            className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-opacity cursor-pointer shrink-0"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          </button>
        )}
      </div>

      {/* Button Layout Grid */}
      <div className="grid grid-cols-4 gap-2 text-sm font-semibold font-mono">
        
        {/* Scientific buttons row 1 */}
        <button onClick={() => scientificFunc("sin")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer text-xs">sin</button>
        <button onClick={() => scientificFunc("cos")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer text-xs">cos</button>
        <button onClick={() => scientificFunc("tan")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer text-xs">tan</button>
        <button onClick={clearAll} className="py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold cursor-pointer">AC</button>

        {/* Scientific row 2 */}
        <button onClick={() => scientificFunc("log")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer text-xs">log</button>
        <button onClick={() => scientificFunc("ln")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer text-xs">ln</button>
        <button onClick={() => handleOp("^")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer text-xs">xʸ</button>
        <button onClick={deleteLast} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 flex items-center justify-center cursor-pointer"><Delete size={14} /></button>

        {/* Math row 3 */}
        <button onClick={() => addConstant("π")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer">π</button>
        <button onClick={() => addConstant("e")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer">e</button>
        <button onClick={() => handleNum("(")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer">(</button>
        <button onClick={() => handleNum(")")} className="py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 cursor-pointer">)</button>

        {/* Row 4 (Digits & Operations) */}
        <button onClick={() => handleNum("7")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">7</button>
        <button onClick={() => handleNum("8")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">8</button>
        <button onClick={() => handleNum("9")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">9</button>
        <button onClick={() => handleOp("/")} className="py-3.5 rounded-xl bg-violet-600/10 hover:bg-violet-600/25 text-violet-600 dark:text-violet-400 font-bold cursor-pointer">÷</button>

        {/* Row 5 */}
        <button onClick={() => handleNum("4")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">4</button>
        <button onClick={() => handleNum("5")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">5</button>
        <button onClick={() => handleNum("6")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">6</button>
        <button onClick={() => handleOp("*")} className="py-3.5 rounded-xl bg-violet-600/10 hover:bg-violet-600/25 text-violet-600 dark:text-violet-400 font-bold cursor-pointer">×</button>

        {/* Row 6 */}
        <button onClick={() => handleNum("1")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">1</button>
        <button onClick={() => handleNum("2")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">2</button>
        <button onClick={() => handleNum("3")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">3</button>
        <button onClick={() => handleOp("-")} className="py-3.5 rounded-xl bg-violet-600/10 hover:bg-violet-600/25 text-violet-600 dark:text-violet-400 font-bold cursor-pointer">−</button>

        {/* Row 7 */}
        <button onClick={() => handleNum("0")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">0</button>
        <button onClick={() => handleNum(".")} className="py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-150 border border-neutral-100 dark:border-neutral-800/40 cursor-pointer">.</button>
        <button onClick={calculateResult} className="col-span-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-violet-500/15">
          <CornerDownLeft size={14} />
          <span>=</span>
        </button>

      </div>

    </div>
  );
}
