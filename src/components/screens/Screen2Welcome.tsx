import React from 'react';
import { LegoButton } from '../LegoButton';

interface Screen2WelcomeProps {
  customerName: string;
  onNext: () => void;
}

export const Screen2Welcome: React.FC<Screen2WelcomeProps> = ({ customerName, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center max-w-lg mx-auto">
      <div className="w-full bg-slate-900 p-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-8 leading-snug">
          Hi {customerName}, Welcome to the Mini Shop.
        </h1>

        <div className="flex justify-center">
          <LegoButton
            onClick={onNext}
            variant="green"
            size="lg"
            className="w-full sm:w-auto px-8"
          >
            Next
          </LegoButton>
        </div>
      </div>
    </div>
  );
};
