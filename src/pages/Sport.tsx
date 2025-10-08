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



            {/*////////////////  Блок моєї реклами  //////////////////////////*/}


            {/*<aside className="hidden lg:block sticky top-6 self-start">*/}
            {/*    <div className="mb-3 text-neutral-700 dark:text-neutral-300 font-medium">*/}
            {/*        Ad (Oshkukov)*/}
            {/*    </div>*/}
            {/*    <div className="rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:bg-neutral-800 dark:border-neutral-700">*/}
            {/*        <Advertisement*/}
            {/*            code="home-right-oshkukov"*/}
            {/*            sizes={[[300, 250]]}*/}
            {/*            bids={[*/}
            {/*                {*/}
            {/*                    bidder: "oshkukov",*/}
            {/*                    params: {*/}
            {/*                        endpoint: "http://localhost:3500/api/adserver/bid", // локальний бек*/}
            {/*                        publisherId: "demo-pub",*/}
            {/*                        placementId: "slot-1",*/}
            {/*                        bidfloor: 0.1*/}
            {/*                    }*/}
            {/*                }*/}
            {/*            ]}*/}
            {/*            timeout={1500}*/}
            {/*            className="mx-auto"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</aside>*/}


{/*/////////////////////////////////////////////*/}


        </div>
      </section>
    </section>
  );
}
