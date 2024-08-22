// import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import PrivateRoute from './privateRoutes';
import PublicRoute from './PublicRoute';
import { routeConfig } from './routes';
import { lazy, Suspense } from 'react';

// Lazy-loaded components
const Profile = lazy(() => import('../pages/profile'));
const Auth = lazy(() => import('../pages/auth'));
const ChatInterface = lazy(() => import('../pages/chat-interface'));

const AppRoutes = ({ token }) => {
  // Define the route configuration
  const routes = [
    {
      path: routeConfig.profile,
      element: (
        <PrivateRoute token={token}>
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: routeConfig.chat,
      element: (
        <PrivateRoute token={token}>
          <ChatInterface />
        </PrivateRoute>
      ),
    },
    {
      path: routeConfig.auth,
      element: (
        <PublicRoute token={token}>
          <Auth />
        </PublicRoute>
      ),
    },
    // Redirect unknown paths to /auth
    {
      path: '*',
      element: <Navigate to={routeConfig.auth} />,
    },
  ];

  // Use the useRoutes hook to generate the route elements
  const element = useRoutes(routes);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      {element}
    </Suspense>
  );
};

export default AppRoutes;
