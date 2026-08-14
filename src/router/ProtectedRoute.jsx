import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// role: array of allowed roles like ['admin', 'user']
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but role not allowed → redirect somewhere else
    return <Navigate to="/dash/gpt" replace />;
  }

  return <Outlet />; // render nested routes
};

export default ProtectedRoute;
