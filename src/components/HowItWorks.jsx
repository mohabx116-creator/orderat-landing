import { howItWorksSteps } from '../data/orderatData.js';

function HowItWorks() {
  return (
    <section className="section how-section" aria-labelledby="how-title">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">طريقة الحجز</p>
          <h2 id="how-title">خطوات بسيطة من واتساب للرحلة</h2>
        </div>
        <ol className="steps-list">
          {howItWorksSteps.map((step, index) => (
            <li className="step-item" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
