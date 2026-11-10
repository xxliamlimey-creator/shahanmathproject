import React from 'react';

interface LegoTypographyProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
  color?: 'yellow' | 'white' | 'red';
}

export const LegoTypography: React.FC<LegoTypographyProps> = ({
  text,
  size = 'lg',
  className = '',
  tag: Tag = 'h1',
  color = 'yellow',
}) => {
  const sizeClasses = {
    sm: 'text-lg font-bold',
    md: 'text-2xl font-bold',
    lg: 'text-3xl font-extrabold',
    xl: 'text-4xl font-extrabold',
    '2xl': 'text-5xl font-black',
  };

  const colorClasses = {
    yellow: 'text-yellow-400',
    white: 'text-white',
    red: 'text-red-500',
  };

  return (
    <Tag className={`font-sans ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      {text}
    </Tag>
  );
};
