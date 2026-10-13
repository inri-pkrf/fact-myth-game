// Pleasant Web Audio sound effects — soft tones, no harshness.
let audioCtx;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(freq, start, duration, type = "sine", gain = 0.14) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(g);
  g.connect(ctx.destination);
  const t = ctx.currentTime + start;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration);
}

// Rising gentle chord — correct answer
export function playCorrect() {
  try {
    playTone(523.25, 0, 0.16, "sine", 0.13); // C5
    playTone(659.25, 0.1, 0.18, "sine", 0.13); // E5
    playTone(783.99, 0.2, 0.28, "sine", 0.13); // G5
  } catch {}
}

// Soft descending two-note — wrong answer (gentle, not buzzy)
export function playWrong() {
  try {
    playTone(392.0, 0, 0.18, "triangle", 0.1); // G4
    playTone(311.13, 0.13, 0.26, "triangle", 0.1); // Eb4
  } catch {}
}

// Short ticking beep — final 5 seconds countdown
export function playTick() {
  try {
    playTone(880, 0, 0.09, "square", 0.08); // A5 short blip
  } catch {}
}

// "Hallelujah" triumphant fanfare — game finished
export function playHallelujah() {
  try {
    // Hallelujah chorus-inspired ascending motif + sustained major chord
    playTone(523.25, 0, 0.22, "sine", 0.14);      // C5
    playTone(659.25, 0.14, 0.22, "sine", 0.14);    // E5
    playTone(783.99, 0.28, 0.3, "sine", 0.15);     // G5
    playTone(1046.5, 0.42, 0.4, "sine", 0.14);     // C6
    // sustained triumphant chord
    playTone(523.25, 0.7, 1.1, "sine", 0.12);      // C5
    playTone(659.25, 0.7, 1.1, "sine", 0.12);      // E5
    playTone(783.99, 0.7, 1.1, "sine", 0.12);     // G5
    playTone(1046.5, 0.7, 1.1, "sine", 0.1);      // C6
  } catch {}
}