import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routeConfig } from './routes';

const PublicRoute = ({ token, children }) => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     // If the user is authenticated, redirect to the profile page or any other default private route
  //     if (!token) {
  //       navigate(routeConfig.auth);
  //     }
  //   }, [token, navigate]);

  // Render children if not authenticated
  return children;
};

export default PublicRoute;
