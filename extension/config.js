// config.js

// Production-only config for store submission builds.
const ENV = 'prod';

const CONFIG = {
    prod: {
        API_BASE_URL: 'https://api.memwyre.tech/api/v1',
        WEB_APP_URL: 'https://app.memwyre.tech'
    }
};

// Helper to get active API Base URL (custom link or production default)
async function getApiBaseUrl() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        try {
            const data = await chrome.storage.local.get('customApiBaseUrl');
            if (data && data.customApiBaseUrl && data.customApiBaseUrl.trim()) {
                return data.customApiBaseUrl.trim().replace(/\/+$/, '');
            }
        } catch (e) {
            console.warn("Failed to read customApiBaseUrl from storage:", e);
        }
    }
    return CONFIG[ENV].API_BASE_URL;
}

// Export for Background Service Worker / Workers
if (typeof self !== 'undefined') {
    self.ENV = ENV;
    self.CONFIG = CONFIG;
    self.getApiBaseUrl = getApiBaseUrl;
}

// Export for Content Scripts / DOM Scripts
if (typeof window !== 'undefined') {
    window.ENV = ENV;
    window.CONFIG = CONFIG;
    window.getApiBaseUrl = getApiBaseUrl;
}

