import { useState } from 'react';

function FAQSection() {
  const faqItems = [
    {
      q: 'هل السعر ثابت؟',
      a: 'لا، السعر ليس ثابتًا. يتم احتساب سعر كل شحنة بدقة حسب مسار التوصيل، الحجم، والوزن الفعلي، لنقدم لك تكلفة عادلة دون تحميلك مصاريف إضافية غير ضرورية.'
    },
    {
      q: 'هل يوجد توصيل فوري في نفس الساعة؟',
      a: 'لا، نحن نعمل بنظام الرحلات المجدولة والمجمعة (3 أيام أسبوعيًا). تجميع الشحنات في رحلات منظمة يساعدنا على تقديم أسعار شحن مخفضة جدًا تناسب الجميع مقارنة بالخدمات الفردية الطارئة.'
    },
    {
      q: 'هل يمكن شحن منتجات قابلة للكسر؟',
      a: 'نعم، يسعدنا شحنها بشرط أن تكون مغلفة بطريقة آمنة ومحكمة. يرجى تحديد خيار "شحنة قابلة للكسر" عند تسجيل البيانات ليتخذ السائق الإجراءات الوقائية والوقاية من الصدمات أثناء الرحلة.'
    },
    {
      q: 'ماذا يحدث بعد تسجيل الطلب؟',
      a: 'بمجرد تسجيل شحنتك، سيقوم فريق خدمة العملاء بمراجعة تفاصيلها وحساب التكلفة الصحيحة، ثم سنقوم بالتواصل معك مباشرة عبر واتساب لتأكيد السعر وأقرب رحلة متوفرة والترتيب لميعاد الاستلام.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title" style={{ background: 'var(--surface-strong)', borderTop: '1px solid var(--line)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-heading">
          <p className="eyebrow">الأسئلة الشائعة</p>
          <h2 id="faq-title">نجيب عن استفساراتك حول الخدمة</h2>
          <p>كل ما تود معرفته حول كيفية عمل الشحن والأسعار وجدولة الرحلات.</p>
        </div>

        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px' }}>
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="faq-item"
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  background: isOpen ? 'var(--surface)' : 'var(--surface-strong)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'right',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--brand-strong)',
                    fontFamily: 'inherit'
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--brand)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>
                    ＋
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 20px 16px 20px', fontSize: '0.92rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
