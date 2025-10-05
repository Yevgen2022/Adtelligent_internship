// -----------------------------------------------------------------------------
// src/features/analytics/types.ts
// -----------------------------------------------------------------------------


export type RawEventRow = Record<string, unknown>;


export type EventRow = {
    time: string; // ISO string
    bidder: string;
    ad_unit_code: string;
    size: string;
    is_winner: 0 | 1;
    cpm: number;
    request_id?: string;
// ...add any other normalized fields you want to show
};


export type FetchParams = {
    view: 'raw' | 'summary';
    limit: number;
    offset: number;
    sort?: string; // e.g. "-time" or "cpm"
// dynamic filters below (conditionally added):
    date_from?: string; // ISO
    date_to?: string; // ISO
    bidder?: string;
    ad_unit_code?: string;
    size?: string;
    min_cpm?: number;
    max_cpm?: number;
    is_winner?: '0' | '1';
};


export type FetchResponse = {
    rows: RawEventRow[];
    total: number;
};


export type ColumnKey = keyof EventRow;