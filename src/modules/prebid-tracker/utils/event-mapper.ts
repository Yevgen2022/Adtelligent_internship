import type { PrebidBidWonEvent, AnalyticsEventPayload } from '../types/prebid-events.types';

function generateEventId(): string {
    // дуже просто, без зовнішніх залежностей
    const rand = Math.random().toString(36).slice(2, 11);
    return Date.now() + '_' + rand;
}

function getAdUnitSize(event: PrebidBidWonEvent): string | undefined {
    if (typeof event.size === 'string') return event.size;
    if (Array.isArray(event.size) && event.size.length === 2) {
        return event.size[0] + 'x' + event.size[1];
    }
    if (event.width && event.height) return event.width + 'x' + event.height;
    return undefined;
}

export function mapBidWonEvent(event: PrebidBidWonEvent): AnalyticsEventPayload {
    return {
        event_id: generateEventId(),
        event_type: 'bid_won',
        timestamp: new Date().toISOString(),
        auction_id: event.auctionId,
        ad_unit_code: event.adUnitCode,
        bidder: event.bidder,
        bid_cpm: event.cpm,
        is_winner: true,
        creative_id: event.creativeId,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        ad_unit_size: getAdUnitSize(event),
        bid_currency: event.currency || 'USD',
    };
}
