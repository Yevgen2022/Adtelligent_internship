// -----------------------------------------------------------------------------
// src/features/analytics/utils.ts
// -----------------------------------------------------------------------------


import type { EventRow, RawEventRow, FetchParams } from './types';


export function buildQueryString(params: Partial<FetchParams>): string {
    const qp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') return; // omit unchecked/empty
        qp.append(k, String(v));
    });
    return qp.toString();
}


export function mapBackendRow(row: RawEventRow): EventRow {
// Normalize mapping here according to your backend field names
    return {
        time: String(row.time ?? row['event_time'] ?? ''),
        bidder: String(row.bidder ?? ''),
        ad_unit_code: String(row.ad_unit_code ?? ''),
        size: String(row.size ?? ''),
        is_winner: (row.is_winner === 1 || row.is_winner === '1') ? 1 : 0,
        cpm: Number(row.cpm ?? 0),
        request_id: row.request_id ? String(row.request_id) : undefined,
    };
}


export function toISOLocal(dt: string | Date): string {
// Ensure datetime-local value becomes valid ISO for backend
    const d = typeof dt === 'string' ? new Date(dt) : dt;
    return d.toISOString();
}