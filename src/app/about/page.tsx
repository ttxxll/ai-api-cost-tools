import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { tools } from '@/lib/content/tools';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AI API Cost Tools — free calculators helping developers estimate and compare AI API costs across major providers.',
  alternates: {
    canonical: 'https://aiapicost.tools/about',
    languages: { en: 'https://aiapicost.tools/about', zh: 'https://aiapicost.tools/zh/about' },
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">About AI API Cost Tools</h1>
          <p className="text-sm text-gray-500 mb-10">Helping developers make informed AI cost decisions</p>

          <div className="space-y-10 text-gray-400 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">What We Do</h2>
              <p className="mb-3">
                AI API Cost Tools is a free, open resource for developers, product managers, and
                technical teams who need to understand and plan for AI API costs. As the AI landscape
                grows more complex with dozens of providers and hundreds of models, comparing pricing
                across providers has become a real challenge.
              </p>
              <p>
                We simplify this process by providing a unified interface to estimate costs for
                major AI providers including OpenAI, Anthropic, Google, DeepSeek, Mistral, xAI,
                Meta, and others. Our tools support multiple input units (tokens, words, characters)
                and help you understand the cost implications of different usage patterns.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">Our Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/${tool.slug}`}
                    className="glass-card p-4 hover:border-white/[0.12] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{tool.icon}</span>
                      <span className="font-medium text-white text-sm">{getToolNameEn(tool.id)}</span>
                    </div>
                    <p className="text-xs text-gray-500">{getToolDescEn(tool.id)}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">How It Works</h2>
              <p className="mb-3">
                Our pricing data comes from OpenRouter&apos;s official Models endpoint. The data is
                synchronized into this static site periodically to ensure reasonable accuracy while
                maintaining fast load times.
              </p>
              <p>
                All calculations happen directly in your browser — we do not store your input
                data or calculation results on our servers. This means your cost estimates are
                private and the tool works without any account or login.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">Why We Built This</h2>
              <p className="mb-3">
                When we started working with AI APIs, we found it difficult to compare costs
                across providers. Each provider has different pricing structures, tokenization
                methods, and billing models. Spreadsheets worked, but they became outdated
                quickly as prices changed.
              </p>
              <p>
                We built this tool to solve our own problem and decided to make it freely
                available to the developer community. Whether you&apos;re a solo developer evaluating
                which model to use, or a technical lead planning infrastructure costs for your
                team, we hope these tools save you time and help you make better decisions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">Data Sources</h2>
              <p className="mb-3">
                Model pricing data is sourced from OpenRouter&apos;s official Models endpoint and
                generated into the static site. No runtime pricing API is required for normal use.
              </p>
              <p>
                We are not affiliated with any AI provider. All provider names and trademarks
                belong to their respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
              <p>
                Have questions, suggestions, or feedback? We&apos;d love to hear from you.
                Reach us at{' '}
                <a href="mailto:contact@aiapicost.tools" className="text-purple-400 hover:text-purple-300">
                  contact@aiapicost.tools
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function getToolNameEn(id: string): string {
  const names: Record<string, string> = {
    token: 'Token Cost Calculator',
    claude: 'Claude API Calculator',
    gpt: 'GPT API Calculator',
    gemini: 'Gemini API Calculator',
    deepseek: 'DeepSeek API Calculator',
    comparison: 'Model Comparison',
    budget: 'Budget Planner',
    monthly: 'Monthly Cost Calculator',
    batch: 'Batch Cost Estimator',
  };
  return names[id] || id;
}

function getToolDescEn(id: string): string {
  const descs: Record<string, string> = {
    token: 'Estimate input and output token costs across AI models.',
    claude: 'Estimate costs for Anthropic Claude API calls including Sonnet, Opus, and Haiku models.',
    gpt: 'Calculate OpenAI GPT API costs for GPT-4o, GPT-5, and other models.',
    gemini: 'Estimate Google Gemini API pricing for Flash and Pro models.',
    deepseek: 'Calculate DeepSeek API costs with cache hit rate support.',
    comparison: 'Compare pricing across all major AI providers side by side.',
    budget: 'Plan your token budget for AI-powered applications.',
    monthly: 'Estimate monthly AI API costs based on daily usage patterns.',
    batch: 'Calculate costs for batch API processing workloads.',
  };
  return descs[id] || '';
}
