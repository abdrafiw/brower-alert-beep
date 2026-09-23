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
        <label className="label" htmlFor="alert-volume">
          Volume
        </label>
        <div className="range-row">
          <input
            id="alert-volume"
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
        <span className="label" id="interval-demo-heading">
          Interval demo
        </span>
        <div className="switch-row">
          <input
            id="interval-demo"
            type="checkbox"
            aria-describedby="interval-demo-heading"
            checked={autoBeep}
            onChange={(event) => onAutoBeepChange(event.target.checked)}
          />
          <label htmlFor="interval-demo">Beep every 3 seconds</label>
        </div>
      </div>

      <div className="metric-block">
        <span className="label">Beeps played</span>
        <strong>{beepCount}</strong>
      </div>
    </section>
  );
}
