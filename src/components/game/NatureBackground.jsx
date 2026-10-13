import React from "react";

export default function NatureBackground() {
  const blades = Array.from({ length: 48 }, (_, i) => i);
  const blades2 = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-amber-100 via-emerald-50 to-emerald-200">
      {/* Breathing sun */}
      <div
        className="absolute rounded-full bg-gradient-radial from-amber-200 via-amber-100 to-transparent"
        style={{
          width: "60vmax",
          height: "60vmax",
          top: "-25vmax",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "breathe 8s ease-in-out infinite",
          filter: "blur(20px)",
        }}
      />

      {/* Sun rays */}
      <div
        className="absolute"
        style={{
          width: "80vmax",
          height: "80vmax",
          top: "-40vmax",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(255,224,130,0.5) 0%, rgba(255,224,130,0) 60%)",
          animation: "breathe 10s ease-in-out infinite",
        }}
      />

      {/* Clouds */}
      <div className="absolute top-[12%] left-[5%] animate-drift" style={{ animationDuration: "38s" }}>
        <Cloud />
      </div>
      <div className="absolute top-[24%] right-[8%] animate-drift-slow" style={{ animationDuration: "52s" }}>
        <Cloud size={0.8} />
      </div>
      <div className="absolute top-[40%] left-[20%] animate-drift" style={{ animationDuration: "46s" }}>
        <Cloud size={0.6} />
      </div>

      {/* Flying bees & butterflies */}
      <Flyer top="22%" duration={26} delay={0} direction="ltr" type="butterfly" color="#f59e0b" />
      <Flyer top="46%" duration={32} delay={4} direction="rtl" type="bee" />
      <Flyer top="58%" duration={28} delay={2} direction="ltr" type="butterfly" color="#f97316" />
      <Flyer top="34%" duration={38} delay={6} direction="rtl" type="butterfly" color="#fbbf24" />
      <Flyer top="50%" duration={30} delay={8} direction="ltr" type="bee" />



      {/* Cute swaying grass at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
        {blades.map((i) => {
          const left = (i / blades.length) * 100;
          const delay = (i % 7) * 0.18;
          const height = 36 + ((i * 13) % 30);
          return (
            <GrassBlade key={i} left={left} delay={delay} height={height} color="#4a7c2e" />
          );
        })}
        {blades2.map((i) => {
          const left = ((i + 0.5) / blades2.length) * 100;
          const delay = (i % 5) * 0.22;
          const height = 48 + ((i * 17) % 34);
          return (
            <GrassBlade key={`b${i}`} left={left} delay={delay} height={height} color="#5a9233" />
          );
        })}
      </div>

      {/* Soft light overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-50/30 via-transparent to-amber-100/20" />
    </div>
  );
}

function Cloud({ size = 1 }) {
  return (
    <div style={{ transform: `scale(${size})` }} className="flex items-end opacity-80">
      <div className="w-24 h-16 rounded-full bg-white shadow-lg" style={{ filter: "blur(2px)" }} />
      <div className="w-16 h-16 rounded-full bg-white -mr-6 mb-2" style={{ filter: "blur(2px)" }} />
      <div className="w-20 h-14 rounded-full bg-white -mr-8 -mb-1" style={{ filter: "blur(2px)" }} />
    </div>
  );
}

function GrassBlade({ left, delay, height, color }) {
  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${left}%`,
        width: "5px",
        height: `${height}px`,
        background: `linear-gradient(to top, ${color}, #8cc454)`,
        borderRadius: "50% 50% 0 0",
        transformOrigin: "bottom center",
        animation: `sway 3.2s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function Flyer({ top, duration, delay, direction, type, color }) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left: direction === "ltr" ? "-6vw" : "auto",
        right: direction === "rtl" ? "-6vw" : "auto",
        animation: `${direction === "ltr" ? "flyAcrossR" : "flyAcrossL"} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ animation: "bob 1.6s ease-in-out infinite" }}>
        {type === "bee" ? <BeeSvg /> : <ButterflySvg color={color} />}
      </div>
    </div>
  );
}

function ButterflySvg({ color }) {
  return (
    <svg width="34" height="28" viewBox="0 0 34 28" style={{ animation: "flap 0.5s ease-in-out infinite" }}>
      <ellipse cx="12" cy="14" rx="9" ry="11" fill={color} opacity="0.85" />
      <ellipse cx="22" cy="14" rx="9" ry="11" fill={color} opacity="0.85" />
      <ellipse cx="12" cy="17" rx="4" ry="4" fill="#fff7ed" opacity="0.6" />
      <ellipse cx="22" cy="17" rx="4" ry="4" fill="#fff7ed" opacity="0.6" />
      <rect x="16.4" y="5" width="1.6" height="18" rx="0.8" fill="#5b3a1a" />
    </svg>
  );
}

function BeeSvg() {
  return (
    <svg width="30" height="22" viewBox="0 0 30 22" style={{ animation: "flap 0.18s ease-in-out infinite" }}>
      <ellipse cx="8" cy="7" rx="7" ry="4" fill="rgba(255,255,255,0.55)" />
      <ellipse cx="22" cy="7" rx="7" ry="4" fill="rgba(255,255,255,0.55)" />
      <ellipse cx="15" cy="13" rx="10" ry="7" fill="#fbbf24" />
      <path d="M9 9.5h2v7H9z" fill="#3a2a0a" />
      <path d="M14 8.5h2v9h-2z" fill="#3a2a0a" />
      <path d="M19 9.5h2v7h-2z" fill="#3a2a0a" />
    </svg>
  );
}