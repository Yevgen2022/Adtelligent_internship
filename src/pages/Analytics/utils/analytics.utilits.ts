import type { Filters } from "../types/analytics.types.ts";

export function toIsoOrUndef(v?: string) {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function buildQuery(f: Filters) {
  const qs = new URLSearchParams();

  const startIso = toIsoOrUndef(f.startDate);
  const endIso = toIsoOrUndef(f.endDate);
  if (startIso) qs.set("startDate", startIso);
  if (endIso) qs.set("endDate", endIso);

  const simpleFields: (keyof Filters)[] = [
    "event_type",
    "bidder",
    "ad_unit_code",
    "ad_unit_size",
    "bid_currency",
    "device_type",
    "browser",
    "os",
    "geo_country",
    "geo_city",
    "campaign_id",
    "creative_id",
  ];
  for (const key of simpleFields) {
    const val = f[key];
    if (val) qs.set(key, String(val));
  }

  if (f.is_winner === "0" || f.is_winner === "1")
    qs.set("is_winner", f.is_winner);
  if (f.min_cpm) qs.set("min_cpm", f.min_cpm);
  if (f.max_cpm) qs.set("max_cpm", f.max_cpm);

  const orderBy = f.order_by ?? "timestamp";
  const orderDir = (f.order_dir ?? "desc").toLowerCase();
  if (orderBy !== "timestamp") qs.set("order_by", orderBy);
  if (orderDir !== "desc") qs.set("order_dir", orderDir);

  qs.set("limit", String(f.limit ?? 50));
  qs.set("offset", String(f.offset ?? 0));
  return qs.toString();
}

export function fmtTs(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function fmtCPM(v: number, cur: string) {
  return `${v.toFixed(2)} ${cur}`;
}
