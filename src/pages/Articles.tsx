import Advertisement from "../components/Advertisement";

export default function Article() {
    return (
        <section className="mx-auto max-w-[1200px] px-4 py-8">
            <header className="mb-6">
                <h1 className="text-3xl font-semibold">Article</h1>
                <p className="mt-3 text-slate-600">
                    The article content will appear here.
                </p>
            </header>


            <div className="grid gap-6 lg:grid-cols-[300px_1fr_300px]">


                <aside className="hidden lg:block">
                    <h3 className="text-lg font-semibold mb-2">Ad (Adtelligent)</h3>
                    <Advertisement
                        code="article-left-adtelligent"
                        sizes={[[300, 600]]}
                        bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                        timeout={1500}
                        className="border rounded mx-auto"
                    />
                </aside>


                 {/*center/////////////////////////////////////////////////////////// */}
                <section>
                    <article className="rounded-xl border p-6 space-y-3">
                        <h2 className="text-xl font-medium">Article Title</h2>
                        <p className="leading-relaxed">
                            A short sample article text to test Tailwind styling.
                        </p>
                    </article>
                </section>


                <aside className="hidden lg:block">
                    <h3 className="text-lg font-semibold mb-2">Ad (Bidmatic)</h3>
                    <Advertisement
                        code="article-right-bidmatic"
                        sizes={[[300, 600]]}
                        bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
                        timeout={2000}
                        debug
                        className="border rounded mx-auto"
                    />
                </aside>
            </div>
        </section>
    );
}
