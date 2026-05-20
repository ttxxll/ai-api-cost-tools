import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '联系我们',
  description: '联系 AI API 成本工具 — 向我们发送问题、反馈或合作咨询。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/contact',
    languages: { en: 'https://aiapicost.tools/contact', zh: 'https://aiapicost.tools/zh/contact' },
  },
};

export default function ContactPageZh() {
  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">联系我们</h1>
          <p className="text-sm text-gray-500 mb-10">我们很乐意听到您的声音</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">联系方式</h2>
                <div className="space-y-4 text-sm text-gray-400">
                  <div>
                    <h3 className="font-medium text-gray-300 mb-1">邮箱</h3>
                    <a href="mailto:taoxinglong94@gmail.com" className="text-purple-400 hover:text-purple-300">
                      taoxinglong94@gmail.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-300 mb-1">回复时间</h3>
                    <p>我们通常在 1-2 个工作日内回复。</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">我们可以帮您</h2>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>关于我们工具的一般问题</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>报告不准确的定价数据</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>功能请求和建议</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>错误报告和技术问题</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>合作和商务咨询</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>隐私和数据相关问题</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">常见问题</h2>
              <div className="space-y-4">
                {[
                  {
                    q: '这个工具真的免费吗？',
                    a: '是的，我们所有的计算器都完全免费使用。无需注册，没有隐藏费用，没有使用限制。',
                  },
                  {
                    q: '定价数据有多准确？',
                    a: '我们的数据来自 OpenRouter 官方 Models 端点并定期刷新。但是，供应商可能随时更新定价，因此请务必以官方供应商文档为准。',
                  },
                  {
                    q: '可以推荐新模型或供应商吗？',
                    a: '当然可以！给我们发邮件，告诉我们您想看到的模型或供应商，我们会尽力添加。',
                  },
                  {
                    q: '你们会存储我的计算数据吗？',
                    a: '不会。所有计算都在您的浏览器中完成。我们不会在服务器上存储您的任何输入数据或结果。',
                  },
                  {
                    q: '可以用于商业用途吗？',
                    a: '可以，欢迎您将我们的工具用于个人和商业目的。请记住，我们的估算应以官方供应商定价为准。',
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
      <Footer locale="zh" />
    </>
  );
}
