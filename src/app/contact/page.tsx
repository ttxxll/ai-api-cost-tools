import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AI API Cost Tools — send us your questions, feedback, or partnership inquiries.',
  alternates: {
    canonical: 'https://aiapicost.tools/contact',
    languages: { en: 'https://aiapicost.tools/contact', zh: 'https://aiapicost.tools/zh/contact' },
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-sm text-gray-500 mb-10">We&apos;d love to hear from you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Get in Touch</h2>
                <div className="space-y-4 text-sm text-gray-400">
                  <div>
                    <h3 className="font-medium text-gray-300 mb-1">Email</h3>
                    <a href="mailto:taoxinglong94@gmail.com" className="text-purple-400 hover:text-purple-300">
                      taoxinglong94@gmail.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-300 mb-1">Response Time</h3>
                    <p>We typically respond within 1-2 business days.</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">What We Can Help With</h2>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>General questions about our tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>Reporting inaccurate pricing data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>Feature requests and suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>Bug reports and technical issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>Partnership and collaboration inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>Privacy and data-related concerns</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Is this tool really free?',
                    a: 'Yes, all our calculators are completely free to use. No registration, no hidden fees, no usage limits.',
                  },
                  {
                    q: 'How accurate is the pricing data?',
                    a: "We source pricing from LiteLLM's open model pricing dataset and refresh it regularly. However, providers may update pricing at any time, so always verify with the official provider documentation.",
                  },
                  {
                    q: 'Can I suggest a new model or provider?',
                    a: 'Absolutely! Send us an email with the model or provider you\'d like to see, and we\'ll do our best to add it.',
                  },
                  {
                    q: 'Do you store my calculation data?',
                    a: 'No. All calculations happen in your browser. We do not store any of your input data or results on our servers.',
                  },
                  {
                    q: 'Can I use this for my business?',
                    a: 'Yes, you\'re welcome to use our tools for both personal and commercial purposes. Just keep in mind that our estimates should be verified with official provider pricing.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-300 text-sm mb-1">{item.q}</h3>
                    <p className="text-xs text-gray-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
