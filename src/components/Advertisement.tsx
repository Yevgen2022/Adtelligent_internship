import ads from "virtual:ads";
import { useEffect, useMemo, useRef } from "react";
import type { AdsClient, Bid, Size } from "../ads/ads.types";

export type AdvertisementProps = {
  code: string;
  sizes: Size[] | Size[][];
  bids: Bid[];
  timeout?: number;
  className?: string;
  debug?: boolean;
  boosts?: Record<string, number>; //level money +
};

function isMatrix(s: Size[] | Size[][]): s is Size[][] {
  const first = (s as Size[] | Size[][])[0];
  return Array.isArray(first) && Array.isArray((first as unknown[])[0]);
}

export default function Advertisement({
  code,
  sizes,
  bids,
  timeout = 1000,
  className,
  boosts, //+
}: AdvertisementProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const client = ads as AdsClient;

  const flatSizes = useMemo<Size[]>(() => {
    return isMatrix(sizes) ? sizes.flat() : sizes;
  }, [sizes]);

  const [initialW, initialH] = useMemo<Size>(() => {
    return flatSizes[0] ?? [300, 250];
  }, [flatSizes]);

  useEffect(() => {
    if (!iframeRef.current) return;
    void client.renderBanner({
      code,
      sizes: flatSizes,
      bids,
      timeout,
      iframe: iframeRef.current,
      // boosts, //+
    });
    // }, [client, code, flatSizes, bids, timeout]);
  }, [client, code, flatSizes, bids, timeout, boosts]); //+
  return (
    <iframe
      id={code}
      ref={iframeRef}
      title={`ad-${code}`}
      className={className}
      width={initialW}
      height={initialH}
      style={{ border: 0, display: "block" }}
    />
  );
}
