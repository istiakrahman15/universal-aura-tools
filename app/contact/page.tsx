"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ToastContainer } from "@/components/ToastContainer";
import { useAppState } from "@/lib/app-state-context";
import { motion } from "motion/react";
import { Mail, MessageSquare, Send, ArrowLeft, Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const { showToast } = useAppState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Feedback",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact — Universal Aura Suite";
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast("Please provide your name", "error");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      showToast("Please provide a valid email address", "error");
      return;
    }
    if (!formData.message.trim()) {
      showToast("Please enter your message text", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Message transmitted successfully!", "success");
      setFormData({
        name: "",
        email: "",
        subject: "Feedback",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-slate-300 transition-colors duration-200 relative overflow-hidden">
      <Navbar />
      <CommandPalette />
      <ToastContainer />

      <main id="contact-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-8 relative z-10">
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
              Get in Touch
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1 leading-tight">
            Contact Space Control
          </h1>
          <p className="text-sm text-neutral-500 dark:text-slate-400">
            Have feature suggestions, custom layout queries, or issues? Send a secure ping.
          </p>
        </div>

        {/* Form & Support columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
          
          {/* Support options column (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-400 dark:text-slate-500 flex items-center gap-2">
                <Sparkles size={14} className="text-violet-500" />
                Workstation Support
              </h3>
              <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
                Need priority assistance or commercial licensing for custom modules? Our lead architect is ready to answer.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-slate-400 flex items-center justify-center">
                    <Mail size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider">Email</span>
                    <a href="mailto:istiakrahman.official@gmail.com" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                      istiakrahman.official@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-slate-400 flex items-center justify-center">
                    <MessageSquare size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider">Support Hub</span>
                    <a href="https://www.supportkori.com/istiakrahman15" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
                      Support Kori Profile <Heart size={10} className="fill-current text-rose-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 dark:bg-white/5 flex flex-col gap-3">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">Response standard</span>
              <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
                Typical reply window for commercial licensing is within 24 standard working hours. Code submissions should be directed to the GitHub repository.
              </p>
            </div>
          </div>

          {/* Form column (7 cols) */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl shadow-neutral-900/[0.02] backdrop-blur-sm flex flex-col gap-5">
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Istiak Rahman"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/15 bg-white dark:bg-black/20 focus:border-violet-500 dark:focus:border-violet-500 outline-none text-xs transition-colors font-medium text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/15 bg-white dark:bg-black/20 focus:border-violet-500 dark:focus:border-violet-500 outline-none text-xs transition-colors font-medium text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/15 bg-white dark:bg-black/20 focus:border-violet-500 dark:focus:border-violet-500 outline-none text-xs transition-colors font-medium text-neutral-800 dark:text-white cursor-pointer"
                >
                  <option value="Feedback">General Feedback</option>
                  <option value="Feature Request">New Feature Request</option>
                  <option value="Bug Report">Technical Bug Report</option>
                  <option value="Licensing">Commercial Licensing</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider">Message Text</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your request in detail..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/15 bg-white dark:bg-black/20 focus:border-violet-500 dark:focus:border-violet-500 outline-none text-xs transition-colors font-medium text-neutral-800 dark:text-white resize-none leading-relaxed"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Transmitting secure signal...</span>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
