import type { Column } from "./columns.tsx";
import type { EventRow } from "./types/analytics.types";

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
  columns: Column[];
};

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
  columns,
}: Props) {
  return (
    <div className="w-full">
      {/* pagintion up */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm opacity-70">
          Offset: {offset} • Limit: {limit}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={onPrev}
            disabled={!canPrev || loading}
          >
            ← Prev
          </button>

          <button
            type="button"
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={onNext}
            disabled={!canNext || loading}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto border rounded-xl max-h-[70vh]">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
              {columns.map((c) => (
                <th key={c.id}>{c.label}</th>
              ))}
            </tr>
          </thead>

          <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2">
            {loading && (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  Loading…
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan={columns.length} className="text-red-600 py-4">
                  Error: {error}
                </td>
              </tr>
            )}
            {!loading && !error && rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="opacity-70 py-6 text-center"
                >
                  No data.
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              rows.map((r, i) => (
                <tr
                  key={`${r.timestamp}-${r.auction_id}-${i}`}
                  className="border-t"
                >
                  {columns.map((c) => (
                    <td key={c.id}>{c.render(r)}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination down */}
      <div className="flex items-center justify-end gap-2 mt-2">
        <button
          type="button"
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={onPrev}
          disabled={!canPrev || loading}
        >
          ← Prev
        </button>

        <button
          type="button"
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
