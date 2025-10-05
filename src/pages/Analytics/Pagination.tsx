// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


export function Pagination({
                               page,
                               pageSize,
                               total,
                               onChange,
                               disabled,
                           }: {
    page: number; // 1-based
    pageSize: number;
    total: number;
    onChange: (nextPage: number) => void;
    disabled?: boolean;
}) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const canPrev = page > 1;
    const canNext = page < totalPages;


    return (
        <div className="flex items-center gap-2">
            <button
                className="px-3 py-2 rounded-xl border disabled:opacity-50"
                onClick={() => onChange(1)}
                disabled={!canPrev || disabled}
            >
                « First
            </button>
            <button
                className="px-3 py-2 rounded-xl border disabled:opacity-50"
                onClick={() => onChange(page - 1)}
                disabled={!canPrev || disabled}
            >
                ‹ Prev
            </button>
            <span className="text-sm text-gray-600 px-2">
Page {page} / {totalPages}
</span>
            <button
                className="px-3 py-2 rounded-xl border disabled:opacity-50"
                onClick={() => onChange(page + 1)}
                disabled={!canNext || disabled}
            >
                Next ›
            </button>
            <button
                className="px-3 py-2 rounded-xl border disabled:opacity-50"
                onClick={() => onChange(totalPages)}
                disabled={!canNext || disabled}
            >
                Last »
            </button>
        </div>
    );
}