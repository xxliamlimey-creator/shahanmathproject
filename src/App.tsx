import React, { useState } from 'react';
import { ScreenStep, CartItem } from './types';
import { Screen1Name } from './components/screens/Screen1Name';
import { Screen2Welcome } from './components/screens/Screen2Welcome';
import { Screen3Shopping } from './components/screens/Screen3Shopping';
import { Screen4Challenge } from './components/screens/Screen4Challenge';
import { Screen5Result } from './components/screens/Screen5Result';

export default function App() {
  // Screen 1 through 5 state. In-memory only: refreshing browser always starts at Screen 1.
  const [currentStep, setCurrentStep] = useState<ScreenStep>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  // Transition from Screen 1 -> Screen 2
  const handleNameSubmit = (name: string) => {
    setCustomerName(name);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transition from Screen 2 -> Screen 3
  const handleWelcomeNext = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transition from Screen 3 -> Screen 4
  const handleShoppingNext = () => {
    if (cart.length === 0) return;
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transition from Screen 4 -> Screen 5
  const handleAnswerSubmit = (submittedVal: number, correct: boolean, actualTotal: number) => {
    setUserAnswer(submittedVal);
    setIsCorrect(correct);
    setCorrectAnswer(actualTotal);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset entire application to Screen 1
  const handleNewCustomer = () => {
    setCustomerName('');
    setCart([]);
    setUserAnswer(0);
    setIsCorrect(false);
    setCorrectAnswer(0);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col justify-center items-center font-sans p-4 sm:p-6">
      {/* Main Content Area — Screen rendering */}
      <main className="w-full max-w-5xl mx-auto flex flex-col justify-center items-center py-4">
        {currentStep === 1 && (
          <div className="w-full">
            <Screen1Name onContinue={handleNameSubmit} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="w-full">
            <Screen2Welcome customerName={customerName} onNext={handleWelcomeNext} />
          </div>
        )}

        {currentStep === 3 && (
          <div className="w-full">
            <Screen3Shopping
              cart={cart}
              onUpdateCart={setCart}
              onNext={handleShoppingNext}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="w-full">
            <Screen4Challenge cart={cart} onSubmitAnswer={handleAnswerSubmit} />
          </div>
        )}

        {currentStep === 5 && (
          <div className="w-full">
            <Screen5Result
              isCorrect={isCorrect}
              correctAnswer={correctAnswer}
              userAnswer={userAnswer}
              onNewCustomer={handleNewCustomer}
            />
          </div>
        )}
      </main>
    </div>
  );
}
