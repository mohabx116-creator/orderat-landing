import { activeRoutes } from '../data/orderatData.js';

function RoutesSection() {
  return (
    <section className="section routes-section" aria-labelledby="routes-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">المناطق النشطة</p>
          <h2 id="routes-title">الخط الثلاثي — ثلاث رحلات أسبوعيًا</h2>
          <p>
            رحلة واحدة تغطي الاتجاهين في يوم واحد. احجز في أي اتجاه بين المناطق
            الثلاث.
          </p>
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
