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
    sm: 'text-lg md:text-xl font-bold',
    md: 'text-2xl md:text-3xl font-extrabold',
    lg: 'text-3xl md:text-4xl lg:text-5xl font-black',
    xl: 'text-4xl md:text-5xl lg:text-6xl font-black',
    '2xl': 'text-5xl md:text-6xl lg:text-7xl font-black',
  };

  const colorClasses = {
    yellow: 'text-[#FFE600] drop-shadow-[0_3px_0_#997300]',
    white: 'text-white drop-shadow-[0_3px_0_#1E293B]',
    red: 'text-[#FF333D] drop-shadow-[0_3px_0_#8B0006]',
  };

  return (
    <Tag
      className={`font-sans tracking-tight leading-tight select-none ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      {text}
    </Tag>
  );
};
