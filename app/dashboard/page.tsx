"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { TOOLS } from "@/lib/tools-data";
import { LucideIcon } from "@/components/LucideIcon";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Heart, History, Trash2, ArrowLeft, BarChart2, Zap, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const {
    favorites,
    history,
    clearHistory,
    usageStats,
    showToast,
  } = useAppState();
  const router = useRouter();

  useEffect(() => {
    document.title = "Personal Command Center — Universal Aura Suite";
  }, []);

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  // Compute stats
  const totalUses = Object.values(usageStats).reduce((a, b) => a + b, 0);
  const distinctTools = Object.keys(usageStats).length;

  const handleLaunchTool = (toolId: string) => {
    // Navigate home and let page state activate it, or route to specific tool path!
    // Since we support full dynamic routing at /tool/[id], we can route directly there!
    router.push(`/tool/${toolId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] transition-colors duration-200">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-8">
        
        {/* Back link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Suite
          </button>
        </div>

        {/* Dashboard Title */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Personal Command Center
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            Monitor your workspace statistics, favorite widgets, and historical task executions.
          </p>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-700 dark:text-violet-300 flex items-center justify-center shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider block">Total Executions</span>
              <span className="text-2xl font-extrabold font-mono text-neutral-800 dark:text-white leading-tight mt-1 block">
                {totalUses}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <BarChart2 size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider block">Active Tools</span>
              <span className="text-2xl font-extrabold font-mono text-neutral-800 dark:text-white leading-tight mt-1 block">
                {distinctTools}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-600/10 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0">
              <Heart size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider block">Favorites Saved</span>
              <span className="text-2xl font-extrabold font-mono text-neutral-800 dark:text-white leading-tight mt-1 block">
                {favoriteTools.length}
              </span>
            </div>
          </div>
        </div>

        {/* Workspace details division */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Favorites List Card (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-1.5">
              <Heart size={15} className="text-rose-500 fill-current" />
              Favorited Tools
            </h3>

            {favoriteTools.length > 0 ? (
              <div className="flex flex-col gap-3.5">
                {favoriteTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleLaunchTool(tool.id)}
                    className="p-3 rounded-xl border border-neutral-200/60 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02] hover:bg-neutral-50 dark:hover:bg-white/[0.08] transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 text-neutral-500 group-hover:bg-violet-600 group-hover:text-white transition-colors shadow-sm">
                        <LucideIcon name={tool.iconName} size={15} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-neutral-800 dark:text-neutral-200 truncate">
                          {tool.name}
                        </h4>
                        <p className="text-[10px] text-neutral-400 dark:text-slate-500 truncate mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-neutral-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-44 border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-xl flex flex-col items-center justify-center text-center p-4">
                <Heart className="text-neutral-300 dark:text-slate-700 mb-2" size={28} />
                <span className="text-xs font-semibold text-neutral-400">No favorite tools saved</span>
                <span className="text-[10px] text-neutral-500 max-w-xs mt-0.5">Click the heart button on any tool card to save it here.</span>
              </div>
            )}
          </div>

          {/* Activity History Logs (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-white/5 pb-4 gap-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-1.5">
                <History size={15} />
                Activity logs
              </h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs font-semibold text-neutral-400 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              )}
            </div>

            {history.length > 0 ? (
              <div className="flex flex-col gap-4 max-h-[350px] overflow-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-neutral-150 dark:border-white/5 bg-neutral-50/20 dark:bg-white/[0.01] flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-xl bg-neutral-100 dark:bg-white/5 text-neutral-500 shrink-0">
                      <History size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-xs text-neutral-800 dark:text-neutral-200">
                          {item.toolName}
                        </h4>
                        <span className="text-[9px] font-mono font-medium text-neutral-400 dark:text-slate-500">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-44 border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-xl flex flex-col items-center justify-center text-center p-4">
                <History className="text-neutral-300 dark:text-slate-700 mb-2" size={28} />
                <span className="text-xs font-semibold text-neutral-400">No activity history logs yet</span>
                <span className="text-[10px] text-neutral-500 max-w-xs mt-0.5">Your executed actions and AI generations will be recorded here securely.</span>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
