'use client';

import { useState, useCallback } from 'react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; points?: number }[];
  explanation?: string;
}

interface QuizEngineProps {
  title: string;
  questions: QuizQuestion[];
  onComplete: (answers: Record<number, string>, totalPoints: number) => void;
  showProgress?: boolean;
  showExplanation?: boolean;
}

export default function QuizEngine({
  title,
  questions,
  onComplete,
  showProgress = true,
  showExplanation = false,
}: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [showingExplanation, setShowingExplanation] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const computeTotalPoints = useCallback(
    (allAnswers: Record<number, string>) => {
      let total = 0;
      for (const question of questions) {
        const answerValue = allAnswers[question.id];
        if (answerValue) {
          const option = question.options.find((o) => o.value === answerValue);
          if (option?.points !== undefined) {
            total += option.points;
          }
        }
      }
      return total;
    },
    [questions]
  );

  function advanceToNext(updatedAnswers: Record<number, string>) {
    if (isLastQuestion) {
      const totalPoints = computeTotalPoints(updatedAnswers);
      onComplete(updatedAnswers, totalPoints);
      return;
    }

    setSlideDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelectedValue(null);
      setShowingExplanation(false);
      setIsAnimating(false);
    }, 300);
  }

  function handleSelect(value: string) {
    if (selectedValue !== null || isAnimating) return;

    setSelectedValue(value);

    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    if (showExplanation && currentQuestion.explanation) {
      setTimeout(() => {
        setShowingExplanation(true);
      }, 400);
    } else {
      setTimeout(() => {
        advanceToNext(updatedAnswers);
      }, 500);
    }
  }

  function handleContinueAfterExplanation() {
    advanceToNext(answers);
  }

  function handleBack() {
    if (currentIndex === 0 || isAnimating) return;

    setSlideDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedValue(null);
      setShowingExplanation(false);
      setIsAnimating(false);
    }, 300);
  }

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Title */}
      <h2 className="mb-6 text-center text-2xl font-bold text-[#1B2A4A] sm:text-3xl">
        {title}
      </h2>

      {/* Progress bar */}
      {showProgress && (
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
            <span>
              Question {currentIndex + 1} / {totalQuestions}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#FF0000] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Question card with slide animation */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isAnimating
            ? slideDirection === 'left'
              ? '-translate-x-8 opacity-0'
              : 'translate-x-8 opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Question text */}
          <p className="mb-6 text-lg font-semibold leading-relaxed text-[#1B2A4A] sm:text-xl">
            {currentQuestion.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedValue === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  disabled={selectedValue !== null}
                  className={`flex w-full items-center rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all duration-200 ${
                    isSelected
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : selectedValue !== null
                        ? 'cursor-default border-gray-100 bg-gray-50 text-gray-400'
                        : 'border-gray-200 bg-white text-[#1B2A4A] hover:border-[#1B2A4A]/30 hover:bg-[#F5F5F5]'
                  }`}
                >
                  <span
                    className={`mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-200 ${
                      isSelected
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {isSelected ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Explanation panel */}
          {showingExplanation && currentQuestion.explanation && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-semibold text-blue-800">
                  Explication
                </span>
              </div>
              <p className="text-sm leading-relaxed text-blue-700">
                {currentQuestion.explanation}
              </p>
              <button
                type="button"
                onClick={handleContinueAfterExplanation}
                className="mt-4 inline-flex items-center rounded-lg bg-[#1B2A4A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B2A4A]/90"
              >
                {isLastQuestion ? 'Voir les résultats' : 'Question suivante'}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      {currentIndex > 0 && !showingExplanation && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleBack}
            disabled={isAnimating}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#1B2A4A] disabled:opacity-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Question précédente
          </button>
        </div>
      )}
    </div>
  );
}
