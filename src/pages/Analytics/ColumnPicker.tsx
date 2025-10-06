import type { Column, ColumnId } from "./columns.tsx";

type Props = {
  all: Column[];
  selected: ColumnId[];
  onChange: (next: ColumnId[]) => void;
};

export default function ColumnPicker({ all, selected, onChange }: Props) {
  const toggle = (id: ColumnId) => {
    const has = selected.includes(id);
    onChange(has ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  const selectAll = () => onChange(all.map((c) => c.id));
  const clearAll = () => onChange([]);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-3">
      <span className="text-sm font-medium">Columns:</span>
      <div className="flex flex-wrap gap-2">
        {all.map((c) => (
          <label
            key={c.id}
            className="text-sm flex items-center gap-1 border rounded px-2 py-1"
          >
            <input
              type="checkbox"
              checked={selected.includes(c.id)}
              onChange={() => toggle(c.id)}
            />
            {c.label}
          </label>
        ))}
      </div>
      <div className="ml-auto flex gap-2">
        <button
          type="button"
          className="px-2 py-1 border rounded"
          onClick={selectAll}
        >
          Select all
        </button>

        <button
          type="button"
          className="px-2 py-1 border rounded"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
