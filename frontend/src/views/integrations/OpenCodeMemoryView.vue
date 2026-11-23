<template>
  <ArticleLayout
    section-label="Plugins"
    section-to="/plugins"
    category="OpenCode"
    date="AUGUST 4, 2026"
    read-time="14 MIN READ · CLI PERFORMANCE & PERSISTENCE"
    author-name="Himansh Shivhare"
    author-role="Founder & Lead Architect"
    author-avatar="https://avatars.githubusercontent.com/u/170114968?v=4"
    :toc="toc"
    v-model:active-section="activeSection"
    share-label="SHARE THIS PAGE"
  >
    <template #sidebar-links>
      <!-- Official & Community Outbound Links (E-E-A-T) -->
            <div class="space-y-2 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">OFFICIAL RESOURCES</div>
              <a 
                href="https://github.com/anomalyco/opencode" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                OpenCode Core (GitHub)
              </a>
              <a 
                href="https://opencode.ai/docs" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                OpenCode Docs (Official)
              </a>
              <a 
                href="https://github.com/memwyreai/Memwyre" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Memwyre Core (GitHub)
              </a>
              <a 
                href="https://docs.memwyre.tech/integrations/plugins/opencode" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Memwyre OpenCode Plugin Docs
              </a>
              <router-link 
                to="/ai-memory-benchmark-locomo"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                LoCoMo-10 Benchmark (70.5%)
              </router-link>
              <router-link 
                to="/blog/best-ai-agent-memories"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Best Agent Memories (2026)
              </router-link>
              <router-link 
                to="/blog/how-to-vibe-code-without-hitting-daily-limits"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Vibe Coding Without Limits
              </router-link>
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
    </template>

    <template #title>
      <h1 class="font-sans font-normal text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.2] text-black dark:text-white">
        OpenCode Persistent Memory <br />
          <span class="font-normal text-neutral-900 dark:text-gray-100">Solving Desktop RAM Leaks &amp; <span class="inline-block bg-[#D97757] text-white px-2.5 py-0.5 font-normal rounded-xs">CLI Session Reset.</span></span>
      </h1>
    </template>

    <div class="markdown-content space-y-12 animate-fade-in">
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
              <router-link to="/signup" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Install Plugin Free →
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/plugins/opencode" target="_blank" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Plugin Docs
              </a>
            </div>

            <!-- Quick Summary / Answer-First Box -->
            <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm my-6">
              <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="space-y-2">
                <div class="text-[#D97757] font-mono text-xs uppercase font-bold tracking-wider">Quick Summary / Key Takeaways</div>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  <strong>Answer:</strong> Developers discussing "OpenCode memory" face two separate challenges: extreme RAM consumption in the OpenCode Desktop GUI (often 10–20 GB due to browser session bloat) and statelessness in the OpenCode CLI. The <strong>Memwyre Plugin</strong> solves both: it enables developers to run the ultra-lightweight CLI (reducing RAM usage by 90%) while maintaining persistent, cross-session architecture context across terminal sessions and IDEs.
                </p>
              </div>
            </div>

            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">-90%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">RAM Footprint</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">CLI vs Desktop Bloat</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">Rapid</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Context Retrieval</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Sub-Second CLI Start</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">70.5%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Long-Term Recall</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">LoCoMo-10 Benchmark</div>
                </div>
              </div>
            </div>

            <h2 id="the-problem">The Problem: OpenCode Forgets Everything</h2>
            <p>
              Every time you close an OpenCode session, the context window resets. Your debugging breakthroughs, architecture decisions, and code patterns — all gone. You spend the first minutes of every session re-explaining your project.
            </p>
            <p>
              OpenCode doesn't ship with built-in persistent memory. If you use OpenCode <em>and</em> <router-link to="/claude-memory" class="text-[#D97757] hover:underline font-medium">Claude Code</router-link> <em>and</em> <router-link to="/cursor-memory" class="text-[#D97757] hover:underline font-medium">Cursor</router-link>, each tool maintains its own isolated silo.
            </p>

            <h2 id="desktop-ram-dilemma">The OpenCode Memory Dilemma: Desktop RAM vs CLI Persistence</h2>
            <p>
              When engineers search for <em>"OpenCode memory"</em>, they typically struggle with one of two distinct bottlenecks:
            </p>
            <h3 id="issue-ram-bloat">1. Desktop App RAM Leaks (10–20 GB Footprint)</h3>
            <p>
              The OpenCode Desktop GUI renders all active and past chat sessions inside an Electron/Chromium runtime. Over hours of coding, in-memory DOM nodes and token buffers accumulate, causing memory consumption to balloon into tens of gigabytes and freeze your system.
            </p>
            <h3 id="issue-cli-statelessness">2. CLI Terminal Statelessness</h3>
            <p>
              Developers seeking to avoid GUI bloat switch to the <strong>OpenCode CLI</strong>, which is lightweight and fast. However, the CLI resets completely after each run. All knowledge of architectural decisions, database models, and bug fixes vanishes as soon as the terminal closes.
            </p>
            <p>
              <strong>The Solution:</strong> Memwyre bridges the gap. By connecting the lightweight OpenCode CLI to Memwyre's remote cloud vault, you get instant persistent context on session launch with zero local memory leak overhead.
            </p>

            <!-- Visual Diagram 1: OpenCode Memory Dilemma Architecture (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">OpenCode Architecture: GUI RAM Leaks vs. CLI Cloud Persistence</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Local Electron Heap vs Remote Vault</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <!-- Desktop GUI Bloat Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>OpenCode Desktop GUI</span>
                    <span class="text-[10px] bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-2 py-0.5 rounded border border-red-200 dark:border-red-900">10–20 GB RAM Footprint</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Electron / Chromium In-Memory Session Heap</div>
                    <div>┌─ Active Sessions (Unbounded DOM Tree)</div>
                    <div>├─ Cached Canvas &amp; WebGL Buffer Overflows</div>
                    <div>├─ V8 Garbage Collection Thrashing</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">▼ SYSTEM MEMORY FREEZE (High Swap Usage)</div>
                    <div class="text-gray-400 dark:text-gray-500 italic text-[10px]">&nbsp;&nbsp;(Forces developers to kill PID &amp; wipe workspace state)</div>
                  </div>
                  <div class="space-y-1 text-[11px] text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-1 text-red-600 dark:text-red-400">
                      <span>✕</span>
                      <span>Runaway memory consumption during long sessions</span>
                    </div>
                    <div class="flex items-center gap-1 text-red-600 dark:text-red-400">
                      <span>✕</span>
                      <span>No cross-tool sync with Cursor or Claude Code</span>
                    </div>
                  </div>
                </div>

                <!-- CLI + Memwyre Architecture Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>OpenCode CLI + Memwyre Plugin</span>
                    <span class="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">&lt;150 MB RAM + Cloud Vault</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Stateless Terminal + Remote Persistent Brain</div>
                    <div>┌─ Native Node.js CLI Runtime (&lt;120MB)</div>
                    <div>├─ Session Lifecycle Hook: @memwyre/opencode-plugin</div>
                    <div>├─ On Start: Auto-inject relevant architectural context</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">▲ PERSISTENT MEMORY VAULT (0 Local Bloat)</div>
                    <div class="text-gray-400 dark:text-gray-500 italic text-[10px]">&nbsp;&nbsp;(On End: Extract decisions &amp; sync to Cursor/Claude Code)</div>
                  </div>
                  <div class="space-y-1 text-[11px] text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <span>✓</span>
                      <span>90% reduction in local system RAM usage</span>
                    </div>
                    <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <span>✓</span>
                      <span>Universal memory shared across all IDEs and terminals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 id="gc-limits-oom">V8 Garbage Collection Limits &amp; Node.js Out-Of-Memory (OOM) Crashes</h3>
            <p>
              When developers run deep, multi-turn coding sessions with the OpenCode Desktop app, they frequently hit catastrophic UI freezes and crashes caused by <strong>V8 garbage collector thrashing</strong> and Node.js heap exhaustion.
            </p>
            <p>
              Here is why OpenCode experiences severe memory leaks and garbage collection bottlenecks:
            </p>
            <ul>
              <li><strong>Retained DOM &amp; Token Buffer Trees:</strong> Because Chromium renders every past code diff, terminal log, and conversational turn inside a single renderer process, objects remain referenced in the V8 heap. The garbage collector cannot safely sweep these objects, leading to unbounded heap growth.</li>
              <li><strong>Stop-the-World Scavenge Cycles:</strong> As heap usage approaches the default Node.js limit (typically 4 GB or 8 GB), V8 initiates full-generation Mark-Sweep-Compact passes. These synchronous pauses freeze the GUI, causing typed characters to lag and editor interactions to lock up.</li>
              <li><strong>Fatal Heap Out-of-Memory (OOM):</strong> Once total memory breaches the OS or container allocation boundary, the Node process terminates with <code>FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory</code>. Developers are forced to kill the process and discard unsaved context.</li>
            </ul>
            <p>
              <strong>The Memwyre Decoupling Architecture:</strong> Memwyre circumvents V8 garbage collection limits by shifting memory management out of the local process. Using the stateless OpenCode CLI with the Memwyre hook, terminal sessions discard active token buffers cleanly after each interaction. Relevant project architecture is queried on demand via low-latency API calls, keeping local process memory rock-solid under 150 MB indefinitely.
            </p>

            <h3 id="ram-requirements">OpenCode RAM Requirements: CLI vs. Desktop GUI</h3>
            <p>
              Depending on whether you use the full Electron desktop build or the headless CLI with Memwyre, the system hardware requirements diverge dramatically:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div class="p-5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/40 dark:bg-red-950/20 text-xs">
                <div class="text-sm font-bold text-red-900 dark:text-red-300 mb-2 font-mono">OpenCode Desktop GUI Profile</div>
                <div class="space-y-2 text-gray-700 dark:text-gray-300">
                  <div><strong>Minimum RAM:</strong> 16 GB</div>
                  <div><strong>Recommended RAM:</strong> 32 GB – 64 GB</div>
                  <div><strong>Peak Heap Allocation:</strong> 12–20 GB during multi-file refactors</div>
                  <div><strong>Environment:</strong> Local high-performance workstations only (incompatible with small cloud VPS or devcontainers)</div>
                  <div><strong>Typical Failure:</strong> System swap starvation, unhandled Electron crashes, CPU spikes during GC cycles</div>
                </div>
              </div>

              <div class="p-5 rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 text-xs">
                <div class="text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2 font-mono">OpenCode CLI + Memwyre Profile</div>
                <div class="space-y-2 text-gray-700 dark:text-gray-300">
                  <div><strong>Minimum RAM:</strong> 512 MB – 1 GB</div>
                  <div><strong>Recommended RAM:</strong> 2 GB</div>
                  <div><strong>Peak Heap Allocation:</strong> &lt; 150 MB (stateless runtime)</div>
                  <div><strong>Environment:</strong> GitHub Codespaces, low-cost VPS instances, Docker containers, remote SSH boxes, lightweight laptops</div>
                  <div><strong>Memory Retention:</strong> 100% persistent cross-session recall via remote entity graph</div>
                </div>
              </div>
            </div>

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

            <h3 id="memory-md-comparison">Memwyre vs. Manual memory.md &amp; opencode-working-memory</h3>
            <p>
              To work around OpenCode's lack of native session memory, many engineers attempt to maintain a static <code>memory.md</code> or <code>.opencode/working-memory</code> file in their repository root. While this seems straightforward initially, it quickly degrades agent performance:
            </p>
            <ul>
              <li><strong>Context Window Bloat:</strong> Prepending a 1,000-line <code>memory.md</code> file into every prompt wastes 4,000–8,000 tokens per interaction, ballooning LLM API costs and slowing down response latency.</li>
              <li><strong>Attention Distraction &amp; Hallucination:</strong> Large flat files force the model to parse dozens of outdated or irrelevant historical notes, leading to prompt confusion and degraded code generation quality.</li>
              <li><strong>Manual Overhead &amp; Stale Rules:</strong> Developers must manually edit, prune, and reorganize Markdown notes. Obsolete architectural patterns persist indefinitely because flat files lack recency weighting or decay models.</li>
              <li><strong>Zero Cross-Tool Sync:</strong> A local <code>memory.md</code> file stays locked inside that specific git repository and branch. It cannot inform <router-link to="/claude-memory" class="text-[#D97757] hover:underline font-medium">Claude Code</router-link>, <router-link to="/cursor-memory" class="text-[#D97757] hover:underline font-medium">Cursor</router-link>, or teammate workflows.</li>
            </ul>
            <p>
              <strong>The Memwyre Difference:</strong> Instead of dumping static files into the prompt, Memwyre performs <em>dynamic, AST-aware contextual injection</em>. On session start, it retrieves only the top 3–5 high-confidence facts relevant to the active workspace. As your architecture evolves, an integrated Ebbinghaus decay model automatically deprioritizes stale conventions without manual editing.
            </p>

            <h3 id="cross-tool-sync">How Cross-Tool Sync Actually Works</h3>
            <ul>
              <li><strong>OpenCode (plugin):</strong> hooks into session lifecycle. On start → retrieval API. On end → POST transcript.</li>
              <li><strong><router-link to="/claude-memory" class="text-[#D97757] hover:underline font-medium">Claude Code</router-link> / <router-link to="/cursor-memory" class="text-[#D97757] hover:underline font-medium">Cursor</router-link> / <router-link to="/mcp-memory" class="text-[#D97757] hover:underline font-medium">VS Code (MCP)</router-link> / Claude Desktop / <router-link to="/openclaw-memory" class="text-[#D97757] hover:underline font-medium">OpenClaw</router-link>:</strong> connect via MCP or their respective plugins to same vault.</li>
              <li><strong>Cross-Agent Hub:</strong> Learn more in our dedicated <router-link to="/cross-agent-coding-memory" class="text-[#D97757] hover:underline font-semibold">Cross-Agent Coding Memory Guide</router-link>.</li>
              <li><strong>Same API key = same vault.</strong></li>
            </ul>

            <h3 id="opencode-v2-memory">OpenCode v2 Memory Architecture &amp; Migration</h3>
            <p>
              With the release of <strong>OpenCode v2</strong>, the underlying runtime introduced modular plugin lifecycle events (<code>session:start</code>, <code>turn:before</code>, <code>session:end</code>). While OpenCode v2 dramatically improves terminal rendering and tool-call concurrency, it deliberately delegates persistent cross-session state to external memory providers.
            </p>
            <p>
              The Memwyre plugin provides first-class, day-zero support for OpenCode v2:
            </p>
            <ul>
              <li><strong>Zero-Config Auto-Registration:</strong> In OpenCode v2, plugins listed in <code>opencode.json</code> auto-bind to the daemon without requiring manual shell wrappers.</li>
              <li><strong>Streaming Transcript Ingestion:</strong> Ingests execution transcripts asynchronously during turn idle cycles, ensuring large code refactors never block model streaming.</li>
              <li><strong>Backward Compatibility:</strong> Automatically detects whether you are running OpenCode v1 or OpenCode v2 and mounts the corresponding database reader (native <code>node:sqlite</code> for v1 or IPC transport for v2).</li>
            </ul>

            <h3 id="opencode-mem-community">Memwyre vs. Community Scripts (opencode-mem, MemorySync &amp; Mnemosyne)</h3>
            <p>
              As developers searched for memory solutions, several community scripts emerged, including <code>opencode-mem</code>, <code>memorysync</code>, and <code>mnemosyne</code>. While these community prototypes proved the demand for persistent state, they suffer from critical architectural bottlenecks:
            </p>
            <div class="overflow-x-auto my-4">
              <table class="w-full text-xs text-left border border-gray-200 dark:border-gray-800 rounded">
                <thead class="bg-gray-50 dark:bg-zinc-900 uppercase font-mono font-bold text-gray-500">
                  <tr>
                    <th class="px-3 py-2 border-b">Feature</th>
                    <th class="px-3 py-2 border-b">opencode-mem / Mnemosyne</th>
                    <th class="px-3 py-2 border-b">MemorySync</th>
                    <th class="px-3 py-2 border-b text-[#D97757]">Memwyre Plugin</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-zinc-800">
                  <tr>
                    <td class="px-3 py-2 font-semibold">Storage Layer</td>
                    <td class="px-3 py-2">Local JSON / Markdown dump</td>
                    <td class="px-3 py-2">Git commit commits / patches</td>
                    <td class="px-3 py-2 font-bold text-[#D97757]">Cloud / Local SQLite Entity Graph</td>
                  </tr>
                  <tr>
                    <td class="px-3 py-2 font-semibold">Contradiction Handling</td>
                    <td class="px-3 py-2">None (Appends duplicates)</td>
                    <td class="px-3 py-2">Git merge conflicts</td>
                    <td class="px-3 py-2 font-bold text-[#D97757]">Automated entity reconciliation</td>
                  </tr>
                  <tr>
                    <td class="px-3 py-2 font-semibold">IDE Cross-Sync</td>
                    <td class="px-3 py-2">None (OpenCode CLI only)</td>
                    <td class="px-3 py-2">Manual repo pull</td>
                    <td class="px-3 py-2 font-bold text-[#D97757]">Cursor, Claude Code, VS Code MCP</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="architecture">How the Memwyre OpenCode Plugin Works</h2>

            <!-- Visual Diagram 2: OpenCode Plugin Lifecycle Sequence Diagram (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Plugin Lifecycle: Context Injection &amp; Transcript Extraction</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Deterministic Event Sequence</span>
              </div>

              <div class="space-y-4 font-mono text-xs">
                <!-- Step 1: Init & Inject -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="flex items-center justify-between font-bold text-gray-900 dark:text-white mb-2">
                    <span class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] flex items-center justify-center font-mono">1</span>
                      <span>Phase 1: Session Start (create/start hook)</span>
                    </span>
                    <span class="text-[10px] text-gray-500 font-normal">Pre-prompt Injection</span>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                    <div class="p-2 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800">
                      <div class="text-gray-900 dark:text-white font-semibold">1. OpenCode CLI Launches</div>
                      <div>Terminal initializes local environment &amp; triggers plugin hook</div>
                    </div>
                    <div class="p-2 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800">
                      <div class="text-[#D97757] font-semibold">2. Memwyre Retrieval Query</div>
                      <div>Fetches ranked entities matching project repo identifier</div>
                    </div>
                    <div class="p-2 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800">
                      <div class="text-emerald-600 dark:text-emerald-400 font-semibold">3. Prompt Augmented</div>
                      <div>Injects verified architectural constraints into session head</div>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Session End & Extraction -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="flex items-center justify-between font-bold text-gray-900 dark:text-white mb-2">
                    <span class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] flex items-center justify-center font-mono">2</span>
                      <span>Phase 2: Session End / Idle (idle/end hook)</span>
                    </span>
                    <span class="text-[10px] text-gray-500 font-normal">Asynchronous Extraction</span>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                    <div class="p-2 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800">
                      <div class="text-gray-900 dark:text-white font-semibold">1. Transcript Capture</div>
                      <div>Reads session log or queries local opencode.db SQLite</div>
                    </div>
                    <div class="p-2 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800">
                      <div class="text-[#D97757] font-semibold">2. Background Entity Extraction</div>
                      <div>Async workers extract tech decisions, bug fixes, &amp; rules</div>
                    </div>
                    <div class="p-2 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800">
                      <div class="text-emerald-600 dark:text-emerald-400 font-semibold">3. Cross-Tool Cloud Sync</div>
                      <div>Immediately available in Cursor, Claude Code, &amp; OpenClaw</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
              We evaluated Memwyre's retrieval engine against a flat vector RAG baseline on the <strong><a href="https://arxiv.org/abs/2402.17753" target="_blank" rel="noopener noreferrer" class="text-[#D97757] hover:underline">LoCoMo-10 benchmark</a></strong> (Snap Research, ACL 2024):
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

            <p class="flex flex-wrap gap-4 text-sm">
              <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">View the full LoCoMo-10 benchmark results →</router-link>
              <router-link to="/research/vector-database-vs-agent-memory" class="text-[#D97757] hover:underline font-medium">Read our Vector DB vs. Agent Memory research paper →</router-link>
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

            <!-- Connected Ecosystem & Related Integrations -->
            <div class="my-10 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#D97757] mb-1">CONNECTED ECOSYSTEM</div>
              <h3 class="text-lg font-bold text-gray-950 dark:text-white hero-serif mb-4">Explore Related Memory Guides & Integrations</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <router-link to="/blog/best-ai-agent-memories" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Best Agent Memories (2026) →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Compare Memwyre, Mem0, Letta, and Zep across token efficiency benchmarks.</p>
                </router-link>
                <router-link to="/blog/how-to-vibe-code-without-hitting-daily-limits" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Vibe Coding Without Limits →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">5-step playbook to stop context bloat and rate-limit cooldowns.</p>
                </router-link>
                <router-link to="/blog/muse-code-persistent-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Muse Code Memory Guide →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Lifecycle hook integration for Meta's multi-agent terminal CLI.</p>
                </router-link>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <router-link to="/claude-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Claude Code Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Overcome CLAUDE.md limits with automated CLI session ingestion.</p>
                </router-link>
                <router-link to="/cursor-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Cursor AI Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Eliminate Composer chat amnesia with persistent project memory.</p>
                </router-link>
                <router-link to="/blog/openai-dots-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">OpenAI Dots Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Always-on cross-tool persistent memory for continuous ChatGPT Dots.</p>
                </router-link>
              </div>
            </div>

            <h2 id="faq">FAQ</h2>
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
  {
    text: 'Overview & Desktop RAM Dilemma',
    slug: 'tldr',
    children: [
      { text: 'Core Takeaway (TL;DR)', slug: 'tldr' },
      { text: 'Electron & CLI Memory Leaks', slug: 'the-problem' },
      { text: 'GC Limits & OOM Crashes', slug: 'gc-limits-oom' }
    ]
  },
  {
    text: 'Architecture & Token Economics',
    slug: 'opencode-context-architecture',
    children: [
      { text: 'Local vs External Memory Graph', slug: 'opencode-context-architecture' },
      { text: 'RAM & Token ROI', slug: 'token-efficiency' }
    ]
  },
  {
    text: 'Setup Guide & Workflows',
    slug: 'setup',
    children: [
      { text: 'OpenCode MCP Configuration', slug: 'setup' },
      { text: 'Developer Workflows', slug: 'opencode-workflows' }
    ]
  },
  {
    text: 'Comparison, Benchmarks & FAQ',
    slug: 'comparison',
    children: [
      { text: 'Comparison Matrix', slug: 'comparison' },
      { text: 'OpenCode v2 Architecture', slug: 'opencode-v2-memory' },
      { text: 'Community Tools Comparison', slug: 'opencode-mem-community' },
      { text: 'LoCoMo Benchmark', slug: 'benchmark' },
      { text: 'Frequently Asked Questions', slug: 'faq' }
    ]
  }
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
    question: 'How does OpenCode v2 handle memory and plugin lifecycles?',
    answer: 'OpenCode v2 introduces modular session lifecycle hooks (session:start, turn:idle, session:end). While the core v2 engine still runs stateless to keep the CLI fast and responsive, the Memwyre plugin leverages these v2 lifecycle events to auto-inject past architecture decisions on startup and persist newly learned facts asynchronously.'
  },
  {
    question: 'How does Memwyre compare to community tools like opencode-mem, memorysync, and mnemosyne?',
    answer: 'Community scripts like opencode-mem and mnemosyne rely on flat JSON or markdown files that append notes indefinitely, causing prompt token bloat and contradiction confusion. Memwyre uses an AST-aware knowledge graph that extracts concise entities, eliminates duplicate or obsolete rules using Ebbinghaus decay, and syncs seamlessly across OpenCode, Cursor, and Claude Code.'
  },
  {
    question: 'Does OpenCode have persistent memory?',
    answer: 'No. OpenCode does not have native persistent long-term memory across sessions. By default, every time you close an OpenCode terminal or restart a session, all architectural decisions, debugging breakthroughs, and code patterns are flushed. Connecting the Memwyre OpenCode plugin equips OpenCode with cross-session long-term memory that auto-injects relevant context on start and saves learnings on exit.'
  },
  {
    question: 'Why does OpenCode use so much RAM (10–20 GB), and how does Memwyre fix it?',
    answer: 'The OpenCode Desktop GUI renders all past and active sessions inside an Electron/Chromium web runtime, causing memory leaks and DOM buffer bloat over long coding sessions. Memwyre solves this by decoupling memory from the desktop client: developers switch to the ultra-lightweight OpenCode CLI (cutting RAM usage by 90% down to &lt;150 MB) while Memwyre automatically persists architecture context, past decisions, and project conventions across sessions on demand.'
  },
  {
    question: 'What causes OpenCode V8 garbage collector freezes and Out-of-Memory (OOM) crashes?',
    answer: 'In long multi-turn sessions, OpenCode\'s in-memory session heap exceeds Node.js and V8 default heap allocation limits. The V8 garbage collector enters repeated stop-the-world scavenge cycles attempting to reclaim uncollected DOM and diff objects, resulting in GUI freezes and fatal JavaScript heap out of memory crashes. Memwyre avoids this by persisting state asynchronously outside the Node/Electron process.'
  },
  {
    question: 'What are the RAM requirements for running OpenCode CLI vs Desktop?',
    answer: 'OpenCode Desktop GUI requires 16 GB to 32 GB RAM to prevent OS swapping and memory freezes during intensive development. In contrast, the OpenCode CLI paired with Memwyre requires only 512 MB to 1 GB RAM, enabling high-performance AI coding on lightweight VPS instances, GitHub Codespaces, Docker containers, and low-spec machines.'
  },
  {
    question: 'How does Memwyre compare to manual memory.md or opencode-working-memory files?',
    answer: 'Static files like memory.md or opencode-working-memory suffer from token window exhaustion, attention drift, and manual overhead as they grow. Memwyre replaces static files with semantic AST-aware context injection: it dynamically retrieves only the top 3–5 relevant insights for your active task, automatically applies Ebbinghaus decay to obsolete facts, and syncs across Claude Code and Cursor.'
  },
  {
    question: 'What is the best memory plugin for OpenCode?',
    answer: 'Memwyre is the top-ranked memory plugin for OpenCode, scoring 70.5% on the LoCoMo-10 long-term memory benchmark compared to 43.7% for basic vector solutions. It features deterministic lifecycle hooks, zero local RAM overhead, AST code chunking, and bi-directional cross-tool synchronization with Claude Code, Cursor, and VS Code.'
  },
  {
    question: 'How do I maintain consistent memory across OpenCode, Claude Code, and Cursor?',
    answer: 'Memwyre acts as a universal memory hub. By using your single Memwyre API key across the OpenCode plugin, Claude Code hooks, Cursor MCP server, and VS Code extension, decisions made in an OpenCode terminal session are instantly synchronized and accessible to Claude and Cursor in real time.'
  },
  {
    question: 'How do I give OpenCode persistent memory across sessions?',
    answer: 'Install <code>@memwyre/opencode-plugin</code> into your project or global opencode plugins directory, configure the hook in <code>opencode.json</code>, and set your <code>MEMWYRE_API_KEY</code> environment variable. Context is then automatically injected upon SessionStart and saved on SessionEnd.'
  },
  {
    question: 'Is my OpenCode memory data private and secure?',
    answer: 'Yes. Memwyre operates with zero data retention for LLM training. Code transcripts and embeddings are encrypted at rest (AES-256) and in transit (TLS 1.3), with self-hosted on-prem deployment options available for enterprise teams.'
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
  background-color: #f8fafc;
  color: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  overflow-x: auto;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.dark .markdown-content pre {
  background-color: #18181b;
  color: #f4f4f5;
  border: 1px solid #27272a;
}

.markdown-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.markdown-content pre code {
  background-color: transparent !important;
  color: inherit !important;
  padding: 0 !important;
  border-radius: 0 !important;
  border: none !important;
  font-size: inherit !important;
}

.markdown-content p code, 
.markdown-content li code {
  background-color: #f1f5f9;
  color: #0f172a;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  font-size: 0.875em;
}

.dark .markdown-content p code, 
.dark .markdown-content li code {
  background-color: #27272a;
  color: #f4f4f5;
  border-color: #3f3f46;
}

details summary::-webkit-details-marker {
  display: none;
}

details summary {
  list-style: none;
}
</style>
