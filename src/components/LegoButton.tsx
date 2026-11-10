import React from 'react';

interface LegoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  studsCount?: number;
}

export const LegoButton: React.FC<LegoButtonProps> = ({
  variant = 'red',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const colorMap = {
    red: 'bg-red-600 hover:bg-red-700 text-white',
    yellow: 'bg-yellow-400 hover:bg-yellow-500 text-slate-900',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    green: 'bg-green-600 hover:bg-green-700 text-white',
    orange: 'bg-orange-500 hover:bg-orange-600 text-white',
  };

  const sizeMap = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-bold
        font-sans transition-colors cursor-pointer select-none
        ${colorMap[variant]} ${sizeMap[size]}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'active:opacity-90'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
