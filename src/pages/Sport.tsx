import Advertisement from "../components/Advertisement";

export default function Sport() {
    return (
        <section className="mx-auto max-w-[1200px] px-4 py-8">
            <h1 className="text-3xl font-semibold">Sport</h1>
            <p className="mt-3 text-slate-600">Sports news and events.</p>

            <ul className="mt-6 list-disc pl-6">
                <li>Football — match results</li>
                <li>Basketball — game schedule</li>
                <li>Tennis — rankings</li>
            </ul>

            {/* Bottom advertising: 4 identical blocks with noticeable indentations */}
            <section className="mt-10">
                <h3 className="text-lg font-semibold mb-4">Sponsored</h3>

                <div className="grid lg:grid-cols-4 gap-x-48 gap-y-8">
                    {/* 1 Bidmatic */}
                    <div className="flex justify-center p-1">
                        <Advertisement
                            code="sport-bottom-bidmatic-1"
                            sizes={[[300, 250]]}
                            bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
                            timeout={2000}
                            debug
                            className="border rounded shadow-sm"
                        />
                    </div>

                    {/* 2 Adtelligent */}
                    <div className="flex justify-center p-1">
                        <Advertisement
                            code="sport-bottom-adtelligent-1"
                            sizes={[[300, 250]]}
                            bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                            timeout={1500}
                            className="border rounded shadow-sm"
                        />
                    </div>

                    {/* 3 Bidmatic */}
                    <div className="flex justify-center p-1">
                        <Advertisement
                            code="sport-bottom-bidmatic-2"
                            sizes={[[300, 250]]}
                            bids={[{ bidder: "bidmatic", params: { source: 886409 } }]}
                            timeout={2000}
                            debug
                            className="border rounded shadow-sm"
                        />
                    </div>

                    {/* 4 Adtelligent */}
                    <div className="flex justify-center p-1">
                        <Advertisement
                            code="sport-bottom-adtelligent-2"
                            sizes={[[300, 250]]}
                            bids={[{ bidder: "adtelligent", params: { aid: 350975 } }]}
                            timeout={1500}
                            className="border rounded shadow-sm"
                        />
                    </div>
                </div>
            </section>
        </section>
    );
}
