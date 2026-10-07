<template>
  <ArticleLayout
    section-label="Plugins"
    section-to="/plugins"
    category="OpenClaw"
    date="AUGUST 4, 2026"
    read-time="14 MIN READ · AUTONOMOUS AGENT MEMORY ARCHITECTURE"
    author-name="Himansh Shivhare"
    author-role="Founder & Lead Architect"
    author-avatar="https://avatars.githubusercontent.com/u/170114968?v=4"
    :toc="toc"
    v-model:active-section="activeSection"
    share-label="SHARE THIS PAGE"
  >
    <template #sidebar-links>
      <!-- Official & OpenClaw Community Outbound Links (E-E-A-T) -->
            <div class="space-y-2 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">OFFICIAL RESOURCES</div>
              <a 
                href="https://github.com/openclaw/openclaw" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                OpenClaw Agent Core (GitHub)
              </a>
              <a 
                href="https://learnopenclaw.com" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                LearnOpenClaw Documentation
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
                href="https://docs.memwyre.tech/integrations/plugins/openclaw" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Memwyre OpenClaw Plugin Docs
              </a>
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
        OpenClaw Persistent Memory <br />
          <span class="font-normal text-neutral-900 dark:text-gray-100">Overcoming Context Compaction &amp; <span class="inline-block bg-[#D97757] text-white px-2.5 py-0.5 font-normal rounded-xs">Silent Fact Loss.</span></span>
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
              <router-link to="/signup" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Install Plugin Free →
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/plugins/openclaw" target="_blank" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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
                  <strong>Answer:</strong> By default, OpenClaw relies on in-memory transcripts and flat Markdown logs that suffer from <strong>context compaction loss</strong> (automated history summarization that silently erases granular architectural decisions) and high RAM usage from browser-control screenshot buffers. The <strong>Memwyre Plugin</strong> solves this by offloading agent observations into a persistent, cloud-hosted semantic entity graph that survives agent resets, compaction cycles, and tool restarts.
                </p>
              </div>
            </div>

            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">Zero</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Compaction Loss</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Survives History Pruning</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">Fast</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Entity Traversal</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Sub-Agent Context Fetch</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">70.5%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Multi-Run Recall</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">LoCoMo-10 Benchmark</div>
                </div>
              </div>
            </div>

            <h2 id="the-problem">The Problem: OpenClaw Autonomous Agents Forget Everything</h2>
            <p>
              Autonomous coding agents operate on fundamentally different paradigms than standard conversational chatbots. In OpenClaw, an agent doesn't simply respond to a prompt; it enters an autonomous loop: reading file trees, running tests in headless terminals, spinning up Playwright/Puppeteer browser instances, and analyzing visual DOM states.
            </p>
            <p>
              However, every time an autonomous agent run terminates or the execution context window reaches its token limit, everything resets. Architectural contracts formulated on step 3 are wiped out by step 45, forcing the agent to repeat expensive exploration loops and introduce code regressions.
            </p>

            <!-- Visual Diagram 1: Autonomous Agent Memory Architecture (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Autonomous Agent Memory Architecture</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Compaction Bottleneck vs External Entity Graph</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <!-- Native Ephemeral Agent Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>Native OpenClaw Compaction</span>
                    <span class="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">In-Memory Buffers</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Local Execution Context</div>
                    <div>┌─ Ephemeral Transcript Array</div>
                    <div>├─ DOM Screenshots: 8–15 MB RAM/step</div>
                    <div>├─ Token Threshold (80%): Compaction triggered</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">▼ SILENT FACT DELETION (Lossy Summarization)</div>
                    <div class="text-gray-400 dark:text-gray-500 italic text-[10px]">&nbsp;&nbsp;(DB constraints &amp; fixed edge cases forgotten)</div>
                    <div class="pt-2 text-gray-500 dark:text-gray-400">Next Agent Run:</div>
                    <div class="text-gray-900 dark:text-white font-bold">↳ 100% AMNESIA (Full Re-exploration)</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Lossy summarization prunes exact variable types and deployment flags. Browser screenshot buffers trigger severe RAM inflation.
                  </div>
                </div>

                <!-- Memwyre Graph Memory Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>Memwyre Persistent Graph</span>
                    <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black font-semibold px-2 py-0.5 rounded">Offloaded Vault</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Decoupled Semantic Entity Graph</div>
                    <div>┌─ Lifecycle Hooks: SessionStart / SessionStop</div>
                    <div>├─ Pre-Compaction Intercept: Facts preserved</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">✔ ZERO FACT LOSS (Hierarchical AST Graph)</div>
                    <div class="text-gray-500 dark:text-gray-400 text-[10px]">&nbsp;&nbsp;(Screenshots purged; structured facts saved)</div>
                    <div class="pt-2 text-gray-500 dark:text-gray-400">Cross-Tool Portability:</div>
                    <div class="text-gray-900 dark:text-white font-bold">↳ SHARED with Cursor, Claude Code, VS Code</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Decoupled persistence ensures that memory survives compaction loops, agent crashes, and reboots with on-demand retrieval.
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 1: Context Compaction Deep Dive -->
            <h2 id="context-compaction-mechanics">The Mechanics of Context Compaction: Why Autonomous Agents Suffer from Amnesia</h2>
            <p>
              To understand why autonomous agents make circular mistakes during multi-hour runs, developers must look at how agent runtimes manage the LLM token budget. OpenClaw tracks accumulated tokens in the message transcript. When context window consumption hits <code>maxContextTokens</code> (typically 80% of capacity, or ~100,000 tokens on a 128K model), the runtime initiates <strong>Context Compaction</strong>:
            </p>

            <h3 id="compaction-algorithm">1. The Compaction Loop &amp; Lossy Compression</h3>
            <p>
              The runtime slices the message history, retaining only the initial system prompt and the latest 2–3 messages. The intermediary 30 turns (containing shell outputs, diff attempts, and compiler errors) are passed to an LLM with the instruction: <em>"Summarize the conversation progress so far."</em>
            </p>
            <p>
              While this reduces context tokens by ~85%, it destroys <strong>factual fidelity</strong>. High-level summaries like <em>"Agent debugged Redis auth issue and updated server configuration"</em> discard the actual port numbers, cryptographic salt algorithms, and configuration flags discovered during trial-and-error.
            </p>

            <h3 id="screenshot-buffer-bloat">2. Browser Screenshot Buffer Leaks</h3>
            <p>
              Autonomous browser verification is one of OpenClaw's strongest features. However, capturing full-page PNG screenshots in base64 format places immense strain on the Node.js V8 heap. Holding multiple visual states in the in-memory transcript causes OpenClaw's memory footprint to surge from 150 MB to over 3.5 GB, causing garbage collection spikes and eventual OOM (Out of Memory) crashes during long refactors.
            </p>

            <!-- Deep Educational Section 2: OpenClaw Configuration & Tool Profiles -->
            <h2 id="openclaw-config-guide">Mastering OpenClaw Tool Profiles &amp; Agent Configuration</h2>
            <p>
              OpenClaw governs agent autonomy through explicit <strong>Tool Profiles</strong>. Understanding how tool permissions interact with memory persistence is vital to prevent agents from getting trapped in permission prompts:
            </p>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Profile</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Allowed Toolsets</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Memory Plugin Support</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Recommended Use Case</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-mono">
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">minimal</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Read-only file operations and basic text responses.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-400">Disabled</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Static code audits and vulnerability scanning.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">standard</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">File read/write, git operations, basic shell.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-gray-400">Limited (Hooks only)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Isolated bug fixes and single-file refactors.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">coding</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Full shell execution, test runners, package managers.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-emerald-600 dark:text-emerald-400">Full (Hooks + Tools)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">End-to-end feature implementations and refactors.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">full</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Unrestricted: Browser control, network, terminal, tools.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold text-emerald-600 dark:text-emerald-400">Full (Hooks + Tools)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Autonomous multi-agent migrations and QA loops.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Deep Educational Section 3: Production OpenClaw Configuration -->
            <h2 id="production-openclaw-config">Production OpenClaw Configuration Template</h2>
            <p>
              Below is an enterprise-hardened <code>~/.openclaw/config.json</code> configuration template. It optimizes context thresholds, establishes memory hooks, and configures sandbox boundaries:
            </p>

            <pre><code class="language-json">{
  "agent": {
    "defaultModel": "anthropic/claude-3-7-sonnet-20250219",
    "toolProfile": "coding",
    "maxContextTokens": 100000,
    "temperature": 0.2,
    "maxIterations": 50
  },
  "browser": {
    "headless": true,
    "screenshotQuality": 60,
    "maxScreenshotsPerSession": 5
  },
  "plugins": {
    "entries": {
      "@memwyre/openclaw-plugin": {
        "enabled": true,
        "config": {
          "apiKey": "bv_sk_your_api_key_here",
          "hostUrl": "https://api.memwyre.tech",
          "autoInjectContext": true,
          "autoCaptureSession": true
        }
      }
    }
  }
}</code></pre>

            <!-- Visual Diagram 2: OpenClaw Agent Lifecycle Sequence (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">OpenClaw Autonomous Lifecycle Sequence</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Start &rarr; Mid-Session Query &rarr; Stop Extraction</span>
              </div>

              <div class="space-y-4 font-mono text-xs min-w-[580px]">
                <!-- Step 1: Agent Initialization -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">SessionStart Hook &rarr; Deterministic Context Injection</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">&lt;280ms Latency</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Agent CLI launches. The plugin detects repository roots, retrieves top-k architecture rules from Memwyre vault, and wraps them in a dense <code>&lt;memwyre-context&gt;</code> block in the system prompt.
                    </p>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 2: Mid-Run Autonomous Queries -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Mid-Run Tool Invocations (search_memwyre / save_memory)</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Active Loop</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      During a 40-step migration, whenever the agent encounters ambiguous schema definitions, it executes <code>search_memwyre</code> rather than blindly scraping external documentation or guessing contracts.
                    </p>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 3: Session Stop Extraction -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">SessionStop Hook &rarr; Background Entity Extraction</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Async Cloud Sync</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      When the agent run terminates, the session transcript is posted to the extraction worker. Discovered bug fixes and verified architectural patterns are committed to the graph, ready for Cursor or Claude Code.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 4: Token ROI & RAM Economics -->
            <h2 id="agent-token-ram-economics">Token Economics &amp; RAM Optimization in Long-Running Agents</h2>
            <p>
              Autonomous loops burn tokens and workstation memory at scale. Decoupling memory into an external entity graph delivers drastic efficiency dividends:
            </p>

            <!-- Visual Diagram 3: Token Economics Math (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Agent Memory Economics</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Per 50 Multi-Step Autonomous Runs</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono min-w-[580px]">
                <!-- Unmanaged Strategy -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">Unmanaged Transcripts</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~65,000 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Retaining full browser &amp; bash logs</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>RAM Usage: 2.8 GB – 4.5 GB</div>
                    <div>Compaction Trigger: Turn 22</div>
                    <div class="font-bold text-gray-900 dark:text-white">Frequent OOM Aborts</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Agent memory bloat crashes long refactors and triggers repetitive exploration cycles.
                  </div>
                </div>

                <!-- Native Compaction -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">Native Lossy Compaction</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~15,000 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">LLM text summary compression</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Fact Retention: ~35%</div>
                    <div>Cross-Tool Sync: Zero</div>
                    <div class="font-bold text-gray-900 dark:text-white">Circular Hallucinations</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Compresses prompt size but discards precise architectural contracts and command arguments.
                  </div>
                </div>

                <!-- Memwyre Plugin -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-900 dark:text-white text-[11px] uppercase font-bold">Memwyre Plugin</span>
                      <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black px-1.5 py-0.5 rounded font-semibold">Low Latency</span>
                    </div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">&lt;1,500 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Scoped semantic context injection</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>RAM Usage: &lt;200 MB Flat</div>
                    <div>Token Reduction: -81%</div>
                    <div class="font-bold text-gray-900 dark:text-white">Full Cross-Tool Portability</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Structured knowledge graph offloads conversation state; eliminates RAM bloat and token saturation.
                  </div>
                </div>
              </div>
            </div>

            <!-- Comparison Table -->
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
              <li><strong>Cross-tool ecosystem:</strong> Mem0 and Zep require custom sync pipelines to share memory between your CLI agents and your IDE. Memwyre's shared vault connects OpenClaw agent sessions directly to <router-link to="/cursor-memory" class="text-[#D97757] hover:underline font-medium">Cursor AI</router-link>, <router-link to="/mcp-memory" class="text-[#D97757] hover:underline font-medium">VS Code (MCP)</router-link>, and <router-link to="/claude-memory" class="text-[#D97757] hover:underline font-medium">Claude Code</router-link>.</li>
              <li><strong>Benchmark performance:</strong> On the <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">LoCoMo-10 benchmark</router-link> (<a href="https://arxiv.org/abs/2402.17753" target="_blank" rel="noopener noreferrer" class="text-[#D97757] hover:underline font-medium">Snap Research, ACL 2024</a>), Memwyre's cross-encoder engine scores <strong>70.5% accuracy</strong> vs. 43.7% for flat vector RAG baselines, using 81% fewer tokens. <em>(Deep dives available on our <router-link to="/memwyre-vs-mem0" class="text-[#D97757] hover:underline font-medium">Memwyre vs. Mem0</router-link> and <router-link to="/memwyre-vs-zep" class="text-[#D97757] hover:underline font-medium">Memwyre vs. Zep</router-link> pages.)</em></li>
            </ul>

            <h3 id="cross-tool-sync">How Cross-Tool Sync Actually Works</h3>
            <ul>
              <li><strong>OpenClaw (plugin):</strong> hooks into session lifecycle events. On start → retrieval API. On stop → POST transcript to capture endpoint.</li>
              <li><strong><router-link to="/claude-memory" class="text-[#D97757] hover:underline font-medium">Claude Code</router-link> / <router-link to="/cursor-memory" class="text-[#D97757] hover:underline font-medium">Cursor</router-link> / <router-link to="/mcp-memory" class="text-[#D97757] hover:underline font-medium">VS Code (MCP)</router-link> / Claude Desktop:</strong> connect via Memwyre MCP server, same vault.</li>
              <li><strong>Same API key = same vault.</strong> Memory captured in an OpenClaw agent run is available in <router-link to="/cursor-memory" class="text-[#D97757] hover:underline font-medium">Cursor</router-link> at the next prompt.</li>
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
              The improvement comes from architectural drivers like dynamic context pruning, two-stage cross-encoder re-ranking, and Ebbinghaus logarithmic recency decay.
              <span class="block mt-2 flex flex-wrap gap-4 text-sm">
                <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">View the full LoCoMo-10 benchmark results →</router-link>
                <router-link to="/research/vector-database-vs-agent-memory" class="text-[#D97757] hover:underline font-medium">Read our Vector DB vs. Agent Memory research paper →</router-link>
              </span>
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
              <li><strong>License:</strong> <a href="https://github.com/memwyreai/Memwyre" target="_blank" class="text-[#D97757] hover:underline font-medium">Apache-2.0</a></li>
              <li><strong>System requirements:</strong> Node.js 18+, any OS, no local DB needed</li>
              <li><strong>Self-hosting:</strong> Docker deployment available</li>
              <li><strong>Tool Profile:</strong> OpenClaw tool profile must be <code>full</code> or <code>coding</code></li>
            </ul>

            <h2 id="honest-take">Why Not Just Use Manual Context Files?</h2>
            <p>
              Manual context files are fine for static rules. But they face real limitations: manual maintenance, flat storage, and they are tool-locked.
            </p>

            <!-- Connected Ecosystem & Related Integrations -->
            <div class="my-10 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#D97757] mb-1">CONNECTED ECOSYSTEM</div>
              <h3 class="text-lg font-bold text-gray-950 dark:text-white hero-serif mb-4">Explore More Agent Memory Integrations</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <router-link to="/claude-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Claude Code Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Overcome CLAUDE.md limits with automated CLI session ingestion.</p>
                </router-link>
                <router-link to="/cursor-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Cursor AI Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Eliminate Composer chat amnesia with persistent project memory.</p>
                </router-link>
                <router-link to="/opencode-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">OpenCode Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">118MB lightweight memory layer for terminal-native coding agents.</p>
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
            
            <hr class="my-8 border-gray-200 dark:border-gray-800" />
            <div class="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 mt-8">
              <h3 class="text-lg font-bold mb-2 hero-serif !mt-0">Give OpenClaw Persistent Memory</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                One plugin install. Automatic context injection. Automatic session capture. Memory that works seamlessly across your autonomous agent sessions.
              </p>
              <router-link to="/signup" class="px-6 py-2 bg-[#D97757] text-white rounded text-sm font-semibold inline-block hover:bg-[#c05c3d] transition-colors">
                Start Free
              </router-link>
            </div>
    </div>
  </ArticleLayout>
</template>

<script setup>
import ArticleLayout from '@/components/ArticleLayout.vue';
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
  {
    text: 'Overview & The Problem',
    slug: 'tldr',
    children: [
      { text: 'Core Takeaway (TL;DR)', slug: 'tldr' },
      { text: 'Autonomous Agent Context Rot', slug: 'the-problem' }
    ]
  },
  {
    text: 'Compaction Mechanics & Screenshots',
    slug: 'context-compaction-mechanics',
    children: [
      { text: 'Compaction Algorithm & Pitfalls', slug: 'compaction-algorithm' },
      { text: 'Screenshot & Buffer Bloat', slug: 'screenshot-buffer-bloat' }
    ]
  },
  {
    text: 'Tool Profiles & Architecture',
    slug: 'openclaw-tool-profiles',
    children: [
      { text: 'Dynamic Tool Profiles', slug: 'openclaw-tool-profiles' },
      { text: 'Dual-Layer Architecture', slug: 'openclaw-memory-architecture' },
      { text: 'Token Economics & ROI', slug: 'token-economics' }
    ]
  },
  {
    text: 'Setup Guide & Workflows',
    slug: 'setup',
    children: [
      { text: 'OpenClaw Agent Setup', slug: 'setup' },
      { text: 'Long-Running Agent Workflows', slug: 'workflows' }
    ]
  },
  {
    text: 'Comparison, Benchmarks & FAQ',
    slug: 'comparison',
    children: [
      { text: 'Comparison Matrix', slug: 'comparison' },
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
    question: 'Does OpenClaw have built-in memory?',
    answer: 'No. OpenClaw relies on external plugins for persistence.'
  },
  {
    question: 'How is Memwyre different from Mem0 and Zep for OpenClaw?',
    answer: 'Frameworks like <strong>Mem0</strong> and <strong>Zep</strong> are built for custom AI application backends, requiring developers to write Python/TS SDK code and manage database instances. <strong>Memwyre</strong> provides a zero-code native plugin for OpenClaw (<code>openclaw plugins install @memwyre/openclaw-plugin</code>) that hooks directly into agent session lifecycles, enabling instant cross-tool context sync with Cursor, VS Code, and Claude Desktop. Memwyre also scores 70.5% on the LoCoMo-10 benchmark vs. 43.7% for flat vector baselines.'
  },
  {
    question: 'What is the best OpenClaw memory plugin?',
    answer: 'Depends. Memwyre for cross-tool automated memory (70.5% LoCoMo), claude-mem for local-first (89K stars, AGPL-3.0).'
  },
  {
    question: 'How is Memwyre different from claude-mem?',
    answer: '<strong>claude-mem</strong> stores observations locally in SQLite + ChromaDB — great for single-machine use with zero cloud dependency. <strong>Memwyre</strong> uses a shared cloud vault with an entity graph and two-stage cross-encoder re-ranking, enabling cross-tool sync without SSH setup. License-wise, claude-mem is AGPL-3.0; Memwyre is Apache-2.0. On retrieval quality, Memwyre scores 70.5% on LoCoMo-10 vs. 43.7% for flat vector baselines, using 81% fewer context tokens.'
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
    question: 'How does Memwyre prevent context compaction loss in OpenClaw?',
    answer: 'When OpenClaw hits its <code>maxContextTokens</code> threshold, its native compaction loop compresses chat history into a brief summary, discarding critical facts. Memwyre intercepts observations before compaction occurs and indexes them in a persistent entity graph. When the agent later requires specific parameters, schemas, or prior execution results, it queries Memwyre directly via <code>search_memwyre</code> with zero compaction loss.'
  },
  {
    question: 'Does the Memwyre plugin reduce OpenClaw RAM and CPU usage?',
    answer: 'Yes. In-memory transcript storage and large screenshot buffers cause OpenClaw agents to consume excessive RAM. Memwyre offloads conversation context to external cloud or self-hosted storage, allowing agents to prune redundant local buffers and run lightweight loops indefinitely.'
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
