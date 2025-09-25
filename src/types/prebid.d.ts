interface PbjsGlobal {
  que: Array<() => void>;
  renderAd: (doc: Document | undefined, adId: string) => void;

  addAdUnits: (units: unknown[]) => void;
  requestBids: (opts: {
    adUnitCodes: string[];
    bidsBackHandler: () => void;
    timeout: number;
  }) => void;
  getHighestCpmBids: (
    code: string,
  ) => Array<{ adId: string; width?: number; height?: number }>;
}

declare global {
  interface Window {
    pbjs?: PbjsGlobal;
  }
}
export {};
