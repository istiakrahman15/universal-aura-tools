import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import { AppStateProvider } from '@/lib/app-state-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Universal Aura Tools — Premium AI-Powered Tool Suite',
  description: 'An elite, blazingly fast suite of online developer, text, math, image, and AI-powered tools crafted for high-productivity workflows.',
  metadataBase: new URL('https://universal-aura-suite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Universal Aura Tools — Premium AI-Powered Tool Suite',
    description: 'An elite, blazingly fast suite of online developer, text, math, image, and AI-powered tools crafted for high-productivity workflows.',
    url: 'https://universal-aura-suite.com',
    siteName: 'Universal Aura Tools',
    images: [
      {
        url: 'https://universal-aura-suite.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Universal Aura Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Aura Tools — Premium AI-Powered Tool Suite',
    description: 'An elite, blazingly fast suite of online developer, text, math, image, and AI-powered tools crafted for high-productivity workflows.',
    images: ['https://universal-aura-suite.com/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data for search engine optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Universal Aura Tools",
    "url": "https://universal-aura-suite.com",
    "description": "An elite suite of online developer, text, math, image, and AI-powered tools.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "creator": {
      "@type": "Person",
      "name": "Istiak Rahman",
      "url": "https://devistiak.eu.cc"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-neutral-50 text-neutral-950 dark:bg-[#030303] dark:text-slate-200 transition-colors duration-200 antialiased font-sans relative overflow-x-hidden min-h-screen">
        {/* Sleek Interface Ambient Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-violet-600/10 dark:bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <AppStateProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
