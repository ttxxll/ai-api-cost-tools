import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Model Price Comparison - Compare Claude, GPT, Gemini, DeepSeek",
  description: "Compare AI API pricing across Claude, GPT, Gemini, and DeepSeek models side by side. Free comparison tool.",
  keywords: ["ai model price comparison", "ai api pricing comparison", "compare ai models", "cheapest ai api"],
  alternates: {
    canonical: "https://aiapicost.tools/ai-model-price-comparison",
    languages: {
      en: "https://aiapicost.tools/ai-model-price-comparison",
      zh: "https://aiapicost.tools/zh/ai-model-price-comparison",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
