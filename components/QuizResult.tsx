'use client';

import { useState, useEffect, useRef } from 'react';
import ShareButtons from './ShareButtons';
import { Link } from '@/i18n/routing';

interface QuizResultProps {
  title: string;
  score: number;
  maxScore: number;
  level: string;
  levelDescription: string;
  levelColor: string;
  recommendations?: string[];
  shareText: string;
  shareUrl: string;
  ctaText: string;
  ctaHref: string;
  showEmailCapture?: boolean;
  emailPlaceholder?: string;
  emailButtonText?: string;
}

export default function QuizResult({
  title,
  score,
  maxScore,
  level,
  levelDescription,
  levelColor,
  recommendations,
  shareText,
  shareUrl,
  ctaText,
  ctaHref,
  showEmailCapture = false,
  emailPlaceholder = 'votre@email.com',
  emailButtonText = 'Recevoir mon rapport',
}: QuizResultProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const hasAnimated = useRef(false);

  // Score counter animation from 0 to score
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), score);
      setAnimatedScore(current);
      if (step >= steps) {
        clearInterval(timer);
        setAnimatedScore(score);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // Circular progress SVG values
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percent = maxScore > 0 ? animatedScore / maxScore : 0;
  const strokeDashoffset = circumference * (1 - percent);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError('');
    setEmailLoading(true);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'quiz', quizTitle: title }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setEmailSubmitted(true);
    } catch (err) {
      setEmailError(
        err instanceof Error ? err.message : 'Une erreur est survenue'
      );
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden">
      {/* CSS-only confetti effect on mount */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full opacity-0"
            style={{
              width: `${6 + (i % 4) * 3}px`,
              height: `${6 + (i % 4) * 3}px`,
              backgroundColor: [
                '#FF0000',
                '#1B2A4A',
                '#FFD700',
                '#25D366',
                '#0A66C2',
                '#FF6B6B',
              ][i % 6],
              left: `${(i * 3.33) % 100}%`,
              top: '-10px',
              animation: `confetti-fall ${2 + (i % 3) * 0.5}s ease-in ${(i % 10) * 0.15}s forwards`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(600px) rotate(720deg);
          }
        }
      `}</style>

      <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        {/* Title */}
        <h2 className="mb-8 text-center text-2xl font-bold text-[#1B2A4A] sm:text-3xl">
          {title}
        </h2>

        {/* Circular progress indicator with animated score */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <svg
              className="absolute h-full w-full -rotate-90"
              viewBox="0 0 160 160"
            >
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="10"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={levelColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 ease-out"
              />
            </svg>
            {/* Score number */}
            <div className="z-10 text-center">
              <span className="text-4xl font-bold text-[#1B2A4A]">
                {animatedScore}
              </span>
              <span className="text-lg text-gray-400">/{maxScore}</span>
            </div>
          </div>
        </div>

        {/* Level badge */}
        <div className="mb-4 text-center">
          <span
            className="inline-block rounded-full px-5 py-2 text-sm font-bold text-white"
            style={{ backgroundColor: levelColor }}
          >
            {level}
          </span>
        </div>

        {/* Level description */}
        <p className="mx-auto mb-8 max-w-lg text-center text-base leading-relaxed text-gray-600">
          {levelDescription}
        </p>

        {/* Recommendations list */}
        {recommendations && recommendations.length > 0 && (
          <div className="mb-8 rounded-xl border border-gray-200 bg-[#F5F5F5] p-5 sm:p-6">
            <h3 className="mb-3 text-base font-semibold text-[#1B2A4A]">
              Nos recommandations
            </h3>
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm leading-relaxed text-gray-700"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#FF0000]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share buttons row */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-gray-500">
            Partagez votre résultat
          </span>
          <ShareButtons url={shareUrl} text={shareText} />
        </div>

        {/* Email capture */}
        {showEmailCapture && (
          <div className="mb-8 rounded-xl border border-gray-200 bg-[#F5F5F5] p-5 sm:p-6">
            {emailSubmitted ? (
              <div className="text-center">
                <svg
                  className="mx-auto h-10 w-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-3 text-sm font-semibold text-green-800">
                  Votre rapport détaillé arrive dans votre boîte mail !
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <p className="text-sm font-medium text-[#1B2A4A]">
                  Recevez votre rapport détaillé par email
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={emailPlaceholder}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-2 focus:ring-[#FF0000]/20"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="shrink-0 rounded-lg bg-[#FF0000] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {emailLoading ? '...' : emailButtonText}
                  </button>
                </div>
                {emailError && (
                  <p className="text-sm text-red-600">{emailError}</p>
                )}
              </form>
            )}
          </div>
        )}

        {/* CTA button */}
        <div className="text-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-lg bg-[#1B2A4A] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2a3f6e] hover:shadow-md"
          >
            {ctaText}
            <svg
              className="ml-2 h-5 w-5"
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
          </Link>
        </div>
      </div>
    </div>
  );
}
