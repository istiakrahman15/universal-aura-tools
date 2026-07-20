"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { ArrowLeft, GitCommit, CheckCircle2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangelogPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Changelog — Universal Aura Suite";
  }, []);

  const logs = [
    {
      version: "v1.2.0",
      date: "July 20, 2026",
      status: "Latest",
      highlights: [
        "Added permanent developer credits page (/developer) for Istiak Rahman containing profiles, support anchors, and tech stacks.",
        "Programmed workstation shortcuts (Ctrl+K/Cmd+K, Ctrl+/, Ctrl+Shift+D).",
        "Refined Obsidian-themed card backdrops, glass controls, and micro-animations.",
        "Resolved ESLint warnings and stabilized state lifecycle variables."
      ]
    },
    {
      version: "v1.1.0",
      date: "June 15, 2026",
      status: "Stable",
      highlights: [
        "Integrated central localStorage caching synchronization for user progress logs and usage stats.",
        "Wrote fuzzy matching algorithms inside the global fuzzy search palette.",
        "Programmed client-side metrics dashboards tracking overall executions."
      ]
    },
    {
      version: "v1.0.0",
      date: "May 01, 2026",
      status: "Legacy",
      highlights: [
        "First major release of the workspace compiling 19+ integrated code, media, and math utilities.",
        "Configured server-side proxies for Google Gemini natural language generation models."
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="changelog-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
        {/* Back Link */}
        <div className="flex items-center gap-2">
          <button
            id="back-to-suite-btn"
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Suite
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2 border-b border-neutral-200/50 dark:border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <RefreshCw size={11} className="animate-spin-slow" /> System Chronology
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Workstation Changelog
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            Chronological log of features, design optimizations, and stability audits of the suite.
          </p>
        </div>

        {/* Log list timeline */}
        <div className="flex flex-col gap-8 mt-4 pl-4 border-l border-neutral-200/60 dark:border-white/5 relative">
          {logs.map((log, index) => (
            <div key={log.version} className="relative flex flex-col gap-3">
              {/* Timeline dot */}
              <div className="absolute left-[-21px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-600 border-2 border-white dark:border-[#030303] shadow-md shadow-violet-500/20" />
              
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-white tracking-tight">
                  {log.version}
                </h3>
                <span className="text-xs text-neutral-400 dark:text-slate-500 font-medium">
                  {log.date}
                </span>
                <span className={`text-[9px] font-extrabold font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                  log.status === "Latest" 
                    ? "bg-violet-600/10 text-violet-700 dark:text-violet-300"
                    : log.status === "Stable"
                    ? "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-neutral-250 text-neutral-500 dark:bg-white/5 dark:text-slate-500"
                }`}>
                  {log.status}
                </span>
              </div>

              <ul className="space-y-2 mt-1">
                {log.highlights.map((highlight, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2.5 text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
                    <CheckCircle2 size={13} className="text-violet-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
