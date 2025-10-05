// src/features/analytics/AnalyticsPage.tsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FiltersForm, type FiltersFormValues } from "./FiltersForm";
import { DataTable, type SortState } from "./DataTable";
import { ColumnVisibilityMenu } from "./ColumnVisibilityMenu";
import { Pagination } from "./Pagination";
import { fetchEvents } from "./api";
import { mapBackendRow } from "./utils";
import type { ColumnKey, EventRow, FetchParams } from "./types";

export default function AnalyticsPage() {
    // ---- state ----
    const [rows, setRows] = useState<EventRow[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 50;

    const [sort, setSort] = useState<SortState>(null);
    const [loading, setLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    const [filters, setFilters] = useState<Partial<FetchParams>>({ view: "raw" });

    const [visible, setVisible] = useState<Record<ColumnKey, boolean>>({
        time: true,
        bidder: true,
        ad_unit_code: true,
        size: true,
        is_winner: true,
        cpm: true,
        request_id: false,
    });

    // ---- derived params for API ----
    const params = useMemo(() => {
        const base: Partial<FetchParams> = {
            view: "raw",
            limit: pageSize,
            offset: (page - 1) * pageSize,
        };
        if (sort) base.sort = `${sort.dir === "desc" ? "-" : ""}${sort.key}`;
        return { ...base, ...filters };
    }, [filters, page, sort]);

    // ---- data fetching ----
    useEffect(() => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;
        setLoading(true);

        fetchEvents(params, controller.signal)
            .then((res) => {
                setRows(res.rows.map(mapBackendRow));
                setTotal(res.total);
            })
            .catch((err: any) => {
                if (err?.name !== "AbortError") console.error(err);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [params]);

    // ---- handlers ----
    const onApplyFilters = useCallback((active: FiltersFormValues) => {
        setPage(1);
        setFilters((prev) => ({ ...prev, ...active }));
    }, []);

    const onToggleColumn = useCallback((key: ColumnKey, next: boolean) => {
        setVisible((v) => ({ ...v, [key]: next }));
    }, []);

    // ---- render ----
    return (
        <div className="p-4 md:p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Analytics Events</h1>

            <div className="flex flex-wrap items-center gap-3">
                <ColumnVisibilityMenu visible={visible} onToggle={onToggleColumn} />
                <div className="text-sm text-gray-600">Total: {total.toLocaleString()}</div>
                <div className="ml-auto">
                    <Pagination
                        page={page}
                        pageSize={pageSize}
                        total={total}
                        onChange={setPage}
                        disabled={loading}
                    />
                </div>
            </div>

            <FiltersForm onSubmit={onApplyFilters} disabled={loading} />

            <DataTable
                rows={rows}
                visible={visible}
                sort={sort}
                onSort={setSort}
                loading={loading}
            />

            <div className="flex justify-end">
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={setPage}
                    disabled={loading}
                />
            </div>
        </div>
    );
}
