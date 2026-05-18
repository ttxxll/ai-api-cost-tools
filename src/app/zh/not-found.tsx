import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFoundZh() {
  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-xl font-semibold text-white mb-2">页面未找到</h2>
          <p className="text-sm text-gray-500 mb-8">
            您访问的页面不存在或已被移动。
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/zh"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors"
            >
              返回首页
            </Link>
            <Link
              href="/zh/ai-model-price-comparison"
              className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-sm font-medium rounded-xl border border-white/[0.08] transition-colors"
            >
              模型对比
            </Link>
          </div>
        </div>
      </main>
      <Footer locale="zh" />
    </>
  );
}
