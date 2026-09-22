import {
  type AlertBeepStyle,
  alertBeepStyles,
} from "../hooks/useAlertSound";

interface BeepStyleSelectProps {
  style: AlertBeepStyle;
  onStyleChange: (style: AlertBeepStyle) => void;
}

export function BeepStyleSelect({
  style,
  onStyleChange,
}: BeepStyleSelectProps) {
  const selectedStyle = alertBeepStyles.find(
    (beepStyle) => beepStyle.id === style,
  );

  return (
    <section className="style-panel" aria-labelledby="beep-style-heading">
      <div>
        <p className="eyebrow">Browser beep style</p>
        <h2 id="beep-style-heading">Choose the alert tone.</h2>
      </div>

      <div className="select-control">
        <label htmlFor="beep-style">Tone</label>
        <select
          id="beep-style"
          value={style}
          onChange={(event) =>
            onStyleChange(event.target.value as AlertBeepStyle)
          }
        >
          {alertBeepStyles.map((beepStyle) => (
            <option key={beepStyle.id} value={beepStyle.id}>
              {beepStyle.label}
            </option>
          ))}
        </select>
        <p>{selectedStyle?.description}</p>
      </div>
    </section>
  );
}
