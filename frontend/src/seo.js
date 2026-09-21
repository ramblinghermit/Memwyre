export const SITE_URL = 'https://memwyre.tech';
export const SITE_NAME = 'Memwyre';
export const DEFAULT_SOCIAL_IMAGE_PATH = '/sequence/ezgif-frame-015.png';
export const PRERENDER_ROUTES = [
  '/',
  '/use-cases',
  '/pricing',
  '/contact',
  '/connectors',
  '/mcp',
  '/plugins',
  '/extension',
  '/blog',
  '/research',
  '/ai-memory-benchmark-locomo',
  '/research/what-is-ai-memory',
  '/research/context-engineering',
  '/research/vector-database-vs-agent-memory',
  '/memwyre-vs-mem0',
  '/memwyre-vs-supermemory',
  '/memwyre-vs-zep',
  '/chatgpt-memory',
  '/claude-memory',
  '/cursor-memory',
  '/mcp-memory',
  '/grok-bot-memory',
  '/opencode-memory',
  '/openclaw-memory',
  '/privacy-policy',
  '/terms',
  '/blog/cursor-vs-claude-code-context',
  '/blog/claude-code-memory-ingestion',
  '/blog/mcp-persistent-memory',
  '/blog/shared-memory-chatgpt-claude-cursor',
  '/blog/vscode-mcp-persistent-memory',
  '/blog/openclaw-autonomous-memory',
  '/blog/state-of-ai-memory-2026',
  '/blog/rag-vs-memory-long-term-knowledge'
];

export const DEFAULT_SEO = {
  title: 'Memwyre | AI Memory Platform — Persistent Shared Memory for Every AI',
  description:
    'Memwyre is the AI Memory Platform that gives every AI tool, agent, and conversation a persistent, shared memory. Connect to Cursor, VS Code, ChatGPT, Claude, and more.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
};

export const PUBLIC_ROUTE_SEO = {
  '/contact': {
    title: 'Contact Us | Memwyre — Support, Sales & Partnerships',
    description:
      'Get in touch with the Memwyre team. Reach out directly to himansh@memwyre.tech or submit a message for developer support and sales inquiries.',
  },
  '/': {
    title: 'Memwyre | AI Memory Platform — Persistent Shared Memory for Every AI',
    description:
      'Memwyre is the AI Memory Platform that gives every AI tool, agent, and conversation a persistent, shared memory. Connect to Cursor, VS Code, ChatGPT, Claude, and more.',
  },
  '/use-cases': {
    title: 'Memwyre Use Cases | AI Workflow Memory for Teams and Builders',
    description:
      'See how engineers, researchers, students, and product teams use Memwyre to retain AI context, reduce repeated work, and move faster.',
  },
  '/pricing': {
    title: 'Memwyre Pricing | Plans for Individuals and Teams',
    description:
      'Find the plan that fits your AI workflow. Generous free tier with 50 memories and MCP support. Pro includes VS Code, Notion, Google Drive, Claude Code, and Claude Desktop integrations.',
  },
  '/privacy-policy': {
    title: 'Memwyre Privacy Policy | Data Handling, Security, and Retention',
    description:
      'Read how Memwyre collects, processes, secures, and deletes data across the web app, extension, and MCP integrations.',
  },
  '/terms': {
    title: 'Memwyre Terms of Service | Platform Rules and Responsibilities',
    description:
      'Review Memwyre Terms of Service, including account use, acceptable behavior, billing expectations, and service limitations.',
  },
  '/connectors': {
    title: 'Connectors — Memwyre | Real-time Data Sync for AI Agents',
    description:
      'Pull context automatically from Notion, Google Drive, Gmail, GitHub, S3, and more. Configure once and keep your AI agent\'s context fresh in real time.',
  },
  '/mcp': {
    title: 'MCP — Memwyre | Universal Model Context Protocol Integrations',
    description:
      'Connect Memwyre memory layers directly to Claude, Cursor, Windsurf, VS Code, and any Model Context Protocol (MCP) client. Your context follows you everywhere.',
  },
  '/plugins': {
    title: 'Plugins — Memwyre | Persistent Project Memory for Developer Tools',
    description:
      'Memwyre developer plugins for Claude Code, OpenClaw, OpenCode, and Hermes. One-click memory save, automatic context injection, and project-scoped knowledge.',
  },
  '/extension': {
    title: 'Chrome Extension — Memwyre | Capture Web Context Instantly',
    description:
      'Save AI chats, reusable prompts, code snippets, and webpage content directly from ChatGPT, Claude, and any site with a single click.',
  },
  '/blog': {
    title: 'Memwyre Blog | Guides, Updates & AI Memory Engineering Insights',
    description:
      'Explore deep dives on Model Context Protocol (MCP), developer tools integration, vector databases, and workflow optimization from the Memwyre team.',
  },
  '/blog/shared-memory-chatgpt-claude-cursor': {
    title: 'Maintain Consistent Memory Across ChatGPT, Claude Code, and Cursor | Memwyre Blog',
    description:
      'Stop copy-pasting architecture context between ChatGPT, Claude Code, and Cursor. Build a synchronized cross-tool knowledge graph using Memwyre.',
    ogImage: '/blog-covers/shared-memory-chatgpt-claude-cursor.png',
  },
  '/blog/mcp-persistent-memory': {
    title: 'How to Give Claude Desktop Persistent Memory using MCP | Memwyre Blog',
    description:
      'Connect Memwyre to Claude Desktop as a Model Context Protocol (MCP) server. Give your local Claude assistant a persistent long-term memory layer.',
    ogImage: '/blog-covers/mcp-persistent-memory.png',
  },
  '/blog/vscode-mcp-persistent-memory': {
    title: 'How to Enable Persistent Codebase Memory in VS Code | Memwyre Blog',
    description:
      'Configure remote MCP memory gateway for VS Code agentic extensions like Cline, Roo-Code, and Devins. Stop starting from scratch each session.',
    ogImage: '/blog-covers/vscode-mcp-persistent-memory.png',
  },
  '/blog/claude-code-memory-ingestion': {
    title: 'Building Persistent Terminal Sessions: Claude Code Memory | Memwyre Blog',
    description:
      'Integrate Memwyre lifecycle hooks into Anthropic\'s Claude Code CLI. Inject workspace context on startup and automatically ingest terminal chats on exit.',
    ogImage: '/blog-covers/claude-code-memory-ingestion.png',
  },
  '/blog/openclaw-autonomous-memory': {
    title: 'Persistent Memory for Autonomous Agents: OpenClaw | Memwyre Blog',
    description:
      'Learn how to load the Memwyre OpenClaw plugin and enable the agent to query and update your persistent vault autonomously.',
    ogImage: '/blog-covers/openclaw-autonomous-memory.png',
  },

  '/blog/cursor-vs-claude-code-context': {
    title: 'Cursor AI vs Claude Code: Managing Context and Memory | Memwyre Blog',
    description:
      'Compare workspace indexing and memory management between Cursor AI and Claude Code CLI. Learn how to plug both into a unified memory layer.',
    ogImage: '/blog-covers/cursor-vs-claude-code-context.png',
  },
  '/blog/rag-vs-memory-long-term-knowledge': {
    title: 'RAG vs. AI Memory: Choosing the Right Approach | Memwyre Blog',
    description:
      'Analyze why basic RAG fails for developer workflows due to chunk fragmentation, and why entity-profile routing provides better context.',
    ogImage: '/blog-covers/rag-vs-memory-long-term-knowledge.png',
  },
  '/blog/state-of-ai-memory-2026': {
    title: 'State of AI Memory 2026: Shift from Stateless to Stateful | Memwyre Blog',
    description:
      'An inspection of context window explosion and why stateless attention buffers create substantial financial and latency overheads for enterprise codebase scale.',
    ogImage: '/blog-covers/state-of-ai-memory-2026.png',
  },
  '/blog/:slug': {
    title: 'Memwyre Blog | Engineering Insights & Developer Guides',
    description:
      'Latest guides, insights, and updates on building persistent AI workflows from the Memwyre engineering team.',
  },
  '/research/:slug': {
    title: 'Memwyre Research | AI Memory & Retrieval Studies',
    description:
      'Deep dives, evaluations, and benchmarks from the Memwyre Research Lab on long-term AI memory architectures.',
  },
  '/research/what-is-ai-memory': {
    title: 'What is AI Memory? The Architecture of Long-Term Context',
    description: 'Explore the technical architecture of AI memory, from flat vector embeddings to hierarchical entity graphs, and how it solves LLM amnesia.',
    canonical: 'https://memwyre.com/research/what-is-ai-memory',
    ogType: 'article',
    jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "What is AI Memory? The Architecture of Long-Term Context",
        "description": "Explore the technical architecture of AI memory, from flat vector embeddings to hierarchical entity graphs.",
        "author": { "@type": "Organization", "name": "Himansh Shivhare" },
        "publisher": { "@type": "Organization", "name": "Memwyre", "logo": { "@type": "ImageObject", "url": "https://memwyre.com/logo.png" } }
    })
  },
  '/research/context-engineering': {
    title: 'What is Context Engineering? The 2026 Guide for Developers',
    description: 'Prompt engineering is dead. Learn how Context Engineering and hierarchical entity graphs are replacing standard RAG for production AI agents.',
    canonical: 'https://memwyre.com/research/context-engineering',
    ogType: 'article',
    jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "What is Context Engineering? The 2026 Guide for Developers",
        "description": "Prompt engineering is dead. Learn how Context Engineering and hierarchical entity graphs are replacing standard RAG for production AI agents.",
        "author": { "@type": "Organization", "name": "Himansh Shivhare" },
        "publisher": { "@type": "Organization", "name": "Memwyre", "logo": { "@type": "ImageObject", "url": "https://memwyre.com/logo.png" } }
    })
  },
  '/ai-memory-benchmark-locomo': {
    title: 'LoCoMo Benchmark Report | Evaluating AI Memory Networks',
    description: 'Read the LoCoMo Benchmark Report: methodology, datasets, competitors, findings, and conclusions comparing Memwyre, Mem0, Zep, and Supermemory.',
    ogImage: '/blog-covers/ai-memory-benchmark-locomo-v2.png',
  },
  '/research': {
    title: 'Memwyre Research Hub | Advancing AI Long-Term Context Retention',
    description: 'Explore studies, whitepapers, and experiments on context density, memory graphs, and RAG retrieval optimizations by the Memwyre Research Lab.',
  },
  '/memwyre-vs-mem0': {
    title: 'Memwyre vs Mem0 | Graph Memory vs Flat Vector Lists',
    description: 'Compare Memwyre and Mem0: side-by-side feature comparison, latency benchmarks, and client-side developer integration support.',
  },
  '/memwyre-vs-supermemory': {
    title: 'Memwyre vs Supermemory | Developer Context vs Personal Bookmarks',
    description: 'Analyze differences between developer-first memory layers and personal search engines. Compare latency, MCP configs, and workspace tools.',
  },
  '/memwyre-vs-zep': {
    title: 'Memwyre vs Zep | Active Workspace Graph vs Session Chat History',
    description: 'Compare Memwyre and Zep: active developer client integrations and entity mapping vs backend database session history logs.',
  },
  '/chatgpt-memory': {
    title: 'ChatGPT Memory | Persistent Context & Long-Term Memory for OpenAI',
    description: 'Connect ChatGPT to a unified, long-term memory graph. Save developer guidelines, schemas, and context across all your browser chat sessions.',
  },
  '/claude-memory': {
    title: 'Claude Memory | Persistent long-term memory for Claude Desktop & Code',
    description: 'Setup persistent long-term memory for Anthropic Claude Desktop and Claude Code CLI. Secure, private context updates via remote MCP server gateway.',
  },
  '/grok-bot-memory': {
    title: 'Grok Bot Memory | Cross-Bot Shared Knowledge and Persistence',
    description: 'Enable cross-bot shared memory for Grok Build & Grok Bot. Instantly share context, conventions, and learnings across your entire xAI agent roster.',
    ogImage: '/blog-covers/grok-bot-shared-memory.png',
  },
  '/cursor-memory': {
    title: 'Cursor Memory | Long-Term Codebase Context for Cursor AI IDE',
    description: 'Enable sub-300ms persistent memory for Cursor Composer and Chat. Save developer rules and databases context to avoid index rebuilding.',
  },
  '/research/vector-database-vs-agent-memory': {
    title: 'Vector Database vs. AI Agent Memory: The Architectural Difference | Memwyre Research',
    description:
      'A technical breakdown of vector databases vs AI agent memory systems. Why cosine similarity fails across sessions and why entity-profile routing provides better context.',
    canonical: 'https://memwyre.tech/research/vector-database-vs-agent-memory',
    ogType: 'article',
  },
  '/opencode-memory': {
    title: 'OpenCode Persistent Memory: Fix RAM Leaks & CLI Session State | Memwyre',
    description:
      'Eliminate OpenCode RAM bloat, V8 garbage collector freezes, and CLI session reset. Give OpenCode persistent long-term memory across terminal sessions with Memwyre.',
  },
  '/openclaw-memory': {
    title: 'OpenClaw Persistent Memory: Prevent Context Compaction Loss | Memwyre',
    description:
      'Prevent OpenClaw context compaction loss and RAM bloat. Give autonomous AI coding agents persistent long-term memory across runs with the Memwyre plugin.',
  },
  '/mcp-memory': {
    title: 'MCP Memory Server | Universal Context Layer for All MCP Clients',
    description: 'Link any Model Context Protocol (MCP) client to your personal memory layer. Secure, remote context gateway supporting Cursor, Claude, VS Code, and Windsurf.',
  },
};

export function normalizePath(path = '/') {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

export function buildCanonicalUrl(path = '/') {
  const normalizedPath = normalizePath(path);
  return normalizedPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;
}

export function getDefaultJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/image.svg`,
      sameAs: ['https://x.com/Memwyre'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
}

export function getSeoForPath(path = '/') {
  const normalizedPath = normalizePath(path);
  const isIndexable = PRERENDER_ROUTES.includes(normalizedPath);
  const routeSeo = PUBLIC_ROUTE_SEO[normalizedPath] || {};
  const canonical = buildCanonicalUrl(normalizedPath);
  const defaultImageUrl = `${SITE_URL}${DEFAULT_SOCIAL_IMAGE_PATH}`;
  const socialImageUrl = routeSeo.ogImage ? `${SITE_URL}${routeSeo.ogImage}` : defaultImageUrl;

  const jsonLdData = getDefaultJsonLd();

  if (normalizedPath === '/') {
    // Add FAQPage Schema
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What exactly is Memwyre?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Memwyre is a unified AI memory platform that captures your context across tools (browser, ChatGPT, Claude, Cursor) so you never lose an insight, code snippet, or research finding. It makes this knowledge instantly searchable and reusable by any tool.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is there a free plan?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes! Memwyre has a generous free tier that includes up to 50 memories, 10 document uploads, 30 AI chat messages, and full IDE integration via MCP. No credit card required — just sign up and start building your memory layer.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I connect Memwyre to Cursor or VS Code?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'You can connect Memwyre to Cursor, VS Code, or Claude Desktop using our official Model Context Protocol (MCP) server. This gives your AI assistant direct, real-time access to your entire shared memory layer.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do you offer a browser extension?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes! The Memwyre browser extension (available for Chrome and Edge) lets you instantly clip text, articles, and code snippets directly into your memory layer without breaking your flow.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is my data private and secure?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Absolutely. Your memory layer is fully private and encrypted. Your data is only accessible to you via authenticated sessions and your personal API keys.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the OpenClaw plugin?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The OpenClaw plugin allows autonomous AI agents to read from and write to your Memwyre memory layer. This gives agents persistent memory across runs, letting them build on past debugging sessions and research.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Why not just use ChatGPT\'s built-in memory?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'ChatGPT memory is locked entirely inside ChatGPT. It cannot be accessed by Claude, Cursor, your terminal agents, or other LLMs. Memwyre acts as a universal, shared memory layer that works across all of these tools simultaneously.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How is this different from traditional RAG?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Traditional RAG search takes static documents, chunks them, and searches for matches. Memwyre builds active, connected semantic profiles of your project guidelines, API models, and style rules, updating them dynamically in the background.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does Memwyre compare to Mem0 or Zep?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Mem0 and Zep are developer databases designed as backend infrastructure for teams building custom agents. Memwyre is a ready-to-use memory platform that connects directly to everyday consumer tools.'
          }
        }
      ]
    });

    // Add SoftwareApplication Schema
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Memwyre',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Windows, macOS, Linux, ChromeOS',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'category': 'Free'
      },
      'description': 'Memwyre is a unified AI memory platform that captures your context across tools (browser, ChatGPT, Claude, Cursor) so you never lose an insight, code snippet, or research finding. It then makes this knowledge instantly searchable and reusable.'
    });
  }

  // Dynamic Schema Injection
  if (normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog') {
    const slug = normalizedPath.split('/').pop();
    const blogDates = {
      'shared-memory-chatgpt-claude-cursor': '2026-08-14T08:00:00Z',
      'mcp-persistent-memory': '2026-06-15T08:00:00Z',
      'vscode-mcp-persistent-memory': '2026-06-02T08:00:00Z',
      'claude-code-memory-ingestion': '2026-05-18T08:00:00Z',
      'openclaw-autonomous-memory': '2026-05-04T08:00:00Z',
      'grok-bot-shared-memory': '2026-09-16T08:00:00Z',
      'cursor-vs-claude-code-context': '2026-04-20T08:00:00Z',
      'state-of-ai-memory-2026': '2026-04-18T08:00:00Z',
      'rag-vs-memory-long-term-knowledge': '2026-04-09T08:00:00Z'
    };
    const pubDate = blogDates[slug] || '2026-03-01T08:00:00Z';
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': routeSeo.title || DEFAULT_SEO.title,
      'description': routeSeo.description || DEFAULT_SEO.description,
      'image': socialImageUrl,
      'datePublished': pubDate,
      'dateModified': pubDate,
      'author': {
        '@type': 'Person',
        'name': 'Himansh Shivhare'
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/image.svg`
        }
      },
      'url': canonical
    });
  } else if (normalizedPath === '/research/what-is-ai-memory' || normalizedPath === '/ai-memory-benchmark-locomo' || normalizedPath === '/research/context-engineering' || normalizedPath === '/research/vector-database-vs-agent-memory') {
    const techDates = {
      '/research/what-is-ai-memory': '2026-03-10T08:00:00Z',
      '/ai-memory-benchmark-locomo': '2026-03-25T08:00:00Z',
      '/research/context-engineering': '2026-03-20T08:00:00Z',
      '/research/vector-database-vs-agent-memory': '2026-04-01T08:00:00Z'
    };
    const pubDate = techDates[normalizedPath] || '2026-03-01T08:00:00Z';
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': routeSeo.title || DEFAULT_SEO.title,
      'description': routeSeo.description || DEFAULT_SEO.description,
      'image': socialImageUrl,
      'datePublished': pubDate,
      'dateModified': pubDate,
      'author': {
        '@type': 'Organization',
        'name': 'Himansh Shivhare'
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/image.svg`
        }
      },
      'url': canonical
    });
  } else if (['/chatgpt-memory', '/claude-memory', '/cursor-memory', '/mcp-memory', '/grok-bot-memory'].includes(normalizedPath)) {
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': `${SITE_NAME} Integration`,
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Windows, macOS, Linux, ChromeOS',
      'image': socialImageUrl,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock'
      },
      'description': routeSeo.description || DEFAULT_SEO.description
    });
  } else if (normalizedPath === '/opencode-memory') {
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Himansh Shivhare',
      'jobTitle': 'Founder & Lead Architect',
      'worksFor': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL
      },
      'sameAs': [
        'https://linkedin.com/in/himansh-shivhare',
        'https://github.com/ramblinghermit0403'
      ]
    });
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Memwyre OpenCode Memory Plugin',
      'url': canonical,
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Windows, macOS, Linux',
      'image': socialImageUrl,
      'author': {
        '@type': 'Person',
        'name': 'Himansh Shivhare',
        'url': 'https://linkedin.com/in/himansh-shivhare'
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '142',
        'bestRating': '5',
        'worstRating': '1'
      },
      'description': routeSeo.description || DEFAULT_SEO.description
    });
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Does OpenCode have persistent memory?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. OpenCode does not have native persistent long-term memory across sessions. By default, every time you close an OpenCode terminal or restart a session, all architectural decisions, debugging breakthroughs, and code patterns are flushed. Connecting the Memwyre OpenCode plugin equips OpenCode with cross-session long-term memory that auto-injects relevant context on start and saves learnings on exit.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Why does OpenCode use so much RAM (10–20 GB), and how does Memwyre fix it?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The OpenCode Desktop GUI runs inside an Electron/Chromium environment that holds all active sessions, DOM nodes, and raw token buffers in memory, triggering runaway RAM bloat and memory leaks. Memwyre solves this by decoupling memory from the desktop client: developers switch to the ultra-lightweight OpenCode CLI (cutting system RAM usage by 90% down to <150 MB) while Memwyre stores long-term memory in a remote vector and entity graph vault.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What causes OpenCode V8 garbage collector freezes and Out-of-Memory (OOM) crashes?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': "In long multi-turn sessions, OpenCode's in-memory session heap exceeds Node.js and V8 default heap allocation limits. The V8 garbage collector enters repeated stop-the-world scavenge cycles attempting to reclaim uncollected DOM and diff objects, resulting in GUI freezes and fatal JavaScript heap out of memory crashes. Memwyre avoids this by persisting state asynchronously outside the Node/Electron process."
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the RAM requirements for running OpenCode CLI vs Desktop?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'OpenCode Desktop GUI requires 16 GB to 32 GB RAM to prevent OS swapping and memory freezes during intensive development. In contrast, the OpenCode CLI paired with Memwyre requires only 512 MB to 1 GB RAM, enabling high-performance AI coding on lightweight VPS instances, GitHub Codespaces, Docker containers, and low-spec machines.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does Memwyre compare to manual memory.md or opencode-working-memory files?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Static files like memory.md or opencode-working-memory suffer from token window exhaustion, attention drift, and manual overhead as they grow. Memwyre replaces static files with semantic AST-aware context injection: it dynamically retrieves only the top 3–5 relevant insights for your active task, automatically applies Ebbinghaus decay to obsolete facts, and syncs across Claude Code and Cursor.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the best memory plugin for OpenCode?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Memwyre is the top-ranked memory plugin for OpenCode, scoring 70.5% on the LoCoMo-10 long-term memory benchmark compared to 43.7% for basic vector solutions. It features deterministic lifecycle hooks, zero local RAM overhead, AST code chunking, and bi-directional cross-tool synchronization with Claude Code, Cursor, and VS Code.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I maintain consistent memory across OpenCode, Claude Code, and Cursor?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Memwyre acts as a universal memory hub. By using your single Memwyre API key across the OpenCode plugin, Claude Code hooks, Cursor MCP server, and VS Code extension, decisions made in an OpenCode terminal session are instantly synchronized and accessible to Claude and Cursor in real time.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I give OpenCode persistent memory across sessions?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Run npm install -g @memwyre/opencode-plugin, add the plugin hook to your opencode.json configuration, and set export MEMWYRE_API_KEY=your_key. The plugin will automatically query Memwyre on session start and push compact decision summaries on session exit.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is my OpenCode memory data private and secure?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Memwyre operates with zero data retention for LLM training. Code transcripts and embeddings are encrypted at rest with AES-256 and in transit via TLS 1.3, with full self-hosted on-premise deployment available for enterprise teams.'
          }
        }
      ]
    });
  } else if (normalizedPath === '/openclaw-memory') {
    const pluginName = 'OpenClaw';
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Himansh Shivhare',
      'jobTitle': 'Founder & Lead Architect',
      'worksFor': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL
      },
      'sameAs': [
        'https://linkedin.com/in/himansh-shivhare',
        'https://github.com/ramblinghermit0403'
      ]
    });
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': `Memwyre ${pluginName} Memory Plugin`,
      'url': canonical,
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Windows, macOS, Linux',
      'image': socialImageUrl,
      'author': {
        '@type': 'Person',
        'name': 'Himansh Shivhare',
        'url': 'https://linkedin.com/in/himansh-shivhare'
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '128',
        'bestRating': '5',
        'worstRating': '1'
      },
      'description': routeSeo.description || DEFAULT_SEO.description
    });
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': `Does ${pluginName} have built-in memory?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `No — ${pluginName} does not ship with built-in persistent memory. You need an external plugin like Memwyre for cross-session context retention.`
          }
        },
        {
          '@type': 'Question',
          'name': `How do I give ${pluginName} persistent memory across sessions?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `Install the Memwyre ${pluginName} plugin and set your MEMWYRE_API_KEY environment variable. Every session will automatically load relevant past context on start and save new insights on exit.`
          }
        },
        {
          '@type': 'Question',
          'name': 'How is Memwyre different from claude-mem?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'claude-mem stores observations locally in SQLite + ChromaDB — great for single-machine use. Memwyre uses a shared cloud vault with entity graph and two-stage cross-encoder re-ranking, enabling cross-tool sync across Claude Code, Cursor, VS Code, and more without SSH setup. License-wise, claude-mem is AGPL-3.0 (copyleft); Memwyre is Apache-2.0 (permissive). Memwyre scores 70.5% on LoCoMo-10 vs. 43.7% for flat vector baselines.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What license is Memwyre released under?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Apache-2.0. No copyleft obligations. You can use, modify, and deploy Memwyre in proprietary environments without open-sourcing your changes.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What happens if Memwyre captures something wrong?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Every memory is individually addressable. You can view, edit, or delete any observation from the Memwyre dashboard or via API. The Ebbinghaus decay model also automatically deprioritizes stale facts over time.'
          }
        },
        {
          '@type': 'Question',
          'name': `Does the plugin work with Claude Code and Cursor too?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. All Memwyre plugins and MCP connections share the same cloud vault. Context captured in an ' + pluginName + ' session is instantly available in Claude Code, Cursor, VS Code, and Claude Desktop — same API key, same vault.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is my memory data private?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Fully private and encrypted. Memwyre uses zero-retention processing — transcripts are extracted in memory and immediately discarded. For full data sovereignty, you can self-host the entire backend behind your firewall.'
          }
        },
        {
          '@type': 'Question',
          'name': `How does Memwyre prevent context compaction loss in ${pluginName}?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `When ${pluginName} hits context limits, native compaction loops compress history and discard critical facts. Memwyre intercepts observations before compaction occurs and indexes them in a persistent entity graph with zero information loss.`
          }
        },
        {
          '@type': 'Question',
          'name': `Does the Memwyre plugin reduce ${pluginName} RAM and CPU footprint?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `Yes. In-memory transcripts and browser-control screenshot buffers cause ${pluginName} processes to bloat. Memwyre offloads context to cloud or self-hosted storage, allowing agents to prune redundant local buffers and run lightweight loops indefinitely.`
          }
        }
      ]
    });
  } else if (['/memwyre-vs-mem0', '/memwyre-vs-supermemory', '/memwyre-vs-zep'].includes(normalizedPath)) {
    jsonLdData.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': routeSeo.title || DEFAULT_SEO.title,
      'description': routeSeo.description || DEFAULT_SEO.description,
      'image': socialImageUrl,
      'author': {
        '@type': 'Organization',
        'name': SITE_NAME
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SITE_URL}/image.svg`
        }
      },
      'url': canonical
    });
  }

  return {
    title: routeSeo.title || DEFAULT_SEO.title,
    description: routeSeo.description || DEFAULT_SEO.description,
    canonical,
    ogTitle: routeSeo.title || DEFAULT_SEO.title,
    ogDescription: routeSeo.description || DEFAULT_SEO.description,
    ogType: DEFAULT_SEO.ogType,
    ogUrl: canonical,
    ogSiteName: SITE_NAME,
    ogImage: socialImageUrl,
    ogImageWidth: '1280',
    ogImageHeight: '720',
    twitterCard: DEFAULT_SEO.twitterCard,
    twitterTitle: routeSeo.title || DEFAULT_SEO.title,
    twitterDescription: routeSeo.description || DEFAULT_SEO.description,
    twitterImage: socialImageUrl,
    robots: isIndexable ? 'index, follow' : 'noindex, nofollow',
    jsonLd: JSON.stringify(jsonLdData, null, 2),
  };
}
