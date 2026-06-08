import { API_BASE_URL } from '../config/api';

/**
 * Submits a new shipment order to the backend API.
 * @param {Object} payload - The order details.
 * @returns {Promise<Object>} The server response including created order details.
 */
export async function createOrder(payload) {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    // If the server returns a validation or business error message, throw it
    throw new Error(data.error || 'تعذر تسجيل الطلب حاليًا. جرّب مرة أخرى أو تواصل معنا عبر واتساب.');
  }

  return data;
}

/**
 * Tracks an existing order by code and phone.
 * @param {Object} payload - { orderCode, phone }
 * @returns {Promise<Object>} The server response including matching order details.
 */
export async function trackOrder(payload) {
  const response = await fetch(`${API_BASE_URL}/api/orders/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'تعذر تتبع الطلب الآن. حاول مرة أخرى.');
  }

  return data;
}

