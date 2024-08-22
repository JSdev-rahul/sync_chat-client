import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routeConfig } from './routes';

const PrivateRoute = ({token, children }) => {

  console.log(token)

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /auth if not authenticated
    if (!token ) {
      navigate(routeConfig.auth);
    }
  }, [token, navigate]);

  // Render children if authenticated
  return  token ? children : routeConfig.auth;
};

export default PrivateRoute;
