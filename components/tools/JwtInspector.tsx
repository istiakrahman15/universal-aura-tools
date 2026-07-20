/* eslint-disable react-hooks/purity */
"use client";

import React, { useState } from "react";
import { useAppState } from "@/lib/app-state-context";
import { Copy, Check, RefreshCw, ShieldAlert, AlertTriangle, ShieldCheck } from "lucide-react";

export function JwtInspector() {
  const { showToast, addToHistory } = useAppState();
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [signature, setSignature] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const inspectToken = () => {
    const rawToken = token.trim();
    if (!rawToken) {
      setError("Please enter a JWT token.");
      return;
    }

    const parts = rawToken.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT format. A standard JWT must have 3 sections separated by dots.");
      showToast("Invalid JWT Token", "error");
      return;
    }

    try {
      // Decode Header (part 1)
      const decodedHeader = JSON.parse(decodeURIComponent(escape(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")))));
      setHeader(decodedHeader);

      // Decode Payload (part 2)
      const decodedPayload = JSON.parse(decodeURIComponent(escape(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")))));
      setPayload(decodedPayload);

      // Extract Signature (part 3)
      setSignature(parts[2]);

      setError(null);
      addToHistory("jwt-inspector", "JWT Inspector", "Inspected JSON Web Token");
      showToast("JWT decoded successfully!", "success");
    } catch (err: any) {
      setError("Decoding failed. The token may be corrupted or contains invalid Base64 characters.");
      showToast("Decoding failed", "error");
    }
  };

  const copyToClipboard = (section: string, data: any) => {
    const textToCopy = typeof data === "object" ? JSON.stringify(data, null, 2) : data;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSection(section);
    showToast(`${section} copied!`, "success");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    } catch {
      return "Invalid date";
    }
  };

  const isTokenExpired = () => {
    if (!payload || !payload.exp) return null;
    const now = Math.floor(Date.now() / 1000);
    return now > payload.exp;
  };

  const loadSample = () => {
    // Generate a valid fake JWT token for preview
    const sampleHeader = { alg: "HS256", typ: "JWT" };
    const samplePayload = {
      sub: "1234567890",
      name: "Istiak Rahman",
      admin: true,
      email: "istiakrahman.official@gmail.com",
      iat: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
      exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
    };
    const b64Header = btoa(JSON.stringify(sampleHeader)).replace(/=/g, "");
    const b64Payload = btoa(JSON.stringify(samplePayload)).replace(/=/g, "");
    const mockSig = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    setToken(`${b64Header}.${b64Payload}.${mockSig}`);
    setError(null);
  };

  const clearAll = () => {
    setToken("");
    setHeader(null);
    setPayload(null);
    setSignature("");
    setError(null);
  };

  const expired = isTokenExpired();

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
        <button
          onClick={loadSample}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition-all cursor-pointer"
        >
          Load Demo Token
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-red-500/10 text-xs font-semibold text-neutral-500 hover:text-red-500 transition-all flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Input section */}
      <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center bg-neutral-50/50 dark:bg-neutral-900/30">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Paste JWT Token</span>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT encoded string here (header.payload.signature)..."
          className="w-full h-24 p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed"
        />
        <div className="p-3 bg-neutral-50/30 dark:bg-neutral-900/30 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-end">
          <button
            onClick={inspectToken}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Inspect Token & Claims
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 text-xs flex gap-3 leading-relaxed">
          <AlertTriangle size={18} className="shrink-0 animate-bounce" />
          <div>
            <span className="font-bold">Token Parsing Error</span>
            <p className="font-mono mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Decoded Layout */}
      {header && payload && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Section 1: Header */}
          <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm xl:col-span-1">
            <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 font-mono">HEADER: ALGORITHM & TYPE</span>
              <button
                onClick={() => copyToClipboard("Header", header)}
                className="text-xs text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                {copiedSection === "Header" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="p-4 flex-1 bg-red-500/[0.01] dark:bg-red-500/[0.02]">
              <pre className="text-sm font-mono text-red-600 dark:text-red-400 leading-relaxed overflow-x-auto">
                {JSON.stringify(header, null, 2)}
              </pre>
            </div>
          </div>

          {/* Section 2: Payload */}
          <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm xl:col-span-1">
            <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-500 font-mono">PAYLOAD: DATA / CLAIMS</span>
              <button
                onClick={() => copyToClipboard("Payload", payload)}
                className="text-xs text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                {copiedSection === "Payload" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>
            <div className="p-4 flex-1 bg-violet-500/[0.01] dark:bg-violet-500/[0.02]">
              <pre className="text-sm font-mono text-violet-600 dark:text-violet-400 leading-relaxed overflow-x-auto">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </div>

          {/* Section 3: Signature and Metadata */}
          <div className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm xl:col-span-1">
            <div className="px-4 py-3 border-b border-neutral-150 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 font-mono">SIGNATURE / ANALYSIS</span>
            </div>
            <div className="p-4 flex flex-col gap-4">
              
              {/* Claims Details */}
              <div className="p-3.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40">
                <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-2">Claim Lifespan</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Issued At (iat):</span>
                    <span className="font-semibold font-mono">{formatDate(payload.iat)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Expires At (exp):</span>
                    <span className="font-semibold font-mono">{formatDate(payload.exp)}</span>
                  </div>
                </div>
              </div>

              {/* Expiry Analysis */}
              {expired !== null && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                  expired 
                    ? "border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400"
                    : "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {expired ? <ShieldAlert size={20} className="shrink-0" /> : <ShieldCheck size={20} className="shrink-0" />}
                  <div className="text-xs">
                    <p className="font-bold">{expired ? "Token Expired" : "Token Valid"}</p>
                    <p className="opacity-80 mt-0.5">
                      {expired ? "This token has expired and is no longer valid." : "This token is within its active lifespan."}
                    </p>
                  </div>
                </div>
              )}

              {/* Raw signature hash box */}
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Verification Signature</span>
                <p className="font-mono p-3 rounded-lg bg-neutral-100 dark:bg-neutral-950 text-neutral-400 break-all leading-tight border border-neutral-200/40 dark:border-neutral-800/40">
                  {signature}
                </p>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
