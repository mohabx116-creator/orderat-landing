import { whatsappLink } from '../data/orderatData.js';

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="التنقل الرئيسي">
        <a className="logo-wrap" href="#top" aria-label="Orderat — الصفحة الرئيسية">
          <span className="logo">
            <em>O</em>rderat
          </span>
          <span className="logo-sub">أوردرات · شحن مجدول</span>
        </a>
        <a
          className="btn btn-whatsapp btn-small"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          احجز عبر واتساب
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
