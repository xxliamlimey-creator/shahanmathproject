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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-slate-900 p-8 text-center"
      >
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          Welcome to the Mini Shop!
        </h1>

        <div className="mb-6 text-left">
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
              w-full px-4 py-3 text-lg font-medium text-black bg-white
              border-2 outline-none
              ${error ? 'border-red-500' : 'border-gray-300 focus:border-yellow-400'}
            `}
          />
          {error && (
            <p className="mt-2 text-red-400 text-sm font-semibold">
              Please enter your name to continue!
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <LegoButton
            type="submit"
            variant="green"
            size="lg"
            className="w-full"
          >
            Continue
          </LegoButton>
        </div>
      </form>
    </div>
  );
};
