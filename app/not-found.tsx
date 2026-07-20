"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useRouter } from "next/navigation";
import { AlertOctagon, ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    document.title = "404 Page Not Found — Universal Aura Suite";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="notfound-content" className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col items-center justify-center text-center gap-6 relative z-10">
        
        {/* Animated Icon Circle */}
        <div className="w-20 h-20 rounded-2xl bg-violet-600/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 flex items-center justify-center animate-bounce shadow-xl shadow-violet-500/10 border border-violet-500/20">
          <AlertOctagon size={36} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest">
            ERROR CODE 404
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Lost in HyperSpace
          </h1>
          <p className="text-xs text-neutral-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed mt-2">
            The coordinates you supplied do not resolve to any workspace utility in our taxonomy catalog.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          <button
            id="back-home-btn"
            onClick={() => router.push("/")}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-violet-500/10"
          >
            <Home size={13} />
            <span>Go to Home</span>
          </button>
          
          <button
            id="go-back-btn"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black/20 hover:bg-neutral-150 dark:hover:bg-white/5 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer text-neutral-700 dark:text-slate-300"
          >
            <ArrowLeft size={13} />
            <span>Go Back</span>
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
