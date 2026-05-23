import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AI API Cost Tools — rules and guidelines for using our website and tools.',
  alternates: {
    canonical: 'https://aiapicost.tools/terms-of-service',
    languages: { en: 'https://aiapicost.tools/terms-of-service', zh: 'https://aiapicost.tools/zh/terms-of-service' },
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: May 17, 2026</p>

          <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using AI API Cost Tools (the &quot;Service&quot;), you accept and agree
                to be bound by these Terms of Service. If you do not agree to these terms, please
                do not use the Service. We reserve the right to modify these terms at any time,
                and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
              <p className="mb-3">
                AI API Cost Tools provides free online calculators and estimation tools for
                comparing AI API pricing across multiple providers including OpenAI, Anthropic,
                Google, DeepSeek, Mistral, xAI, and others. Our tools help developers and teams
                estimate and budget for AI API usage costs.
              </p>
              <p>
                The pricing data displayed is manually maintained from publicly available and
                official provider pricing. We make reasonable efforts to keep this data
                accurate and up-to-date, but we cannot guarantee its accuracy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Use of the Service</h2>
              <h3 className="text-base font-medium text-gray-300 mb-2">3.1 Permitted Use</h3>
              <p className="mb-3">
                You may use the Service for personal and commercial purposes related to
                estimating and planning AI API costs. The Service is provided free of charge
                and does not require registration.
              </p>
              <h3 className="text-base font-medium text-gray-300 mb-2">3.2 Prohibited Use</h3>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use automated tools to scrape or extract data from the Service in bulk</li>
                <li>Attempt to disrupt or overload our servers or infrastructure</li>
                <li>Use the Service for any unlawful purpose</li>
                <li>Misrepresent the output of our calculators as official pricing guarantees</li>
                <li>Redistribute our tools or data without attribution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Accuracy of Information</h2>
              <p className="mb-3">
                The cost estimates and pricing information provided by the Service are for
                informational and planning purposes only. While we strive for accuracy, we
                make no warranties or representations regarding:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The completeness or accuracy of pricing data</li>
                <li>That provider pricing will remain unchanged</li>
                <li>That our calculations perfectly reflect real-world costs</li>
              </ul>
              <p className="mt-3">
                Always verify pricing directly with the AI provider before making financial
                decisions based on our estimates.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Intellectual Property</h2>
              <p>
                The Service, including its design, code, and original content, is the intellectual
                property of AI API Cost Tools. The Service may reference trademarks and brand
                names of third-party AI providers (such as Claude, GPT, Gemini) which belong
                to their respective owners. Our use of these names is for identification and
                comparison purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Third-Party Links and Services</h2>
              <p>
                The Service may contain links to third-party websites or services, including
                AI provider documentation and pricing pages. We are not responsible for the
                content, privacy policies, or practices of any third-party sites. Accessing
                third-party sites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, AI API Cost Tools shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages, or
                any loss of profits or revenues, whether incurred directly or indirectly, or
                any loss of data, use, goodwill, or other intangible losses resulting from
                your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Disclaimer of Warranties</h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
                kind, either express or implied. We do not warrant that the Service will be
                uninterrupted, error-free, or that the information provided will be accurate
                or complete.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable
                laws. Any disputes arising from these terms or the use of the Service shall
                be resolved through good-faith negotiation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">10. Contact</h2>
              <p>
                If you have questions about these Terms of Service, please contact us at{' '}
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
