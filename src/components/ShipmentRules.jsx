import { shipmentRules } from '../data/orderatData.js';

function RulesList({ title, items, tone }) {
  return (
    <article className={`rules-card rules-card-${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function ShipmentRules() {
  return (
    <section className="section rules-section" aria-labelledby="rules-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">قواعد الشحن</p>
          <h2 id="rules-title">ما يمكن شحنه وما يحتاج مراجعة قبل الحجز</h2>
        </div>
        <div className="rules-grid">
          <RulesList title="مسموح" items={shipmentRules.allowed} tone="allowed" />
          <RulesList
            title="غير مسموح أو يحتاج اتفاقًا مسبقًا"
            items={shipmentRules.notAllowed}
            tone="blocked"
          />
        </div>
      </div>
    </section>
  );
}

export default ShipmentRules;
