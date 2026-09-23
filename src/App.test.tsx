import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

class MockAudioContext {
  currentTime = 0;
  destination = {};

  createGain() {
    return {
      connect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
    };
  }

  createOscillator() {
    return {
      connect: vi.fn(),
      frequency: { value: 0 },
      start: vi.fn(),
      stop: vi.fn(),
      type: "sine",
    };
  }
}

// 1. Arrange — Set up the test environment and define input values.
// 2. Act — Execute the function or component under test.
// 3. Assert — Compare the actual result with the expected outcome.

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("AudioContext", MockAudioContext);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it("renders the alert beep demo controls", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /a tiny critical-alert beep/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /play test beep/i })).toBeVisible();
  expect(screen.getByLabelText(/volume/i)).toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", {
      name: /beep every 3 seconds/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByRole("combobox", { name: "Tone" })).toHaveValue("urgent");
});

it("enables the sound", async () => {
  render(<App />);

  const user = userEvent.setup();
  const toggleButton = screen.getByRole("button", { name: /mute sound/i });

  await user.click(toggleButton);
  // expect(toggleButton).toHaveTextContent(/enable sound/i);
  expect(
    screen.getByRole("button", { name: /enable sound/i }),
  ).toBeInTheDocument();
});

it("copies the integration snippet", async () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /copy snippet/i }));

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    expect.stringContaining("playCriticalAlertSound"),
  );
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: /copied snippet/i }),
    ).toBeInTheDocument();
  });
});
