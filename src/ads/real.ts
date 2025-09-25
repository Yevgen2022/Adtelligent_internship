import type { AdsClient, RenderBannerInput } from "./ads.types";

let prebidLoaded = false;
const addedUnits = new Set<string>();

function loadPrebidOnce(src = "/prebid10.10.0.js") {
    if (prebidLoaded) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => { prebidLoaded = true; resolve(); };
        s.onerror = () => reject(new Error("Failed to load Prebid"));
        document.head.appendChild(s);
    });
}

function waitForPbjs(max = 5000) {
    return new Promise<void>((resolve, reject) => {
        const step = 50; let waited = 0;
        const t = setInterval(() => {
            if ((window as any).pbjs) { clearInterval(t); resolve(); }
            else if ((waited += step) >= max) { clearInterval(t); reject(new Error("pbjs not found")); }
        }, step);
    });
}

const client: AdsClient = {
    async init() {
        await loadPrebidOnce();
        await waitForPbjs();
        const pbjs = (window as any).pbjs;
        pbjs.que = pbjs.que || [];
        pbjs.que.push(() => {



            // pbjs.setConfig({ bidderTimeout: 2000 });
            if (import.meta.env.DEV) console.log("[ads] prebid ready");
        });
    },

    async renderBanner({ code, sizes, bids, timeout = 1000, iframe }: RenderBannerInput) {
        await this.init();
        const pbjs = (window as any).pbjs;
        pbjs.que = pbjs.que || [];

        return new Promise<void>((resolve) => {
            pbjs.que.push(() => {
                const adUnit = { code, mediaTypes: { banner: { sizes } }, bids };

                if (!addedUnits.has(code)) {
                    pbjs.addAdUnits([adUnit]);
                    addedUnits.add(code);
                }

                const render = () => {
                    const winners = pbjs.getHighestCpmBids(code) || [];
                    if (winners.length > 0 && iframe) {
                        const { adId, width, height } = winners[0];
                        const [w, h] = (width && height) ? [width, height] : (sizes[0] || [300, 250]);
                        iframe.width = String(w);
                        iframe.height = String(h);
                        try {
                            const doc = iframe.contentWindow!.document;
                            pbjs.renderAd(doc, adId);
                        } catch (e) {
                            console.error("[ads] render error:", e);
                        }
                    } else {
                        console.log(`[ads] no bids for ${code}`);
                    }
                    resolve();
                };

                pbjs.requestBids({
                    adUnitCodes: [code],
                    bidsBackHandler: render,
                    timeout,
                });
            });
        });
    },
};

export default client;
