# Environment Setup Guide — Universal Aura Suite

This guide assists developers in establishing their local development environment for the **Universal Aura Suite** securely.

## 🛠️ Requirements & Environment Variables

The Universal Aura Suite requires a single high-security credential key to interface with generative models. This key is stored server-side.

### 1. Variables Definition Table

| Name | Source | Description | Required | Exposed to Client? |
| :--- | :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google AI Studio | Interfacing with generative copywriting & translation models. | **Yes** | **No** (Strictly Hidden) |

---

## 🚀 Setting Up Your Workspace

### Step 1: Clone the Codebase
Make sure you have Node.js (v18+) and your preferred package manager (e.g., `npm`, `yarn`, `bun`) installed.

```bash
# Clone the repository
git clone https://github.com/istiakrahman15/universal-aura-suite.git
cd universal-aura-suite
```

### Step 2: Install Base Packages
Initialize development dependencies cleanly:

```bash
npm install
```

### Step 3: Configure Local Environment File
Create a `.env` file in the root of your project directory (note: `.env` is ignored by git to keep your key secure):

```bash
touch .env
```

Add your credentials to the file as follows:

```env
# Root Workspace Environments
GEMINI_API_KEY=AIzaSyYourSecretKeyFromAiStudioHere
```

---

## 🔒 Security Best Practices

1. **Strictly Server-Side Only:** Never prefix your `GEMINI_API_KEY` with `NEXT_PUBLIC_`. In this suite, all generative models are evaluated via server-only functions (`app/api/gemini/route.ts`), preserving your keys safely behind the Cloud Run container boundaries.
2. **Never Commit Keys:** Keep your `.env` file actively tracked under `.gitignore` at all times.
3. **Local State Cleaners:** To completely clear your workspace cache or stored preferences, you can use browser inspector consoles or execute `localStorage.clear()` directly.
