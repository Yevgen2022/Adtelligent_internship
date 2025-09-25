import type { AdsClient, RenderBannerInput } from "./ads.types";

const client: AdsClient = {
    async init() {
        if (import.meta.env.DEV) console.log("[ads] init stub (disabled)");
    },
    async renderBanner(_input: RenderBannerInput) {
        if (import.meta.env.DEV) console.log("[ads] renderBanner stub (disabled)");
    },
};

export default client;
