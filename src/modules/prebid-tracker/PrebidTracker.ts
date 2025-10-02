// src/modules/prebid-tracker/PrebidTracker.ts
import type { PrebidBidWonEvent } from './types/prebid';
import { mapBidWonEvent } from './utils/event-mapper.ts';
import { sendEvent } from './utils/beacon-sender.ts';

// Локальний простий тип pbjs (щоб не залежати від .d.ts)
type SimplePbjs = {
    onEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
    offEvent: (eventName: 'bidWon', handler: (event: PrebidBidWonEvent) => void) => void;
} | undefined;

export class PrebidTracker {
    private apiEndpoint: string;
    private isInitialized: boolean = false;
    private bidWonHandler: ((e: PrebidBidWonEvent) => void) | null = null;

    constructor(apiEndpoint: string) {
        // не використовуємо parameter properties через erasableSyntaxOnly
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

        // створюємо handler
        this.bidWonHandler = (event: PrebidBidWonEvent) => {
            this.handleBidWon(event);
        };

        // одна підписка
        pbjs.onEvent('bidWon', this.bidWonHandler);

        this.isInitialized = true;
        console.log('[PrebidTracker] Initialized successfully');
    }

    private handleBidWon(event: PrebidBidWonEvent): void {
        console.log('[PrebidTracker] bidWon event received:', event);
        const payload = mapBidWonEvent(event);
        void sendEvent(this.apiEndpoint, payload);
    }

    public destroy(): void {
        if (!this.isInitialized) return;

        const pbjs = (window as any).pbjs as SimplePbjs;
        if (this.bidWonHandler && pbjs) {
            pbjs.offEvent('bidWon', this.bidWonHandler);
        }

        this.bidWonHandler = null;
        this.isInitialized = false;
        console.log('[PrebidTracker] Destroyed');
    }
}
