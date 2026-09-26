<script setup>
import { ref, computed } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';
import NumericBgAnimation from '@/components/landing/NumericBgAnimation.vue';

const copiedText = ref('');
const copyCommand = (cmd) => {
  navigator.clipboard.writeText(cmd);
  copiedText.value = cmd;
  setTimeout(() => {
    copiedText.value = '';
  }, 2000);
};

const selectedCategory = ref('All');
const categories = ['All', 'Workflows', 'MCP Server', 'CLI Plugins', 'Comparisons', 'Architecture'];

const posts = ref([
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
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left pb-6 sm:pb-8">
        <!-- Monospaced Kicker with Status Indicator -->
        <div class="inline-flex items-center gap-2 mb-2.5 sm:mb-3 px-3 py-1 rounded-full bg-white/80 border border-gray-200/80 shadow-2xs">
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97756] animate-pulse"></span>
          <span class="text-[11px] font-bold font-mono tracking-[0.15em] uppercase text-gray-500">Engineering Insights & Guides</span>
        </div>

        <!-- Headline (Larger presence) -->
        <h1 class="hero-serif text-4xl sm:text-5xl md:text-6xl lg:text-[66px] tracking-[-0.02em] leading-[1.08] text-[rgb(1,1,16)] max-w-4xl">
          The Memwyre Blog
        </h1>

        <!-- Subtitle (Clean compact size) -->
        <p class="text-xs sm:text-[14px] text-gray-500 leading-relaxed mt-2.5 sm:mt-3 max-w-2xl font-normal">
          Deep dives into Model Context Protocol (MCP), persistent context caching, vector graphs, and stateful agent workflows.
        </p>

        <!-- Command Installer Snippet -->
        <div class="mt-4 sm:mt-5 flex items-center justify-start">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/90 border border-gray-200/90 shadow-2xs font-mono text-[11px] sm:text-xs text-gray-700">
            <span class="text-[#D97756] font-bold select-none">$</span>
            <span class="select-all">npx -y install-memwyre</span>
            <button 
              @click="copyCommand('npx -y install-memwyre')" 
              class="ml-2 text-[10px] sm:text-[11px] font-semibold text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              {{ copiedText === 'npx -y install-memwyre' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>

        <!-- Interactive Category Filter Pills -->
        <div class="mt-5 sm:mt-6 flex items-center justify-start flex-wrap gap-1.5 sm:gap-2">
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
          class="group relative flex flex-col justify-between p-6 sm:p-7 bg-white border border-gray-200/90 rounded-[22px] hover:border-gray-400 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div>
            <!-- Cover Image (clean 16:9 ratio with rounded-xl) -->
            <div class="w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-gray-50 border border-gray-100 flex items-center justify-center">
              <img 
                :src="`/blog-covers/${post.slug}.png`" 
                :alt="post.title" 
                class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                @error="$event.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'"
              />
            </div>

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
            <h2 class="text-[17px] font-semibold text-gray-900 group-hover:text-black mb-2.5 leading-snug tracking-tight">
              <router-link :to="`/blog/${post.slug}`">
                {{ post.title }}
              </router-link>
            </h2>
            
            <!-- Excerpt -->
            <p class="text-[13.5px] text-gray-600 leading-relaxed font-normal mb-5 line-clamp-3">
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
