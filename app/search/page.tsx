"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { TOOLS } from "@/lib/tools-data";
import { LucideIcon } from "@/components/LucideIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Heart, SlidersHorizontal, ArrowLeft } from "lucide-react";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favorites, toggleFavorite, showToast } = useAppState();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    document.title = "Search Results — Universal Aura Suite";
  }, []);

  const results = TOOLS.filter((tool) => {
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <main id="search-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-8 relative z-10">
      {/* Back Link */}
      <div className="flex items-center gap-2">
        <button
          id="back-to-suite-btn"
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Search size={10} /> Search query
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
          Search Results
        </h1>
        <p className="text-sm text-neutral-500 dark:text-slate-400">
          Showing matching utilities in the suite matching your query parameters.
        </p>
      </div>

      {/* Input bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-slate-500" size={15} />
        <input
          id="search-page-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter workspace tools..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm outline-none focus:border-violet-500 dark:focus:border-violet-500 text-xs transition-all font-semibold"
        />
      </div>

      {/* Results Rendering */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((tool) => {
            const isFavorite = favorites.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => router.push(`/tool/${tool.id}`)}
                className="group relative rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-[#0c0c0c]/40 hover:bg-white/90 dark:hover:bg-[#0f0f0f]/80 shadow-xl shadow-neutral-900/[0.02] hover:shadow-violet-500/[0.04] backdrop-blur-sm p-6 flex flex-col justify-between gap-5 transition-all duration-300 hover:scale-[1.01] hover:border-violet-500/30 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3 rounded-xl bg-neutral-100 dark:bg-white/5 text-neutral-500 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                    <LucideIcon name={tool.iconName} size={18} />
                  </div>
                  
                  <button
                    id={`fav-btn-${tool.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.id);
                      showToast(
                        isFavorite ? `Removed ${tool.name}` : `Added ${tool.name} to favorites`,
                        "info"
                      );
                    }}
                    className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    aria-label="Toggle favorite"
                  >
                    <Heart size={14} className={isFavorite ? "fill-current text-rose-500" : ""} />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-xs text-neutral-850 dark:text-white tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-neutral-400 dark:text-slate-500 mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="border-t border-neutral-100 dark:border-white/5 pt-3.5 flex items-center justify-between">
                  <span className="text-[9px] font-extrabold font-mono text-neutral-400 dark:text-slate-500 uppercase tracking-wider bg-neutral-100/60 dark:bg-white/5 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 font-bold transition-all flex items-center gap-1 group-hover:translate-x-0.5">
                    Launch tool
                    <SlidersHorizontal size={10} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-64 border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-white/30 dark:bg-white/[0.01]">
          <Search className="text-neutral-300 dark:text-slate-700 mb-2" size={36} />
          <span className="text-sm font-bold text-neutral-400">No results found</span>
          <span className="text-xs text-neutral-500 max-w-xs mt-1 leading-relaxed">
            We couldn&apos;t find any tools matching &ldquo;{query}&rdquo;. Check your spelling or search for categories like &ldquo;AI&rdquo; or &ldquo;Developer&rdquo;.
          </span>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs font-mono animate-pulse">Initializing search query...</span>
        </div>
      }>
        <SearchPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}
