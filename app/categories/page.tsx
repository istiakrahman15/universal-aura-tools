"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { TOOLS } from "@/lib/tools-data";
import { LucideIcon } from "@/components/LucideIcon";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, FolderKanban, Cpu, Code2, FileText, CalculatorIcon, Palette } from "lucide-react";

export default function CategoriesPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Categories Directory — Universal Aura Suite";
  }, []);

  const categoryMetadata = [
    {
      id: "ai",
      name: "AI Assistants",
      description: "Generative intelligence models trained to write, translate, summarize, and explain.",
      icon: Cpu,
      color: "text-violet-500",
      bg: "bg-violet-600/10",
    },
    {
      id: "developer",
      name: "Developer Tools",
      description: "Fast converters, hashers, base64 engines, and UUID generators.",
      icon: Code2,
      color: "text-blue-500",
      bg: "bg-blue-600/10",
    },
    {
      id: "text",
      name: "Text Utilities",
      description: "Clean, check, organize, reverse, and compare document texts.",
      icon: FileText,
      color: "text-emerald-500",
      bg: "bg-emerald-600/10",
    },
    {
      id: "math",
      name: "Math & Conversions",
      description: "Scientific calculations, percentages, units, and localized converters.",
      icon: CalculatorIcon,
      color: "text-amber-500",
      bg: "bg-amber-600/10",
    },
    {
      id: "media",
      name: "Image & Media",
      description: "Compress, resize, edit, and extract palettes without losing quality.",
      icon: Palette,
      color: "text-rose-500",
      bg: "bg-rose-600/10",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="categories-content" className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
        
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
              <FolderKanban size={11} /> Taxonomy index
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Tool Categories Directory
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            Explore 19+ integrated utilities classified cleanly by functional groups.
          </p>
        </div>

        {/* Categories timeline/blocks */}
        <div className="grid grid-cols-1 gap-8 mt-4">
          {categoryMetadata.map((cat) => {
            const IconComponent = cat.icon;
            const toolsInCategory = TOOLS.filter((t) => t.category === cat.id);

            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-5"
              >
                {/* Category Header */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${cat.bg} ${cat.color} shrink-0`}>
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Sub Tools List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-3.5 border-t border-neutral-100 dark:border-white/5">
                  {toolsInCategory.map((tool) => (
                    <div
                      key={tool.id}
                      onClick={() => router.push(`/tool/${tool.id}`)}
                      className="p-3.5 rounded-xl border border-neutral-150 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02] hover:bg-neutral-50 dark:hover:bg-white/[0.08] transition-all flex items-center justify-between gap-3 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 text-neutral-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                          <LucideIcon name={tool.iconName} size={14} />
                        </div>
                        <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200 truncate group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                          {tool.name}
                        </span>
                      </div>
                      <ArrowRight size={12} className="text-neutral-400 group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
