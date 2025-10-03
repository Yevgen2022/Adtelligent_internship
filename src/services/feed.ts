import { API_URL } from "../config";
import type { NewsItem, FeedMeta } from "../types/news";

export type FeedResponse = {
    sourceUrl: string;
    meta: FeedMeta;
    items: Omit<NewsItem, "id">[];
};

export async function fetchFeed(): Promise<FeedResponse> {
    const res = await fetch(`${API_URL}/feed`);
    if (!res.ok) throw new Error("Failed to fetch feed");
    return res.json() as Promise<FeedResponse>;
}
