import { pricingPlans, pricingRule, whatsappLink } from '../data/orderatData.js';

function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">تسعير مبدئي</p>
          <h2 id="pricing-title">أسعار تقديرية — شحنة صغيرة أو كبيرة، عندنا خيار</h2>
          <p>
            ابعت تفاصيل الشحنة وهنأكدلك السعر على واتساب قبل أي التزام.
          </p>
        </div>
        <div className="pricing-grid">
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
                {isFeatured && (
                  <a
                    className="btn btn-whatsapp btn-small"
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: '12px' }}
                  >
                    تواصل معنا
                  </a>
                )}
              </article>
            );
          })}
        </div>
        <p className="pricing-rule">{pricingRule}</p>
      </div>
    </section>
  );
}

export default PricingSection;
