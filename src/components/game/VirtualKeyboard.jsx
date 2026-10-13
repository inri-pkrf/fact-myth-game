import React, { useState } from "react";
import { Delete, Smile } from "lucide-react";

// Hebrew phone keyboard rows, written RIGHT-TO-LEFT (first item = rightmost).
// Backspace sits at the far-left end of the top row.
const LETTERS = [
  ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "⌫"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך"],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
];

const NUMBERS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["-", "/", ":", ";", "(", ")", "$", "&", "@", "\""],
  [".", ",", "?", "!", "'", "*", "#", "%", "+"],
];

const EMOJIS = [
  ["😀", "😂", "😍", "😎", "🤩", "😇", "🤔", "👍"],
  ["👏", "🙌", "💪", "🥳", "🎉", "⭐", "🌟", "✨"],
  ["❤️", "🔥", "💯", "🏆", "🚀", "🌈", "🌻", "🐝"],
  ["🦋", "🌳", "🍀", "☀️", "⚽", "🎵", "🍕", "🍦"],
];

export default function VirtualKeyboard({ onKey, onBackspace, onSubmit }) {
  const [mode, setMode] = useState("letters");

  // Each row uses flex-row-reverse + dir=ltr so the FIRST item in the array
  // is always rendered on the RIGHT, regardless of inherited direction.
  const Row = ({ children }) => (
    <div
      className="flex flex-row gap-1.5 justify-center w-full"
      dir="ltr"
    >
      {children}
    </div>
  );

  const Key = ({ children, onClick, className = "", wide = false }) => (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-2xl bg-white/85 hover:bg-white text-emerald-900 font-bold text-lg shadow-md border border-amber-200/70 active:scale-95 transition-all flex items-center justify-center ${wide ? "flex-[3]" : "flex-1"} ${className}`}
    >
      {children}
    </button>
  );

  const FuncKey = ({ children, onClick, className = "", wide = false }) => (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-2xl bg-amber-200/70 hover:bg-amber-200 text-amber-900 font-bold shadow-md border border-amber-300/70 active:scale-95 transition-all flex items-center justify-center ${wide ? "flex-[3]" : "flex-1"} ${className}`}
    >
      {children}
    </button>
  );

  const renderRow = (row, ri) => (
    <Row key={`r-${ri}`}>
      {row.map((k, i) =>
        k === "⌫" ? (
          <FuncKey key={`bs-${ri}`} onClick={onBackspace} className="flex-[1.4]">
            <Delete className="w-5 h-5" />
          </FuncKey>
        ) : (
          <Key key={`k-${ri}-${i}`} onClick={() => onKey(k)}>
            {k}
          </Key>
        )
      )}
    </Row>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white/55 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-2.5 flex flex-col gap-1.5">
      {mode === "letters" && LETTERS.map((row, ri) => renderRow(row, ri))}

      {mode === "numbers" && NUMBERS.map((row, ri) => renderRow(row, ri))}

      {mode === "emojis" &&
        EMOJIS.map((row, ri) => (
          <Row key={`e-${ri}`}>
            {row.map((k, i) => (
              <Key key={`e-${ri}-${i}`} onClick={() => onKey(k)} className="text-2xl">
                {k}
              </Key>
            ))}
          </Row>
        ))}

      {/* Bottom functional row: right-to-left => [אישור, space, emoji, 123] */}
      <Row>
        <button
          type="button"
          onClick={onSubmit}
          className="h-12 flex-[1.6] rounded-2xl text-base bg-gradient-to-l from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg border-0 active:scale-95 transition-all flex items-center justify-center"
        >
          <span dir="rtl">אישור</span>
        </button>

        <Key onClick={() => onKey(" ")} wide>
          <span dir="rtl">רווח</span>
        </Key>

        <FuncKey
          onClick={() => setMode(mode === "emojis" ? "letters" : "emojis")}
          className={mode === "emojis" ? "ring-2 ring-amber-400" : ""}
        >
          <Smile className="w-5 h-5" />
        </FuncKey>

        <FuncKey onClick={() => setMode(mode === "numbers" ? "letters" : "numbers")}>
          {mode === "numbers" ? "אב" : "123"}
        </FuncKey>
      </Row>
    </div>
  );
}