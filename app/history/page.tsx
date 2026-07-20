"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { useRouter } from "next/navigation";
import { History, Search, ArrowLeft, Trash2, Download, RefreshCw, X } from "lucide-react";

export default function HistoryPage() {
  const { history, clearHistory, deleteHistoryItem, showToast } = useAppState();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Activity History — Universal Aura Suite";
  }, []);

  const filteredHistory = history.filter(
    (item) =>
      item.toolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadBackup = () => {
    if (history.length === 0) {
      showToast("No history data to download", "error");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aura_suite_history_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("History backup downloaded successfully", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="history-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
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
          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <>
                <button
                  id="download-history-btn"
                  onClick={handleDownloadBackup}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-xs font-bold text-neutral-700 dark:text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} />
                  Backup JSON
                </button>
                <button
                  id="clear-all-history-btn"
                  onClick={() => {
                    clearHistory();
                    showToast("Activity history cleared", "info");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={13} />
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold font-mono text-violet-600 dark:text-violet-400 uppercase tracking-widest bg-violet-600/10 dark:bg-violet-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <History size={11} /> Timeline Logs
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Activity History Logs
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            A secured, non-shared, completely localized log tracking your widget actions and outputs.
          </p>
        </div>

        {/* Search */}
        {history.length > 0 && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-slate-500" size={15} />
            <input
              id="history-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter log history by keyword..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm outline-none focus:border-violet-500 dark:focus:border-violet-500 text-xs transition-all font-semibold"
            />
          </div>
        )}

        {/* History Log List */}
        {filteredHistory.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex items-start justify-between gap-4 hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-xl bg-violet-600/10 dark:bg-white/5 text-violet-700 dark:text-violet-300 shrink-0">
                    <History size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-xs text-neutral-900 dark:text-white">
                        {item.toolName}
                      </h3>
                      <span className="text-[10px] text-neutral-400 dark:text-slate-500 font-medium">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <button
                  id={`delete-log-${item.id}`}
                  onClick={() => {
                    deleteHistoryItem(item.id);
                    showToast("Log entry deleted", "info");
                  }}
                  className="p-1.5 rounded-lg border border-neutral-150 dark:border-white/5 bg-transparent hover:bg-red-500/10 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                  aria-label="Delete log entry"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-white/30 dark:bg-white/[0.01]">
            <History className="text-neutral-300 dark:text-slate-700 mb-2" size={36} />
            <span className="text-sm font-bold text-neutral-400">No log events recorded</span>
            <span className="text-xs text-neutral-500 max-w-xs mt-1 leading-relaxed">
              {history.length > 0
                ? "Try adjusting your search query."
                : "Logs are updated dynamically as you write, convert, compress, and run suite algorithms."}
            </span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
