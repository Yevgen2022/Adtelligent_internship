import type { PrebidBidWonEvent } from './types/prebid';
import { mapBidWonEvent } from './utils/event-mapper';
import { sendEvent } from './utils/beacon-sender';

// Головний клас для трекінгу Prebid подій
export class PrebidTracker {
    private apiEndpoint: string;
    private isInitialized: boolean = false;

    // Зберігаємо handler для можливості відписки
    private bidWonHandler: ((event: PrebidBidWonEvent) => void) | null = null;

    constructor(apiEndpoint: string) {
        this.apiEndpoint = apiEndpoint;
    }

    // Ініціалізуємо трекер - підписуємось на події Prebid
    public init(): void {
        if (this.isInitialized) {
            console.warn('[PrebidTracker] Already initialized');
            return;
        }

        // Перевіряємо чи доступний Prebid.js
        if (typeof window.pbjs === 'undefined') {
            console.error('[PrebidTracker] Prebid.js (pbjs) not found');
            return;
        }

        // Створюємо handler для bidWon події
        this.bidWonHandler = (event: PrebidBidWonEvent) => {
            this.handleBidWon(event);
        };

        // Підписуємось на подію
        window.pbjs.onEvent('bidWon', this.bidWonHandler);

        this.isInitialized = true;
        console.log('[PrebidTracker] Initialized successfully');
    }

    // Обробник події bidWon
    private handleBidWon(event: PrebidBidWonEvent): void {
        console.log('[PrebidTracker] bidWon event received:', event);

        // Конвертуємо Prebid подію в наш формат
        const payload = mapBidWonEvent(event);

        // Відправляємо на backend
        sendEvent(this.apiEndpoint, payload);
    }

    // Очищаємо ресурси - відписуємось від подій
    public destroy(): void {
        if (!this.isInitialized) {
            return;
        }

        if (this.bidWonHandler && typeof window.pbjs !== 'undefined') {
            window.pbjs.offEvent('bidWon', this.bidWonHandler);
        }

        this.bidWonHandler = null;
        this.isInitialized = false;
        console.log('[PrebidTracker] Destroyed');
    }
}

