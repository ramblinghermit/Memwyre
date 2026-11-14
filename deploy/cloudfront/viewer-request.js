// CloudFront Function: docs-redirect
// Runtime: cloudfront-js-2.0
// Type: Viewer Request
//
// Handles:
// 1. www.memwyre.tech -> memwyre.tech 301 redirect
// 2. /docs -> docs.memwyre.tech 301 redirect
// 3. Legacy / compliance alias URL 301 redirects (terms-of-service, support, contact-us, team, privacy)
// 4. App subdomain routing (app.memwyre.tech -> /app.html)
// 5. App route 301 redirects on marketing domain (memwyre.tech/signup -> app.memwyre.tech/signup)
// 6. Trailing slash normalization
// 7. Markdown content negotiation (index.md)
// 8. Directory index rewrite (index.html)

function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var uri = request.uri;

    var host = headers.host ? headers.host.value : "";

    // 1. WWW Redirect
    if (host === "www.memwyre.tech") {
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                "location": { "value": "https://memwyre.tech" + uri }
            }
        };
    }

    // 2. Docs Redirect
    if (uri === "/docs" || uri.indexOf("/docs/") === 0) {
        var newPath = uri.substring(5);
        if (newPath === "") newPath = "/";
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                "location": { "value": "https://docs.memwyre.tech" + newPath }
            }
        };
    }

    // 3. Legacy & Compliance Alias Redirects (Prevents 404 on crawlers / AWS compliance bots)
    var cleanUri = (uri.length > 1 && uri.charAt(uri.length - 1) === '/') ? uri.slice(0, -1) : uri;
    var legacyRedirects = {
        "/blog/what-is-ai-memory": "/research/what-is-ai-memory",
        "/what-is-ai-memory": "/research/what-is-ai-memory",
        "/blog/ai-memory-benchmark-locomo": "/ai-memory-benchmark-locomo",
        "/research/ai-memory-benchmark-locomo": "/ai-memory-benchmark-locomo",
        "/research/locomo-benchmark": "/ai-memory-benchmark-locomo",
        "/blog/vector-database-vs-agent-memory": "/research/vector-database-vs-agent-memory",
        "/terms-of-service": "/terms",
        "/terms-of-use": "/terms",
        "/contact-us": "/contact",
        "/support": "/contact",
        "/team": "/about",
        "/privacy": "/privacy-policy"
    };
    if (legacyRedirects[cleanUri]) {
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                "location": { "value": "https://memwyre.tech" + legacyRedirects[cleanUri] }
            }
        };
    }

    var appRoutes = [
        "/login", "/signup", "/verify-email", "/forgot-password", "/reset-password",
        "/dashboard", "/inbox", "/projects", "/settings", "/integrations",
        "/editor", "/prompts", "/map", "/chat", "/billing", "/admin",
        "/retrieval-visualizer", "/redeem", "/slides", "/export-slide", "/demo",
        "/broadcast"
    ];

    var marketingRoutes = [
        "/use-cases", "/pricing", "/contact", "/connectors", "/mcp",
        "/plugins", "/extension", "/blog", "/research",
        "/ai-memory-benchmark-locomo", "/memwyre-vs-mem0", "/memwyre-vs-supermemory",
        "/memwyre-vs-zep", "/chatgpt-memory", "/claude-memory", "/cursor-memory",
        "/mcp-memory", "/openclaw-memory", "/grok-bot-memory", "/opencode-memory",
        "/privacy-policy", "/terms", "/about"
    ];

    function isAppRoute(path) {
        for (var i = 0; i < appRoutes.length; i++) {
            var r = appRoutes[i];
            if (path === r || path.indexOf(r + '/') === 0) return true;
        }
        return false;
    }

    function isMarketingRoute(path) {
        for (var j = 0; j < marketingRoutes.length; j++) {
            var m = marketingRoutes[j];
            if (path === m || path.indexOf(m + '/') === 0) return true;
        }
        return false;
    }

    var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
    var hasExtension = lastSegment.indexOf('.') !== -1;

    // 4. App Subdomain Logic (app.memwyre.tech)
    if (host === "app.memwyre.tech") {
        if (isMarketingRoute(cleanUri)) {
            return {
                statusCode: 301,
                statusDescription: "Moved Permanently",
                headers: {
                    "location": { "value": "https://memwyre.tech" + uri }
                }
            };
        }
        if (hasExtension) {
            return request;
        }
        request.uri = "/app.html";
        return request;
    }

    // 5. Marketing Domain Logic (memwyre.tech)
    if (isAppRoute(cleanUri)) {
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                "location": { "value": "https://app.memwyre.tech" + cleanUri }
            }
        };
    }

    // Trailing slash normalization for marketing pages
    if (uri.length > 1 && uri.charAt(uri.length - 1) === '/') {
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                "location": { "value": "https://memwyre.tech" + uri.slice(0, -1) }
            }
        };
    }

    // Markdown content negotiation
    if (uri === '/' || uri === '/index.html') {
        var accept = headers['accept'] ? headers['accept'].value : '';
        if (accept.indexOf('text/markdown') >= 0) {
            request.uri = '/index.md';
            return request;
        }
    }

    // Directory index rewrite
    if (!hasExtension) {
        if (request.uri.charAt(request.uri.length - 1) === '/') {
            request.uri += 'index.html';
        } else {
            request.uri += '/index.html';
        }
    }

    return request;
}
