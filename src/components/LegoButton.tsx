import React from 'react';

interface LegoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  studsCount?: number; // Kept for backwards compatibility if passed, but squares removed
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
    red: {
      bg: 'bg-[#E3000B] hover:bg-[#F0141F]',
      borderBottom: 'border-b-[#8B0006]',
      borderTop: 'border-t-[#FF666E]',
      borderSide: 'border-x-[#B80009]',
      text: 'text-white',
    },
    yellow: {
      bg: 'bg-[#FFD200] hover:bg-[#FFE033]',
      borderBottom: 'border-b-[#B38F00]',
      borderTop: 'border-t-[#FFF380]',
      borderSide: 'border-x-[#CCA300]',
      text: 'text-[#2B1D00]',
    },
    blue: {
      bg: 'bg-[#006CB7] hover:bg-[#0A7FD4]',
      borderBottom: 'border-b-[#003B66]',
      borderTop: 'border-t-[#52B2F5]',
      borderSide: 'border-x-[#00528A]',
      text: 'text-white',
    },
    green: {
      bg: 'bg-[#00852B] hover:bg-[#05A337]',
      borderBottom: 'border-b-[#004D1A]',
      borderTop: 'border-t-[#3ADB6E]',
      borderSide: 'border-x-[#006622]',
      text: 'text-white',
    },
    orange: {
      bg: 'bg-[#FF7700] hover:bg-[#FF8E26]',
      borderBottom: 'border-b-[#B34B00]',
      borderTop: 'border-t-[#FFAF66]',
      borderSide: 'border-x-[#D95F00]',
      text: 'text-white',
    },
  };

  const sizeMap = {
    sm: 'text-sm px-4 py-2 min-h-[38px]',
    md: 'text-base px-6 py-2.5 min-h-[46px]',
    lg: 'text-lg sm:text-xl px-8 py-3.5 min-h-[54px]',
  };

  const c = colorMap[variant];

  return (
    <button
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center font-black
        font-sans uppercase tracking-wider rounded-none select-none
        transition-all duration-75 ease-out active:translate-y-1
        focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400
        ${c.bg} ${c.text} ${sizeMap[size]}
        ${
          disabled
            ? 'opacity-40 cursor-not-allowed filter grayscale active:translate-y-0'
            : 'cursor-pointer active:border-b-[2px]'
        }
        border-t-[3px] ${c.borderTop}
        border-x-[3px] ${c.borderSide}
        border-b-[6px] ${c.borderBottom}
        shadow-[0_6px_12px_rgba(0,0,0,0.4)]
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {children}
      </span>
    </button>
  );
};
