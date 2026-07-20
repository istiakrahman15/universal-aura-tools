/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/exhaustive-deps */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HistoryItem {
  id: string; // unique event id
  toolId: string;
  toolName: string;
  timestamp: number;
  summary: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface AppState {
  theme: "light" | "dark";
  favorites: string[];
  pinned: string[];
  history: HistoryItem[];
  usageStats: { [toolId: string]: number };
  searchQuery: string;
  isCommandPaletteOpen: boolean;
  toasts: Toast[];
}

interface AppStateContextType extends AppState {
  toggleTheme: () => void;
  toggleFavorite: (toolId: string) => void;
  togglePinned: (toolId: string) => void;
  addToHistory: (toolId: string, toolName: string, summary: string) => void;
  clearHistory: () => void;
  incrementUsage: (toolId: string) => void;
  setSearchQuery: (query: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  dismissToast: (id: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // Safe initial values for server rendering (matching static fallback values)
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [pinned, setPinned] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [usageStats, setUsageStats] = useState<{ [toolId: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    
    const storedTheme = localStorage.getItem("aura-theme") as "light" | "dark" | null;
    const storedFavorites = localStorage.getItem("aura-favorites");
    const storedPinned = localStorage.getItem("aura-pinned");
    const storedHistory = localStorage.getItem("aura-history");
    const storedStats = localStorage.getItem("aura-stats");

    // Detect system theme preference if no stored theme
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedPinned) setPinned(JSON.parse(storedPinned));
    if (storedHistory) setHistory(JSON.parse(storedHistory));
    if (storedStats) setUsageStats(JSON.parse(storedStats));
  }, []);

  // Update DOM when theme changes
  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("aura-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      localStorage.setItem("aura-favorites", JSON.stringify(next));
      return next;
    });
    showToast(
      favorites.includes(toolId) ? "Removed from Favorites" : "Added to Favorites",
      "success"
    );
  };

  const togglePinned = (toolId: string) => {
    setPinned((prev) => {
      const next = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      localStorage.setItem("aura-pinned", JSON.stringify(next));
      return next;
    });
    showToast(
      pinned.includes(toolId) ? "Unpinned from dashboard" : "Pinned to dashboard",
      "info"
    );
  };

  const addToHistory = (toolId: string, toolName: string, summary: string) => {
    setHistory((prev) => {
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        toolId,
        toolName,
        timestamp: Date.now(),
        summary,
      };
      // Limit to last 50 items
      const next = [newItem, ...prev].slice(0, 50);
      localStorage.setItem("aura-history", JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("aura-history");
    showToast("Activity history cleared", "info");
  };

  const incrementUsage = (toolId: string) => {
    setUsageStats((prev) => {
      const next = { ...prev, [toolId]: (prev[toolId] || 0) + 1 };
      localStorage.setItem("aura-stats", JSON.stringify(next));
      return next;
    });
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss toast after 3 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 3000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Keyboard shortcuts (Cmd/Ctrl + K, Cmd/Ctrl + /, Ctrl + Shift + D, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const isSlash = e.key === "/";
      const isD = e.key.toLowerCase() === "d";

      // Command Palette Toggle: Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }

      // Quick Search Focus: Ctrl+/ or Cmd+/
      if ((e.metaKey || e.ctrlKey) && isSlash) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }

      // Theme Toggle: Ctrl + Shift + D
      if (e.ctrlKey && e.shiftKey && isD) {
        e.preventDefault();
        toggleTheme();
        showToast("Theme toggled via shortcut", "info");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return (
    <AppStateContext.Provider
      value={{
        theme,
        favorites,
        pinned,
        history,
        usageStats,
        searchQuery,
        isCommandPaletteOpen,
        toasts,
        toggleTheme,
        toggleFavorite,
        togglePinned,
        addToHistory,
        clearHistory,
        incrementUsage,
        setSearchQuery,
        setCommandPaletteOpen,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
