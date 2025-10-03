// import type { PrebidBidWonEvent, AnalyticsEventPayload } from '../types/prebid-events.types';
//
// function generateEventId(): string {
//     // дуже просто, без зовнішніх залежностей
//     const rand = Math.random().toString(36).slice(2, 11);
//     return Date.now() + '_' + rand;
// }
//
// function getAdUnitSize(event: PrebidBidWonEvent): string | undefined {
//     if (typeof event.size === 'string') return event.size;
//     if (Array.isArray(event.size) && event.size.length === 2) {
//         return event.size[0] + 'x' + event.size[1];
//     }
//     if (event.width && event.height) return event.width + 'x' + event.height;
//     return undefined;
// }
//
// function getDeviceType(): string {
//     if (typeof navigator === 'undefined') return 'unknown';
//     const ua = navigator.userAgent.toLowerCase();
//     if (/mobile/i.test(ua)) return 'mobile';
//     if (/tablet|ipad/i.test(ua)) return 'tablet';
//     return 'desktop';
// }
//
// function getBrowser(): string {
//     if (typeof navigator === 'undefined') return 'unknown';
//     const ua = navigator.userAgent;
//     if (ua.includes('Edg')) return 'Edge';
//     if (ua.includes('Chrome')) return 'Chrome';
//     if (ua.includes('Firefox')) return 'Firefox';
//     if (ua.includes('Safari')) return 'Safari';
//     return 'Unknown';
// }
//
// function getOS(): string {
//     if (typeof navigator === 'undefined') return 'unknown';
//     const ua = navigator.userAgent;
//     if (ua.includes('Windows')) return 'Windows';
//     if (ua.includes('Mac OS')) return 'MacOS';
//     if (ua.includes('Linux')) return 'Linux';
//     if (ua.includes('Android')) return 'Android';
//     if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
//     return 'Unknown';
// }
//
//
// export function mapBidWonEvent(event: PrebidBidWonEvent): AnalyticsEventPayload {
//     return {
//         event_id: generateEventId(),
//         event_type: 'bid_won',
//         timestamp: new Date().toISOString(),
//         auction_id: event.auctionId,
//         ad_unit_code: event.adUnitCode,
//         bidder: event.bidder,
//         bid_cpm: event.cpm,
//         is_winner: true,
//         creative_id: event.creativeId,
//         page_url: typeof window !== 'undefined' ? window.location.href : undefined,
//         user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
//         ad_unit_size: getAdUnitSize(event),
//         bid_currency: event.currency || 'USD',
//
//
//         device_type: getDeviceType(),  // ← додаємо
//         browser: getBrowser(),          // ← додаємо
//         os: getOS(),                    // ← додаємо
//     };
// }



//////////////////////////////////////////////////////////////////////////
import type {
    PrebidBidWonEvent,
    PrebidAuctionInitEvent,
    PrebidBidRequestedEvent,
    PrebidBidResponseEvent,
    PrebidAuctionEndEvent,
    AnalyticsEventPayload
} from '../types/prebid-events.types';

function generateEventId(): string {
    const rand = Math.random().toString(36).slice(2, 11);
    return Date.now() + '_' + rand;
}

function getAdUnitSize(event: PrebidBidWonEvent | PrebidBidResponseEvent): string | undefined {
    if (typeof event.size === 'string') return event.size;
    if (Array.isArray(event.size) && event.size.length === 2) {
        return event.size[0] + 'x' + event.size[1];
    }
    if (event.width && event.height) return event.width + 'x' + event.height;
    return undefined;
}

function getDeviceType(): string {
    if (typeof navigator === 'undefined') return 'unknown';
    const ua = navigator.userAgent.toLowerCase();
    if (/mobile/i.test(ua)) return 'mobile';
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    return 'desktop';
}

function getBrowser(): string {
    if (typeof navigator === 'undefined') return 'unknown';
    const ua = navigator.userAgent;
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    return 'Unknown';
}

function getOS(): string {
    if (typeof navigator === 'undefined') return 'unknown';
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac OS')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown';
}

// bidWon - переможець
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
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        render_time: event.timeToRespond || 0,
    };
}

// auctionInit - старт аукціону
export function mapAuctionInitEvent(event: PrebidAuctionInitEvent): AnalyticsEventPayload {
    return {
        event_id: generateEventId(),
        event_type: 'auction_init',
        timestamp: new Date().toISOString(),
        auction_id: event.auctionId,
        ad_unit_code: event.adUnits?.[0]?.code || 'unknown',
        bidder: 'system',
        bid_cpm: 0,
        is_winner: false,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
    };
}

// bidRequested - запит до бідера
export function mapBidRequestedEvent(event: PrebidBidRequestedEvent): AnalyticsEventPayload[] {
    return event.bids.map(bid => ({
        event_id: generateEventId(),
        event_type: 'bid_requested',
        timestamp: new Date().toISOString(),
        auction_id: event.auctionId,
        ad_unit_code: bid.adUnitCode,
        bidder: event.bidderCode,
        bid_cpm: 0,
        is_winner: false,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        ad_unit_size: bid.sizes?.[0] ? bid.sizes[0][0] + 'x' + bid.sizes[0][1] : undefined,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
    }));
}

// bidResponse - відповідь від бідера
export function mapBidResponseEvent(event: PrebidBidResponseEvent): AnalyticsEventPayload {
    return {
        event_id: generateEventId(),
        event_type: 'bid_response',
        timestamp: new Date().toISOString(),
        auction_id: event.auctionId,
        ad_unit_code: event.adUnitCode,
        bidder: event.bidder,
        bid_cpm: event.cpm,
        is_winner: false,
        creative_id: event.creativeId,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        ad_unit_size: getAdUnitSize(event),
        bid_currency: event.currency || 'USD',
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        render_time: event.timeToRespond || 0,
    };
}

// auctionEnd - завершення аукціону
export function mapAuctionEndEvent(event: PrebidAuctionEndEvent): AnalyticsEventPayload {

// Витягуємо min/max CPM з bidsReceived якщо є
    let minCpm = 0;
    let maxCpm = 0;

    if (event.bidsReceived && event.bidsReceived.length > 0) {
        const cpms = event.bidsReceived.map((bid: any) => bid.cpm || 0);
        minCpm = Math.min(...cpms);
        maxCpm = Math.max(...cpms);
    }

    return {
        event_id: generateEventId(),
        event_type: 'auction_end',
        timestamp: new Date().toISOString(),
        auction_id: event.auctionId,
        ad_unit_code: event.adUnits?.[0] || 'unknown',
        bidder: 'system',
        bid_cpm: maxCpm,
        is_winner: false,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        min_cpm: minCpm,
        max_cpm: maxCpm,
    };
}

// Page Load
export function mapPageLoadEvent(): AnalyticsEventPayload {
    return {
        event_id: generateEventId(),
        event_type: 'page_load',
        timestamp: new Date().toISOString(),
        auction_id: 'page_load',
        ad_unit_code: 'system',
        bidder: 'system',
        bid_cpm: 0,
        is_winner: false,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
    };
}

// Ad Module Load
export function mapAdModuleLoadEvent(): AnalyticsEventPayload {
    return {
        event_id: generateEventId(),
        event_type: 'ad_module_load',
        timestamp: new Date().toISOString(),
        auction_id: 'ad_module_load',
        ad_unit_code: 'system',
        bidder: 'system',
        bid_cpm: 0,
        is_winner: false,
        page_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
    };
}
