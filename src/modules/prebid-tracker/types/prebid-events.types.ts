////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export interface AnalyticsEventPayload {
//     event_id: string;
//     event_type: string;
//     timestamp: string;
//     auction_id: string;
//     ad_unit_code: string;
//     bidder: string;
//     bid_cpm: number;
//     is_winner: boolean;
//     creative_id?: string;
//     page_url?: string;
//     user_agent?: string;
//     ad_unit_size?: string;
//     bid_currency?: string;
//
//     // Додаємо нові поля
//     device_type?: string;
//     browser?: string;
//     os?: string;
//     geo_country?: string;
//     geo_city?: string;
// }
// // Беремо тип івенту з декларативного файлу
// export type { PrebidBidWonEvent } from './prebid.d';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface AnalyticsEventPayload {
    event_id: string;
    event_type: string;
    timestamp: string;
    auction_id: string;
    ad_unit_code: string;
    bidder: string;
    bid_cpm: number;
    is_winner: boolean;
    creative_id?: string;
    page_url?: string;
    user_agent?: string;
    ad_unit_size?: string;
    bid_currency?: string;
    device_type?: string;
    browser?: string;
    os?: string;
    geo_country?: string;
    geo_city?: string;
    render_time?: number;
    min_cpm?: number;
    max_cpm?: number;
}

export type {
    PrebidBidWonEvent,
    PrebidAuctionInitEvent,
    PrebidBidRequestedEvent,
    PrebidBidResponseEvent,
    PrebidAuctionEndEvent
} from './prebid.d';