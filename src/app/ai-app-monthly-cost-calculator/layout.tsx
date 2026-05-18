import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI App Monthly Cost Calculator - Estimate Your AI App Costs",
  description: "Estimate monthly costs for your AI-powered application based on users and usage patterns. Free calculator.",
  keywords: ["ai app monthly cost", "ai application cost calculator", "ai saas cost", "ai chatbot cost"],
  alternates: {
    canonical: "https://aiapicost.tools/ai-app-monthly-cost-calculator",
    languages: {
      en: "https://aiapicost.tools/ai-app-monthly-cost-calculator",
      zh: "https://aiapicost.tools/zh/ai-app-monthly-cost-calculator",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
