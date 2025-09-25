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
