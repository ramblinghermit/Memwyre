<template>
  <ArticleLayout
    section-label="Solutions"
    section-to="/plugins"
    category="Cross-Agent Sync"
    date="NOVEMBER 2026"
    read-time="12 MIN READ · MULTI-AGENT WORKFLOW ARCHITECTURE"
    author-name="Himansh Shivhare"
    author-role="Founder & Lead Architect"
    author-avatar="https://avatars.githubusercontent.com/u/170114968?v=4"
    :toc="toc"
    v-model:active-section="activeSection"
    share-label="SHARE THIS GUIDE"
  >
    <template #sidebar-links>
      <div class="space-y-2 pt-6 border-t border-gray-100 dark:border-gray-900">
        <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">RELATED INTEGRATIONS</div>
        <router-link 
          to="/opencode-memory" 
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          OpenCode Memory Plugin
        </router-link>
        <router-link 
          to="/cursor-memory" 
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          Cursor AI Memory Layer
        </router-link>
        <router-link 
          to="/claude-memory" 
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          Claude Code CLI Memory
        </router-link>
        <router-link 
          to="/mcp-memory" 
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          Universal MCP Memory Server
        </router-link>
        <router-link 
          to="/ai-memory-benchmark-locomo" 
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          LoCoMo Benchmark (70.5%)
        </router-link>
      </div>

      <!-- Share Buttons -->
      <div class="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-900">
        <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold">SHARE THIS GUIDE</div>
        <div class="flex items-center gap-2">
          <button 
            @click="copyLink"
            class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111] cursor-pointer"
            title="Copy link"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>
    </template>

    <template #title>
      <h1 class="font-sans font-normal text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.2] text-black dark:text-white">
        Cross-Agent Coding Memory: <br />
        <span class="font-normal text-neutral-900 dark:text-gray-100">Synchronize Context Across <span class="inline-block bg-[#D97757] text-white px-2.5 py-0.5 font-normal rounded-xs">OpenCode, Cursor &amp; Claude Code.</span></span>
      </h1>
    </template>

    <div class="markdown-content space-y-12 animate-fade-in">
      <!-- Verified Badge -->
      <div class="mb-8 p-3.5 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50/60 dark:bg-zinc-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400 font-mono">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="font-bold text-gray-900 dark:text-white uppercase">UNIFIED AGENT PROTOCOL</span>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-[11px]">
          <span>Clients: <strong>OpenCode, Cursor Composer, Claude Code CLI</strong></span>
          <span>Sync Protocol: <strong>MCP + Hook Daemon</strong></span>
          <span>Latency: <strong>&lt; 280ms Retrieval</strong></span>
        </div>
      </div>

      <!-- TL;DR -->
      <h2 id="tldr">TL;DR: The Multi-Agent Silo Problem</h2>
      <p>
        Modern developers rarely use just one AI tool. You design schemas in <strong>Claude Code</strong>, execute multi-file refactors in <strong>Cursor Composer</strong>, run headless background testing tasks in <strong>OpenCode</strong>, and troubleshoot in <strong>ChatGPT</strong>.
      </p>
      <p>
        By default, each coding agent operates in total isolation. An architectural decision finalized in OpenCode is completely invisible to Cursor. When switching tools, you waste valuable minutes re-explaining boundaries, re-uploading context, and paying for redundant context tokens.
      </p>
      <div class="flex flex-wrap gap-3 my-6">
        <router-link to="/signup" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
          Get Universal API Key →
        </router-link>
        <router-link to="/mcp" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Explore MCP Gateway
        </router-link>
      </div>

      <!-- Quick Summary Box -->
      <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm my-6">
        <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
        <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
        <div class="space-y-2">
          <div class="text-[#D97757] font-mono text-xs uppercase font-bold tracking-wider">The Solution / Key Takeaway</div>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
            <strong>Memwyre connects every AI coding agent to a single, persistent knowledge graph.</strong> By configuring a shared <code>MEMWYRE_API_KEY</code> across the OpenCode plugin, Claude Code CLI lifecycle hooks, and the Cursor MCP server, memories auto-captured in one tool become instantly queryable in all others in real time without context duplication or local RAM bloat.
          </p>
        </div>
      </div>

      <!-- Metric Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
        <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
          <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
          <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
          <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">100%</div>
          <div class="mt-2">
            <div class="text-gray-900 dark:text-white font-bold text-base">Cross-Tool Sync</div>
            <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">OpenCode ↔ Cursor ↔ Claude</div>
          </div>
        </div>

        <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
          <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
          <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
          <div class="text-gray-900 dark:text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">&lt;300ms</div>
          <div class="mt-2">
            <div class="text-gray-900 dark:text-white font-bold text-base">Recall Latency</div>
            <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Zero Index Rebuilding</div>
          </div>
        </div>

        <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
          <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
          <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
          <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">-81%</div>
          <div class="mt-2">
            <div class="text-gray-900 dark:text-white font-bold text-base">Token Reduction</div>
            <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">No Bloated memory.md Files</div>
          </div>
        </div>
      </div>

      <!-- Architecture Diagram -->
      <h2 id="cross-agent-architecture">Cross-Agent Synchronization Architecture</h2>
      <p>
        Rather than storing flat Markdown files in every repo or forcing each AI to re-index your entire directory tree with embeddings, Memwyre uses a cloud or local SQLite entity graph with AST-level entity extraction:
      </p>

      <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm font-mono text-xs">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
          <span class="font-bold uppercase tracking-wider text-gray-900 dark:text-white">Multi-Agent Shared Knowledge Topology</span>
          <span class="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Single Tenant Brain Vault</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div class="p-4 bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800 space-y-2">
            <div class="text-[#D97757] font-bold">1. OpenCode CLI</div>
            <div class="text-[11px] text-gray-600 dark:text-gray-400">Captures debugging lessons, DB migration rules &amp; test failures on terminal exit</div>
            <div class="text-[10px] bg-gray-100 dark:bg-zinc-900 p-1 rounded text-gray-500">Auto-Hook: SessionEnd</div>
          </div>

          <div class="p-4 bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800 space-y-2">
            <div class="text-[#D97757] font-bold">2. Memwyre Vault</div>
            <div class="text-[11px] text-gray-600 dark:text-gray-400">Reconciles entities, applies Ebbinghaus decay, removes contradictions &amp; indexes triples</div>
            <div class="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 p-1 rounded">Universal Brain</div>
          </div>

          <div class="p-4 bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800 space-y-2">
            <div class="text-[#D97757] font-bold">3. Cursor &amp; Claude Code</div>
            <div class="text-[11px] text-gray-600 dark:text-gray-400">Directly retrieves learned facts via MCP Gateway or session initialization</div>
            <div class="text-[10px] bg-gray-100 dark:bg-zinc-900 p-1 rounded text-gray-500">Auto-Recall: Top 3-5 Facts</div>
          </div>
        </div>
      </div>

      <h2 id="opencode-claude-sync">OpenCode &amp; Claude Code Synchronization</h2>
      <p>
        The combination of OpenCode and Claude Code is becoming standard for high-throughput engineering teams. For example, you may run autonomous refactors in OpenCode, and then use Claude Code CLI to perform strict security reviews.
      </p>
      <p>
        Here is how context flows bi-directionally between them:
      </p>
      <ul>
        <li><strong>When OpenCode finishes:</strong> The <code>@memwyre/opencode-plugin</code> extracts key architectural choices (e.g. <em>"Switched Auth to JWT with 15-minute rotation"</em>) and updates your tenant vault.</li>
        <li><strong>When Claude Code launches:</strong> The Memwyre Claude Code lifecycle hook queries the vault for the active workspace repo and injects those exact architectural constraints before Claude generates code.</li>
      </ul>

      <h2 id="cursor-shared-memory">Cursor Shared Memory: Eliminating Index Rebuilds</h2>
      <p>
        Cursor IDE's native codebase indexing relies on static vector embeddings over files. However, vector embeddings do not capture <em>decisions made outside files</em> (such as verbal architectural guidelines discussed in chat).
      </p>
      <p>
        Connecting Cursor to Memwyre provides:
      </p>
      <ol>
        <li><strong>Dynamic Context Injection:</strong> Cursor Composer queries your Memwyre MCP memory server to understand project conventions without waiting 10 minutes for index re-computation.</li>
        <li><strong>Cross-Session Continuity:</strong> When you open a fresh Cursor chat tab, Composer immediately knows what was resolved in previous chats.</li>
        <li><strong>Multi-Branch Awareness:</strong> Memories can be scoped to your active Git branch or elevated to global project architecture.</li>
      </ol>

      <h2 id="mcp-workflow-setup">Quick Setup: Connect All Three in 3 Minutes</h2>
      <div class="space-y-4">
        <h3 id="step-1-opencode">1. OpenCode Configuration</h3>
        <p>In your project root or global config (<code>~/.config/opencode/opencode.json</code>):</p>
        <pre><code class="language-json">{
  "plugins": ["@memwyre/opencode-plugin"],
  "env": {
    "MEMWYRE_API_KEY": "YOUR_MEMWYRE_KEY"
  }
}</code></pre>

        <h3 id="step-2-cursor">2. Cursor Configuration</h3>
        <p>Add the Memwyre MCP server to <code>~/.cursor/mcp.json</code>:</p>
        <pre><code class="language-json">{
  "mcpServers": {
    "memwyre": {
      "command": "npx",
      "args": ["-y", "@memwyre/mcp-server"],
      "env": {
        "MEMWYRE_API_KEY": "YOUR_MEMWYRE_KEY"
      }
    }
  }
}</code></pre>

        <h3 id="step-3-claude">3. Claude Code Configuration</h3>
        <p>Add Memwyre MCP to Claude Code CLI:</p>
        <pre><code class="language-bash">claude mcp add memwyre -- npx -y @memwyre/mcp-server</code></pre>
      </div>

      <h2 id="faq">Frequently Asked Questions</h2>
      <div class="space-y-4 my-6">
        <details v-for="(faq, index) in faqs" :key="index" class="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-lg">
          <summary class="font-semibold cursor-pointer outline-none">{{ faq.question }}</summary>
          <div class="mt-2 text-sm text-gray-600 dark:text-gray-400" v-html="faq.answer"></div>
        </details>
      </div>
    </div>
  </ArticleLayout>
</template>

<script setup>
import ArticleLayout from '@/components/ArticleLayout.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const activeSection = ref('tldr');

const copyLink = () => {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
};

const toc = [
  {
    text: 'Overview & Silo Problem',
    slug: 'tldr',
    children: [
      { text: 'The Multi-Agent Problem', slug: 'tldr' },
      { text: 'Synchronization Architecture', slug: 'cross-agent-architecture' }
    ]
  },
  {
    text: 'Tool Integrations',
    slug: 'opencode-claude-sync',
    children: [
      { text: 'OpenCode & Claude Code Sync', slug: 'opencode-claude-sync' },
      { text: 'Cursor Shared Memory', slug: 'cursor-shared-memory' }
    ]
  },
  {
    text: 'Setup & FAQ',
    slug: 'mcp-workflow-setup',
    children: [
      { text: '3-Minute Multi-Tool Setup', slug: 'mcp-workflow-setup' },
      { text: 'Frequently Asked Questions', slug: 'faq' }
    ]
  }
];

const faqs = [
  {
    question: 'How do I sync memory between OpenCode and Claude Code (opencode-claude-memory)?',
    answer: 'By configuring both OpenCode and Claude Code with your single Memwyre API key. The OpenCode lifecycle plugin captures architecture deltas when sessions end, while Claude Code retrieves those entities via its MCP server on startup, eliminating the need to re-explain project context.'
  },
  {
    question: 'Can Cursor Composer access memories captured in terminal CLI sessions (cursor shared memory)?',
    answer: 'Yes. Memwyre provides a universal Model Context Protocol (MCP) server. Once added to Cursor\'s <code>mcp.json</code>, Composer can execute semantic lookups against memories recorded by OpenCode, Claude Code, or browser extensions in sub-300ms.'
  },
  {
    question: 'How do I add persistent memory to an MCP agent workflow?',
    answer: 'Run <code>npx -y @memwyre/mcp-server</code> with your <code>MEMWYRE_API_KEY</code>. Any agent framework supporting the MCP standard (Anthropic, Cursor, Windsurf, LangChain, AutoGen) can immediately call <code>memwyre_search</code> and <code>memwyre_save</code> tools.'
  },
  {
    question: 'Does sharing memory across different LLMs (Claude 3.7 vs GPT-4o vs Grok) cause hallucinations?',
    answer: 'No. Memwyre standardizes memories into language-agnostic Subject-Predicate-Object (SPO) entity triples with explicit confidence ratings and timestamps. Because raw ambiguous prose is parsed into structured facts, any foundation model can consume the context without format bias.'
  }
];

let observer = null;
onMounted(() => {
  if (typeof window !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -75% 0px',
      threshold: 0.1
    });

    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    headings.forEach((h) => observer.observe(h));
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.markdown-content h2,
.markdown-content h3 {
  font-family: inherit;
  color: #111827;
  line-height: 1.25;
  margin-top: 36px;
  margin-bottom: 16px;
  scroll-margin-top: 100px;
}

.dark .markdown-content h2,
.dark .markdown-content h3 {
  color: #f3f4f6;
}

.markdown-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.dark .markdown-content h2 {
  border-bottom-color: #374151;
}

.markdown-content pre {
  background-color: #f8fafc;
  color: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  overflow-x: auto;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
}

.dark .markdown-content pre {
  background-color: #18181b;
  color: #f4f4f5;
  border: 1px solid #27272a;
}

.markdown-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
