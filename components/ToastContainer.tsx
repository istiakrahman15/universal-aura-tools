"use client";

import React from "react";
import { useAppState } from "@/lib/app-state-context";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, dismissToast } = useAppState();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg glass backdrop-blur-md ${
              toast.type === "success"
                ? "border-emerald-500/20 bg-emerald-50/90 dark:bg-emerald-950/25 text-emerald-800 dark:text-emerald-300"
                : toast.type === "error"
                ? "border-red-500/20 bg-red-50/90 dark:bg-red-950/25 text-red-800 dark:text-red-300"
                : "border-blue-500/20 bg-blue-50/90 dark:bg-blue-950/25 text-blue-800 dark:text-blue-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />}
              {toast.type === "error" && <AlertCircle size={18} className="shrink-0 text-red-500" />}
              {toast.type === "info" && <Info size={18} className="shrink-0 text-blue-500" />}
              <span className="text-sm font-medium leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-neutral-500/10 dark:hover:bg-neutral-500/20 transition-colors cursor-pointer shrink-0"
            >
              <X size={14} className="opacity-70 hover:opacity-100" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
