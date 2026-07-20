# Troubleshooting Guide — Universal Aura Suite

This handbook lists known issues, layout shifts, hydration warnings, and developer solutions to help resolve workspace issues quickly.

## 🚨 Common Development Challenges

### 1. "Hydration Mismatch" Errors in React
* **Symptom:** Next.js console reports mismatch warnings on client-side state loads (`aura-theme`, `aura-favorites`).
* **Why:** The server renders the page with default static props (defaulting to the Obsidian dark template), while the client-side reads values from local cache.
* **Fix:** The Universal Aura Suite utilizes `mounted` flags inside `/lib/app-state-context.tsx`. All DOM manipulations or theme allocations are postponed until the client-side mount cycle is complete. If designing custom widgets, ensure you do not access `window` or `localStorage` during initial initialization. Use `useEffect` blocks instead.

---

### 2. "Target Content Not Found" on surgical code edit commands
* **Symptom:** AI or development terminal fails with matching issues during file upgrades.
* **Why:** Code context shifted during multiple execution iterations, meaning standard code chunks do not match exactly.
* **Fix:** Run a clean `view_file` command on the precise file lines immediately before carrying out any code edits to read current exact characters and whitespace lines.

---

### 3. Gemini AI Tool returns "Key Missing" Error
* **Symptom:** Copywriters, code translators, and summarizers show connection issues.
* **Why:** The API route failed to read `process.env.GEMINI_API_KEY`.
* **Fix:** Check that your local `.env` configuration file contains your key exact string without trailing quotes or space boundaries. Verify that your server execution process has loaded local env variables correctly.

---

### 4. Layout or Card Overflows on Portable Screens
* **Symptom:** Horizontal scrollbars appear on smartphones or tablets.
* **Why:** Unconstrained grid layouts or static sizes (e.g. `w-[600px]`) are used.
* **Fix:** Wrap widgets inside fluid percentage or responsive classes (`w-full max-w-lg`). Never use hard-coded window measurement multipliers. Build for adaptive container dimensions using resizing hooks.
