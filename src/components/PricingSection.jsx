import { pricingPlans, pricingRule } from '../data/orderatData.js';

function PricingSection({ onOpenOrderDialog }) {
  const pricingFactors = [
    'منطقة الاستلام والتسليم',
    'نوع الشحنة ومحتواها',
    'الوزن الفعلي للشحنة',
    'الأبعاد والحجم التقديري',
    'إجمالي عدد القطع',
    'القابلية للكسر',
    'وجود متطلبات تحميل خاصة'
  ];

  return (
    <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">تسعير الشحنات</p>
          <h2 id="pricing-title">أسعار تقديرية مرنة تناسب شحنتك</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 24px auto', color: 'var(--muted)' }}>
            نهدف إلى تقديم أسعار عادلة وواضحة. يمكنك مراجعة الأسعار التقديرية العامة بالأسفل، أو الضغط على الزر لحساب السعر الدقيق لشحنتك.
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
        <div className="pricing-factors-block" style={{ marginTop: '48px', background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--line)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--brand-strong)', marginBottom: '12px', fontWeight: 600 }}>العوامل المحددة للتسعير النهائي</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '20px', maxWidth: '650px', marginInline: 'auto' }}>
            {pricingRule}
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
            {pricingFactors.map((factor, idx) => (
              <span key={idx} style={{ padding: '6px 14px', background: 'var(--surface-strong)', border: '1px solid var(--line)', borderRadius: '20px', fontSize: '0.88rem', color: 'var(--brand)', fontWeight: 500 }}>
                ✓ {factor}
              </span>
            ))}
          </div>

          <button
            onClick={onOpenOrderDialog}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            احصل على السعر 📝
          </button>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
