import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

export default function FAQSection({ title, items }: FAQSectionProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative py-16 px-4 border-t border-white/[0.04]">
      <Script
        id={`faq-schema-${title.replace(/\s+/g, '-').toLowerCase()}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-3 text-center">
          {title}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-10">
          Common questions about pricing, tokens, and cost estimation
        </p>
        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={index}
              className="group glass-card p-5 hover:border-white/[0.12] transition-all duration-300"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-sm font-medium text-white pr-4">
                  {item.question}
                </h3>
                <span className="text-gray-600 group-open:rotate-180 transition-transform text-xs">
                  ▼
                </span>
              </summary>
              <div className="pt-3">
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
