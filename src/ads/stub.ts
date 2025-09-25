import type { AdsClient, RenderBannerInput } from "./ads.types";

const client: AdsClient = {
    async init() {
        // no-op
    },
    async renderBanner(_input: RenderBannerInput) {
        // no-op (нічого не рендеримо)
    },
};
