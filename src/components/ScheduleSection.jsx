import { operatingDays, launchNotice } from '../data/orderatData.js';

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
    </section>
  );
}

export default ScheduleSection;
