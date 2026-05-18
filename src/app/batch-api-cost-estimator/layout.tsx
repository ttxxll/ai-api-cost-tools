import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batch API Cost Estimator - Calculate Batch Processing Costs",
  description: "Estimate costs for batch API processing tasks across different AI models. Free batch cost calculator.",
  keywords: ["batch api cost", "batch processing ai cost", "ai batch pricing", "bulk api cost"],
  alternates: {
    canonical: "https://aiapicost.tools/batch-api-cost-estimator",
    languages: {
      en: "https://aiapicost.tools/batch-api-cost-estimator",
      zh: "https://aiapicost.tools/zh/batch-api-cost-estimator",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
