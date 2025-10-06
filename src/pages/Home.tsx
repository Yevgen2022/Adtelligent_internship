import { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import CardNew from "../components/CardNew";
import { fetchFeed } from "../services/feed";
import type { FeedMeta, NewsItem } from "../types/news";

export default function Home() {
  const [meta, setMeta] = useState<FeedMeta | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFeed();

        setMeta(data.meta);
        setSourceUrl(data.sourceUrl);

        const withIds: NewsItem[] = data.items.map((it) => ({
          ...it,
          id: btoa(it.link),
        }));
        setItems(withIds);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="w-full bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 pt-4 rounded-2xl">
      <section className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <header className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">News</h1>
        </header>

        <h2 className="mb-8 text-center text-xl md:text-xl text-neutral-500 dark:text-neutral-400">
          Always fresh news
        </h2>

        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
          <aside className="hidden lg:block sticky top-6 self-start">
            <div className="mb-3 text-neutral-700 dark:text-neutral-300 font-medium">
              Ad (Adtelligent)
            </div>
            <div className="rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
              <Advertisement
                code="home-left-adtelligent"
                sizes={[[300, 600]]}
                bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                timeout={1500}
                className="mx-auto"
              />
            </div>
          </aside>

          <section className="min-w-0">
            <div className="rounded-3xl border border-neutral-200/60 bg-white p-4 md:p-6 shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
              {loading && <p className="text-neutral-500">Loading…</p>}
              {error && <p className="text-red-600">{error}</p>}

              {meta && (
                <div className="flex flex-col gap-6">
                  {items.map((n) => (
                    <CardNew
                      key={n.id}
                      meta={meta}
                      item={n}
                      sourceUrl={sourceUrl}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          <aside className="hidden lg:block sticky top-6 self-start">
            <div className="mb-3 text-neutral-700 dark:text-neutral-300 font-medium">
              Ad (Bidmatic)
            </div>
            <div className="rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
              <Advertisement
                code="home-right-bidmatic"
                sizes={[[300, 600]]}
                bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
                timeout={2000}
                debug
                className="mx-auto"
              />
            </div>
          </aside>
        </div>
      </section>
    </section>
  );
}
