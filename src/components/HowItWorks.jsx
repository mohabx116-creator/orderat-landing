function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'سجّل بيانات الشحنة',
      desc: 'املأ نموذج الحجز السريع بالمسار والأبعاد التقديرية للشحنة.'
    },
    {
      num: '2',
      title: 'نراجع خط السير والحجم',
      desc: 'نقوم بمطابقة شحنتك وتجميعها ضمن خط السير المجدول.'
    },
    {
      num: '3',
      title: 'نؤكد السعر وأقرب رحلة',
      desc: 'نتواصل معك عبر واتساب لتأكيد السعر وميعاد الاستلام المناسب.'
    }
  ];

  return (
    <section className="section how-section" aria-labelledby="how-title" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">طريقة العمل</p>
          <h2 id="how-title">شحن منظم وسلس في 3 خطوات</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--muted)' }}>
            نعتمد على جدولة وتنظيم الرحلات المجمعة لنقدم لك خدمة نقل آمنة وبأفضل تكلفة ممكنة.
          </p>
        </div>
        
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginTop: '40px', marginBottom: '32px' }}>
          {steps.map((step) => (
            <article className="step-card" key={step.num} style={{ background: 'var(--surface-strong)', padding: '24px', borderRadius: '12px', border: '1px solid var(--line)', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--brand)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '1.25rem', fontWeight: 'bold' }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--brand-strong)', marginBottom: '8px', fontWeight: 600 }}>{step.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0, lineHeight: '1.5' }}>{step.desc}</p>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--muted)', background: 'rgba(17, 61, 53, 0.03)', padding: '16px', borderRadius: '8px', border: '1px dashed var(--line)', maxWidth: '650px', margin: '0 auto' }}>
          🗓️ <strong>جدول الرحلات الأسبوعية:</strong> ننظم رحلات مجمعة دورية كل (الأحد، الثلاثاء، الخميس) لضمان تغطية كاملة ومنتظمة للخط.
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
