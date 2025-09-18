import { Link } from "react-router-dom";
import CardNew from "../components/CardNew";
import news from "../data/news.json";
import type { NewsItem } from "../types/news";

export default function Home() {
  const items = news as NewsItem[];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">News</h1>
        <Link to="/" className="text-sm underline">
          Main
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-1">
        {items.map((n) => (
          <CardNew key={n.id} item={n} />
        ))}
      </section>
    </main>
  );
}
