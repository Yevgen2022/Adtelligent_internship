export type OrderDir = "ASC" | "DESC";

export type EventRow = {
  timestamp: string; // ISO
  bidder: string;
  bid_cpm: number;
  is_winner: number; // 0 | 1
  auction_id: string;
  event_type: string;
  ad_unit_code: string;
  bid_currency: string;
  creative_id: string;
  ad_unit_size: string;
  page_url: string;
};

export type Filters = {
  startDate?: string;
  endDate?: string;
  event_type?: string;
  bidder?: string;
  ad_unit_code?: string;
  ad_unit_size?: string;
  bid_currency?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  geo_country?: string;
  geo_city?: string;
  campaign_id?: string;
  creative_id?: string;
  is_winner?: "" | "0" | "1";
  min_cpm?: string;
  max_cpm?: string;
  order_by?: keyof EventRow | "timestamp";
  order_dir?: OrderDir;
  limit?: number;
  offset?: number;
};
