import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from './useAuth';

export const RequireAuthLayout = () => {
  const location = useLocation();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
};
