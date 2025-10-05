import { API_URL } from "../../../config";
import type { Filters, EventRow } from "../types/analytics.types.ts";
import { buildQuery } from "../utils/analytics.utilits.ts";

export async function fetchEvents(f: Filters, signal?: AbortSignal): Promise<EventRow[]> {
    const query = buildQuery(f);
    const res = await fetch(`${API_URL}/api/analytics/events?${query}`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data as EventRow[];
}
