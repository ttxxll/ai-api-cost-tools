import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 模型价格对比 - 比较 Claude、GPT、Gemini、DeepSeek",
  description: "横向比较 Claude、GPT、Gemini、DeepSeek 各模型的 API 定价。免费对比工具。",
  keywords: ["AI 模型价格对比", "AI API 价格比较", "比较 AI 模型", "最便宜的 AI API"],
  alternates: {
    canonical: "https://aiapicost.tools/zh/ai-model-price-comparison",
    languages: {
      en: "https://aiapicost.tools/ai-model-price-comparison",
      zh: "https://aiapicost.tools/zh/ai-model-price-comparison",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
