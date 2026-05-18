import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token 预算规划器 - 规划 AI API 支出",
  description: "规划 AI API 预算，计算在预算内可支持的调用次数。免费预算规划工具。",
  keywords: ["Token 预算规划", "AI API 预算", "AI 支出计算器", "Token 预算计算器"],
  alternates: {
    canonical: "https://aiapicost.tools/zh/prompt-token-budget-planner",
    languages: {
      en: "https://aiapicost.tools/prompt-token-budget-planner",
      zh: "https://aiapicost.tools/zh/prompt-token-budget-planner",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
