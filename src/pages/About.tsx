export default function About() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">About the Project</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Internship project at Adtelligent: a news website with the potential
                    for future integration of advertising modules.
                </p>
            </header>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Goal</h2>
                <p className="mt-3 text-gray-700">
                    Build a basic news platform with a clean frontend architecture,
                    prepared for scaling (pages, modals, lists, detail views), as well as
                    for integration of advertising solutions (ad slots, A/B tests,
                    performance metrics).
                </p>
            </section>

            <section className="mt-6 grid gap-6 md:grid-cols-2">
                <article className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold">Technologies</h3>
                    <ul className="mt-3 list-disc pl-5 text-gray-700">
                        <li>React + TypeScript (Vite)</li>
                        <li>Tailwind CSS (UI utilities)</li>
                        <li>React Router (routing)</li>
                        <li>Zustand / TanStack Query (planned)</li>
                        <li>CI: GitHub Actions, Biome linting</li>
                        <li>Deployment: Vercel (Preview + Production)</li>
                    </ul>
                </article>

                <article className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold">Internship Focus</h3>
                    <ul className="mt-3 list-disc pl-5 text-gray-700">
                        <li>Writing clean, CI-validated code</li>
                        <li>Working with branches and PRs (feature → main)</li>
                        <li>Preparing UI for ad slot integration</li>
                        <li>Considering performance and accessibility</li>
                    </ul>
                </article>
            </section>

            <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Ad Integrations (Roadmap)</h3>
                <p className="mt-3 text-gray-700">
                    Future iterations will introduce placements for ad blocks (header,
                    in-feed, in-article), configuration flags, and metrics tracking (CTR,
                    viewability). The page architecture is designed for flexible component
                    integration without major content changes.
                </p>
            </section>

            <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Contacts & Status</h3>
                <div className="mt-3 space-y-2 text-gray-700">
                    <p>
                        Repository:{" "}
                        <span className="text-gray-900 font-medium">GitHub</span> (PR
                        process, automated checks).
                    </p>
                    <p>
                        Deployment:{" "}
                        <span className="text-gray-900 font-medium">Vercel</span> (Preview
                        for PRs, Production from <code>main</code>).
                    </p>
                    <p className="text-sm text-gray-500">
                        *This page is for demonstration and educational purposes within the
                        internship.
                    </p>
                </div>
            </section>
        </main>
    );
}
