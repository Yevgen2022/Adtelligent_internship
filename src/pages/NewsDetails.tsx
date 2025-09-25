import { Link, useParams } from "react-router-dom";
import Advertisement from "../components/Advertisement";
import news from "../data/news.json";
import type { NewsItem } from "../types/news";

export default function NewsDetails() {
  const { id } = useParams<{ id: string }>();

  const items = news as NewsItem[];
  const item = items.find((n) => String(n.id) === id);

  if (!item) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-xl font-semibold mb-2">News not found</h1>
        <p className="mb-4 text-gray-600">
          Perhaps the ID is incorrect or the news item has been deleted.
        </p>
        <Link
          to="/"
          className="inline-block rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Return...
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-8">
      <Link
        to="/"
        className="mb-6 inline-block text-sm underline"
        aria-label="Повернутися до списку новин"
      >
        ← return
      </Link>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr_300px]">
        <aside className="hidden lg:block">
          <h3 className="text-lg font-semibold mb-2">Ad (Bidmatic)</h3>
          <Advertisement
            code="news-left-bidmatic"
            sizes={[[300, 250]]}
            bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
            timeout={2000}
            debug
            className="border rounded mx-auto"
          />
        </aside>

        <section>
          <article className="rounded-2xl border p-6 shadow-sm bg-white">
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            <p className="text-sm text-gray-500 mb-6">Автор: {item.author}</p>
            <div className="prose max-w-none">
              <p className="text-gray-800">{item.description}</p>
            </div>
          </article>
        </section>

        <aside className="hidden lg:block">
          <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
          <Advertisement
            code="news-right-adtelligent"
            sizes={[
              [300, 250],
              [300, 600],
            ]}
            bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
            timeout={1500}
            className="border rounded mx-auto"
          />
        </aside>
      </div>
    </section>
  );
}
