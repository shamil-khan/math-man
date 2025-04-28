import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import Dashboard from './Dashboard';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <Dashboard />
      </StyledEngineProvider>
    </React.StrictMode>,
  );
}
