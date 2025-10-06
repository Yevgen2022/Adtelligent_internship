export type NewsItem = {
  id: string;
  title: string;
  description: string;
  author: string;
  link: string;
  isoDate?: string;
};

export type FeedMeta = {
  title: string;
  link: string;
  description?: string | null;
  image?: string | null;
};

export type Article = {
  title: string;
  content: string; // HTML текст
  author?: string;
  published?: string;
  sourceUrl?: string;
};
