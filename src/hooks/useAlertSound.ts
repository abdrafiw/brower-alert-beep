import { create } from "zustand";

export type AlertBeepStyle = "classic" | "urgent" | "soft" | "pulse";

export const alertBeepStyles: Array<{
  id: AlertBeepStyle;
  label: string;
  description: string;
}> = [
  {
    id: "classic",
    label: "Classic",
    description: "A simple single browser tone.",
  },
  {
    id: "urgent",
    label: "Urgent",
    description: "A sharp two-tone critical alert.",
  },
  {
    id: "soft",
    label: "Soft",
    description: "A lower, calmer notification tone.",
  },
  {
    id: "pulse",
    label: "Pulse",
    description: "Three quick reminder beeps.",
  },
];

interface AlertSoundState {
  enabled: boolean;
  volume: number;
  style: AlertBeepStyle;
  toggle: () => void;
  setVolume: (v: number) => void;
  setStyle: (style: AlertBeepStyle) => void;
}

function getInitialStyle(): AlertBeepStyle {
  const savedStyle = localStorage.getItem("noc-sound-style");
  return alertBeepStyles.some((style) => style.id === savedStyle)
    ? (savedStyle as AlertBeepStyle)
    : "urgent";
}

export const useAlertSoundStore = create<AlertSoundState>((set) => ({
  enabled: localStorage.getItem("noc-sound") !== "off",
  volume: parseFloat(localStorage.getItem("noc-sound-volume") || "0.5"),
  style: getInitialStyle(),
  toggle: () =>
    set((s) => {
      const next = !s.enabled;
      localStorage.setItem("noc-sound", next ? "on" : "off");
      return { enabled: next };
    }),
  setVolume: (v) => {
    localStorage.setItem("noc-sound-volume", String(v));
    set({ volume: v });
  },
  setStyle: (style) => {
    localStorage.setItem("noc-sound-style", style);
    set({ style });
  },
}));

let audioCtx: AudioContext | null = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

/** Play a short urgent beep for critical alerts */
export function playCriticalAlertSound() {
  const { enabled, volume, style } = useAlertSoundStore.getState();
  if (!enabled) return;

  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(volume * 0.28, now);

    const playTone = (
      frequency: number,
      startOffset: number,
      duration: number,
      type: OscillatorType,
    ) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = frequency;
      osc.connect(gain);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration);
    };

    if (style === "classic") {
      playTone(880, 0, 0.22, "sine");
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      return;
    }

    if (style === "soft") {
      playTone(523.25, 0, 0.32, "sine");
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      return;
    }

    if (style === "pulse") {
      [0, 0.18, 0.36].forEach((offset) => {
        playTone(720, offset, 0.1, "square");
      });
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      return;
    }

    [880, 1100].forEach((freq, i) => {
      playTone(freq, i * 0.15, 0.15, "triangle");
    });
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  } catch {
    // Audio not available
  }
}
