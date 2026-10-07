<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SiteFooter from '@/components/SiteFooter.vue';
import NumericBgAnimation from '@/components/landing/NumericBgAnimation.vue';

const route = useRoute();
const router = useRouter();

const copiedText = ref('');
const copyCommand = (cmd) => {
  navigator.clipboard.writeText(cmd);
  copiedText.value = cmd;
  setTimeout(() => {
    copiedText.value = '';
  }, 2000);
};

const categories = ['All', 'Workflows', 'MCP Server', 'CLI Plugins', 'Comparisons', 'Architecture'];
const selectedCategory = ref(
  (route.query.category && categories.includes(route.query.category))
    ? route.query.category
    : 'All'
);

watch(() => route.query.category, (newCat) => {
  if (newCat && categories.includes(newCat)) {
    selectedCategory.value = newCat;
  } else if (!newCat) {
    selectedCategory.value = 'All';
  }
});

const posts = ref([
  {
    slug: 'muse-code-persistent-memory',
    category: 'CLI Plugins',
    title: 'How to Give Muse Code Persistent Memory: The Complete Developer Guide to Lifecycle Hooks, MCP, and Cross-Agent Context Sync',
    excerpt: "Meta's Muse Code resets its context on every session. This guide reveals how to bypass the memory cliff using deterministic lifecycle hooks, explains why standard export MEMWYRE_API_KEY fails, and provides a production-ready plugin with file-based auth, MCP tools, and slash command skills.",
    readTime: '14 min read',
    date: 'Oct 01, 2026'
  },
  {
    slug: 'openai-dots-memory',
    category: 'MCP Server',
    title: 'How to Give OpenAI Dots Persistent Memory with Memwyre',
    excerpt: "OpenAI Dots are always-on ChatGPT agents powered by GPT-6 Astra. Connect Memwyre's MCP server to ChatGPT to give your Dots true cross-tool institutional memory.",
    readTime: '5 min read',
    date: 'Oct 01, 2026'
  },
  {
    slug: 'best-ai-agent-memories',
    category: 'Architecture',
    title: 'Best AI Agent Memory Systems in 2026: Architectures, Benchmarks & Comparison',
    excerpt: 'An in-depth breakdown of the leading AI agent memory systems in 2026. Compare Memwyre, Mem0, Letta, Zep, and LangMem across SPO triples, token efficiency, and benchmarks.',
    readTime: '8 min read',
    date: 'Sep 29, 2026'
  },
  {
    slug: 'best-alternatives-to-mem0',
    category: 'Comparisons',
    title: 'The 5 Best Alternatives to Mem0 in 2026: Features, Tradeoffs & Benchmarks',
    excerpt: 'Looking for Mem0 alternatives? Compare the top 5 memory frameworks for AI agents and LLMs including Memwyre, Letta, Zep, LangMem, and Supermemory.',
    readTime: '7 min read',
    date: 'Sep 29, 2026'
  },
  {
    slug: 'how-to-vibe-code-without-hitting-daily-limits',
    category: 'Workflows',
    title: 'How to Vibe Code Without Worrying About Hitting Daily Limits',
    excerpt: 'Learn why heavy vibe coding burns your daily Claude and Cursor limits in hours, and master the 5-step playbook to code continuously with external MCP memory.',
    readTime: '6 min read',
    date: 'Sep 29, 2026'
  },
  {
    slug: 'shared-memory-chatgpt-claude-cursor',
    category: 'Workflows',
    title: 'How to Maintain Consistent Memory Across ChatGPT, Claude Code, and Cursor',
    excerpt: 'Stop copy-pasting architecture context between ChatGPT, Claude Code, and Cursor. Build a synchronized cross-tool knowledge graph using Memwyre.',
    readTime: '7 min read',
    date: 'Aug 14, 2026'
  },
  {
    slug: 'mcp-persistent-memory',
    category: 'MCP Server',
    title: 'How to Give Claude Desktop Persistent Memory using MCP',
    excerpt: 'Claude Desktop is powerful but stateless. Learn how to configure Memwyre as a local Model Context Protocol (MCP) server to store and query context across chat sessions.',
    readTime: '4 min read',
    date: 'Jun 15, 2026'
  },
  {
    slug: 'vscode-mcp-persistent-memory',
    category: 'MCP Server',
    title: 'How to Enable Persistent Codebase Memory in VS Code with MCP and Cline',
    excerpt: 'Give your VS Code AI agents (Cline, Roo-Code) a persistent memory layer. Step-by-step setup using the remote Memwyre MCP gateway.',
    readTime: '5 min read',
    date: 'Jun 02, 2026'
  },
  {
    slug: 'claude-code-memory-ingestion',
    category: 'CLI Plugins',
    title: 'Building Persistent Terminal Sessions: Claude Code Memory Ingestion',
    excerpt: "Anthropic's Claude Code CLI is incredibly fast. Integrate Memwyre hooks to automatically inject project memory on launch and ingest transcripts on exit.",
    readTime: '5 min read',
    date: 'May 18, 2026'
  },
  {
    slug: 'openclaw-autonomous-memory',
    category: 'CLI Plugins',
    title: 'Persistent Memory for Autonomous Agents: OpenClaw and Memwyre',
    excerpt: 'Autonomous agent workflows suffer from amnesia. Learn how to load the Memwyre OpenClaw plugin and enable the agent to query and update your vault.',
    readTime: '4 min read',
    date: 'May 04, 2026'
  },
  {
    slug: 'cursor-vs-claude-code-context',
    category: 'Comparisons',
    title: 'Cursor AI vs Claude Code: Managing Context and Memory in IDEs',
    excerpt: 'A technical breakdown comparing how Cursor AI and Claude Code manage workspace context, and how to extend both with Memwyre.',
    readTime: '6 min read',
    date: 'Apr 22, 2026'
  },
  {
    slug: 'state-of-ai-memory-2026',
    category: 'Architecture',
    title: 'State of AI Memory 2026: The Shift from Stateless to Stateful Agent Networks',
    excerpt: 'An inspection of context window explosion and why stateless attention buffers create substantial financial and latency overheads for enterprise codebase scale.',
    readTime: '5 min read',
    date: 'Apr 18, 2026'
  },
  {
    slug: 'rag-vs-memory-long-term-knowledge',
    category: 'Architecture',
    title: 'RAG vs. AI Memory: Choosing the Right Approach for Long-Term Knowledge',
    excerpt: 'Why basic Vector RAG fails for developer workflows due to chunk fragmentation, and why entity-profile routing provides better context.',
    readTime: '6 min read',
    date: 'Apr 09, 2026'
  }
]);

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All') {
    return posts.value;
  }
  return posts.value.filter(post => post.category === selectedCategory.value);
});
</script>

<template>
  <div class="force-light relative min-h-[100svh] bg-white text-gray-900 font-sans selection:bg-[#D97757] selection:text-white [overflow-x:clip]">

    <!-- Hero & Articles Section -->
    <div class="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left pb-4 sm:pb-6">
        <h1 class="sr-only">The Memwyre Blog</h1>

        <!-- Interactive Category Filter Pills -->
        <div class="flex items-center justify-start flex-wrap gap-1.5 sm:gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
              selectedCategory === cat
                ? 'bg-black text-white shadow-2xs scale-[1.02]'
                : 'bg-white/80 hover:bg-gray-100 text-gray-600 border border-gray-200/80 hover:border-gray-300'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Articles Section (Standard 3-Column Grid) -->
      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-2 sm:pt-4 z-10">
      
      <!-- Articles Grid (All cards uniform, exactly as they were) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article 
          v-for="post in filteredPosts" 
          :key="post.slug"
          class="group relative flex flex-col justify-between p-6 sm:p-7 bg-white border border-gray-200/90 rounded-none hover:border-gray-400 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div>
            <!-- Cover Image (clickable, sharp edges) -->
            <router-link 
              :to="`/blog/${post.slug}`" 
              class="block w-full aspect-[16/9] rounded-none overflow-hidden mb-5 bg-gray-50 border border-gray-100 cursor-pointer"
            >
              <img 
                :src="`/blog-covers/${post.slug}.png`" 
                :alt="post.title" 
                class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                @error="$event.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'"
              />
            </router-link>

            <!-- Category & Read Time -->
            <div class="flex items-center justify-between mb-3">
              <span class="text-[11px] font-semibold text-[#D97756] bg-[#D97756]/10 border border-[#D97756]/20 px-2.5 py-0.5 rounded-full">
                {{ post.category }}
              </span>
              <span class="text-xs text-gray-400 font-normal">
                {{ post.readTime }}
              </span>
            </div>
            
            <!-- Title -->
            <h2 class="text-[17px] font-bold text-black group-hover:text-black mb-2.5 leading-snug tracking-tight">
              <router-link :to="`/blog/${post.slug}`">
                {{ post.title }}
              </router-link>
            </h2>
            
            <!-- Excerpt -->
            <p class="text-[13.5px] text-neutral-800 leading-relaxed font-normal mb-5 line-clamp-3">
              {{ post.excerpt }}
            </p>
          </div>

          <!-- Card Bottom -->
          <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <span class="text-xs text-gray-400 font-normal">
              {{ post.date }}
            </span>
            <router-link 
              :to="`/blog/${post.slug}`"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 group-hover:text-black hover:underline transition-colors"
            >
              <span>Read</span>
              <svg class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </div>

    <!-- SIGNATURE CRAFT PAPER DARK CTA & FOOTER (Matches Landing & Pricing) -->
    <div class="pt-16 sm:pt-20 pb-0 text-center relative overflow-hidden craft-paper-black z-30 mt-12 sm:mt-16">
      <!-- Craft Paper Noise & Fiber Texture -->
      <div class="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"></div>
        <div class="absolute inset-0 opacity-30 mix-blend-screen"
             style="background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 3px 3px;"></div>
        <svg class="absolute inset-0 w-full h-full opacity-[0.065] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          <filter id="craft-paper-grain-blog">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#craft-paper-grain-blog)" fill="white" />
        </svg>
      </div>

      <!-- Numeric background animation -->
      <NumericBgAnimation :invert="false" class="absolute inset-0 z-0 opacity-[0.13] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        <div class="max-w-3xl text-left">
          <h2 class="hero-serif text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.02em] leading-[1.05] text-white">
            The second brain <br class="hidden sm:inline" />
            <span class="block text-zinc-200">for your AI.</span>
          </h2>
          <p class="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
            Give every agent, IDE, and model synchronized long-term memory. Set up in under 2 minutes.
          </p>

          <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <router-link 
              to="/signup"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-white text-[#0c0d10] font-bold rounded-full hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 shadow-md text-sm sm:text-base inline-flex items-center justify-center"
            >
              Get Started &rarr;
            </router-link>
            <a 
              href="https://docs.memwyre.tech" 
              target="_blank"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-sm sm:text-base inline-flex items-center justify-center"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>

      <SiteFooter craft-paper class="!bg-transparent !mt-8 sm:!mt-10" />
    </div>

  </div>
</template>
