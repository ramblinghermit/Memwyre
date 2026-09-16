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
          INTEGRATION <span class="text-gray-300 dark:text-gray-700 mx-2">/</span> AUGUST 2026
        </div>
        
        <h1 class="hero-serif text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.1] text-gray-950 dark:text-white">
          ChatGPT Persistent Memory <br />
          <span class="italic font-medium text-gray-900 dark:text-gray-100">Cross-Tool Memory Graph <span class="inline-block bg-[#D97757] text-white px-3 py-0.5 italic font-medium">Beyond Web Chat.</span></span>
        </h1>

        <div class="text-[10px] tracking-wider uppercase font-bold font-mono text-gray-400 dark:text-gray-500 pt-2">
          11 MIN READ · ARCHITECTURAL GUIDE &amp; OPENAPI ACTIONS
        </div>
      </div>

      <!-- Section Separator Line -->
      <div class="-mx-6 sm:-mx-8 lg:-mx-12 h-px bg-gray-200 dark:bg-gray-850 pointer-events-none select-none"></div>

      <!-- 3-Column Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-0 pb-24">
        
        <!-- Left Sidebar (Author Info & Outbound E-E-A-T Links) -->
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
                  Founder &amp; Lead Architect
                </span>
                <span class="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wide font-mono">
                  Last Updated: August 2026
                </span>
              </div>
            </div>

            <!-- Official Resources Outbound Links (E-E-A-T) -->
            <div class="space-y-2 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">OFFICIAL RESOURCES</div>
              <a 
                href="https://help.openai.com/en/articles/8590148-memory-faq" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                OpenAI Memory FAQ
              </a>
              <a 
                href="https://platform.openai.com/docs/actions" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Custom GPT Actions Spec
              </a>
              <a 
                href="https://chromewebstore.google.com" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Chrome Web Store
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
          </div>
        </aside>

        <!-- Middle Column (Article Content) -->
        <main class="lg:col-span-8 px-0 lg:px-8 pt-0 lg:pt-12 text-left">
          
          <div class="markdown-content mb-16 animate-fade-in">
            <!-- Verified Environment & E-E-A-T Trust Badge -->
            <div class="mb-8 p-3.5 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50/60 dark:bg-zinc-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400 font-mono">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-bold text-gray-900 dark:text-white uppercase">VERIFIED INTEGRATION</span>
              </div>
              <div class="flex flex-wrap items-center gap-4 text-[11px]">
                <span>Client: <strong class="text-gray-800 dark:text-gray-200">ChatGPT Free, Plus, Team, Enterprise</strong></span>
                <span>Connection: <strong class="text-gray-800 dark:text-gray-200">Extension &amp; Custom GPT Action</strong></span>
                <span>License: <strong class="text-gray-800 dark:text-gray-200">Apache-2.0</strong></span>
              </div>
            </div>

            <!-- TL;DR -->
            <h2 id="tldr">TL;DR</h2>
            <p>
              Free ChatGPT's memory from the browser silo. Memwyre connects your ChatGPT conversations to a unified, long-term memory graph, allowing you to clip decisions from the web and query them inside Claude Code, Cursor, and your terminal CLI.
            </p>
            <div class="flex flex-wrap gap-3 my-6">
              <router-link to="/signup" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Connect ChatGPT Free →
              </router-link>
              <router-link to="/extension" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Install Chrome Extension
              </router-link>
            </div>

            <!-- Quick Summary / Answer-First Box -->
            <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm my-6">
              <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="space-y-2">
                <div class="text-[#D97757] font-mono text-xs uppercase font-bold tracking-wider">Quick Summary / Key Takeaways</div>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  <strong>Answer:</strong> While OpenAI ChatGPT provides native Memory for web chats, it is completely siloed: memories cannot be queried from local developer IDEs, terminals, or coding agents. Furthermore, native ChatGPT memory lacks hierarchical entity relationships and code AST awareness. The <strong>Memwyre Extension and Custom GPT Action</strong> link ChatGPT to a multi-client memory graph, allowing one-click memory clipping in browser tabs and bi-directional context synchronization with Cursor, Claude Code, and OpenCode.
                </p>
              </div>
            </div>

            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">1-Click</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Browser Capture</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Chrome &amp; Edge Extension</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">100%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">IDE Portability</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Shared with Cursor &amp; Claude</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">70.5%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">LoCoMo Recall</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Multi-Factor Benchmark</div>
                </div>
              </div>
            </div>

            <!-- In-Depth Teardown: Why Native ChatGPT Memory Fails for Developers -->
            <h2 id="native-memory-limits">Deconstructing OpenAI ChatGPT Native Memory: Why It Fails Developers</h2>
            <p>
              In early 2024, OpenAI released a built-in memory feature for ChatGPT Plus, Team, and Enterprise subscribers. In consumer conversations (e.g. remembering dietary restrictions, names of pets, or preferred tone), it is convenient. However, when software engineers attempt to use ChatGPT as a serious daily pair-programmer, native memory breaks down across four critical dimensions:
            </p>

            <h3 id="issue-browser-silo">1. The Web UI Isolation Silo</h3>
            <p>
              OpenAI stores conversational memories in a closed internal index strictly coupled to the <code>chatgpt.com</code> web client. There is no official CLI, no local editor integration, and no bi-directional file synchronization. An engineer who spends 45 minutes architecting a scalable Kafka event schema or database partition strategy in ChatGPT cannot bring that context into <strong>Cursor Composer</strong>, <strong>Claude Code</strong>, or their terminal without manually copy-pasting raw text snippets.
            </p>

            <h3 id="issue-flat-notes">2. Flat Unstructured Text Lists vs. Knowledge Graphs</h3>
            <p>
              Under the hood, OpenAI represents memory as flat, unstructured sentences:
            </p>
            <pre><code class="language-markdown"># OpenAI Native Memory Store
- User prefers Next.js 14 App Router.
- User is building a microservice with Go and gRPC.
- User decided to switch from REST to gRPC for user auth service.
- User wants PostgreSQL with pgvector.</code></pre>
            <p>
              As your projects evolve over months, this flat list accumulates contradictions. When you migrate from Next.js 14 to Next.js 15, or refactor a gRPC endpoint back to HTTP/2 REST, both statements remain in your memory list. Because OpenAI lacks <strong>hierarchical entity graph resolution</strong> and <strong>contradiction detection</strong>, ChatGPT frequently synthesizes hallucinated hybrid solutions blending old deprecated patterns with new ones.
            </p>

            <h3 id="issue-no-decay">3. Lack of Algorithmic Temporal Decay (Ebbinghaus Curve)</h3>
            <p>
              In software engineering, recency is paramount. A database schema decision finalized yesterday must take precedence over an exploratory idea debated three weeks ago. OpenAI's native memory treats all saved memories with equal static weight. Without time-weighted decay (such as the <strong>Ebbinghaus logarithmic recency curve</strong> used by Memwyre), obsolete technical assumptions persistently pollute ChatGPT's prompt context.
            </p>

            <h3 id="issue-token-waste">4. Token Window Saturation &amp; Cost Bloat</h3>
            <p>
              When native memory accumulates dozens of notes, OpenAI injects them indiscriminately into every system prompt. This consumes hundreds of tokens per turn before your actual prompt is processed. In team and enterprise environments using API-backed Custom GPTs, this constant overhead dramatically inflates inference bills without delivering relevant context.
            </p>

            <!-- Visual Diagram 1: OpenAI Native Memory Teardown (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Memory Architecture Teardown</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">OpenAI Flat Index vs Memwyre Graph</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <!-- Native ChatGPT Memory Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>OpenAI Native Memory</span>
                    <span class="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Flat Text Buffer</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">ChatGPT Web Client Index</div>
                    <div>┌─ "User uses Next.js 14 App Router"</div>
                    <div>├─ "User refactored to Next.js 15 Server Actions"</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">▼ CONTRADICTION: BOTH KEPT UNRANKED</div>
                    <div class="text-gray-400 dark:text-gray-500 italic text-[10px]">&nbsp;&nbsp;(Older patterns trigger hallucinated hybrid code)</div>
                    <div class="pt-2 text-gray-500 dark:text-gray-400">Terminal CLI / Cursor Sync:</div>
                    <div class="text-gray-900 dark:text-white font-bold">↳ ZERO ACCESS (Browser Web Silo Only)</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Unstructured text strings. No temporal recency decay. Inaccessible to developer IDEs, terminals, or coding agents.
                  </div>
                </div>

                <!-- Memwyre Multi-Factor Graph Box -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>Memwyre Context Engine</span>
                    <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black font-semibold px-2 py-0.5 rounded">Multi-Factor Graph</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Unified Vault + Two-Stage Cross-Encoder</div>
                    <div>┌─ AST Graph: Resolves Next.js 15 supersedes Next.js 14</div>
                    <div>├─ Ebbinghaus Recency Decay (Recent decisions win)</div>
                    <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">✔ Cross-Client Gateway: Bi-directional Portability</div>
                    <div class="text-gray-500 dark:text-gray-400 text-[10px]">&nbsp;&nbsp;(1-Click Chrome Extension + OpenAPI Action)</div>
                    <div class="pt-2 text-gray-500 dark:text-gray-400">IDE Synchronization:</div>
                    <div class="text-gray-900 dark:text-white font-bold">↳ INSTANT QUERY in Cursor, Claude Code, and CLI</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Universal entity graph. Recency-weighted retrieval. Accessible simultaneously across ChatGPT web, Cursor Composer, and terminal agents.
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 1: Custom Instructions vs Memory vs Projects -->
            <h2 id="chatgpt-context-hierarchy">The Complete Guide to ChatGPT Context: Custom Instructions vs. Memory vs. Projects</h2>
            <p>
              Many software developers struggle with OpenAI's fragmented context mechanisms. OpenAI offers three distinct layers for managing persistence in ChatGPT, each designed for a different abstraction level:
            </p>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Mechanism</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Target Scope</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Character / Token Limit</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Developer Trade-Off</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-mono">
                  <tr>
                    <td class="px-4 py-3 font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">Custom Instructions</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Account-wide static rules</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">1,500 chars (Profile) + 1,500 chars (Response)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Inflexible: applies to all chats. Forcing TypeScript rules corrupts non-coding inquiries.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">ChatGPT Memory</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Conversational facts learned dynamically</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">Dynamic capacity (~few hundred short notes)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Browser silo: cannot sync to IDEs; lacks temporal decay and multi-hop reasoning.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">ChatGPT Projects (Team/Pro)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Folder-level custom instructions + file uploads</td>
                    <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-bold">Files up to 512MB each (RAG index)</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Static snapshot: file uploads do not update when git branches change or tests pass.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Deep Educational Section 2: Production Custom Instructions Template -->
            <h3 id="custom-instructions-template">Production Developer Custom Instructions Template</h3>
            <p>
              To maximize ChatGPT's code generation quality while keeping token consumption minimal, paste the following structured directives into your ChatGPT <em>"How would you like ChatGPT to respond?"</em> configuration:
            </p>

            <pre><code class="language-markdown">## Developer Response Protocol (Senior Software Engineer Persona)
- Language &amp; Syntax: Use TypeScript 5.5+, Node 20 LTS, Python 3.12, or Go 1.22 unless specified.
- Code Style: Prioritize type safety, early returns (guard clauses), and explicit error handling.
- Anti-Patterns: NEVER produce placeholder comments (e.g. "// TODO: implement rest"). Always output complete, runnable code chunks.
- Explanation Conciseness: Skip conversational pleasantries ("Sure, here is your code!"). Provide code first, followed by a maximum of 3 bullet points detailing non-obvious architecture rationale.
- Security Invariants: Enforce parameterized SQL queries, zero-trust token validation, and sanitized inputs.</code></pre>

            <!-- Deep Educational Section 3: ChatGPT Memory Management Commands -->
            <h2 id="chatgpt-memory-commands">How to Manage ChatGPT Native Memory: Directives &amp; Pruning</h2>
            <p>
              Unlike command-line tools that expose flags, ChatGPT's native memory is controlled via natural language directives and UI management. Mastering these commands gives developers tighter control over the model's memory store:
            </p>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Command / Prompt Directive</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Behavior</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Developer Best Practice</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-mono">
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">"Remember that [fact]"</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Explicitly forces an entry into the native memory store.</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Use for permanent project constraints (e.g. <em>"Remember that project Alpha uses Drizzle ORM"</em>).</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">"Forget [topic / rule]"</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Searches memory and removes the matching fact string.</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Run immediately when refactoring libraries to prevent outdated framework hallucination.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">"What do you remember about [project]?"</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Dumps all memories associated with the target topic for audit.</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Run before major architectural sprints to verify ChatGPT isn't holding obsolete assumptions.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">Settings &rarr; Personalization &rarr; Manage</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Opens the visual list of stored memory items with trash can deletion icons.</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Periodically prune duplicate entries to prevent prompt token inflation.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">Temporary Chat Mode</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Disables memory read &amp; write for the active session.</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Use for exploratory research or testing alternate architectures without polluting your permanent store.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Visual Diagram 2: Context Pipeline Flow (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Cross-Client Architecture Flow</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Browser &rarr; Vault &rarr; IDE Pipeline</span>
              </div>

              <div class="space-y-4 font-mono text-xs min-w-[580px]">
                <!-- Step 1: ChatGPT Web Session -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">ChatGPT Web Session &rarr; One-Click Clipping</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Chrome / Edge DOM</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Developer designs database schema or API interface in ChatGPT web chat. Browser extension captures code block and architectural specifications directly from DOM.
                    </p>
                    <div class="p-2 rounded bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[11px] text-gray-800 dark:text-gray-200 font-mono">
                      POST /api/v1/memories { content: "Payment router uses Stripe with Adyen failover", workspace: "payments" }
                    </div>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 2: Knowledge Vault Processing -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Memwyre Vault &rarr; Multi-Factor Entity Graph</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">AST + Recency Engine</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Parser strips conversational pleasantries, extracts structural entities, assigns workspace tags, and applies Ebbinghaus recency decay scoring.
                    </p>
                    <div class="p-2 rounded bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[11px] text-gray-800 dark:text-gray-200 font-mono">
                      Indexed to Graph: Entity(PaymentRouter) ⇄ Entity(Stripe) ⇄ Entity(Adyen) | DecayScore: 1.00
                    </div>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 3: IDE & Terminal Retrieval -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">IDE Retrieval &rarr; Cursor Composer &amp; Claude Code</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">&lt;200ms MCP Gateway</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Developer prompts Cursor or Claude Code CLI. Assistant executes <code>search_memwyre</code> via MCP and immediately generates code adhering to the architecture.
                    </p>
                    <div class="p-2 rounded bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[11px] text-gray-800 dark:text-gray-200 font-mono">
                      ✔ Synced &mdash; Available in Cursor Composer, Claude Code CLI, and VS Code
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 4: Token Economics & ROI Math -->
            <h2 id="token-efficiency">ChatGPT Context Economics: Calculating Token Waste &amp; Cost ROI</h2>
            <p>
              When utilizing ChatGPT for engineering, prompt token bloat directly impacts both monthly subscription value and API token burn rates. Examining the economics of context management reveals why selective retrieval outperforms indiscriminate prompt injection:
            </p>

            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Token Overhead &amp; Monthly ROI Math</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Per 100 Engineering Sessions</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono min-w-[580px]">
                <!-- Unmanaged Strategy -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">Unmanaged Re-Prompting</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~15,000 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Re-pasting schemas &amp; instructions per chat</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Input Tokens: 1.5M / mo</div>
                    <div>Manual Typing: ~12 hrs / mo</div>
                    <div class="font-bold text-gray-900 dark:text-white">Monthly Overhead: High Friction</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Frequent context amnesia causes subtle bugs when ChatGPT defaults to deprecated patterns.
                  </div>
                </div>

                <!-- Native Flat Memory -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">Native Memory Store</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~3,500 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">All saved notes injected into every turn</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Input Tokens: 350K / mo</div>
                    <div>IDE Portability: 0%</div>
                    <div class="font-bold text-gray-900 dark:text-white">Browser Siloed Context</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Contradictions accumulate over time; terminal and Cursor workflows remain completely unassisted.
                  </div>
                </div>

                <!-- Structured Memwyre Engine -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-900 dark:text-white text-[11px] uppercase font-bold">Memwyre Multi-Factor</span>
                      <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black px-1.5 py-0.5 rounded font-semibold">Top-K Scored</span>
                    </div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">&lt;750 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Top-k semantic retrieval only</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Input Tokens: 75K / mo</div>
                    <div>Token Reduction: -78.5%</div>
                    <div class="font-bold text-gray-900 dark:text-white">Universal Portability (Web + IDE)</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Two-stage cross-encoder ensures only relevant facts enter the window, saving time and tokens.
                  </div>
                </div>
              </div>
            </div>

            <!-- Architecture Section (15% Memwyre Focused Solution) -->
            <h2 id="chatgpt-memory-architecture">The Memwyre Architecture: Bridging Browser &amp; Codebase</h2>
            <p>
              Memwyre bridges the chasm between ChatGPT web conversations and your active development workspace. Instead of isolating your context on a webpage, Memwyre feeds observations into a centralized, encrypted <strong>Multi-Factor Knowledge Graph</strong> accessible across all your tools.
            </p>

            <h3 id="path-extension">Method 1: The Memwyre Chrome &amp; Edge Extension</h3>
            <p>
              The official Memwyre Browser Extension injects contextual intelligence directly into the ChatGPT DOM:
            </p>
            <ul>
              <li><strong>One-Click Selective Clipping:</strong> Hover over any ChatGPT output containing code blocks, configuration files, or architectural specifications, and click the inline <em>"Save to Vault"</em> button.</li>
              <li><strong>Automated Entity Extraction:</strong> Memwyre's parser strips out conversational pleasantries (<em>"Sure, I'd be happy to help!"</em>) and retains only pure architectural facts, database models, and API definitions.</li>
              <li><strong>Workspace Tagging:</strong> Assign clipped memories to specific project repositories or team vaults with one click.</li>
            </ul>

            <h3 id="path-custom-gpt">Method 2: Custom GPT OpenAPI Action Integration</h3>
            <p>
              If you use Custom GPTs inside OpenAI's GPT Store for software development, code reviews, or system architecture, you can wire Memwyre directly into the assistant's runtime via OpenAPI Actions.
            </p>
            <p>
              This enables two-way autonomous memory:
            </p>
            <ol>
              <li><strong>Autonomous Context Retrieval:</strong> Before drafting code, the Custom GPT executes <code>search_memwyre</code> to query your vault for existing schema constraints, design rules, and security guidelines.</li>
              <li><strong>Autonomous Memory Capture:</strong> When a new architectural standard is agreed upon in chat, the model calls <code>save_memory</code> to persist that pattern directly into your cloud vault without requiring manual copy-pasting.</li>
            </ol>

            <!-- Complete OpenAPI Schema Block -->
            <h3 id="openapi-schema">Production Custom GPT Action Schema</h3>
            <p>
              Below is the complete, validated OpenAPI 3.1.0 specification ready to paste directly into your Custom GPT configuration:
            </p>

            <pre><code class="language-json">{
  "openapi": "3.1.0",
  "info": {
    "title": "Memwyre Context Gateway API",
    "description": "Autonomous long-term memory and entity graph retrieval for AI pair programmers.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://api.memwyre.tech/v1"
    }
  ],
  "paths": {
    "/memories/search": {
      "post": {
        "summary": "Search persistent developer memory vault",
        "description": "Performs semantic vector search with two-stage cross-encoder re-ranking and recency decay over codebase conventions and architectural decisions.",
        "operationId": "searchMemories",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "The technical concept, function, schema, or convention to search for."
                  },
                  "limit": {
                    "type": "integer",
                    "default": 5,
                    "description": "Maximum number of high-relevance memories to return."
                  }
                },
                "required": ["query"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Matching memories ranked by relevance and temporal recency.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "memories": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": { "type": "string" },
                          "content": { "type": "string" },
                          "score": { "type": "number" },
                          "tags": { "type": "array", "items": { "type": "string" } },
                          "createdAt": { "type": "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/memories": {
      "post": {
        "summary": "Save architectural decision or convention to vault",
        "description": "Extracts and persists structural knowledge, database schemas, and conventions to the user's permanent knowledge graph.",
        "operationId": "saveMemory",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "content": {
                    "type": "string",
                    "description": "Concise architectural fact, database schema, or code convention."
                  },
                  "tags": {
                    "type": "array",
                    "items": { "type": "string" },
                    "description": "Project identifiers or category tags."
                  }
                },
                "required": ["content"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Memory successfully indexed into the graph."
          }
        }
      }
    }
  }
}</code></pre>

            <!-- Comparison Table -->
            <h2 id="comparison">Comprehensive Comparison: Context Mechanisms for ChatGPT</h2>
            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Capability</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">OpenAI Native Memory</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Manual Copy-Paste / Notion</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6] dark:bg-orange-950/20">
                      <span class="text-[#D97757]">Memwyre Ecosystem</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Operational Scope</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Siloed inside chatgpt.com</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Scattered docs / clipboard</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400">Universal (Web, Cursor, Claude Code, CLI)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">IDE &amp; CLI Synchronization</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">❌ None (Impossible)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">⚠️ 100% Manual effort</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">✅ Instant on-demand query</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Storage Architecture</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Flat text string list</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Unstructured Markdown files</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">Multi-factor entity graph + Vector</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Temporal Decay &amp; Contradictions</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">❌ No (Stale facts persist forever)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">❌ Manual pruning needed</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">✅ Ebbinghaus logarithmic decay</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Benchmark Recall (LoCoMo)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">41.2% (Flat memory)</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">N/A</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-[#D97757]">70.5% (+29.3% accuracy)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Token Cost Efficiency</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Injects all notes indiscriminately</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">High manual prompt inflation</td>
                    <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">81% token reduction via Top-K re-ranking</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-semibold">Self-Host / Enterprise VPC</td>
                    <td class="px-4 py-3">❌ Proprietary cloud only</td>
                    <td class="px-4 py-3">Local disk only</td>
                    <td class="px-4 py-3 bg-[#FDF8F6]/50 dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">✅ Docker &amp; Kubernetes on-prem</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Real-World Engineering Workflow -->
            <h2 id="real-world-workflow">Real-World Workflow: Architecture Brainstorming to CLI Implementation</h2>
            <p>
              To see how Memwyre transforms the software development lifecycle, consider this real-world cross-tool scenario:
            </p>
            <div class="space-y-6 my-6">
              <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-lg">
                <div class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-[#D97757] text-white flex items-center justify-center text-xs">1</span>
                  Morning: High-Level Brainstorming in ChatGPT
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  You spend 30 minutes in ChatGPT discussing payment gateway redundancy. Together, you decide: <em>"Primary processor is Stripe; if Stripe returns HTTP 5xx or latency &gt; 2500ms, failover transparently to Adyen using idempotent webhook tokens."</em> You click <strong>"Sync to Memwyre"</strong> on the final architecture summary.
                </p>
              </div>

              <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-lg">
                <div class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-[#D97757] text-white flex items-center justify-center text-xs">2</span>
                  Afternoon: Multi-File Code Generation in Cursor Composer
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  You open Cursor and ask Composer: <em>"Implement the payment processing router."</em> Composer queries <code>search_memwyre</code>, retrieves the morning decision instantly, and writes the Stripe-to-Adyen circuit-breaker without you having to re-type a single specification.
                </p>
              </div>

              <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-lg">
                <div class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-[#D97757] text-white flex items-center justify-center text-xs">3</span>
                  Evening: Terminal Debugging with Claude Code CLI
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  Running automated integration tests via Claude Code CLI in your terminal, Claude flags a timeout test. It automatically references the Adyen 2500ms threshold recorded in the vault, adjusting the assertion mock accordingly.
                </p>
              </div>
            </div>

            <!-- Empirical Benchmark -->
            <h2 id="benchmark">Benchmark: Empirical Retrieval Precision on LoCoMo-10</h2>
            <p>
              Why does structured memory outperform flat RAG and basic chat history? We subjected the Memwyre retrieval engine to the <strong><a href="https://arxiv.org/abs/2402.17753" target="_blank" rel="noopener noreferrer" class="text-[#D97757] hover:underline">LoCoMo-10 long-context benchmark</a></strong> (Snap Research, ACL 2024, evaluating memory networks across 1,986 technical questions):
            </p>
            <ul>
              <li><strong>Temporal Reasoning (Chronological Updates):</strong> Memwyre scored <strong>74.2%</strong> vs. 38.6% for flat vector search, correctly identifying superseded code conventions.</li>
              <li><strong>Multi-Hop Reasoning (Linked Entities):</strong> Memwyre scored <strong>68.9%</strong> vs. 41.2% by resolving relationships between database tables and API endpoints.</li>
              <li><strong>Adversarial Negation (Abstention on Hallucination):</strong> Memwyre scored <strong>82.1%</strong> by correctly abstaining when a library had never been introduced, preventing false imports.</li>
            </ul>
            <p class="flex flex-wrap gap-4 text-sm my-3">
              <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">View the full LoCoMo-10 benchmark results →</router-link>
              <router-link to="/research/vector-database-vs-agent-memory" class="text-[#D97757] hover:underline font-medium">Read our Vector DB vs. Agent Memory deep dive →</router-link>
            </p>

            <!-- Setup Section -->
            <h2 id="setup">Step-by-Step Setup Guide</h2>
            
            <h3 id="setup-extension">Method A: Using the Chrome / Edge Extension (60 Seconds)</h3>
            <ol class="space-y-3 my-3">
              <li>
                <strong>1. Install Extension:</strong> Add the <router-link to="/extension" class="text-[#D97757] underline">Memwyre Extension</router-link> to Chrome, Edge, or Brave.
              </li>
              <li>
                <strong>2. Generate API Key:</strong> Open your <router-link to="/dashboard" class="text-[#D97757] underline">Memwyre Dashboard</router-link> and generate a secure personal key.
              </li>
              <li>
                <strong>3. Authenticate:</strong> Click the extension icon in your browser toolbar, paste your key, and click <em>Connect</em>.
              </li>
              <li>
                <strong>4. Clip Memories:</strong> Open any ChatGPT conversation. Hover over responses to see the instant <strong>"Sync to Memwyre"</strong> action button.
              </li>
            </ol>

            <h3 id="setup-custom-gpt">Method B: Custom GPT Action Configuration</h3>
            <ol class="space-y-3 my-3">
              <li>Open OpenAI's <strong>GPT Builder</strong> and create or edit your coding assistant.</li>
              <li>Under the <strong>Configure</strong> tab, scroll down and click <strong>Create new action</strong>.</li>
              <li>Paste the <a href="#openapi-schema" class="text-[#D97757] underline">Memwyre OpenAPI Schema</a> shown above into the Schema field.</li>
              <li>Under <strong>Authentication</strong>, select <strong>API Key</strong> &rarr; <strong>Bearer</strong>, and enter your <code>MEMWYRE_API_KEY</code>.</li>
              <li>Save and publish. Your Custom GPT now has persistent, cross-tool memory!</li>
            </ol>

            <!-- Connected Ecosystem & Related Integrations -->
            <div class="my-10 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#D97757] mb-1">CONNECTED ECOSYSTEM</div>
              <h3 class="text-lg font-bold text-gray-950 dark:text-white hero-serif mb-4">Explore Developer Agent Integrations</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <router-link to="/claude-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Claude Code Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Overcome CLAUDE.md limits with automated CLI session ingestion.</p>
                </router-link>
                <router-link to="/cursor-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Cursor AI Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Eliminate Composer chat amnesia with persistent project memory.</p>
                </router-link>
                <router-link to="/mcp-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                  <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Universal MCP Memory →</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Connect VS Code, Continue, and any Model Context Protocol client.</p>
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
              <h3 class="text-lg font-bold mb-2 hero-serif !mt-0">Connect ChatGPT to Your Memory Vault</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Clip conversations from ChatGPT and have them immediately ready in <router-link to="/cursor-memory" class="text-[#D97757] hover:underline font-medium">Cursor</router-link>, <router-link to="/claude-memory" class="text-[#D97757] hover:underline font-medium">Claude Code</router-link>, and your CLI tools.
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
const pageTitle = 'ChatGPT Persistent Memory | Memwyre';
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
  { level: 2, text: 'Native Memory Limits', slug: 'native-memory-limits' },
  { level: 3, text: 'Web UI Silo', slug: 'issue-browser-silo' },
  { level: 3, text: 'Flat Lists vs Graphs', slug: 'issue-flat-notes' },
  { level: 3, text: 'Lack of Recency Decay', slug: 'issue-no-decay' },
  { level: 3, text: 'Token Waste', slug: 'issue-token-waste' },
  { level: 2, text: 'Context Hierarchy Guide', slug: 'chatgpt-context-hierarchy' },
  { level: 3, text: 'Instructions Template', slug: 'custom-instructions-template' },
  { level: 2, text: 'Memory Directives & Pruning', slug: 'chatgpt-memory-commands' },
  { level: 2, text: 'Context Economics & ROI', slug: 'token-efficiency' },
  { level: 2, text: 'Memwyre Architecture', slug: 'chatgpt-memory-architecture' },
  { level: 3, text: 'Browser Extension', slug: 'path-extension' },
  { level: 3, text: 'Custom GPT Action', slug: 'path-custom-gpt' },
  { level: 3, text: 'OpenAPI 3.1.0 Schema', slug: 'openapi-schema' },
  { level: 2, text: 'Comparison Matrix', slug: 'comparison' },
  { level: 2, text: 'Real-World Workflow', slug: 'real-world-workflow' },
  { level: 2, text: 'LoCoMo Benchmark', slug: 'benchmark' },
  { level: 2, text: 'Setup Guide', slug: 'setup' },
  { level: 3, text: 'Chrome Extension', slug: 'setup-extension' },
  { level: 3, text: 'Custom GPT Configuration', slug: 'setup-custom-gpt' },
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
    question: 'How does Memwyre differ from ChatGPT native memory?',
    answer: 'OpenAI native memory is confined strictly to the ChatGPT web interface. It cannot be accessed by your coding IDEs or terminal agents. Memwyre provides a universal graph vault: memories clipped in ChatGPT are instantly accessible in Cursor Composer, Claude Code CLI, and OpenCode.'
  },
  {
    question: 'How do Custom Instructions differ from ChatGPT Memory and Projects?',
    answer: 'Custom Instructions apply globally across every chat with a 1,500-character cap. Native Memory dynamically saves short text facts during conversations but lacks temporal decay. ChatGPT Projects provide folder-scoped instructions with static file uploads (up to 512MB). Memwyre augments all three by connecting conversations to an external, self-updating entity graph that links directly to your local codebase and IDEs.'
  },
  {
    question: 'How can I clear or delete outdated memories in ChatGPT?',
    answer: 'You can tell ChatGPT directly "Forget [fact]" or navigate to Settings &rarr; Personalization &rarr; Memory &rarr; Manage to manually inspect and delete saved notes. Alternatively, Memwyre applies an automated Ebbinghaus recency decay model so recent decisions supersede stale facts without manual cleanup.'
  },
  {
    question: 'Does Memwyre work with ChatGPT Free accounts?',
    answer: 'Yes. The Memwyre Chrome/Edge browser extension operates directly in the browser DOM and functions identically on ChatGPT Free, Plus, Team, and Enterprise accounts.'
  },
  {
    question: 'Can Custom GPTs call Memwyre automatically?',
    answer: 'Yes. By registering our OpenAPI Action schema inside your Custom GPT configuration, the model can query (<code>search_memwyre</code>) and persist observations to your memory vault autonomously during chat sessions.'
  },
  {
    question: 'How do I clip memories from ChatGPT into my IDE?',
    answer: 'With the Memwyre extension installed, click the "Sync to Memwyre" button beneath any code block or response. Once saved, switch to Cursor or Claude Code and query the memory immediately.'
  },
  {
    question: 'Is my ChatGPT conversational data secure?',
    answer: 'Yes. Only snippets you explicitly save via the extension or Custom GPT Action are sent to your encrypted vault. Memwyre operates with strict zero-retention policies and does not use your data for model training.'
  },
  {
    question: 'What license does the Memwyre integration use?',
    answer: 'The Memwyre client tools and browser extension components are published under the Apache-2.0 open-source license.'
  },
  {
    question: 'Can I edit or delete memories captured from ChatGPT?',
    answer: 'Yes. You can review, edit, tag, or delete any captured memory at any time using the Memwyre Web Dashboard or CLI.'
  },
  {
    question: 'What is Memwyre LoCoMo-10 benchmark score?',
    answer: 'Memwyre scores 70.5% on the LoCoMo-10 long-term conversational memory benchmark, significantly outperforming flat vector memory baselines.'
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
