import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 应用月成本计算器 - 估算 AI 应用成本",
  description: "根据用户数和使用模式估算 AI 应用的月度成本。免费计算器。",
  keywords: ["AI 应用月成本", "AI 应用成本计算器", "AI SaaS 成本", "AI 聊天机器人成本"],
  alternates: {
    canonical: "https://aiapicost.tools/zh/ai-app-monthly-cost-calculator",
    languages: {
      en: "https://aiapicost.tools/ai-app-monthly-cost-calculator",
      zh: "https://aiapicost.tools/zh/ai-app-monthly-cost-calculator",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
