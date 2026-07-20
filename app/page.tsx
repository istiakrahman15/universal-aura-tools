"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { TOOLS, CATEGORIES, Tool } from "@/lib/tools-data";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { LucideIcon } from "@/components/LucideIcon";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, Sparkles, Pin, ArrowRight, CornerDownRight, Star } from "lucide-react";

export default function HomePage() {
  const {
    favorites,
    toggleFavorite,
    incrementUsage,
    usageStats,
    showToast,
  } = useAppState();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const activeTool = TOOLS.find((t) => t.id === activeToolId);

  // Dynamic Browser tab title
  useEffect(() => {
    if (activeTool) {
      document.title = `${activeTool.name} — Universal Aura Suite`;
    } else {
      document.title = "Universal Aura Tools — Premium AI-Powered Tool Suite";
    }
  }, [activeTool]);

  // Set up search / filter criteria
  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleToolClick = (toolId: string) => {
    setActiveToolId(toolId);
    incrementUsage(toolId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keyboard shortcut to clear active tool
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeToolId) {
        setActiveToolId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeToolId]);

  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "dev":
      case "developer":
        return "text-blue-500 bg-blue-500/10 border border-blue-500/20";
      case "image":
      case "graphics":
        return "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20";
      case "text":
      case "text tools":
        return "text-amber-500 bg-amber-500/10 border border-amber-500/20";
      case "ai":
      case "ai lab":
        return "text-violet-500 bg-violet-500/10 border border-violet-500/20";
      default:
        return "text-rose-500 bg-rose-500/10 border border-rose-500/20";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] transition-colors duration-200">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      {/* Primary Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {!activeToolId ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-12"
            >
              {/* Majestic Landing Hero */}
              <div className="text-center max-w-3xl mx-auto py-12 md:py-16 flex flex-col items-center gap-6 relative">
                
                {/* Visual Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Sparkling Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/50 dark:border-white/10 bg-violet-600/5 dark:bg-white/5 text-violet-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider relative">
                  <Sparkles size={11} className="animate-pulse text-violet-500" />
                  <span>Interactive & AI-powered suite</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight font-sans">
                  The Ultimate{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 dark:from-violet-400 dark:to-blue-400">
                    Aura Workspace
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base text-neutral-500 dark:text-slate-400 max-w-xl leading-relaxed">
                  Premium, AI-powered developer utilities for the modern ecosystem. Decode tokens, resize graphics, and explore language engines.
                </p>

                {/* Instant Search Bar */}
                <div className="w-full max-w-lg mt-4 relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-neutral-400 dark:text-slate-500 pointer-events-none">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search over 19+ premium utilities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full border border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-sm font-semibold outline-none shadow-sm focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500 transition-all dark:placeholder-slate-500 backdrop-blur-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-4 text-xs font-bold text-neutral-400 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

              </div>

              {/* Categorization Swiper bar */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-neutral-200/50 dark:border-white/5 pb-4 overflow-x-auto gap-4 no-scrollbar">
                  <div className="flex items-center gap-2">
                    {CATEGORIES.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                            isActive
                              ? "bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black shadow-md shadow-neutral-950/10"
                              : "border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-neutral-500 dark:text-slate-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.08]"
                          }`}
                        >
                          <LucideIcon name={cat.icon} size={13} />
                          <span>{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-bold text-neutral-400 dark:text-slate-500 font-mono shrink-0">
                    {filteredTools.length} tools found
                  </span>
                </div>

                {/* Grid of Tools */}
                {filteredTools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool) => {
                      const isFav = favorites.includes(tool.id);
                      const isAi = tool.category === "ai";
                      const usage = usageStats[tool.id] || 0;

                      return (
                        <div
                          key={tool.id}
                          className="group relative rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-violet-500/40 hover:bg-neutral-50/80 dark:hover:bg-white/[0.08] hover:shadow-xl hover:shadow-violet-500/[0.01] dark:hover:shadow-none transition-all duration-300 p-5 flex flex-col justify-between gap-5 cursor-pointer backdrop-blur-sm"
                          onClick={() => handleToolClick(tool.id)}
                        >
                          {/* Inner container */}
                          <div className="flex flex-col gap-4">
                            
                            {/* Card Header row */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-white/5 text-neutral-600 dark:text-slate-400 group-hover:bg-gradient-to-tr group-hover:from-violet-600 group-hover:to-blue-500 group-hover:text-white transition-all duration-300 shadow-sm border border-neutral-200/20 dark:border-white/5">
                                  <LucideIcon name={tool.iconName} size={18} />
                                </div>
                                <div className="flex flex-col">
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryBadgeClass(tool.category)}`}>
                                    {tool.category}
                                  </span>
                                  {usage > 0 && (
                                    <span className="text-[9px] font-semibold font-mono text-neutral-400 dark:text-slate-500 mt-1">
                                      {usage} uses this session
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Toggler button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(tool.id);
                                }}
                                className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                                  isFav
                                    ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/40"
                                    : "border-neutral-200/60 dark:border-white/10 text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/5"
                                }`}
                              >
                                <Heart size={14} className={isFav ? "fill-current" : ""} />
                              </button>
                            </div>

                            {/* Card Body */}
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm text-neutral-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                  {tool.name}
                                </h3>
                                {tool.isNew && (
                                  <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                                    New
                                  </span>
                                )}
                                {isAi && (
                                  <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white flex items-center gap-0.5">
                                    <Sparkles size={8} /> AI
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {tool.description}
                              </p>
                            </div>

                          </div>

                          {/* Footer row */}
                          <div className="pt-4 border-t border-neutral-100/80 dark:border-white/5 flex items-center justify-between text-[11px] font-bold text-neutral-400 dark:text-slate-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                            <span>Launch Tool</span>
                            <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform text-neutral-400 dark:text-slate-400 group-hover:text-violet-500" />
                          </div>

                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center p-6">
                    <Search className="text-neutral-300 dark:text-slate-700 mb-3" size={36} />
                    <h3 className="font-bold text-neutral-700 dark:text-slate-300">No tools found</h3>
                    <p className="text-xs text-neutral-400 max-w-sm mt-1 leading-relaxed">
                      No tools matched your category or query. Try searching for other keywords like &quot;encode&quot; or &quot;compare&quot;.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="workbench"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Back breadcrumb bar */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveToolId(null)}
                  className="px-4.5 py-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-neutral-500 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-white/[0.08] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  ← Back to Tool Suite
                </button>
                <div className="text-xs font-bold text-neutral-400 dark:text-slate-500 flex items-center gap-1">
                  <span>Suite</span>
                  <CornerDownRight size={10} />
                  <span className="text-neutral-500 dark:text-slate-300">{activeTool?.category}</span>
                </div>
              </div>

              {/* Active Tool Workspace header */}
              <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-blue-500 text-white shadow-md shadow-violet-500/10">
                    <LucideIcon name={activeTool?.iconName || "Sparkles"} size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {activeTool?.name}
                      </h2>
                      {activeTool?.category === "ai" && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white flex items-center gap-0.5">
                          <Sparkles size={8} /> AI
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {activeTool?.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => toggleFavorite(activeToolId)}
                    className={`px-4.5 py-2 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      favorites.includes(activeToolId)
                        ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/40"
                        : "border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-slate-400 hover:bg-neutral-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <Heart size={13} className={favorites.includes(activeToolId) ? "fill-current" : ""} />
                    <span>{favorites.includes(activeToolId) ? "Favorited" : "Favorite"}</span>
                  </button>
                </div>
              </div>

              {/* Render dynamic workbench */}
              <div className="min-h-[400px]">
                <ToolRenderer id={activeToolId} />
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
