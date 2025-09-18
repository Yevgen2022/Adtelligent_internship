import { Link } from "react-router-dom";
import type { NewsItem } from "../types/news";

type Props = {
  item: NewsItem;
};

export default function CardNew({ item }: Props) {
  return (
    <article className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-500 mb-3">Автор: {item.author}</p>
      <p className="text-gray-700 line-clamp-3">{item.description}</p>

      <div className="mt-4">
        <Link
          to={`/news/${item.id}`}
          className="inline-block rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
          aria-label={`Читати детальніше: ${item.title}`}
        >
          Details ...
        </Link>
      </div>
    </article>
  );
}
