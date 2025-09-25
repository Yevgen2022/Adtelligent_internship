// import { useEffect, useRef } from "react";
//
//
// type Size = [number, number];
// type Bid = { bidder: string; params: Record<string, any> };
//
// export type AdvertisementProps = {
//   code: string;
//   sizes: Size[] | Size[][];
//   bids: Bid[];
//   timeout?: number;
//   className?: string;
//   debug?: boolean;
// };
//
// const addedUnits = new Set<string>();
//
// export default function Advertisement({
//   code,
//   sizes,
//   bids,
//   timeout = 1000,
//   className,
//   debug = false,
// }: AdvertisementProps) {
//   const frameRef = useRef<HTMLIFrameElement | null>(null);
//
//   // Normalization  Size[] | Size[][] -> Size[]
//   const flatSizes: Size[] = Array.isArray((sizes as any)?.[0]?.[0])
//     ? (sizes as Size[][]).flat()
//     : (sizes as Size[]);
//
//   const firstSize: Size =
//     flatSizes.length > 0 ? flatSizes[0] : ([300, 250] as Size);
//   const [initialW, initialH] = firstSize; // <- чисті number для width/height
//
//   useEffect(() => {
//     const step = 100;
//     const maxWait = 5000;
//     let waited = 0;
//
//     const int = setInterval(() => {
//       const w = window as any;
//       if (!w.pbjs) {
//         waited += step;
//         if (waited >= maxWait) {
//           clearInterval(int);
//           console.warn("[prebid] pbjs not found within timeout");
//         }
//         return;
//       }
//
//       clearInterval(int);
//
//       const pbjs = w.pbjs;
//       pbjs.que = pbjs.que || [];
//
//       pbjs.que.push(() => {
//         if (debug) pbjs.setConfig({ debug: true });
//
//         const adUnit = {
//           code,
//           mediaTypes: { banner: { sizes: flatSizes } },
//           bids,
//         };
//
//         if (!addedUnits.has(code)) {
//           pbjs.addAdUnits([adUnit]);
//           addedUnits.add(code);
//         }
//
//         const render = () => {
//           const best = pbjs.getHighestCpmBids(code) || [];
//           if (best.length > 0 && frameRef.current) {
//             const { adId, width, height } = best[0];
//
//             // If the bider did not give width/height — we take firstSize
//
//             const [fw, fh] = width && height ? [width, height] : firstSize;
//             frameRef.current.width = String(fw); // DOM property expects string
//             frameRef.current.height = String(fh); // ago String(...)
//             try {
//               const doc = frameRef.current.contentWindow!.document;
//               pbjs.renderAd(doc, adId);
//             } catch (e) {
//               console.error("[prebid] render error:", e);
//             }
//           } else {
//             console.log(`[prebid] no bids for ${code}`);
//           }
//         };
//
//         pbjs.requestBids({
//           adUnitCodes: [code],
//           bidsBackHandler: render,
//           timeout,
//         });
//       });
//     }, step);
//
//     return () => clearInterval(int);
//   }, [code, timeout, debug, JSON.stringify(flatSizes), JSON.stringify(bids)]);
//
//   return (
//     <iframe
//       id={code}
//       ref={frameRef}
//       title={`ad-${code}`}
//       className={className}
//       width={initialW}
//       height={initialH}
//     />
//   );
// }



import { useEffect, useRef } from "react";
import ads from "virtual:ads";

type Size = [number, number];
type Bid = { bidder: string; params: Record<string, any> };

export type AdvertisementProps = {
    code: string;
    sizes: Size[] | Size[][];
    bids: Bid[];
    timeout?: number;
    className?: string;
    debug?: boolean;
};

export default function Advertisement({
                                          code,
                                          sizes,
                                          bids,
                                          timeout = 1000,
                                          className,
                                      }: AdvertisementProps) {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    // Нормалізація розмірів у плоский масив
    const flatSizes: Size[] = Array.isArray((sizes as any)?.[0]?.[0])
        ? (sizes as Size[][]).flat()
        : (sizes as Size[]);

    const firstSize: Size = flatSizes[0] || [300, 250];
    const [initialW, initialH] = firstSize;

    useEffect(() => {
        if (!iframeRef.current) return;
        ads.renderBanner({
            code,
            sizes: flatSizes,
            bids,
            timeout,
            iframe: iframeRef.current,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, JSON.stringify(flatSizes), JSON.stringify(bids), timeout]);

    return (
        <iframe
            id={code}
            ref={iframeRef}
            title={`ad-${code}`}
            className={className}
            width={initialW}
            height={initialH}
        />
    );
}
