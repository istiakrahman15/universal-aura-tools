"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, Calendar, Clock, Smile } from "lucide-react";

export function AgeCalculator() {
  const { showToast, addToHistory } = useAppState();
  const [birthDate, setBirthDate] = useState("1995-07-20");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) {
      showToast("Please enter your birth date.", "error");
      return;
    }

    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (bDate > tDate) {
      showToast("Birth date cannot be in the future of the target date.", "error");
      return;
    }

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Secondary metrics
    const diffTime = Math.abs(tDate.getTime() - bDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    });

    addToHistory("age-calculator", "Age Calculator", `Calculated age for DOB ${birthDate}`);
    showToast("Precise age calculated!", "success");
  };

  const clearAll = () => {
    setBirthDate("");
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Inputs block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        
        {/* DOB */}
        <div className="flex flex-col gap-2">
          <label htmlFor="dobInput" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Date of Birth</label>
          <input
            id="dobInput"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        {/* Age at target Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="targetDateInput" className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Age at Date</label>
          <input
            id="targetDateInput"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <button
            onClick={calculateAge}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors cursor-pointer h-[42px] flex items-center justify-center gap-2"
          >
            <Calendar size={14} />
            Calculate Age
          </button>
        </div>

      </div>

      {/* Outcome statistics */}
      {result ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main big display card (5 cols) */}
          <div className="md:col-span-5 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 flex flex-col justify-between min-h-[220px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <Smile size={12} className="text-violet-500" />
              Your Precise Age
            </span>
            <div className="my-6">
              <span className="text-4xl font-extrabold font-mono text-neutral-800 dark:text-neutral-100 leading-tight">
                {result.years} <span className="text-sm font-semibold text-neutral-400">years</span>{"\n"}
                {result.months} <span className="text-sm font-semibold text-neutral-400">months</span>{"\n"}
                {result.days} <span className="text-sm font-semibold text-neutral-400">days</span>
              </span>
            </div>
            <span className="text-xs font-medium text-neutral-500">
              Happy Birthday month! Precise age computed relative to your local time.
            </span>
          </div>

          {/* Stat Breakdowns list card (7 cols) */}
          <div className="md:col-span-7 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Clock size={14} />
              Lifespan Metrics Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-100 dark:border-neutral-800/40">
                <span className="text-neutral-400 font-semibold block">Total Months</span>
                <span className="text-lg font-bold font-mono text-neutral-800 dark:text-neutral-100 mt-1 block">
                  {result.totalMonths.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-100 dark:border-neutral-800/40">
                <span className="text-neutral-400 font-semibold block">Total Weeks</span>
                <span className="text-lg font-bold font-mono text-neutral-800 dark:text-neutral-100 mt-1 block">
                  {result.totalWeeks.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-100 dark:border-neutral-800/40">
                <span className="text-neutral-400 font-semibold block">Total Days</span>
                <span className="text-lg font-bold font-mono text-neutral-800 dark:text-neutral-100 mt-1 block">
                  {result.totalDays.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-100 dark:border-neutral-800/40">
                <span className="text-neutral-400 font-semibold block">Total Hours</span>
                <span className="text-lg font-bold font-mono text-neutral-800 dark:text-neutral-100 mt-1 block">
                  {result.totalHours.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="h-44 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center p-4">
          <Calendar className="text-neutral-300 dark:text-neutral-700 mb-2" size={32} />
          <span className="text-xs font-semibold text-neutral-400">Select your DOB date and click Calculate Age</span>
        </div>
      )}

    </div>
  );
}
