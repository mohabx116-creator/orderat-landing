import { whatsappGroupLink, whatsappLink } from '../data/orderatData.js';

const trustChips = [
  { icon: '💬', label: 'حجز عبر واتساب' },
  { icon: '📋', label: 'أسعار تقديرية واضحة' },
  { icon: '🗓️', label: 'رحلة مجدولة' },
];

function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">خدمة شحن · القاهرة ↔ العبور ↔ العاشر</p>
          <h1>اشحن شحنتك بين القاهرة والعبور والعاشر في رحلة منظمة</h1>
          <p className="hero-text">
            Orderat تتيح لك حجز مكان شحنتك في رحلات مجدولة بين القاهرة والعبور
            والعاشر من رمضان — بدون تفاوض، بدون مفاجآت. ابعت تفاصيل الشحنة على
            واتساب وهنأكد السعر التقديري والموعد في نفس اليوم.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-whatsapp"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              📦 احجز مكان على واتساب
            </a>
            <a
              className="btn btn-group"
              href={whatsappGroupLink}
              target="_blank"
              rel="noreferrer"
            >
              انضم لجروب الرحلات
            </a>
            <a className="btn btn-secondary" href="#pricing">
              تعرف على الأسعار
            </a>
          </div>
          <p className="cta-helper">تابع مواعيد الرحلات، السعة المتاحة، وآخر التحديثات.</p>
          <p className="disclaimer">
            السعر النهائي يُحدد بعد مراجعة الوزن والمساحة ونوع الشحنة — بدون
            رسوم مخفية.
          </p>
          <div className="trust-chips">
            {trustChips.map((chip) => (
              <span className="trust-chip" key={chip.label}>
                <span className="trust-chip-icon" aria-hidden="true">
                  {chip.icon}
                </span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="خريطة مبسطة لمناطق تشغيل Orderat"
        >
          <div className="route-card route-card-main">
            <span>القاهرة</span>
          </div>
          <div className="route-line" aria-hidden="true" />
          <div className="route-card">
            <span>العبور</span>
          </div>
          <div className="route-card">
            <span>العاشر من رمضان</span>
          </div>
          <div className="truck-pill" aria-hidden="true">
            <span className="truck-box" />
            <span className="truck-cabin" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
