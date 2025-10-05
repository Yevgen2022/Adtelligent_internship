// src/features/analytics/DataTable.tsx
import { useMemo, useCallback } from "react";
import type { EventRow, ColumnKey } from "./types";

export type SortState = { key: ColumnKey; dir: "asc" | "desc" } | null;

type Props = {
    rows: EventRow[];
    visible: Record<ColumnKey, boolean>;
    sort: SortState;
    onSort: (next: SortState) => void;
    loading?: boolean;
};

const LABELS: Record<ColumnKey, string> = {
    time: "Time",
    bidder: "Bidder",
    ad_unit_code: "Ad unit",
    size: "Size",
    is_winner: "Winner",
    cpm: "CPM",
    request_id: "Request ID",
};

export function DataTable({ rows, visible, sort, onSort, loading }: Props) {
    // список видимих ключів у потрібному порядку
    const columns = useMemo<ColumnKey[]>(
        () =>
            (Object.keys(LABELS) as ColumnKey[]).filter((k) => visible[k]),
        [visible]
    );

    const makeSort = useCallback(
        (key: ColumnKey) => () => {
            if (!sort || sort.key !== key) return onSort({ key, dir: "asc" });
            if (sort.dir === "asc") return onSort({ key, dir: "desc" });
            return onSort(null);
        },
        [sort, onSort]
    );

    const headerCell = useCallback(
        (key: ColumnKey) => (
            <th key={key} className="px-3 py-2 text-left whitespace-nowrap align-middle">
                <button
                    type="button"
                    className="font-medium"
                    onClick={makeSort(key)}
                    aria-label={`Sort by ${LABELS[key]}`}
                >
                    {LABELS[key]}
                    {sort?.key === key ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
                </button>
            </th>
        ),
        [makeSort, sort]
    );

    return (
        <div className="overflow-auto border rounded-2xl">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                <tr>{columns.map((c) => headerCell(c))}</tr>
                </thead>

                <tbody>
                {rows.length === 0 && (
                    <tr>
                        <td className="p-6 text-center text-gray-500" colSpan={columns.length}>
                            {loading ? "Loading…" : "No data"}
                        </td>
                    </tr>
                )}

                {rows.map((r, i) => (
                    <tr key={`${r.request_id ?? i}`} className="border-t">
                        {columns.map((c) => {
                            let value: React.ReactNode = (r as any)[c];

                            // спеціальні формати
                            if (c === "time") value = new Date(r.time).toLocaleString();
                            if (c === "is_winner") value = r.is_winner ? 1 : 0;

                            return (
                                <td key={c} className="px-3 py-2 align-middle">
                                    {value ?? "—"}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
