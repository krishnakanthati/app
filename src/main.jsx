// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' for React 18+
import './index.css';  // Your styles
import App from './App';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>  {/* Wrap the entire app with BrowserRouter */}
    <App />
  </BrowserRouter>
);
