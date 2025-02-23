import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, to, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500',
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonStyles}>
      {children}
    </button>
  );
}