"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { WifiOff, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OfflinePage() {
  const router = useRouter();
  const { showToast } = useAppState();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    document.title = "Offline State — Universal Aura Suite";
  }, []);

  const handleRetryConnection = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      if (typeof window !== "undefined" && navigator.onLine) {
        showToast("Network restored! Re-routing...", "success");
        router.push("/");
      } else {
        showToast("System remains offline. Check your router signal.", "error");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="offline-content" className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col items-center justify-center text-center gap-6 relative z-10">
        
        {/* Animated Icon Circle */}
        <div className="w-20 h-20 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center animate-pulse border border-amber-500/20 shadow-xl shadow-amber-500/10">
          <WifiOff size={36} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-extrabold font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full">
            No secure connection
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-2 leading-tight">
            Offline Workstation State
          </h1>
          <p className="text-xs text-neutral-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed mt-1">
            We cannot establish a handshake with the remote services. Most developer tools remain active client-side, but AI utilities require an internet gateway.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          <button
            id="retry-connection-btn"
            onClick={handleRetryConnection}
            disabled={checking}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:bg-violet-600/50"
          >
            <RefreshCw size={13} className={checking ? "animate-spin" : ""} />
            <span>{checking ? "Probing system..." : "Verify Connection"}</span>
          </button>
          
          <button
            id="back-home-btn"
            onClick={() => router.push("/")}
            className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black/20 hover:bg-neutral-150 dark:hover:bg-white/5 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer text-neutral-700 dark:text-slate-300"
          >
            <Home size={13} />
            <span>Go to Home</span>
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
