// src/features/analytics/filtersConfig.ts

export type FilterKey =
    | "date_from"
    | "date_to"
    | "bidder"
    | "ad_unit_code"
    | "size"
    | "min_cpm"
    | "max_cpm"
    | "is_winner";

type Common = {
    key: FilterKey;
    label: string;
    placeholder?: string;
};

export type InputFilterConfig = Common & {
    type: "text" | "number" | "datetime-local";
};

export type SelectOption = { value: string; label: string };

export type SelectFilterConfig = Common & {
    type: "select";
    options: ReadonlyArray<SelectOption>;
};

export type FilterConfig = InputFilterConfig | SelectFilterConfig;

/** Порядок рендеру у формі */
export const FILTERS: ReadonlyArray<FilterConfig> = [
    {
        key: "date_from",
        label: "Date from",
        type: "datetime-local",
        placeholder: "",
    },
    {
        key: "date_to",
        label: "Date to",
        type: "datetime-local",
        placeholder: "",
    },
    {
        key: "bidder",
        label: "Bidder",
        type: "text",
        placeholder: "e.g. prebidAdapterX",
    },
    {
        key: "ad_unit_code",
        label: "Ad Unit Code",
        type: "text",
        placeholder: "e.g. div-gpt-ad-12345-0",
    },
    {
        key: "size",
        label: "Size",
        type: "text",
        placeholder: "e.g. 300x250",
    },
    {
        key: "min_cpm",
        label: "Min CPM",
        type: "number",
        placeholder: "0",
    },
    {
        key: "max_cpm",
        label: "Max CPM",
        type: "number",
        placeholder: "100",
    },
    {
        key: "is_winner",
        label: "Winner only",
        type: "select",
        options: [
            { value: "", label: "—" },
            { value: "1", label: "Yes" },
            { value: "0", label: "No" },
        ] as const,
    },
] as const;

/** Type guard, якщо треба відрізняти селекти від інпутів у рендері */
export const isSelect = (f: FilterConfig): f is SelectFilterConfig =>
    f.type === "select";
