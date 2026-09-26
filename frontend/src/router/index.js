import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { getSeoForPath, normalizePath, PRERENDER_ROUTES, PUBLIC_ROUTE_SEO } from '../seo';

const PRERENDER_ROUTE_SET = new Set(PRERENDER_ROUTES);

function upsertMetaTag(attrName, attrValue, content) {
    if (typeof document === 'undefined') return;

    let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

function upsertCanonicalLink(href) {
    if (typeof document === 'undefined') return;

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
    }
    link.setAttribute('href', href);
}

function upsertJsonLd(content) {
    if (typeof document === 'undefined') return;

    let scriptTag = document.querySelector('script#seo-ld-json');
    if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-ld-json';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = content;
}

const APP_ROUTE_TITLES = {
    'overview': 'Memories',
    'dashboard': 'Memories',
    'memories': 'Memories',
    'inbox': 'Inbox',
    'add-context': 'Add Context',
    'add-content': 'Add Context',
    'spaces': 'Spaces',
    'projects': 'Spaces',
    'settings': 'Settings',
    'billing': 'Billing',
    'integrations': 'Integrations',
    'integration-detail': 'Integrations',
    'editor': 'Editor',
    'prompts': 'Prompt Generator',
    'map': 'Memory Map',
    'chat': 'Chat',
    'chat-session': 'Chat',
    'retrieval-visualizer': 'Retrieval Visualizer',
    'admin-insights': 'Admin Insights',
    'admin-bypass': 'Admin Bypass',
    'login': 'Log in',
    'register': 'Sign up',
    'verify-email': 'Verify Email',
    'forgot-password': 'Forgot Password',
    'reset-password': 'Reset Password',
    'redeem': 'Redeem License',
    'slides': 'Pitch Deck',
    'export-slide': 'Export Slide',
};

const APP_PATH_TITLES = {
    '/overview': 'Memories',
    '/dashboard': 'Memories',
    '/memories': 'Memories',
    '/inbox': 'Inbox',
    '/add-context': 'Add Context',
    '/add-content': 'Add Context',
    '/spaces': 'Spaces',
    '/projects': 'Spaces',
    '/settings': 'Settings',
    '/billing': 'Billing',
    '/integrations': 'Integrations',
    '/editor': 'Editor',
    '/prompts': 'Prompt Generator',
    '/map': 'Memory Map',
    '/chat': 'Chat',
    '/retrieval-visualizer': 'Retrieval Visualizer',
    '/admin': 'Admin Insights',
    '/admin/bypass': 'Admin Bypass',
    '/login': 'Log in',
    '/signup': 'Sign up',
    '/verify-email': 'Verify Email',
    '/forgot-password': 'Forgot Password',
    '/reset-password': 'Reset Password',
    '/redeem': 'Redeem License',
    '/slides': 'Pitch Deck',
};

function resolvePageTitle(to, defaultTitle, routeSeoTitle) {
    if (to.meta?.title) {
        return to.meta.title.includes('Memwyre') ? to.meta.title : `${to.meta.title} — Memwyre`;
    }
    if (routeSeoTitle) {
        return routeSeoTitle;
    }
    if (to.name && APP_ROUTE_TITLES[to.name]) {
        return `${APP_ROUTE_TITLES[to.name]} — Memwyre`;
    }
    const matchedPath = Object.keys(APP_PATH_TITLES).find(p => to.path === p || to.path.startsWith(`${p}/`));
    if (matchedPath) {
        return `${APP_PATH_TITLES[matchedPath]} — Memwyre`;
    }
    return defaultTitle;
}

function syncSeoHead(to) {
    if (typeof document === 'undefined') return;

    const normalizedPath = normalizePath(to.path);
    const defaultSeo = getSeoForPath(normalizedPath);
    const routeSeo = to.meta?.seo || {};
    const isIndexableRoute = PRERENDER_ROUTE_SET.has(normalizedPath);
    const title = resolvePageTitle(to, defaultSeo.title, routeSeo.title);

    const seo = {
        ...defaultSeo,
        ...routeSeo,
        title,
        canonical: defaultSeo.canonical,
        ogUrl: defaultSeo.canonical,
        robots: isIndexableRoute ? (routeSeo.robots || 'index, follow') : 'noindex, nofollow',
    };

    document.title = seo.title;
    upsertMetaTag('name', 'description', seo.description);
    upsertMetaTag('name', 'robots', seo.robots);
    upsertCanonicalLink(seo.canonical);

    upsertMetaTag('property', 'og:title', seo.ogTitle || seo.title);
    upsertMetaTag('property', 'og:description', seo.ogDescription || seo.description);
    upsertMetaTag('property', 'og:type', seo.ogType);
    upsertMetaTag('property', 'og:url', seo.ogUrl);
    upsertMetaTag('property', 'og:image', seo.ogImage);
    upsertMetaTag('property', 'og:image:width', seo.ogImageWidth);
    upsertMetaTag('property', 'og:image:height', seo.ogImageHeight);
    upsertMetaTag('property', 'og:site_name', seo.ogSiteName || 'Memwyre');

    upsertMetaTag('name', 'twitter:card', seo.twitterCard);
    upsertMetaTag('name', 'twitter:title', seo.twitterTitle || seo.title);
    upsertMetaTag('name', 'twitter:description', seo.twitterDescription || seo.description);
    upsertMetaTag('name', 'twitter:image', seo.twitterImage);

    upsertJsonLd(seo.jsonLd);
}

export function createAppRouter({ ssr = false } = {}) {
    const history = ssr
        ? createMemoryHistory(import.meta.env.BASE_URL)
        : createWebHistory(import.meta.env.BASE_URL);

    const router = createRouter({
        history,
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    el: to.hash,
                    behavior: 'smooth',
                };
            }
            if (savedPosition) {
                return savedPosition;
            } else {
                return { top: 0 };
            }
        },
        routes: [
            {
                path: '/',
                component: () => import('../views/PublicLayout.vue'),
                children: [
                    {
                        path: '',
                        name: 'landing',
                        component: () => import('../views/LandingPage.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/'] }
                    },
                    {
                        path: 'use-cases',
                        name: 'use-cases',
                        component: () => import('../views/UseCaseView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/use-cases'] }
                    },
                    {
                        path: 'privacy-policy',
                        name: 'privacy-policy',
                        component: () => import('../views/PrivacyPolicyView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/privacy-policy'] }
                    },
                    {
                        path: 'terms',
                        name: 'terms',
                        component: () => import('../views/TermsView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/terms'] }
                    },
                    {
                        path: 'pricing',
                        name: 'pricing',
                        component: () => import('../views/PricingView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/pricing'] }
                    },
                    {
                        path: 'contact',
                        name: 'contact',
                        component: () => import('../views/ContactView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/contact'] }
                    },
                    {
                        path: 'connectors',
                        name: 'connectors',
                        component: () => import('../views/products/ConnectorsView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/connectors'] }
                    },
                    {
                        path: 'mcp',
                        name: 'mcp',
                        component: () => import('../views/products/McpView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/mcp'] }
                    },
                    {
                        path: 'plugins',
                        name: 'plugins',
                        component: () => import('../views/products/PluginsView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/plugins'] }
                    },
                    {
                        path: 'extension',
                        name: 'extension',
                        component: () => import('../views/products/ExtensionView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/extension'] }
                    },
                    {
                        path: 'blog',
                        name: 'blog',
                        component: () => import('../views/BlogListView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/blog'] }
                    },
                    {
                        path: 'docs',
                        beforeEnter(to, from, next) {
                            window.location.href = 'https://docs.memwyre.tech';
                        }
                    },
                    {
                        path: 'blog/what-is-ai-memory',
                        redirect: '/research/what-is-ai-memory'
                    },
                    {
                        path: 'blog/ai-memory-benchmark-locomo',
                        redirect: '/ai-memory-benchmark-locomo'
                    },
                    {
                        path: 'blog/:slug',
                        name: 'blog-post',
                        component: () => import('../views/BlogPostView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/blog/:slug'] }
                    },
                    {
                        path: 'research/ai-memory-benchmark-locomo',
                        redirect: '/ai-memory-benchmark-locomo'
                    },
                    {
                        path: 'research/locomo-benchmark',
                        redirect: '/ai-memory-benchmark-locomo'
                    },
                    {
                        path: 'blog/vector-database-vs-agent-memory',
                        redirect: '/research/vector-database-vs-agent-memory'
                    },
                    {
                        path: 'research/vector-database-vs-agent-memory',
                        name: 'vector-db-vs-agent-memory',
                        component: () => import('../views/VectorDbVsAgentMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/research/vector-database-vs-agent-memory'] }
                    },
                    {
                        path: 'research/context-engineering',
                        name: 'context-engineering',
                        component: () => import('../views/ContextEngineeringView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/research/context-engineering'] }
                    },
                    {
                        path: 'research/:slug',
                        name: 'research-post',
                        component: () => import('../views/BlogPostView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/research/:slug'] }
                    },
                    {
                        path: 'what-is-ai-memory',
                        redirect: '/research/what-is-ai-memory'
                    },
                    {
                        path: 'ai-memory-benchmark-locomo',
                        name: 'locomo-benchmark',
                        component: () => import('../views/LocomoBenchmarkView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/ai-memory-benchmark-locomo'] }
                    },
                    {
                        path: 'research',
                        name: 'research-hub',
                        component: () => import('../views/ResearchHubView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/research'] }
                    },
                    {
                        path: 'memwyre-vs-mem0',
                        name: 'memwyre-vs-mem0',
                        component: () => import('../views/comparisons/MemwyreVsMem0.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/memwyre-vs-mem0'] }
                    },
                    {
                        path: 'memwyre-vs-supermemory',
                        name: 'memwyre-vs-supermemory',
                        component: () => import('../views/comparisons/MemwyreVsSupermemory.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/memwyre-vs-supermemory'] }
                    },
                    {
                        path: 'memwyre-vs-zep',
                        name: 'memwyre-vs-zep',
                        component: () => import('../views/comparisons/MemwyreVsZep.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/memwyre-vs-zep'] }
                    },
                    {
                        path: 'chatgpt-memory',
                        name: 'chatgpt-memory',
                        component: () => import('../views/integrations/ChatgptMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/chatgpt-memory'] }
                    },
                    {
                        path: 'claude-memory',
                        name: 'claude-memory',
                        component: () => import('../views/integrations/ClaudeMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/claude-memory'] }
                    },
                    {
                        path: 'cursor-memory',
                        name: 'cursor-memory',
                        component: () => import('../views/integrations/CursorMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/cursor-memory'] }
                    },
                    {
                        path: 'mcp-memory',
                        name: 'mcp-memory',
                        component: () => import('../views/integrations/McpMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/mcp-memory'] }
                    },
                    {
                        path: 'openclaw-memory',
                        name: 'openclaw-memory',
                        component: () => import('../views/integrations/OpenClawMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/openclaw-memory'] }
                    },
                    {
                        path: 'grok-bot-memory',
                        name: 'grok-bot-memory',
                        component: () => import('../views/integrations/GrokMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/grok-bot-memory'] }
                    },
                    {
                        path: 'opencode-memory',
                        name: 'opencode-memory',
                        component: () => import('../views/integrations/OpenCodeMemoryView.vue'),
                        meta: { requiresAuth: false, seo: PUBLIC_ROUTE_SEO['/opencode-memory'] }
                    }
                ]
            },

            // ── Authenticated App Shell (sidebar + top bar) ──────────────
            {
                path: '/',
                component: () => import('../views/AppLayout.vue'),
                meta: { requiresAuth: true },
                children: [
                    {
                        path: 'overview',
                        redirect: '/memories',
                    },
                    {
                        path: 'memories',
                        name: 'memories',
                        component: () => import('../views/DashboardView.vue'),
                        meta: { title: 'Memories' },
                    },
                    {
                        path: 'dashboard',
                        redirect: '/memories',
                    },
                    {
                        path: 'inbox',
                        name: 'inbox',
                        component: () => import('../views/InboxView.vue'),
                        meta: { title: 'Inbox' },
                    },
                    {
                        path: 'add-context',
                        name: 'add-context',
                        component: () => import('../views/AddContentView.vue'),
                        meta: { title: 'Add Context' },
                    },
                    {
                        path: 'add-content',
                        redirect: '/add-context',
                    },
                    {
                        path: 'add',
                        redirect: '/add-context',
                    },
                    {
                        path: 'spaces',
                        name: 'spaces',
                        component: () => import('../views/ProjectsView.vue'),
                        meta: { title: 'Spaces' },
                    },
                    {
                        path: 'projects',
                        redirect: '/spaces',
                    },
                    {
                        path: 'settings',
                        name: 'settings',
                        component: () => import('../views/SettingsView.vue'),
                        meta: { title: 'Settings' },
                    },
                    {
                        path: 'billing',
                        name: 'billing',
                        component: () => import('../views/BillingView.vue'),
                        meta: { title: 'Billing' },
                    },
                    {
                        path: 'integrations',
                        name: 'integrations',
                        component: () => import('../views/IntegrationsView.vue'),
                        meta: { title: 'Integrations' },
                    },
                    {
                        path: 'integrations/:id',
                        name: 'integration-detail',
                        component: () => import('../views/IntegrationsView.vue'),
                        meta: { title: 'Integrations' },
                    },
                    {
                        path: 'editor',
                        redirect: '/editor/new',
                    },
                    {
                        path: 'editor/:id',
                        name: 'editor',
                        component: () => import('../views/EditorView.vue'),
                        meta: { title: 'Editor' },
                    },
                    {
                        path: 'prompts',
                        name: 'prompts',
                        component: () => import('../views/PromptGeneratorView.vue'),
                        meta: { title: 'Prompt Generator' },
                    },
                    {
                        path: 'map',
                        name: 'map',
                        component: () => import('../views/MemoryMapView.vue'),
                        meta: { title: 'Memory Map' },
                    },
                    {
                        path: 'chat',
                        name: 'chat',
                        component: () => import('../views/ChatView.vue'),
                        meta: { title: 'Chat' },
                    },
                    {
                        path: 'chat/:id',
                        name: 'chat-session',
                        component: () => import('../views/ChatView.vue'),
                        meta: { title: 'Chat' },
                    },
                    {
                        path: 'admin',
                        name: 'admin-insights',
                        component: () => import('../views/AdminInsightsView.vue'),
                        meta: { title: 'Admin Insights' },
                    },
                    {
                        path: 'admin/bypass',
                        name: 'admin-bypass',
                        component: () => import('../views/AdminBypassView.vue'),
                        meta: { title: 'Admin Bypass' },
                    },
                    {
                        path: 'retrieval-visualizer',
                        name: 'retrieval-visualizer',
                        component: () => import('../views/RetrievalVisualizerView.vue'),
                        meta: { title: 'Retrieval Visualizer' },
                    },
                ]
            },

            // ── Non-sidebar routes ──────────────────────────────
            {
                path: '/login',
                name: 'login',
                component: () => import('../views/LoginView.vue'),
                meta: { title: 'Log in' }
            },
            {
                path: '/signup',
                name: 'register',
                component: () => import('../views/RegisterView.vue'),
                meta: { title: 'Sign up' }
            },
            {
                path: '/verify-email',
                name: 'verify-email',
                component: () => import('../views/VerifyEmailView.vue'),
                meta: { title: 'Verify Email' }
            },
            {
                path: '/forgot-password',
                name: 'forgot-password',
                component: () => import('../views/ForgotPasswordView.vue'),
                meta: { title: 'Forgot Password' }
            },
            {
                path: '/reset-password',
                name: 'reset-password',
                component: () => import('../views/ResetPasswordView.vue'),
                meta: { title: 'Reset Password' }
            },
            {
                path: '/redeem',
                name: 'redeem',
                component: () => import('../views/RedeemView.vue'),
                meta: { title: 'Redeem License' }
            },
            {
                path: '/slides',
                name: 'slides',
                component: () => import('../views/SlideGalleryView.vue')
            },
            {
                path: '/export-slide/:id',
                name: 'export-slide',
                component: () => import('../views/ExportSlideView.vue')
            },
            // ── Demo recording routes (OBS) ──────────────────────────────
            {
                path: '/demo/omnipresent',
                name: 'demo-omnipresent',
                component: () => import('../views/demo/DemoOmnipresent.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/demo/timeline',
                name: 'demo-timeline',
                component: () => import('../views/demo/DemoTimeline.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/demo/chat',
                name: 'demo-chat',
                component: () => import('../views/demo/DemoChat.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/demo/inbox',
                name: 'demo-inbox',
                component: () => import('../views/demo/DemoInbox.vue'),
                meta: { requiresAuth: false }
            },
            {
                path: '/broadcast',
                redirect: '/memories'
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'not-found',
                beforeEnter(to, from, next) {
                    if (typeof window !== 'undefined') {
                        const hostname = window.location.hostname;
                        if (hostname === 'app.memwyre.tech') {
                            const authStore = useAuthStore();
                            next(authStore.isAuthenticated ? '/memories' : '/login');
                            return;
                        }
                    }
                    next('/');
                }
            }
        ]
    });

    router.beforeEach((to, from, next) => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            const APP_HOST = 'app.memwyre.tech';
            const MAIN_HOST = 'memwyre.tech';

            const APP_ROUTES = [
                '/overview', '/dashboard', '/memories', '/inbox', '/add-context', '/add-content', '/add',
                '/login', '/signup', '/verify-email', '/forgot-password', '/reset-password',
                '/spaces', '/projects', '/settings', '/integrations',
                '/editor', '/prompts', '/map', '/chat', '/billing', '/admin',
                '/retrieval-visualizer', '/redeem', '/slides', '/export-slide', '/demo',
                '/broadcast'
            ];

            const MARKETING_ROUTES = [
                '/use-cases', '/pricing', '/contact', '/connectors', '/mcp',
                '/plugins', '/extension', '/blog', '/research', '/what-is-ai-memory',
                '/ai-memory-benchmark-locomo', '/memwyre-vs-mem0', '/memwyre-vs-supermemory',
                '/memwyre-vs-zep', '/chatgpt-memory', '/claude-memory', '/cursor-memory',
                '/mcp-memory', '/openclaw-memory', '/grok-bot-memory', '/opencode-memory',
                '/privacy-policy', '/terms'
            ];

            const isAppPath = APP_ROUTES.some(path => 
                to.path === path || 
                to.path === path + '/' || 
                to.path.startsWith(path + '/')
            );

            const isMarketingPath = MARKETING_ROUTES.some(path => 
                to.path === path || 
                to.path === path + '/' || 
                to.path.startsWith(path + '/')
            );

            // 1. On main domain (memwyre.tech / www.memwyre.tech), ONLY redirect app routes
            if (hostname === MAIN_HOST || hostname === `www.${MAIN_HOST}`) {
                if (isAppPath) {
                    window.location.href = `https://${APP_HOST}${to.fullPath}`;
                    return;
                }
            }

            // 2. On app domain (app.memwyre.tech)
            if (hostname === APP_HOST) {
                if (to.path === '/' || to.path === '') {
                    const authStore = useAuthStore();
                    if (authStore.isAuthenticated) {
                        next('/memories');
                    } else {
                        next('/login');
                    }
                    return;
                }
                if (isMarketingPath) {
                    window.location.href = `https://${MAIN_HOST}${to.fullPath}`;
                    return;
                }
            }
        }

        const authStore = useAuthStore();

        // If accessing a protected route and not authenticated, redirect to login
        if (to.meta.requiresAuth && !authStore.isAuthenticated) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
        // If accessing restricted routes and not verified, redirect to settings
        else if (
            to.meta.requiresAuth &&
            authStore.isAuthenticated &&
            authStore.user &&
            authStore.user.is_verified === false &&
            !['settings', 'dashboard', 'memories'].includes(to.name)
        ) {
            next('/settings');
        }
        // If they are verified but haven't completed onboarding, trap them securely in memories
        else if (
            to.meta.requiresAuth &&
            authStore.isAuthenticated &&
            authStore.user &&
            authStore.user.is_verified &&
            authStore.hasCompletedOnboarding === false &&
            !['dashboard', 'memories', 'editor', 'admin-insights', 'admin-bypass', 'retrieval-visualizer'].includes(to.name)
        ) {
            next('/memories');
        }
        else {
            next();
        }
    });

    router.afterEach((to) => {
        syncSeoHead(to);
    });

    return router;
}

const noopRouter = {
    push: () => Promise.resolve(),
    currentRoute: { value: { fullPath: '/' } },
};

const router = typeof window !== 'undefined' ? createAppRouter() : noopRouter;

export default router;
