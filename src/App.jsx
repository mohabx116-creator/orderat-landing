import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import RoutesSection from './components/RoutesSection.jsx';
import PricingSection from './components/PricingSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import OrderIntakeDialog from './components/OrderIntakeDialog.jsx';
import FAQSection from './components/FAQSection.jsx';
import FAQPopup from './components/FAQPopup.jsx';
import TrackingDialog from './components/TrackingDialog.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import { whatsappLink } from './data/orderatData.js';

function App() {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isFAQPopupOpen, setIsFAQPopupOpen] = useState(false);
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenOrderDialog={() => setIsOrderDialogOpen(true)} />
        <HowItWorks />
        <RoutesSection />
        <PricingSection onOpenOrderDialog={() => setIsOrderDialogOpen(true)} />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />

      <OrderIntakeDialog
        isOpen={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
      />

      <FAQPopup
        isOpen={isFAQPopupOpen}
        onClose={() => setIsFAQPopupOpen(false)}
      />

      <TrackingDialog
        isOpen={isTrackingDialogOpen}
        onClose={() => setIsTrackingDialogOpen(false)}
      />

      {/* Sticky FAQ Hint Button */}
      <button
        onClick={() => setIsFAQPopupOpen(true)}
        className="sticky-faq-btn"
        type="button"
      >
        عندك سؤال؟ 💬
      </button>

      {/* Sticky Track Hint Button */}
      <button
        onClick={() => setIsTrackingDialogOpen(true)}
        className="sticky-track-btn"
        type="button"
      >
        تتبع طلبك 🔍
      </button>


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
