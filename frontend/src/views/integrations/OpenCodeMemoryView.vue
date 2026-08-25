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
          OpenCode Memory <br />
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
                <span>Tested on: <strong class="text-gray-800 dark:text-gray-200">OpenCode v1.0.2</strong></span>
                <span>Runtime: <strong class="text-gray-800 dark:text-gray-200">Node.js v18+</strong></span>
                <span>License: <strong class="text-gray-800 dark:text-gray-200">Apache-2.0</strong></span>
              </div>
            </div>

            <!-- TL;DR -->
            <h2 id="tldr">TL;DR</h2>
            <p>
              Give OpenCode persistent memory across every session. The Memwyre plugin auto-injects past project context when you start a session and auto-captures decisions when it ends — no manual context management needed.
            </p>
            <div class="flex flex-wrap gap-3 my-6">
              <router-link to="/signup/" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Install Plugin Free →
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/plugins/opencode" target="_blank" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Plugin Docs
              </a>
            </div>

            <h2 id="the-problem">The Problem: OpenCode Forgets Everything</h2>
            <p>
              Every time you close an OpenCode session, the context window resets. Your debugging breakthroughs, architecture decisions, and code patterns — all gone. You spend the first minutes of every session re-explaining your project.
            </p>
            <p>
              OpenCode doesn't ship with built-in persistent memory. If you use OpenCode <em>and</em> Claude Code <em>and</em> Cursor, each tool maintains its own isolated silo.
            </p>

            <h2 id="comparison">Four Approaches to OpenCode Memory</h2>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Feature</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Manual Context Files</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Mem0 / Supermemory (Vector / Web RAG)</th>
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
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Deterministic (create/start → idle/end)</td>
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
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Hours (SDK & API Key Config)</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">JSON config + key</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10"><code>npm install @memwyre/opencode-plugin</code></td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Cross-Session</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">❌ No persistence</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Via API / Web extension</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Via tool calls</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">✅ Auto-injected on startup</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Cross-Tool</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">❌ OpenCode only</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">❌ Custom pipelines / Chrome extension</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">✅ Any MCP client</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">✅ Shared vault (Claude Code, Cursor, VS Code)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">License</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">N/A</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Apache-2.0 / MIT</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">Varies</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">Apache-2.0</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">Best For</td>
                    <td class="px-4 py-3">Static rules</td>
                    <td class="px-4 py-3">API developers & Web bookmarking</td>
                    <td class="px-4 py-3">Real-time tool access</td>
                    <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10"><strong>Hands-free cross-tool memory</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="text-gray-500 text-xs italic">
              These approaches are complementary, not exclusive. Use manual files for static rules and Memwyre for dynamic OpenCode session memory — they work together.
            </p>

            <h3 id="memwyre-vs-opencode-alternatives">Memwyre vs. Mem0 & Supermemory for OpenCode</h3>
            <p>
              Developers looking for long-term memory in OpenCode often evaluate general-purpose memory systems like <strong>Mem0</strong> (API-first memory SDK) or <strong>Supermemory</strong> (web bookmarking & second brain engine). While both offer vector storage capabilities, neither includes a native plugin built for OpenCode's internal architecture.
            </p>
            <p>
              Why OpenCode developers prefer Memwyre:
            </p>
            <ul>
              <li><strong>Native OpenCode SQLite Integration:</strong> Memwyre's plugin reads session transcripts directly from OpenCode's local database (`~/.local/share/opencode/opencode.db`) using native `node:sqlite`. It requires zero custom API integration code.</li>
              <li><strong>Automatic Lifecycle Hooks:</strong> Hooks into OpenCode's `create`/`start` events to inject past architectural context and `idle`/`end` events to capture newly learned facts seamlessly.</li>
              <li><strong>LoCoMo-10 Benchmark Scores:</strong> Memwyre's two-stage cross-encoder engine achieves <strong>70.5% overall accuracy</strong> on the LoCoMo-10 benchmark vs. 43.7% for standard vector RAG systems. <em>(Compare features on our <router-link to="/memwyre-vs-mem0" class="text-[#D97757] hover:underline font-medium">Memwyre vs. Mem0</router-link> and <router-link to="/memwyre-vs-supermemory" class="text-[#D97757] hover:underline font-medium">Memwyre vs. Supermemory</router-link> pages.)</em></li>
            </ul>

            <h3 id="cross-tool-sync">How Cross-Tool Sync Actually Works</h3>
            <ul>
              <li><strong>OpenCode (plugin):</strong> hooks into session lifecycle. On start → retrieval API. On end → POST transcript.</li>
              <li><strong>Claude Code / Cursor / VS Code / Claude Desktop / OpenClaw:</strong> connect via MCP or their respective plugins to same vault.</li>
              <li><strong>Same API key = same vault.</strong></li>
            </ul>

            <h2 id="architecture">How the Memwyre OpenCode Plugin Works</h2>

            <h3 id="sessionstart">① Session Start — Context Injection</h3>
            <p>
              When you start an OpenCode session (create/start/init events), the plugin calls the Memwyre retrieval engine for past memories matching the current project and injects them into the session prompt.
            </p>
            <pre><code class="language-markdown">&lt;memwyre-context&gt;
## Past Memories for my-project
- Database uses PostgreSQL 15 with pgvector
- Auth flow: JWT + refresh tokens in httpOnly cookies
- Fixed: race condition in worker queue (use Redis lock)
&lt;/memwyre-context&gt;</code></pre>

            <h3 id="session-end">② Session End — Session Capture</h3>
            <p>
              When the session goes idle or ends, the plugin reads the session transcript — from the client API, event payload, or directly from OpenCode's local SQLite database at <code>~/.local/share/opencode/opencode.db</code>. Sends it to Memwyre's background worker for extraction. Uses deduplication tracking to prevent double-captures.
            </p>

            <h3 id="troubleshooting">Troubleshooting & Edge Cases</h3>
            <ul>
              <li><strong>Misclassified memory:</strong> view/edit/delete via dashboard or API</li>
              <li><strong>Stale facts:</strong> Ebbinghaus decay auto-deprioritizes</li>
              <li><strong>Deduplication:</strong> capturedSessions Set prevents duplicate captures</li>
              <li><strong>SQLite fallback:</strong> if the client API doesn't provide messages, the plugin reads directly from OpenCode's local database</li>
            </ul>

            <h2 id="setup">Install in 60 Seconds</h2>
            <p>
              Choose between automated CLI setup or direct npm package configuration:
            </p>
            
            <div class="space-y-6 my-4">
              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Option A: Interactive CLI Installer (Recommended)</h3>
                <pre><code class="language-bash">npx -y install-memwyre --opencode</code></pre>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Automatically detects your OpenCode config directory, logs you in via browser, and writes the plugin configuration.</p>
              </div>

              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Option B: Manual Plugin Setup</h3>
                <ol class="space-y-3 text-sm">
                  <li>
                    <strong>1. Install the npm package:</strong>
                    <pre><code class="language-bash">npm install @memwyre/opencode-plugin</code></pre>
                  </li>
                  <li>
                    <strong>2. Register in OpenCode config (<code>opencode.config.js</code> or <code>.opencode/plugins/memwyre.js</code>):</strong>
                    <pre><code class="language-javascript">import { MemwyrePlugin } from '@memwyre/opencode-plugin';

export default {
  plugins: [MemwyrePlugin]
};</code></pre>
                  </li>
                  <li>
                    <strong>3. Export your API key:</strong>
                    <pre><code class="language-bash">export MEMWYRE_API_KEY="bv_sk_your_api_key_here"</code></pre>
                  </li>
                </ol>
              </div>
            </div>

            <!-- Documentation Link Box -->
            <div class="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div class="font-bold text-sm text-gray-900 dark:text-white">Need detailed setup docs or configuration options?</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Read our official OpenCode integration guide covering plugin lifecycle hooks and SQLite transcript extraction.</div>
              </div>
              <a href="https://docs.memwyre.tech/integrations/plugins/opencode" target="_blank" class="shrink-0 px-4 py-2 bg-[#D97757] text-white text-xs font-semibold rounded hover:bg-[#c05c3d] transition-colors">
                Read OpenCode Docs →
              </a>
            </div>

            <h2 id="capabilities">What OpenCode Remembers With Memwyre</h2>
            <ul>
              <li><strong>🧠 Architecture Decisions</strong></li>
              <li><strong>🐛 Debugging Solutions</strong></li>
              <li><strong>🔗 Entity Relationships</strong></li>
              <li><strong>✂️ Dynamic Pruning</strong></li>
            </ul>

            <h2 id="benchmark">Benchmark: Why Retrieval Quality Matters</h2>
            <p>
              We evaluated Memwyre's retrieval engine against a flat vector RAG baseline on the <strong>LoCoMo-10 benchmark</strong>:
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
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Multi-Hop</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">24.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">45.0%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-semibold">+87.5%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Overall</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">43.7%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-[#D97757]">70.5%</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-green-600 dark:text-green-400 font-bold">+61%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">Context Tokens</td>
                    <td class="px-4 py-3">~26,000</td>
                    <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10 font-semibold">~3,000</td>
                    <td class="px-4 py-3 text-green-600 dark:text-green-400 font-semibold">−81%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <router-link to="/research/locomo-benchmark" class="text-[#D97757] hover:underline font-medium">View the full LoCoMo-10 benchmark results →</router-link>
            </p>

            <h2 id="real-world-workflow">Real-World Workflow: Iterative Feature Development</h2>
            <p>
              Scenario: building a payment integration over multiple sessions. Session 1 establishes the Stripe webhook architecture. Session 2 implements the subscription billing logic. Session 3 adds the retry/idempotency layer. Without memory, Session 3 doesn't know about the webhook signing secret rotation decision from Session 1. With Memwyre, all sessions share context.
            </p>

            <h2 id="security-and-costs">Token Costs, Noise, & Security</h2>
            
            <h3 id="noise-filtration">Noise Filtration</h3>
            <p>
              Not every CLI error needs to be remembered. Memwyre's backend uses a specialized extraction model that differentiates between ephemeral noise and structural knowledge. Only the structural knowledge is saved to your vector vault, keeping your persistent memory highly relevant and dense.
            </p>
            
            <h3 id="token-efficiency">Token Efficiency</h3>
            <p>
              By summarizing and deduplicating past sessions, the plugin injects a concise <code>&lt;memwyre-context&gt;</code> block that rarely exceeds 1,500 tokens. Compared to manually pasting in megabytes of old transcript logs, this targeted injection saves API costs while providing superior context.
            </p>
            
            <h3 id="enterprise-security">Enterprise Security</h3>
            <p>
              Your code is yours. The Memwyre extraction engine uses zero-retention policies—meaning your transcripts are processed in memory and immediately discarded. For enterprise environments with strict compliance requirements, the entire Memwyre backend can be self-hosted behind your firewall.
            </p>

            <h2 id="license-and-requirements">License & Requirements</h2>
            <ul>
              <li><strong>Apache-2.0</strong></li>
              <li>Node.js 18+, any OS</li>
              <li>Self-hosting: Docker deployment</li>
              <li>No special profile requirements (unlike OpenClaw)</li>
            </ul>

            <h2 id="honest-take">Why Not Just Use Manual Context?</h2>
            <p>
              Manual files are good for static rules, but limited by maintenance, flat storage, and tool-locking. They don't update automatically as your architecture evolves.
            </p>

            <h2 id="faq">FAQ</h2>
            <div class="space-y-4 my-6">
              <details v-for="(faq, index) in faqs" :key="index" class="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-lg">
                <summary class="font-semibold cursor-pointer outline-none">{{ faq.question }}</summary>
                <div class="mt-2 text-sm text-gray-600 dark:text-gray-400" v-html="faq.answer"></div>
              </details>
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
const pageTitle = 'OpenCode Memory Plugin | Memwyre';
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
  { level: 3, text: 'vs Mem0 & Supermemory', slug: 'memwyre-vs-opencode-alternatives' },
  { level: 3, text: 'Cross-Tool Sync', slug: 'cross-tool-sync' },
  { level: 2, text: 'Architecture', slug: 'architecture' },
  { level: 3, text: 'SessionStart', slug: 'sessionstart' },
  { level: 3, text: 'Session End', slug: 'session-end' },
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
    question: 'Does OpenCode have built-in memory?',
    answer: 'No built-in persistence.'
  },
  {
    question: 'How do I give OpenCode persistent memory?',
    answer: 'Install @memwyre/opencode-plugin, configure, set API key.'
  },
  {
    question: 'What is the best OpenCode memory plugin?',
    answer: 'Depends. Memwyre for cross-tool (70.5% LoCoMo), claude-mem for local-first.'
  },
  {
    question: 'How is Memwyre different from claude-mem?',
    answer: 'Same comparison.'
  },
  {
    question: 'Does the plugin work with Claude Code and Cursor?',
    answer: 'Yes, same vault.'
  },
  {
    question: 'What license is Memwyre released under?',
    answer: 'Apache-2.0.'
  },
  {
    question: 'What happens if Memwyre captures something wrong?',
    answer: 'Dashboard/API edit/delete.'
  },
  {
    question: 'Is my memory data private?',
    answer: 'Zero-retention, self-host option.'
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
