import React from "react";
import { HomeButton } from "@/components/game";
import { Button } from "@/components/ui/button";
import { BookOpen, Timer } from "lucide-react";

export default function InstructionsScreen({ onStart }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16" dir="rtl">
      <HomeButton />

      <div className="text-center max-w-2xl w-full flex flex-col items-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-emerald-800 mb-10">
          איך משחקים?
        </h2>

        <div className="flex flex-col gap-5 w-full mb-10">
          <InstructionCard
            icon={<BookOpen className="w-12 h-12 text-emerald-600" />}
            title="קרא/י את המשפט ובחר/י: אמת או מיתוס"
            desc="לחצ/י על הכפתור המתאים מתחת לכל טענה"
          />
          <InstructionCard
            icon={<Timer className="w-12 h-12 text-amber-600" />}
            title="60 שניות"
            desc="לרשותך 60 שניות לענות על כמה שיותר שאלות!"
          />
        </div>

        <Button
          onClick={onStart}
          className="w-full max-w-md py-6 text-xl font-bold rounded-2xl bg-gradient-to-l from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-xl border-0 transition-all"
        >
          אני מוכן, בואו נתחיל!
        </Button>
      </div>
    </div>
  );
}

function InstructionCard({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-5 bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-md text-right">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-emerald-800">{title}</span>
        <span className="text-emerald-700/70 text-sm">{desc}</span>
      </div>
    </div>
  );
}