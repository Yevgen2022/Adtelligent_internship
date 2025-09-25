import type { AdsClient, RenderBannerInput } from "./ads.types";

let prebidLoaded = false;
const addedUnits = new Set<string>();

function loadPrebidOnce(src = "/prebid10.10.0.js"): Promise<void> {
  if (prebidLoaded) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => {
      prebidLoaded = true;
      resolve();
    };
    s.onerror = () => reject(new Error("Failed to load Prebid"));
    document.head.appendChild(s);
  });
}

function waitForPbjs(max = 5000): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const step = 50;
    let waited = 0;
    const t = setInterval(() => {
      if (window.pbjs) {
        clearInterval(t);
        resolve();
        return;
      }
      waited += step;
      if (waited >= max) {
        clearInterval(t);
        reject(new Error("pbjs not found"));
      }
    }, step);
  });
}

/** Extend the minimal pbjs types locally for the APIs used */
type PbjsBidsApi = NonNullable<typeof window.pbjs> & {
  addAdUnits: (units: unknown[]) => void;
  requestBids: (opts: {
    adUnitCodes: string[];
    bidsBackHandler: () => void;
    timeout: number;
  }) => void;
  getHighestCpmBids: (
    code: string,
  ) => Array<{ adId: string; width?: number; height?: number }>;
  renderAd: (doc: Document | undefined, adId: string) => void;
};

const client: AdsClient = {
  async init() {
    await loadPrebidOnce();
    await waitForPbjs();
    const pbjs = window.pbjs as NonNullable<typeof window.pbjs>;
    pbjs.que = pbjs.que || [];
    pbjs.que.push(() => {
      if (import.meta.env.DEV) console.log("[ads] prebid ready");
    });
  },

  async renderBanner({
    code,
    sizes,
    bids,
    timeout = 1000,
    iframe,
  }: RenderBannerInput) {
    await this.init();
    const pbjs = window.pbjs as PbjsBidsApi;
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
            const [w, h] =
              width && height ? [width, height] : (sizes[0] ?? [300, 250]);

            iframe.width = String(w);
            iframe.height = String(h);

            try {
              const doc = iframe.contentWindow?.document;
              pbjs.renderAd(doc, adId);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error("[ads] render error:", e);
            }
          } else {
            // eslint-disable-next-line no-console
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
