"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { ArrowLeft, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Terms of Service — Universal Aura Suite";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="terms-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
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
              <Scale size={11} /> Agreements & Terms
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-semibold font-mono text-neutral-400 dark:text-slate-500 uppercase tracking-wider">
            Last Updated: July 20, 2026
          </p>
        </div>

        {/* Narrative / Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none flex flex-col gap-6 text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">
          
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">1. Terms Acceptance</h2>
            <p>
              By accessing, browsing, or executing scripts within the <strong>Universal Aura Suite</strong>, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">2. Permitted Use & Code License</h2>
            <p>
              Aura Suite is licensed under the terms of the standard <strong>MIT License</strong>. You are permitted to use, modify, distribute, and compile our components and services for personal, educational, or commercial workloads.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">3. AI Service Provision & Rate Limits</h2>
            <p>
              Generative outputs provided by our AI assistants are powered by Google Gemini APIs. Users must not abuse our proxy routing with high-volume bots or scraping queries. We reserve the right to apply client-side rate limiters or require API configuration keys in high-traffic scenarios.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">4. Disclaimer of Warranty</h2>
            <p>
              THE WORKSPACE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">5. Adjustments</h2>
            <p>
              The Lead Architect reserves the right to modify these terms as needed. Continued interaction with the site constitutes active acceptance of any changes made.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
