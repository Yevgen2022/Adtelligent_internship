// // src/modules/prebid-tracker/PrebidTracker.ts
// import type { PrebidBidWonEvent } from './types/prebid';
// import { mapBidWonEvent } from './utils/event-mapper.ts';
// import { sendEvent } from './utils/beacon-sender.ts';
//
// // Локальний простий тип pbjs (щоб не залежати від .d.ts)
// type SimplePbjs = {
//     onEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
//     offEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
// } | undefined;
//
// export class PrebidTracker {
//     private apiEndpoint: string;
//     private isInitialized: boolean = false;
//     private bidWonHandler: ((e: PrebidBidWonEvent) => void) | null = null;
//
//     constructor(apiEndpoint: string) {
//         // не використовуємо parameter properties через erasableSyntaxOnly
//         this.apiEndpoint = apiEndpoint;
//     }
//
//     public init(): void {
//         if (this.isInitialized) {
//             console.warn('[PrebidTracker] Already initialized');
//             return;
//         }
//
//         const pbjs = (window as any).pbjs as SimplePbjs;
//         if (!pbjs) {
//             console.error('[PrebidTracker] Prebid.js (pbjs) not found');
//             return;
//         }
//
//         // створюємо handler
//         this.bidWonHandler = (event: PrebidBidWonEvent) => {
//             this.handleBidWon(event);
//         };
//
//         // одна підписка
//         pbjs.onEvent('bidWon', this.bidWonHandler);
//
//         this.isInitialized = true;
//         console.log('[PrebidTracker] Initialized successfully');
//     }
//
//     private handleBidWon(event: PrebidBidWonEvent): void {
//         console.log('[PrebidTracker] bidWon event received:', event);
//         const payload = mapBidWonEvent(event);
//         void sendEvent(this.apiEndpoint, payload);
//     }
//
//     public destroy(): void {
//         if (!this.isInitialized) return;
//
//         const pbjs = (window as any).pbjs as SimplePbjs;
//         if (this.bidWonHandler && pbjs) {
//             pbjs.offEvent('bidWon', this.bidWonHandler);
//         }
//
//         this.bidWonHandler = null;
//         this.isInitialized = false;
//         console.log('[PrebidTracker] Destroyed');
//     }
// }




////////////////////////////////////////////////////////////////////////////////
import type {
    PrebidBidWonEvent,
    PrebidAuctionInitEvent,
    PrebidBidRequestedEvent,
    PrebidBidResponseEvent,
    PrebidAuctionEndEvent
} from './types/prebid';


import {
    mapBidWonEvent,
    mapAuctionInitEvent,
    mapBidRequestedEvent,
    mapBidResponseEvent,
    mapAuctionEndEvent,
    mapPageLoadEvent,
    mapAdModuleLoadEvent
} from './utils/event-mapper';
import { sendEvent } from './utils/beacon-sender';


type SimplePbjs = {
    onEvent: (eventName: string, handler: (event: any) => void) => void;
    offEvent: (eventName: string, handler: (event: any) => void) => void;
} | undefined;

export class PrebidTracker {
    private apiEndpoint: string;
    private isInitialized: boolean = false;

    // Handlers для всіх подій
    private bidWonHandler: ((e: any) => void) | null = null;
    private auctionInitHandler: ((e: any) => void) | null = null;
    private bidRequestedHandler: ((e: any) => void) | null = null;
    private bidResponseHandler: ((e: any) => void) | null = null;
    private auctionEndHandler: ((e: any) => void) | null = null;

    constructor(apiEndpoint: string) {
        this.apiEndpoint = apiEndpoint;
    }

    public init(): void {
        if (this.isInitialized) {
            console.warn('[PrebidTracker] Already initialized');
            return;
        }

        const pbjs = (window as any).pbjs as SimplePbjs;
        if (!pbjs) {
            console.error('[PrebidTracker] Prebid.js (pbjs) not found');
            return;
        }

        // Відправляємо page load та ad module load
        void sendEvent(this.apiEndpoint, mapPageLoadEvent());
        void sendEvent(this.apiEndpoint, mapAdModuleLoadEvent());

        // Створюємо handlers
        this.bidWonHandler = (e) => this.handleBidWon(e);
        this.auctionInitHandler = (e) => this.handleAuctionInit(e);
        this.bidRequestedHandler = (e) => this.handleBidRequested(e);
        this.bidResponseHandler = (e) => this.handleBidResponse(e);
        this.auctionEndHandler = (e) => this.handleAuctionEnd(e);

        // Підписуємось на всі події
        pbjs.onEvent('bidWon', this.bidWonHandler);
        pbjs.onEvent('auctionInit', this.auctionInitHandler);
        pbjs.onEvent('bidRequested', this.bidRequestedHandler);
        pbjs.onEvent('bidResponse', this.bidResponseHandler);
        pbjs.onEvent('auctionEnd', this.auctionEndHandler);

        this.isInitialized = true;
        console.log('[PrebidTracker] Initialized with all events');
    }

    private handleBidWon(event: PrebidBidWonEvent): void {
        console.log('[PrebidTracker] bidWon:', event);
        void sendEvent(this.apiEndpoint, mapBidWonEvent(event));
    }

    private handleAuctionInit(event: PrebidAuctionInitEvent): void {
        console.log('[PrebidTracker] auctionInit:', event);
        void sendEvent(this.apiEndpoint, mapAuctionInitEvent(event));
    }

    private handleBidRequested(event: PrebidBidRequestedEvent): void {
        console.log('[PrebidTracker] bidRequested:', event);
        const payloads = mapBidRequestedEvent(event);
        payloads.forEach(p => void sendEvent(this.apiEndpoint, p));
    }

    private handleBidResponse(event: PrebidBidResponseEvent): void {
        console.log('[PrebidTracker] bidResponse:', event);
        void sendEvent(this.apiEndpoint, mapBidResponseEvent(event));
    }

    private handleAuctionEnd(event: PrebidAuctionEndEvent): void {
        console.log('[PrebidTracker] auctionEnd:', event);
        void sendEvent(this.apiEndpoint, mapAuctionEndEvent(event));
    }

    public destroy(): void {
        if (!this.isInitialized) return;

        const pbjs = (window as any).pbjs as SimplePbjs;
        if (pbjs) {
            if (this.bidWonHandler) pbjs.offEvent('bidWon', this.bidWonHandler);
            if (this.auctionInitHandler) pbjs.offEvent('auctionInit', this.auctionInitHandler);
            if (this.bidRequestedHandler) pbjs.offEvent('bidRequested', this.bidRequestedHandler);
            if (this.bidResponseHandler) pbjs.offEvent('bidResponse', this.bidResponseHandler);
            if (this.auctionEndHandler) pbjs.offEvent('auctionEnd', this.auctionEndHandler);
        }

        this.bidWonHandler = null;
        this.auctionInitHandler = null;
        this.bidRequestedHandler = null;
        this.bidResponseHandler = null;
        this.auctionEndHandler = null;
        this.isInitialized = false;
        console.log('[PrebidTracker] Destroyed');
    }
}