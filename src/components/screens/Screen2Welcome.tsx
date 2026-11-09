import React from 'react';
import { LegoButton } from '../LegoButton';

interface Screen2WelcomeProps {
  customerName: string;
  onNext: () => void;
}

export const Screen2Welcome: React.FC<Screen2WelcomeProps> = ({ customerName, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center max-w-xl mx-auto">
      {/* Clean card without edge squares */}
      <div className="w-full bg-[#0E2643] border-4 border-[#FFD200] p-8 sm:p-12 shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col items-center">
        {/* Large bold greeting */}
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#FFE600] drop-shadow-[0_2px_0_#997300] mb-8 leading-tight">
          Hi {customerName}, Welcome to the Mini Shop.
        </h1>

        {/* LEGO-style Next button without squares */}
        <div className="flex justify-center">
          <LegoButton
            onClick={onNext}
            variant="green"
            size="lg"
            className="min-w-[200px]"
          >
            Next
          </LegoButton>
        </div>
      </div>
    </div>
  );
};
