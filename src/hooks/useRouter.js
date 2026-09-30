import { useContext } from 'react';
import { RouterContext } from '../app/RouterContext';

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used inside RouterProvider');
  return context;
}
