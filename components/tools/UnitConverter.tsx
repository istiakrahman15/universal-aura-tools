/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Scale, ArrowRightLeft } from "lucide-react";

type UnitType = "length" | "weight" | "area" | "temp" | "speed";

interface Unit {
  name: string;
  symbol: string;
  ratio: number; // reference unit ratio
}

const UNITS: { [key in UnitType]: Unit[] } = {
  length: [
    { name: "Meters", symbol: "m", ratio: 1 },
    { name: "Kilometers", symbol: "km", ratio: 1000 },
    { name: "Centimeters", symbol: "cm", ratio: 0.01 },
    { name: "Millimeters", symbol: "mm", ratio: 0.001 },
    { name: "Miles", symbol: "mi", ratio: 1609.344 },
    { name: "Yards", symbol: "yd", ratio: 0.9144 },
    { name: "Feet", symbol: "ft", ratio: 0.3048 },
    { name: "Inches", symbol: "in", ratio: 0.0254 },
  ],
  weight: [
    { name: "Kilograms", symbol: "kg", ratio: 1 },
    { name: "Grams", symbol: "g", ratio: 0.001 },
    { name: "Milligrams", symbol: "mg", ratio: 0.000001 },
    { name: "Pounds", symbol: "lb", ratio: 0.45359237 },
    { name: "Ounces", symbol: "oz", ratio: 0.028349523 },
    { name: "Stone", symbol: "st", ratio: 6.35029318 },
  ],
  area: [
    { name: "Square Meters", symbol: "m²", ratio: 1 },
    { name: "Square Kilometers", symbol: "km²", ratio: 1000000 },
    { name: "Square Miles", symbol: "mi²", ratio: 2589988.11 },
    { name: "Acres", symbol: "ac", ratio: 4046.85642 },
    { name: "Hectares", symbol: "ha", ratio: 10000 },
  ],
  temp: [
    { name: "Celsius", symbol: "°C", ratio: 1 },
    { name: "Fahrenheit", symbol: "°F", ratio: 1 },
    { name: "Kelvin", symbol: "K", ratio: 1 },
  ],
  speed: [
    { name: "Meters per second", symbol: "m/s", ratio: 1 },
    { name: "Kilometers per hour", symbol: "km/h", ratio: 0.27777778 },
    { name: "Miles per hour", symbol: "mph", ratio: 0.44704 },
    { name: "Knots", symbol: "kn", ratio: 0.51444444 },
  ],
};

export function UnitConverter() {
  const { showToast, addToHistory } = useAppState();
  const [category, setCategory] = useState<UnitType>("length");
  const [val, setVal] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto set initial units when category changes
  useEffect(() => {
    const list = UNITS[category];
    if (list && list.length >= 2) {
      setFromUnit(list[0].symbol);
      setToUnit(list[1].symbol);
    }
  }, [category]);

  const convertValue = () => {
    const valueNum = Number(val);
    if (isNaN(valueNum)) {
      setOutput("");
      return;
    }

    const list = UNITS[category];
    const from = list.find((u) => u.symbol === fromUnit);
    const to = list.find((u) => u.symbol === toUnit);

    if (!from || !to) return;

    let converted = 0;

    if (category === "temp") {
      // Custom temperature conversions
      if (fromUnit === toUnit) {
        converted = valueNum;
      } else if (fromUnit === "°C" && toUnit === "°F") {
        converted = (valueNum * 9) / 5 + 32;
      } else if (fromUnit === "°C" && toUnit === "K") {
        converted = valueNum + 273.15;
      } else if (fromUnit === "°F" && toUnit === "°C") {
        converted = ((valueNum - 32) * 5) / 9;
      } else if (fromUnit === "°F" && toUnit === "K") {
        converted = ((valueNum - 32) * 5) / 9 + 273.15;
      } else if (fromUnit === "K" && toUnit === "°C") {
        converted = valueNum - 273.15;
      } else if (fromUnit === "K" && toUnit === "°F") {
        converted = ((valueNum - 273.15) * 9) / 5 + 32;
      }
    } else {
      // Standard ratio multiplication
      const valueInBase = valueNum * from.ratio;
      converted = valueInBase / to.ratio;
    }

    // Precise rounding
    const result = Number(converted.toFixed(8)).toString();
    setOutput(result);
  };

  useEffect(() => {
    convertValue();
  }, [val, fromUnit, toUnit, category]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    showToast("Swapped units!", "info");
  };

  const copyResult = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    addToHistory("unit-converter", "Unit Converter", `Converted ${val}${fromUnit} to ${output}${toUnit}`);
    showToast("Result copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Category selector */}
      <div className="flex flex-wrap gap-2.5 p-2 bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl">
        {(Object.keys(UNITS) as UnitType[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-xs capitalize transition-all cursor-pointer ${
              category === cat
                ? "bg-white dark:bg-neutral-950 text-violet-600 dark:text-violet-400 shadow-sm border border-neutral-200/40 dark:border-neutral-800/40"
                : "text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        
        {/* Value From */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="unitValFrom" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">From Value</label>
          <div className="flex items-center gap-2">
            <input
              id="unitValFrom"
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-semibold focus:border-violet-500 outline-none"
            />
            <select
              aria-label="Source Unit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="px-3 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold outline-none"
            >
              {UNITS[category].map((u) => (
                <option key={u.symbol} value={u.symbol}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex items-center justify-center pt-5">
          <button
            onClick={swapUnits}
            className="w-11 h-11 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowRightLeft size={16} className="rotate-90 md:rotate-0" />
          </button>
        </div>

        {/* Result To */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="unitValTo" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">To Value Result</label>
          <div className="flex items-center gap-2">
            <input
              id="unitValTo"
              type="text"
              readOnly
              value={output}
              placeholder="Conversion outcome"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 text-sm font-bold outline-none text-neutral-600 dark:text-neutral-400 cursor-not-allowed"
            />
            <select
              aria-label="Target Unit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="px-3 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold outline-none"
            >
              {UNITS[category].map((u) => (
                <option key={u.symbol} value={u.symbol}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Conversion analysis metrics */}
      {output && (
        <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Scale size={18} />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Result Details</span>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-200 mt-0.5">
                {val} {fromUnit} is equal to {output} {toUnit}
              </p>
            </div>
          </div>
          <button
            onClick={copyResult}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
            <span>{copied ? "Copied" : "Copy Result"}</span>
          </button>
        </div>
      )}

    </div>
  );
}
