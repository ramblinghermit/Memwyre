<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed, onServerPrefetch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ArticleLayout from '@/components/ArticleLayout.vue';
import { Marked } from 'marked';
import mermaid from 'mermaid';

const route = useRoute();
const router = useRouter();

// Slugify heading helper
const slugify = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

const marked = new Marked({
  renderer: {
    heading(text, level, raw) {
      let depth = level;
      let rawText = '';
      let htmlText = '';
      if (typeof text === 'object' && text !== null) {
        rawText = text.text;
        depth = text.depth;
        htmlText = this.parser.parseInline(text.tokens);
      } else {
        rawText = text;
        htmlText = text;
      }
      const slug = slugify(rawText);
      return `<h${depth} id="${slug}">${htmlText}</h${depth}>`;
    },
    code(code, infostring) {
      let text = '';
      let lang = '';
      if (typeof code === 'object' && code !== null) {
        text = code.text;
        lang = code.lang;
      } else {
        text = code;
        lang = infostring;
      }
      
      if (lang === 'mermaid') {
        let b64 = '';
        if (typeof window !== 'undefined' && window.btoa) {
          b64 = window.btoa(unescape(encodeURIComponent(text)));
        }
        return `<div class="mermaid-container flex justify-center w-full my-8" data-mermaid="${b64}"></div>`;
      }
      return `<pre><code class="language-${lang || ''}">${text}</code></pre>`;
    }
  }
});

const rawContent = ref('');
const parsedHtml = ref('');
const isLoading = ref(true);
const error = ref(null);
const toc = ref([]);
const activeSection = ref('');

const parseToc = (md) => {
  if (!md) return;
  const tokens = marked.lexer(md);
  const rawHeadings = [];
  
  tokens.forEach(token => {
    if (token.type === 'heading' && (token.depth === 2 || token.depth === 3)) {
      const cleanText = token.text.replace(/[*_~`]/g, '');
      const slug = slugify(token.text);
      rawHeadings.push({ depth: token.depth, text: cleanText, slug });
    }
  });

  if (rawHeadings.length === 0) {
    toc.value = [];
    return;
  }

  // Group into major sections (H2) and sub-points (H3)
  const sections = [];
  let currentSection = null;

  rawHeadings.forEach(h => {
    if (h.depth === 2 || !currentSection) {
      currentSection = {
        text: h.text,
        slug: h.slug,
        children: []
      };
      sections.push(currentSection);
    } else if (h.depth === 3 && currentSection) {
      currentSection.children.push({
        text: h.text,
        slug: h.slug
      });
    }
  });

  // Ensure at most 4 to 5 major points
  let finalToc = [];
  if (sections.length <= 5) {
    finalToc = sections;
  } else {
    // Cluster sections into at most 4-5 groups
    const targetCount = sections.length <= 8 ? 4 : 5;
    const chunkSize = Math.ceil(sections.length / targetCount);
    for (let i = 0; i < sections.length; i += chunkSize) {
      const chunk = sections.slice(i, i + chunkSize);
      const primary = chunk[0];
      const combinedChildren = [...primary.children];
      for (let j = 1; j < chunk.length; j++) {
        combinedChildren.push({ text: chunk[j].text, slug: chunk[j].slug });
        if (chunk[j].children && chunk[j].children.length > 0) {
          combinedChildren.push(...chunk[j].children);
        }
      }
      finalToc.push({
        text: primary.text,
        slug: primary.slug,
        children: combinedChildren
      });
    }
  }

  toc.value = finalToc;
  if (finalToc.length > 0 && !activeSection.value) {
    activeSection.value = finalToc[0].slug;
  }
};

watch(rawContent, (newContent) => {
  parseToc(newContent);
}, { immediate: true });

// Get meta info for other articles sidebar
const recentPosts = [
  {
    slug: 'muse-code-persistent-memory',
    title: 'How to Give Muse Code Persistent Memory: The Complete Developer Guide to Lifecycle Hooks, MCP, and Cross-Agent Context Sync',
    category: 'CLI Plugins',
    author: 'Himansh Shivhare',
    fullDate: 'October 01, 2026',
    readTime: '14 MIN'
  },
  {
    slug: 'openai-dots-memory',
    title: 'How to Give OpenAI Dots Persistent Memory with Memwyre',
    category: 'MCP Server',
    author: 'Himansh Shivhare',
    fullDate: 'October 01, 2026',
    readTime: '5 MIN'
  },
  {
    slug: 'best-ai-agent-memories',
    title: 'Best AI Agent Memory Systems in 2026: Architectures, Benchmarks & Comparison',
    category: 'Architecture',
    author: 'Himansh Shivhare',
    fullDate: 'September 29, 2026',
    readTime: '8 MIN'
  },
  {
    slug: 'best-alternatives-to-mem0',
    title: 'The 5 Best Alternatives to Mem0 in 2026: Features, Tradeoffs & Benchmarks',
    category: 'Comparisons',
    author: 'Himansh Shivhare',
    fullDate: 'September 29, 2026',
    readTime: '7 MIN'
  },
  {
    slug: 'how-to-vibe-code-without-hitting-daily-limits',
    title: 'How to Vibe Code Without Worrying About Hitting Daily Limits',
    category: 'Workflows',
    author: 'Himansh Shivhare',
    fullDate: 'September 29, 2026',
    readTime: '6 MIN'
  },
  {
    slug: 'shared-memory-chatgpt-claude-cursor',
    title: 'How to Maintain Consistent Memory Across ChatGPT, Claude Code, and Cursor',
    category: 'Workflows',
    author: 'Himansh Shivhare',
    fullDate: 'August 14, 2026',
    readTime: '7 MIN'
  },
  {
    slug: 'mcp-persistent-memory',
    title: 'How to Give Claude Desktop Persistent Memory using MCP',
    category: 'MCP Server',
    author: 'Himansh Shivhare',
    fullDate: 'June 15, 2026',
    readTime: '4 MIN'
  },
  {
    slug: 'vscode-mcp-persistent-memory',
    title: 'How to Enable Persistent Codebase Memory in VS Code with MCP and Cline',
    category: 'MCP Server',
    author: 'Himansh Shivhare',
    fullDate: 'June 2, 2026',
    readTime: '5 MIN'
  },
  {
    slug: 'claude-code-memory-ingestion',
    title: 'Building Persistent Terminal Sessions: Claude Code Memory Ingestion',
    category: 'CLI Plugins',
    author: 'Himansh Shivhare',
    fullDate: 'May 18, 2026',
    readTime: '5 MIN'
  },
  {
    slug: 'openclaw-autonomous-memory',
    title: 'Persistent Memory for Autonomous Agents: OpenClaw and Memwyre',
    category: 'CLI Plugins',
    author: 'Himansh Shivhare',
    fullDate: 'May 4, 2026',
    readTime: '4 MIN'
  },
  {
    slug: 'cursor-vs-claude-code-context',
    title: 'Cursor AI vs Claude Code: Managing Context and Memory in IDEs',
    category: 'Comparisons',
    author: 'Himansh Shivhare',
    fullDate: 'April 22, 2026',
    readTime: '6 MIN'
  },
  {
    slug: 'state-of-ai-memory-2026',
    title: 'State of AI Memory 2026: The Shift from Stateless to Stateful Agent Networks',
    category: 'Architecture',
    author: 'Himansh Shivhare',
    fullDate: 'April 18, 2026',
    readTime: '5 MIN'
  },
  {
    slug: 'rag-vs-memory-long-term-knowledge',
    title: 'RAG vs. AI Memory: Choosing the Right Approach for Long-Term Knowledge',
    category: 'Architecture',
    author: 'Himansh Shivhare',
    fullDate: 'April 9, 2026',
    readTime: '6 MIN'
  },
  {
    slug: 'what-is-ai-memory',
    title: 'What is AI Memory? The Architecture of Long-Term Context',
    category: 'Research',
    author: 'Himansh Shivhare',
    fullDate: 'June 24, 2026',
    readTime: '15 MIN'
  },
  {
    slug: 'ai-memory-benchmark-locomo',
    title: 'LoCoMo Benchmark: Evaluation of AI Memory',
    category: 'Research',
    author: 'Himansh Shivhare',
    fullDate: 'June 24, 2026',
    readTime: '12 MIN'
  }
];

const markdownFiles = import.meta.glob('../assets/blog/*.md', { query: '?raw', import: 'default' });

const renderMermaid = async () => {
  if (typeof window === 'undefined') return;
  const containers = document.querySelectorAll('.mermaid-container');
  for (let i = 0; i < containers.length; i++) {
    const el = containers[i];
    const b64 = el.getAttribute('data-mermaid');
    if (el.querySelector('svg')) continue; // Already rendered
    if (b64) {
      try {
        const text = decodeURIComponent(escape(window.atob(b64)));
        const id = `mermaid-svg-${Date.now()}-${i}`;
        const { svg } = await mermaid.render(id, text);
        el.innerHTML = svg;
      } catch (mermaidError) {
        console.error('Mermaid render error:', mermaidError);
        el.innerHTML = '<span class="text-red-500 text-sm">Failed to render diagram. Check console.</span>';
      }
    }
  }
};

const loadPost = async (slug) => {
  isLoading.value = true;
  error.value = null;
  
  const filePath = `../assets/blog/${slug}.md`;
  
  if (markdownFiles[filePath]) {
    try {
      const rawMd = await markdownFiles[filePath]();
      rawContent.value = rawMd;
      
      const lines = rawMd.split(/\r?\n/);
      if (lines[0] && lines[0].startsWith('# ')) {
        lines.shift();
      }
      const cleanedMd = lines.join('\n');
      parsedHtml.value = marked.parse(cleanedMd);
    } catch (err) {
      console.error(err);
      error.value = 'Failed to load the article.';
    } finally {
      isLoading.value = false;
      
      if (typeof window !== 'undefined') {
        setTimeout(async () => {
          await renderMermaid();
        }, 50);
      }
    }
  } else {
    error.value = 'Article not found.';
    isLoading.value = false;
  }
};

// Scrollspy Observer
let observer = null;
const setupScrollObserver = () => {
  if (typeof window === 'undefined') return;
  if (observer) observer.disconnect();

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -75% 0px',
    threshold: 0
  });

  nextTick(() => {
    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    headings.forEach((h) => {
      observer.observe(h);
    });
  });
};

watch(parsedHtml, () => {
  setTimeout(() => {
    setupScrollObserver();
  }, 200);
});

// Initial state load check: handle server vs client hydration
const isServer = typeof window === 'undefined';
let preRenderedContent = '';

if (!isServer && window.__BLOG_POST_DATA__ && window.__BLOG_POST_DATA__.slug === route.params.slug) {
  preRenderedContent = window.__BLOG_POST_DATA__.content;
}

if (preRenderedContent) {
  rawContent.value = preRenderedContent;
  const lines = preRenderedContent.split(/\r?\n/);
  if (lines[0] && lines[0].startsWith('# ')) {
    lines.shift();
  }
  const cleanedMd = lines.join('\n');
  parsedHtml.value = marked.parse(cleanedMd);
  isLoading.value = false;
} else {
  const loadPromise = loadPost(route.params.slug);
  
  if (isServer) {
    onServerPrefetch(async () => {
      try {
        await loadPromise;
      } catch (err) {
        console.error('Prefetch error:', err);
      }
    });
  }
}

onMounted(() => {
  try {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    });
  } catch (initError) {
    console.error('Mermaid initialization failed:', initError);
  }

  setTimeout(() => {
    renderMermaid();
    setupScrollObserver();
  }, 200);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadPost(newSlug);
  }
});

// Meta helpers
const currentPost = computed(() => recentPosts.find(p => p.slug === route.params.slug));
const pageUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '');
const pageTitle = computed(() => currentPost.value ? currentPost.value.title : 'Memwyre Guide');
</script>

<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="min-h-screen bg-white dark:bg-[#0c0c0c] pt-24 flex flex-col items-center justify-center font-sans">
    <div class="w-10 h-10 border-4 border-gray-300 dark:border-gray-800 border-t-[#D97757] rounded-full animate-spin"></div>
    <p class="mt-4 text-sm text-gray-400 dark:text-gray-500 font-mono">Loading article...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="min-h-screen bg-white dark:bg-[#0c0c0c] pt-24 px-6 flex flex-col items-center justify-center font-sans">
    <div class="bg-red-500/5 border border-red-500/20 text-red-500 rounded p-8 text-center max-w-md w-full">
      <h2 class="text-lg font-semibold mb-2">Error</h2>
      <p class="text-sm font-light mb-6">{{ error }}</p>
      <router-link to="/blog" class="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-150 transition-colors">
        Return to Blog Home
      </router-link>
    </div>
  </div>

  <!-- Article Flow with Unified ArticleLayout -->
  <ArticleLayout
    v-else
    :section="currentPost?.category === 'Research' ? 'Research' : 'Blog'"
    :section-to="currentPost?.category === 'Research' ? '/research' : '/blog'"
    :category="currentPost?.category || 'Engineering'"
    :category-to="currentPost?.category && currentPost?.category !== 'Research' ? { path: '/blog', query: { category: currentPost?.category } } : null"
    :date="currentPost?.fullDate || 'June 24, 2026'"
    :read-time="currentPost?.readTime || '5 MIN'"
    :toc="toc"
    v-model:active-section="activeSection"
    :share-title="pageTitle"
    :cover-image="`/blog-covers/${route.params.slug}.png`"
    :cover-alt="currentPost?.title || 'Blog Cover'"
  >
    <template #title>
      <h1 v-if="route.params.slug === 'what-is-ai-memory'" class="font-sans font-normal text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.2] text-black dark:text-white">
        What is AI Memory? <br />
        <span class="font-normal text-neutral-900 dark:text-gray-100">The Architecture of <span class="inline-block bg-[#D97757] text-white px-2.5 py-0.5 font-normal rounded-xs">Long-Term Context.</span></span>
      </h1>
      <h1 v-else-if="route.params.slug === 'ai-memory-benchmark-locomo'" class="font-sans font-normal text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.2] text-black dark:text-white">
        LoCoMo Benchmark <br />
        <span class="font-normal text-neutral-900 dark:text-gray-100">Evaluation of <span class="inline-block bg-[#D97757] text-white px-2.5 py-0.5 font-normal rounded-xs">AI Memory.</span></span>
      </h1>
      <h1 v-else class="font-sans font-normal text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.2] text-black dark:text-white">
        {{ currentPost?.title || 'Memwyre Guide' }}
      </h1>
    </template>

    <!-- Parsed Markdown HTML -->
    <div class="markdown-content mb-16 animate-fade-in" v-html="parsedHtml"></div>

    <!-- Read Next section -->
    <template #footer>
      <div class="pt-10 border-t border-gray-100 dark:border-gray-900">
        <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-6 pb-2 border-b border-gray-100 dark:border-gray-900 font-mono">
          Read Next
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="post in recentPosts.filter(p => p.slug !== route.params.slug).slice(0, 3)" 
            :key="post.slug"
            class="group flex flex-col justify-between p-4 rounded-none border border-gray-150 dark:border-zinc-800 hover:border-[#D97757] dark:hover:border-[#D97757] transition-all duration-200 bg-gray-50/35 dark:bg-[#151515]/25"
          >
            <h4 class="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors leading-snug mb-3">
              <router-link :to="post.category === 'Research' ? `/research/${post.slug}` : `/blog/${post.slug}`">
                {{ post.title }}
              </router-link>
            </h4>
            <router-link 
              :to="post.category === 'Research' ? `/research/${post.slug}` : `/blog/${post.slug}`"
              class="inline-flex items-center gap-1 text-[11px] font-bold text-[#D97757] hover:text-[#c05c3d] transition-colors duration-150 font-mono"
            >
              Read &rarr;
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </ArticleLayout>
</template>

<style>
/* CSS Styles for Parsed Markdown Content */
.markdown-content {
  font-family: inherit;
  color: var(--vp-c-text-1, #374151);
}

/* Mermaid Diagram Styling */
.markdown-content .mermaid-container {
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  margin: 36px 0;
  width: 100%;
}

.markdown-content .mermaid-container svg {
  max-width: 100%;
  height: auto;
}

/* Force dark text for mermaid node labels in both dark/light mode for readability */
.markdown-content .mermaid-container text,
.markdown-content .mermaid-container text *,
.markdown-content .mermaid-container .node text,
.markdown-content .mermaid-container .node span,
.markdown-content .mermaid-container .node .label,
.markdown-content .mermaid-container .node .label *,
.markdown-content .mermaid-container .edgeLabel text,
.markdown-content .mermaid-container .edgeLabel span {
  color: #111827 !important;
  fill: #111827 !important;
}

.markdown-content .mermaid-container .node .label {
  font-family: inherit !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
}

.markdown-content .mermaid-container .node .label b {
  font-size: 14px !important;
  font-weight: 700 !important;
  display: block;
  margin: 2px 0;
}

.markdown-content .mermaid-container .node .label font {
  font-size: 11px !important;
  color: #4b5563 !important;
  display: block;
  font-weight: 400 !important;
  line-height: 1.3 !important;
  margin-top: 2px;
}

.dark .markdown-content {
  color: #d1d5db;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
  font-family: inherit;
  color: #000000;
  line-height: 1.25;
  margin-top: 36px;
  margin-bottom: 16px;
  scroll-margin-top: 100px;
}

.dark .markdown-content h1,
.dark .markdown-content h2,
.dark .markdown-content h3,
.dark .markdown-content h4 {
  color: #ffffff;
}

.markdown-content h1 {
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.markdown-content h2 {
  font-size: 26px;
  font-weight: 450;
  letter-spacing: -0.015em;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  padding-bottom: 8px;
}

.dark .markdown-content h2 {
  border-bottom-color: rgba(255,255,255,0.06);
}

.markdown-content h3 {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.markdown-content p {
  font-size: 15.5px;
  line-height: 1.75;
  font-weight: 400;
  color: #111111;
  margin-top: 0;
  margin-bottom: 20px;
}

.dark .markdown-content p {
  color: #d1d5db;
}

.markdown-content a {
  color: #D97757;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.markdown-content a:hover {
  color: #c05c3d;
}

.markdown-content ul,
.markdown-content ol {
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 24px;
}

.markdown-content li {
  font-size: 15.5px;
  line-height: 1.75;
  font-weight: 400;
  color: #111111;
  margin-bottom: 8px;
}

.dark .markdown-content li {
  color: #d1d5db;
}

.markdown-content pre {
  background: #f4f4f5;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  margin-top: 20px;
  margin-bottom: 24px;
}

.dark .markdown-content pre {
  background: #18181b;
  border-color: #27272a;
}

.markdown-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  background: #f4f4f5;
  color: #0f0f10;
  padding: 3px 6px;
  border-radius: 4px;
  border: 1px solid #e4e4e7;
  word-break: break-word;
}

.dark .markdown-content code {
  background: #18181b;
  color: #f3f4f6;
  border-color: #27272a;
}

.markdown-content pre code {
  padding: 0;
  background: transparent;
  color: inherit;
  border: none;
  font-size: 13px;
}

.markdown-content blockquote {
  border-left: 4px solid #D97757;
  padding-left: 20px;
  font-style: italic;
  color: #4b5563;
  margin: 24px 0;
}

.dark .markdown-content blockquote {
  color: #9ca3af;
}

.markdown-content table {
  display: block;
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 24px;
  font-size: 14px;
}

.markdown-content th,
.markdown-content td {
  padding: 10px 14px;
  border: 1px solid #e4e4e7;
  text-align: left;
}

.dark .markdown-content th,
.dark .markdown-content td {
  border-color: #27272a;
}

.markdown-content th {
  background: #f4f4f5;
  font-weight: 600;
}

.dark .markdown-content th {
  background: #18181b;
}

.markdown-content hr {
  border: 0;
  border-top: 1px solid #e4e4e7;
  margin: 32px 0;
}

.dark .markdown-content hr {
  border-top-color: #27272a;
}
</style>
