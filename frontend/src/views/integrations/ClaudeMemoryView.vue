<template>
  <div class="relative min-h-screen bg-white dark:bg-[#0c0c0c] pt-28 pb-0 [overflow-x:clip] font-sans">
    <!-- Grid Blueprint background line effects -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    <!-- Global Vertical Grid Lines -->
    <div class="hidden lg:block absolute top-0 bottom-0 left-6 sm:left-8 lg:left-[calc(50%-640px)] w-px bg-gray-300/80 dark:bg-gray-800/60 pointer-events-none select-none z-30"></div>
    <div class="hidden lg:block absolute top-0 bottom-0 right-6 sm:right-8 lg:right-[calc(50%-640px)] w-px bg-gray-300/80 dark:bg-gray-800/60 pointer-events-none select-none z-30"></div>

    <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 animate-fade-in">
      
      <!-- Back Navigation Header -->
      <div class="pt-6 mb-8">
        <router-link 
          to="/plugins" 
          class="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 dark:border-zinc-800 text-[10px]">&larr;</span>
          All Plugins
        </router-link>
      </div>

      <!-- Header Section -->
      <div class="space-y-4 mb-8 text-left">
        <div class="text-xs font-bold uppercase tracking-wider text-[#D97757] font-mono">
          INTEGRATION <span class="text-gray-300 dark:text-gray-700 mx-2">/</span> AUGUST 4, 2026
        </div>
        
        <h1 class="hero-serif text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.1] text-gray-950 dark:text-white">
          Claude Code Memory <br />
          <span class="italic font-medium text-gray-900 dark:text-gray-100">Persistent Long-Term Memory <span class="inline-block bg-[#D97757] text-white px-3 py-0.5 italic font-medium">Plugin.</span></span>
        </h1>

        <div class="text-[10px] tracking-wider uppercase font-bold font-mono text-gray-400 dark:text-gray-500 pt-2">
          12 MIN READ
        </div>
      </div>

      <!-- Section Separator Line -->
      <div class="-mx-6 sm:-mx-8 lg:-mx-12 h-px bg-gray-200 dark:bg-gray-850 pointer-events-none select-none"></div>

      <!-- 3-Column Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-0 pb-24">
        
        <!-- Left Sidebar (Author Info & Social Sharing) -->
        <aside class="lg:col-span-2 lg:border-r border-gray-200 dark:border-gray-800 lg:pr-8 pt-8 lg:pt-12 text-left">
          <div class="sticky top-24 space-y-8">
            <!-- Author Card -->
            <div class="flex items-center gap-3">
              <a href="https://linkedin.com/in/himansh-shivhare" target="_blank" rel="noopener noreferrer" class="flex-shrink-0 hover:opacity-80 transition-opacity">
                <img 
                  src="https://avatars.githubusercontent.com/u/170114968?v=4" 
                  alt="Himansh Shivhare" 
                  class="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-zinc-800"
                  @error="$event.target.src = 'https://ui-avatars.com/api/?name=Himansh+Shivhare&background=f3f4f6&color=333'"
                />
              </a>
              <div class="flex flex-col">
                <a href="https://linkedin.com/in/himansh-shivhare" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors">
                  Himansh Shivhare
                </a>
                <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Founder & Lead Architect
                </span>
                <span class="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wide font-mono">
                  Last Updated: August 4, 2026
                </span>
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold">SHARE THIS PAGE</div>
              <div class="flex items-center gap-2">
                <!-- LinkedIn -->
                <a 
                  :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`" 
                  target="_blank"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <!-- Twitter -->
                <a 
                  :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`" 
                  target="_blank"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <!-- Copy -->
                <button 
                  @click="copyLink"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111] cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Middle Column (Banner & Article Body) -->
        <main class="lg:col-span-8 px-0 lg:px-8 pt-0 lg:pt-12 text-left">
          
          <div class="markdown-content mb-16 animate-fade-in">
            <!-- Verified Environment & E-E-A-T Trust Badge -->
            <div class="mb-8 p-3.5 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50/60 dark:bg-zinc-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400 font-mono">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-bold text-gray-900 dark:text-white uppercase">VERIFIED ENVIRONMENT</span>
              </div>
              <div class="flex flex-wrap items-center gap-4 text-[11px]">
                <span>Tested on: <strong class="text-gray-800 dark:text-gray-200">macOS, Linux, WSL2</strong></span>
                <span>Runtime: <strong class="text-gray-800 dark:text-gray-200">Node.js v18+</strong></span>
                <span>License: <strong class="text-gray-800 dark:text-gray-200">Apache-2.0</strong></span>
              </div>
            </div>

            <!-- TL;DR -->
            <h2 id="tldr">TL;DR</h2>
            <p>
              Give Claude Code persistent memory across every session. The Memwyre plugin auto-injects past project context when you start a session and auto-captures decisions when you exit — no manual <code>CLAUDE.md</code> management needed.
            </p>
            <div class="flex flex-wrap gap-3 my-6">
              <router-link to="/signup" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Install Plugin Free →
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/plugins/claude" target="_blank" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Plugin Docs
              </a>
            </div>

            <h2 id="the-problem">The Problem: Claude Code Forgets Everything</h2>
            <p>
              Every time you close a Claude Code session, the context window resets. Your debugging breakthroughs, architecture decisions, database schema notes, and style conventions — all gone. You spend the first 5 minutes of every session re-explaining your project.
            </p>
            <p>
              Anthropic provides <code>CLAUDE.md</code> and auto-memory as built-in solutions, but they require manual maintenance, are limited to flat Markdown files, and don't share context across tools. If you use Claude Code <em>and</em> Claude Desktop <em>and</em> Cursor, each tool maintains its own isolated silo.
            </p>

            <h2 id="comparison">Four Approaches to Claude Code Memory</h2>
            <p>
              There is no single "right" approach — each method suits a different workflow. If you've researched this space, you've likely seen <strong>claude-mem</strong> (89K+ GitHub stars) alongside Anthropic's built-in options. Here is an honest breakdown of all four.
            </p>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Feature</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">CLAUDE.md / Auto-Memory</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">claude-mem (OSS)</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">MCP Memory Server</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6] dark:bg-orange-950/20">
                      <span class="text-[#D97757]">Memwyre Plugin</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Automation</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Manual edits</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Predictive (LLM decides when to save)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Predictive (LLM decides when to use tool)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Deterministic (Always runs on SessionStart/Stop)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Storage</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Flat Markdown file</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Local SQLite + ChromaDB</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Varies (cloud or local)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Cloud vault + entity graph</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Setup</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Manual file creation</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800"><code>npx claude-mem install</code></td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">JSON config + API key</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10"><code>claude plugin install</code></td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Cross-Session</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Loads on startup</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Local DB persistence</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Via tool calls</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">✅ Auto-injected on startup</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Cross-Tool</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">❌ Claude Code only</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">⚠️ SSH sync (<code>claude-mem-sync</code>)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Any MCP client</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">✅ Shared vault (Cursor, VS Code, Claude Desktop)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">License</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">N/A (built-in)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">AGPL-3.0</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Varies</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Apache-2.0</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">Best For</td>
                    <td class="px-4 py-3">Static project rules</td>
                    <td class="px-4 py-3">Local-first power users</td>
                    <td class="px-4 py-3">Real-time tool access</td>
                    <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10"><strong>Hands-free cross-tool memory</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="text-gray-500 text-xs italic">
              These approaches are complementary, not exclusive. Use CLAUDE.md for static project rules and Memwyre for dynamic session memory — they work together.
            </p>

            <h3 id="memwyre-vs-claude-mem">Memwyre vs. claude-mem: The Key Differences</h3>
            <p>
              <strong>claude-mem</strong> is an excellent open-source tool for local-first, single-machine memory. It stores observations in a local SQLite database with ChromaDB for semantic search, and it's earned 89K+ GitHub stars for good reason — it works.
            </p>
            <p>
              Where the two tools diverge:
            </p>
            <ul>
              <li><strong>Cross-tool sync:</strong> claude-mem stores data locally. To share context between machines, you need to set up SSH-based sync via <code>claude-mem-sync</code>. Memwyre uses a shared cloud vault — install the plugin on Claude Code, connect the MCP server on Cursor, and both read from the same memory layer instantly. No SSH keys, no SCP scripts, no manual replication.</li>
              <li><strong>Retrieval quality:</strong> claude-mem uses flat vector search (ChromaDB). Memwyre's engine uses <strong>two-stage cross-encoder re-ranking</strong> with Ebbinghaus logarithmic recency decay, scoring <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">70.5% on the LoCoMo-10 benchmark</router-link> vs. 43.7% for flat vector RAG baselines — a 61% accuracy improvement with 81% fewer tokens.</li>
              <li><strong>License:</strong> claude-mem ships under <strong>AGPL-3.0</strong>, which requires teams to open-source modifications if they serve the software over a network. Memwyre ships under <strong>Apache-2.0</strong> — no copyleft obligations, safe for proprietary enterprise deployments. <em>(See our <router-link to="/memwyre-vs-mem0" class="text-[#D97757] hover:underline font-medium">detailed comparison pages</router-link> for deeper dives vs. Mem0, Supermemory, and Zep.)</em></li>
            </ul>

            <h3 id="cross-tool-sync">How Cross-Tool Sync Actually Works</h3>
            <p>
              "Shared with Cursor, VS Code, Claude Desktop" is a claim that deserves explanation. Here's the mechanism:
            </p>
            <ul>
              <li><strong>Claude Code (plugin):</strong> The Memwyre plugin hooks into <code>SessionStart</code> and <code>Stop</code> lifecycle events. On start, it calls the retrieval API to pull relevant memories. On stop, it <code>POST</code>s the session transcript to the capture endpoint. Both operations hit your authenticated cloud vault.</li>
              <li><strong>Cursor / VS Code / Claude Desktop (MCP):</strong> These tools connect via the Memwyre MCP server. The <code>search_memwyre</code> and <code>save_memory</code> tools read from and write to the <em>same vault</em> as the Claude Code plugin.</li>
              <li><strong>Same API key = same vault.</strong> There's no sync step, no export/import, no SSH tunnel. A memory captured in a Claude Code terminal session at 2pm is available in your Cursor sidebar at 2:01pm.</li>
            </ul>

            <h2 id="architecture">How the Memwyre Claude Code Plugin Works</h2>
            <p>
              The plugin hooks into Claude Code's lifecycle events — two hooks, zero configuration after install. It reads your project directory name and handles everything automatically.
            </p>

            <h3 id="sessionstart">① SessionStart — Context Injection</h3>
            <p>
              When you open a Claude Code session, the plugin fires before the first prompt. It reads your working directory, queries the Memwyre retrieval engine for past memories matching that project, and injects them directly into Claude's system prompt.
            </p>
            <pre><code class="language-markdown">&lt;memwyre-context&gt;
## Past Memories for my-project
- Database uses PostgreSQL 15 with pgvector
- Auth flow: JWT + refresh tokens in httpOnly cookies
- Fixed: race condition in worker queue (use Redis lock)
&lt;/memwyre-context&gt;</code></pre>
            
            <h3 id="stop-session">② Stop — Session Capture</h3>
            <p>
              When you exit Claude Code (or the session ends), the plugin reads the full JSONL session transcript, sends it to Memwyre's background worker, and extracts structured memories — architecture decisions, debugging solutions, code patterns, and configuration choices.
            </p>

            <h3 id="troubleshooting">Troubleshooting & Edge Cases</h3>
            <p>
              No extraction model is perfect. Here's how to handle the edge cases:
            </p>
            <ul>
              <li><strong>Misclassified memory:</strong> If the extraction model captures something irrelevant or incorrect, you can view, edit, or delete any individual memory from the <router-link to="/dashboard" class="text-[#D97757] hover:underline font-medium">Memwyre dashboard</router-link> or via the API (<code>DELETE /api/v1/memories/:id</code>). Every memory is individually addressable.</li>
              <li><strong>Stale facts:</strong> Decided to switch from PostgreSQL to CockroachDB? The Ebbinghaus logarithmic recency decay model automatically deprioritizes older, superseded facts. The most recent observation wins in retrieval ranking — you don't need to manually clean up outdated context.</li>
              <li><strong>Deduplication:</strong> If consecutive sessions produce near-identical observations (e.g., "project uses Tailwind" captured in sessions #4, #5, and #6), the extraction model deduplicates them during ingestion. Your vault stays lean.</li>
              <li><strong>Project exclusion:</strong> Don't want to capture sessions for a specific repo? Unset the <code>MEMWYRE_API_KEY</code> environment variable for that terminal session, or configure project-level exclusions in your Memwyre dashboard settings.</li>
            </ul>

            <h2 id="setup">Install in 60 Seconds</h2>
            <p>
              Choose between standard CLI plugin installation or manual hooks configuration:
            </p>
            
            <div class="space-y-6 my-4">
              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Option A: Direct Plugin Install (Recommended)</h3>
                <ol class="space-y-3 text-sm">
                  <li>
                    <strong>1. Install the plugin package:</strong>
                    <pre><code class="language-bash">claude plugin install @memwyre/claude-code-plugin</code></pre>
                  </li>
                  <li>
                    <strong>2. Export your API key:</strong>
                    <pre><code class="language-bash">export MEMWYRE_API_KEY="bv_sk_your_api_key_here"</code></pre>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Add to your <code>~/.zshrc</code>, <code>~/.bashrc</code>, or system environment variables.</p>
                  </li>
                </ol>
              </div>

              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Option B: Manual Hooks Configuration (Custom Setup)</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">If configuring hooks manually in <code>~/.claude/hooks.json</code>:</p>
                <pre><code class="language-json">{
  "description": "Memwyre: Persistent autonomous memory",
  "hooks": {
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "node \"/path/to/node_modules/@memwyre/claude-memwyre/dist/inject-memory.cjs\"", "timeout": 30 }] }],
    "Stop": [{ "hooks": [{ "type": "command", "command": "node \"/path/to/node_modules/@memwyre/claude-memwyre/dist/capture-session.cjs\"", "timeout": 30 }] }]
  }
}</code></pre>
              </div>
            </div>

            <!-- Documentation Link Box -->
            <div class="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div class="font-bold text-sm text-gray-900 dark:text-white">Need detailed setup docs or custom hooks guidance?</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Read our official Claude Code integration guide covering hook timeouts, environment variables, and self-hosting.</div>
              </div>
              <a href="https://docs.memwyre.tech/integrations/plugins/claude" target="_blank" class="shrink-0 px-4 py-2 bg-[#D97757] text-white text-xs font-semibold rounded hover:bg-[#c05c3d] transition-colors">
                Read Claude Docs →
              </a>
            </div>

            <h2 id="capabilities">What Claude Remembers With Memwyre</h2>
            <ul>
              <li><strong>🧠 Architecture Decisions:</strong> Database choices, API patterns, deployment configs, and framework decisions from past sessions.</li>
              <li><strong>🐛 Debugging Solutions:</strong> Race conditions fixed, environment variable gotchas, and edge cases you already solved once.</li>
              <li><strong>🔗 Entity Relationships:</strong> Connections between database tables, files, services, and APIs — enabling multi-hop reasoning.</li>
              <li><strong>✂️ Dynamic Pruning:</strong> Filters out duplicate CLI logs, compiler errors, and noise — keeping memory lean and token costs low.</li>
            </ul>

            <h2 id="benchmark">Benchmark: Why Retrieval Quality Matters</h2>
            <p>
              Generic memory plugins dump raw vectors into Claude's context window. That approach fails on the queries that actually matter in a codebase — temporal reasoning ("when did we switch from REST to GraphQL?"), multi-hop connections ("which services depend on the auth token format we changed last week?"), and adversarial edge cases ("we never discussed Redis" → the system should abstain, not hallucinate).
            </p>
            <p>
              We evaluated Memwyre's retrieval engine against a flat vector RAG baseline on the <strong>LoCoMo-10 benchmark</strong> (Snap Research, 2024) — 1,540 questions across 10 long conversations spanning 200,000+ tokens:
            </p>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Category</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Flat Vector RAG</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6] dark:bg-orange-950/20">
                      <span class="text-[#D97757]">Memwyre Engine</span>
                    </th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Improvement</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Single-Hop Recall</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">53.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">80.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+51%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Multi-Hop Reasoning</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">24.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">45.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+87.5%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Temporal Alignment</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">48.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">74.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+54%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Open-Domain Reasoning</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">50.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">76.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+52%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Overall Accuracy</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">43.7%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-[#D97757]">70.5%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-bold">+61%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">Context Tokens Sent</td>
                    <td class="px-4 py-3">~26,000</td>
                    <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">~3,000</td>
                    <td class="px-4 py-3 text-green-600 dark:text-green-400 font-semibold">−81%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The improvement comes from three architectural choices: <strong>dynamic context pruning</strong> during ingestion (strips conversational filler), <strong>two-stage cross-encoder re-ranking</strong> (high-recall vector fetch → precision cross-encoder scoring), and <strong>Ebbinghaus logarithmic recency decay</strong> (automatically deprioritizes stale observations).
            </p>
            <p>
              <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">View the full LoCoMo-10 benchmark results →</router-link>
            </p>

            <h2 id="real-world-workflow">Real-World Workflow: Large Codebase Refactoring</h2>
            <p>
              To understand the depth of this integration, consider a common scenario: migrating a large React SPA to Next.js App Router.
            </p>
            <p>
              In a standard Claude Code setup, you might tackle routing on Monday, API endpoints on Tuesday, and state management on Wednesday. By Wednesday, Claude has forgotten that you decided to use Server Actions for mutations instead of traditional API routes. It will start generating standard REST calls, requiring you to manually correct it and burn through tokens.
            </p>
            <p>
              With the <strong>Memwyre Plugin</strong>, Monday's architectural decision ("we are exclusively using Server Actions for Next.js mutations") is extracted during the session stop hook. When you open Claude on Wednesday, that context is automatically injected. Claude inherently knows the project's boundaries, saving you countless prompt-correction cycles and significantly reducing your token usage by preventing hallucinated code paths.
            </p>

            <h2 id="security-and-costs">Token Costs, Noise, & Security</h2>
            <p>
              Sending large conversational contexts directly impacts both billing and privacy. The plugin employs several strategies to mitigate this:
            </p>
            <h3 id="noise-filtration">Algorithmic Noise Filtration</h3>
            <p>
              Not every CLI error needs to be remembered. Memwyre's backend uses a specialized extraction model that differentiates between <em>ephemeral noise</em> (e.g., a typo in a <code>git commit</code> command) and <em>structural knowledge</em> (e.g., adding a new <code>enum</code> to a Prisma schema). Only the structural knowledge is saved to your vector vault, keeping your persistent memory highly relevant and dense.
            </p>
            <h3 id="token-efficiency">Predictable Token Usage</h3>
            <p>
              By summarizing and deduplicating past sessions, the plugin injects a concise <code>&lt;memwyre-context&gt;</code> block that rarely exceeds 1,500 tokens. Compared to manually pasting in megabytes of old transcript logs, this targeted injection saves Anthropic API costs while providing superior context.
            </p>
            <h3 id="enterprise-security">Zero-Retention & Self-Hosting</h3>
            <p>
              Your code is yours. The Memwyre extraction engine uses zero-retention policies—meaning your transcripts are processed in memory and immediately discarded. For enterprise environments with strict compliance requirements, the entire Memwyre backend can be <strong>self-hosted</strong> behind your firewall, ensuring your proprietary source code never leaves your VPC.
            </p>

            <h2 id="license-and-requirements">License & Requirements</h2>
            <ul>
              <li><strong>License:</strong> <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" class="text-[#D97757] hover:underline font-medium">Apache-2.0</a> — no copyleft obligations. You can use, modify, and deploy Memwyre in proprietary environments without open-sourcing your changes. This matters for teams: claude-mem's <strong>AGPL-3.0</strong> license requires that any modifications served over a network be made open-source, which creates real compliance friction in enterprise environments.</li>
              <li><strong>System requirements:</strong> Node.js 18+ (for the plugin runtime). Works on macOS, Linux, and Windows. No local database required — unlike claude-mem (SQLite + ChromaDB dependency), Memwyre stores data in a managed cloud vault.</li>
              <li><strong>Self-hosting:</strong> For teams that need full data sovereignty, the entire Memwyre backend is available for <strong>self-hosted Docker deployment</strong>. See the <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" class="text-[#D97757] hover:underline font-medium">GitHub repo</a> for instructions.</li>
            </ul>

            <h2 id="honest-take">Why Not Just Use CLAUDE.md?</h2>
            <p>
              <code>CLAUDE.md</code> is genuinely useful — and you should keep using it. It's the right place for static project rules like "use TypeScript strict mode" or "prefer Tailwind over inline styles."
            </p>
            <p>
              But it has real limitations:
            </p>
            <ul>
              <li><strong>Manual maintenance</strong> — you have to remember to update it.</li>
              <li><strong>Flat storage</strong> — everything goes into one Markdown file. No semantic search or entity relationships.</li>
              <li><strong>Tool-locked</strong> — CLAUDE.md only works in Claude Code. Your Cursor and Claude Desktop sessions can't access it.</li>
            </ul>

            <h2 id="faq">FAQ</h2>
            <div class="space-y-4 my-6">
              <details v-for="(faq, index) in faqs" :key="index" class="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-lg">
                <summary class="font-semibold cursor-pointer outline-none">{{ faq.question }}</summary>
                <div class="mt-2 text-sm text-gray-600 dark:text-gray-400" v-html="faq.answer"></div>
              </details>
            </div>
            
            <hr class="my-8 border-gray-200 dark:border-gray-800" />
            <div class="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 mt-8">
              <h3 class="text-lg font-bold mb-2 hero-serif !mt-0">Give Claude Code Persistent Memory</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                One plugin install. Automatic context injection. Automatic session capture. Memory that works across Claude Code, Claude Desktop, Cursor, and VS Code.
              </p>
              <router-link to="/signup" class="px-6 py-2 bg-[#D97757] text-white rounded text-sm font-semibold inline-block hover:bg-[#c05c3d] transition-colors">
                Start Free
              </router-link>
            </div>
          </div>
        </main>

        <!-- Right Sidebar (Dynamic Table of Contents) -->
        <aside class="hidden lg:block lg:col-span-2 lg:border-l border-gray-200 dark:border-gray-800 lg:pl-8 pt-12 text-left">
          <div class="sticky top-24 space-y-4">
            <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold">ON THIS PAGE</div>
            <nav class="space-y-3 text-sm relative pl-4 border-l border-gray-100 dark:border-zinc-900">
              <a 
                v-for="heading in toc" 
                :key="heading.slug" 
                :href="`#${heading.slug}`" 
                @click.prevent="scrollTo(heading.slug)"
                class="block font-medium text-gray-500 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors leading-snug relative"
                :class="{ 'text-[#D97757] font-semibold': activeSection === heading.slug, 'pl-4 text-xs opacity-80': heading.level === 3 }"
              >
                <!-- Active Indicator vertical line -->
                <div 
                  v-if="activeSection === heading.slug" 
                  class="absolute -left-[17px] top-0 bottom-0 w-0.5 bg-[#D97757]"
                ></div>
                {{ heading.text }}
              </a>
            </nav>
          </div>
        </aside>

      </div>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, nextTick } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';

// Page Info
const pageTitle = 'Claude Code Memory Plugin | Memwyre';
const pageUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '');

const copyLink = () => {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href);
    alert('Article link copied to clipboard!');
  }
};

// TOC and Scrollspy
const toc = [
  { level: 2, text: 'TL;DR', slug: 'tldr' },
  { level: 2, text: 'The Problem', slug: 'the-problem' },
  { level: 2, text: 'Comparison', slug: 'comparison' },
  { level: 3, text: 'vs claude-mem', slug: 'memwyre-vs-claude-mem' },
  { level: 3, text: 'Cross-Tool Sync', slug: 'cross-tool-sync' },
  { level: 2, text: 'Architecture', slug: 'architecture' },
  { level: 3, text: 'SessionStart', slug: 'sessionstart' },
  { level: 3, text: 'Stop Session', slug: 'stop-session' },
  { level: 3, text: 'Troubleshooting', slug: 'troubleshooting' },
  { level: 2, text: 'Setup', slug: 'setup' },
  { level: 2, text: 'Capabilities', slug: 'capabilities' },
  { level: 2, text: 'Benchmark', slug: 'benchmark' },
  { level: 2, text: 'Real-World Workflow', slug: 'real-world-workflow' },
  { level: 2, text: 'Security & Costs', slug: 'security-and-costs' },
  { level: 3, text: 'Noise Filtration', slug: 'noise-filtration' },
  { level: 3, text: 'Token Efficiency', slug: 'token-efficiency' },
  { level: 3, text: 'Enterprise Security', slug: 'enterprise-security' },
  { level: 2, text: 'License & Requirements', slug: 'license-and-requirements' },
  { level: 2, text: 'Honest Take', slug: 'honest-take' },
  { level: 2, text: 'FAQ', slug: 'faq' }
];

const activeSection = ref('tldr');
let observer = null;

const scrollTo = (slug) => {
  const el = document.getElementById(slug);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

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
    threshold: 0.1
  });

  nextTick(() => {
    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    headings.forEach((h) => {
      observer.observe(h);
    });
  });
};

onMounted(() => {
  setTimeout(() => {
    setupScrollObserver();
  }, 200);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const faqs = [
  {
    question: 'Does Claude Code have built-in memory?',
    answer: 'Yes — Claude Code has two built-in memory mechanisms. <strong>CLAUDE.md</strong> is a Markdown file loaded into the system prompt on startup, and <strong>auto-memory</strong> saves notes to <code>~/.claude/projects/.../memory/</code>. Both are useful for static rules but limited for dynamic, searchable, cross-tool memory.'
  },
  {
    question: 'How do I give Claude Code persistent memory across sessions?',
    answer: 'The fastest way is to install the Memwyre Claude Code plugin: <code>claude plugin install @memwyre/claude-code-plugin</code>. Set your <code>MEMWYRE_API_KEY</code> environment variable, and every session will automatically load relevant past context on start and save new insights on exit.'
  },
  {
    question: 'What is the best Claude Code memory plugin?',
    answer: 'It depends on your needs. <strong>CLAUDE.md</strong> is best for static project rules (zero setup). <strong>Memwyre\'s plugin</strong> is best if you want fully automated, searchable memory that works across Claude Code, Claude Desktop, Cursor, and VS Code — it scores 70.5% on the LoCoMo-10 benchmark vs. 43.7% for flat vector RAG. <strong>claude-mem</strong> (89K+ stars, AGPL-3.0) is another strong option for local-first, single-machine workflows.'
  },
  {
    question: 'How is Memwyre different from claude-mem?',
    answer: '<strong>claude-mem</strong> stores observations locally in SQLite + ChromaDB — great for single-machine use with zero cloud dependency. <strong>Memwyre</strong> uses a shared cloud vault with an entity graph and two-stage cross-encoder re-ranking, enabling cross-tool sync (Claude Code, Cursor, VS Code, Claude Desktop) without SSH setup. License-wise, claude-mem is AGPL-3.0 (copyleft); Memwyre is Apache-2.0 (permissive). On retrieval quality, Memwyre\'s engine scores 70.5% on LoCoMo-10 vs. 43.7% for flat vector baselines, using 81% fewer context tokens.'
  },
  {
    question: 'Does the plugin work with Claude Desktop too?',
    answer: 'Yes. The Memwyre plugin stores memories in a shared vault. Claude Code (via plugin hooks) and Claude Desktop (via MCP server) both read from and write to the same memory layer. Context saved in a terminal session is instantly available in your Desktop sidebar — same API key, same vault, zero sync configuration.'
  },
  {
    question: 'What license is Memwyre released under?',
    answer: '<strong>Apache-2.0.</strong> No copyleft obligations. You can use, modify, and deploy Memwyre in proprietary environments without open-sourcing your changes. The full source is available on <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" class="text-[#D97757] hover:underline">GitHub</a>.'
  },
  {
    question: 'What happens if Memwyre captures something wrong?',
    answer: 'Every memory is individually addressable. You can view, edit, or delete any observation from the Memwyre dashboard or via API (<code>DELETE /api/v1/memories/:id</code>). The Ebbinghaus decay model also automatically deprioritizes stale facts over time, so outdated context naturally fades from retrieval results.'
  },
  {
    question: 'Is my memory data private?',
    answer: 'Fully private and encrypted. Your memory vault is only accessible via your authenticated API key. Memwyre uses zero-retention processing — transcripts are extracted in memory and immediately discarded. For full data sovereignty, you can <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" class="text-[#D97757] hover:underline">self-host the entire backend</a> behind your firewall.'
  }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.hero-serif {
  font-family: 'Playfair Display', Georgia, serif;
}

/* Base styling mimicking blog post Markdown CSS */
.markdown-content {
  font-family: inherit;
  color: var(--vp-c-text-1, #374151);
}

.dark .markdown-content {
  color: #d1d5db;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
  font-family: 'Playfair Display', Georgia, serif;
  color: #111827;
  line-height: 1.25;
  margin-top: 36px;
  margin-bottom: 16px;
  scroll-margin-top: 100px;
}

.dark .markdown-content h1,
.dark .markdown-content h2,
.dark .markdown-content h3,
.dark .markdown-content h4 {
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

.markdown-content h3 {
  font-size: 1.35rem;
  font-weight: 600;
}

.markdown-content p {
  line-height: 1.75;
  margin-bottom: 1.25rem;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
  line-height: 1.75;
}

.markdown-content ul {
  list-style-type: disc;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content pre {
  background-color: #111827;
  color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.dark .markdown-content pre {
  background-color: #000;
  border: 1px solid #333;
}

.markdown-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.markdown-content p code, 
.markdown-content li code {
  background-color: #f3f4f6;
  color: #ef4444;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.dark .markdown-content p code, 
.dark .markdown-content li code {
  background-color: #374151;
  color: #fca5a5;
}

details summary::-webkit-details-marker {
  display: none;
}

details summary {
  list-style: none;
}
</style>
