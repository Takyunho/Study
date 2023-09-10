import React from 'react';

export default function Card( { children }) {
  return (
    <div style={{
      backgroundColor: '#333',
      borderRadius: '20px',
      color: '#fff',
      padding: '20px',
      margin: '20px',
      textAlign: 'center',
      minHeight: '200px',
      maxWidth: '200px',
    }}>
      {children}
    </div>
  );
}

