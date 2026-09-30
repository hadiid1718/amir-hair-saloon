import { createContext, useMemo, useState } from 'react';
import { storage } from '../services/storage';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

function readAuth() {
  return storage.get(STORAGE_KEYS.auth, null);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readAuth);
  const [guest, setGuest] = useState(() => storage.getFlag(STORAGE_KEYS.guest));

  const value = useMemo(() => ({
    auth,
    guest,
    isAuthenticated: Boolean(auth),
    login(email) {
      const next = { email, loggedInAt: Date.now() };
      storage.set(STORAGE_KEYS.auth, next);
      storage.setFlag(STORAGE_KEYS.guest, false);
      setAuth(next); setGuest(false);
    },
    signup(name, email) {
      const next = { name, email, loggedInAt: Date.now() };
      storage.set(STORAGE_KEYS.auth, next);
      storage.setFlag(STORAGE_KEYS.guest, false);
      setAuth(next); setGuest(false);
    },
    continueAsGuest() {
      storage.remove(STORAGE_KEYS.auth);
      storage.setFlag(STORAGE_KEYS.guest, true);
      setAuth(null); setGuest(true);
    },
    logout() {
      storage.remove(STORAGE_KEYS.auth);
      storage.setFlag(STORAGE_KEYS.guest, false);
      setAuth(null); setGuest(false);
    }
  }), [auth, guest]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
