/**
 * VEYRA PRODUCTION PRIMITIVE: AUTHENTICATION & RBAC
 * Zero external dependencies. Uses native node:crypto.
 * Directive 22: Server-Enforced Authorization Barrier
 * Directive 23: Security Engine
 */

import crypto from 'node:crypto';

const DEFAULT_SECRET = process.env.JWT_SECRET || 'veyra-insecure-dev-secret-change-in-production-vault';

export class VeyraAuth {
  /**
   * Hashes a password using PBKDF2/scrypt with a cryptographically secure salt
   */
  static hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  /**
   * Verifies a plain password against a stored hash
   */
  static verifyPassword(password, storedHash) {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedBuffer = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
  }

  /**
   * Generates a stateless signed JWT token (HMAC-SHA256)
   */
  static signToken(payload, secret = DEFAULT_SECRET, expiresInSeconds = 86400) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const body = { ...payload, exp, iat: Math.floor(Date.now() / 1000) };

    const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
    const b64Payload = Buffer.from(JSON.stringify(body)).toString('base64url');
    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${b64Header}.${b64Payload}`)
      .digest('base64url');

    return `${b64Header}.${b64Payload}.${signature}`;
  }

  /**
   * Verifies and decodes a signed JWT token
   */
  static verifyToken(token, secret = DEFAULT_SECRET) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [b64Header, b64Payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${b64Header}.${b64Payload}`)
      .digest('base64url');

    // Constant-time signature comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    try {
      const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return null; // Expired
      }
      return payload;
    } catch {
      return null;
    }
  }

  /**
   * Middleware: Enforces authorization barrier & Role-Based Access Control (RBAC)
   */
  static requireAuth(requiredRoles = []) {
    return (req, res, next) => {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'UNAUTHORIZED', message: 'Missing or malformed authorization token.' }));
      }

      const token = authHeader.slice(7);
      const user = VeyraAuth.verifyToken(token);
      if (!user) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'UNAUTHORIZED', message: 'Token is invalid or expired.' }));
      }

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'FORBIDDEN', message: 'Insufficient permissions for this operation.' }));
      }

      req.user = user;
      next();
    };
  }
}
