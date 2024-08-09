import { BrowserRouter } from "react-router-dom";
import AppRoutes from "././routes/index";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const { access_token } = useSelector((state) => state.auth);
  const isAuthenticated = access_token || "";
  


  return (
    <BrowserRouter>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
};

export default App;
