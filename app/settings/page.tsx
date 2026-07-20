"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { useRouter } from "next/navigation";
import { Settings, ArrowLeft, Sun, Moon, Trash2, Heart, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme, clearHistory, favorites, toggleFavorite, showToast } = useAppState();
  const router = useRouter();

  useEffect(() => {
    document.title = "Workstation Settings — Universal Aura Suite";
  }, []);

  const handleResetEntireWorkspace = () => {
    if (confirm("Are you absolutely sure you want to reset the entire workstation? This will purge all favorites, statistics, search history, and settings.")) {
      localStorage.clear();
      showToast("Workspace fully reset. Reloading...", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="settings-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
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
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Settings size={11} /> Control panel
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Workstation Settings
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            Tune workspace parameters, manage storage structures, and view connection states.
          </p>
        </div>

        {/* Settings Body */}
        <div className="grid grid-cols-1 gap-6 mt-4">
          
          {/* Card: Theme & Visuals */}
          <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-2">
              <Sparkles size={14} className="text-violet-500" />
              Theme & Styling Options
            </h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
              Toggle between the classic sleek Light Mode and the premium Obsidian Dark Mode. High-contrast levels are pre-configured for eye safety.
            </p>

            <div className="flex items-center justify-between p-4.5 rounded-xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.01]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Active Palette Theme</span>
                <span className="text-[10px] text-neutral-400 dark:text-slate-500 mt-0.5">Currently using {theme === "dark" ? "Obsidian Dark" : "Sleek Light"} layout</span>
              </div>
              <button
                id="toggle-theme-settings-btn"
                onClick={toggleTheme}
                className="px-4.5 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#030303] text-xs font-bold hover:bg-neutral-150 dark:hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer shadow-sm text-neutral-800 dark:text-white"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={13} className="text-amber-500" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-indigo-600" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card: System Storage & Security */}
          <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-2">
              <Trash2 size={14} className="text-red-500" />
              Data Cache & Operations
            </h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
              Purge individual or combined storage variables containing favorite pins, historical data tracks, or localized metrics counts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.01] flex flex-col justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Reset Activity History</span>
                  <span className="text-[10px] text-neutral-400 dark:text-slate-500 mt-0.5">Purges all your local action logs completely</span>
                </div>
                <button
                  id="reset-history-btn"
                  onClick={() => {
                    clearHistory();
                    showToast("Activity history purged", "success");
                  }}
                  className="w-full py-2 rounded-lg bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/10 transition-all text-xs font-bold cursor-pointer"
                >
                  Clear History
                </button>
              </div>

              <div className="p-4 rounded-xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.01] flex flex-col justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Reset Saved Favorites</span>
                  <span className="text-[10px] text-neutral-400 dark:text-slate-500 mt-0.5">Currently tracking {favorites.length} pinned widgets</span>
                </div>
                <button
                  id="reset-favorites-btn"
                  onClick={() => {
                    if (favorites.length === 0) {
                      showToast("No favorites to clear", "info");
                      return;
                    }
                    favorites.forEach((id) => toggleFavorite(id));
                    showToast("Saved favorites purged", "success");
                  }}
                  className="w-full py-2 rounded-lg bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/10 transition-all text-xs font-bold cursor-pointer"
                >
                  Clear Favorites
                </button>
              </div>
            </div>

            <div className="border-t border-dashed border-neutral-150 dark:border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <AlertCircle size={15} className="text-amber-500 shrink-0" />
                <span className="text-[11px] text-neutral-500 dark:text-slate-400 leading-relaxed">
                  Resetting the workspace is irreversible. It completely purges the local browser state.
                </span>
              </div>
              <button
                id="reset-all-workspace-btn"
                onClick={handleResetEntireWorkspace}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-red-500/10"
              >
                Reset Entire Workspace
              </button>
            </div>
          </div>

          {/* Card: Connection Status */}
          <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              API Service Integrations
            </h3>
            
            <div className="flex items-center justify-between p-4.5 rounded-xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.01]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Google Gemini AI Engine</span>
                <span className="text-[10px] text-neutral-400 dark:text-slate-500 mt-0.5">Secure, server-side environment endpoint</span>
              </div>
              <span className="text-xs font-extrabold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-600/10 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                ● Connected
              </span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
