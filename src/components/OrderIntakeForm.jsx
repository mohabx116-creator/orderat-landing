import { useState } from 'react';
import { createOrder } from '../lib/ordersApi';
import { whatsappLink } from '../data/orderatData';

function OrderIntakeForm() {
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
    requestedTripDay: 'أقرب رحلة متاحة',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setError('منطقة الاستلام مطلوبة.');
      return;
    }
    if (!formData.deliveryArea) {
      setError('منطقة التسليم مطلوبة.');
      return;
    }
    if (!formData.shipmentType) {
      setError('نوع الشحنة مطلوب.');
      return;
    }

    const pieces = Number(formData.piecesCount);
    if (!Number.isInteger(pieces) || pieces <= 0) {
      setError('عدد القطع يجب أن يكون عددًا صحيحًا أكبر من الصفر.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        piecesCount: pieces,
        // Make sure boolean fields are passed correctly
        isFragile: formData.isFragile === true || formData.isFragile === 'true',
        needsSpecialLoading: formData.needsSpecialLoading === true || formData.needsSpecialLoading === 'true',
      };

      const response = await createOrder(payload);

      setSuccess({
        orderCode: response.order.orderCode,
        message: response.message,
      });
      setFormData(initialFormState);
    } catch (err) {
      setError(err.message || 'تعذر تسجيل الطلب حاليًا. جرّب مرة أخرى أو تواصل معنا عبر واتساب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-content-wrap">
          {success ? (
            <div className="alert alert-success text-center">
              <h3>تم تسجيل طلبك بنجاح 🎉</h3>
              <p className="order-code-display">رقم الطلب: <strong>{success.orderCode}</strong></p>
              <p>سنراجع السعر والمساحة المتاحة ونرد عليك على واتساب.</p>
              
              <div className="success-actions">
                <a
                  className="btn btn-whatsapp"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  تواصل عبر واتساب لتأكيد الطلب
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSuccess(null)}
                >
                  تسجيل شحنة جديدة
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="alert alert-error" role="alert">
                  <p>{error}</p>
                </div>
              )}

              <div className="form-grid">
                {/* الاسم */}
                <div className="form-group">
                  <label htmlFor="customerName">الاسم بالكامل <span className="required">*</span></label>
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
                  <label htmlFor="phone">رقم الهاتف / واتساب <span className="required">*</span></label>
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

                {/* منطقة الاستلام */}
                <div className="form-group">
                  <label htmlFor="pickupArea">منطقة الاستلام <span className="required">*</span></label>
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
                  </select>
                </div>

                {/* منطقة التسليم */}
                <div className="form-group">
                  <label htmlFor="deliveryArea">منطقة التسليم <span className="required">*</span></label>
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
                  </select>
                </div>

                {/* نوع الشحنة */}
                <div className="form-group">
                  <label htmlFor="shipmentType">نوع الشحنة <span className="required">*</span></label>
                  <select
                    id="shipmentType"
                    name="shipmentType"
                    value={formData.shipmentType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- اختر نوع الشحنة --</option>
                    <option value="مستندات">مستندات</option>
                    <option value="منتجات أونلاين">منتجات أونلاين</option>
                    <option value="عينة / Samples">عينة / Samples</option>
                    <option value="قطع غيار صغيرة">قطع غيار صغيرة</option>
                    <option value="كرتونة صغيرة">كرتونة صغيرة</option>
                    <option value="كرتونة متوسطة">كرتونة متوسطة</option>
                    <option value="شحنة كبيرة الحجم وخفيفة">شحنة كبيرة الحجم وخفيفة</option>
                    <option value="شحنة ثقيلة">شحنة ثقيلة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* عدد القطع */}
                <div className="form-group">
                  <label htmlFor="piecesCount">عدد القطع <span className="required">*</span></label>
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
                  <label htmlFor="dimensions">الأبعاد التقريبية (سم)</label>
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
                  <label htmlFor="estimatedWeight">الوزن التقريبي</label>
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
                  <label htmlFor="requestedTripDay">اليوم المطلوب للرحلة</label>
                  <select
                    id="requestedTripDay"
                    name="requestedTripDay"
                    value={formData.requestedTripDay}
                    onChange={handleChange}
                  >
                    <option value="أقرب رحلة متاحة">أقرب رحلة متاحة</option>
                    <option value="الأحد">الأحد</option>
                    <option value="الثلاثاء">الثلاثاء</option>
                    <option value="الخميس">الخميس</option>
                  </select>
                </div>

                {/* هل قابلة للكسر؟ */}
                <div className="form-group">
                  <label>هل الشحنة قابلة للكسر؟</label>
                  <div className="toggle-options">
                    <button
                      type="button"
                      className={`btn-toggle ${formData.isFragile === true ? 'active' : ''}`}
                      onClick={() => handleSelectBoolean('isFragile', true)}
                    >
                      نعم
                    </button>
                    <button
                      type="button"
                      className={`btn-toggle ${formData.isFragile === false ? 'active' : ''}`}
                      onClick={() => handleSelectBoolean('isFragile', false)}
                    >
                      لا
                    </button>
                  </div>
                </div>

                {/* هل تحتاج تحميل خاص؟ */}
                <div className="form-group">
                  <label>هل تحتاج تحميل/تنزيل خاص؟</label>
                  <div className="toggle-options">
                    <button
                      type="button"
                      className={`btn-toggle ${formData.needsSpecialLoading === true ? 'active' : ''}`}
                      onClick={() => handleSelectBoolean('needsSpecialLoading', true)}
                    >
                      نعم
                    </button>
                    <button
                      type="button"
                      className={`btn-toggle ${formData.needsSpecialLoading === false ? 'active' : ''}`}
                      onClick={() => handleSelectBoolean('needsSpecialLoading', false)}
                    >
                      لا
                    </button>
                  </div>
                </div>
              </div>

              {/* ملاحظات إضافية */}
              <div className="form-group full-width" style={{ marginTop: '1rem' }}>
                <label htmlFor="notes">ملاحظات إضافية</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="اكتب هنا أي تفاصيل أخرى ترغب في إعلامنا بها..."
                  rows="3"
                ></textarea>
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
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
