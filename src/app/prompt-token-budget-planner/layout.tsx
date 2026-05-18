import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Token Budget Planner - Plan Your AI API Spending",
  description: "Plan your AI API budget and calculate how many calls you can make within your budget. Free budget planning tool.",
  keywords: ["token budget planner", "ai api budget", "ai spending calculator", "token budget calculator"],
  alternates: {
    canonical: "https://aiapicost.tools/prompt-token-budget-planner",
    languages: {
      en: "https://aiapicost.tools/prompt-token-budget-planner",
      zh: "https://aiapicost.tools/zh/prompt-token-budget-planner",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
