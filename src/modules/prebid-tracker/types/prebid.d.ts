// // Опис типів Prebid і глобального вікна
//
// export interface PrebidBidWonEvent {
//     auctionId: string;
//     adUnitCode: string;
//     bidder: string;
//     cpm: number;
//     currency?: string;
//     creativeId?: string;
//     size?: string | [number, number];
//     width?: number;
//     height?: number;
//     timeToRespond?: number;
// }
//
// export interface PbjsGlobal {
//     onEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
//     offEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
// }
//
// declare global {
//     interface Window {
//         pbjs?: PbjsGlobal;
//         prebidTracker?: unknown;
//     }
// }
//
// export {};



//////////////////////////////////////////////////
// Типи для всіх Prebid подій
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
    bidsReceived?: Array<{  // ← додаємо це поле
        bidder: string;
        cpm: number;
        adUnitCode: string;
    }>;
}

export interface PbjsGlobal {
    onEvent: (eventName: string, handler: (event: any) => void) => void;
    offEvent: (eventName: string, handler: (event: any) => void) => void;
}

declare global {
    interface Window {
        pbjs?: PbjsGlobal;
        prebidTracker?: unknown;
    }
}

export {};
