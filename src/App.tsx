import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import "sonner/dist/styles.css";
import "./App.css";
import { AlertControls } from "./components/AlertControls";
import { BeepStyleSelect } from "./components/BeepStyleSelect";
import { HeroPanel } from "./components/HeroPanel";
import { IntegrationSnippet } from "./components/IntegrationSnippet";
import {
  playCriticalAlertSound,
  useAlertSoundStore,
} from "./hooks/useAlertSound";

function App() {
  const { enabled, toggle, volume, setVolume, style, setStyle } =
    useAlertSoundStore();
  const [autoBeep, setAutoBeep] = useState(false);
  const [beepCount, setBeepCount] = useState(0);

  useEffect(() => {
    if (!autoBeep) return;

    const timer = setInterval(() => {
      playCriticalAlertSound();
      setBeepCount((currentCount) => currentCount + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [autoBeep]);

  const handleTestBeep = () => {
    playCriticalAlertSound();
    setBeepCount((currentCount) => currentCount + 1);
    toast.success("Test beep played");
  };

  const handleToggleSound = () => {
    toggle();

    if (enabled) {
      toast.success("Sound enabled");
    } else {
      toast.error("Sound muted");
    }
  };

  const handleAutoBeepChange = (nextAutoBeep: boolean) => {
    setAutoBeep(nextAutoBeep);

    if (nextAutoBeep) {
      toast.success("Interval demo started");
    } else {
      toast.error("Interval demo stopped");
    }
  };

  const handleStyleChange = (nextStyle: typeof style) => {
    setStyle(nextStyle);
    toast.success("Beep tone updated");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <main className="app-shell">
        <HeroPanel
          enabled={enabled}
          onPlayBeep={handleTestBeep}
          onToggleSound={handleToggleSound}
        />
        <AlertControls
          autoBeep={autoBeep}
          beepCount={beepCount}
          volume={volume}
          onAutoBeepChange={handleAutoBeepChange}
          onVolumeChange={setVolume}
        />
        <BeepStyleSelect style={style} onStyleChange={handleStyleChange} />
        <IntegrationSnippet />
      </main>
    </>
  );
}

export default App;
