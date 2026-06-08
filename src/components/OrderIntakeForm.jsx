import { useState } from 'react';
import { createOrder } from '../lib/ordersApi';
import { whatsappLink, whatsappNumber } from '../data/orderatData';

function OrderIntakeForm({ onOpenTracking }) {
  const initialFormState = {
    customerName: '',
    phone: '',
    pickupArea: '',
    deliveryArea: '',
    shipmentType: '',
    piecesCount: 1,
    dimensions: '',
    estimatedWeight: '',
    isFragile: false,
    needsSpecialLoading: false,
    requestedTripDay: 'أقرب رحلة مناسبة',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [copied, setCopied] = useState(false);

  // Custom free-text inputs for "Other" selections
  const [customPickupArea, setCustomPickupArea] = useState('');
  const [customDeliveryArea, setCustomDeliveryArea] = useState('');
  const [customShipmentType, setCustomShipmentType] = useState('');

  const shipmentTypes = [
    'كرتونة',
    'شنطة',
    'جهاز / إلكترونيات',
    'أوراق / مستندات',
    'منتج قابل للكسر',
    'أخرى'
  ];

  const handleCopy = () => {
    if (success?.orderCode) {
      navigator.clipboard.writeText(success.orderCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectBoolean = (name, val) => {
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate inputs
    if (!formData.customerName.trim()) {
      setError('الاسم بالكامل مطلوب.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('رقم الهاتف / واتساب مطلوب.');
      return;
    }
    if (!formData.pickupArea) {
      setError('يرجى اختيار منطقة الاستلام.');
      return;
    }
    if (formData.pickupArea === 'أخرى' && !customPickupArea.trim()) {
      setError('يرجى كتابة منطقة الاستلام.');
      return;
    }
    if (!formData.deliveryArea) {
      setError('يرجى اختيار منطقة التسليم.');
      return;
    }
    if (formData.deliveryArea === 'أخرى' && !customDeliveryArea.trim()) {
      setError('يرجى كتابة منطقة التسليم.');
      return;
    }
    if (!formData.shipmentType) {
      setError('يرجى اختيار نوع الشحنة.');
      return;
    }
    if (formData.shipmentType === 'أخرى' && !customShipmentType.trim()) {
      setError('يرجى كتابة تفاصيل نوع الشحنة.');
      return;
    }

    const pieces = Number(formData.piecesCount);
    if (!Number.isInteger(pieces) || pieces <= 0) {
      setError('عدد القطع يجب أن يكون رقمًا صحيحًا أكبر من الصفر.');
      return;
    }

    if (formData.estimatedWeight.trim()) {
      const weightVal = parseFloat(formData.estimatedWeight);
      if (isNaN(weightVal) || weightVal <= 0) {
        setError('الوزن التقديري يجب أن يكون رقمًا موجبًا إن تم إدخاله.');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        pickupArea: formData.pickupArea === 'أخرى' ? customPickupArea.trim() : formData.pickupArea,
        deliveryArea: formData.deliveryArea === 'أخرى' ? customDeliveryArea.trim() : formData.deliveryArea,
        shipmentType: formData.shipmentType === 'أخرى' ? customShipmentType.trim() : formData.shipmentType,
        piecesCount: pieces,
        isFragile: formData.isFragile === true || formData.isFragile === 'true',
        needsSpecialLoading: formData.needsSpecialLoading === true || formData.needsSpecialLoading === 'true',
      };

      const response = await createOrder(payload);

      setSuccess({
        orderCode: response.order.orderCode,
        message: response.message,
      });
      setSubmittedPhone(payload.phone);
      setFormData(initialFormState);
      setCustomPickupArea('');
      setCustomDeliveryArea('');
      setCustomShipmentType('');
    } catch (err) {
      setError(err.message || 'تعذر تسجيل الطلب حاليًا. جرّب مرة أخرى أو تواصل معنا عبر واتساب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-content-wrap">
          {success ? (
            <div className="alert alert-success text-center" style={{ direction: 'rtl', padding: '24px 20px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '12px', color: 'var(--brand-strong)' }}>تم تسجيل طلبك بنجاح</h3>
              
              <div style={{
                background: 'rgba(17, 61, 53, 0.08)',
                border: '1px solid rgba(17, 61, 53, 0.15)',
                borderRadius: '8px',
                padding: '16px',
                margin: '20px 0',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)' }}>احتفظ برقم الطلب لاستخدامه في المتابعة والتتبع:</p>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--brand)', margin: '8px 0', letterSpacing: '0.5px' }}>
                  {success.orderCode}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-secondary btn-small"
                  style={{ minHeight: '36px', padding: '6px 16px', fontSize: '0.85rem', marginTop: '4px' }}
                >
                  {copied ? 'تم نسخ رقم الطلب! ✓' : 'نسخ رقم الطلب 📋'}
                </button>
              </div>

              <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--ink)', margin: '16px 0 24px 0' }}>
                سنراجع بيانات الشحنة ونتواصل معك لتأكيد السعر وأقرب رحلة مناسبة.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '340px', margin: '0 auto' }}>
                <a
                  className="btn btn-whatsapp"
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `مرحبًا، سجلت طلب شحن على أوردرات ورقم الطلب هو ${success.orderCode}. أريد متابعة تأكيد السعر وأقرب رحلة مناسبة.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: '100%', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  متابعة عبر واتساب 💬
                </a>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenTracking && onOpenTracking({ orderCode: success.orderCode, phone: submittedPhone })}
                  style={{ width: '100%', minHeight: '44px', background: 'var(--brand-strong)', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                  تتبع الطلب الآن 🔍
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSuccess(null);
                    setSubmittedPhone('');
                  }}
                  style={{ width: '100%', minHeight: '44px', marginTop: '8px' }}
                >
                  تسجيل شحنة جديدة 📦
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ direction: 'rtl', textAlign: 'right' }}>
              {error && (
                <div className="alert alert-error" role="alert" style={{ marginBottom: '20px', padding: '12px 16px', fontSize: '0.9rem' }}>
                  ⚠️ {error}
                </div>
              )}

              {/* 1. بيانات العميل */}
              <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--brand-strong)', margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 'bold', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  👤 بيانات العميل
                </h4>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {/* الاسم */}
                  <div className="form-group">
                    <label htmlFor="customerName" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>الاسم بالكامل <span className="required" style={{ color: 'var(--danger)' }}>*</span></label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="مثال: أحمد محمد"
                      required
                    />
                  </div>

                  {/* الهاتف */}
                  <div className="form-group">
                    <label htmlFor="phone" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>رقم الهاتف / واتساب <span className="required" style={{ color: 'var(--danger)' }}>*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="مثال: 01xxxxxxxxx"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 2. خط السير */}
              <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--brand-strong)', margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 'bold', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  🗺️ خط السير
                </h4>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {/* منطقة الاستلام */}
                  <div className="form-group">
                    <label htmlFor="pickupArea" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>منطقة الاستلام <span className="required" style={{ color: 'var(--danger)' }}>*</span></label>
                    <select
                      id="pickupArea"
                      name="pickupArea"
                      value={formData.pickupArea}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- اختر منطقة الاستلام --</option>
                      <option value="القاهرة">القاهرة</option>
                      <option value="العبور">العبور</option>
                      <option value="العاشر من رمضان">العاشر من رمضان</option>
                      <option value="أخرى">منطقة أخرى</option>
                    </select>
                    {formData.pickupArea === 'أخرى' && (
                      <input
                        type="text"
                        placeholder="اكتب منطقة الاستلام بالتفصيل"
                        value={customPickupArea}
                        onChange={(e) => setCustomPickupArea(e.target.value)}
                        style={{ marginTop: '8px', width: '100%' }}
                      />
                    )}
                  </div>

                  {/* منطقة التسليم */}
                  <div className="form-group">
                    <label htmlFor="deliveryArea" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>منطقة التسليم <span className="required" style={{ color: 'var(--danger)' }}>*</span></label>
                    <select
                      id="deliveryArea"
                      name="deliveryArea"
                      value={formData.deliveryArea}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- اختر منطقة التسليم --</option>
                      <option value="القاهرة">القاهرة</option>
                      <option value="العبور">العبور</option>
                      <option value="العاشر من رمضان">العاشر من رمضان</option>
                      <option value="أخرى">منطقة أخرى</option>
                    </select>
                    {formData.deliveryArea === 'أخرى' && (
                      <input
                        type="text"
                        placeholder="اكتب منطقة التسليم بالتفصيل"
                        value={customDeliveryArea}
                        onChange={(e) => setCustomDeliveryArea(e.target.value)}
                        style={{ marginTop: '8px', width: '100%' }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* 3. تفاصيل الشحنة */}
              <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--brand-strong)', margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 'bold', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  📦 تفاصيل الشحنة
                </h4>
                
                {/* Chip selector for Shipment Type */}
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '8px' }}>نوع الشحنة <span className="required" style={{ color: 'var(--danger)' }}>*</span></label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {shipmentTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, shipmentType: type }));
                          if (type !== 'أخرى') setCustomShipmentType('');
                        }}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '20px',
                          border: formData.shipmentType === type ? '2px solid var(--brand)' : '1px solid var(--line)',
                          background: formData.shipmentType === type ? 'rgba(17, 61, 53, 0.08)' : 'var(--surface)',
                          color: formData.shipmentType === type ? 'var(--brand-strong)' : 'var(--ink)',
                          fontWeight: formData.shipmentType === type ? 'bold' : 'normal',
                          cursor: 'pointer',
                          transition: 'all 150ms ease',
                          fontSize: '0.82rem'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {formData.shipmentType === 'أخرى' && (
                    <input
                      type="text"
                      placeholder="اكتب نوع الشحنة بالتفصيل"
                      value={customShipmentType}
                      onChange={(e) => setCustomShipmentType(e.target.value)}
                      style={{ marginTop: '10px', width: '100%' }}
                    />
                  )}
                </div>

                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  {/* عدد القطع */}
                  <div className="form-group">
                    <label htmlFor="piecesCount" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>عدد القطع <span className="required" style={{ color: 'var(--danger)' }}>*</span></label>
                    <input
                      type="number"
                      id="piecesCount"
                      name="piecesCount"
                      value={formData.piecesCount}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>

                  {/* الأبعاد */}
                  <div className="form-group">
                    <label htmlFor="dimensions" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>الأبعاد التقريبية (سم)</label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      placeholder="مثال: 50 × 30 × 20 سم"
                    />
                  </div>

                  {/* الوزن */}
                  <div className="form-group">
                    <label htmlFor="estimatedWeight" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>الوزن التقريبي</label>
                    <input
                      type="text"
                      id="estimatedWeight"
                      name="estimatedWeight"
                      value={formData.estimatedWeight}
                      onChange={handleChange}
                      placeholder="مثال: 5 كيلو"
                    />
                  </div>

                  {/* اليوم المطلوب للرحلة */}
                  <div className="form-group">
                    <label htmlFor="requestedTripDay" style={{ fontWeight: 600, fontSize: '0.88rem', display: 'block', marginBottom: '6px' }}>توقيت الرحلة المطلوب</label>
                    <select
                      id="requestedTripDay"
                      name="requestedTripDay"
                      value={formData.requestedTripDay}
                      onChange={handleChange}
                    >
                      <option value="أقرب رحلة مناسبة">أقرب رحلة مناسبة</option>
                      <option value="خلال 24 ساعة">خلال 24 ساعة</option>
                      <option value="خلال 48 ساعة">خلال 48 ساعة</option>
                      <option value="هذا الأسبوع">هذا الأسبوع</option>
                    </select>
                  </div>
                </div>

                {/* Fragile & Special Loading Options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
                  {/* هل قابلة للكسر؟ */}
                  <div className="form-group" style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '12px', borderRadius: '8px' }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '2px' }}>هل الشحنة قابلة للكسر؟</label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 0, marginBottom: '10px' }}>
                      سيتم مراعاة التعامل الحذر أثناء التسعير والتنظيم.
                    </p>
                    <div className="toggle-options" style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className={`btn-toggle ${formData.isFragile === true ? 'active' : ''}`}
                        onClick={() => handleSelectBoolean('isFragile', true)}
                        style={{ flex: 1, minHeight: '34px', fontSize: '0.82rem' }}
                      >
                        نعم
                      </button>
                      <button
                        type="button"
                        className={`btn-toggle ${formData.isFragile === false ? 'active' : ''}`}
                        onClick={() => handleSelectBoolean('isFragile', false)}
                        style={{ flex: 1, minHeight: '34px', fontSize: '0.82rem' }}
                      >
                        لا
                      </button>
                    </div>
                  </div>

                  {/* هل تحتاج تحميل خاص؟ */}
                  <div className="form-group" style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '12px', borderRadius: '8px' }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '2px' }}>هل تحتاج تحميل/تنزيل خاص؟</label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 0, marginBottom: '10px' }}>
                      لو الشحنة كبيرة أو تحتاج شخصين للتحميل.
                    </p>
                    <div className="toggle-options" style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className={`btn-toggle ${formData.needsSpecialLoading === true ? 'active' : ''}`}
                        onClick={() => handleSelectBoolean('needsSpecialLoading', true)}
                        style={{ flex: 1, minHeight: '34px', fontSize: '0.82rem' }}
                      >
                        نعم
                      </button>
                      <button
                        type="button"
                        className={`btn-toggle ${formData.needsSpecialLoading === false ? 'active' : ''}`}
                        onClick={() => handleSelectBoolean('needsSpecialLoading', false)}
                        style={{ flex: 1, minHeight: '34px', fontSize: '0.82rem' }}
                      >
                        لا
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4. ملاحظات إضافية */}
              <div style={{ background: 'var(--surface-strong)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--brand-strong)', margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 'bold', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  📝 ملاحظات إضافية
                </h4>
                <div className="form-group full-width" style={{ marginTop: '4px' }}>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="اكتب هنا أي تفاصيل أخرى ترغب في إعلامنا بها..."
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="form-submit" style={{ marginTop: '24px' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: '100%', minHeight: '48px', fontSize: '1rem', fontWeight: 'bold' }}
                >
                  {loading ? 'جاري تسجيل الطلب...' : 'سجّل بيانات الشحنة'}
                </button>
              </div>
            </form>
          )}
    </div>
  );
}

export default OrderIntakeForm;
