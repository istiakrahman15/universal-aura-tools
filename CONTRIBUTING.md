# Contributing to Universal Aura Suite

First off, thank you for taking the time to contribute! To ensure a seamless collaboration and clean, stable workspace, we enforce strict code quality guidelines.

## 🛠️ General Contribution Guidelines

1. **Keep it Clean & Consistent:** Every page and utility widget must strictly inherit variables from the **Sleek Interface Design System** (Border-radius, typography pairings, color palette tokens).
2. **Never Mix Styling Metaphor:** Use Tailwind CSS utility classes exclusively. Inline styles or separate custom CSS files are strictly forbidden.
3. **TypeScript Excellence:** No `any` types. All components, utility handlers, and hook state variables must carry precise interface definitions.
4. **Pristine Performance:** Avoid unnecessary component renders. Ensure event handlers and heavy callback routines are stabilized or memoized properly.

---

## 🎨 Code Style and Quality Rules

### 1. File Naming Conventions
* Reusable UI components should reside in `/components` (PascalCase: `CommandPalette.tsx`, `Footer.tsx`).
* Workstation widgets reside in `/components/tools` (PascalCase: `JsonFormatter.tsx`).
* State structures, API calls, and context providers reside in `/lib` (kebab-case: `app-state-context.tsx`).

### 2. React Best Practices
* Always implement **Functional Components** with explicit destructured props.
* If a file uses client-side hooks (`useState`, `useEffect`, `useRef`), write `"use client";` at the very top of the file.
* Always define stable dependency arrays in `useEffect` to prevent infinite loops.

### 3. Tailwind Formatting Rules
* Always write Tailwind classes in a logical sequence: Layout -> Flex/Grid -> Spacing (padding, margins) -> Sizing (width, height) -> Typography -> Colors -> Borders & Effects -> Transitions & Animations.
* Avoid redundant class strings; use `@/lib/utils` `cn()` helpers where dynamic conditional values are required.

---

## 🚦 Submit Pull Request Checklist

Before submitting a Pull Request, please run:

```bash
# Run lint tests
npm run lint

# Compile and build production-ready files
npm run build
```

Ensure no ESLint warnings, TypeScript errors, or build compile failures are present.
