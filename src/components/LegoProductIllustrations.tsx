import React from 'react';
import { PRODUCT_IMAGES } from '../data/productImages';

interface ProductImageProps {
  id: string;
  name: string;
  className?: string;
}

export const ProductIllustration: React.FC<ProductImageProps> = ({ id, name, className = 'w-full h-44' }) => {
  const imageSrc = PRODUCT_IMAGES[id];

  return (
    <div className={`relative overflow-hidden bg-white flex items-center justify-center ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`LEGO ${name}`}
          className="w-full h-full object-contain p-2 select-none"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
          LEGO {name}
        </div>
      )}
    </div>
  );
};
