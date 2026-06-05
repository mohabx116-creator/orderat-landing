import { whatsappLink } from '../data/orderatData.js';

function FinalCTA() {
  return (
    <section className="final-cta section" aria-labelledby="final-cta-title">
      <div className="container final-cta-inner">
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>ابدأ الآن</p>
        <h2 id="final-cta-title">
          جاهز تحجز مكان شحنتك في الرحلة القادمة؟
        </h2>
        <p>
          ابعت خط الرحلة وتفاصيل الشحنة على واتساب — هنرد عليك بالسعر
          التقديري والموعد المتاح في أسرع وقت.
        </p>
        <a
          className="btn btn-whatsapp"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          📦 تحدث معنا على واتساب
        </a>
      </div>
    </section>
  );
}

export default FinalCTA;
