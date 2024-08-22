import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '././routes/index';

const App = () => {
  const { access_token } = useSelector(state => state.auth);
  const [token, setToken] = useState(access_token);
  useEffect(() => {
    setToken(access_token);
  }, [access_token]);

  return (
    <BrowserRouter>
      <AppRoutes token={token} />
    </BrowserRouter>
  );
};

export default App;
