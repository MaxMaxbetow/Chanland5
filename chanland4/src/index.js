import React from 'react';
import ReactDOM from 'react-dom/client';
// Если ваш главный компонент называется App, замените Home на App
import Home from './pages/Home'; // Убедитесь, что путь верный

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);