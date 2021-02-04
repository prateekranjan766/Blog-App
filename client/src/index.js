import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import AuthState from './context/auth/AuthState';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <App />
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
