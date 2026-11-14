import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { getSeoForPath, PRERENDER_ROUTES } from '../src/seo.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(currentDir, '..');
const distDir = path.join(frontendDir, 'dist');
const clientTemplatePath = path.join(distDir, 'index.html');
const serverDir = path.join(distDir, 'server');

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function replaceMetaTag(html, attrName, attrValue, content) {
    const pattern = new RegExp(
        `<meta\\s+[^>]*${attrName}="${escapeRegExp(attrValue)}"[^>]*>`,
        'i'
    );
    const replacement = `<meta ${attrName}="${attrValue}" content="${escapeHtml(content)}" />`;
    return html.replace(pattern, replacement);
}

function replaceCanonical(html, canonicalUrl) {
    return html.replace(
        /<link\s+rel="canonical"[^>]*>/i,
        `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );
}

function replaceJsonLd(html, jsonLd) {
    const escapedJson = jsonLd.replace(/<\/script>/gi, '<\\/script>');
    return html.replace(
        /<script id="seo-ld-json" type="application\/ld\+json">[\s\S]*?<\/script>/i,
        `<script id="seo-ld-json" type="application/ld+json">\n${escapedJson}\n  </script>`
    );
}

function withSeoAndContent(template, seo, appHtml, injectedScript = '') {
    let html = template;

    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
    html = replaceMetaTag(html, 'name', 'description', seo.description);
    html = replaceMetaTag(html, 'name', 'robots', seo.robots);
    html = replaceCanonical(html, seo.canonical);

    html = replaceMetaTag(html, 'property', 'og:title', seo.ogTitle);
    html = replaceMetaTag(html, 'property', 'og:description', seo.ogDescription);
    html = replaceMetaTag(html, 'property', 'og:type', seo.ogType);
    html = replaceMetaTag(html, 'property', 'og:url', seo.ogUrl);
    html = replaceMetaTag(html, 'property', 'og:image', seo.ogImage);
    html = replaceMetaTag(html, 'property', 'og:image:width', seo.ogImageWidth);
    html = replaceMetaTag(html, 'property', 'og:image:height', seo.ogImageHeight);

    html = replaceMetaTag(html, 'name', 'twitter:card', seo.twitterCard);
    html = replaceMetaTag(html, 'name', 'twitter:title', seo.twitterTitle);
    html = replaceMetaTag(html, 'name', 'twitter:description', seo.twitterDescription);
    html = replaceMetaTag(html, 'name', 'twitter:image', seo.twitterImage);
    html = replaceJsonLd(html, seo.jsonLd);

    if (injectedScript) {
        html = html.replace('<!--app-html-->', `${injectedScript}<!--app-html-->`);
    }

    return html.replace('<!--app-html-->', appHtml);
}

async function resolveServerBundlePath() {
    const candidates = [
        path.join(serverDir, 'entry-server.js'),
        path.join(serverDir, 'entry-server.mjs'),
    ];

    for (const candidate of candidates) {
        try {
            await access(candidate);
            return candidate;
        } catch {
            // Keep searching.
        }
    }

    const files = await readdir(serverDir);
    const fallback = files.find((file) => file.endsWith('.js') || file.endsWith('.mjs'));
    if (!fallback) {
        throw new Error('No SSR server bundle found in dist/server.');
    }

    return path.join(serverDir, fallback);
}

async function prerender() {
    const template = await readFile(clientTemplatePath, 'utf-8');
    const serverBundlePath = await resolveServerBundlePath();
    const serverEntryUrl = `${pathToFileURL(serverBundlePath).href}?v=${Date.now()}`;
    const { render } = await import(serverEntryUrl);

    // Generate clean SPA shell for application domain and authenticated routes (app.html)
    // Injects an early-redirect script for app.memwyre.tech root to instantly route to /dashboard or /login without flash
    const appRedirectScript = `<script>
(function(){
  if(window.location.hostname==='app.memwyre.tech'&&(window.location.pathname==='/'||window.location.pathname==='')){
    try{
      var token=localStorage.getItem('token');
      if(token){
        window.location.replace('/dashboard');
      }else{
        window.location.replace('/login');
      }
    }catch(e){}
  }
})();
</script>`;
    const appHtmlClean = template
        .replace('<!--app-html-->', '')
        .replace('</head>', `${appRedirectScript}</head>`);
    await writeFile(path.join(distDir, 'app.html'), appHtmlClean, 'utf-8');

    // Remove any legacy prerendered app directories to avoid stale unauthorized HTML on reload
    for (const legacyAppDir of ['dashboard', 'login', 'signup', 'forgot-password']) {
        await rm(path.join(distDir, legacyAppDir), { recursive: true, force: true });
    }

    for (const route of PRERENDER_ROUTES) {
        const { appHtml } = await render(route);
        const seo = getSeoForPath(route);

        let injectedScript = '';
        if (route.startsWith('/blog/') && route !== '/blog') {
            const slug = route.substring('/blog/'.length);
            const mdPath = path.join(frontendDir, 'src', 'assets', 'blog', `${slug}.md`);
            try {
                const content = await readFile(mdPath, 'utf-8');
                const escapedContent = JSON.stringify({ slug, content });
                injectedScript = `<script id="pre-rendered-data">window.__BLOG_POST_DATA__ = ${escapedContent};</script>`;
            } catch (err) {
                console.error(`Failed to read markdown file for route ${route}:`, err);
            }
        }

        let routeHtml = withSeoAndContent(template, seo, appHtml, injectedScript);

        // For the root route, inject styles + script on app.memwyre.tech to hide
        // prerendered landing page content and instantly route to /dashboard or /login
        if (route === '/') {
            const antiFlashStyle = `<style id="anti-flash">html[data-app-domain] #app{visibility:hidden}</style><script>
(function(){
  if(window.location.hostname==='app.memwyre.tech'){
    document.documentElement.setAttribute('data-app-domain','');
    if(window.location.pathname==='/'||window.location.pathname===''){
      try{
        var token=localStorage.getItem('token');
        if(token){
          window.location.replace('/dashboard');
        }else{
          window.location.replace('/login');
        }
      }catch(e){}
    }
  }
})();
</script>`;
            routeHtml = routeHtml.replace('</head>', `${antiFlashStyle}</head>`);
        }

        const outputPath = route === '/'
            ? path.join(distDir, 'index.html')
            : path.join(distDir, route.replace(/^\//, ''), 'index.html');

        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, routeHtml, 'utf-8');
    }

    // Generate static redirect pages to prevent 404 on historical/external links
    const redirects = [
        { from: 'privacy', to: '/privacy-policy', title: 'Redirecting to Privacy Policy...' },
        { from: 'terms-of-service', to: '/terms', title: 'Redirecting to Terms of Service...' },
        { from: 'terms-of-use', to: '/terms', title: 'Redirecting to Terms of Service...' },
        { from: 'contact-us', to: '/contact', title: 'Redirecting to Contact Us...' },
        { from: 'support', to: '/contact', title: 'Redirecting to Support & Contact...' },
        { from: 'team', to: '/about', title: 'Redirecting to About & Team...' },
        { from: 'memories', to: 'https://app.memwyre.tech/memories', title: 'Redirecting to Memwyre Dashboard...' },
    ];
    for (const { from, to, title } of redirects) {
        const redirectDir = path.join(distDir, from);
        await mkdir(redirectDir, { recursive: true });
        const targetCanonical = to.startsWith('http') ? to : `https://memwyre.tech${to}`;
        const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0; url=${to}">
  <link rel="canonical" href="${targetCanonical}">
  <title>${title}</title>
  <script>window.location.replace("${to}");</script>
</head>
<body>
  <p>Redirecting to <a href="${to}">${to}</a>...</p>
</body>
</html>`;
        await writeFile(path.join(redirectDir, 'index.html'), redirectHtml, 'utf-8');
    }

    // Auto-generate updated sitemap.xml in public/ and dist/
    function getPriority(route) {
        if (route === '/') return '1.0';
        if (route === '/blog' || route === '/research') return '0.9';
        if (['/opencode-memory', '/openclaw-memory'].includes(route)) return '0.9';
        if (['/plugins', '/extension', '/connectors', '/mcp', '/use-cases', '/pricing'].includes(route)) return '0.8';
        if (route.startsWith('/research/')) return '0.8';
        if (['/cursor-memory', '/claude-memory', '/chatgpt-memory', '/grok-bot-memory', '/mcp-memory'].includes(route)) return '0.7';
        if (['/memwyre-vs-mem0', '/memwyre-vs-supermemory', '/memwyre-vs-zep', '/ai-memory-benchmark-locomo'].includes(route)) return '0.7';
        if (route.startsWith('/blog/')) return '0.7';
        if (route === '/contact') return '0.6';
        if (route === '/privacy-policy' || route === '/terms') return '0.3';
        return '0.7';
    }

    function getChangefreq(route) {
        if (route === '/') return 'daily';
        if (['/blog', '/research', '/plugins', '/extension', '/connectors', '/mcp', '/use-cases', '/pricing'].includes(route)) return 'weekly';
        if (['/opencode-memory', '/openclaw-memory', '/research/context-engineering', '/research/vector-database-vs-agent-memory'].includes(route)) return 'weekly';
        if (route.startsWith('/blog/')) return 'monthly';
        if (route === '/privacy-policy' || route === '/terms') return 'yearly';
        return 'monthly';
    }

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    PRERENDER_ROUTES.forEach((route) => {
        const loc = `https://memwyre.tech${route === '/' ? '/' : route}`;
        sitemapXml += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${getChangefreq(route)}</changefreq>\n    <priority>${getPriority(route)}</priority>\n  </url>\n`;
    });
    sitemapXml += `</urlset>\n`;

    await writeFile(path.join(frontendDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
    await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

    await rm(serverDir, { recursive: true, force: true });
}

await prerender();
