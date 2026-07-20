"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { ArrowLeft, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Privacy Policy — Universal Aura Suite";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="privacy-content" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
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
              <Shield size={11} /> Legal & Compliance
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-semibold font-mono text-neutral-400 dark:text-slate-500 uppercase tracking-wider">
            Last Updated: July 20, 2026
          </p>
        </div>

        {/* Narrative / Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none flex flex-col gap-6 text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">
          
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">1. Core Privacy Standard</h2>
            <p>
              Your privacy is of utmost importance to us. The <strong>Universal Aura Suite</strong> is architected as an offline-first workspace. Nearly all calculations, formats, conversions, and cryptographic operations occur entirely within your web browser client.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">2. Data We Process</h2>
            <p>
              We do not collect, store, or transmit your personal input data. When you paste strings, upload images, or calculate values, that information is processed locally using browser-native APIs and variables.
            </p>
            <p>
              For AI-powered features (e.g., AI Summarizer, AI Translator, AI Writer, and Code Explainer), the text you submit is sent to Google Gemini APIs over secure, encrypted SSL tunnels. These operations are proxied via server-only routes to ensure no client credentials leak.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">3. Local Caches & Persistence</h2>
            <p>
              Aura utilizes browser storage (such as <code>localStorage</code>) to record and display user stats, recently loaded categories, personal favorite selections, and historic action logs. This data remains completely contained within your local system sandbox. You may purge this cache at any time using standard browser settings.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">4. Third-Party Services</h2>
            <p>
              Our application routes call Google Gemini APIs for natural language models. Please refer to Google GenAI and Google Cloud Privacy policies for more details about data collection and security.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">5. Contact and Inquiries</h2>
            <p>
              If you have questions regarding our compliance or localized client processing, reach out via the secure contact channel at <a href="mailto:istiakrahman.official@gmail.com" className="text-violet-600 dark:text-violet-400 hover:underline">istiakrahman.official@gmail.com</a>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
