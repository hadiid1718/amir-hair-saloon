import { createContext, useCallback, useEffect, useState } from 'react';

export const RouterContext = createContext(null);

function readLocation() {
  return {
    pathname: window.location.pathname.replace(/\/$/, '') || '/',
    search: window.location.search,
    state: window.history.state?.routerState ?? null
  };
}

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const handlePopState = () => setLocation(readLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to, state = null, replace = false) => {
    const url = new URL(to, window.location.origin);
    const historyState = state == null ? {} : { routerState: state };
    if (replace) window.history.replaceState(historyState, '', `${url.pathname}${url.search}`);
    else window.history.pushState(historyState, '', `${url.pathname}${url.search}`);
    setLocation({ pathname: url.pathname.replace(/\/$/, '') || '/', search: url.search, state });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <RouterContext.Provider value={{ ...location, navigate }}>{children}</RouterContext.Provider>;
}
