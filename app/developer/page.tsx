"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { motion } from "motion/react";
import { Github, Globe, Heart, ArrowLeft, Cpu, Sparkles, Mail, ShieldCheck, Code, Award } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeveloperPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Lead Architect: Istiak Rahman — Universal Aura Suite";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
        
        {/* Back Link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Suite
          </button>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-neutral-200/50 dark:border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full">
                Lead Architect
              </span>
              <span className="text-[10px] font-extrabold font-mono text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck size={10} /> Verified
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
              Istiak Rahman
            </h1>
            <p className="text-sm text-neutral-500 dark:text-slate-400 max-w-lg mt-1 leading-relaxed">
              Full-Stack Developer, Open-Source Contributor, and UI/UX Designer dedicated to building elegant, high-performance web applications with atomic attention to detail.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm text-center">
              <span className="text-xl font-bold font-mono text-violet-600 dark:text-violet-400">19+</span>
              <span className="text-[10px] text-neutral-400 dark:text-slate-500 block uppercase font-bold tracking-wider mt-0.5">Suite Tools</span>
            </div>
            <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm text-center">
              <span className="text-xl font-bold font-mono text-emerald-500">100%</span>
              <span className="text-[10px] text-neutral-400 dark:text-slate-500 block uppercase font-bold tracking-wider mt-0.5">Offline-Ready</span>
            </div>
          </div>
        </div>

        {/* Developer Info Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Card (7 Cols) */}
          <div className="md:col-span-7 p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-1.5 mb-2">
                <Code size={15} className="text-violet-500" />
                Technical Mission
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 dark:text-slate-400">
                The Universal Aura Suite was built on the core principle of **Architectural Honesty** — providing high-fidelity, context-aware development and copywriting solutions with absolutely zero bloating or unnecessary tracking. Each module runs client-side under rigorous security parameters with instant processing.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-slate-500">Engine Details</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-neutral-100/50 dark:bg-white/[0.03] border border-neutral-200/50 dark:border-white/5">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-slate-500 block uppercase">Frontend</span>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5 block">Next.js 15 & React 19</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-100/50 dark:bg-white/[0.03] border border-neutral-200/50 dark:border-white/5">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-slate-500 block uppercase">Styling Engine</span>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5 block">Tailwind CSS v4</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-100/50 dark:bg-white/[0.03] border border-neutral-200/50 dark:border-white/5">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-slate-500 block uppercase">Animations</span>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5 block">Motion (Framer Motion)</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-100/50 dark:bg-white/[0.03] border border-neutral-200/50 dark:border-white/5">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-slate-500 block uppercase">Type Safety</span>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5 block">TypeScript Strict</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-violet-600/5 border border-violet-500/20 flex gap-3">
              <Sparkles className="text-violet-500 shrink-0 mt-0.5" size={16} />
              <p className="text-xs leading-relaxed text-violet-900 dark:text-violet-300">
                <strong>Project Integrity:</strong> Universal Aura Suite features clean LocalStorage synchronization for history, custom settings, and favorites. No telemetry, logs, or margin clutter. Just high-fidelity UI and robust code.
              </p>
            </div>
          </div>

          {/* Social Links & Support Card (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Reach out / Support card */}
            <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-1.5">
                <Award size={15} className="text-blue-500" />
                Connect & Support
              </h3>
              
              <div className="flex flex-col gap-3">
                {/* GitHub link */}
                <a
                  href="https://github.com/istiakrahman15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-neutral-200/80 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:border-neutral-300 dark:hover:border-violet-500/40 cursor-pointer flex items-center justify-between group transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={15} className="text-neutral-500 dark:text-slate-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">GitHub Profile</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 dark:text-slate-500 font-mono">@istiakrahman15</span>
                </a>

                {/* Portfolio link */}
                <a
                  href="https://devistiak.eu.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-neutral-200/80 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] hover:bg-neutral-100 dark:hover:bg-white/[0.08] hover:border-neutral-300 dark:hover:border-violet-500/40 cursor-pointer flex items-center justify-between group transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe size={15} className="text-neutral-500 dark:text-slate-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Digital Portfolio</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 dark:text-slate-500 font-mono">devistiak.eu.cc</span>
                </a>

                {/* Support link */}
                <a
                  href="https://www.supportkori.com/istiakrahman15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-violet-500/30 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white cursor-pointer flex items-center justify-between group shadow-md shadow-violet-500/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart size={14} className="fill-current text-white animate-pulse" />
                    <span className="text-xs font-bold">Support My Work</span>
                  </div>
                  <span className="text-[10px] text-violet-200 font-bold uppercase tracking-wider">Buy a Coffee</span>
                </a>
              </div>
            </div>

            {/* Vision Quote Card */}
            <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm text-center flex flex-col gap-2">
              <span className="text-xl font-bold font-serif text-violet-600 dark:text-violet-400">“</span>
              <p className="text-xs italic text-neutral-500 dark:text-slate-400 leading-relaxed -mt-1">
                Perfect layouts, pixel-perfect responsiveness, and zero friction — the baseline of premium modern web engineering.
              </p>
              <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-widest mt-1 block">Aesthetic Mantra</span>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
