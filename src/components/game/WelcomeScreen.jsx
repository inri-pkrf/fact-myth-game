import React, { useState } from "react";
import { HomeButton } from "@/components/game";
import { Button } from "@/components/ui/button";
import VirtualKeyboard from "@/components/game/VirtualKeyboard";


export default function WelcomeScreen({ onStart }) {
  const [name, setName] = useState("");
  const [active, setActive] = useState(false);

  const submit = () => {
    const trimmed = name.trim();
    if (trimmed) onStart(trimmed);
  };

  const handleKey = (k) => setName((n) => (n.length < 20 ? n + k : n));
  const handleBackspace = () => setName((n) => n.slice(0, -1));

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-10" dir="rtl">
      <HomeButton />

      <div className="text-center max-w-2xl w-full flex flex-col items-center">
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-emerald-800 mb-3 drop-shadow-sm">
          אמת או מיתוס?
        </h1>
        <p className="text-emerald-700/80 text-lg mb-8 font-medium">
          משחק שמלמד אותך להתנהג נכון במצבי חירום
        </p>

        <div className="w-full max-w-md flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setActive(true)}
            className="w-full px-6 py-4 text-lg text-center rounded-2xl bg-white/70 backdrop-blur-md border-2 border-amber-200/60 focus:border-amber-400 focus:outline-none text-emerald-900 shadow-lg transition-colors"
          >
            {name || "הקלק/י כאן להזנת שם"}
          </button>

          {active ? (
            <VirtualKeyboard
              onKey={handleKey}
              onBackspace={handleBackspace}
              onSubmit={submit}
            />
          ) : (
            <Button
              onClick={submit}
              disabled={!name.trim()}
              className="w-full py-6 text-xl font-bold rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl border-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              להוראות והתחלה
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}