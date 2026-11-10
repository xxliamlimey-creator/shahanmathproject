import React, { useState } from 'react';
import { CartItem } from '../../types';
import { LegoButton } from '../LegoButton';

interface Screen4ChallengeProps {
  cart: CartItem[];
  onSubmitAnswer: (userAnswer: number, isCorrect: boolean, correctAnswer: number) => void;
}

export const Screen4Challenge: React.FC<Screen4ChallengeProps> = ({ cart, onSubmitAnswer }) => {
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const correctAnswer = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanStr = inputVal.trim().replace(/^\$/, '').trim();

    if (!cleanStr) {
      setErrorMsg('Please enter your calculated answer before submitting!');
      return;
    }

    const parsed = parseFloat(cleanStr);
    if (isNaN(parsed) || parsed < 0) {
      setErrorMsg('Please enter a valid number (e.g. 45 or $45).');
      return;
    }

    setErrorMsg('');
    const isCorrect = Math.abs(parsed - correctAnswer) < 0.01;
    onSubmitAnswer(parsed, isCorrect, correctAnswer);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">
          Math Challenge
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Simple Yellow Sticky Note */}
        <div className="bg-yellow-200 text-black p-6">
          <div className="border-b border-yellow-400 pb-2 mb-4">
            <h2 className="text-xl font-bold">
              Shopping List
            </h2>
          </div>

          <div className="space-y-2 text-sm">
            {cart.map((item) => {
              const subtotal = item.product.price * item.quantity;
              return (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between border-b border-yellow-300 pb-1"
                >
                  <div>
                    <span className="font-semibold">{item.product.name}</span>
                    <span className="text-gray-700 text-xs ml-2">
                      ({item.quantity} × ${item.product.price})
                    </span>
                  </div>
                  <div className="font-bold">
                    ${subtotal}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total quantity at bottom (NO total price on this screen) */}
          <div className="mt-4 pt-2 border-t-2 border-yellow-400 flex items-center justify-between font-bold">
            <span>Total Items:</span>
            <span>{totalItemsCount}</span>
          </div>
        </div>

        {/* Right Side: Calculation Form */}
        <div className="bg-slate-900 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-lg font-bold text-yellow-400">
              &quot;Calculate how much everything costs, and write it down please&quot;
            </p>

            <div>
              <label htmlFor="math-answer" className="block text-sm text-gray-300 mb-1">
                Your Answer ($):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-500">
                  $
                </span>
                <input
                  id="math-answer"
                  type="text"
                  inputMode="decimal"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter total amount..."
                  autoFocus
                  className="w-full pl-8 pr-3 py-2 text-xl font-bold text-black bg-white border border-gray-300 outline-none"
                />
              </div>

              {errorMsg && (
                <p className="mt-2 text-red-400 text-sm font-semibold">
                  {errorMsg}
                </p>
              )}
            </div>

            <LegoButton
              type="submit"
              variant="green"
              size="lg"
              className="w-full"
            >
              Enter / Submit
            </LegoButton>
          </form>
        </div>
      </div>
    </div>
  );
};
