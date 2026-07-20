# Deployment Guide — Universal Aura Suite

This manual details how to safely package, optimize, and deploy the **Universal Aura Suite** to production containers (e.g. Google Cloud Run, Vercel, Netlify).

## 🚀 Deployment Quality Gate Requirements

Before initiating a deploy command, you must verify the code has passed the production criteria:
1. **No Runtime / Compile Failures:** Execute `npm run build` locally to verify that Next.js produces clean production static files and server entry points.
2. **Zero Linter Warnings:** Run `npm run lint` to guarantee that all dependency imports are resolved and TypeScript typings are strictly evaluated.
3. **Responsive Pre-checks:** Ensure navigation grids downscale cleanly to mobile, sidebars shrink to collapsible panels, and bottom navigation rails activate on portable screens.

---

## ☁️ Deploying to Platforms

### 1. Vercel (Recommended SPA or Edge Node)
1. Install Vercel CLI or log in on the Vercel dashboard.
2. Point the builder to your repository root.
3. Enter `GEMINI_API_KEY` under **Environment Variables** (Ensure it is kept secure).
4. Vercel automatically detects the Next.js setup and builds the site using optimized bundle splitting.

### 2. Docker / Cloud Run Container (Self-Hosted Node Ecosystem)
If deploying within Cloud Run, Next.js executes as a self-contained web container.

A production-ready `Dockerfile` layout:

```dockerfile
# Build Phase
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Execution Phase
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## 🛠️ Performance Optimization Checklist

* **Image Optimization:** Ensure all background and local assets utilize next-generation formats (WebP/AVIF).
* **Font Caching:** Ensure Google Fonts are initialized via `next/font/google` in `layout.tsx` to pre-fetch and eliminate layout shifts (CLS).
* **Bundle Check:** Analyze package volumes using `@next/bundle-analyzer` periodically to avoid heavy dependencies and support lazy-loading of less frequent widgets.
