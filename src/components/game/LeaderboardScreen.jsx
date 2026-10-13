import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Home } from "lucide-react";
import confetti from "canvas-confetti";
import { HOME_URL } from "@/data/questions";
import { playHallelujah } from "@/lib/sounds";

const STORAGE_KEY = "truthMyth_leaderboard";

export function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToLeaderboard(name, score) {
  const board = getLeaderboard();
  board.push({ name, score, date: new Date().toISOString() });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  return board;
}

export default function LeaderboardScreen({ playerName, score, onPlayAgain }) {
  const allEntries = useMemo(() => getLeaderboard(), []);

  useEffect(() => {
    playHallelujah();
    // burst from both sides
    const fire = (x) =>
      confetti({ particleCount: 90, spread: 75, origin: { x }, colors: ["#f59e0b", "#fbbf24", "#10b981", "#34d399", "#fff7ed"], disableForReducedMotion: true });
    fire(0);
    fire(1);
    const t = setTimeout(() => { fire(0.25); fire(0.75); }, 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16" dir="rtl">
      <div className="text-center max-w-lg w-full flex flex-col items-center">
        <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100/70 backdrop-blur-md shadow-lg border border-amber-200/60">
          <Trophy className="w-11 h-11 text-amber-600" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-emerald-800 mb-2">
          כל הכבוד {playerName}!
        </h2>
        <p className="text-emerald-700/80 text-lg mb-6">
          הניקוד שלך: <span className="font-bold text-amber-600">{score} תשובות נכונות</span>
        </p>

        {/* Leaderboard - scrollable full history */}
        <div className="w-full bg-white/55 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-5 mb-8">
          <h3 className="text-lg font-bold text-emerald-800 mb-4 text-center">היסטוריית שחקנים</h3>
          <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
            {allEntries.length === 0 && (
              <p className="text-emerald-700/50 text-center py-4">אין עדיין תוצאות שמורות</p>
            )}
            {allEntries.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                  i === 0
                    ? "bg-amber-100/80 border border-amber-300/60"
                    : "bg-white/50 border border-white/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      i === 0
                        ? "bg-amber-500 text-white"
                        : i === 1
                        ? "bg-amber-300 text-amber-900"
                        : i === 2
                        ? "bg-amber-200 text-amber-900"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-medium text-emerald-900">{entry.name}</span>
                </div>
                <span className="font-bold text-amber-600 tabular-nums">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button
            onClick={onPlayAgain}
            className="flex-1 py-5 text-lg font-bold rounded-2xl bg-gradient-to-l from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg border-0 transition-all"
          >
            <RotateCcw className="w-5 h-5 ml-2 inline" />
            משחק חדש
          </Button>
          <Button
            onClick={() => (window.location.href = HOME_URL)}
            className="flex-1 py-5 text-lg font-bold rounded-2xl bg-white/70 hover:bg-white/90 text-emerald-800 border-2 border-amber-300/60 shadow-md transition-all"
          >
            <Home className="w-5 h-5 ml-2 inline" />
          </Button>
        </div>
      </div>
    </div>
  );
}