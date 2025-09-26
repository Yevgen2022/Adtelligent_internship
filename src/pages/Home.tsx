import { Link } from "react-router-dom";
import Advertisement from "../components/Advertisement";
import CardNew from "../components/CardNew";
import news from "../data/news.json";
import type { NewsItem } from "../types/news";

export default function Home() {
  const items = news as NewsItem[];

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8">
      {" "}
      {/* 300 + 1fr + 300 + gaps */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">News</h1>
        <Link to="/" className="text-sm underline">
          Main
        </Link>
      </header>
      <div className="grid gap-6 lg:grid-cols-[300px_1fr_300px]">
        <aside className="hidden lg:block">
          <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
          <Advertisement
            code="home-left-adtelligent"
            sizes={[[300, 600]]} // Size[][]
            bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
            timeout={1500}
            className="border rounded mx-auto"
          />
        </aside>

        <section>
          <div className="grid gap-4 sm:grid-cols-1">
            {items.map((n) => (
              <CardNew key={n.id} item={n} />
            ))}
          </div>
        </section>

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
