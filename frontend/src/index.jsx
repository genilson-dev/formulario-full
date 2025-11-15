import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Pega a div "root" do index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente principal
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
