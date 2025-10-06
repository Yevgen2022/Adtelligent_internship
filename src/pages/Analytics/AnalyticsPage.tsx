import { useEffect, useMemo, useState } from "react";
import AnalyticsTable from "./AnalyticsTable";
import ColumnPicker from "./ColumnPicker.tsx";
import {
  ALL_COLUMNS,
  type Column,
  type ColumnId,
  DEFAULT_COLUMNS,
} from "./columns.tsx";
import { fetchEvents } from "./services/analyticsService.ts";
import type { EventRow, Filters } from "./types/analytics.types";

const DEFAULT_LIMIT = 50;
const STORE_KEY = "analytics:selectedColumns";

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

  // 1)which columns are selected
  const [selectedCols, setSelectedCols] = useState<ColumnId[]>(
    () =>
      JSON.parse(localStorage.getItem(STORE_KEY) || "null") || DEFAULT_COLUMNS,
  );

  // 2) I keep the choice between reboots
  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(selectedCols));
  }, [selectedCols]);

  // 3) active columns (array of configs for the table)
  const activeColumns: Column[] = useMemo(
    () => ALL_COLUMNS.filter((c) => selectedCols.includes(c.id)),
    [selectedCols],
  );

  // 4) data fetch
  const deps = useMemo(() => ({ ...filters }), [filters]);
  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchEvents(deps, ac.signal)
      .then((rows) => setData(rows))
      .catch((e: unknown) => {
        if (e instanceof Error) {
          if (e.name !== "AbortError") setError(e.message);
        } else {
          setError(String(e));
        }
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [deps]);

  // 5) pagination
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
      <h1 className="text-2xl font-bold mb-3">Analytics</h1>

      {/*convert default export to named*/}
      <ColumnPicker
        all={ALL_COLUMNS}
        selected={selectedCols}
        onChange={setSelectedCols}
      />

      {/* table */}
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
        columns={activeColumns}
      />
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////

//Тут рендер стовбчиків через zustand але фігово рендериться ,
//сторінка - таблиця стрибає

// import { useEffect, useMemo, useState } from "react";
// import { fetchEvents } from "./services/analyticsService.ts";
// import type { EventRow } from "./types/analytics.types";
// import AnalyticsTable from "./AnalyticsTable";
// import ColumnPicker from "./ColumnPicker.tsx";
// import { ALL_COLUMNS, type Column } from "./columns.tsx";
// import { useAnalyticsStore } from "../../store/analystic.store.ts";
//
// const DEFAULT_LIMIT = 50;
//
// export default function AnalyticsPage() {
//
//     const { selectedCols, setSelectedCols, filters, setFilters } = useAnalyticsStore();
//
//
//     const [data, setData] = useState<EventRow[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//
//
//     const activeColumns: Column[] = useMemo(
//         () => ALL_COLUMNS.filter((c) => selectedCols.includes(c.id)),
//         [selectedCols]
//     );
//
//     const queryDeps = useMemo(() => ({ ...filters }), [filters]);
//
//     useEffect(() => {
//         const ac = new AbortController();
//         setLoading(true);
//         setError(null);
//
//         fetchEvents(queryDeps, ac.signal)
//             .then(setData)
//             .catch((e: any) => {
//                 if (e.name !== "AbortError") setError(String(e.message ?? e));
//             })
//             .finally(() => setLoading(false));
//
//         return () => ac.abort();
//     }, [queryDeps]);
//
//
//     const canPrev = (filters.offset ?? 0) > 0;
//     const canNext = data.length >= (filters.limit ?? DEFAULT_LIMIT);
//
//     const goPrev = () =>
//         setFilters({
//             offset: Math.max((filters.offset ?? 0) - (filters.limit ?? DEFAULT_LIMIT), 0),
//         });
//
//     const goNext = () =>
//         setFilters({
//             offset: (filters.offset ?? 0) + (filters.limit ?? DEFAULT_LIMIT),
//         });
//
//     return (
//         <div className="p-4 max-w-7xl mx-auto">
//             <h1 className="text-2xl font-bold mb-3">Analytics</h1>
//
//           <ColumnPicker all={ALL_COLUMNS} selected={selectedCols} onChange={setSelectedCols} />
//
//
//             <AnalyticsTable
//                 rows={data}
//                 loading={loading}
//                 error={error}
//                 canPrev={canPrev}
//                 canNext={canNext}
//                 onPrev={goPrev}
//                 onNext={goNext}
//                 offset={filters.offset ?? 0}
//                 limit={filters.limit ?? DEFAULT_LIMIT}
//                 columns={activeColumns}
//             />
//         </div>
//     );
// }
