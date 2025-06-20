// src/components/Toast.jsx
import React from 'react';
import './Toast.css';

function Toast({ mensagem, visivel }) {
  if (!visivel) return null;

  return (
    <div className="toast">
      <span>✔</span> {mensagem}
    </div>
  );
}

export default Toast;
