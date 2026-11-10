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
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E3000B', '#FFD200', '#006CB7', '#00852B', '#FF7700'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center max-w-lg mx-auto w-full">
      <div className="w-full bg-slate-900 p-8 text-center flex flex-col items-center">
        {isCorrect ? (
          /* CORRECT STATE */
          <div className="flex flex-col items-center">
            {/* Simple Clean Green Checkmark */}
            <div className="w-24 h-24 mb-6 flex items-center justify-center bg-green-600 text-white rounded-full text-5xl font-black">
              ✓
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-6">
              Congratulations! Your answer is correct!
            </h1>
          </div>
        ) : (
          /* INCORRECT STATE */
          <div className="flex flex-col items-center">
            {/* Simple Clean Red X */}
            <div className="w-24 h-24 mb-6 flex items-center justify-center bg-red-600 text-white rounded-full text-5xl font-black">
              ✕
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4">
              Sorry, but your answer was incorrect!
            </h1>

            <div className="bg-slate-800 p-3 mb-6 w-full text-center">
              <p className="text-xl font-bold text-yellow-400">
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
            className="w-full sm:w-auto px-8"
          >
            New Customer
          </LegoButton>
        </div>
      </div>
    </div>
  );
};
