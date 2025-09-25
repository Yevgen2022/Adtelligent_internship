import type { AdsClient, RenderBannerInput } from "./ads.types";

const client: AdsClient = {
    async init() {
        // тут пізніше: завантаження / ініціалізація Prebid
        // (наприклад, loadPrebidOnce())
        // зараз — лише лог
        if (import.meta.env.DEV) console.log("[ads] init real");
    },

    async renderBanner(input: RenderBannerInput) {
        // тут пізніше: addAdUnits + requestBids + renderAd в input.iframe
        if (import.meta.env.DEV) console.log("[ads] renderBanner real", input.code);
    },
};

export default client;


//Тепер у коді ти зможеш імпортувати один і той самий модуль:

//    import ads from "virtual:ads";
// await ads.init();
// await ads.renderBanner({ ... });

//Який саме файл підвантажиться — вирішує VITE_ADS_ENABLED.

