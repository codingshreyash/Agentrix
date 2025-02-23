import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'emerald' | 'orange' | 'purple';
  className?: string;
}

export function Button({ children, to, onClick, variant = 'emerald', className = '' }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  const variants = {
    emerald: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500',
    orange: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    purple: 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500',
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