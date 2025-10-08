import { PrebidTracker } from "./PrebidTracker.ts";
import { API_BASE } from "../../config.ts";

// we are waiting for it to appear window.pbjs
function waitForPrebid(): Promise<void> {
  return new Promise((resolve) => {
    if (window.pbjs) {
      resolve();
      return;
    }

    const iv = setInterval(() => {
      if (window.pbjs) {
        clearInterval(iv);
        clearTimeout(to);
        resolve();
      }
    }, 100);

    const to = setTimeout(() => {
      clearInterval(iv);
      resolve();
    }, 10000);
  });
}

export async function initPrebidTracker() {
  await waitForPrebid();

  const tracker = new PrebidTracker(
    // "http://localhost:3500/api/analytics/events",
      `${API_BASE}/api/analytics/events`
  );
  tracker.init();

  window.prebidTracker = tracker;
}
