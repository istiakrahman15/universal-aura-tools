"use client";

import React, { use, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { TOOLS } from "@/lib/tools-data";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { LucideIcon } from "@/components/LucideIcon";
import { useRouter } from "next/navigation";
import { Heart, Sparkles, CornerDownRight, ArrowLeft } from "lucide-react";

interface ToolPageProps {
  params: Promise<{ id: string }>;
}

export default function ToolPage({ params }: ToolPageProps) {
  const resolvedParams = use(params);
  const toolId = resolvedParams.id;
  const { favorites, toggleFavorite } = useAppState();
  const router = useRouter();

  const tool = TOOLS.find((t) => t.id === toolId);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.name} — Universal Aura Suite`;
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303]">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tool Not Found</h1>
          <p className="text-neutral-500 dark:text-slate-400 mt-2">The requested tool ID &quot;{toolId}&quot; is not in our registry.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-4 py-2 bg-violet-600 text-white rounded-full text-xs font-bold shadow-md shadow-violet-500/20 active:scale-95 transition-all cursor-pointer"
          >
            Go Back Home
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] transition-colors duration-200">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-6">
        
        {/* Breadcrumb row */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/[0.08] font-bold text-xs transition-all cursor-pointer text-neutral-500 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white"
          >
            ← Back to Tool Suite
          </button>
          <div className="text-xs font-bold text-neutral-400 flex items-center gap-1">
            <span>Suite</span>
            <CornerDownRight size={10} />
            <span className="text-neutral-500 dark:text-neutral-300">{tool.category}</span>
          </div>
        </div>

        {/* Workbench Header */}
        <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4 min-w-0">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/20">
              <LucideIcon name={tool.iconName} size={22} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-neutral-900 dark:text-white truncate">
                  {tool.name}
                </h1>
                {tool.category === "ai" && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white flex items-center gap-0.5">
                    <Sparkles size={8} /> AI
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                {tool.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => toggleFavorite(tool.id)}
              className={`px-4 py-2 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                favorites.includes(tool.id)
                  ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/40"
                  : "border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-white/[0.08]"
              }`}
            >
              <Heart size={13} className={favorites.includes(tool.id) ? "fill-current" : ""} />
              <span>{favorites.includes(tool.id) ? "Favorited" : "Favorite"}</span>
            </button>
          </div>
        </div>

        {/* Active Tool Renderer */}
        <div className="min-h-[400px]">
          <ToolRenderer id={tool.id} />
        </div>

      </main>

      <Footer />
    </div>
  );
}
