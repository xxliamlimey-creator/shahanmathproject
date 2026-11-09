import React, { useState } from 'react';
import { LegoButton } from '../LegoButton';

interface Screen1NameProps {
  onContinue: (name: string) => void;
}

export const Screen1Name: React.FC<Screen1NameProps> = ({ onContinue }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(true);
      return;
    }
    setError(false);
    onContinue(trimmed);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center max-w-lg mx-auto">
      {/* Clean rectangular form card with no top squares */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#0E2643] border-4 border-[#0055BF] p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
      >
        {/* Title directly inside the UI without separate top sign */}
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#FFE600] drop-shadow-[0_2px_0_#997300] mb-8">
          Welcome to the Mini Shop!
        </h1>

        <div className="relative mb-6 text-left">
          <label htmlFor="customer-name" className="sr-only">
            Enter your name
          </label>
          <input
            id="customer-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error && e.target.value.trim()) setError(false);
            }}
            placeholder="Enter your name..."
            autoFocus
            className={`
              w-full px-4 py-3.5 text-xl font-bold text-slate-900 bg-white rounded-none
              border-4 transition-all font-sans
              placeholder:text-slate-400 placeholder:font-normal
              ${error ? 'border-[#E3000B] ring-4 ring-red-500/30' : 'border-[#FFD200] focus:border-[#E3000B]'}
            `}
          />
          {error && (
            <p className="mt-2 text-[#FF4D55] font-bold text-sm bg-black/70 px-3 py-1 border-l-4 border-[#FF4D55]">
              Please enter your name to continue!
            </p>
          )}
        </div>

        <div className="flex justify-center pt-2">
          <LegoButton
            type="submit"
            variant="green"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
          >
            Continue
          </LegoButton>
        </div>
      </form>
    </div>
  );
};
