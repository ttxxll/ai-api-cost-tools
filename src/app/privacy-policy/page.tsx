import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AI API Cost Tools — how we collect, use, and protect your information.',
  alternates: {
    canonical: 'https://aiapicost.tools/privacy-policy',
    languages: { en: 'https://aiapicost.tools/privacy-policy', zh: 'https://aiapicost.tools/zh/privacy-policy' },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: May 17, 2026</p>

          <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Introduction</h2>
              <p>
                AI API Cost Tools (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard information when you
                visit our website at aiapicost.tools (the &quot;Service&quot;). By using the Service, you
                agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
              <h3 className="text-base font-medium text-gray-300 mb-2">2.1 Information You Provide</h3>
              <p className="mb-3">
                Our calculators operate entirely in your browser. We do not require account
                registration, and we do not collect personal information such as names, email
                addresses, or phone numbers through the calculator tools themselves.
              </p>
              <h3 className="text-base font-medium text-gray-300 mb-2">2.2 Automatically Collected Information</h3>
              <p className="mb-3">
                When you visit our website, certain information may be collected automatically, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website addresses</li>
                <li>IP address (anonymized where possible)</li>
                <li>Device type and screen resolution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Cookies and Tracking</h2>
              <p className="mb-3">
                We may use cookies and similar tracking technologies to enhance your experience.
                Cookies are small data files stored on your device. You can instruct your browser
                to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p>
                We use Google Analytics to understand how visitors interact with our website.
                Google Analytics uses cookies to collect information about your usage patterns.
                This data is anonymized and used solely to improve our Service. You can opt out
                of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Services</h2>
              <p className="mb-3">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-gray-300">LiteLLM:</strong> We synchronize public model pricing data
                  from LiteLLM&apos;s open pricing dataset during site maintenance. This does not involve
                  any personal data exchange.
                </li>
                <li>
                  <strong className="text-gray-300">Google AdSense:</strong> We may display
                  advertisements served by Google AdSense. Google may use cookies to serve ads
                  based on your prior visits to our website or other websites. You may opt out of
                  personalized advertising by visiting Google&apos;s Ads Settings.
                </li>
                <li>
                  <strong className="text-gray-300">Google Analytics:</strong> Used for website
                  analytics as described above.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. How We Use Information</h2>
              <p className="mb-3">The information we collect is used to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Operate and maintain the Service</li>
                <li>Improve user experience and website functionality</li>
                <li>Analyze usage patterns and trends</li>
                <li>Detect and prevent technical issues</li>
                <li>Display relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Data Security</h2>
              <p>
                We implement reasonable security measures to protect the limited information we
                collect. However, no method of transmission over the Internet or electronic
                storage is 100% secure. While we strive to use commercially acceptable means to
                protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Children&apos;s Privacy</h2>
              <p>
                Our Service is not intended for children under the age of 13. We do not knowingly
                collect personal information from children under 13. If you are a parent or guardian
                and you are aware that your child has provided us with personal information, please
                contact us so we can take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the &quot;Last
                updated&quot; date. You are advised to review this Privacy Policy periodically for any
                changes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
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
