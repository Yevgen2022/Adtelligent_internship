import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Advertisement from "../components/Advertisement";
import CardNew from "../components/CardNew";
import type { NewsItem, FeedMeta } from "../types/news";

type FeedResponse = {
    sourceUrl: string;
    meta: FeedMeta;
    items: Omit<NewsItem, "id">[]; // backend returns no id
};

export default function Home() {
    const [meta, setMeta] = useState<FeedMeta | null>(null);
    const [sourceUrl, setSourceUrl] = useState("");
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        (async () => {

            try {

                const res = await fetch("http://localhost:3500/feed");

                if (!res.ok) throw new Error("Failed to fetch feed");
                const data: FeedResponse = await res.json();

                setMeta(data.meta);
                setSourceUrl(data.sourceUrl);

                // add id from link
                const withIds: NewsItem[] = data.items.map((it) => ({
                    ...it,
                    id: btoa(it.link) // якщо робиш через linkToId з utils — підстав туди
                }));
                setItems(withIds);
            } catch (e: any) {
                setError(e.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section className="mx-auto  px-4 py-8 border">
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">News</h1>
                {/*<Link to="/" className="text-sm underline">*/}
                {/*    Main*/}
                {/*</Link>*/}
            </header>

            <div className="grid gap-6 lg:grid-cols-[300px_1fr_300px]">

                {/* Left advertising */}
                <aside className="hidden lg:block">
                    <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
                    <Advertisement
                        code="home-left-adtelligent"
                        sizes={[[300, 600]]}
                        bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                        timeout={1500}
                        className="border rounded mx-auto"
                    />
                </aside>




                {/* News feed */}
                <section>
                    {loading && <p>Loading…</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {meta && (
                        <div className="grid gap-4 sm:grid-cols-1">
                            {items.map((n) => (
                                <CardNew key={n.id} meta={meta} item={n} sourceUrl={sourceUrl} />
                            ))}
                        </div>
                    )}
                </section>




                {/* The right advertisement */}
                <aside className="hidden lg:block">
                    <h3 className="text-lg font-semibold mb-2">Ad (Bidmatic)</h3>
                    <Advertisement
                        code="home-right-bidmatic"
                        sizes={[[300, 600]]}
                        bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
                        timeout={2000}
                        debug
                        className="border rounded mx-auto"
                    />
                </aside>
            </div>
        </section>
    );
}
