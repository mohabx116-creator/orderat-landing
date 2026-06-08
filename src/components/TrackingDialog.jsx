import { useState, useEffect } from 'react';
import { trackOrder } from '../lib/ordersApi';

const STATUS_MAP = {
  NEW: 'جديد',
  PRICED: 'تم التسعير',
  CONFIRMED: 'مؤكد',
  PICKED_UP: 'تم الاستلام',
  IN_TRANSIT: 'في الطريق',
  DELIVERED: 'تم التسليم',
  CANCELLED: 'ملغي'
};

const STATUS_COLOR_MAP = {
  NEW: 'rgba(17, 61, 53, 0.15)', // light brand background
  PRICED: 'rgba(196, 111, 58, 0.15)', // light accent background
  CONFIRMED: 'rgba(29, 117, 84, 0.15)', // light success background
  PICKED_UP: 'rgba(29, 117, 84, 0.15)',
  IN_TRANSIT: 'rgba(196, 111, 58, 0.15)',
  DELIVERED: 'rgba(29, 117, 84, 0.25)',
  CANCELLED: 'rgba(156, 62, 51, 0.15)' // light danger background
};

const STATUS_TEXT_COLOR = {
  NEW: 'var(--brand)',
  PRICED: 'var(--accent)',
  CONFIRMED: 'var(--success)',
  PICKED_UP: 'var(--success)',
  IN_TRANSIT: 'var(--accent)',
  DELIVERED: 'var(--success)',
  CANCELLED: 'var(--danger)'
};

function TrackingDialog({ isOpen, onClose, prefill }) {
  const [orderCode, setOrderCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close dialog on Escape key down
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset or prefill states on dialog close/open
  useEffect(() => {
    if (isOpen) {
      setOrderCode(prefill?.orderCode || '');
      setPhone(prefill?.phone || '');
      setError('');
      setOrder(null);
    }
  }, [isOpen, prefill]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);

    if (!orderCode.trim()) {
      setError('يرجى إدخال رقم الطلب.');
      return;
    }
    if (!phone.trim()) {
      setError('يرجى إدخال رقم الموبايل.');
      return;
    }

    setLoading(true);
    try {
      const result = await trackOrder({
        orderCode: orderCode.trim(),
        phone: phone.trim()
      });
      setOrder(result.order);
    } catch (err) {
      setError(err.message || 'تعذر تتبع الطلب الآن. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrder(null);
    setOrderCode('');
    setPhone('');
    setError('');
  };

  return (
    <div
      className="dialog-overlay"
      onClick={onClose}
      role="presentation"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div
        className="dialog-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracking-dialog-title"
        aria-describedby="tracking-dialog-desc"
        style={{ maxWidth: '550px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}
      >
        <div className="dialog-header">
          <div className="dialog-header-text">
            <h2 id="tracking-dialog-title" style={{ fontSize: '1.25rem' }}>تتبع حالة طلبك</h2>
            <p id="tracking-dialog-desc" className="dialog-subtitle">
              أدخل بيانات طلبك لمعرفة مكانه وحالة التسعير الحالية.
            </p>
          </div>
          <button
            type="button"
            className="btn-close-x"
            onClick={onClose}
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        <div className="dialog-body" style={{ padding: '20px', direction: 'rtl' }}>
          {error && (
            <div className="alert alert-error" style={{ padding: '10px 14px', fontSize: '0.88rem', marginBottom: '16px' }}>
              ⚠️ {error}
            </div>
          )}

          {!order ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="track-orderCode" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--brand-strong)' }}>رقم الطلب (مثال: ORD-0007)</label>
                <input
                  id="track-orderCode"
                  type="text"
                  placeholder="رقم طلبك"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  style={{ direction: 'ltr', textAlign: 'right' }}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="track-phone" style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--brand-strong)' }}>رقم الموبايل المسجل به الطلب</label>
                <input
                  id="track-phone"
                  type="tel"
                  placeholder="رقم الموبايل"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ direction: 'ltr', textAlign: 'right' }}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '12px', minHeight: '44px' }}
                disabled={loading}
              >
                {loading ? 'جاري البحث عن الطلب...' : 'تتبع الطلب 🔍'}
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Order Tracking Card */}
              <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '14px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: 'var(--brand-strong)' }}>{order.orderCode}</span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      background: STATUS_COLOR_MAP[order.status] || 'rgba(0,0,0,0.05)',
                      color: STATUS_TEXT_COLOR[order.status] || 'var(--ink)'
                    }}
                  >
                    {STATUS_MAP[order.status] || order.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '0.9rem', color: 'var(--ink)' }}>
                  <div>
                    <strong style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>خط السير</strong>
                    <span>{order.pickupArea} ⇄ {order.deliveryArea}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>نوع الشحنة</strong>
                    <span>{order.shipmentType}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>عدد القطع</strong>
                    <span>{order.piecesCount} {order.piecesCount > 1 ? 'قطع' : 'قطعة'}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>الوزن التقديري</strong>
                    <span>{order.estimatedWeight || 'لم يحدد'}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>السعر التقديري</strong>
                    <span style={{ color: order.estimatedPrice ? 'var(--brand)' : 'inherit', fontWeight: order.estimatedPrice ? 'bold' : 'normal' }}>
                      {order.estimatedPrice ? `${parseFloat(order.estimatedPrice)} جنيه` : 'قيد المراجعة'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--muted)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>السعر النهائي</strong>
                    <span style={{ color: order.finalPrice ? 'var(--success)' : 'inherit', fontWeight: order.finalPrice ? 'bold' : 'normal' }}>
                      {order.finalPrice ? `${parseFloat(order.finalPrice)} جنيه` : 'قيد المراجعة'}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '16px', borderTop: '1px solid var(--line)', paddingTop: '12px', fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>يوم الرحلة المطلوب: {order.requestedTripDay || 'أي يوم'}</span>
                  <span>آخر تحديث: {new Date(order.updatedAt).toLocaleDateString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
                style={{ width: '100%', minHeight: '44px' }}
              >
                بحث عن طلب آخر 🔍
              </button>
            </div>
          )}
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={onClose}
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrackingDialog;
