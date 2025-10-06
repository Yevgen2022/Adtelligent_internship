import type {
  PrebidAuctionEndEvent,
  PrebidAuctionInitEvent,
  PrebidBidRequestedEvent,
  PrebidBidResponseEvent,
  PrebidBidWonEvent,
  PrebidEventMap,
} from "./types/prebid";
import { sendEvent } from "./utils/beacon-sender";
import {
  mapAdModuleLoadEvent,
  mapAuctionEndEvent,
  mapAuctionInitEvent,
  mapBidRequestedEvent,
  mapBidResponseEvent,
  mapBidWonEvent,
  mapPageLoadEvent,
} from "./utils/event-mapper";

type SimplePbjs = {
  onEvent<K extends keyof PrebidEventMap>(
    eventName: K,
    handler: (event: PrebidEventMap[K]) => void,
  ): void;
  offEvent<K extends keyof PrebidEventMap>(
    eventName: K,
    handler: (event: PrebidEventMap[K]) => void,
  ): void;
};

export class PrebidTracker {
  private apiEndpoint: string;
  private isInitialized = false;

  private bidWonHandler: ((e: PrebidBidWonEvent) => void) | null = null;
  private auctionInitHandler: ((e: PrebidAuctionInitEvent) => void) | null =
    null;
  private bidRequestedHandler: ((e: PrebidBidRequestedEvent) => void) | null =
    null;
  private bidResponseHandler: ((e: PrebidBidResponseEvent) => void) | null =
    null;
  private auctionEndHandler: ((e: PrebidAuctionEndEvent) => void) | null = null;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  public init(): void {
    if (this.isInitialized) {
      console.warn("[PrebidTracker] Already initialized");
      return;
    }

    // Without any: narrow the window to an object with optional pbjs
    const pbjs = (window as unknown as { pbjs?: SimplePbjs }).pbjs;
    if (!pbjs) {
      console.error("[PrebidTracker] Prebid.js (pbjs) not found");
      return;
    }

    // page/ad module load
    void sendEvent(this.apiEndpoint, mapPageLoadEvent());
    void sendEvent(this.apiEndpoint, mapAdModuleLoadEvent());

    // Creating typed handlers
    this.bidWonHandler = (e) => this.handleBidWon(e);
    this.auctionInitHandler = (e) => this.handleAuctionInit(e);
    this.bidRequestedHandler = (e) => this.handleBidRequested(e);
    this.bidResponseHandler = (e) => this.handleBidResponse(e);
    this.auctionEndHandler = (e) => this.handleAuctionEnd(e);

    // Subscriptions
    pbjs.onEvent("bidWon", this.bidWonHandler);
    pbjs.onEvent("auctionInit", this.auctionInitHandler);
    pbjs.onEvent("bidRequested", this.bidRequestedHandler);
    pbjs.onEvent("bidResponse", this.bidResponseHandler);
    pbjs.onEvent("auctionEnd", this.auctionEndHandler);

    this.isInitialized = true;
    console.log("[PrebidTracker] Initialized with all events");
  }

  private handleBidWon(event: PrebidBidWonEvent): void {
    console.log("[PrebidTracker] bidWon:", event);
    void sendEvent(this.apiEndpoint, mapBidWonEvent(event));
  }

  private handleAuctionInit(event: PrebidAuctionInitEvent): void {
    console.log("[PrebidTracker] auctionInit:", event);
    void sendEvent(this.apiEndpoint, mapAuctionInitEvent(event));
  }

  private handleBidRequested(event: PrebidBidRequestedEvent): void {
    console.log("[PrebidTracker] bidRequested:", event);
    const payloads = mapBidRequestedEvent(event);
    payloads.forEach((p) => {
      void sendEvent(this.apiEndpoint, p);
    });
  }

  private handleBidResponse(event: PrebidBidResponseEvent): void {
    console.log("[PrebidTracker] bidResponse:", event);
    void sendEvent(this.apiEndpoint, mapBidResponseEvent(event));
  }

  private handleAuctionEnd(event: PrebidAuctionEndEvent): void {
    console.log("[PrebidTracker] auctionEnd:", event);
    void sendEvent(this.apiEndpoint, mapAuctionEndEvent(event));
  }

  public destroy(): void {
    if (!this.isInitialized) return;

    const pbjs = (window as unknown as { pbjs?: SimplePbjs }).pbjs;
    if (pbjs) {
      if (this.bidWonHandler) pbjs.offEvent("bidWon", this.bidWonHandler);
      if (this.auctionInitHandler)
        pbjs.offEvent("auctionInit", this.auctionInitHandler);
      if (this.bidRequestedHandler)
        pbjs.offEvent("bidRequested", this.bidRequestedHandler);
      if (this.bidResponseHandler)
        pbjs.offEvent("bidResponse", this.bidResponseHandler);
      if (this.auctionEndHandler)
        pbjs.offEvent("auctionEnd", this.auctionEndHandler);
    }

    this.bidWonHandler = null;
    this.auctionInitHandler = null;
    this.bidRequestedHandler = null;
    this.bidResponseHandler = null;
    this.auctionEndHandler = null;
    this.isInitialized = false;
    console.log("[PrebidTracker] Destroyed");
  }
}
