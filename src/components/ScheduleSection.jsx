import { operatingDays, launchNotice, whatsappGroupLink } from '../data/orderatData.js';

function ScheduleSection() {
  const scheduleClarityPoints = [
    { title: 'تنظيم الرحلات المجمعة', text: 'لا نعتمد على التوصيل الفوري العشوائي. نقوم بتجميع الشحنات على رحلات مخصصة ومجدولة لتقليل التكلفة ونقل البضائع بأعلى كفاءة وأقل سعر.' },
    { title: 'أقرب رحلة مناسبة', text: 'بعد حجز شحنتك، نقوم بمراجعة جدول الرحلات وننسق معك لتأكيد حجز مكان لشحنتك في أقرب رحلة مجمعة خارجة للمدينة المستهدفة.' },
    { title: 'تنسيق مرن للمواعيد', text: 'رحلاتنا مخصصة للشحنات الخفيفة ومستلزمات الشركات. نقوم بالتنسيق معك لتأكيد نافذة زمنية تقريبية للاستلام والتسليم بدون وعود قاطعة بساعات محددة لضمان أمان النقل.' }
  ];

  return (
    <section className="section schedule-section" aria-labelledby="schedule-title">
      <div className="container split-layout">
        <div className="section-heading align-start">
          <p className="eyebrow">جدولة وتنسيق الرحلات</p>
          <h2 id="schedule-title">تنظيم الرحلات المجدولة بين المدن</h2>
          <p style={{ marginBottom: '24px', color: 'var(--muted)' }}>
            نحن نجمع الشحنات في أيام محددة لضمان تقديم أفضل سعر وجودة حماية للمنقولات.
          </p>
          
          <div className="schedule-clarity-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
            {scheduleClarityPoints.map((point, index) => (
              <div key={index} className="clarity-point" style={{ borderRight: '3px solid var(--brand)', paddingRight: '12px' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: 'var(--brand)', fontWeight: 600 }}>{point.title}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.5' }}>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="schedule-list" style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', color: 'var(--brand)', fontWeight: 600 }}>أيام الرحلات النشطة أسبوعيًا</h3>
          {operatingDays.map((item) => (
            <article className="schedule-item" key={item.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px dashed var(--line)' }}>
              <strong style={{ color: 'var(--ink)' }}>{item.day}</strong>
              <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{item.label}</span>
            </article>
          ))}
          <p className="launch-notice" style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--success)', fontWeight: 500 }}>{launchNotice}</p>
        </div>
      </div>

      <div className="container group-notice-wrapper">
        <div className="group-notice-card">
          <div className="group-notice-content">
            <h3 className="group-notice-title">جروب تحديثات الرحلات</h3>
            <p className="group-notice-text">
              بنعلن على الجروب مواعيد الرحلات، هل الرحلة مؤكدة، والسعة المتاحة قبل كل رحلة.
            </p>
          </div>
          <a
            className="btn btn-group btn-small"
            href={whatsappGroupLink}
            target="_blank"
            rel="noreferrer"
          >
            انضم لجروب الرحلات
          </a>
        </div>
      </div>
    </section>
  );
}

export default ScheduleSection;
