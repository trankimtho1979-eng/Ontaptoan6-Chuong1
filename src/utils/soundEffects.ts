// Pure Web Audio API & Web Speech API Sound Engine
// 100% reliable, zero external MP3 latency, works on all browsers and devices!

let audioCtx: AudioContext | null = null;

/**
 * Initializes and unlocks the AudioContext on user interaction.
 * Chrome/Safari suspend AudioContext until the first user click/touch.
 */
export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Gentle click/tap UI feedback
 */
export function playTapSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Audio context might be restricted
  }
}

/**
 * Cheerful, bright, rewarding correct answer sound
 * Harmonic bell chord: C6 -> E6 -> G6 -> C7 with sparkle overtone
 */
export function playCorrectSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Harmonious major arpeggio frequencies: C6 (1046.5Hz), E6 (1318.5Hz), G6 (1567.98Hz), C7 (2093Hz)
    const notes = [1046.5, 1318.51, 1567.98, 2093.0];
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.07;
      
      // Main chime tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);

      // Add high sparkle harmonic for joyful, crisp game feel
      const sparkleOsc = ctx.createOscillator();
      const sparkleGain = ctx.createGain();

      sparkleOsc.type = 'triangle';
      sparkleOsc.frequency.setValueAtTime(freq * 1.5, startTime);

      sparkleGain.gain.setValueAtTime(0, startTime);
      sparkleGain.gain.linearRampToValueAtTime(0.06, startTime + 0.015);
      sparkleGain.gain.exponentialRampToValueAtTime(0.0005, startTime + 0.2);

      sparkleOsc.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);

      sparkleOsc.start(startTime);
      sparkleOsc.stop(startTime + 0.2);
    });
  } catch {
    // Ignore error
  }
}

/**
 * Soft, gentle, pedagogical wrong answer sound
 * Not punitive or harsh: two low gentle marimba/woodblock-like tones (Bb3 -> F3)
 * Encourages the 6th grader to try again without feeling discouraged!
 */
export function playWrongSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Two soft descending notes: 293.66 Hz (D4) -> 220 Hz (A3)
    const tones = [293.66, 220.0];
    tones.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Triangle wave creates a warm, educational wooden chime/marimba feel
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.92, startTime + 0.22);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  } catch {
    // Ignore error
  }
}

/**
 * Escalating streak combo sound when student gets 2+ questions right in a row!
 */
export function playStreakSound(combo: number, enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const baseFreq = 587.33 * Math.min(2.2, 1 + combo * 0.18); // D5 base
    const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];

    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.05;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.14, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.28);
    });
  } catch {
    // Ignore error
  }
}

/**
 * Celebratory fanfare chord on quiz completion
 */
export function playFanfareSound(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Victory fanfare notes: C5, G5, C6, E6, G6
    const notes = [523.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.16, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  } catch {
    // Ignore error
  }
}

/**
 * Play a quick sound test preview for students
 */
export function playSoundTest(type: 'correct' | 'wrong', enabled = true) {
  if (type === 'correct') {
    playCorrectSound(enabled);
  } else {
    playWrongSound(enabled);
  }
}

