// import { Link, useParams, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Advertisement from "../components/Advertisement";
// import { idToLink } from "../utils/LinkID";
//
// type Article = {
//     title: string;
//     content?: string;
//     contentHtml?: string;      // if the backend returns the HTML of the article
//     image?: string | null;
//     author?: string | null;
//     publishedAt?: string;      // ISO string
//     link: string;              // the original URL of the article
//     source?: { title?: string; link?: string } | null;
// };
//
// export default function NewsDetails() {
//     const { id } = useParams<{ id: string }>();
//     const [searchParams] = useSearchParams();
//     const sourceUrl = searchParams.get("src") || "";   // we take the feed url transferred from CardNew
//
//     const [article, setArticle] = useState<Article | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         if (!id || !sourceUrl) {
//             setError("Bad params: missing id or src");
//             setLoading(false);
//             return;
//         }
//
//         const link = idToLink(id); // decode back item.link
//
//         (async () => {
//             try {
//                 const res = await fetch("http://localhost:3500/api/parse", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ url: sourceUrl, link }),
//                 });
//                 if (!res.ok) throw new Error(`Failed to load article (${res.status})`);
//                 const data: Article = await res.json();
//                 setArticle(data);
//             } catch (e: any) {
//                 setError(e?.message || "Unknown error");
//             } finally {
//                 setLoading(false);
//             }
//         })();
//     }, [id, sourceUrl]);
//
//     if (loading) {
//         return (
//             <section className="mx-auto max-w-3xl px-4 py-8">
//                 <p>Loading article…</p>
//             </section>
//         );
//     }
//
//     if (error || !article) {
//         return (
//             <section className="mx-auto max-w-3xl px-4 py-8">
//                 <h1 className="text-xl font-semibold mb-2">News not found</h1>
//                 <p className="mb-4 text-gray-600">
//                     {error || "Perhaps the ID is incorrect or the news item has been deleted."}
//                 </p>
//                 <Link to="/" className="inline-block rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
//                     Return...
//                 </Link>
//             </section>
//         );
//     }
//
//     return (
//         <section className="mx-auto px-4 py-8 border">
//             <Link to="/" className="mb-6 inline-block text-sm underline" aria-label="Return to news list">
//                 ← return
//             </Link>
//
//             <div className="grid gap-6 lg:grid-cols-[300px_1fr_300px]">
//                 <aside className="hidden lg:block">
//                     <h3 className="text-lg font-semibold mb-2">Ad (Bidmatic)</h3>
//                     <Advertisement
//                         code="news-left-bidmatic"
//                         sizes={[[300, 250]]}
//                         bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
//                         timeout={2000}
//                         debug
//                         className="border rounded mx-auto"
//                     />
//                 </aside>
//
//
//
//
//                 {/*// central block*/}
//                 <section>
//                     <article className="rounded-2xl border p-6 shadow-sm bg-white">
//                         <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
//                         {article.author && <p className="text-sm text-gray-500 mb-2">Автор: {article.author}</p>}
//                         {article.publishedAt && (
//                             <p className="text-xs text-gray-500 mb-6">
//                                 {new Date(article.publishedAt).toLocaleString()}
//                             </p>
//                         )}
//
//                         {article.image && (
//                             <img src={article.image} alt="" className="mb-6 rounded-xl border" />
//                         )}
//
//                         {/* if the backend returns HTML */}
//                         {article.contentHtml ? (
//                             <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
//                         ) : (
//                             article.content && (
//                                 <div className="prose max-w-none">
//                                     <p className="text-gray-800">{article.content}</p>
//                                 </div>
//                             )
//                         )}
//                     </article>
//                 </section>
//
//                 <aside className="hidden lg:block">
//                     <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
//                     <Advertisement
//                         code="news-right-adtelligent"
//                         sizes={[[300, 600]]}
//                         bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
//                         timeout={1500}
//                         className="border rounded mx-auto"
//                     />
//                 </aside>
//             </div>
//         </section>
//     );
// }

// src/pages/NewsDetails.tsx

import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Advertisement from "../components/Advertisement";
import { idToLink } from "../utils/LinkID";
import { articleService } from "../services/article";

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
            } catch (e: any) {
                setError(e?.message || "Unknown error");
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
                <h1 className="text-xl font-semibold mb-2">News not found</h1>
                <p className="mb-4 text-gray-600">
                    {error || "Perhaps the ID is incorrect or the news item has been deleted."}
                </p>
                <Link to="/" className="inline-block rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
                    Return...
                </Link>
            </section>
        );
    }

    return (
        <section className="mx-auto px-4 py-8 ">
            <Link to="/" className="mb-6 inline-block text-sm underline" aria-label="Return to news list">
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

                {/* central block */}
                <section>
                    <article className="rounded-2xl p-6 shadow-sm bg-gray-100">
                        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
                        {article.author && <p className="text-sm text-gray-500 mb-2">Автор: {article.author}</p>}
                        {article.publishedAt && (
                            <p className="text-xs text-gray-500 mb-6">
                                {new Date(article.publishedAt).toLocaleString()}
                            </p>
                        )}

                        {article.image && (
                            <img src={article.image} alt="" className="mb-6 rounded-xl border" />
                        )}

                        {/* if the backend returns HTML */}
                        {article.contentHtml ? (
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
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
                    <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
                    <Advertisement
                        code="news-right-adtelligent"
                        sizes={[[300, 600]]}
                        bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                        timeout={1500}
                        className="border rounded mx-auto"
                    />
                </aside>
            </div>
        </section>
    );
}