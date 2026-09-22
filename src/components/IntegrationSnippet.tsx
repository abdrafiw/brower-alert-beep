import { useState } from "react";
import { toast } from "sonner";

const integrationSnippet = `import { playCriticalAlertSound } from "./hooks/useAlertSound";

function onCriticalAlert() {
  playCriticalAlertSound();
}`;

export function IntegrationSnippet() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(integrationSnippet);
      setCopied(true);
      toast.success("Snippet copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy snippet");
    }
  };

  return (
    <section className="code-band">
      <div>
        <p className="eyebrow">Integration idea</p>
        <h2>Call the sound from any critical event.</h2>
      </div>

      <div className="snippet-card">
        <button
          type="button"
          className="copy-icon-button"
          onClick={handleCopy}
          aria-label={copied ? "Copied snippet" : "Copy snippet"}
          title={copied ? "Copied" : "Copy"}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
        <pre>
          <code>{integrationSnippet}</code>
        </pre>
      </div>
    </section>
  );
}
