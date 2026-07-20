"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/lib/app-state-context";
import { Sparkles, Sun, Moon, Search, LayoutDashboard, Home, Heart, Command, User } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, setCommandPaletteOpen, favorites } = useAppState();

  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  const isDeveloper = pathname === "/developer";

  return (
    <>
      {/* --- DESKTOP & TABLET HEADER --- */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/50 dark:border-white/5 bg-white/70 dark:bg-black/40 backdrop-blur-md transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20 transition-all duration-300">
              <Sparkles size={15} className="text-white animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0 leading-none">
              <span className="font-bold text-neutral-900 dark:text-white text-base tracking-tight truncate sm:block">
                Universal Aura
              </span>
              <span className="text-[10px] font-bold font-mono text-neutral-400 dark:text-slate-500 tracking-wider uppercase truncate">
                Suite v3.0
              </span>
            </div>
          </Link>

          {/* Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              href="/"
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isHome
                  ? "bg-violet-600/10 text-violet-700 dark:bg-white/5 dark:text-white dark:border dark:border-white/5"
                  : "text-neutral-500 dark:text-slate-400 hover:text-neutral-950 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Home size={13} />
                <span>Home</span>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isDashboard
                  ? "bg-violet-600/10 text-violet-700 dark:bg-white/5 dark:text-white dark:border dark:border-white/5"
                  : "text-neutral-500 dark:text-slate-400 hover:text-neutral-950 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <LayoutDashboard size={13} />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              href="/developer"
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isDeveloper
                  ? "bg-violet-600/10 text-violet-700 dark:bg-white/5 dark:text-white dark:border dark:border-white/5"
                  : "text-neutral-500 dark:text-slate-400 hover:text-neutral-950 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <User size={13} />
                <span>Developer</span>
              </div>
            </Link>
          </nav>

          {/* Search trigger & Actions */}
          <div className="flex items-center gap-3.5 ml-auto">
            
            {/* Search Pill (Desktop) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:border-neutral-300 dark:hover:border-violet-500/40 text-neutral-400 hover:text-neutral-500 dark:text-slate-400 dark:hover:text-white cursor-pointer transition-all duration-200 text-left w-56 lg:w-64"
            >
              <Search size={14} className="shrink-0" />
              <span className="text-xs font-semibold truncate">Search tools...</span>
              <span className="ml-auto flex items-center gap-0.5 font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-black/40 text-neutral-400 dark:text-slate-400 shadow-sm shrink-0">
                <Command size={8} />K
              </span>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              aria-label="Open search palette"
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200/80 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-500 dark:text-slate-400 cursor-pointer active:scale-95 transition-transform"
            >
              <Search size={16} />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200/80 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-500 dark:text-slate-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer active:scale-95 transition-transform"
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-amber-400 animate-spin-slow" />
              ) : (
                <Moon size={16} className="text-indigo-600" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* --- MOBILE BOTTOM NAVIGATION TAB BAR --- */}
      <nav className="md:hidden fixed bottom-5 left-4 right-4 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-neutral-200/80 dark:border-neutral-850/80 rounded-2xl shadow-xl flex items-center justify-around py-2.5 px-4 h-16 pointer-events-auto">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors cursor-pointer ${
            isHome
              ? "text-violet-600 dark:text-violet-400 bg-violet-600/5"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <Home size={20} />
          <span className="text-[10px] font-semibold mt-0.5 leading-none">Home</span>
        </Link>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-neutral-400 cursor-pointer"
        >
          <Search size={20} />
          <span className="text-[10px] font-semibold mt-0.5 leading-none">Search</span>
        </button>

        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors cursor-pointer ${
            isDashboard
              ? "text-violet-600 dark:text-violet-400 bg-violet-600/5"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-semibold mt-0.5 leading-none">Dashboard</span>
        </Link>

        <Link
          href="/developer"
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors cursor-pointer ${
            isDeveloper
              ? "text-violet-600 dark:text-violet-400 bg-violet-600/5"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <User size={20} />
          <span className="text-[10px] font-semibold mt-0.5 leading-none">Developer</span>
        </Link>
      </nav>
    </>
  );
}
