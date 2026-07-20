"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Github, Heart, Shield, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white/40 dark:bg-black/40 border-t border-neutral-200/50 dark:border-white/5 pt-16 pb-24 md:pb-12 transition-colors duration-200 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-bold text-neutral-900 dark:text-white tracking-tight text-base">
                Aura Suite
              </span>
            </Link>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
              An elite, single-dashboard suite of 19+ beautifully animated utilities.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/istiakrahman15"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-100/80 dark:bg-white/5 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white transition-all border border-neutral-200/50 dark:border-white/10 hover:border-neutral-300 dark:hover:border-violet-500/40 cursor-pointer"
              >
                <Github size={16} />
              </a>
              <a
                href="https://devistiak.eu.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-neutral-100/80 dark:bg-white/5 text-neutral-600 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white transition-all border border-neutral-200/50 dark:border-white/10 hover:border-neutral-300 dark:hover:border-violet-500/40 cursor-pointer"
              >
                Portfolio
              </a>
            </div>
          </div>

          {/* Col 2: Workstation Core */}
          <div>
            <h3 className="font-bold text-neutral-850 dark:text-neutral-100 text-[11px] tracking-wider uppercase mb-4">
              Workspace Core
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Aura Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Activity Logs
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors font-semibold">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Directories */}
          <div>
            <h3 className="font-bold text-neutral-850 dark:text-neutral-100 text-[11px] tracking-wider uppercase mb-4">
              Taxonomy Index
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/tools" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Tools Directory
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Categories List
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Search Registry
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Roadmap Plan
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Changelog Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Info & Legal */}
          <div>
            <h3 className="font-bold text-neutral-850 dark:text-neutral-100 text-[11px] tracking-wider uppercase mb-4">
              Info & Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/developer" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors font-bold text-violet-600 dark:text-violet-400">
                  Lead Architect
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  About Suite
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/offline" className="text-neutral-500 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white transition-colors">
                  Offline Gateway
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Support */}
          <div>
            <h3 className="font-bold text-neutral-850 dark:text-neutral-100 text-[11px] tracking-wider uppercase mb-4">
              Architect Support
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-slate-400 leading-relaxed mb-4.5">
              Engineered with extreme precision. Consider supporting my open-source work.
            </p>
            <a
              href="https://www.supportkori.com/istiakrahman15"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-[10px] shadow-md shadow-violet-500/10 hover:shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer"
            >
              <Heart size={11} className="fill-current text-white animate-pulse" />
              <span>Support Istiak</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 dark:text-slate-500">
          <p>© 2026 Universal Aura Suite. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 font-medium font-mono">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span>SEO Optimized & PWA Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
