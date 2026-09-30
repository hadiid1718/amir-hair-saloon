export const storage = {
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  /** Returns true when the value was persisted, false when storage is full or unavailable. */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* storage may be unavailable */ }
  },
  getFlag(key) {
    try { return localStorage.getItem(key) === 'true'; } catch { return false; }
  },
  setFlag(key, value) {
    try { localStorage.setItem(key, String(Boolean(value))); } catch { /* storage may be unavailable */ }
  }
};
