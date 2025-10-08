import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Advertisement from "../components/Advertisement";
import { articleService } from "../services/article";
import { idToLink } from "../utils/LinkID";


type Article = {
  title: string;
  content?: string;
  contentHtml?: string;
  image?: string | null;
  author?: string | null;
  publishedAt?: string;
  link: string;
  source?: { title?: string; link?: string } | null;
};

export default function NewsDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const sourceUrl = searchParams.get("src") || "";

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const safeContent = useMemo(
    () => parse(DOMPurify.sanitize(article?.contentHtml ?? "")),
    [article?.contentHtml],
  );

  useEffect(() => {
    if (!id || !sourceUrl) {
      setError("Bad params: missing id or src");
      setLoading(false);
      return;
    }

    const link = idToLink(id);

    (async () => {
      try {
        const data = await articleService.fetchArticle(sourceUrl, link);
        setArticle(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, sourceUrl]);

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8">
        <p>Loading article…</p>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-2 text-xl font-semibold">News not found</h1>
        <p className="mb-4 text-gray-600">
          {error ||
            "Perhaps the ID is incorrect or the news item has been deleted."}
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
    <section className="mx-auto px-4 py-8 ">
      <Link
        to="/"
        className="mb-6 inline-block text-sm underline"
        aria-label="Return to news list"
      >
        ← return
      </Link>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr_300px]">
        <aside className="hidden lg:block">
          <h3 className="mb-2 text-lg font-semibold">Ad (Bidmatic)</h3>
          <Advertisement
            code="news-left-bidmatic"
            sizes={[[300, 250]]}
            bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
            timeout={2000}
            debug
            className="mx-auto rounded border"
          />
        </aside>

        {/* central block */}
        <section>
          <article className="rounded-2xl bg-gray-100 p-6 shadow-sm">
            <h1 className="mb-2 text-2xl font-bold">{article.title}</h1>

            {article.author && (
              <p className="mb-2 text-sm text-gray-500">
                Автор: {article.author}
              </p>
            )}

            {article.publishedAt && (
              <p className="mb-6 text-xs text-gray-500">
                {new Date(article.publishedAt).toLocaleString()}
              </p>
            )}

            {article.image && (
              <img
                src={article.image}
                alt={article.title || "Article image"}
                className="mb-6 rounded-xl border"
              />
            )}

            {/* Backend HTML sanitized */}
            {article.contentHtml ? (
              <div className="prose max-w-none">{safeContent}</div>
            ) : (
              article.content && (
                <div className="prose max-w-none">
                  <p className="text-gray-800">{article.content}</p>
                </div>
              )
            )}
          </article>
        </section>

        <aside className="hidden lg:block">
          <h3 className="mb-2 text-lg font-semibold">Ad (Adtelligent)</h3>
          <Advertisement
            code="news-right-adtelligent"
            sizes={[[300, 600]]}
            bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
            timeout={1500}
            className="mx-auto rounded border"
          />
        </aside>
      </div>
    </section>
  );
}
