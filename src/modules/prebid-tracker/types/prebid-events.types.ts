// Пейлоад для бекенду (простий)

export interface AnalyticsEventPayload {
    event_id: string;
    event_type: 'bid_won';
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
}

// Беремо тип івенту з декларативного файлу
export type { PrebidBidWonEvent } from './prebid.d';
