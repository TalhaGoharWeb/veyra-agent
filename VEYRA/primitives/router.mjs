/**
 * VEYRA PRODUCTION PRIMITIVE: NATIVE HTTP ROUTER & VALIDATOR
 * Zero external dependencies. Uses native node:http.
 * Directive 21: API Engine
 * Directive 32: Error Recovery Engine
 */

import http from 'node:http';

export class VeyraRouter {
  constructor() {
    this.routes = [];
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
    return this;
  }

  get(path, ...handlers) { this.addRoute('GET', path, handlers); }
  post(path, ...handlers) { this.addRoute('POST', path, handlers); }
  put(path, ...handlers) { this.addRoute('PUT', path, handlers); }
  patch(path, ...handlers) { this.addRoute('PATCH', path, handlers); }
  delete(path, ...handlers) { this.addRoute('DELETE', path, handlers); }

  addRoute(method, path, handlers) {
    const paramNames = [];
    const regexPath = path.replace(/:([a-zA-Z0-9_]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this.routes.push({
      method,
      pattern: new RegExp(`^${regexPath}$`),
      paramNames,
      handlers,
    });
  }

  /**
   * Request handler to plug into http.createServer()
   */
  async handle(req, res) {
    // Add standard response helpers
    res.json = (data, statusCode = 200) => {
      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      res.end(JSON.stringify(data));
    };

    res.error = (message, statusCode = 400, code = 'BAD_REQUEST') => {
      res.json({ error: code, message, timestamp: new Date().toISOString() }, statusCode);
    };

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    req.path = parsedUrl.pathname;
    req.query = Object.fromEntries(parsedUrl.searchParams.entries());

    // Auto-parse JSON body on mutation methods with 1MB safety limit
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      try {
        req.body = await this.parseJsonBody(req);
      } catch (err) {
        return res.error(err.message || 'Malformed JSON payload', 400, 'INVALID_BODY');
      }
    } else {
      req.body = {};
    }

    // Match route
    let matchedRoute = null;
    req.params = {};

    for (const r of this.routes) {
      if (r.method === req.method) {
        const match = req.path.match(r.pattern);
        if (match) {
          matchedRoute = r;
          r.paramNames.forEach((name, i) => {
            req.params[name] = match[i + 1];
          });
          break;
        }
      }
    }

    if (!matchedRoute) {
      return res.error(`Route [${req.method}] ${req.path} not found.`, 404, 'NOT_FOUND');
    }

    // Execute pipeline (global middlewares + route handlers)
    const pipeline = [...this.middlewares, ...matchedRoute.handlers];
    let index = 0;

    const next = async (err) => {
      if (err) {
        console.error('[VEYRA ROUTER ERROR]', err);
        return res.error(err.message || 'Internal processing error', 500, 'INTERNAL_ERROR');
      }
      if (index < pipeline.length) {
        const handler = pipeline[index++];
        try {
          await handler(req, res, next);
        } catch (e) {
          await next(e);
        }
      }
    };

    await next();
  }

  parseJsonBody(req, limitBytes = 1048576) {
    return new Promise((resolve, reject) => {
      let data = '';
      let bytes = 0;
      req.on('data', (chunk) => {
        bytes += chunk.length;
        if (bytes > limitBytes) {
          reject(new Error('Payload too large. Maximum size is 1MB.'));
          req.destroy();
        } else {
          data += chunk;
        }
      });
      req.on('end', () => {
        if (!data.trim()) return resolve({});
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error('Invalid JSON format.'));
        }
      });
      req.on('error', reject);
    });
  }

  listen(port = 3000, callback) {
    const server = http.createServer((req, res) => this.handle(req, res));
    server.listen(port, callback);
    return server;
  }
}

/**
 * Validates request payload against expected fields and types
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const errors = [];
    for (const [field, rules] of Object.entries(schema)) {
      const val = req.body[field];
      if (rules.required && (val === undefined || val === null || val === '')) {
        errors.push(`Field '${field}' is required.`);
      } else if (val !== undefined && rules.type && typeof val !== rules.type) {
        errors.push(`Field '${field}' must be of type '${rules.type}'.`);
      }
    }
    if (errors.length > 0) {
      return res.error(errors.join(' '), 422, 'VALIDATION_FAILED');
    }
    next();
  };
}
