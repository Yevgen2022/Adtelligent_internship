// import type { EventRow } from "./types/analytics.types";
// import { pickAdUnitId } from "./utils/adUnit";
//
//
// type Props = {
//     rows: EventRow[];
//     loading: boolean;
//     error: string | null;
//     canPrev: boolean;
//     canNext: boolean;
//     onPrev: () => void;
//     onNext: () => void;
//     offset: number;
//     limit: number;
// };
//
// function fmtTs(iso: string) {
//     const d = new Date(iso);
//     return isNaN(d.getTime()) ? iso : d.toLocaleString();
// }
// function fmtCPM(v: number, cur: string) {
//     return `${v.toFixed(2)} ${cur}`;
// }
//
// export default function AnalyticsTable({
//                                            rows,
//                                            loading,
//                                            error,
//                                            canPrev,
//                                            canNext,
//                                            onPrev,
//                                            onNext,
//                                            offset,
//                                            limit,
//                                        }: Props) {
//     return (
//         <div className="w-full">
//             {/* Пагінація у шапці таблиці */}
//             <div className="flex items-center justify-between mb-2">
//     <div className="text-sm opacity-70">
//         Offset: {offset} • Limit: {limit}
//     </div>
//     <div className="flex gap-2">
//     <button
//         className="px-3 py-1 rounded border disabled:opacity-50"
//     onClick={onPrev}
//     disabled={!canPrev || loading}
// >
// ← Prev
//     </button>
//     <button
//     className="px-3 py-1 rounded border disabled:opacity-50"
//     onClick={onNext}
//     disabled={!canNext || loading}
// >
//     Next →
//           </button>
//           </div>
//           </div>
//
//           <div className="overflow-x-auto border rounded-xl">
//     <table className="min-w-[1100px] w-full text-sm">
//     <thead className="bg-gray-50 sticky top-0 z-10">
//     <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
//         <th>Date</th>
//         <th>Hour</th>
//         <th>Event</th>
//         <th>Bidder</th>
//         <th>Bid CPM</th>
//         <th>Winner</th>
//         <th>Auction ID</th>
//         <th>Ad Unit</th>
//         <th>Size</th>
//         <th>Creative ID</th>
//         <th>Page URL</th>
//         </tr>
//         </thead>
//
//         <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2">
//         {loading && (
//             <tr>
//                 <td colSpan={11} className="text-center py-6">
//         Loading…
//                 </td>
//                 </tr>
// )}
//
//     {error && !loading && (
//         <tr>
//             <td colSpan={11} className="text-red-600 py-4">
//         Error: {error}
//         </td>
//         </tr>
//     )}
//
//     {!loading && !error && rows.length === 0 && (
//         <tr>
//             <td colSpan={11} className="opacity-70 py-6 text-center">
//         No data.
//     </td>
//     </tr>
//     )}
//
//     {!loading &&
//     !error &&
//      rows.map((r, i) => (
//
//         <tr key={`${r.timestamp}-${r.auction_id}-${i}`} className="border-t">
//     <td className="whitespace-nowrap">{fmtTs(r.timestamp)}</td>
//     <td className="whitespace-nowrap">{r.event_type}</td>
//         <td className="whitespace-nowrap">{r.bidder}</td>
//         <td className="whitespace-nowrap">{fmtCPM(r.bid_cpm, r.bid_currency)}</td>
//     <td className="whitespace-nowrap">{r.is_winner ? "yes" : "no"}</td>
//         <td className="whitespace-nowrap">{r.auction_id}</td>
//
//         {/*<td className="whitespace-nowrap">{r.ad_unit_code}</td>*/}
//             <td>
//                 <div className="truncate max-w-[280px]" title={r.ad_unit_code}>
//                     {pickAdUnitId(r.ad_unit_code)}
//                 </div>
//             </td>
//
//         <td className="whitespace-nowrap">{r.ad_unit_size}</td>
//         <td className="whitespace-nowrap">{r.bid_currency}</td>
//         <td className="whitespace-nowrap">{r.creative_id}</td>
//         <td className="max-w-[360px] truncate">
//     <a href={r.page_url} target="_blank" rel="noreferrer" className="underline" title={r.page_url}>
//         {r.page_url}
//         </a>
//         </td>
//         </tr>
//     ))}
//
//     </tbody>
//     </table>
//     </div>
//
//     {/* Дублюємо пагінацію знизу таблиці */}
//     <div className="flex items-center justify-end gap-2 mt-2">
//     <button
//         className="px-3 py-1 rounded border disabled:opacity-50"
//     onClick={onPrev}
//     disabled={!canPrev || loading}
// >
// ← Prev
//     </button>
//     <button
//     className="px-3 py-1 rounded border disabled:opacity-50"
//     onClick={onNext}
//     disabled={!canNext || loading}
// >
//     Next →
//         </button>
//         </div>
//         </div>
// );
// }


import type { EventRow } from "./types/analytics.types";
import { pickAdUnitId } from "./utils/adUnit";

type Props = {
    rows: EventRow[];
    loading: boolean;
    error: string | null;
    canPrev: boolean;
    canNext: boolean;
    onPrev: () => void;
    onNext: () => void;
    offset: number;
    limit: number;
};

function fmtCPM(v: number, cur: string) {
    return `${v.toFixed(2)} ${cur}`;
}

export default function AnalyticsTable({
                                           rows,
                                           loading,
                                           error,
                                           canPrev,
                                           canNext,
                                           onPrev,
                                           onNext,
                                           offset,
                                           limit,
                                       }: Props) {
    return (
        <div className="w-full">
            {/* Пагінація у шапці таблиці */}
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm opacity-70">
                    Offset: {offset} • Limit: {limit}
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 rounded border disabled:opacity-50"
                        onClick={onPrev}
                        disabled={!canPrev || loading}
                    >
                        ← Prev
                    </button>
                    <button
                        className="px-3 py-1 rounded border disabled:opacity-50"
                        onClick={onNext}
                        disabled={!canNext || loading}
                    >
                        Next →
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto border rounded-xl">
                <table className="min-w-[1100px] w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
                        <th>Date</th>
                        <th>Hour</th>
                        <th>Event</th>
                        <th>Bidder</th>
                        <th>Bid CPM</th>
                        <th>Winner</th>
                        <th>Auction ID</th>
                        <th>Ad Unit</th>
                        <th>Size</th>
                        <th>Creative ID</th>
                        <th>Page URL</th>
                    </tr>
                    </thead>

                    <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2">
                    {loading && (
                        <tr>
                            <td colSpan={11} className="text-center py-6">
                                Loading…
                            </td>
                        </tr>
                    )}

                    {error && !loading && (
                        <tr>
                            <td colSpan={11} className="text-red-600 py-4">
                                Error: {error}
                            </td>
                        </tr>
                    )}

                    {!loading && !error && rows.length === 0 && (
                        <tr>
                            <td colSpan={11} className="opacity-70 py-6 text-center">
                                No data.
                            </td>
                        </tr>
                    )}

                    {!loading &&
                        !error &&
                        rows.map((r, i) => {
                            const d = new Date(r.timestamp);
                            const dateStr = isNaN(d.getTime())
                                ? r.timestamp
                                : d.toISOString().slice(0, 10); // YYYY-MM-DD
                            const hourStr = isNaN(d.getTime())
                                ? ""
                                : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                            return (
                                <tr key={`${r.timestamp}-${r.auction_id}-${i}`} className="border-t">
                                    <td className="whitespace-nowrap">{dateStr}</td>
                                    <td className="whitespace-nowrap">{hourStr}</td>
                                    <td className="whitespace-nowrap">{r.event_type || "-"}</td>
                                    <td className="whitespace-nowrap">{r.bidder || "-"}</td>
                                    <td className="whitespace-nowrap">{fmtCPM(r.bid_cpm, r.bid_currency)}</td>
                                    <td className="whitespace-nowrap">{r.is_winner ? "yes" : "no"}</td>
                                    <td className="whitespace-nowrap">{r.auction_id || "-"}</td>

                                    <td>
                                        <div className="truncate max-w-[280px]" title={r.ad_unit_code}>
                                            {pickAdUnitId(r.ad_unit_code)}
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap">{r.ad_unit_size || "-"}</td>
                                    <td className="whitespace-nowrap">{r.creative_id || "-"}</td>
                                    <td>
                                        <div className="truncate max-w-[360px]">
                                            {r.page_url ? (
                                                <a
                                                    className="underline"
                                                    href={r.page_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={r.page_url}
                                                >
                                                    {r.page_url}
                                                </a>
                                            ) : (
                                                "-"
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Дублюємо пагінацію знизу таблиці */}
            <div className="flex items-center justify-end gap-2 mt-2">
                <button
                    className="px-3 py-1 rounded border disabled:opacity-50"
                    onClick={onPrev}
                    disabled={!canPrev || loading}
                >
                    ← Prev
                </button>
                <button
                    className="px-3 py-1 rounded border disabled:opacity-50"
                    onClick={onNext}
                    disabled={!canNext || loading}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
