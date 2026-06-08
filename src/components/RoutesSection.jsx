import { activeRoutes } from '../data/orderatData.js';

function RoutesSection() {
  const coverageRoutes = [
    { from: 'القاهرة', to: 'العبور' },
    { from: 'القاهرة', to: 'العاشر من رمضان' },
    { from: 'العبور', to: 'العاشر من رمضان' },
  ];

  return (
    <section className="section routes-section" aria-labelledby="routes-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">تغطية الخدمة</p>
          <h2 id="routes-title">نطاق التوصيل والخطوط النشطة</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 24px auto', color: 'var(--muted)' }}>
            نقدم خدمات شحن منتظمة تربط بين المدن الرئيسية التالية:
          </p>
        </div>

        {/* Compact Route Chips/Cards */}
        <div className="routes-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
          {coverageRoutes.map((route, i) => (
            <article className="route-chip" key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', borderRadius: '30px', border: '1px solid var(--line)', background: 'var(--surface-strong)', fontWeight: 600 }}>
              <span style={{ color: 'var(--brand)' }}>{route.from}</span>
              <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>⇄</span>
              <span style={{ color: 'var(--brand)' }}>{route.to}</span>
            </article>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.92rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
          📍 نخدم حاليًا نطاق القاهرة، العبور، والعاشر من رمضان، ويتم تأكيد إمكانية الاستلام والتسليم بعد تسجيل الطلب مباشرة.
        </p>
      </div>
    </section>
  );
}

export default RoutesSection;
