'use client';

import { useState, useRef } from 'react';
import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import LiveComparisonCalculator from '@/components/calculators/LiveComparisonCalculator';
import AdPlaceholder from '@/components/ads/AdPlaceholder';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getModelById } from '@/lib/data/modelPricing';
import type { CustomModelData } from '@/lib/calculators/apiCost';

export default function Home() {
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
      <Header />
      <main className="flex-1 bg-[#0B0F19] relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orb bg-orb-purple animate-pulse-slow pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orb bg-orb-cyan animate-pulse-slow pointer-events-none" style={{ animationDelay: '3s' }} />

        {/* Hero Section — no animation, renders immediately */}
        <section className="relative border-b border-white/[0.04] py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              AI API Cost Calculator & Token Cost Calculator
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Estimate token costs and compare LLM API pricing — Claude, GPT, Gemini, DeepSeek, Mistral, Grok
            </p>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Free API cost calculator and token cost calculator for developers and teams planning AI budgets.
            </p>
          </div>
        </section>

        {/* Ad Placeholder - Top */}
        <div className="py-4 px-4">
          <AdPlaceholder slot="top-banner" format="horizontal" className="mx-auto max-w-6xl" />
        </div>

        {/* Calculator Section — no animation */}
        <section ref={calculatorRef} className="relative py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">Token Cost Calculator & API Cost Calculator</h2>
            <ApiCostCalculator
              key={`${selectedModelId || 'default'}-${customModel ? 'custom' : 'known'}`}
              selectedModelId={selectedModelId}
              customModel={customModel}
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="relative border-t border-white/[0.04] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">How It Works</h2>
            <p className="text-sm text-gray-500 text-center mb-10 max-w-xl mx-auto">
              Get accurate token cost and AI API cost estimates in three simple steps
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Select a Model',
                  desc: 'Choose from 18+ AI models across OpenAI, Anthropic, Google, DeepSeek, Mistral, and xAI. Each model shows its per-token pricing.',
                },
                {
                  step: '2',
                  title: 'Enter Your Usage',
                  desc: 'Input your expected token counts for input and output. You can specify in tokens, words, or characters — we handle the conversion.',
                },
                {
                  step: '3',
                  title: 'See Your Costs',
                  desc: 'Instantly see per-call, daily, and monthly cost estimates. Compare across models to find the most cost-effective option for your use case.',
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
              <h2 className="text-xl font-bold text-white">Live Model Pricing</h2>
              <span className="text-[10px] text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.06]">
                via LiteLLM
              </span>
            </div>
            <LiveComparisonCalculator onSelectModel={handleSelectModel} />
          </div>
        </section>

        {/* Features */}
        <section className="relative border-t border-white/[0.04] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">Why Use Our Tools</h2>
            <p className="text-sm text-gray-500 text-center mb-10 max-w-xl mx-auto">
              Built for developers who need fast, accurate AI cost estimates
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '📊', title: '18 Models', desc: 'All major providers in one place' },
                { icon: '⚡', title: 'Real-time', desc: 'Instant calculations as you type' },
                { icon: '🔄', title: 'Multi-unit', desc: 'Tokens, words, or characters' },
                { icon: '💰', title: '100% Free', desc: 'No registration required' },
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
            <h2 className="text-2xl font-bold text-white mb-3 text-center">Supported AI Providers</h2>
            <p className="text-sm text-gray-500 text-center mb-10 max-w-xl mx-auto">
              Compare pricing across the most popular AI API providers
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'OpenAI', models: 'GPT-4o, GPT-5, o3', desc: 'Leading provider with versatile models for text, code, and multimodal tasks.' },
                { name: 'Anthropic', models: 'Claude 4.7, Sonnet, Opus', desc: 'Known for safety-focused models with strong reasoning and long context windows.' },
                { name: 'Google', models: 'Gemini 3.1 Flash, Pro', desc: 'High-performance models with competitive pricing and large context support.' },
                { name: 'DeepSeek', models: 'DeepSeek V4', desc: 'Cost-effective models with strong coding capabilities and cache discounts.' },
                { name: 'Mistral', models: 'Mistral Large, Medium', desc: 'European AI provider offering efficient models for various use cases.' },
                { name: 'xAI', models: 'Grok 3, Grok 3 Mini', desc: 'Elon Musk\'s AI venture offering real-time knowledge integration.' },
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
            <h2 className="text-2xl font-bold text-white mb-3 text-center">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500 text-center mb-10">
              Common questions about our AI API cost calculator
            </p>
            <div className="space-y-4">
              {[
                {
                  q: 'How accurate are the cost estimates?',
                  a: "Our pricing data comes from LiteLLM's open model pricing dataset and is refreshed regularly. The calculations are mathematically precise based on the pricing data we have. However, providers may update their pricing at any time, so we recommend verifying with official documentation before making financial decisions.",
                },
                {
                  q: 'Which AI providers do you support?',
                  a: 'We support major providers including OpenAI, Anthropic (Claude), Google (Gemini), DeepSeek, Mistral, xAI (Grok), Meta (Llama), and Cohere. We continuously add new models as they become available.',
                },
                {
                  q: 'What is the difference between input and output tokens?',
                  a: 'Input tokens are the text you send to the model (your prompt), while output tokens are the text the model generates in response. Most providers charge different rates for input vs output tokens, with output typically being 2-5x more expensive.',
                },
                {
                  q: 'Can I compare costs across different providers?',
                  a: 'Yes! Our comparison table lets you see pricing for all supported models side by side. You can sort by input price, output price, or total cost per call to find the most cost-effective option.',
                },
                {
                  q: 'Do you store my calculation data?',
                  a: 'No. All calculations happen directly in your browser. We do not store any of your input data, token counts, or calculation results on our servers.',
                },
                {
                  q: 'Is this tool free to use?',
                  a: 'Yes, completely free. No registration, no hidden fees, no usage limits. We support the site through advertising.',
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
      <Footer />
    </>
  );
}
