import { activeRoutes } from '../data/orderatData.js';

function RoutesSection() {
  const coverageRoutes = [
    { from: 'القاهرة', to: 'العبور', type: 'رحلات اتجاهين' },
    { from: 'القاهرة', to: 'العاشر من رمضان', type: 'رحلات اتجاهين' },
    { from: 'العبور', to: 'العاشر من رمضان', type: 'رحلات اتجاهين' },
  ];

  return (
    <section className="section routes-section" aria-labelledby="routes-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">تغطية الخدمة ومسارات التوصيل</p>
          <h2 id="routes-title">نخدم الشحنات الخفيفة بين المدن الرئيسية</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 16px auto', fontSize: '1.1rem', color: 'var(--muted)' }}>
            نخدم حاليًا الشحنات الخفيفة ومستلزمات الأعمال والطلبات التجارية بين القاهرة، العبور، والعاشر من رمضان.
          </p>
          <div className="notice-box-light" style={{ maxWidth: '650px', margin: '0 auto 24px auto', padding: '12px 16px', background: 'rgba(29, 117, 84, 0.05)', borderRadius: '8px', border: '1px solid rgba(29, 117, 84, 0.15)', fontSize: '0.9rem', color: 'var(--success)' }}>
            ⚠️ <strong>فترة تشغيل تجريبي:</strong> الخدمة حاليًا في مرحلة إطلاق أولية لتنظيم حركة الشحنات، ويتم تأكيد إمكانية الاستلام والتسليم بدقة بعد تسجيل الطلب والتنسيق عبر واتساب.
          </div>
        </div>

        {/* Route Cards */}
        <div className="routes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {coverageRoutes.map((route, i) => (
            <article className="area-card route-card" key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', border: '1px solid var(--line)', borderRadius: '12px', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--brand)' }}>
                <span>{route.from}</span>
                <span style={{ color: 'var(--success)' }}>⇄</span>
                <span>{route.to}</span>
              </div>
              <span className="status-badge" style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(29, 117, 84, 0.1)', color: 'var(--success)', fontWeight: 600 }}>
                {route.type}
              </span>
            </article>
          ))}
        </div>

        {/* Regions list */}
        <div className="section-heading" style={{ marginTop: '50px' }}>
          <p className="eyebrow">المحطات الرئيسية النشطة</p>
        </div>
        <div className="routes-grid">
          {activeRoutes.map((route) => (
            <article className="area-card" key={route.name}>
              <span className="area-dot" aria-hidden="true" />
              <h3>{route.name}</h3>
              <p>{route.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoutesSection;
