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
          OpenClaw Memory <br />
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
                <span>Tested on: <strong class="text-gray-800 dark:text-gray-200">OpenClaw v2.0.16</strong></span>
                <span>Runtime: <strong class="text-gray-800 dark:text-gray-200">Node.js v18+</strong></span>
                <span>License: <strong class="text-gray-800 dark:text-gray-200">Apache-2.0</strong></span>
              </div>
            </div>

            <!-- TL;DR -->
            <h2 id="tldr">TL;DR</h2>
            <p>
              Give OpenClaw autonomous agents persistent memory across every run. The Memwyre plugin auto-injects past project context when an agent session starts and auto-captures decisions when it ends — no manual context files needed. Includes <code>save_memory</code> and <code>search_memwyre</code> tools for on-demand access during agent runs.
            </p>
            <div class="flex flex-wrap gap-3 my-6">
              <router-link to="/signup/" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Install Plugin Free →
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/plugins/openclaw" target="_blank" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Plugin Docs
              </a>
            </div>

            <h2 id="the-problem">The Problem: OpenClaw Agents Forget Everything</h2>
            <p>
              Every time an autonomous agent run completes, the context window resets. The debugging breakthroughs, architecture decisions, and code patterns from the last run — all gone. You spend the first minutes of every agent session re-explaining your project's constraints.
            </p>
            <p>
              OpenClaw doesn't ship with built-in persistent memory. If you use OpenClaw <em>and</em> Claude Code <em>and</em> Cursor, each tool maintains its own isolated silo.
            </p>

            <h2 id="comparison">Four Approaches to OpenClaw Memory</h2>
            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Feature</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Manual Context Files</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Mem0 / Zep (Agent Frameworks)</th>
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
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Predictive (LLM decides)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Predictive (LLM decides)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Deterministic (SessionStart/Stop)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Storage</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Flat files</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Local SQLite + ChromaDB</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Varies</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Cloud vault + entity graph</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Setup</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Manual file creation</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Hours (SDK & Database Config)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">JSON config + key</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10"><code>openclaw plugins install</code></td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Cross-Session</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">❌ No persistence</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Via SDK API calls</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Via tool calls</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">✅ Auto-injected on startup</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Cross-Tool</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">❌ OpenClaw only</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">❌ Custom pipelines required</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Any MCP client</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">✅ Shared vault (Claude Code, Cursor, VS Code)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">License</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">N/A</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Apache-2.0 / Proprietary</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Varies</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Apache-2.0</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">Best For</td>
                    <td class="px-4 py-3">Static rules</td>
                    <td class="px-4 py-3">Custom AI Agent backends</td>
                    <td class="px-4 py-3">Real-time tool access</td>
                    <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10"><strong>Hands-free cross-tool memory</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="text-gray-500 text-xs italic">
              These approaches are complementary, not exclusive. Use manual files for static rules and Memwyre for dynamic OpenClaw session memory — they work together.
            </p>

            <h3 id="memwyre-vs-agent-frameworks">Memwyre vs. Mem0 & Zep for OpenClaw</h3>
            <p>
              When building memory for autonomous agents, framework solutions like <strong>Mem0</strong> (SDK-first memory) and <strong>Zep / Graphiti</strong> (temporal knowledge graphs) are popular choice for custom backend developers. However, integrating them into OpenClaw requires writing custom Python/TS wrappers, orchestrating database instances, and managing manual API calls inside your agent loops.
            </p>
            <p>
              Where Memwyre differs for OpenClaw developers:
            </p>
            <ul>
              <li><strong>Zero-code CLI integration:</strong> Memwyre installs directly into OpenClaw with one command (<code>openclaw plugins install @memwyre/openclaw-plugin</code>). It automatically hooks into OpenClaw's session lifecycle events to handle context injection and session capture without writing custom SDK code.</li>
              <li><strong>Cross-tool ecosystem:</strong> Mem0 and Zep require custom sync pipelines to share memory between your CLI agents and your IDE. Memwyre's shared vault connects OpenClaw agent sessions directly to Cursor, VS Code, and Claude Desktop.</li>
              <li><strong>Benchmark performance:</strong> On the <router-link to="/research/locomo-benchmark" class="text-[#D97757] hover:underline font-medium">LoCoMo-10 benchmark</router-link>, Memwyre's cross-encoder engine scores <strong>73.5% accuracy</strong> vs. 43.7% for flat vector RAG baselines, using 88.5% fewer tokens. <em>(Deep dives available on our <router-link to="/memwyre-vs-mem0" class="text-[#D97757] hover:underline font-medium">Memwyre vs. Mem0</router-link> and <router-link to="/memwyre-vs-zep" class="text-[#D97757] hover:underline font-medium">Memwyre vs. Zep</router-link> pages.)</em></li>
            </ul>

            <h3 id="cross-tool-sync">How Cross-Tool Sync Actually Works</h3>
            <ul>
              <li><strong>OpenClaw (plugin):</strong> hooks into session lifecycle events. On start → retrieval API. On stop → POST transcript to capture endpoint.</li>
              <li><strong>Claude Code / Cursor / VS Code / Claude Desktop (MCP):</strong> connect via Memwyre MCP server, same vault.</li>
              <li><strong>Same API key = same vault.</strong> Memory captured in an OpenClaw agent run is available in Cursor at the next prompt.</li>
            </ul>

            <h2 id="architecture">How the Memwyre OpenClaw Plugin Works</h2>
            
            <h3 id="sessionstart">① SessionStart — Context Injection</h3>
            <p>
              When an OpenClaw agent session starts, the plugin fires before the first prompt. It reads your working directory, queries the Memwyre retrieval engine for past memories, and injects them into the agent's system prompt.
            </p>
            <pre><code class="language-markdown">&lt;memwyre-context&gt;
## Past Memories for my-project
- Database uses PostgreSQL 15 with pgvector
- Auth flow: JWT + refresh tokens in httpOnly cookies
- Fixed: race condition in worker queue (use Redis lock)
&lt;/memwyre-context&gt;</code></pre>
            
            <h3 id="stop-session">② Stop — Session Capture</h3>
            <p>
              When the agent run completes or goes idle, the plugin reads the session transcript (from event messages, session file, or <code>~/.openclaw/agents/main/sessions/</code> JSONL logs), sends it to Memwyre's background worker for extraction.
            </p>

            <h3 id="on-demand-tools">③ On-Demand Tools</h3>
            <p>
              Unlike the Claude Code plugin, OpenClaw's integration also provides two MCP tools:
            </p>
            <ul>
              <li><code>save_memory(text, tags)</code>: Manually save a note/decision during an agent run.</li>
              <li><code>search_memwyre(query, limit)</code>: Semantic search across your vault mid-session.</li>
            </ul>

            <h3 id="troubleshooting">Troubleshooting & Edge Cases</h3>
            <ul>
              <li><strong>Misclassified memory:</strong> view/edit/delete via dashboard or API (<code>DELETE /api/v1/memories/:id</code>).</li>
              <li><strong>Stale facts:</strong> Ebbinghaus decay auto-deprioritizes.</li>
              <li><strong>Deduplication:</strong> extraction model handles near-duplicates.</li>
              <li><strong>Tool profile requirement:</strong> OpenClaw's tool profile must be set to <code>full</code> or <code>coding</code> — the plugin is disabled under <code>standard</code> or <code>minimal</code> profiles.</li>
            </ul>

            <h2 id="setup">Install in 60 Seconds</h2>
            <p>
              The Memwyre OpenClaw plugin installs directly via the OpenClaw CLI or JSON config:
            </p>
            <ol class="space-y-4">
              <li>
                <strong>1. Install the plugin package:</strong>
                <pre><code class="language-bash">openclaw plugins install @memwyre/openclaw-plugin</code></pre>
              </li>
              <li>
                <strong>2. Configure your API key:</strong>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Add the plugin entry to your <code>~/.openclaw/config.json</code> settings file:</p>
                <pre><code class="language-json">{
  "plugins": {
    "entries": {
      "@memwyre/openclaw-plugin": {
        "enabled": true,
        "config": {
          "apiKey": "bv_sk_your_api_key_here",
          "hostUrl": "https://api.memwyre.tech"
        }
      }
    }
  }
}</code></pre>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Alternatively, export <code>MEMWYRE_API_KEY="bv_sk_..."</code> in your shell environment.</p>
              </li>
              <li>
                <strong>3. Set OpenClaw Agent Tool Profile:</strong>
                <p class="text-xs text-gray-500 dark:text-gray-400">Ensure OpenClaw is running with <code>full</code> or <code>coding</code> tool profile. Custom memory tools are bypassed under <code>standard</code> or <code>minimal</code> profiles.</p>
              </li>
              <li>
                <strong>4. Run your agent:</strong>
                <p class="text-xs text-gray-500 dark:text-gray-400">The plugin handles past context injection on agent start and saves session insights on agent exit.</p>
              </li>
            </ol>

            <!-- Documentation Link Box -->
            <div class="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div class="font-bold text-sm text-gray-900 dark:text-white">Need detailed setup docs or local development links?</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Read our official OpenClaw integration guide covering CLI flags, local linking, and tool profiles.</div>
              </div>
              <a href="https://docs.memwyre.tech/integrations/plugins/openclaw" target="_blank" class="shrink-0 px-4 py-2 bg-[#D97757] text-white text-xs font-semibold rounded hover:bg-[#c05c3d] transition-colors">
                Read OpenClaw Docs →
              </a>
            </div>

            <h2 id="capabilities">What OpenClaw Remembers With Memwyre</h2>
            <ul>
              <li><strong>🧠 Architecture Decisions:</strong> Database choices, API patterns, deployment configs, and framework decisions.</li>
              <li><strong>🐛 Debugging Solutions:</strong> Race conditions fixed, environment variable gotchas, and edge cases.</li>
              <li><strong>🔗 Entity Relationships:</strong> Connections enabling multi-hop reasoning.</li>
              <li><strong>✂️ Dynamic Pruning:</strong> Filters out noise to keep memory lean.</li>
            </ul>

            <h2 id="benchmark">Benchmark: Why Retrieval Quality Matters</h2>
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
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Single-Hop</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">53.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">80.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+51%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Multi-Hop</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">24.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">45.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+87.5%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Temporal</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">48.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">74.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+54%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Open-Domain</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">50.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">76.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+52%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Overall</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">43.7%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-[#D97757]">73.5%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-bold">+68%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">Context Tokens</td>
                    <td class="px-4 py-3">~26,000</td>
                    <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">~3,000</td>
                    <td class="px-4 py-3 text-green-600 dark:text-green-400 font-semibold">−88.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The improvement comes from architectural drivers like dynamic context pruning, two-stage cross-encoder re-ranking, and Ebbinghaus logarithmic recency decay.
              <router-link to="/research/locomo-benchmark" class="text-[#D97757] hover:underline font-medium">View the full LoCoMo-10 benchmark results →</router-link>
            </p>

            <h2 id="real-world-workflow">Real-World Workflow: Multi-Agent Codebase Migration</h2>
            <p>
              Scenario: Using OpenClaw agents to handle a microservices migration. Agent #1 analyzes service boundaries on Monday. Agent #2 generates API contracts on Tuesday. Agent #3 writes integration tests on Wednesday. Without persistent memory, Agent #3 doesn't know the decisions Agent #1 made. With Memwyre, all three agents share the same vault.
            </p>

            <h2 id="security-and-costs">Token Costs, Noise, & Security</h2>
            
            <h3 id="noise-filtration">Noise Filtration</h3>
            <p>
              Not every CLI error needs to be remembered. Memwyre's backend differentiates between ephemeral noise and structural knowledge.
            </p>
            
            <h3 id="token-efficiency">Token Efficiency</h3>
            <p>
              By summarizing past sessions, the plugin injects a concise <code>&lt;memwyre-context&gt;</code> block (~1,500 token injections) vs megabytes of raw logs.
            </p>
            
            <h3 id="enterprise-security">Enterprise Security</h3>
            <p>
              Zero-retention policies and self-hosting options ensure your code stays private.
            </p>

            <h2 id="license-and-requirements">License & Requirements</h2>
            <ul>
              <li><strong>License:</strong> <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" class="text-[#D97757] hover:underline font-medium">Apache-2.0</a></li>
              <li><strong>System requirements:</strong> Node.js 18+, any OS, no local DB needed</li>
              <li><strong>Self-hosting:</strong> Docker deployment available</li>
              <li><strong>Tool Profile:</strong> OpenClaw tool profile must be <code>full</code> or <code>coding</code></li>
            </ul>

            <h2 id="honest-take">Why Not Just Use Manual Context Files?</h2>
            <p>
              Manual context files are fine for static rules. But they face real limitations: manual maintenance, flat storage, and they are tool-locked.
            </p>

            <h2 id="faq">FAQ</h2>
            <div class="space-y-4 my-6">
              <details v-for="(faq, index) in faqs" :key="index" class="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-lg">
                <summary class="font-semibold cursor-pointer outline-none">{{ faq.question }}</summary>
                <div class="mt-2 text-sm text-gray-600 dark:text-gray-400" v-html="faq.answer"></div>
              </details>
            </div>
            
            <hr class="my-8 border-gray-200 dark:border-gray-800" />
            <div class="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 mt-8">
              <h3 class="text-lg font-bold mb-2 hero-serif !mt-0">Give OpenClaw Persistent Memory</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                One plugin install. Automatic context injection. Automatic session capture. Memory that works seamlessly across your autonomous agent sessions.
              </p>
              <router-link to="/signup/" class="px-6 py-2 bg-[#D97757] text-white rounded text-sm font-semibold inline-block hover:bg-[#c05c3d] transition-colors">
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
const pageTitle = 'OpenClaw Memory Plugin | Memwyre';
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
  { level: 3, text: 'vs Mem0 & Zep', slug: 'memwyre-vs-agent-frameworks' },
  { level: 3, text: 'Cross-Tool Sync', slug: 'cross-tool-sync' },
  { level: 2, text: 'Architecture', slug: 'architecture' },
  { level: 3, text: 'SessionStart', slug: 'sessionstart' },
  { level: 3, text: 'Stop Session', slug: 'stop-session' },
  { level: 3, text: 'On-Demand Tools', slug: 'on-demand-tools' },
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
    question: 'Does OpenClaw have built-in memory?',
    answer: 'No. OpenClaw relies on external plugins for persistence.'
  },
  {
    question: 'How is Memwyre different from Mem0 and Zep for OpenClaw?',
    answer: 'Frameworks like <strong>Mem0</strong> and <strong>Zep</strong> are built for custom AI application backends, requiring developers to write Python/TS SDK code and manage database instances. <strong>Memwyre</strong> provides a zero-code native plugin for OpenClaw (<code>openclaw plugins install @memwyre/openclaw-plugin</code>) that hooks directly into agent session lifecycles, enabling instant cross-tool context sync with Cursor, VS Code, and Claude Desktop. Memwyre also scores 73.5% on the LoCoMo-10 benchmark vs. 43.7% for flat vector baselines.'
  },
  {
    question: 'What is the best OpenClaw memory plugin?',
    answer: 'Depends. Memwyre for cross-tool automated memory (73.5% LoCoMo), claude-mem for local-first (89K stars, AGPL-3.0).'
  },
  {
    question: 'How is Memwyre different from claude-mem?',
    answer: '<strong>claude-mem</strong> stores observations locally in SQLite + ChromaDB — great for single-machine use with zero cloud dependency. <strong>Memwyre</strong> uses a shared cloud vault with an entity graph and two-stage cross-encoder re-ranking, enabling cross-tool sync without SSH setup. License-wise, claude-mem is AGPL-3.0; Memwyre is Apache-2.0. On retrieval quality, Memwyre scores 73.5% on LoCoMo-10 vs. 43.7% for flat vector baselines, using 88.5% fewer context tokens.'
  },
  {
    question: 'Does the plugin work with Claude Code and Cursor too?',
    answer: 'Yes, same vault. Memory captured in an OpenClaw agent run is available in Cursor at the next prompt.'
  },
  {
    question: 'What license is Memwyre released under?',
    answer: 'Apache-2.0. You can use, modify, and deploy Memwyre in proprietary environments without open-sourcing your changes.'
  },
  {
    question: 'What happens if Memwyre captures something wrong?',
    answer: 'View/edit/delete via dashboard or API.'
  },
  {
    question: 'Is my memory data private?',
    answer: 'Zero-retention, self-host option available.'
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
