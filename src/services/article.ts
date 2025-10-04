// src/services/articleService.ts

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
    /**
     * Отримує повну статтю з бекенду
     * @param sourceUrl - URL RSS-фіду
     * @param link - декодоване посилання на статтю
     * @returns Promise з даними статті
     */
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