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
      setErrorMsg('Please enter a valid numerical dollar amount (e.g. 45 or $45).');
      return;
    }

    setErrorMsg('');
    const isCorrect = Math.abs(parsed - correctAnswer) < 0.01;
    onSubmitAnswer(parsed, isCorrect, correctAnswer);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title without edge squares */}
      <div className="bg-[#E3000B] border-4 border-[#8B0006] p-4 text-center mb-8 shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#FFE600] drop-shadow-[0_2px_0_#997300]">
          Math Challenge
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Authentic Yellow Sticky Note */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-[#FFF775] border-2 border-[#E6DB55] p-6 text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.4)] relative font-sans">
            {/* Top Adhesive Strip */}
            <div className="bg-[#FFE838] -mx-6 -mt-6 px-6 py-2.5 mb-4 border-b border-[#D4C322] flex items-center justify-between">
              <span className="font-black text-sm uppercase tracking-wider text-[#4A4100]">
                Shopping List
              </span>
              <span className="text-xs font-bold text-[#4A4100]">
                Math Project
              </span>
            </div>

            {/* Sticky Note Shopping List Items */}
            <div className="space-y-3 text-base">
              {cart.map((item) => {
                const subtotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between border-b border-[#E6DB55] pb-2 font-medium"
                  >
                    <div>
                      <span className="font-bold text-black">{item.product.name}</span>
                      <span className="text-slate-700 text-xs ml-2">
                        ({item.quantity} × ${item.product.price})
                      </span>
                    </div>
                    <div className="font-bold text-black font-mono">
                      ${subtotal}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Quantity at Bottom - Final price strictly omitted */}
            <div className="mt-6 pt-3 border-t-2 border-black/20 flex items-center justify-between">
              <span className="font-black text-base uppercase tracking-wider text-black">
                Total Items:
              </span>
              <span className="font-black text-xl text-black bg-[#FFE838] px-3 py-0.5 border border-black/20">
                {totalItemsCount}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Calculation sentence and answer input without edge squares */}
        <div className="bg-[#0E2643] border-4 border-[#0055BF] p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EXACT required sentence */}
            <p className="text-xl sm:text-2xl text-[#FFE600] font-black font-sans leading-snug">
              &quot;Calculate how much everything costs, and write it down please&quot;
            </p>

            <div>
              <label
                htmlFor="math-answer"
                className="block text-sm font-bold uppercase tracking-wider text-slate-200 mb-2 font-sans"
              >
                Enter Total Cost ($):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-amber-500 pointer-events-none">
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
                  className="w-full pl-10 pr-4 py-3 text-2xl font-black text-black bg-white rounded-none border-4 border-[#FFD200] focus:border-[#E3000B] outline-none"
                />
              </div>

              {errorMsg && (
                <p className="mt-2 text-[#FF4D55] font-bold text-sm bg-black/60 px-3 py-1 border-l-4 border-[#FF4D55]">
                  {errorMsg}
                </p>
              )}
            </div>

            <div className="pt-2">
              <LegoButton
                type="submit"
                variant="green"
                size="lg"
                className="w-full text-base"
              >
                Enter / Submit
              </LegoButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
