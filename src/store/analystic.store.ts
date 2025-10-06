import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ColumnId } from "../pages/Analytics/columns.tsx";
import { DEFAULT_COLUMNS } from "../pages/Analytics/columns.tsx";
import type { Filters } from "../pages/Analytics/types/analytics.types.ts";

const DEFAULT_LIMIT = 50;

type AnalyticsState = {
  selectedCols: ColumnId[];
  filters: Filters;
  setSelectedCols: (cols: ColumnId[]) => void;
  setFilters: (patch: Partial<Filters>) => void;
  reset: () => void;
};

const initialFilters: Filters = {
  limit: DEFAULT_LIMIT,
  offset: 0,
  order_by: "timestamp",
  order_dir: "DESC",
  is_winner: "",
};

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      selectedCols: DEFAULT_COLUMNS,
      filters: initialFilters,
      setSelectedCols: (cols) =>
        set({ selectedCols: cols, filters: { ...get().filters, offset: 0 } }),
      setFilters: (patch) => set({ filters: { ...get().filters, ...patch } }),
      reset: () =>
        set({ selectedCols: DEFAULT_COLUMNS, filters: initialFilters }),
    }),
    {
      name: "analytics-store-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ selectedCols: s.selectedCols, filters: s.filters }),
    },
  ),
);
