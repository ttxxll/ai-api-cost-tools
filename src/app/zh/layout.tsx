import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AI API 成本计算器 & Token 成本计算器 — 免费定价工具",
    template: "%s | AI API 成本工具",
  },
  description:
    "免费的 AI API 成本计算器和 Token 成本计算器，估算 Claude、GPT、Gemini、DeepSeek、Mistral、Grok 等模型的 Token 价格、API 成本和月度预算。",
  keywords: [
    "AI API 成本计算器",
    "API 成本计算器",
    "Token 成本计算器",
    "AI Token 成本计算器",
    "Token 价格计算器",
    "Token 预算规划",
    "AI 模型价格对比",
    "Claude API 成本",
    "GPT API 价格",
    "Gemini API 价格",
    "DeepSeek API 成本",
    "LLM 成本计算器",
  ],
  openGraph: {
    title: "AI API 成本计算器 & Token 成本计算器 — 免费定价工具",
    description: "估算 Claude、GPT、Gemini、DeepSeek 等模型的 Token 成本、API 成本和月度预算。面向开发者的免费工具。",
    locale: "zh_CN",
    alternateLocale: "en_US",
  },
  alternates: {
    languages: {
      en: "https://aiapicost.tools",
      zh: "https://aiapicost.tools/zh",
    },
  },
};

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
