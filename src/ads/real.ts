import type { AdsClient, RenderBannerInput } from "./ads.types";

let prebidLoaded = false;

const PREBID_SRC =
  (import.meta.env.VITE_PREBID_SRC as string | undefined) ??
  "/prebid10.10.0.js";

function loadPrebidOnce(src = PREBID_SRC): Promise<void> {
  if (prebidLoaded) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.type = "text/javascript"; // classic
    s.src = src;
    s.async = true;
    s.onload = () => {
      prebidLoaded = true;
      if (import.meta.env.DEV) console.log("[ads] Prebid loaded:", src);
      resolve();
    };
    s.onerror = () => reject(new Error(`Failed to load Prebid: ${src}`));
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

type PbjsApi = NonNullable<typeof window.pbjs> & {
  requestBids: (opts: {
    adUnits?: unknown[];
    adUnitCodes?: string[];
    bidsBackHandler: () => void;
    timeout: number;
  }) => void;
  getHighestCpmBids: (
    code: string,
  ) => Array<{ adId: string; width?: number; height?: number }>;
  renderAd: (doc: Document | undefined, adId: string) => void;
  setConfig?: (cfg: unknown) => void;
};

const client: AdsClient = {
  async init() {
    await loadPrebidOnce();
    await waitForPbjs();
    const pbjs = window.pbjs as PbjsApi;
    pbjs.que = pbjs.que || [];
    pbjs.que.push(() => {
      if (import.meta.env.DEV) console.log("[ads] pbjs ready");

      // pbjs.setConfig?.({ bidderTimeout: 1200 });
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
    const pbjs = window.pbjs as PbjsApi;
    pbjs.que = pbjs.que || [];

    return new Promise<void>((resolve) => {
      pbjs.que.push(() => {
        const adUnit = { code, mediaTypes: { banner: { sizes } }, bids };

        const render = () => {
          const winners = pbjs.getHighestCpmBids(code) || [];
          if (import.meta.env.DEV) {
            // useful log for debugging
            console.log("[ads] winners:", winners);
          }
          if (winners.length > 0 && iframe) {
            const { adId, width, height } = winners[0];
            const [w, h] =
              width && height ? [width, height] : (sizes[0] ?? [300, 250]);

            iframe.width = String(w);
            iframe.height = String(h);

            try {
              const doc = iframe.contentWindow?.document;
              pbjs.renderAd(doc, adId);
              if (import.meta.env.DEV) {
                console.log("[ads] rendered ad:", { code, adId, w, h });
              }
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
          adUnits: [adUnit],
          bidsBackHandler: render,
          timeout,
        });
      });
    });
  },
};

export default client;
