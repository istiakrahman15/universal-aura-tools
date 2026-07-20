"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { TOOLS } from "@/lib/tools-data";
import { LucideIcon } from "@/components/LucideIcon";
import { useRouter } from "next/navigation";
import { Heart, Search, ArrowLeft, ArrowRight, Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, showToast } = useAppState();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Favorite Tools — Universal Aura Suite";
  }, []);

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  const filteredFavorites = favoriteTools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLaunchTool = (toolId: string) => {
    router.push(`/tool/${toolId}`);
  };

  const handleClearAllFavorites = () => {
    if (favorites.length === 0) return;
    favorites.forEach((id) => toggleFavorite(id));
    showToast("All favorites cleared successfully", "info");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="favorites-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
        {/* Back Link */}
        <div className="flex items-center justify-between gap-4">
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
          {favorites.length > 0 && (
            <button
              id="clear-all-favorites-btn"
              onClick={handleClearAllFavorites}
              className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 size={13} />
              Clear All
            </button>
          )}
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Heart size={10} className="fill-current text-rose-500" /> Favorites
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Your Favorite Tools
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            Access your pinned widgets instantly. Hover or search to manage your collection.
          </p>
        </div>

        {/* Search Input bar */}
        {favoriteTools.length > 0 && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-slate-500" size={15} />
            <input
              id="favorites-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pinned favorites..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm outline-none focus:border-violet-500 dark:focus:border-violet-500 text-xs transition-all font-semibold"
            />
          </div>
        )}

        {/* Favorites list */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredFavorites.map((tool) => (
              <div
                key={tool.id}
                className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col justify-between gap-4 hover:border-violet-500/40 dark:hover:border-violet-500/40 hover:scale-[1.01] transition-all group cursor-pointer"
                onClick={() => handleLaunchTool(tool.id)}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-violet-600/10 dark:bg-white/5 text-violet-700 dark:text-violet-300">
                    <LucideIcon name={tool.iconName} size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs text-neutral-850 dark:text-white truncate">
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 dark:text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 dark:border-white/5 pt-3.5">
                  <button
                    id={`remove-fav-${tool.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.id);
                      showToast(`Removed ${tool.name} from favorites`, "info");
                    }}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Heart size={12} className="fill-current" />
                    Unpin
                  </button>
                  <span className="text-[10px] text-violet-600 dark:text-violet-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Launch <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-white/30 dark:bg-white/[0.01]">
            <Heart className="text-neutral-300 dark:text-slate-700 mb-2 fill-neutral-200 dark:fill-slate-800" size={36} />
            <span className="text-sm font-bold text-neutral-400">No matching favorites found</span>
            <span className="text-xs text-neutral-500 max-w-xs mt-1 leading-relaxed">
              {favoriteTools.length > 0 
                ? "Try searching for a different term." 
                : "Browse the utility workstation and click the heart icon on any tool card to save favorites."}
            </span>
            {favoriteTools.length === 0 && (
              <button
                id="browse-workstation-btn"
                onClick={() => router.push("/")}
                className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold transition-all cursor-pointer hover:bg-violet-500"
              >
                Browse Workstation
              </button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
