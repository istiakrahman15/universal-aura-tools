# Folder Structure Guide — Universal Aura Suite

This guide outlines the directory structure and organization of the **Universal Aura Suite** codebase, providing developers with clear orientation on where modules are defined.

## 📂 Project Hierarchy Map

```text
/
├── app/                        # Next.js App Router root
│   ├── api/                    # Server-side API endpoints
│   │   └── gemini/             # Proxy handler for server-side Gemini AI model calls
│   ├── dashboard/              # Workspace metrics, history and favorited views
│   │   └── page.tsx            # Main Personal Dashboard module
│   ├── developer/              # Istiak Rahman permanent developer credits page
│   │   └── page.tsx            # Full interactive developer profile interface
│   ├── tool/                   # Workbench tool details folder
│   │   └── [id]/               # Dynamic router segment for unique tools
│   │       └── page.tsx        # Render canvas and context frames for selected widget
│   ├── globals.css             # Tailwind v4 standard style directives
│   ├── layout.tsx              # Master layouts, root HTML frames, font variables
│   └── page.tsx                # Master tool explorer suite landing page
│
├── assets/                     # Design assets, static vectors & visual icons
│
├── components/                 # Shared interactive React elements
│   ├── tools/                  # The complete suite of 19+ utility files
│   │   ├── AiSummarizer.tsx    # Text simplification engines
│   │   ├── Base64.tsx          # Cryptographic translators
│   │   ├── JsonFormatter.tsx   # Developer data beautifiers
│   │   └── ...                 # Additional specialized workspace tools
│   ├── CommandPalette.tsx      # Fuzzy-search workstation navigator
│   ├── Footer.tsx              # Workspace footer & developer credits anchors
│   ├── Navbar.tsx              # Header layout containing theme dials & quick links
│   └── ToastContainer.tsx      # Micro-interaction overlay feedback popups
│
├── docs/                       # High-fidelity architectural manuals (This folder)
│   ├── DEPLOYMENT_GUIDE.md     # Production release checklists
│   ├── ENVIRONMENT_SETUP.md    # Workspace secret declarations
│   └── TROUBLESHOOTING.md      # Solution manual for development traps
│
├── hooks/                      # Custom browser React hook utilities
│   └── use-mobile.ts           # Dynamic screen width observer for responsive menus
│
├── lib/                        # Core system services & shared data structures
│   ├── app-state-context.tsx   # Centralized theme state, local cache engines, shortcuts
│   ├── tools-data.ts           # Static tool metadata declarations (IDs, icons, tags)
│   └── utils.ts                # Tailwind layout utility consolidators (cn)
│
├── metadata.json               # Native application declarations & permissions
├── package.json                # Project dependencies & operational script keys
├── tsconfig.json               # Compiler instructions for strict TypeScript type check
└── PRD.md                      # Unified Product Requirements Document
```

---

## 🎯 Modular Architecture Roles

### 1. Centralized Workspace State (`/lib/app-state-context.tsx`)
Acts as the single source of truth for layout preferences and user progress. Manages theme caching (`aura-theme`), favorite triggers (`aura-favorites`), activity logs (`aura-history`), search bindings, and application shortcuts (`Ctrl+K`, `Ctrl+/`, `Ctrl+Shift+D`).

### 2. Isolated Tool Render Core (`/components/tools/ToolRenderer.tsx`)
Takes a matched tool ID from the router query, identifies the active module, and dynamically loads the tool interface, supplying it with local action helpers and automated execution wrappers.

### 3. Server-Only Proxy (`/app/api/gemini/route.ts`)
Keeps third-party Gemini API secret keys completely isolated on the server side, ensuring no browser-level credential leakage is possible.
