interface AlertControlsProps {
  autoBeep: boolean;
  beepCount: number;
  volume: number;
  onAutoBeepChange: (enabled: boolean) => void;
  onVolumeChange: (volume: number) => void;
}

export function AlertControls({
  autoBeep,
  beepCount,
  volume,
  onAutoBeepChange,
  onVolumeChange,
}: AlertControlsProps) {
  return (
    <section className="controls-grid" aria-label="Alert sound controls">
      <div className="control-block">
        <span className="label">Volume</span>
        <div className="range-row">
          <input
            aria-label="Alert volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
          />
          <strong>{Math.round(volume * 100)}%</strong>
        </div>
      </div>

      <div className="control-block">
        <span className="label">Interval demo</span>
        <label className="switch-row">
          <input
            type="checkbox"
            checked={autoBeep}
            onChange={(event) => onAutoBeepChange(event.target.checked)}
          />
          <span>Beep every 3 seconds</span>
        </label>
      </div>

      <div className="metric-block">
        <span className="label">Beeps played</span>
        <strong>{beepCount}</strong>
      </div>
    </section>
  );
}
