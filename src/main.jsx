import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>

    <Toaster />
  </>
);
