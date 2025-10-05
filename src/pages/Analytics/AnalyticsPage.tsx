// import { useEffect, useMemo, useState } from "react";
// import { fetchEvents } from "./services/analyticsService";
// import type { Filters, EventRow } from "./types/analytics.types";
//
// const DEFAULT_LIMIT = 50;
//
// export default function AnalyticsPage() {
//     const [filters, setFilters] = useState<Filters>({
//         limit: DEFAULT_LIMIT,
//         offset: 0,
//         order_by: "timestamp",
//         order_dir: "DESC",
//         is_winner: "",
//     });
//
//     const [data, setData] = useState<EventRow[]>([]);
//     const [loading, setLoading] = useState(false);            // тепер використовуємо
//     const [error, setError] = useState<string | null>(null);  // теж використовуємо
//
//     // мемо-об’єкт залежностей для фетча
//     const queryDeps = useMemo(() => ({ ...filters }), [filters]);
//
//     useEffect(() => {
//         const ac = new AbortController();
//         setLoading(true);
//         setError(null);
//
//         fetchEvents(queryDeps, ac.signal)
//             .then((rows) => setData(rows))
//             .catch((e: any) => {
//                 if (e.name !== "AbortError") setError(String(e.message ?? e));
//             })
//             .finally(() => setLoading(false));
//
//         return () => ac.abort();
//     }, [queryDeps]);
//
//     // прості кнопки пагінації — тепер ці змінні використовуються
//     const canPrev = (filters.offset ?? 0) > 0;
//     const canNext = data.length >= (filters.limit ?? DEFAULT_LIMIT);
//
//     const goPrev = () =>
//         setFilters((s) => ({
//             ...s,
//             offset: Math.max((s.offset ?? 0) - (s.limit ?? DEFAULT_LIMIT), 0),
//         }));
//
//     const goNext = () =>
//         setFilters((s) => ({
//             ...s,
//             offset: (s.offset ?? 0) + (s.limit ?? DEFAULT_LIMIT),
//         }));
//
//     // прості форматери, щоб не тягнути окремі утиліти
//     const fmtTs = (iso: string) => {
//         const d = new Date(iso);
//         return isNaN(d.getTime()) ? iso : d.toLocaleString();
//     };
//     const fmtCPM = (v: number, cur: string) => `${v.toFixed(2)} ${cur}`;
//
//     return (
//         <div className="p-4 max-w-5xl mx-auto">
//             <h1 className="text-2xl font-bold mb-4">Analytics</h1>
//
//             {/* Пагінація */}
//             <div className="flex items-center gap-2 mb-4">
//                 <button
//                     className="px-3 py-1 rounded border disabled:opacity-50"
//                     onClick={goPrev}
//                     disabled={!canPrev || loading}
//                 >
//                     ← Prev
//                 </button>
//                 <button
//                     className="px-3 py-1 rounded border disabled:opacity-50"
//                     onClick={goNext}
//                     disabled={!canNext || loading}
//                 >
//                     Next →
//                 </button>
//                 <span className="text-sm opacity-70">
//           Offset: {filters.offset ?? 0}
//         </span>
//             </div>
//
//             {/* Стани */}
//             {loading && <div className="py-4">Loading…</div>}
//             {error && <div className="py-4 text-red-600">Error: {error}</div>}
//
//             {/* Список (мінімум полів) */}
//             {!loading && !error && (
//                 <ul className="space-y-3">
//                     {data.map((row, idx) => (
//                         <li key={`${row.timestamp}-${row.auction_id}-${idx}`} className="border rounded p-3 text-sm">
//                             <div className="flex flex-wrap gap-x-6 gap-y-1">
//                                 <span><span className="opacity-60">timestamp:</span> {fmtTs(row.timestamp)}</span>
//                                 <span><span className="opacity-60">event_type:</span> {row.event_type}</span>
//                                 <span><span className="opacity-60">bidder:</span> {row.bidder}</span>
//                                 <span><span className="opacity-60">bid_cpm:</span> {fmtCPM(row.bid_cpm, row.bid_currency)}</span>
//                                 <span><span className="opacity-60">winner:</span> {row.is_winner ? "yes" : "no"}</span>
//                             </div>
//                         </li>
//                     ))}
//                     {data.length === 0 && <li className="opacity-70">No data.</li>}
//                 </ul>
//             )}
//         </div>
//     );
// }


import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "./services/analyticsService";
import type { Filters, EventRow } from "./types/analytics.types";
import AnalyticsTable from "./AnalyticsTable";

const DEFAULT_LIMIT = 50;

export default function AnalyticsPage() {
    const [filters, setFilters] = useState<Filters>({
        limit: DEFAULT_LIMIT,
        offset: 0,
        order_by: "timestamp",
        order_dir: "DESC",
        is_winner: "",
    });

    const [data, setData] = useState<EventRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const queryDeps = useMemo(() => ({ ...filters }), [filters]);

    useEffect(() => {
        const ac = new AbortController();
        setLoading(true);
        setError(null);

        fetchEvents(queryDeps, ac.signal)
            .then((rows) => setData(rows))
            .catch((e: any) => {
                if (e.name !== "AbortError") setError(String(e.message ?? e));
            })
            .finally(() => setLoading(false));

        return () => ac.abort();
    }, [queryDeps]);

    const canPrev = (filters.offset ?? 0) > 0;
    const canNext = data.length >= (filters.limit ?? DEFAULT_LIMIT);

    const goPrev = () =>
        setFilters((s) => ({
            ...s,
            offset: Math.max((s.offset ?? 0) - (s.limit ?? DEFAULT_LIMIT), 0),
        }));

    const goNext = () =>
        setFilters((s) => ({
            ...s,
            offset: (s.offset ?? 0) + (s.limit ?? DEFAULT_LIMIT),
        }));

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>

            <AnalyticsTable
                rows={data}
                loading={loading}
                error={error}
                canPrev={canPrev}
                canNext={canNext}
                onPrev={goPrev}
                onNext={goNext}
                offset={filters.offset ?? 0}
                limit={filters.limit ?? DEFAULT_LIMIT}
            />
        </div>
    );
}
