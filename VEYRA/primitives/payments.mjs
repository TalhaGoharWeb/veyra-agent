/**
 * VEYRA PRODUCTION PRIMITIVE: ZERO-DEPENDENCY PAYMENTS & STRIPE WEBHOOKS
 * Engineered by Muhammad Talha Farid
 * 
 * Uses native node:crypto & node:https. Zero external npm packages.
 * Directive 22: Server-Enforced Authorization
 * Directive 23: Security & Cryptographic Integrity
 * Directive 24: Real Functionality (Genuine Payment Workflows)
 */

import crypto from 'node:crypto';
import https from 'node:https';

export class VeyraPayments {
  /**
   * Cryptographically verifies Stripe webhook signature using HMAC-SHA256
   * Constant-time comparison protects against timing attacks.
   */
  static verifyStripeWebhook(rawBody, signatureHeader, webhookSecret, toleranceSeconds = 300) {
    if (!signatureHeader || !webhookSecret) {
      throw new Error('Missing stripe-signature header or webhook secret.');
    }

    const parts = signatureHeader.split(',');
    let timestamp = null;
    const signatures = [];

    for (const part of parts) {
      const [key, value] = part.split('=');
      if (key === 't') timestamp = value;
      if (key === 'v1') signatures.push(value);
    }

    if (!timestamp || signatures.length === 0) {
      throw new Error('Invalid stripe-signature header format.');
    }

    // Check timestamp drift
    const now = Math.floor(Date.now() / 1000);
    const eventTime = parseInt(timestamp, 10);
    if (Math.abs(now - eventTime) > toleranceSeconds) {
      throw new Error('Webhook timestamp outside of acceptable tolerance window.');
    }

    // Compute expected HMAC-SHA256 signature
    const payloadToSign = `${timestamp}.${typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8')}`;
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payloadToSign)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature);

    // Constant-time check against all v1 signatures
    const isValid = signatures.some((sig) => {
      const sigBuffer = Buffer.from(sig);
      return sigBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(sigBuffer, expectedBuffer);
    });

    if (!isValid) {
      throw new Error('Stripe webhook signature verification failed.');
    }

    return true;
  }

  /**
   * Safely parses JSON webhook event payload
   */
  static parseWebhookEvent(rawBody) {
    const text = typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
    return JSON.parse(text);
  }

  /**
   * Creates a real Stripe Checkout Session via native Node.js HTTPS (zero npm packages)
   */
  static createCheckoutSession({ apiKey, successUrl, cancelUrl, customerEmail, lineItems, mode = 'payment', metadata = {} }) {
    return new Promise((resolve, reject) => {
      if (!apiKey) return reject(new Error('Stripe API Key is required.'));

      const postData = new URLSearchParams();
      postData.append('success_url', successUrl);
      postData.append('cancel_url', cancelUrl);
      postData.append('mode', mode);
      if (customerEmail) postData.append('customer_email', customerEmail);

      lineItems.forEach((item, idx) => {
        postData.append(`line_items[${idx}][price_data][currency]`, item.currency || 'usd');
        postData.append(`line_items[${idx}][price_data][product_data][name]`, item.name);
        postData.append(`line_items[${idx}][price_data][unit_amount]`, String(item.amount));
        postData.append(`line_items[${idx}][quantity]`, String(item.quantity || 1));
      });

      Object.entries(metadata).forEach(([k, v]) => {
        postData.append(`metadata[${k}]`, String(v));
      });

      const payload = postData.toString();

      const options = {
        hostname: 'api.stripe.com',
        port: 443,
        path: '/v1/checkout/sessions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(payload),
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(parsed.error?.message || `Stripe API Error: ${res.statusCode}`));
            }
          } catch (e) {
            reject(new Error('Failed to parse Stripe response: ' + e.message));
          }
        });
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }
}
