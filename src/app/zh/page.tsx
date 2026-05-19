'use client';

import { useState, useRef } from 'react';
import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import LiveComparisonCalculator from '@/components/calculators/LiveComparisonCalculator';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getModelById } from '@/lib/data/modelPricing';
import type { CustomModelData } from '@/lib/calculators/apiCost';

export default function ZhHome() {
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>();
  const [customModel, setCustomModel] = useState<CustomModelData | undefined>();
  const calculatorRef = useRef<HTMLDivElement>(null);

  function handleSelectModel(modelId: string, modelData?: { name: string; inputPricePerM: number; outputPricePerM: number }) {
    const shortId = modelId.includes('/') ? modelId.split('/').pop()! : modelId;
    const existingModel = getModelById(shortId);
    if (existingModel) {
      setSelectedModelId(shortId);
      setCustomModel(undefined);
    } else if (modelData) {
      setSelectedModelId(shortId);
      setCustomModel(modelData);
    }
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19] relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orb bg-orb-purple animate-pulse-slow pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orb bg-orb-cyan animate-pulse-slow pointer-events-none" style={{ animationDelay: '3s' }} />

        {/* Hero Section */}
        <section className="relative border-b border-white/[0.04] py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              AI API 成本计算器 & Token 成本计算器
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              估算 Token 成本并比较 Claude、GPT、Gemini、DeepSeek、Mistral、Grok 等模型的 API 定价
            </p>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              面向开发者和团队的免费 API 成本计算器与 Token 成本计算器，帮助规划 AI 预算。
            </p>
          </div>
        </section>

        {/* Ad Placeholder - Top */}
        <div className="py-4 px-4">
          <AdPlaceholder slot="top-banner" format="horizontal" className="mx-auto max-w-6xl" />
        </div>

        {/* Calculator Section */}
        <section ref={calculatorRef} className="relative py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Token 成本计算器 & API 成本计算器</h2>
            <ApiCostCalculator
              key={`${selectedModelId || 'default'}-${customModel ? 'custom' : 'known'}`}
              locale="zh"
              selectedModelId={selectedModelId}
              customModel={customModel}
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="relative border-t border-white/[0.04] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">使用方法</h2>
            <p className="text-sm text-gray-500 text-center mb-10 max-w-xl mx-auto">
              三步获取准确的 Token 成本和 AI API 成本估算
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: '选择模型',
                  desc: '从 OpenAI、Anthropic、Google、DeepSeek、Mistral 和 xAI 的 18+ 个 AI 模型中选择。每个模型都显示其每 Token 定价。',
                },
                {
                  step: '2',
                  title: '输入用量',
                  desc: '输入预期的输入和输出 Token 数量。支持 Token、单词或字符作为单位，我们自动处理转换。',
                },
                {
                  step: '3',
                  title: '查看成本',
                  desc: '即时查看单次调用、每日和每月的成本估算。跨模型比较，找到最适合您使用场景的方案。',
                },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="relative py-10 px-4 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">实时模型价格</h2>
              <span className="text-[10px] text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.06]">
                数据来自 LiteLLM
              </span>
            </div>
            <LiveComparisonCalculator locale="zh" onSelectModel={handleSelectModel} />
          </div>
        </section>

        {/* Features */}
        <section className="relative border-t border-white/[0.04] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">为什么选择我们</h2>
            <p className="text-sm text-gray-500 text-center mb-10 max-w-xl mx-auto">
              为需要快速、准确 AI 成本估算的开发者而生
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '📊', title: '18 个模型', desc: '所有主要供应商一站式比较' },
                { icon: '⚡', title: '实时计算', desc: '输入即出结果' },
                { icon: '🔄', title: '多种单位', desc: 'Token、单词、字符' },
                { icon: '💰', title: '完全免费', desc: '无需注册' },
              ].map((feature, i) => (
                <div key={i} className="text-center glass-card p-6 hover:border-white/[0.12] transition-all duration-300">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Providers */}
        <section className="relative border-t border-white/[0.04] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">支持的 AI 供应商</h2>
            <p className="text-sm text-gray-500 text-center mb-10 max-w-xl mx-auto">
              比较最受欢迎的 AI API 供应商的定价
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'OpenAI', models: 'GPT-4o, GPT-5, o3', desc: '领先供应商，提供适用于文本、代码和多模态任务的多功能模型。' },
                { name: 'Anthropic', models: 'Claude 4.7, Sonnet, Opus', desc: '以安全为导向的模型，具有强大的推理能力和长上下文窗口。' },
                { name: 'Google', models: 'Gemini 3.1 Flash, Pro', desc: '高性能模型，具有竞争力的定价和大上下文支持。' },
                { name: 'DeepSeek', models: 'DeepSeek V4', desc: '具有强大编码能力的成本效益型模型，支持缓存折扣。' },
                { name: 'Mistral', models: 'Mistral Large, Medium', desc: '欧洲 AI 供应商，为各种用例提供高效模型。' },
                { name: 'xAI', models: 'Grok 3, Grok 3 Mini', desc: 'Elon Musk 的 AI 项目，提供实时知识集成。' },
              ].map((provider, i) => (
                <div key={i} className="glass-card p-5 hover:border-white/[0.12] transition-all duration-300">
                  <h3 className="font-semibold text-white text-sm mb-1">{provider.name}</h3>
                  <p className="text-[11px] text-purple-400 font-mono mb-2">{provider.models}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{provider.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t border-white/[0.04] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">常见问题</h2>
            <p className="text-sm text-gray-500 text-center mb-10">
              关于 AI API 成本计算器的常见问题
            </p>
            <div className="space-y-4">
              {[
                {
                  q: '成本估算有多准确？',
                  a: '我们的定价数据来自 LiteLLM 并定期刷新。基于我们掌握的定价数据，计算在数学上是精确的。但供应商可能随时更新定价，因此建议在做出财务决定前以官方文档为准。',
                },
                {
                  q: '支持哪些 AI 供应商？',
                  a: '我们支持主要供应商，包括 OpenAI、Anthropic (Claude)、Google (Gemini)、DeepSeek、Mistral、xAI (Grok)、Meta (Llama) 和 Cohere。我们会持续添加新模型。',
                },
                {
                  q: '输入 Token 和输出 Token 有什么区别？',
                  a: '输入 Token 是您发送给模型的文本（即提示），输出 Token 是模型生成的回复文本。大多数供应商对输入和输出 Token 收取不同费率，输出通常贵 2-5 倍。',
                },
                {
                  q: '可以比较不同供应商的成本吗？',
                  a: '可以！我们的对比表让您可以并排查看所有支持模型的定价。您可以按输入价格、输出价格或单次调用总成本排序，找到最具性价比的选项。',
                },
                {
                  q: '你们会存储我的计算数据吗？',
                  a: '不会。所有计算直接在您的浏览器中完成。我们不会在服务器上存储您的任何输入数据、Token 数量或计算结果。',
                },
                {
                  q: '这个工具免费吗？',
                  a: '完全免费。无需注册，没有隐藏费用，没有使用限制。我们通过广告支持网站运营。',
                },
              ].map((item, i) => (
                <div key={i} className="glass-card p-5">
                  <h3 className="font-medium text-white text-sm mb-2">{item.q}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Placeholder - Bottom */}
        <div className="py-4 px-4">
          <AdPlaceholder slot="bottom-banner" format="horizontal" className="mx-auto max-w-6xl" />
        </div>
      </main>
      <Footer locale="zh" />
    </>
  );
}
