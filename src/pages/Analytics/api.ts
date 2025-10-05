// -----------------------------------------------------------------------------
// src/features/analytics/api.ts
// -----------------------------------------------------------------------------


import { buildQueryString } from './utils';
import type { FetchParams, FetchResponse } from './types';
import { API_URL } from "../../config";


const stat_url = `${ API_URL }/api/events`;


export async function fetchEvents(
    params: Partial<FetchParams>,
    signal?: AbortSignal,
): Promise<FetchResponse> {
    const qs = buildQueryString(params);
    const res = await fetch(`${stat_url}?${qs}`, { method: 'GET', signal });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
    }
    return res.json();
}