import { useEffect, useState } from 'react';

function FAQPopup({ isOpen, onClose }) {
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

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close popup on Escape key down
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="dialog-overlay"
      onClick={onClose}
      role="presentation"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div
        className="dialog-card faq-popup-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-popup-title"
        aria-describedby="faq-popup-desc"
        style={{ maxWidth: '550px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}
      >
        <div className="dialog-header">
          <div className="dialog-header-text">
            <h2 id="faq-popup-title" style={{ fontSize: '1.25rem' }}>الأسئلة الشائعة</h2>
            <p id="faq-popup-desc" className="dialog-subtitle">
              إجابات سريعة قبل تسجيل الشحنة
            </p>
          </div>
          <button
            type="button"
            className="btn-close-x"
            onClick={onClose}
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        <div className="dialog-body" style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    background: isActive ? 'var(--surface)' : 'var(--surface-strong)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'right',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--brand-strong)',
                      fontFamily: 'inherit'
                    }}
                  >
                    <span>{item.q}</span>
                    <span style={{ fontSize: '1.1rem', color: 'var(--brand)', transform: isActive ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>
                      ＋
                    </span>
                  </button>
                  {isActive && (
                    <div style={{ padding: '0 16px 12px 16px', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={onClose}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQPopup;
