import type { Metadata } from 'next';
import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQSection from '@/components/seo/FAQSection';

export const metadata: Metadata = {
  title: 'Token 成本计算器 - 免费 AI Token 价格估算工具',
  description:
    '使用免费的 Token 成本计算器估算 Claude、GPT、Gemini、DeepSeek、Mistral、Grok 等模型的 Token 价格、API 调用成本、每日成本和月度预算。',
  keywords: [
    'Token 成本计算器',
    'AI Token 成本计算器',
    'Token 价格计算器',
    'LLM Token 成本计算器',
    'API Token 成本计算器',
    'Claude Token 成本',
    'GPT Token 成本',
  ],
  alternates: {
    canonical: 'https://aiapicost.tools/zh/token-cost-calculator',
    languages: {
      en: 'https://aiapicost.tools/token-cost-calculator',
      zh: 'https://aiapicost.tools/zh/token-cost-calculator',
    },
  },
};

const faqItems = [
  {
    question: '什么是 Token 成本计算器？',
    answer: 'Token 成本计算器根据输入 Token、输出 Token、模型价格、请求量和每日调用次数估算 AI API 使用成本。',
  },
  {
    question: '输入 Token 和输出 Token 如何影响成本？',
    answer: '大多数 AI 供应商对输入 Token 和输出 Token 使用不同价格。输出 Token 通常更贵，因此两者都需要计算。',
  },
  {
    question: '可以计算月度 Token 成本吗？',
    answer: '可以。输入每次请求的平均 Token 数和每日调用次数，即可估算单次、每日和每月 Token 成本。',
  },
  {
    question: '是否支持自定义模型价格？',
    answer: '支持。你可以选择已有模型，也可以输入自定义模型名称、输入 Token 价格和输出 Token 价格。',
  },
];

export default function TokenCostCalculatorPageZh() {
  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orb bg-orb-purple animate-pulse-slow pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orb bg-orb-cyan animate-pulse-slow pointer-events-none" style={{ animationDelay: '3s' }} />

        <section className="relative border-b border-white/[0.04] py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Token 成本计算器
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              计算 Claude、GPT、Gemini、DeepSeek、Mistral、Grok 和自定义模型的 AI Token 成本。
            </p>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              免费估算输入 Token 成本、输出 Token 成本、单次 API 成本、每日成本和月度 AI 预算。
            </p>
          </div>
        </section>

        <section className="relative py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">AI Token 成本计算器</h2>
            <ApiCostCalculator locale="zh" />
          </div>
        </section>

        <section className="relative border-t border-white/[0.04] py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">Token 成本如何计算</h2>
            <p className="text-sm text-gray-500 text-center mb-10">
              Token 定价基于每个模型的输入和输出每百万 Token 价格。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '输入 Token', desc: '发送给模型的提示词、系统消息、工具调用和上下文。' },
                { title: '输出 Token', desc: '模型生成回复所消耗的 Token，通常比输入 Token 更贵。' },
                { title: '使用量', desc: '请求数和每日调用次数会将单次成本换算成每日和每月成本。' },
              ].map((item) => (
                <div key={item.title} className="glass-card p-6 text-center">
                  <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection title="Token 成本计算器常见问题" items={faqItems} />
        <RelatedTools currentSlug="token-cost-calculator" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
