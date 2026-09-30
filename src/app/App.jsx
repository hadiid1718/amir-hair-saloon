import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import { RouterProvider } from './RouterContext';
import { AppRouter } from './AppRouter';
import '../styles/index.css';

export function App() {
  return <ErrorBoundary><RouterProvider><AuthProvider><AppRouter /></AuthProvider></RouterProvider></ErrorBoundary>;
}
