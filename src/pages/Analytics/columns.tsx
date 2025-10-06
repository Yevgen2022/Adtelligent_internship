import type { EventRow } from "./types/analytics.types";
import { pickAdUnitId } from "./utils/adUnit";

export type ColumnId =
  | "date"
  | "hour"
  | "event_type"
  | "bidder"
  | "bid_cpm"
  | "is_winner"
  | "auction_id"
  | "ad_unit"
  | "ad_unit_size"
  | "bid_currency"
  | "creative_id"
  | "page_url";

export type Column = {
  id: ColumnId;
  label: string;
  render: (r: EventRow) => React.ReactNode;
};

//  форматер
const fmtCPM = (v: number, cur: string) =>
  `${Number(v).toFixed(2)} ${cur || ""}`;

// here are only those fields that actually come from the backend
export const ALL_COLUMNS: Column[] = [
  {
    id: "date",
    label: "Date",
    render: (r) => {
      const d = new Date(r.timestamp);
      return Number.isNaN(d.getTime())
        ? r.timestamp
        : d.toISOString().slice(0, 10);
    },
  },
  {
    id: "hour",
    label: "Hour",
    render: (r) => {
      const d = new Date(r.timestamp);
      return Number.isNaN(d.getTime())
        ? ""
        : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
  },
  { id: "event_type", label: "Event", render: (r) => r.event_type || "-" },
  { id: "bidder", label: "Bidder", render: (r) => r.bidder || "-" },
  {
    id: "bid_cpm",
    label: "Bid CPM",
    render: (r) => fmtCPM(Number(r.bid_cpm ?? 0), String(r.bid_currency ?? "")),
  },
  {
    id: "is_winner",
    label: "Winner",
    render: (r) => (r.is_winner ? "yes" : "no"),
  },
  { id: "auction_id", label: "Auction ID", render: (r) => r.auction_id || "-" },
  {
    id: "ad_unit",
    label: "Ad Unit",
    render: (r) => (
      <div className="truncate max-w-[280px]" title={r.ad_unit_code}>
        {pickAdUnitId(r.ad_unit_code)}
      </div>
    ),
  },
  { id: "ad_unit_size", label: "Size", render: (r) => r.ad_unit_size || "-" },
  {
    id: "bid_currency",
    label: "Currency",
    render: (r) => r.bid_currency || "-",
  },
  {
    id: "creative_id",
    label: "Creative ID",
    render: (r) => r.creative_id || "-",
  },
  {
    id: "page_url",
    label: "Page URL",
    render: (r) => (
      <div className="truncate max-w-[360px]">
        {r.page_url ? (
          <a
            className="underline"
            href={r.page_url}
            target="_blank"
            rel="noopener noreferrer"
            title={r.page_url}
          >
            {r.page_url}
          </a>
        ) : (
          "-"
        )}
      </div>
    ),
  },
];

// columns show by default
export const DEFAULT_COLUMNS: ColumnId[] = [
  "date",
  "hour",
  "event_type",
  "bidder",
  "bid_cpm",
  "is_winner",
  "ad_unit",
  "ad_unit_size",
  "page_url",
];
