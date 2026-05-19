import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '隐私政策',
  description: 'AI API 成本工具的隐私政策 — 我们如何收集、使用和保护您的信息。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/privacy-policy',
    languages: { en: 'https://aiapicost.tools/privacy-policy', zh: 'https://aiapicost.tools/zh/privacy-policy' },
  },
};

export default function PrivacyPolicyPageZh() {
  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">隐私政策</h1>
          <p className="text-sm text-gray-500 mb-10">最后更新：2026年5月17日</p>

          <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. 引言</h2>
              <p>
                AI API 成本工具（以下简称“我们”）致力于保护您的隐私。本隐私政策说明了当您访问我们的网站时，我们如何收集、使用和保护您的信息。使用我们的服务即表示您同意按照本政策收集和使用信息。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. 我们收集的信息</h2>
              <h3 className="text-base font-medium text-gray-300 mb-2">2.1 您主动提供的信息</h3>
              <p className="mb-3">
                我们的计算器完全在浏览器中运行。我们不要求注册账户，也不会通过计算器工具收集姓名、邮箱或电话号码等个人信息。
              </p>
              <h3 className="text-base font-medium text-gray-300 mb-2">2.2 自动收集的信息</h3>
              <p className="mb-3">
                当您访问我们的网站时，可能会自动收集以下信息：
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>浏览器类型和版本</li>
                <li>操作系统</li>
                <li>访问的页面及停留时间</li>
                <li>来源网站地址</li>
                <li>IP 地址（尽可能匿名化处理）</li>
                <li>设备类型和屏幕分辨率</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Cookie 和跟踪技术</h2>
              <p className="mb-3">
                我们可能会使用 Cookie 和类似的跟踪技术来提升您的体验。Cookie 是存储在您设备上的小型数据文件。您可以指示浏览器拒绝所有 Cookie 或在发送 Cookie 时发出提示。
              </p>
              <p>
                我们使用 Google Analytics 来了解访客如何使用我们的网站。Google Analytics 使用 Cookie 收集您的使用模式信息。这些数据经过匿名化处理，仅用于改善我们的服务。您可以通过安装 Google Analytics 退出浏览器插件来选择退出。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. 第三方服务</h2>
              <p className="mb-3">我们使用以下第三方服务：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-gray-300">LiteLLM：</strong>我们在站点维护期间从 LiteLLM 开源价格库同步公开模型定价数据。这不涉及任何个人数据交换。
                </li>
                <li>
                  <strong className="text-gray-300">Google AdSense：</strong>我们可能会展示由 Google AdSense 提供的广告。Google 可能会使用 Cookie 根据您对我们网站或其他网站的先前访问来投放广告。您可以通过访问 Google 广告设置来选择退出个性化广告。
                </li>
                <li>
                  <strong className="text-gray-300">Google Analytics：</strong>用于网站分析，如上所述。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. 信息使用方式</h2>
              <p className="mb-3">我们收集的信息用于：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>运营和维护服务</li>
                <li>改善用户体验和网站功能</li>
                <li>分析使用模式和趋势</li>
                <li>检测和预防技术问题</li>
                <li>展示相关广告</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. 数据安全</h2>
              <p>
                我们采取合理的安全措施来保护我们收集的有限信息。然而，没有任何通过互联网传输或电子存储的方法是100%安全的。虽然我们力求使用商业上可接受的方式保护您的信息，但我们无法保证绝对安全。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. 儿童隐私</h2>
              <p>
                我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果您是家长或监护人，且知道您的孩子向我们提供了个人信息，请联系我们，我们将采取适当措施。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. 政策变更</h2>
              <p>
                我们可能会不时更新本隐私政策。任何变更将在本页面上发布，并更新“最后更新”日期。建议您定期查看本隐私政策以了解任何变更。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. 联系我们</h2>
              <p>
                如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
                <a href="mailto:contact@aiapicost.tools" className="text-purple-400 hover:text-purple-300 ml-1">
                  contact@aiapicost.tools
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale="zh" />
    </>
  );
}
