import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import LocaleDetector from "@/components/layout/LocaleDetector";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const GA_MEASUREMENT_ID = "G-4TX5GCJ3QT";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiapicost.tools"),
  title: {
    default: "AI API Cost Calculator & Token Cost Calculator — Free Pricing Tools",
    template: "%s | AI API Cost Tools",
  },
  description:
    "Free AI API Cost Calculator and Token Cost Calculator for Claude, GPT, Gemini, DeepSeek, Mistral, and Grok. Estimate token pricing, API costs, and monthly AI budgets.",
  keywords: [
    "ai api cost calculator",
    "api cost calculator",
    "token cost calculator",
    "ai token cost calculator",
    "token pricing calculator",
    "llm token cost calculator",
    "token budget planner",
    "ai model pricing",
    "claude api cost",
    "gpt api pricing",
    "gemini api pricing",
    "deepseek api cost",
    "llm cost calculator",
    "openai pricing calculator",
    "ai token cost estimator",
  ],
  authors: [{ name: "AI API Cost Tools" }],
  creator: "AI API Cost Tools",
  publisher: "AI API Cost Tools",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    url: "https://aiapicost.tools",
    siteName: "AI API Cost Tools",
    title: "AI API Cost Calculator & Token Cost Calculator — Free Pricing Tools",
    description:
      "Estimate token costs and API pricing across Claude, GPT, Gemini, DeepSeek, Mistral, and Grok with a free calculator for developers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI API Cost Calculator & Token Cost Calculator",
    description:
      "Estimate API costs, token pricing, and monthly AI budgets across Claude, GPT, Gemini, DeepSeek, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script
          id="web-application-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'AI API Cost Tools',
              url: 'https://aiapicost.tools',
              description: 'Free AI API Cost Calculator and Token Cost Calculator to estimate token pricing and compare API costs across Claude, GPT, Gemini, DeepSeek, Mistral, and Grok.',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              author: { '@type': 'Organization', name: 'AI API Cost Tools', url: 'https://aiapicost.tools' },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <LocaleDetector />
        {children}
      </body>
    </html>
  );
}
