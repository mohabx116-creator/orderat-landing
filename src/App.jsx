import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import RoutesSection from './components/RoutesSection.jsx';
import ScheduleSection from './components/ScheduleSection.jsx';
import PricingSection from './components/PricingSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import ShipmentRules from './components/ShipmentRules.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import { whatsappLink } from './data/orderatData.js';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RoutesSection />
        <ScheduleSection />
        <PricingSection />
        <HowItWorks />
        <ShipmentRules />
        <FinalCTA />
      </main>
      <Footer />

      {/* Mobile-only sticky WhatsApp CTA bar */}
      <div className="mobile-cta-bar" aria-label="حجز سريع عبر واتساب">
        <p>احجز شحنتك عبر واتساب</p>
        <a
          className="btn btn-whatsapp"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          احجز الآن
        </a>
      </div>
    </>
  );
}

export default App;
