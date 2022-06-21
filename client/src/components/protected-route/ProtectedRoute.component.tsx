import { Navigate, useLocation } from 'react-router-dom';

import { useIsLoggedInQuery } from '../../services/auth/auth.service';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const location = useLocation();
  const { data: isLoggedInData } = useIsLoggedInQuery();

  if (!isLoggedInData) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
