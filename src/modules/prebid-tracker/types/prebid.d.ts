// Опис типів Prebid і глобального вікна

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

export interface PbjsGlobal {
    onEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
    offEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
}

declare global {
    interface Window {
        pbjs?: PbjsGlobal;
        prebidTracker?: unknown;
    }
}

export {};
