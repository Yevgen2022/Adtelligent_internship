import type { AnalyticsEventPayload } from "../types/prebid-events.types";

export async function sendEvent(
  apiEndpoint: string,
  payload: AnalyticsEventPayload,
): Promise<boolean> {
  const body = JSON.stringify(payload);

  // Trying sendBeacon (simple)
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.sendBeacon === "function"
  ) {
    const ok = navigator.sendBeacon(
      apiEndpoint,
      new Blob([body], { type: "application/json" }),
    );
    if (ok) {
      console.log(
        "[PrebidTracker] Event sent via sendBeacon:",
        payload.event_type,
      );
      return true;
    }
  }

  // If not — regular fetch
  try {
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      // keepalive helps when closing a page
      keepalive: true,
    });
    if (res.ok) {
      console.log("[PrebidTracker] Event sent via fetch:", payload.event_type);
      return true;
    } else {
      console.error("[PrebidTracker] Failed to send event:", res.status);
      return false;
    }
  } catch (err) {
    console.error("[PrebidTracker] Error sending event:", err);
    return false;
  }
}
