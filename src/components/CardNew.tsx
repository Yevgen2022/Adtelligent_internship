import { Link } from "react-router-dom";
import type { NewsItem, FeedMeta } from "../types/news";
import { linkToId } from  "../utils/LinkID.ts"


type Props = {
    meta: FeedMeta;
    item: NewsItem;   // item has: { title, description?, link, isoDate? ... }
    sourceUrl: string;
};

export default function CardNew({ meta, item }: Props) {
    const encodedId = linkToId(item.link);

    return (
        <article className="rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-100">
            {/* block of source of (meta) */}
            <header className="mb-3 flex items-start gap-3">
                {meta.image ? (
                    <img
                        src={meta.image}
                        alt={meta.title}
                        className="h-10 w-10 rounded object-cover border"
                    />
                ) : null}

                <div className="min-w-0">
                    <a
                        href={meta.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium hover:underline block truncate"
                        title={meta.title}
                    >
                        {meta.title}
                    </a>

                    {meta.description ? (
                        <p className="text-xs text-gray-500 line-clamp-2">
                            {meta.description}
                        </p>
                    ) : null}
                </div>
            </header>

            {/* Content news */}
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

            {item.description ? (
                <p className="text-gray-700 line-clamp-3">{item.description}</p>
            ) : null}

            {item.isoDate ? (
                <p className="text-xs text-gray-500 mt-2">
                    {new Date(item.isoDate).toLocaleString()}
                </p>
            ) : null}

            <div className="mt-4">
                <Link
                    to={`/news/${encodedId}?src=${encodeURIComponent(item.link)}`}
                    className="inline-block rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                    aria-label={`Read more: ${item.title}`}
                >
                    Details ...
                </Link>
            </div>
        </article>
    );
}
