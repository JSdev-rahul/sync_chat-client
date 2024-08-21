import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { Toaster } from '@/components/ui/toaster';

import App from './App.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import './index.css';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>

    <Toaster />
  </>,
);
