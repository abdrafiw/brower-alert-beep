# Browser Alert Beep

A very small React + Vite project that plays a short browser beep for critical alerts.

Use it as a learning project, or copy the sound helper into a dashboard, timer, incident console, admin panel, or any app that needs a lightweight audio cue.

## What It Does

- Plays a short two-tone alert with the Web Audio API.
- Stores sound preferences with Zustand.
- Lets users toggle sound on or off.
- Lets users adjust volume.
- Lets users choose between several browser-generated beep styles.
- Demonstrates a repeating alert interval with proper `useEffect` cleanup.

## Run It

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Reuse The Beep

The important code lives in:

```text
src/hooks/useAlertSound.ts
```

Basic usage:

```ts
import { playCriticalAlertSound } from "./hooks/useAlertSound";

function onCriticalAlert() {
  playCriticalAlertSound();
}
```

Use the store when you need UI controls:

```ts
import { useAlertSoundStore } from "./hooks/useAlertSound";

const { enabled, toggle, volume, setVolume, style, setStyle } =
  useAlertSoundStore();
```

## Browser Audio Note

Browsers often require a user interaction before audio can play. A button click, toggle, or other user gesture is the safest way to unlock audio before relying on automatic alerts.

When using intervals, always return a cleanup function:

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    playCriticalAlertSound();
  }, 3000);

  return () => {
    clearInterval(timer);
  };
}, []);
```
