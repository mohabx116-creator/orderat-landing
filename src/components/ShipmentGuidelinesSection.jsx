import React from 'react';

function ShipmentGuidelinesSection({ onOpenOrderDialog }) {
  const suitableItems = [
    'كراتين صغيرة ومتوسطة',
    'شنط وطرود خفيفة',
    'مستندات وأوراق',
    'منتجات متجر إلكتروني',
    'أجهزة وإلكترونيات مغلفة جيدًا'
  ];

  const needsCareItems = [
    'المنتجات القابلة للكسر',
    'الإلكترونيات',
    'الزجاجيات',
    'الأدوات الحساسة',
    'أي شحنة لها قيمة أو تحتاج عناية'
  ];

  const unsuitableItems = [
    'مواد خطرة أو قابلة للاشتعال',
    'سوائل غير محكمة الغلق',
    'أطعمة تحتاج تبريد خاص',
    'مبالغ نقدية أو مجوهرات عالية القيمة',
    'أي شحنة مخالفة للقانون أو غير واضحة المحتوى'
  ];

  const trustPoints = [
    { title: 'رحلات منظمة', desc: 'بدل توصيل عشوائي، نوفر رحلات مجدولة ومنظمة بانتظام.' },
    { title: 'تأكيد السعر والرحلة', desc: 'يتم مراجعة طلبك وتأكيد السعر وتفاصيل الرحلة معك قبل التحرك.' },
    { title: 'متابعة برقم الطلب', desc: 'تتبع حالة شحنتك ومسارها بكل سهولة في أي وقت برقم طلبك.' },
    { title: 'تواصل مباشر عبر واتساب', desc: 'نوفر دعمًا مباشرًا وسريعًا لخدمتك والإجابة عن استفساراتك.' },
    { title: 'شحن خفيف بين المدن', desc: 'حل مثالي لنقل الشحنات الخفيفة والطرود بين المدن المتاحة.' }
  ];

  return (
    <section className="section guidelines-section" id="guidelines" aria-labelledby="guidelines-title" style={{ direction: 'rtl', textAlign: 'right' }}>
      <div className="container">
        
        {/* Guidelines Header */}
        <div className="section-heading">
          <p className="eyebrow">إرشادات الشحن</p>
          <h2 id="guidelines-title">ما هي الشحنات التي ننقلها؟</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 24px auto', color: 'var(--muted)' }}>
            نود توضيح الإرشادات الأساسية لأنواع الشحنات لضمان سلامة ووصول طرودكم بأمان.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '56px'
        }}>
          {/* Card A: Suitable */}
          <div style={{
            background: 'var(--surface-strong)',
            border: '1px solid var(--line)',
            borderTop: '4px solid var(--success)',
            borderRadius: '10px',
            padding: '24px',
            boxShadow: '0 8px 20px rgba(17, 61, 53, 0.04)'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontSize: '1.15rem', marginTop: 0, marginBottom: '16px', fontWeight: 'bold' }}>
              <span style={{ fontSize: '1.3rem' }}>✓</span> مناسب لأوردرات
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {suitableItems.map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.92rem', color: 'var(--ink)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card B: Needs Care */}
          <div style={{
            background: 'var(--surface-strong)',
            border: '1px solid var(--line)',
            borderTop: '4px solid var(--accent)',
            borderRadius: '10px',
            padding: '24px',
            boxShadow: '0 8px 20px rgba(17, 61, 53, 0.04)'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '1.15rem', marginTop: 0, marginBottom: '16px', fontWeight: 'bold' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span> يحتاج تغليف جيد
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {needsCareItems.map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.92rem', color: 'var(--ink)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card C: Unsuitable */}
          <div style={{
            background: 'var(--surface-strong)',
            border: '1px solid var(--line)',
            borderTop: '4px solid var(--danger)',
            borderRadius: '10px',
            padding: '24px',
            boxShadow: '0 8px 20px rgba(17, 61, 53, 0.04)'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontSize: '1.15rem', marginTop: 0, marginBottom: '16px', fontWeight: 'bold' }}>
              <span style={{ fontSize: '1.3rem' }}>✕</span> غير مناسب حاليًا
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {unsuitableItems.map((item, idx) => (
                <li key={idx} style={{ fontSize: '0.92rem', color: 'var(--ink)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Section Block */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '12px',
          padding: '40px 32px',
          boxShadow: '0 10px 30px rgba(17, 61, 53, 0.05)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--brand-strong)', marginBottom: '10px', fontWeight: 'bold' }}>ليه تختار أوردرات؟</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '32px', maxWidth: '600px', marginInline: 'auto' }}>
            نحن نقدم خدمة شحن منظمة، آمنة ومريحة تضمن لك راحة البال ومتابعة شحنتك خطوة بخطوة.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '36px',
            textAlign: 'right'
          }}>
            {trustPoints.map((point, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(17, 61, 53, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand)',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.98rem', color: 'var(--brand-strong)', fontWeight: 'bold' }}>{point.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.5' }}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenOrderDialog}
            className="btn btn-primary"
            style={{ padding: '12px 32px', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            سجّل بيانات الشحنة 📝
          </button>
        </div>

      </div>
    </section>
  );
}

export default ShipmentGuidelinesSection;
