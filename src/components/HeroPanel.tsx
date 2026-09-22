interface HeroPanelProps {
  enabled: boolean;
  onPlayBeep: () => void;
  onToggleSound: () => void;
}

export function HeroPanel({
  enabled,
  onPlayBeep,
  onToggleSound,
}: HeroPanelProps) {
  return (
    <section className="hero-panel">
      <div className="status-strip">
        <span className={enabled ? "status-dot active" : "status-dot"} />
        <span>{enabled ? "Sound enabled" : "Sound muted"}</span>
      </div>

      <div className="hero-copy">
        <h1>
          A tiny critical-alert beep you can learn from or drop into an app.
        </h1>
        <p className="">
          The demo uses the Web Audio API with a Zustand store for sound
          settings, so teams can reuse the pattern for dashboards, incident
          consoles, timers, or any UI that needs an urgent audio cue.
        </p>
      </div>

      <div className="actions">
        <button type="button" className="primary-button" onClick={onPlayBeep}>
          Play test beep
        </button>
        <button type="button" className="ghost-button" onClick={onToggleSound}>
          {enabled ? "Mute sound" : "Enable sound"}
        </button>
      </div>
    </section>
  );
}
