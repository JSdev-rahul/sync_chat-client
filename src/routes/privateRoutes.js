import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routeConfig } from './routes';

const PrivateRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /auth if not authenticated
    if (!isAuthenticated) {
      navigate(routeConfig.auth);
    }
  }, [isAuthenticated, navigate]);

  // Render children if authenticated
  return isAuthenticated ? children : null;
};

export default PrivateRoute;
