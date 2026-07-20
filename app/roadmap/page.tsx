"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { ArrowLeft, Compass, CheckCircle, Zap, Shield, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RoadmapPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Roadmap — Universal Aura Suite";
  }, []);

  const milestones = [
    {
      quarter: "Q3 2026",
      title: "Interactive Visualization & SVG Engines",
      status: "In Progress",
      items: [
        { name: "SVG Path Editor & Optimizer", done: false },
        { name: "CSS Shadow & Border Glassmorphism Visualizer", done: false },
        { name: "Dynamic QR Code Generator & Custome Logo Overlays", done: false }
      ]
    },
    {
      quarter: "Q4 2026",
      title: "Security Hardening & Advanced Crypto Models",
      status: "Planning",
      items: [
        { name: "RSA Keypair Generator & SSH Validator", done: false },
        { name: "JWT Token Signer with Private Keys", done: false },
        { name: "Password Strength Auditor & Entropy Calculator", done: false }
      ]
    },
    {
      quarter: "Completed Milestones",
      title: "Suite Foundations & AI Integrations",
      status: "Completed",
      items: [
        { name: "19+ Unified Developer, Text, Math & Media Utilities", done: true },
        { name: "Proxy Integration for Google Gemini API Models", done: true },
        { name: "Central Local Caches & Workstation Settings Persistence", done: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="roadmap-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
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
        <div className="flex flex-col gap-2 border-b border-neutral-200/50 dark:border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Compass size={11} /> Workspace Horizons
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Workstation Roadmap
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            A transparent overview of upcoming tools, design enhancements, and system integrations.
          </p>
        </div>

        {/* Milestones rendering */}
        <div className="flex flex-col gap-8 mt-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.quarter}
              className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold font-mono text-neutral-400 dark:text-slate-500 uppercase tracking-wider">
                    {milestone.quarter}
                  </span>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white mt-0.5">
                    {milestone.title}
                  </h3>
                </div>
                <span className={`text-[9px] font-extrabold font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                  milestone.status === "In Progress"
                    ? "bg-violet-600/10 text-violet-700 dark:text-violet-300"
                    : milestone.status === "Planning"
                    ? "bg-blue-600/10 text-blue-700 dark:text-blue-300"
                    : "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"
                }`}>
                  {milestone.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5 mt-2">
                {milestone.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02]"
                  >
                    <span className="text-xs font-semibold text-neutral-700 dark:text-slate-300 flex items-center gap-2">
                      {item.done ? (
                        <CheckCircle size={14} className="text-emerald-500" />
                      ) : milestone.status === "In Progress" ? (
                        <Zap size={14} className="text-violet-500 animate-pulse" />
                      ) : (
                        <Shield size={14} className="text-neutral-400" />
                      )}
                      {item.name}
                    </span>
                    <span className="text-[10px] font-bold font-mono text-neutral-400 dark:text-slate-500 uppercase">
                      {item.done ? "Completed" : milestone.status === "In Progress" ? "In Development" : "Proposed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
