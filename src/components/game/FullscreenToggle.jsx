import React, { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export default function FullscreenToggle() {
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFs ? "יציאה ממסך מלא" : "מסך מלא"}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/70 backdrop-blur-md shadow-lg border border-amber-200/60 flex items-center justify-center text-emerald-800 hover:bg-white/90 active:scale-95 transition-all"
    >
      {isFs ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
    </button>
  );
}