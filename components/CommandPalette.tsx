/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/app-state-context";
import { TOOLS } from "@/lib/tools-data";
import { LucideIcon } from "@/components/LucideIcon";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Sparkles, Command } from "lucide-react";

export function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen, showToast } = useAppState();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter tools based on query
  const filteredTools = TOOLS.filter((tool) => {
    const s = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(s) ||
      tool.description.toLowerCase().includes(s) ||
      tool.category.toLowerCase().includes(s) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(s))
    );
  });

  // Focus input when palette opens
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isCommandPaletteOpen]);

  // Handle keyboard navigation inside the palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setCommandPaletteOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          const selectedTool = filteredTools[selectedIndex];
          setCommandPaletteOpen(false);
          router.push(`/tool/${selectedTool.id}`);
          showToast(`Opening ${selectedTool.name}`, "info");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, filteredTools, selectedIndex, router, setCommandPaletteOpen, showToast]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandPaletteOpen(false);
      }
    };

    if (isCommandPaletteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-neutral-950/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            ref={containerRef}
            className="w-full max-w-xl rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 shadow-2xl backdrop-blur-xl relative"
          >
            {/* Top decorative gradient bar */}
            <div className="h-[2px] bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500" />

            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-150 dark:border-neutral-800">
              <Search className="text-neutral-400 shrink-0" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools, categories, actions... (e.g. 'json', 'compress')"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 text-base"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium font-mono border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                  ESC
                </kbd>
                <button
                  onClick={() => setCommandPaletteOpen(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  <X size={16} className="text-neutral-400" />
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="max-h-[360px] overflow-y-auto p-2">
              {filteredTools.length > 0 ? (
                <div className="flex flex-col gap-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase flex items-center justify-between">
                    <span>Aura Suite Tools</span>
                    <span className="flex items-center gap-1 font-normal font-mono text-[9px] lowercase">
                      <Command size={10} /> + k
                    </span>
                  </div>

                  {filteredTools.map((tool, index) => {
                    const isSelected = index === selectedIndex;
                    const isAi = tool.category === "ai";
                    
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setCommandPaletteOpen(false);
                          router.push(`/tool/${tool.id}`);
                          showToast(`Opening ${tool.name}`, "info");
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all relative ${
                          isSelected
                            ? "bg-gradient-to-r from-violet-600/10 to-indigo-600/10 dark:from-violet-500/15 dark:to-indigo-500/15 text-violet-800 dark:text-violet-200"
                            : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected
                                ? "bg-violet-600 text-white"
                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                            }`}
                          >
                            <LucideIcon name={tool.iconName} size={18} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm truncate">{tool.name}</span>
                              {tool.isNew && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                                  New
                                </span>
                              )}
                              {isAi && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white flex items-center gap-0.5">
                                  <Sparkles size={8} /> AI
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                              {tool.description}
                            </p>
                          </div>
                        </div>

                        {/* Quick Shortcut Keys */}
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          <kbd
                            className={`hidden sm:inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold font-mono border ${
                              isSelected
                                ? "border-violet-300 dark:border-violet-700/50 bg-violet-200/50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300"
                                : "border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-400"
                            }`}
                          >
                            {tool.hotkey}
                          </kbd>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
                    <Search className="text-neutral-400" size={20} />
                  </div>
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                    No tools match your search
                  </h3>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-xs mt-1">
                    Try searching for custom tags or other terms like &quot;encrypt&quot;, &quot;clean&quot;, or &quot;calculate&quot;.
                  </p>
                </div>
              )}
            </div>

            {/* Command Palette Footer */}
            <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800/80 text-[10px] text-neutral-400 dark:text-neutral-500 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <span>↑↓ navigate</span>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <span>⏎ select</span>
              </div>
              <span className="flex items-center gap-1 text-[9px]">
                Powered by AI Suite
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
