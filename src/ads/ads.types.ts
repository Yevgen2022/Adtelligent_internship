export type Size = [number, number];

export type BidParams = Record<string, unknown>;

export type Bid = {
  bidder: string;
  params: BidParams;
};

export type RenderBannerInput = {
  code: string;
  sizes: Size[];
  bids: Bid[];
  timeout: number;
  iframe: HTMLIFrameElement;
  boosts?: Record<string, number>; // { bidder: multiplier }//+
};

export interface AdsClient {
  init: () => Promise<void>;
  // renderBanner: (args: RenderBannerInput) => Promise<void>;
  renderBanner: (args: RenderBannerInput) => Promise<void>; //+
}
