// -----------------------------------------------------------------------------
// src/features/analytics/ColumnVisibilityMenu.tsx
// -----------------------------------------------------------------------------


import type { ColumnKey } from './types';


const ALL_COLUMNS: { key: ColumnKey; label: string }[] = [
    { key: 'time', label: 'Time' },
    { key: 'bidder', label: 'Bidder' },
    { key: 'ad_unit_code', label: 'Ad unit' },
    { key: 'size', label: 'Size' },
    { key: 'is_winner', label: 'Winner' },
    { key: 'cpm', label: 'CPM' },
    { key: 'request_id', label: 'Request ID' },
];


export function ColumnVisibilityMenu({
                                         visible,
                                         onToggle,
                                     }: {
    visible: Record<ColumnKey, boolean>;
    onToggle: (key: ColumnKey, next: boolean) => void;
}) {
    return (
        <div className="inline-block">
            <details className="dropdown">
                <summary className="btn m-1 px-3 py-2 border rounded-xl">Columns</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-56 p-2 shadow border">
                    {ALL_COLUMNS.map((c) => (
                        <li key={c.key}>
                            <label className="flex items-center gap-2 p-2">
                                <input
                                    type="checkbox"
                                    checked={visible[c.key]}
                                    onChange={(e) => onToggle(c.key, e.currentTarget.checked)}
                                />
                                <span>{c.label}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    );
}