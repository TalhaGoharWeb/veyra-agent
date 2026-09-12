/**
 * VEYRA PRODUCTION PRIMITIVE: ZERO-DEPENDENCY REACTIVE STORE & SIGNALS
 * Engineered by Muhammad Talha Farid
 * 
 * Provides reactive state management, optimistic UI updates, and fine-grained reactivity
 * for client-side web applications with ZERO external npm dependencies.
 * Directive 18: Frontend Engine & Optimistic State
 * Directive 24: Real State Mutation Standard
 */

/**
 * Creates a reactive signal with getter/setter and subscriber notifications
 */
export function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  function get() {
    return value;
  }

  function set(nextValue) {
    const resolvedValue = typeof nextValue === 'function' ? nextValue(value) : nextValue;
    if (resolvedValue !== value) {
      value = resolvedValue;
      subscribers.forEach((fn) => {
        try {
          fn(value);
        } catch (err) {
          console.error('[VEYRA REACTIVE ERROR] Subscriber threw:', err);
        }
      });
    }
    return value;
  }

  function subscribe(fn) {
    subscribers.add(fn);
    fn(value); // Immediate initial emission
    return () => subscribers.delete(fn);
  }

  return [get, set, subscribe];
}

/**
 * Creates an observable object store with action dispatching and optimistic rollbacks
 */
export function createStore(initialState = {}) {
  let state = { ...initialState };
  let rollbackState = { ...initialState };
  const listeners = new Set();

  return {
    getState() {
      return state;
    },

    setState(updater) {
      const next = typeof updater === 'function' ? updater(state) : updater;
      state = { ...state, ...next };
      listeners.forEach((l) => l(state));
    },

    /**
     * Executes an optimistic mutation with automatic rollback on server error
     */
    async mutateOptimistically({ optimisticUpdate, serverAction, onError }) {
      rollbackState = { ...state };
      this.setState(optimisticUpdate);

      try {
        const result = await serverAction();
        return result;
      } catch (err) {
        console.warn('[VEYRA STORE] Mutation failed, rolling back state:', err.message);
        state = { ...rollbackState };
        listeners.forEach((l) => l(state));
        if (onError) onError(err);
        throw err;
      }
    },

    subscribe(listener) {
      listeners.add(listener);
      listener(state);
      return () => listeners.delete(listener);
    },
  };
}

/**
 * Binds a reactive signal to a DOM input element or text container
 */
export function bindDOM(elementOrSelector, [get, set, subscribe]) {
  if (typeof document === 'undefined') return;
  const el = typeof elementOrSelector === 'string' ? document.querySelector(elementOrSelector) : elementOrSelector;
  if (!el) return;

  // Set initial and subscribe to future updates
  subscribe((val) => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.value !== String(val ?? '')) el.value = val ?? '';
    } else {
      el.textContent = String(val ?? '');
    }
  });

  // Listen for DOM changes
  el.addEventListener('input', (e) => {
    set(e.target.value);
  });
}
