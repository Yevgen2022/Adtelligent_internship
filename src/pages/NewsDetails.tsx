import { useParams, Link } from "react-router-dom";
import news from "../data/news.json";
import type { NewsItem } from "../types/news";

export default function NewsDetails() {
    const { id } = useParams<{ id: string }>();

    const items = news as NewsItem[];
    const item = items.find((n) => String(n.id) === id);

    if (!item) {
        return (
            <main className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="text-xl font-semibold mb-2">News not found</h1>
                <p className="mb-4 text-gray-600">Perhaps the ID is incorrect or the news item has been deleted.</p>
                <Link
                    to="/"
                    className="inline-block rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                >
                   Return...
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <Link
                to="/"
                className="mb-6 inline-block text-sm underline"
                aria-label="Повернутися до списку новин"
            >
                ← return
            </Link>

            <article className="rounded-2xl border p-6 shadow-sm bg-white">
                <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
                <p className="text-sm text-gray-500 mb-6">Автор: {item.author}</p>

                <div className="prose max-w-none">
                    <p className="text-gray-800">{item.description}</p>
                </div>
            </article>
        </main>
    );
}
