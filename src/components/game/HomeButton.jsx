import React from "react";
import { HOME_URL, HOME_BTN_IMG } from "@/data/questions";

export default function HomeButton() {
  return (
    <button
      onClick={() => (window.location.href = HOME_URL)}
      style={{ width: "clamp(55px, 8vw, 85px)", height: "clamp(55px, 8vw, 85px)", backgroundColor: "rgba(247, 179, 124, 0.9)" }}
      className="fixed top-5 left-5 z-50 rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      aria-label="בית"
    >
      <img src={HOME_BTN_IMG} alt="בית" className="w-[70%] h-[70%] object-cover" />
    </button>
  );
}