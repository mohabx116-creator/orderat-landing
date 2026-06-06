import { operatingDays, launchNotice, whatsappGroupLink } from '../data/orderatData.js';

function ScheduleSection() {
  return (
    <section className="section schedule-section" aria-labelledby="schedule-title">
      <div className="container split-layout">
        <div className="section-heading align-start">
          <p className="eyebrow">المواعيد التقديرية</p>
          <h2 id="schedule-title">رحلات ثابتة ثلاث مرات أسبوعيًا</h2>
          <p>
            رحلة تغطي الاتجاهين في يوم واحد. المواعيد التفصيلية تُرسل لك عند
            تأكيد الحجز.
          </p>
          <p className="launch-notice">{launchNotice}</p>
        </div>
        <div className="schedule-list">
          {operatingDays.map((item) => (
            <article className="schedule-item" key={item.day}>
              <strong>{item.day}</strong>
              <span>{item.label}</span>
            </article>
          ))}
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
