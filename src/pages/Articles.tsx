export default function Article() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold">Article</h1>
      <p className="mt-3 text-slate-600">
        The article content will appear here.
      </p>
      <article className="mt-6 rounded-xl border p-6">
        <h2 className="text-xl font-medium">Article Title</h2>
        <p className="mt-2 leading-relaxed">
          A short sample article text to test Tailwind styling.
        </p>
      </article>
    </main>
  );
}
