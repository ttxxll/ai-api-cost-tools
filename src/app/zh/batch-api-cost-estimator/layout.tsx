import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "批量 API 成本估算器 - 计算批量处理成本",
  description: "估算不同 AI 模型的批量 API 处理任务成本。免费批量成本计算器。",
  keywords: ["批量 API 成本", "批量处理 AI 成本", "AI 批量定价", "批量 API 价格"],
  alternates: {
    canonical: "https://aiapicost.tools/zh/batch-api-cost-estimator",
    languages: {
      en: "https://aiapicost.tools/batch-api-cost-estimator",
      zh: "https://aiapicost.tools/zh/batch-api-cost-estimator",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
