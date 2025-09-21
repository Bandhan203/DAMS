import React from 'react';

const Card = ({ title, subtitle, action, children }) => (
  <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 24, marginBottom: 24 }}>
    {title && <h2 style={{ margin: 0, fontSize: 20 }}>{title}</h2>}
    {subtitle && <p style={{ color: '#6b7280', margin: '4px 0 16px' }}>{subtitle}</p>}
    {action && <div style={{ marginBottom: 16 }}>{action}</div>}
    {children}
  </div>
);

export default Card;
