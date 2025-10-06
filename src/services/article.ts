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

export const articleService = {
  // Retrieves the full article from the backend
  // @param sourceUrl - The RSS feed URL
  // @param link - The decoded link to the article
  // @returns A Promise with the article data

  async fetchArticle(sourceUrl: string, link: string): Promise<Article> {
    const res = await fetch("/api/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: sourceUrl, link }),
    });

    if (!res.ok) {
      throw new Error(`Failed to load article (${res.status})`);
    }

    return res.json();
  },
};
