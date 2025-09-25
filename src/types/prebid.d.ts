interface PbjsGlobal {
  que: Array<() => void>;
  renderAd: (doc: Document | undefined, adId: string) => void;
  setConfig?: (cfg: unknown) => void;
  addAdUnits?: (units: unknown) => void;
  requestBids?: (opts: unknown) => void;
}

declare global {
  interface Window {
    pbjs?: PbjsGlobal;
  }
}

export {};
