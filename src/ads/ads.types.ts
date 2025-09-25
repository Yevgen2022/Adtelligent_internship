export type Size = [number, number];
export type Bid = { bidder: string; params: Record<string, any> };

export type RenderBannerInput = {
  code: string;
  sizes: Size[];
  bids: Bid[];
  timeout?: number;
  iframe: HTMLIFrameElement;
};

export interface AdsClient {
  init(): Promise<void>;
  renderBanner(input: RenderBannerInput): Promise<void>;
}
