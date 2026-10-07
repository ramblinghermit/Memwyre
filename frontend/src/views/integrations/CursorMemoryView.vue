<template>
  <ArticleLayout
    section-label="Plugins"
    section-to="/plugins"
    category="Cursor AI"
    date="AUGUST 2026"
    read-time="12 MIN READ · TECHNICAL SPECIFICATION &amp; BENCHMARKS"
    author-name="Himansh Shivhare"
    author-role="Founder & Lead Architect"
    author-avatar="https://avatars.githubusercontent.com/u/170114968?v=4"
    :toc="toc"
    v-model:active-section="activeSection"
    share-label="SHARE THIS PAGE"
  >
    <template #sidebar-links>
      <!-- Official Resources Outbound Links (E-E-A-T) -->
            <div class="space-y-2 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">OFFICIAL RESOURCES</div>
              <a 
                href="https://docs.cursor.com/context/@-symbols/@-files" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Cursor Context Docs
              </a>
              <a 
                href="https://forum.cursor.com/" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Cursor Community Forum
              </a>
              <a 
                href="https://docs.cursor.com/context/rules-for-ai" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                .cursorrules Guide
              </a>
              <a 
                href="https://modelcontextprotocol.io" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Model Context Protocol (MCP)
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
            </div>

            <!-- Share Buttons -->
            <div class="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold">SHARE THIS PAGE</div>
              <div class="flex items-center gap-2">
                <a 
                  :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`" 
                  target="_blank"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                  title="Share on LinkedIn"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a 
                  :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`" 
                  target="_blank"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                  title="Share on Twitter"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
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
        Cursor AI Persistent Memory <br />
          <span class="font-normal text-neutral-900 dark:text-gray-100">Long-Term Context for <span class="inline-block bg-[#D97757] text-white px-2.5 py-0.5 font-normal rounded-xs">Composer &amp; Chat.</span></span>
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
                <span>Tested with: <strong class="text-gray-800 dark:text-gray-200">Cursor v0.42+, Composer, Chat</strong></span>
                <span>Protocol: <strong class="text-gray-800 dark:text-gray-200">MCP (Stdio / Remote HTTP)</strong></span>
                <span>License: <strong class="text-gray-800 dark:text-gray-200">Apache-2.0</strong></span>
              </div>
            </div>

            <!-- TL;DR -->
            <h2 id="tldr">TL;DR</h2>
            <p>
              Supercharge Cursor Composer and Chat with cross-session, project-wide memory. The Memwyre MCP Gateway injects past design patterns, database schemas, and architectural boundaries without forcing slow, expensive codebase index rebuilds.
            </p>
            <div class="flex flex-wrap gap-3 my-6">
              <router-link to="/signup" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Connect Cursor Free →
              </router-link>
              <router-link to="/blog/cursor-vs-claude-code-context" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Cursor vs Claude Code Comparison
              </router-link>
            </div>

            <!-- Quick Summary / Answer-First Box -->
            <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm my-6">
              <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="space-y-2">
                <div class="text-[#D97757] font-mono text-xs uppercase font-bold tracking-wider">Quick Summary / Key Takeaways</div>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  <strong>Answer:</strong> While Cursor offers local codebase vector indexing and static <code>.cursorrules</code> files, Composer sessions frequently lose project-level architectural rationale across multi-file refactors. Rebuilding local embeddings takes minutes and consumes vast local resources. Connecting Cursor to the <strong>Memwyre MCP Server</strong> gives Cursor real-time semantic memory retrieval on demand, reducing context token overhead by <strong>81%</strong> and enabling instantaneous cross-tool memory synchronization with Claude Code and terminal CLI agents.
                </p>
              </div>
            </div>

            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">Rapid</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Retrieval Latency</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Instant Context Delivery</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">-81%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Token Reduction</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Selective Semantic Ingestion</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">70.5%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">LoCoMo Recall</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Multi-Factor Graph Accuracy</div>
                </div>
              </div>
            </div>

            <!-- The Problem Section -->
            <h2 id="the-problem">The Problem: Why Cursor Forgets and Over-Consumes Tokens</h2>
            <p>
              Cursor revolutionized developer productivity with <strong>Cursor Composer</strong> (multi-file agentic edits) and <strong>Cursor Chat</strong>. However, as codebases grow beyond thousands of files, developers encounter three fundamental bottlenecks:
            </p>
            <ol>
              <li><strong>Context Window Saturation:</strong> When Composer reads across dozens of files, your context window fills up rapidly. Critical system design instructions established three messages prior get pushed out of the attention window.</li>
              <li><strong>Static vs Dynamic Memory:</strong> <code>.cursorrules</code> files are static text files. They cannot learn dynamically from your debugging discoveries, temporary API workarounds, or deployment constraints.</li>
              <li><strong>Local Index Rebuild Overhead:</strong> Cursor's built-in codebase indexing scans and computes embeddings locally. When git branches switch or files undergo mass refactors, the index stalls, leaving Cursor unaware of fresh architecture decisions.</li>
            </ol>

            <!-- Visual Diagram 1: Cursor Context Architecture Teardown (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Context Architecture Teardown</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Static .cursorrules vs Dynamic Memory</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <!-- Native Cursor Index Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>Cursor Native Context</span>
                    <span class="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Static Files + AST</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">.cursorrules + @Codebase Index</div>
                    <div>┌─ .cursorrules: Hardcoded static constraints</div>
                    <div>├─ @Codebase: Local vector scan (1.2s - 4.5s)</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">▼ RE-INDEX STALL ON BRANCH SWITCH</div>
                    <div class="text-gray-400 dark:text-gray-500 italic text-[10px]">&nbsp;&nbsp;(Ephemeral debugging rationale lost across chats)</div>
                    <div class="pt-2 text-gray-500 dark:text-gray-400">Claude Code / Terminal Sync:</div>
                    <div class="text-gray-900 dark:text-white font-bold">↳ ZERO SYNC (Machine &amp; Editor Locked)</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Static Markdown rulebook and local AST index. High token burn during multi-file Composer edits. Zero cross-tool portability.
                  </div>
                </div>

                <!-- Memwyre MCP Layer Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>Memwyre MCP Layer</span>
                    <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black font-semibold px-2 py-0.5 rounded">Multi-Factor Graph</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Universal Vault + Two-Stage Cross-Encoder</div>
                    <div>┌─ Dynamic Memory: Learns bugfixes on-the-fly</div>
                    <div>├─ Low-Latency Query: On-demand MCP tool call</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">✔ 81% Token Reduction in Composer</div>
                    <div class="text-gray-500 dark:text-gray-400 text-[10px]">&nbsp;&nbsp;(Only top-k relevant architecture rules injected)</div>
                    <div class="pt-2 text-gray-500 dark:text-gray-400">Cross-Tool Portability:</div>
                    <div class="text-gray-900 dark:text-white font-bold">↳ SHARED with Claude Code, VS Code, and CLI</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Universal entity graph accessed via standardized Model Context Protocol (MCP) with zero indexing lag.
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 1: The Complete Guide to .cursorrules -->
            <h2 id="cursorrules-masterclass">The Complete Guide to .cursorrules: Hierarchy, Formatting &amp; Best Practices</h2>
            <p>
              Just as Anthropic uses <code>CLAUDE.md</code>, Cursor relies on <code>.cursorrules</code> (or the modern <code>.cursor/rules/*.mdc</code> structure introduced in v0.42+) to shape model behavior. Properly structuring these rules prevents Composer from introducing deprecated conventions or violating codebase invariants.
            </p>

            <h3 id="cursorrules-hierarchy">Resolution Precedence &amp; Modern MDC Architecture</h3>
            <p>
              In newer versions of Cursor, project rules can be scoped globally or partitioned into modular rule definitions:
            </p>
            <ul>
              <li><strong>Root Rulebook (<code>./.cursorrules</code>):</strong> The traditional single-file configuration at your project root. Injected into every Composer session and Chat thread. Best for core tech stack definitions, package manager invariants, and lint commands.</li>
              <li><strong>Modular Rule Directory (<code>./.cursor/rules/*.mdc</code>):</strong> Modern Cursor architecture allowing granular, path-specific rules. For example, <code>.cursor/rules/database.mdc</code> can automatically activate only when editing files matching <code>src/db/**/*</code>, preventing frontend UI sessions from being bloated with SQL schemas.</li>
              <li><strong>User Settings (Global Rules):</strong> Configured in <em>Cursor Settings &rarr; General &rarr; Rules for AI</em>. Applies across every project on your workstation. Reserve this for personal habits (e.g. <em>"Prefer functional components over class components"</em>).</li>
            </ul>

            <h3 id="cursorrules-template">Production .cursorrules Master Template</h3>
            <p>
              Below is a battle-tested, high-density <code>.cursorrules</code> template designed to maximize accuracy and minimize context bloat:
            </p>

            <pre><code class="language-markdown"># Project Architecture &amp; Coding Standards

## Technology Stack
- Runtime: Node.js 20 LTS (Package manager: pnpm strict mode)
- Framework: Next.js 15 (App Router, React Server Components by default)
- Database: PostgreSQL 16 with Drizzle ORM
- Styling: Tailwind CSS v4 with Shadcn UI components

## Composer Invariants
- Always use early return guard clauses.
- Use explicit TypeScript interfaces over type aliases for public APIs.
- NEVER invent fallback mock data in production services. Throw explicit errors.
- Never modify files outside the immediate scope requested by the prompt.

## Build, Test &amp; Lint Commands
- Dev Server: `pnpm run dev` (Port 3000)
- Typecheck: `pnpm run type-check`
- Unit Tests: `pnpm test`
- E2E Tests: `pnpm test:e2e`</code></pre>

            <!-- Deep Educational Section 2: Cursor Context Symbols Masterclass -->
            <h2 id="cursor-context-symbols">Mastering Cursor Context Symbols: @Files, @Codebase, @Docs &amp; @Git</h2>
            <p>
              Cursor's prompt system uses <code>@</code>-symbols to pull context dynamically into Chat and Composer. Understanding their resource footprints is critical to preventing token window saturation:
            </p>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Symbol</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Target Mechanism</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Token Cost Impact</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Developer Best Practice</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-mono">
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">@Files / @Folders</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Injects full verbatim file contents into the active prompt.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">Linear to file size (1,000–8,000+ tokens per file)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Use exclusively when direct modifications to that specific file are necessary.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">@Codebase</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Vector search over local embeddings repository chunks.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">Medium to High (injects 5–15 code chunks)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Best for "Where is X defined?" exploratory queries; avoid on multi-step refactors.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">@Docs</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Fetches and indexes external library documentation URLs.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">Variable (1,500–5,000 tokens)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Essential when working with newly released SDKs or un-indexed third-party APIs.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">@Git</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Injects git diffs, working branch status, and commit logs.</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">Proportional to active branch diff size</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Ideal for generating conventional commit messages and PR descriptions.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Deep Educational Section 3: Composer Context Fatigue -->
            <h2 id="composer-context-fatigue">Why Cursor Composer Suffers from Context Fatigue in Large Refactors</h2>
            <p>
              Cursor Composer is capable of orchestrating multi-file edits simultaneously. However, during an extended refactor involving 10+ files, developers frequently observe a rapid degradation in code quality. This phenomenon is known as <strong>Agentic Context Fatigue</strong>:
            </p>
            <ul>
              <li><strong>Lost In The Middle Effect:</strong> When Composer reads 15 files sequentially, earlier files and your initial instruction set drift toward the middle of the 128K/200K token context window. LLM attention curves naturally prioritize the beginning and end of the prompt, causing Composer to subtly omit core edge cases established in turn 1.</li>
              <li><strong>Diff Hallucinations:</strong> As the token buffer fills with tool executions and file contents, Composer's speculative edit generation begins making partial diff assumptions, generating duplicate function signatures or phantom imports.</li>
              <li><strong>The Solution — Selective Semantic Memory:</strong> Instead of dumping raw files into the prompt, query an external memory layer for only the synthesized architectural contracts. This keeps Composer's active context window below 10,000 tokens, preserving razor-sharp attention.</li>
            </ul>

            <!-- Visual Diagram 2: Context Pipeline Flow (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Cursor MCP Memory Pipeline</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Composer &rarr; MCP Gateway &rarr; Vault</span>
              </div>

              <div class="space-y-4 font-mono text-xs min-w-[580px]">
                <!-- Step 1: Composer Prompt Execution -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Cursor Composer Invocation &rarr; MCP Query</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">&lt;280ms Latency</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Developer instructs Composer: <em>"Refactor the authentication flow."</em> Composer invokes <code>search_memwyre</code> to retrieve project auth contracts rather than brute-forcing a full codebase vector scan.
                    </p>
                    <div class="p-2 rounded bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[11px] text-gray-800 dark:text-gray-200 font-mono">
                      POST /mcp/tools/call { name: "search_memwyre", arguments: { query: "JWT auth refresh rotation" } }
                    </div>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 2: Multi-Factor Retrieval -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Vault Re-Ranking &rarr; Two-Stage Cross-Encoder</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">AST + Recency Engine</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      The engine retrieves top-k relevant architecture rules, suppresses stale patterns via Ebbinghaus decay, and injects concise specifications into Composer's context.
                    </p>
                    <div class="p-2 rounded bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[11px] text-gray-800 dark:text-gray-200 font-mono">
                      Returned Context: "JWT rotation in httpOnly cookie; Redis distributed lock for refresh token race condition"
                    </div>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 3: Multi-File Code Synthesis & Cross-Tool Sync -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Precision Code Generation &rarr; Cross-Tool Sync</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Cross-Tool Active</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Composer executes the multi-file refactor adhering strictly to the architecture. Any new constraints agreed upon in chat are persisted back via <code>save_memory</code>, immediately available in <router-link to="/claude-memory" class="text-[#D97757] hover:underline font-medium">Claude Code CLI</router-link>.
                    </p>
                    <div class="p-2 rounded bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[11px] text-gray-800 dark:text-gray-200 font-mono">
                      ✔ Synced to cloud vault &mdash; Accessible instantly in <router-link to="/claude-memory" class="text-[#D97757] hover:underline">Claude Code</router-link> &amp; <router-link to="/mcp-memory" class="text-[#D97757] hover:underline">VS Code via MCP</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 4: Token ROI Math -->
            <h2 id="token-efficiency">Token Economics in Cursor: Quantifying Token Reductions in Composer</h2>
            <p>
              Multi-file Composer sessions burn tokens at unprecedented rates. Comparing the context strategies reveals how targeted semantic retrieval dramatically slashes costs while improving accuracy:
            </p>

            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Composer Token Economics</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Per 50 Multi-File Composer Sessions</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono min-w-[580px]">
                <!-- Unmanaged Strategy -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">Unmanaged Raw Dumps</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~45,000 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Dumping entire source files via @Files</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Input Tokens: 2.25M / mo</div>
                    <div>Attention Degradation: High</div>
                    <div class="font-bold text-gray-900 dark:text-white">Frequent Diff Hallucinations</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Context window fills rapidly; earlier architecture rules drop out of attention.
                  </div>
                </div>

                <!-- Native @Codebase Vector -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">@Codebase Vector Scan</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~12,000 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Local embedding chunks retrieval</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Input Tokens: 600K / mo</div>
                    <div>Latency: 1.2s – 4.5s</div>
                    <div class="font-bold text-gray-900 dark:text-white">No Historical Rationale</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Cannot explain why architectural choices were made or capture cross-session bug fixes.
                  </div>
                </div>

                <!-- Structured Memwyre MCP -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-900 dark:text-white text-[11px] uppercase font-bold">Memwyre MCP Layer</span>
                      <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black px-1.5 py-0.5 rounded font-semibold">Low Latency</span>
                    </div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">&lt;1,500 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Top-k synthesized memory graph</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Input Tokens: 75K / mo</div>
                    <div>Token Reduction: -81%</div>
                    <div class="font-bold text-gray-900 dark:text-white">Zero Index Stall (Cloud Vault)</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Two-stage cross-encoder ensures only the exact contracts and schema rules are injected into Composer.
                  </div>
                </div>
              </div>
            </div>

            <!-- Deconstructing Cursor Memory Architecture (15% Focused Memwyre Solution) -->
            <h2 id="cursor-context-architecture">Deconstructing Cursor Context: .cursorrules vs Codebase Index vs Memwyre</h2>
            <p>
              To optimize Cursor for complex enterprise development, it is vital to understand the three layers of context:
            </p>

            <h3 id="layer-cursorrules">1. .cursorrules (Static Rulebook)</h3>
            <p>
              Similar to Claude's <code>CLAUDE.md</code>, a <code>.cursorrules</code> file lives in your project root and defines hard constraints (e.g. <em>"Use TypeScript 5 decorators"</em>, <em>"Do not import Lodash"</em>). While indispensable for permanent rules, it does not record conversational breakthroughs or transient technical context.
            </p>

            <h3 id="layer-codebase-indexing">2. Native Codebase Indexing (@Codebase)</h3>
            <p>
              Cursor computes vector embeddings over your repository files to answer <code>@Codebase</code> questions. While effective for code discovery, it operates on static source code files. It cannot index rationale, such as <em>why</em> a certain database migration strategy was chosen or <em>what</em> edge case caused an outage last week.
            </p>

            <h3 id="layer-memwyre-graph">3. Memwyre Dynamic Knowledge Graph (MCP Layer)</h3>
            <p>
              Memwyre functions as an intelligent context layer operating above raw files. Through the <strong>Model Context Protocol (MCP)</strong>, Cursor Composer queries your unified memory graph on-demand. When Composer begins a multi-file migration, Memwyre feeds it the exact historical architectural contracts, schema decisions, and security constraints on demand.
            </p>

            <!-- Comparison Table -->
            <h2 id="comparison">Comparison: Context Mechanisms in Cursor</h2>
            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Capability</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">.cursorrules</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Cursor @Codebase</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6] dark:bg-orange-950/20">
                      <span class="text-[#D97757]">Memwyre MCP Gateway</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Memory Type</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Static rulebook</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">AST &amp; raw text embeddings</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">Hierarchical entity graph + Recency</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Learning Mode</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">100% manual authoring</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Automated file scanning</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">Active observation &amp; explicit MCP tool call</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Cross-Tool Sync</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">No (locked to Cursor)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">No (local disk only)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400">Yes (Claude Code, OpenCode, VS Code)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Retrieval Latency</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Instant (injected on start)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">1,200ms – 4,500ms</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">Rapid on-demand</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Benchmark Recall (LoCoMo)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">N/A (unranked)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">43.7% (Flat Vector baseline)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-[#D97757]">70.5%</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">License</td>
                    <td class="px-4 py-3">Public domain</td>
                    <td class="px-4 py-3">Proprietary (Anysphere)</td>
                    <td class="px-4 py-3 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">Apache-2.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Setup Section -->
            <h2 id="setup">Step-by-Step Cursor Setup Guide</h2>
            <p>
              Cursor features first-class support for the <strong>Model Context Protocol (MCP)</strong>. You can configure Memwyre in less than 60 seconds:
            </p>

            <h3 id="step-open-settings">Step 1: Open Cursor MCP Settings</h3>
            <p>
              In Cursor, navigate to <strong>Cursor Settings</strong> (<code>Cmd+,</code> on macOS, <code>Ctrl+,</code> on Windows/Linux) &rarr; select the <strong>Features</strong> tab &rarr; click on <strong>MCP</strong>.
            </p>

            <h3 id="step-add-server">Step 2: Add Memwyre Server</h3>
            <p>
              Click <strong>+ Add New MCP Server</strong> and fill in the following parameters:
            </p>
            <ul>
              <li><strong>Name:</strong> <code>memwyre</code></li>
              <li><strong>Type:</strong> <code>command</code></li>
              <li><strong>Command:</strong>
                <pre><code>npx -y mcp-remote https://server.memwyre.tech/mcp --header "Authorization:Bearer YOUR_MEMWYRE_API_KEY"</code></pre>
              </li>
            </ul>

            <h3 id="step-verify">Step 3: Verify Tool Connection</h3>
            <p>
              After saving, you should see a green indicator showing tools loaded:
            </p>
            <ul>
              <li><code>search_memwyre</code>: Query relevant architectural decisions and schemas.</li>
              <li><code>save_memory</code>: Store critical breakthroughs and patterns.</li>
              <li><code>get_inbox</code> &amp; <code>approve_memory</code>: Review and merge automated extractions.</li>
            </ul>

            <!-- Deep Dive: Composer Workflows -->
            <h2 id="composer-workflows">Supercharging Cursor Composer Workflows</h2>
            <p>
              When working with multi-file edits in Cursor Composer, use the following patterns for maximum precision:
            </p>
            <div class="space-y-4 my-4">
              <div class="p-4 bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-lg">
                <div class="font-bold text-sm text-gray-900 dark:text-white">1. Context Injection on Complex Refactors</div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  Before asking Composer to refactor authentication across 15 files, prompt: <em>"Check @memwyre for our JWT refresh rotation rules and database error handling conventions before modifying auth endpoints."</em>
                </p>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-lg">
                <div class="font-bold text-sm text-gray-900 dark:text-white">2. Automatic Entity Merging</div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  When you instruct Cursor to adopt a new pattern (e.g. <em>"From now on, all database timestamps must be stored in UTC microsecond integers"</em>), Cursor calls <code>save_memory</code> to persist that rule across your entire team.
                </p>
              </div>
            </div>

            <!-- Benchmark Results -->
            <h2 id="benchmark">Empirical Benchmarks: LoCoMo-10 Results</h2>
            <p>
              According to the <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">LoCoMo Benchmark</router-link> (<a href="https://arxiv.org/abs/2402.17753" target="_blank" rel="noopener noreferrer" class="text-[#D97757] hover:underline font-medium">Snap Research, ACL 2024</a>, evaluating long-context conversation memory across 1,986 test questions), traditional flat vector similarity search struggles with programming constraints because it lacks temporal decay and AST relationship graphs.
            </p>
            <p>
              Memwyre's multi-factor ranking (combining dense embeddings, entity graph connections, and recency weighting) scored <strong>70.5%</strong>, outperforming flat vector RAG architectures (43.7%) by over 26 percentage points while cutting prompt tokens by 81%.
            </p>
            <p>
              For a detailed architectural breakdown of why vector search fails to maintain agent context across sessions, read our research paper on <router-link to="/research/vector-database-vs-agent-memory" class="text-[#D97757] hover:underline font-medium">Vector Database vs. AI Agent Memory</router-link>.
            </p>

            <!-- Connected Ecosystem & Related Integrations -->
            <div class="my-10 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#D97757] mb-1">CONNECTED ECOSYSTEM</div>
              <h3 class="text-lg font-bold text-gray-950 dark:text-white hero-serif mb-4">Explore More Agent Memory Integrations</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <router-link to="/claude-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Claude Code Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Overcome CLAUDE.md limits with automated CLI session ingestion.</p>
                </router-link>
                <router-link to="/opencode-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">OpenCode Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Eliminate Desktop RAM bloat and fix CLI session reset with persistent memory.</p>
                </router-link>
                <router-link to="/mcp-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Universal MCP Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Connect VS Code, Continue, and any Model Context Protocol client.</p>
                </router-link>
                <router-link to="/openclaw-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">OpenClaw Autonomous →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Multi-agent shared memory bus without prompt token duplication.</p>
                </router-link>
              </div>
            </div>

            <!-- FAQ Section -->
            <h2 id="faq">Frequently Asked Questions</h2>
            <div class="space-y-4 my-6">
              <details v-for="(faq, index) in faqs" :key="index" class="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-lg">
                <summary class="font-semibold cursor-pointer outline-none">{{ faq.question }}</summary>
                <div class="mt-2 text-sm text-gray-600 dark:text-gray-400" v-html="faq.answer"></div>
              </details>
            </div>
            
            <hr class="my-8 border-gray-200 dark:border-gray-800" />
            <div class="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 mt-8">
              <h3 class="text-lg font-bold mb-2 hero-serif !mt-0">Give Cursor AI Long-Term Memory Today</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Connect Cursor to your personal memory vault in 60 seconds. Instant context injection, no index lag, and seamless synchronization with Claude Code and your terminal CLI.
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
const pageTitle = 'Cursor AI Persistent Memory | Memwyre';
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
    text: 'Overview & Context Problem',
    slug: 'tldr',
    children: [
      { text: 'Core Takeaway (TL;DR)', slug: 'tldr' },
      { text: 'The Context Rot Problem', slug: 'the-problem' },
      { text: 'Composer Context Fatigue', slug: 'composer-context-fatigue' }
    ]
  },
  {
    text: 'Cursorrules & Context Symbols',
    slug: 'cursorrules-masterclass',
    children: [
      { text: 'Hierarchy & MDC Rules', slug: 'cursorrules-hierarchy' },
      { text: 'Production Template', slug: 'cursorrules-template' },
      { text: 'Context Symbols (@)', slug: 'cursor-context-symbols' }
    ]
  },
  {
    text: 'Architecture & Token Economics',
    slug: 'cursor-context-architecture',
    children: [
      { text: 'Layer 1: .cursorrules', slug: 'layer-cursorrules' },
      { text: 'Layer 2: Codebase Indexing', slug: 'layer-codebase-indexing' },
      { text: 'Layer 3: Memwyre Graph', slug: 'layer-memwyre-graph' },
      { text: 'Token Economics & ROI', slug: 'token-efficiency' }
    ]
  },
  {
    text: 'Setup & Composer Workflows',
    slug: 'setup',
    children: [
      { text: 'Step 1: Open Settings', slug: 'step-open-settings' },
      { text: 'Step 2: Add MCP Server', slug: 'step-add-server' },
      { text: 'Step 3: Verify Connection', slug: 'step-verify' },
      { text: 'Composer Workflows', slug: 'composer-workflows' }
    ]
  },
  {
    text: 'Benchmarks, Comparison & FAQ',
    slug: 'benchmark',
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
    question: 'Does Cursor AI have built-in persistent memory across sessions?',
    answer: 'Cursor includes static <code>.cursorrules</code> and local file vector indexing (<code>@Codebase</code>). However, it does not persist conversational rationale, dynamic debugging discoveries, or architectural decisions across different Composer or Chat sessions unless connected to an external memory gateway like Memwyre.'
  },
  {
    question: 'What is the difference between root .cursorrules and .cursor/rules/*.mdc?',
    answer: 'Root <code>.cursorrules</code> is a legacy single-file rulebook loaded on every request. The modern <code>.cursor/rules/*.mdc</code> architecture allows scoped modular rule files that activate selectively based on file glob patterns (e.g., only activating database rules when modifying <code>src/db/**/*</code>), saving prompt tokens.'
  },
  {
    question: 'Why does Cursor Composer hallucinate during long, multi-file refactors?',
    answer: 'In extended refactors involving 10+ files, prompt buffers suffer from the Lost-in-the-Middle effect. File contents push initial instructions toward the middle of the context window where LLM attention is lowest, leading to diff hallucinations and forgotten edge cases. Selective semantic memory solves this by keeping active context below 10,000 tokens.'
  },
  {
    question: 'How is Memwyre different from .cursorrules?',
    answer: '<code>.cursorrules</code> is a static text file that you must write and update by hand. Memwyre is an active, queryable knowledge graph: Cursor agents can call MCP tools to search for specific constraints, learn new facts dynamically during coding, and share those learnings across team members.'
  },
  {
    question: 'How do I add Memwyre to Cursor Composer and Chat?',
    answer: 'Open <strong>Cursor Settings &gt; Features &gt; MCP &gt; Add New MCP Server</strong>. Choose <code>command</code> and enter <code>npx -y mcp-remote https://server.memwyre.tech/mcp --header "Authorization:Bearer YOUR_KEY"</code>. Cursor will automatically recognize the memory search and save tools in both Composer and Chat.'
  },
  {
    question: 'Does Memwyre slow down Cursor Composer code generation?',
    answer: 'No. Memwyre queries execute rapidly on-demand. In fact, by injecting targeted architectural context rather than scanning dozens of raw codebase files, Memwyre speeds up Composer response times and reduces token burn by up to 81%.'
  },
  {
    question: 'Can memories captured in Cursor be accessed in Claude Code or OpenCode?',
    answer: 'Yes. All Memwyre integrations share the exact same underlying memory vault. An architectural pattern or bug fix saved while working in Cursor Composer is immediately queryable when you open Claude Code CLI in your terminal.'
  },
  {
    question: 'What happens if Cursor saves incorrect or outdated context?',
    answer: 'You have full control. Every memory item can be inspected, edited, or deleted via the Memwyre Web Dashboard or through MCP tool commands. Memwyre also incorporates temporal decay algorithms that naturally deprioritize stale notes over time.'
  },
  {
    question: 'What license is Memwyre released under?',
    answer: 'The Memwyre MCP Gateway and client SDKs are released under the Apache-2.0 open-source license, allowing frictionless commercial and enterprise adoption.'
  },
  {
    question: 'Is my Cursor source code uploaded to Memwyre?',
    answer: 'No. Memwyre only stores synthesized architectural observations, conventions, and facts that you or your agent explicitly save. Your repository source files are never uploaded in bulk, and Memwyre operates with strict zero-retention policies for AI model training.'
  }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.hero-serif {
  font-family: 'Playfair Display', Georgia, serif;
}

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
