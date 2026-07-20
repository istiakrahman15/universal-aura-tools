"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { motion } from "motion/react";
import { Sparkles, Code2, Layers, Cpu, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "About — Universal Aura Suite";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="about-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
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
            <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full">
              Workstation Core
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            About Universal Aura Suite
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            A premium developer companion combining over 19+ utility engines, AI-powered writing assistants, and dynamic encoders.
          </p>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <motion.div
            id="about-card-1"
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-700 dark:text-violet-300 flex items-center justify-center shrink-0">
              <Cpu size={18} />
            </div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">Blazingly Fast</h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
              Every utility runs client-side under low latency with zero round-trips for maximum client response times.
            </p>
          </motion.div>

          <motion.div
            id="about-card-2"
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
              <Code2 size={18} />
            </div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">Obsidian Design</h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
              Modern geometric borders, glass cards, Space Grotesk headings, and JetBrains Mono status outputs.
            </p>
          </motion.div>

          <motion.div
            id="about-card-3"
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">Secure & Private</h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
              Data is processed locally in your browser. All AI prompts are securely proxied via server-only routes.
            </p>
          </motion.div>
        </div>

        {/* Narrative */}
        <div className="p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-4 mt-2">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-violet-500 animate-pulse" />
            The Vision Behind Aura Suite
          </h2>
          <p className="text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
            The Universal Aura Suite was born from a simple requirement: developers, designers, and content creators waste countless hours switching between tabs to format JSON, calculate hashes, compress images, and generate texts.
          </p>
          <p className="text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
            Aura solves this by assembling a professional, highly cohesive workstation that works seamlessly across all of your devices. The design focuses heavily on typography pairing, crisp dark/light borders, and seamless state-saving across browser cycles.
          </p>
          
          <div className="flex flex-wrap items-center gap-3.5 mt-4 pt-4 border-t border-neutral-200/50 dark:border-white/5">
            <button
              id="get-started-btn"
              onClick={() => router.push("/")}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Get Started Now
              <ArrowRight size={13} />
            </button>
            <button
              id="view-dev-profile-btn"
              onClick={() => router.push("/developer")}
              className="px-5 py-2 rounded-xl border border-neutral-200/80 dark:border-white/10 bg-transparent hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-700 dark:text-slate-300 font-semibold text-xs transition-all cursor-pointer"
            >
              Meet the Architect
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
