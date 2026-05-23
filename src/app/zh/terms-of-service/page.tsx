import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '服务条款',
  description: 'AI API 成本工具的服务条款 — 使用我们网站和工具的规则和指南。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/terms-of-service',
    languages: { en: 'https://aiapicost.tools/terms-of-service', zh: 'https://aiapicost.tools/zh/terms-of-service' },
  },
};

export default function TermsOfServicePageZh() {
  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">服务条款</h1>
          <p className="text-sm text-gray-500 mb-10">最后更新：2026年5月17日</p>

          <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. 接受条款</h2>
              <p>
                访问和使用 AI API 成本工具（以下简称“服务”）即表示您接受并同意受本服务条款的约束。如果您不同意这些条款，请不要使用本服务。我们保留随时修改这些条款的权利，您继续使用服务即表示接受任何更改。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. 服务描述</h2>
              <p className="mb-3">
                AI API 成本工具提供免费的在线计算器和估算工具，用于比较多家 AI 供应商的 API 定价，包括 OpenAI、Anthropic、Google、DeepSeek、Mistral、xAI 等。我们的工具帮助开发者和团队估算和规划 AI API 使用成本。
              </p>
              <p>
                显示的定价数据根据公开信息和官方供应商价格手动维护。我们尽力保持数据的准确性和时效性，但无法保证其准确性。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. 服务使用</h2>
              <h3 className="text-base font-medium text-gray-300 mb-2">3.1 允许的使用</h3>
              <p className="mb-3">
                您可以将服务用于与估算和规划 AI API 成本相关的个人和商业目的。服务免费提供，不需要注册。
              </p>
              <h3 className="text-base font-medium text-gray-300 mb-2">3.2 禁止的使用</h3>
              <p className="mb-3">您同意不：</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>使用自动化工具批量抓取或提取服务中的数据</li>
                <li>尝试干扰或使我们的服务器或基础设施过载</li>
                <li>将服务用于任何非法目的</li>
                <li>将我们计算器的输出错误地表示为官方定价保证</li>
                <li>未经注明出处重新分发我们的工具或数据</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. 信息准确性</h2>
              <p className="mb-3">
                服务提供的成本估算和定价信息仅供参考和规划之用。虽然我们力求准确，但我们不对以下内容作任何保证：
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>定价数据的完整性或准确性</li>
                <li>供应商定价将保持不变</li>
                <li>我们的计算完全反映实际成本</li>
              </ul>
              <p className="mt-3">
                在根据我们的估算做出财务决定之前，请务必向 AI 供应商确认定价。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. 知识产权</h2>
              <p>
                服务（包括其设计、代码和原创内容）是 AI API 成本工具的知识产权。服务可能引用第三方 AI 供应商的商标和品牌名称（如 Claude、GPT、Gemini），这些属于其各自的所有者。我们使用这些名称仅用于识别和比较目的。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. 第三方链接和服务</h2>
              <p>
                服务可能包含指向第三方网站或服务的链接，包括 AI 供应商文档和定价页面。我们不对任何第三方网站的内容、隐私政策或做法负责。访问第三方网站的风险由您自行承担。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. 责任限制</h2>
              <p>
                在法律允许的最大范围内，AI API 成本工具不对任何间接的、偶然的、特殊的、后果性的或惩罚性的损害赔偿，或任何利润或收入损失（无论是直接还是间接产生的），或任何数据、使用、商誉或其他无形损失负责。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. 免责声明</h2>
              <p>
                服务按“原样”和“可用”提供，不作任何形式的明示或暗示保证。我们不保证服务将不间断、无错误，也不保证所提供的信息将是准确或完整的。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. 适用法律</h2>
              <p>
                本条款受适用法律管辖并按其解释。因本条款或服务使用引起的任何争议应通过善意协商解决。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">10. 联系方式</h2>
              <p>
                如果您对本服务条款有任何疑问，请通过以下方式联系我们：
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
