import React, { useState, useEffect, useRef, useCallback } from "react";
import { HomeButton } from "@/components/game";
import { Button } from "@/components/ui/button";
import { QUESTIONS } from "@/data/questions";
import { playCorrect, playWrong, playTick } from "@/lib/sounds";

const GAME_DURATION = 60;

export default function GameplayScreen({ onFinish }) {
  const [order] = useState(() => shuffle(QUESTIONS.map((_, i) => i)));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const timerRef = useRef(null);
  const endedRef = useRef(false);

  const isLast = index >= order.length - 1;
  const currentQuestion = QUESTIONS[order[index]];

  const endGame = useCallback(
    (won) => {
      if (endedRef.current) return;
      endedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      onFinish({ score, answered });
    },
    [score, answered, onFinish]
  );

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Time up -> win sound + end
  useEffect(() => {
    if (timeLeft === 0) endGame(true);
  }, [timeLeft, endGame]);

  // Final 5 seconds countdown tick
  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) playTick();
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    if (userAnswer) return;
    const correct = answer === currentQuestion.correctAnswer;
    setUserAnswer(answer);
    setIsCorrect(correct);
    setAnswered((a) => a + 1);
    if (correct) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
    }
  };

  const handleNext = () => {
    if (isLast) {
      endGame(true);
      return;
    }
    setUserAnswer(null);
    setIsCorrect(false);
    setIndex((i) => i + 1);
  };

  const timerColor = timeLeft <= 10 ? "text-red-600" : timeLeft <= 20 ? "text-orange-500" : "text-emerald-700";
  const timerBg = timeLeft <= 10 ? "bg-red-100/70" : timeLeft <= 20 ? "bg-orange-100/70" : "bg-white/60";

  return (
    <div className="relative min-h-screen flex flex-col px-6 pt-24 pb-6" dir="rtl">
      <HomeButton />

      {/* Header: timer + score */}
      <div className="flex items-center justify-between gap-4 mb-6 max-w-md mx-auto w-full">
        <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-md shadow-md border border-white/50 ${timerBg}`}>
          <span className={`text-3xl font-black tabular-nums ${timerColor}`}>
            {String(timeLeft).padStart(2, "0")}
          </span>
          <span className="text-sm font-medium text-emerald-800/70">שניות</span>
        </div>
        <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-100/70 backdrop-blur-md shadow-md border border-amber-200/50">
          <span className="text-3xl font-black text-amber-600 tabular-nums">{score}</span>
          <span className="text-sm font-medium text-amber-700/70">נכונות</span>
        </div>
      </div>

      {/* Card + buttons */}
      <div className="flex-1 flex flex-col items-center justify-start max-w-md mx-auto w-full pt-2">
        {/* Question counter */}
        <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/70 backdrop-blur-md border border-amber-200/60 shadow-sm">
          <span className="text-sm font-bold text-amber-700 tabular-nums">
            משפט {index + 1} מתוך {order.length}
          </span>
        </div>

        {/* Statement card */}
        <div
          key={currentQuestion.id}
          className="relative w-full rounded-3xl bg-white/45 backdrop-blur-xl border border-white/60 shadow-2xl p-8 min-h-[220px] flex items-center justify-center text-center"
          style={{ animation: "fadeIn 0.4s ease-out" }}
        >
          <p className="text-xl sm:text-2xl font-semibold text-emerald-900 leading-relaxed" dir="rtl">
            {currentQuestion.statement}
          </p>
        </div>

        {/* Two big buttons OR explanation */}
        <div className="w-full mt-6">
          {!userAnswer ? (
            <div className="flex gap-4" dir="rtl">
                          <button
                onClick={() => handleAnswer("אמת")}
                className="flex-1 py-8 rounded-2xl text-2xl font-bold text-white shadow-xl border-0 transition-all active:scale-95 bg-gradient-to-l from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
              >
                אמת
              </button>
              <button
                onClick={() => handleAnswer("מיתוס")}
                className="flex-1 py-8 rounded-2xl text-2xl font-bold text-white shadow-xl border-0 transition-all active:scale-95 bg-gradient-to-l from-red-500 to-rose-400 hover:from-red-600 hover:to-rose-500"
              >
                מיתוס
              </button>

            </div>
          ) : (
            <div className="rounded-3xl p-6 backdrop-blur-xl border shadow-2xl bg-white/55 border-white/60" style={{ animation: "fadeIn 0.3s ease-out" }}>
              <div
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-base mb-4 text-white ${
                  isCorrect ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {isCorrect ? "✓ תשובה נכונה!" : "✗ תשובה לא נכונה"}
              </div>
              <p className="text-emerald-900/90 text-base leading-relaxed text-right mb-5">
                {currentQuestion.explanation}
              </p>
              <Button
                onClick={handleNext}
                className="w-full py-5 text-lg font-bold rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg border-0 transition-all"
              >
                {isLast ? "לתוצאות ←" : "הבא ←"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}