'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { tools } from '@/lib/content/tools';

interface HeaderProps {
  locale?: 'en' | 'zh';
}

export default function Header({ locale = 'en' }: HeaderProps) {
  const pathname = usePathname();
  const isZh = locale === 'zh' || pathname === '/zh' || pathname.startsWith('/zh/');
  const languageHref = isZh
    ? pathname.replace(/^\/zh(?=\/|$)/, '') || '/'
    : `/zh${pathname}`;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={isZh ? '/zh' : '/'}
            className="text-xl font-bold gradient-text-primary"
          >
            {isZh ? 'AI API 成本工具箱' : 'AI API Cost Tools'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={isZh ? '/zh' : '/'}
              className={`text-sm transition-colors ${
                pathname === (isZh ? '/zh' : '/')
                  ? 'text-purple-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {isZh ? '首页' : 'Home'}
            </Link>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                {isZh ? '工具' : 'Tools'} ▾
              </button>
              <div className="absolute top-full left-0 mt-2 bg-[#111827]/95 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/20 rounded-xl py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`${isZh ? '/zh' : ''}/${tool.slug}`}
                    className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    {tool.icon}{' '}
                    {isZh ? getToolNameZh(tool.id) : getToolNameEn(tool.id)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Language Switcher */}
            <Link
              href={languageHref}
              className="text-sm text-gray-400 hover:text-white px-3 py-1.5 border border-white/[0.08] rounded-lg hover:border-white/[0.15] transition-all"
            >
              {isZh ? 'EN' : '中文'}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-white/[0.06] pt-4 space-y-2">
            <Link
              href={isZh ? '/zh' : '/'}
              className="block text-sm text-gray-400 hover:text-white py-2"
              onClick={() => setMobileOpen(false)}
            >
              {isZh ? '首页' : 'Home'}
            </Link>
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`${isZh ? '/zh' : ''}/${tool.slug}`}
                className="block text-sm text-gray-400 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {tool.icon}{' '}
                {isZh ? getToolNameZh(tool.id) : getToolNameEn(tool.id)}
              </Link>
            ))}
            <Link
              href={languageHref}
              className="block text-sm text-gray-400 hover:text-white py-2"
              onClick={() => setMobileOpen(false)}
            >
              {isZh ? 'English' : '中文'}
            </Link>
          </div>
        )}
      </div>
    </header>
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

function getToolNameZh(id: string): string {
  const names: Record<string, string> = {
    token: 'Token 成本计算器',
    claude: 'Claude API 计算器',
    gpt: 'GPT API 计算器',
    gemini: 'Gemini API 计算器',
    deepseek: 'DeepSeek API 计算器',
    comparison: '模型价格对比',
    budget: '预算规划器',
    monthly: '月成本计算器',
    batch: '批量成本估算器',
  };
  return names[id] || id;
}
