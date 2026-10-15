// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Import exact original CSS stylesheets
import '../css/tokens.css';
import '../css/global.css';
import '../css/components.css';
import '../css/pages/home.css';
import '../css/pages/work.css';
import '../css/pages/services.css';
import '../css/pages/pricing.css';
import '../css/pages/about.css';
import '../css/pages/contact.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
