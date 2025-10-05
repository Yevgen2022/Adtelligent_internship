// src/features/analytics/FiltersForm.tsx
import { useCallback, useEffect, useMemo, useState, useId } from "react";
import { FILTERS } from "./filtersConfig";
import { toISOLocal } from "./utils";
import type { FetchParams } from "./types";

export type FiltersFormValues = Partial<
    Pick<
        FetchParams,
        | "date_from"
        | "date_to"
        | "bidder"
        | "ad_unit_code"
        | "size"
        | "min_cpm"
        | "max_cpm"
        | "is_winner"
    >
>;

type Props = {
    defaultValues?: FiltersFormValues;
    onSubmit: (activeFilters: FiltersFormValues) => void;
    disabled?: boolean;
};

export function FiltersForm({ defaultValues, onSubmit, disabled }: Props) {
    const formId = useId();

    const [values, setValues] = useState<FiltersFormValues>(defaultValues ?? {});
    const [enabled, setEnabled] = useState<Record<string, boolean>>({});

    // синхронізація з зовнішніми дефолтами
    useEffect(() => {
        if (defaultValues) setValues(defaultValues);
    }, [defaultValues]);

    const handleToggle = useCallback(
        (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setEnabled((prev) => ({ ...prev, [key]: e.target.checked }));
        },
        []
    );

    const handleChange = useCallback(
        (key: string) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                const val = e.currentTarget.value;
                setValues((prev) => ({ ...prev, [key]: val }));
            },
        []
    );

    // Підготовка лише активних (увімкнених чекбоксом) фільтрів
    const activeFilters = useMemo<FiltersFormValues>(() => {
        const out: FiltersFormValues = {};
        for (const { key } of FILTERS) {
            if (!enabled[key]) continue;
            const v = (values as any)[key];
            if (v === undefined || v === null || v === "") continue;
            out[key as keyof FiltersFormValues] = key.startsWith("date_")
                ? (toISOLocal(v as string) as any)
                : (v as any);
        }
        return out;
    }, [enabled, values]);

    const onSubmitForm = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(activeFilters);
        },
        [onSubmit, activeFilters]
    );

    const onResetForm = useCallback(() => {
        setValues({});
        setEnabled({});
    }, []);

    return (
        <form id={formId} onSubmit={onSubmitForm} className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {FILTERS.map((f) => {
                    const fieldId = `${formId}-${f.key}`;
                    const isOn = !!enabled[f.key];

                    return (
                        <label
                            key={f.key}
                            htmlFor={fieldId}
                            className="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 hover:bg-gray-50"
                        >
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={isOn}
                                onChange={handleToggle(f.key)}
                                disabled={disabled}
                                aria-controls={fieldId}
                                aria-label={`Enable ${f.label}`}
                            />

                            <div className="flex-1">
                                <div className="text-sm font-medium">{f.label}</div>

                                {f.type === "select" ? (
                                    <select
                                        id={fieldId}
                                        className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
                                        value={(values as any)[f.key] ?? ""}
                                        onChange={handleChange(f.key)}
                                        disabled={!isOn || disabled}
                                    >
                                        {(f as any).options.map((o: any) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={fieldId}
                                        type={f.type}
                                        inputMode={f.type === "number" ? "decimal" : undefined}
                                        className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
                                        placeholder={f.placeholder}
                                        value={(values as any)[f.key] ?? ""}
                                        onChange={handleChange(f.key)}
                                        disabled={!isOn || disabled}
                                    />
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
                    disabled={disabled}
                >
                    Apply filters
                </button>

                <button
                    type="button"
                    className="px-3 py-2 rounded-xl border disabled:opacity-50"
                    onClick={onResetForm}
                    disabled={disabled}
                    aria-label="Reset filters"
                >
                    Reset
                </button>

                <span className="text-sm text-gray-600">
          Active: {Object.keys(activeFilters).length}
        </span>
            </div>
        </form>
    );
}
