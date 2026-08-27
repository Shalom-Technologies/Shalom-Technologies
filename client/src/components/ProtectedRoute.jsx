import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wrap any route element that requires a logged-in user:
 *   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Avoid a flash-redirect to /login while we're still checking for an
    // existing session on page load/refresh.
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;