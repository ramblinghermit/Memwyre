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
  '/blog/mcp-persistent-memory',
  '/blog/vscode-mcp-persistent-memory',
  '/blog/claude-code-memory-ingestion',
  '/blog/openclaw-autonomous-memory',
  '/blog/cursor-vs-claude-code-context',
  '/blog/rag-vs-memory-long-term-knowledge',
  '/blog/state-of-ai-memory-2026',
  '/research',
  '/ai-memory-benchmark-locomo',
  '/research/what-is-ai-memory',
  '/research/context-engineering',
  '/memwyre-vs-mem0',
  '/memwyre-vs-supermemory',
  '/memwyre-vs-zep',
  '/chatgpt-memory',
  '/claude-memory',
  '/cursor-memory',
  '/mcp-memory',
  '/openclaw-memory',
  '/opencode-memory',
  '/privacy-policy',
  '/terms',
  '/login',
  '/signup',
  '/dashboard',
  '/forgot-password'
];

export const DEFAULT_SEO = {
  title: 'Memwyre | AI Memory Platform — Persistent Shared Memory',
  description:
    'Memwyre gives every AI tool, agent, and conversation a persistent shared memory. Connect seamlessly to Cursor, VS Code, ChatGPT, Claude, and more.',
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
    title: 'Memwyre | AI Memory Platform — Persistent Shared Memory',
    description:
      'Memwyre gives every AI tool, agent, and conversation a persistent shared memory. Connect seamlessly to Cursor, VS Code, ChatGPT, Claude, and more.',
  },
  '/use-cases': {
    title: 'Memwyre Use Cases | AI Workflow Memory for Teams',
    description:
      'See how engineers, researchers, students, and product teams use Memwyre to retain AI context, reduce repeated work, and move faster.',
  },
  '/pricing': {
    title: 'Memwyre Pricing | Plans for Individuals and Teams',
    description:
      'Find the right Memwyre plan for your AI workflow. Free tier includes 50 memories and MCP. Pro unlocks Notion, Drive, Claude Code, and IDE tools.',
  },
  '/privacy-policy': {
    title: 'Memwyre Privacy Policy | Data Security and Retention',
    description:
      'Read how Memwyre collects, processes, secures, and deletes data across the web app, extension, and MCP integrations with zero retention.',
  },
  '/terms': {
    title: 'Memwyre Terms of Service | Platform Rules & Policy',
    description:
      'Review Memwyre Terms of Service, including account use, acceptable behavior, billing expectations, and platform service limitations.',
  },
  '/connectors': {
    title: 'Connectors — Memwyre | Real-time Data Sync for AI',
    description:
      'Pull context automatically from Notion, Google Drive, Gmail, GitHub, S3, and more. Configure once and keep your AI agent context fresh in real time.',
  },
  '/mcp': {
    title: 'MCP — Memwyre | Universal Context Protocol Gateway',
    description:
      'Connect Memwyre memory layers directly to Claude, Cursor, Windsurf, VS Code, and any Model Context Protocol client. Context follows you everywhere.',
  },
  '/plugins': {
    title: 'Plugins — Memwyre | Persistent Project Memory for Tools',
    description:
      'Memwyre developer plugins for Claude Code, OpenClaw, OpenCode, and Hermes. One-click memory save, automatic context injection, and project memory.',
  },
  '/extension': {
    title: 'Chrome Extension — Memwyre | Capture Web Context',
    description:
      'Save AI chats, reusable prompts, code snippets, and webpage content directly from ChatGPT, Claude, and any site with a single click.',
  },
  '/blog': {
    title: 'Memwyre Blog | Guides & AI Memory Engineering Insights',
    description:
      'Explore deep dives on Model Context Protocol (MCP), developer tools integration, vector databases, and workflow optimization from the Memwyre team.',
  },
  '/blog/mcp-persistent-memory': {
    title: 'Persistent Memory for Claude Desktop with MCP | Memwyre',
    description:
      'Connect Memwyre to Claude Desktop as a Model Context Protocol (MCP) server. Give your local Claude assistant a persistent long-term memory layer.',
    ogImage: '/blog-covers/mcp-persistent-memory.png',
  },
  '/blog/vscode-mcp-persistent-memory': {
    title: 'Persistent Codebase Memory in VS Code with MCP | Memwyre',
    description:
      'Configure remote MCP memory gateway for VS Code agentic extensions like Cline, Roo-Code, and Devins. Stop starting from scratch each session.',
    ogImage: '/blog-covers/vscode-mcp-persistent-memory.png',
  },
  '/blog/claude-code-memory-ingestion': {
    title: 'Persistent Terminal Sessions: Claude Code Memory | Memwyre',
    description:
      'Integrate Memwyre lifecycle hooks into Claude Code CLI. Inject workspace context on startup and automatically ingest terminal chats on exit.',
    ogImage: '/blog-covers/claude-code-memory-ingestion.png',
  },
  '/blog/openclaw-autonomous-memory': {
    title: 'Persistent Memory for OpenClaw Autonomous Agents | Memwyre',
    description:
      'Load the Memwyre plugin for OpenClaw autonomous coding agents. Enable long-term memory query tools and persistent inbox updates across agent runs.',
    ogImage: '/blog-covers/openclaw-autonomous-memory.png',
  },
  '/blog/cursor-vs-claude-code-context': {
    title: 'Cursor AI vs Claude Code: Context & Memory | Memwyre',
    description:
      'Compare workspace indexing and memory management between Cursor AI and Claude Code CLI. Learn how to plug both into a unified memory layer.',
    ogImage: '/blog-covers/cursor-vs-claude-code-context.png',
  },
  '/blog/rag-vs-memory-long-term-knowledge': {
    title: 'RAG vs. AI Memory: Which Approach Is Right? | Memwyre',
    description:
      'Analyze why basic RAG fails for developer workflows due to chunk fragmentation, and why entity-profile routing provides better context.',
    ogImage: '/blog-covers/rag-vs-memory-long-term-knowledge.png',
  },
  '/blog/state-of-ai-memory-2026': {
    title: 'State of AI Memory 2026: Shift to Stateful Agents | Memwyre',
    description:
      'An inspection of context window explosion and why stateless attention buffers create substantial financial and latency overheads at codebase scale.',
    ogImage: '/blog-covers/state-of-ai-memory-2026.png',
  },
  '/blog/:slug': {
    title: 'Memwyre Blog | Engineering Insights & Guides',
    description:
      'Read latest guides, architectural deep dives, and tutorials on building persistent AI workflows from the Memwyre engineering team.',
  },
  '/research/:slug': {
    title: 'Memwyre Research | AI Memory & Retrieval Studies',
    description:
      'Read in-depth research studies, evaluations, and benchmarks from the Memwyre Research Lab on long-term AI memory architectures.',
  },
  '/research/what-is-ai-memory': {
    title: 'What is AI Memory? The Architecture of Long-Term Context',
    description: 'Explore the technical architecture of AI memory, from flat vector embeddings to hierarchical entity graphs, and how it solves LLM amnesia.',
    canonical: 'https://memwyre.tech/research/what-is-ai-memory',
    ogType: 'article',
    jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "What is AI Memory? The Architecture of Long-Term Context",
        "description": "Explore the technical architecture of AI memory, from flat vector embeddings to hierarchical entity graphs.",
        "author": { "@type": "Organization", "name": "Himansh Shivhare" },
        "publisher": { "@type": "Organization", "name": "Memwyre", "logo": { "@type": "ImageObject", "url": "https://memwyre.tech/image.svg" } }
    })
  },
  '/research/context-engineering': {
    title: 'Context Engineering: The 2026 Guide for Developers',
    description: 'Prompt engineering is dead. Learn how Context Engineering and hierarchical entity graphs replace standard RAG for production AI agents.',
    canonical: 'https://memwyre.tech/research/context-engineering',
    ogType: 'article',
    jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Context Engineering: The 2026 Guide for Developers",
        "description": "Prompt engineering is dead. Learn how Context Engineering and hierarchical entity graphs replace standard RAG for production AI agents.",
        "author": { "@type": "Organization", "name": "Himansh Shivhare" },
        "publisher": { "@type": "Organization", "name": "Memwyre", "logo": { "@type": "ImageObject", "url": "https://memwyre.tech/image.svg" } }
    })
  },
  '/ai-memory-benchmark-locomo': {
    title: 'LoCoMo Benchmark Report | Evaluating AI Memory Networks',
    description: 'Read the LoCoMo Benchmark Report: methodology, datasets, competitors, findings, and conclusions comparing Memwyre, Mem0, Zep, and Supermemory.',
    ogImage: '/blog-covers/ai-memory-benchmark-locomo-v2.png',
  },
  '/research': {
    title: 'Memwyre Research Hub | AI Long-Term Memory Studies',
    description: 'Explore studies, whitepapers, and experiments on context density, memory graphs, and RAG retrieval optimizations by the Memwyre Research Lab.',
  },
  '/memwyre-vs-mem0': {
    title: 'Memwyre vs Mem0 | Graph Memory vs Flat Vector Lists',
    description: 'Compare Memwyre and Mem0: side-by-side feature comparison, latency benchmarks, and client-side developer integration support.',
  },
  '/memwyre-vs-supermemory': {
    title: 'Memwyre vs Supermemory | Developer Memory Comparison',
    description: 'Analyze differences between developer-first memory layers and personal search engines. Compare latency, MCP configs, and workspace tools.',
  },
  '/memwyre-vs-zep': {
    title: 'Memwyre vs Zep | Memory Graph vs Chat History',
    description: 'Compare Memwyre and Zep: active developer client integrations and entity mapping vs backend database session history logs.',
  },
  '/chatgpt-memory': {
    title: 'ChatGPT Persistent Memory: Cross-Tool Context Beyond Web Chat | Memwyre',
    description: 'Free ChatGPT memory from the web silo. Connect ChatGPT to an external, long-term memory graph with 1-click browser clipping and cross-tool sync with Cursor and Claude.',
  },
  '/claude-memory': {
    title: 'Claude Code Persistent Memory: Overcoming CLAUDE.md & Auto Memory Limits | Memwyre',
    description: 'Overcome Claude Code native memory limits (CLAUDE.md & 25KB Auto Memory cap). Give Claude persistent cross-session memory with automatic context injection on startup and session capture on exit.',
    ogImage: '/blog-covers/claude-code-memory-ingestion.png',
  },
  '/cursor-memory': {
    title: 'Cursor AI Persistent Memory: Long-Term Context for Composer & Chat | Memwyre',
    description: 'Enable persistent memory for Cursor Composer and Chat. Save architectural decisions and database schemas into a memory graph to avoid slow codebase index rebuilding.',
  },
  '/mcp-memory': {
    title: 'MCP Memory Server: Universal Model Context Protocol Architecture | Memwyre',
    description: 'Technical reference and specification for the Memwyre MCP Memory Server. Connect Cursor, Claude Desktop, and VS Code with 5 core tools over Stdio and remote HTTP/SSE.',
  },
  '/openclaw-memory': {
    title: 'OpenClaw Persistent Memory: Prevent Context Compaction Loss | Memwyre',
    description: 'Prevent OpenClaw context compaction loss and RAM bloat. Give autonomous AI coding agents persistent long-term memory across runs with the Memwyre plugin.',
  },
  '/opencode-memory': {
    title: 'OpenCode Persistent Memory: Fix Desktop RAM Bloat & CLI Memory | Memwyre',
    description: 'Preserve OpenCode project context across sessions and eliminate Desktop RAM leaks. Connect OpenCode CLI directly to a persistent long-term memory graph.',
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
      'url': `${SITE_URL}/`,
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Windows, macOS, Linux, ChromeOS',
      'image': socialImageUrl,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
        'category': 'Free'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '128',
        'bestRating': '5',
        'worstRating': '1'
      },
      'description': 'Memwyre is a unified AI memory platform that captures your context across tools (browser, ChatGPT, Claude, Cursor) so you never lose an insight, code snippet, or research finding. It then makes this knowledge instantly searchable and reusable.'
    });
  }

  // Dynamic Schema Injection
  if (normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog') {
    const slug = normalizedPath.split('/').pop();
    const blogDates = {
      'mcp-persistent-memory': '2026-06-15T08:00:00Z',
      'vscode-mcp-persistent-memory': '2026-06-02T08:00:00Z',
      'claude-code-memory-ingestion': '2026-05-18T08:00:00Z',
      'openclaw-autonomous-memory': '2026-05-04T08:00:00Z',
      'cursor-vs-claude-code-context': '2026-04-22T08:00:00Z',
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
  } else if (normalizedPath === '/research/what-is-ai-memory' || normalizedPath === '/ai-memory-benchmark-locomo' || normalizedPath === '/research/context-engineering') {
    const techDates = {
      '/research/what-is-ai-memory': '2026-03-10T08:00:00Z',
      '/ai-memory-benchmark-locomo': '2026-03-25T08:00:00Z',
      '/research/context-engineering': '2026-03-20T08:00:00Z'
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
  } else if (normalizedPath === '/claude-memory') {
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
      'name': 'Memwyre Claude Code Memory Plugin',
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
          'name': 'Does Claude Code have built-in memory?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes — Claude Code has two built-in memory mechanisms: CLAUDE.md (a Markdown file loaded on startup) and auto-memory (saves notes to ~/.claude/projects/.../memory/). Both are useful for static rules but limited for dynamic, searchable, cross-tool memory.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I give Claude Code persistent memory across sessions?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Install the Memwyre Claude Code plugin: claude plugin install @memwyre/claude-code-plugin. Set your MEMWYRE_API_KEY environment variable, and every session will automatically load relevant past context on start and save new insights on exit.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How is Memwyre different from claude-mem?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'claude-mem stores observations locally in SQLite + ChromaDB — great for single-machine use. Memwyre uses a shared cloud vault with entity graph and two-stage cross-encoder re-ranking, enabling cross-tool sync across Claude Code, Cursor, VS Code, and Claude Desktop without SSH setup. License-wise, claude-mem is AGPL-3.0 (copyleft); Memwyre is Apache-2.0 (permissive). On retrieval quality, Memwyre scores 70.5% on LoCoMo-10 vs. 43.7% for flat vector baselines, using 81% fewer context tokens.'
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
            'text': 'Every memory is individually addressable. You can view, edit, or delete any observation from the Memwyre dashboard or via API (DELETE /api/v1/memories/:id). The Ebbinghaus decay model also automatically deprioritizes stale facts over time.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can Claude Code remember things across sessions?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'By default, Claude Code context resets between sessions. You can add persistence through CLAUDE.md (manual), auto-memory (limited automatic), or the Memwyre plugin (fully automatic with semantic search across Claude Code, Claude Desktop, Cursor, and VS Code).'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does the Memwyre plugin work with Claude Desktop?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Claude Code (via plugin hooks) and Claude Desktop (via MCP server) both read from and write to the same memory vault. Context saved in a terminal session is instantly available in Claude Desktop — same API key, same vault, zero sync configuration.'
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
          'name': 'Why does Claude Code forget instructions despite having Auto Memory and CLAUDE.md?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Claude Code native memory stores notes in a local MEMORY.md file capped at 200 lines and 25KB. When your notes exceed 200 lines, older memories are silently truncated without notifying Claude. Native memory also uses exact keyword matching rather than semantic vector search, so Claude fails to retrieve notes unless queries use identical wording. Memwyre solves this with automated vector and entity graph search that scales to millions of tokens.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the 200-line / 25KB limit in Claude Code native memory, and how does Memwyre bypass it?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'In Claude Code internal compiler (src/memdir/), MEMORY.md is limited to 200 lines and 25KB to prevent system prompt bloat. Facts at the top fall off silently when exceeded. Memwyre bypasses this by storing notes in an external, cloud-hosted semantic memory vault, retrieving only the top-k relevant memories (~1,500 tokens) on session start using two-stage cross-encoder re-ranking.'
          }
        }
      ]
    });
  } else if (['/chatgpt-memory', '/cursor-memory', '/mcp-memory'].includes(normalizedPath)) {
    const appNames = {
      '/chatgpt-memory': 'Memwyre ChatGPT Memory Integration',
      '/cursor-memory': 'Memwyre Cursor Memory Integration',
      '/mcp-memory': 'Memwyre MCP Memory Server'
    };
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
      'name': appNames[normalizedPath] || `${SITE_NAME} Integration`,
      'url': canonical,
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Windows, macOS, Linux, ChromeOS',
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

    if (normalizedPath === '/cursor-memory') {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Does Cursor AI have built-in persistent memory across sessions?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Cursor includes static .cursorrules and local file vector indexing (@Codebase). However, it does not persist conversational rationale, dynamic debugging discoveries, or architectural decisions across different Composer or Chat sessions unless connected to an external memory gateway like Memwyre.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between root .cursorrules and .cursor/rules/*.mdc?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Root .cursorrules is a legacy single-file rulebook loaded on every request. The modern .cursor/rules/*.mdc architecture allows scoped modular rule files that activate selectively based on file glob patterns, saving prompt tokens.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Why does Cursor Composer hallucinate during long, multi-file refactors?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'In extended refactors involving 10+ files, prompt buffers suffer from the Lost-in-the-Middle effect. File contents push initial instructions toward the middle of the context window where LLM attention is lowest, leading to diff hallucinations and forgotten edge cases. Selective semantic memory solves this by keeping active context below 10,000 tokens.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How is Memwyre different from .cursorrules?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '.cursorrules is a static text file that you must write and update by hand. Memwyre is an active, queryable knowledge graph: Cursor agents can call MCP tools to search for specific constraints, learn new facts dynamically during coding, and share those learnings across team members.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do I add Memwyre to Cursor Composer and Chat?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Open Cursor Settings > Features > MCP > Add New MCP Server. Choose command and enter npx -y mcp-remote https://server.memwyre.tech/mcp --header "Authorization:Bearer YOUR_KEY". Cursor will automatically recognize the memory search and save tools in both Composer and Chat.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Does Memwyre slow down Cursor Composer code generation?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No. Memwyre queries execute rapidly on-demand. In fact, by injecting targeted architectural context rather than scanning dozens of raw codebase files, Memwyre speeds up Composer response times and reduces token burn by up to 81%.'
            }
          }
        ]
      });
    } else if (normalizedPath === '/chatgpt-memory') {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How does Memwyre differ from ChatGPT native memory?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'OpenAI native memory is confined strictly to the ChatGPT web interface. It cannot be accessed by your coding IDEs or terminal agents. Memwyre provides a universal graph vault: memories clipped in ChatGPT are instantly accessible in Cursor Composer, Claude Code CLI, and OpenCode.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do Custom Instructions differ from ChatGPT Memory and Projects?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Custom Instructions apply globally across every chat with a 1,500-character cap. Native Memory dynamically saves short text facts during conversations but lacks temporal decay. ChatGPT Projects provide folder-scoped instructions with static file uploads (up to 512MB). Memwyre augments all three by connecting conversations to an external, self-updating entity graph that links directly to your local codebase and IDEs.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How can I clear or delete outdated memories in ChatGPT?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'You can tell ChatGPT directly "Forget [fact]" or navigate to Settings > Personalization > Memory > Manage to manually inspect and delete saved notes. Alternatively, Memwyre applies an automated Ebbinghaus recency decay model so recent decisions supersede stale facts without manual cleanup.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Does Memwyre work with ChatGPT Free accounts?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. The Memwyre Chrome/Edge browser extension operates directly in the browser DOM and functions identically on ChatGPT Free, Plus, Team, and Enterprise accounts.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can Custom GPTs call Memwyre automatically?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. By registering our OpenAPI Action schema inside your Custom GPT configuration, the model can query (search_memwyre) and persist observations to your memory vault autonomously during chat sessions.'
            }
          }
        ]
      });
    } else if (normalizedPath === '/mcp-memory') {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is the Model Context Protocol (MCP)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'MCP is an open standard created by Anthropic that allows AI models and IDE clients to securely discover and invoke tools, read context resources, and access external databases via standardized JSON-RPC protocols.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between Stdio transport and HTTP/SSE transport in MCP?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Stdio transport spawns a local child process communicating via stdin/stdout pipes, which is fast and secure for local offline tooling but locked to a single workstation. Remote HTTP/SSE transport communicates over persistent HTTPS streams, enabling multi-machine context synchronization across work laptops, desktops, and CI/CD agents.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does Memwyre prevent prompt injection attacks through MCP memory tools?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Memwyre routes candidate memories through an isolated extraction sandbox before writing them to the knowledge graph. This pipeline strips imperatival instructions, removes adversarial injection prompts, and only persists factual architectural assertions and schemas.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Which IDEs and tools support the Memwyre MCP Memory Server?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Any client implementing MCP can connect to Memwyre, including Cursor AI IDE, Claude Desktop, Claude Code CLI, Windsurf, Roo-Code, Cline, and custom Python/TypeScript agent frameworks.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the latency of MCP tool calls in Memwyre?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Semantic memory searches execute with low overhead, ensuring that agentic loops and multi-file composer generations are never blocked by context retrieval.'
            }
          }
        ]
      });
    }
  } else if (['/openclaw-memory', '/opencode-memory'].includes(normalizedPath)) {
    const pluginName = normalizedPath === '/openclaw-memory' ? 'OpenClaw' : 'OpenCode';
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
