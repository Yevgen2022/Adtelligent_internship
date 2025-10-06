import { API_BASE } from "../config";
import type { FeedMeta, NewsItem } from "../types/news";

export type FeedResponse = {
  sourceUrl: string;
  meta: FeedMeta;
  items: Omit<NewsItem, "id">[];
};

export async function fetchFeed(): Promise<FeedResponse> {
  const res = await fetch(`${API_BASE}/feed`);
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json() as Promise<FeedResponse>;
}
