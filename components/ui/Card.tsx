import React from 'react';

export const Card: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = '', children }) => {
  return <div className={`card p-6 ${className}`}>{children}</div>;
};

export default Card;
