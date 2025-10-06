export interface PrebidBidWonEvent {
  auctionId: string;
  adUnitCode: string;
  bidder: string;
  cpm: number;
  currency?: string;
  creativeId?: string;
  size?: string | [number, number];
  width?: number;
  height?: number;
  timeToRespond?: number;
}

export interface PrebidAuctionInitEvent {
  auctionId: string;
  timestamp: number;
  timeout: number;
  adUnits: Array<{
    code: string;
    sizes: number[][];
  }>;
}

export interface PrebidBidRequestedEvent {
  auctionId: string;
  bidderCode: string;
  bids: Array<{
    bidder: string;
    adUnitCode: string;
    sizes: number[][];
  }>;
}

export interface PrebidBidResponseEvent {
  auctionId: string;
  adUnitCode: string;
  bidder: string;
  cpm: number;
  currency?: string;
  creativeId?: string;
  size?: string | [number, number];
  width?: number;
  height?: number;
  timeToRespond?: number;
}

export interface PrebidAuctionEndEvent {
  auctionId: string;
  timestamp: number;
  adUnits: string[];
  bidsReceived?: Array<{
    bidder: string;
    cpm: number;
    adUnitCode: string;
  }>;
}

export type PrebidEventMap = {
  bidWon: PrebidBidWonEvent;
  auctionInit: PrebidAuctionInitEvent;
  bidRequested: PrebidBidRequestedEvent;
  bidResponse: PrebidBidResponseEvent;
  auctionEnd: PrebidAuctionEndEvent;
};

export interface PbjsGlobal {
  onEvent: (eventName: string, handler: (event: unknown) => void) => void;
  offEvent: (eventName: string, handler: (event: unknown) => void) => void;
}

declare global {
  interface Window {
    pbjs?: PbjsGlobal;
    prebidTracker?: unknown;
  }
}
