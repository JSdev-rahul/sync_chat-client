import { Suspense } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from './privateRoutes';
import { routeConfig } from './routes';

// Lazy-loaded components
const Profile = lazy(() => import('../pages/profile'));
const Auth = lazy(() => import('../pages/auth'));
const ChatInterface = lazy(() => import('../pages/chat-interface'));

const AppRoutes = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path={routeConfig.auth} element={<Auth />} />

        {/* Private routes */}
        <Route
          path={routeConfig.profile}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </PrivateRoute>
          }
        >
          {' '}
        </Route>
        <Route
          path={routeConfig.chat}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ChatInterface />
            </PrivateRoute>
          }
        ></Route>

        {/* Redirect to /auth for unknown paths */}
        <Route path="*" element={<Navigate to={routeConfig.auth} />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
