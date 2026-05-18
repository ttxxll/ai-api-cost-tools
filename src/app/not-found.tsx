import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0B0F19] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-xl font-semibold text-white mb-2">Page Not Found</h2>
          <p className="text-sm text-gray-500 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/ai-model-price-comparison"
              className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-sm font-medium rounded-xl border border-white/[0.08] transition-colors"
            >
              Compare Models
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
