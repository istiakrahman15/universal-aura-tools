# Product Requirements Document (PRD) — Universal Aura Suite

## 1. Product Overview
The **Universal Aura Suite** is a premium, single-screen-first command workstation containing over 19+ context-aware developer and content utilities. It provides instant access to cryptographic tools, text cleaners, image compressors, code explainers, and AI copywriters within a high-fidelity visual interface.

---

## 2. Updated Design System (Sleek Interface Specification)

This design system specifies the visual language, layout structure, and aesthetic variables modeled after the premium **Sleek Interface** reference image. It guides the presentation of the unified dashboard and interactive utility workspaces.

### 2.1. Color Palette

The suite utilizes a dual-theme scheme (defaulting to dark obsidian for that high-tech workspace aesthetic, with a polished light slate alternative).

| Token | Light Mode Value | Dark Mode Value | Usage / Semantic Role |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#fafafa` (Neutral 50) | `#030303` (Obsidian Black) | Base page background |
| **Card / Glass Base** | `rgba(255, 255, 255, 0.65)` | `rgba(10, 10, 10, 0.4)` | Bento cards, containers |
| **Borders** | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.06)` | Containers and card outlines |
| **Interactive Borders** | `rgba(120, 120, 120, 0.2)` | `rgba(255, 255, 255, 0.1)` | Inputs, buttons, and inactive tabs |
| **Primary Accent (Gradient)**| `from-violet-600 to-blue-500` | `from-violet-500 to-blue-500` | Primary buttons, active cards, focus states |
| **Secondary Accent** | `#8b5cf6` (Violet 500) | `#a78bfa` (Violet 400) | Selected states, feature tags |
| **Text Primary** | `#171717` (Neutral 900) | `#cbd5e1` (Slate 300) | Headings, body copies |
| **Text Secondary** | `#737373` (Neutral 500) | `#94a3b8` (Slate 400) | Descriptions, metadata, subtitles |
| **Muted Labels** | `#a3a3a3` (Neutral 400) | `#64748b` (Slate 500) | Icons, keyboard shortcuts, placeholders |

---

### 2.2. Typography Scale

The font pairing creates a balance of professional layout rhythm and high-tech utility:
* **Primary Sans-Serif:** **Inter** (for UI components, buttons, and body descriptions).
* **Display / Headings:** **Space Grotesk** or **Outfit** (tight letter-spacing, tracking-tight, for major headers and tool title categories).
* **Technical Monospace:** **JetBrains Mono** or **Fira Code** (used for code editors, numeric status text, and developer readouts).

#### Scale Matrix:
* **Hero Display Heading:** `text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight`
* **Card Heading:** `text-sm font-bold tracking-tight text-neutral-800 dark:text-slate-100`
* **Body / Descriptions:** `text-xs leading-relaxed text-neutral-500 dark:text-slate-400`
* **Status / Mono Labels:** `text-[10px] font-bold font-mono tracking-wider uppercase`

---

### 2.3. Layout & Desktop-First Grid Hierarchy

#### 2.3.1. Sidebar Structure
* **Sidebar Mode:** Collapsible sidebar layout with dual states.
* **Expanded Width:** `w-64` (256px) or `w-72` (288px) for comfortable list reading and tool group categorization.
* **Collapsed Width:** `w-16` (64px) to `w-20` (80px) focusing purely on line-art icons.
* **Style:** Frameless glass panel (`border-r border-white/5 bg-black/20 backdrop-blur-md`).

#### 2.3.2. Top Navigation (Sticky Header)
* **Height:** `h-16` (64px).
* **Visual Styling:** `sticky top-0 bg-white/70 dark:bg-black/40 backdrop-blur-md border-b border-neutral-200/50 dark:border-white/5`.
* **Components:** Left-aligned brand-logo box (gradient icon background), center-aligned quick search pill, and right-aligned action elements (theme toggles, session history, profile).

#### 2.3.3. Bento Grid System
The main workspace dashboard is structured around an adaptive grid with responsive gap scales:
* **Grid Breakpoints:**
  * **Desktop (xl):** 4 Columns (`grid-cols-4 gap-6`)
  * **Desktop/Laptop (lg):** 3 Columns (`grid-cols-3 gap-6`)
  * **Tablet (md):** 2 Columns (`grid-cols-2 gap-5`)
  * **Mobile (sm):** 1 Column (`grid-cols-1 gap-4`)

---

### 2.4. Card Style & Glassmorphism

Cards represent the atomic interface element of the suite:
* **Background Fill:** Transparent glassmorphic backdrop. Light: `bg-white/60`, Dark: `bg-white/5`.
* **Border:** Thin, high-contrast outer stroke (`border border-neutral-200/80 dark:border-white/10`).
* **Border Radius:** Softened corner structures (`rounded-2xl` for cards, `rounded-xl` for inner controls/inputs, `rounded-full` for status badges/pills).
* **Shadow Specification:** Soft-diffused ambient shadow layer to replace default heavy drop-shadows:
  * **Light Shadow:** `shadow-xl shadow-neutral-900/[0.02]`
  * **Dark Glow:** Invisible dark shadows backed by a low-opacity color glow around hover states (`hover:shadow-violet-500/[0.01]`).

---

### 2.5. Micro-interactions & Hover Animations

Animations enhance spatial awareness and elevate user satisfaction:
* **Transition Standard:** `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`.
* **Card Hover Effect:**
  * Scale-up subtly (`hover:scale-[1.01]`).
  * Accent border transition (`hover:border-violet-500/40`).
  * Background gradient reveal (`hover:bg-neutral-50/80 dark:hover:bg-white/[0.08]`).
* **Active State Triggers:** Press-in tactile animation (`active:scale-[0.98]`).
* **Arrow Transition:** Footer link arrows glide outward on container hover (`group-hover:translate-x-1.5`).

---

### 2.6. Responsiveness Guidelines

* **Mobile Adaptability:** Layout folds cleanly into a single-column grid. Command search input expands to full screen width. Left sidebar converts into a hidden off-canvas drawer or bottom action bar.
* **Tablet Scaling:** Sidebar is collapsed into icon-only rails to preserve space, and the central bento-grid resolves to 2 columns with reduced horizontal margins.
* **Desktop High Density:** Sidebar extends fully with labels, and bento cells scale to show secondary metadata (e.g., usage counters and category tags).

---

## 3. Core Product Features
The Suite provides a broad set of developer-first services:
* **AI Utilities:** Summarizers, Translators, Writers, and Code Explainers.
* **Graphic Tools:** Image Compressors, Resizers, Color Pickers, and Color Palette Extractors.
* **Dev Helpers:** Base64 decoders, hash generators, JSON formatters, and regex generators.
* **General Tools:** Percentage tools, case converters, calculators, and uuid tools.
