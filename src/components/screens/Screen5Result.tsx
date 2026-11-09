import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LegoButton } from '../LegoButton';

interface Screen5ResultProps {
  isCorrect: boolean;
  correctAnswer: number;
  userAnswer: number;
  onNewCustomer: () => void;
}

export const Screen5Result: React.FC<Screen5ResultProps> = ({
  isCorrect,
  correctAnswer,
  onNewCustomer,
}) => {
  useEffect(() => {
    if (isCorrect) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#E3000B', '#FFD200', '#006CB7', '#00852B', '#FF7700'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#E3000B', '#FFD200', '#006CB7', '#00852B', '#FF7700'],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isCorrect]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center max-w-2xl mx-auto">
      {/* Result Container without edge squares */}
      <div
        className={`w-full bg-[#0E2643] border-4 ${
          isCorrect ? 'border-[#00852B]' : 'border-[#E3000B]'
        } p-8 sm:p-12 shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col items-center`}
      >
        {isCorrect ? (
          /* CORRECT STATE */
          <div className="flex flex-col items-center">
            {/* Clean Bold Green Checkmark (NO DOTS) */}
            <div className="mb-6" aria-hidden="true">
              <svg
                viewBox="0 0 140 140"
                className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_8px_16px_rgba(0,133,43,0.5)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 3D Drop Shadow */}
                <path
                  d="M25 75 L55 105 L115 35"
                  stroke="#004D1A"
                  strokeWidth="24"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                {/* Main Green Bar */}
                <path
                  d="M25 70 L55 100 L115 30"
                  stroke="#00852B"
                  strokeWidth="22"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                {/* Top Highlight Rim */}
                <path
                  d="M25 68 L55 98 L115 28"
                  stroke="#3ADB6E"
                  strokeWidth="6"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  opacity="0.8"
                />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-sans text-green-400 drop-shadow mb-8 leading-tight">
              Congratulations! Your answer is correct!
            </h1>
          </div>
        ) : (
          /* INCORRECT STATE */
          <div className="flex flex-col items-center">
            {/* Clean Bold Red X (NO DOTS) */}
            <div className="mb-6" aria-hidden="true">
              <svg
                viewBox="0 0 140 140"
                className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_8px_16px_rgba(227,0,11,0.5)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 3D Drop Shadow */}
                <line x1="30" y1="35" x2="110" y2="115" stroke="#6B0005" strokeWidth="24" strokeLinecap="square" />
                <line x1="110" y1="35" x2="30" y2="115" stroke="#6B0005" strokeWidth="24" strokeLinecap="square" />
                {/* Main Red Cross */}
                <line x1="30" y1="30" x2="110" y2="110" stroke="#E3000B" strokeWidth="22" strokeLinecap="square" />
                <line x1="110" y1="30" x2="30" y2="110" stroke="#E3000B" strokeWidth="22" strokeLinecap="square" />
                {/* Highlight */}
                <line x1="30" y1="28" x2="110" y2="108" stroke="#FF666E" strokeWidth="6" strokeLinecap="square" opacity="0.8" />
                <line x1="110" y1="28" x2="30" y2="108" stroke="#FF666E" strokeWidth="6" strokeLinecap="square" opacity="0.8" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-sans text-[#FF4D55] drop-shadow mb-4 leading-tight">
              Sorry, but your answer was incorrect!
            </h1>

            <div className="bg-black/60 border-2 border-red-500/80 px-6 py-3 mb-8">
              <p className="text-xl sm:text-2xl font-black font-sans text-[#FFE600]">
                The correct answer is ${correctAnswer}
              </p>
            </div>
          </div>
        )}

        {/* ONE Button: New Customer */}
        <div className="w-full flex justify-center">
          <LegoButton
            onClick={onNewCustomer}
            variant="blue"
            size="lg"
            className="w-full sm:w-auto min-w-[220px] text-base"
          >
            New Customer
          </LegoButton>
        </div>
      </div>
    </div>
  );
};
