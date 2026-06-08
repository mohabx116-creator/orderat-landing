import { pricingPlans, pricingRule } from '../data/orderatData.js';

function PricingSection({ onOpenOrderDialog }) {
  const pricingFactors = [
    { name: 'منطقة الاستلام والتسليم', desc: 'تختلف المسافة والمسار بين القاهرة والمدن الجديدة.' },
    { name: 'نوع الشحنة ومحتواها', desc: 'المستندات والعينات تختلف عن الطرود التجارية.' },
    { name: 'الوزن الفعلي للشحنة', desc: 'الشحنات الثقيلة تؤثر على استهلاك وحمولة السيارة.' },
    { name: 'الأبعاد والحجم التقديري', desc: 'الشحنات كبيرة الحجم تشغل مساحة أوسع من طاقة السيارة.' },
    { name: 'إجمالي عدد القطع', desc: 'عدد الطرود أو الكراتين المراد نقلها وتوزيعها.' },
    { name: 'القابلية للكسر والتعامل الخاص', desc: 'تأمين الحماية الإضافية للشحنات الحساسة والزجاجية.' },
    { name: 'متطلبات التحميل الخاصة', desc: 'الحاجة إلى عمالة إضافية للتحميل أو التنزيل.' }
  ];

  return (
    <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">تسعير الرحلات</p>
          <h2 id="pricing-title">أسعار تقديرية مرنة تناسب حجم شحنتك</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 24px auto', color: 'var(--muted)' }}>
            نهدف إلى تقديم أسعار مخفضة وعادلة. يمكنك مراجعة الأسعار التقديرية العامة بالأسفل، أو تعبئة نموذج حجز الشحنة لتصلك تسعيرة دقيقة.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid" style={{ marginBottom: '40px' }}>
          {pricingPlans.map((plan, index) => {
            const isFeatured = index === pricingPlans.length - 1;
            return (
              <article
                className={`price-card${isFeatured ? ' price-card-featured' : ''}`}
                key={plan.name}
              >
                <span className="plan-name">{plan.name}</span>
                <h3>{plan.title}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.description}</p>
              </article>
            );
          })}
        </div>

        {/* Pricing Factors Block */}
        <div className="pricing-factors-block" style={{ marginTop: '50px', background: 'var(--surface)', padding: '32px 24px', borderRadius: '16px', border: '1px solid var(--line)', textAlign: 'right' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--brand)', marginBottom: '16px', fontWeight: 600 }}>العوامل المحددة للسعر النهائي:</h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--muted)', marginBottom: '24px' }}>
            {pricingRule} نقوم باحتساب السعر النهائي بشفافية بناءً على المعايير التالية:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {pricingFactors.map((factor, idx) => (
              <div key={idx} style={{ padding: '12px 16px', borderRight: '2px solid rgba(29, 117, 84, 0.3)', background: 'var(--surface-strong)', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--brand-strong)', display: 'block', marginBottom: '4px' }}>{factor.name}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{factor.desc}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button
              onClick={onOpenOrderDialog}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.05rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
            >
              سجّل بيانات الشحنة واحصل على سعر مناسب 💰
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
