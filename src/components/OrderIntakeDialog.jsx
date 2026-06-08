import { useEffect } from 'react';
import OrderIntakeForm from './OrderIntakeForm';

function OrderIntakeDialog({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return (
    <div
      className="dialog-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="dialog-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        <div className="dialog-header">
          <div className="dialog-header-text">
            <h2 id="dialog-title">سجّل بيانات الشحنة</h2>
            <p id="dialog-desc" className="dialog-subtitle">
              املأ البيانات الأساسية، وسنراجع السعر والمساحة المتاحة قبل الرحلة.
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

        <div className="dialog-body">
          <OrderIntakeForm />
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

export default OrderIntakeDialog;
