<template>
  <div class="relative min-h-screen bg-white dark:bg-[#0c0c0c] pt-28 pb-0 font-sans">
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
          to="/research" 
          class="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 dark:border-zinc-800 text-[10px]">&larr;</span>
          All research papers
        </router-link>
      </div>

      <!-- Header Section -->
      <div class="space-y-4 mb-8 text-left">
        <div class="text-xs font-bold uppercase tracking-wider text-[#D97757] font-mono">
          RESEARCH / ARCHITECTURE STUDY
          <span class="text-gray-300 dark:text-gray-700 mx-2">/</span> 
          SEPTEMBER 14, 2026
        </div>
        
        <h1 class="hero-serif text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.1] text-gray-950 dark:text-white">
          Vector Database vs. AI Agent Memory: <br />
          <span class="italic font-medium text-gray-900 dark:text-gray-100">The Difference Between <span class="inline-block bg-[#D97757] text-white px-3 py-0.5 italic font-medium">Static Indexing</span> and Stateful Cognition.</span>
        </h1>

        <div class="text-[10px] tracking-wider uppercase font-bold font-mono text-gray-400 dark:text-gray-500 pt-2">
          16 MINUTES READ · PEER-REVIEWED ARCHITECTURE SPECIFICATION
        </div>
      </div>

      <!-- Section Separator Line -->
      <div class="-mx-6 sm:-mx-8 lg:-mx-12 h-px bg-gray-200 dark:bg-gray-850 pointer-events-none select-none"></div>

      <!-- 3-Column Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-0 pb-24">
        
        <!-- Left Sidebar (Author Info & Peer Links) -->
        <aside class="lg:col-span-2 lg:border-r border-gray-200 dark:border-gray-800 lg:pr-8 pt-8 lg:pt-12 text-left">
          <div class="sticky top-24 space-y-8">
            <!-- Author Card -->
            <div class="flex items-center gap-3">
              <img 
                src="https://avatars.githubusercontent.com/u/170114968?v=4" 
                alt="Memwyre Research Lab" 
                class="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-zinc-800"
                @error="$event.target.src = 'https://ui-avatars.com/api/?name=Memwyre+Research+Lab&background=f3f4f6&color=333'"
              />
              <div>
                <span class="text-sm font-semibold text-gray-900 dark:text-white block">
                  Memwyre Research Lab
                </span>
                <span class="text-[11px] text-gray-500 font-mono">Systems Architecture</span>
              </div>
            </div>

            <!-- Empirical Benchmark Links -->
            <div class="space-y-2 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">RELATED STUDIES</div>
              <router-link 
                to="/ai-memory-benchmark-locomo" 
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                LoCoMo-10 Benchmark (70.5%)
              </router-link>
              <router-link 
                to="/research/what-is-ai-memory" 
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                What is AI Memory?
              </router-link>
              <router-link 
                to="/research/context-engineering" 
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Context Engineering Guide
              </router-link>
              <a 
                href="https://arxiv.org/abs/2402.17753" 
                target="_blank"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                arXiv:2402.17753 (LoCoMo Paper)
              </a>
            </div>

            <!-- Share Buttons -->
            <div class="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold">SHARE THIS REPORT</div>
              <div class="flex items-center gap-2">
                <a 
                  :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`" 
                  target="_blank"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                  aria-label="Share on LinkedIn"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a 
                  :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`" 
                  target="_blank"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                  aria-label="Share on X / Twitter"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <button 
                  @click="copyLink"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111] cursor-pointer"
                  aria-label="Copy article link"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
              <div v-if="copied" class="text-[10px] text-[#D97757] font-mono">Link copied to clipboard!</div>
            </div>
          </div>
        </aside>

        <!-- Middle Column (Banner & Article Body) -->
        <main class="lg:col-span-8 px-0 lg:px-8 pt-0 lg:pt-12 text-left">
          <!-- Cover Image -->
          <div class="w-full aspect-[2/1] rounded-xl overflow-hidden mb-10 bg-gray-50 border border-gray-150 dark:bg-zinc-900/30 dark:border-zinc-800/80">
            <img 
              src="/blog-covers/rag-vs-memory-long-term-knowledge.png" 
              alt="Vector Database vs AI Agent Memory" 
              class="w-full h-full object-cover"
            />
          </div>

          <article class="markdown-content space-y-12">
            
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              One of the most persistent architectural misconceptions in generative AI is the assumption that <strong>a vector database equals agent memory</strong>. Cloud providers and database vendors advertise vector stores as "the long-term memory layer for LLMs," leading software teams to deploy vector indices (Pinecone, Weaviate, Qdrant, Chroma) to retain conversational state. In production, these teams invariably hit a wall: agents confuse past decisions with current rules, retrieve contradictory facts, suffer cognitive degradation across multi-hop reasoning, and inflate token bills.
            </p>

            <!-- TL;DR / Featured Snippet Box -->
            <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm my-6">
              <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="space-y-2">
                <div class="text-[#D97757] font-mono text-xs uppercase font-bold tracking-wider">Quick Summary / Executive Takeaway</div>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  <strong>The Core Distinction:</strong> A <strong>vector database</strong> is a passive, read-only storage index designed to calculate static cosine distance between high-dimensional mathematical coordinates. An <strong>AI Agent Memory Layer</strong> is an active cognitive system designed to track identity, resolve contradictions across sessions, apply logarithmic temporal decay curves (<span class="font-mono">R = e<sup>-λt</sup></span>), and continuously consolidate learned facts into structured entity knowledge graphs. On empirical evaluations (<router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">LoCoMo-10</router-link>), dedicated memory layers achieve <strong>70.5% non-adversarial accuracy</strong> compared to ~42% for flat vector RAG baselines, while reducing injected prompt token overhead by <strong>81%</strong>.
                </p>
              </div>
            </div>

            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">+28pp</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Accuracy Lift</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">70.5% vs ~42% RAG Baseline</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">-81%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Token Overhead</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">~4.9k vs 26k+ Raw Context</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">Zero</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Batch Re-indexing</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Continuous Ingestion Loop</div>
                </div>
              </div>
            </div>

            <!-- Section 1: The Category Confusion -->
            <section id="category-confusion" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                1. The Category Confusion: Why Vector Databases Are Not Memory
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                When Large Language Models first exploded into mainstream development, the initial technical bottleneck was the strict context window limit (originally 4k or 8k tokens). To allow LLMs to answer questions about proprietary internal documents, the AI ecosystem coalesced around <strong>Retrieval-Augmented Generation (RAG)</strong> powered by vector databases.
              </p>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                In this pattern, raw documents are split into arbitrary token chunks (e.g. 500 characters), passed through an embedding model (like <span class="font-mono text-xs">text-embedding-3-large</span>), and saved as floating-point vector coordinates in an approximate nearest-neighbor (ANN) index like HNSW. At runtime, the user prompt is converted into a vector, and the database calculates cosine similarity to return the top-K closest text chunks.
              </p>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                This approach is exceptionally effective for <strong>static document search</strong>—such as searching a 500-page corporate legal policy or querying a medical encyclopedia. Because those documents do not change based on what the user says, and because they do not involve personal user evolution, a static read-only coordinate lookup is sufficient.
              </p>
              <div class="p-4 bg-gray-50 dark:bg-zinc-900/60 rounded-lg border-l-4 border-[#D97757] text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>The Mental Model Shift:</strong> A vector database is a <em>library catalog</em>. It indexes static books sitting on a shelf. But human memory is not a library catalog; it is an <em>active cognitive operating system</em> that constantly discards trivia, consolidates recurring lessons, resolves conflicting instructions, and adapts to current goals.
              </div>

              <!-- Subsection: The Four-Tier Memory Taxonomy -->
              <div class="pt-4 space-y-4">
                <h3 class="hero-serif text-xl sm:text-2xl tracking-tight text-gray-950 dark:text-white">
                  The Four-Tier Cognitive Architecture of Agentic AI
                </h3>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  Cognitive science divides human memory into distinct operational subsystems. When engineering production AI agents, conflating these subsystems into a single flat vector index creates catastrophic context failure. A resilient agentic system requires four distinct memory tiers:
                </p>

                <div class="overflow-x-auto my-4">
                  <table class="w-full text-xs text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                    <thead>
                      <tr class="bg-gray-50 dark:bg-zinc-900 font-mono uppercase font-bold text-gray-500">
                        <th class="px-4 py-2.5 border-b border-gray-200 dark:border-gray-800">Memory Tier</th>
                        <th class="px-4 py-2.5 border-b border-gray-200 dark:border-gray-800">Cognitive Function</th>
                        <th class="px-4 py-2.5 border-b border-gray-200 dark:border-gray-800">Optimal Substrate</th>
                        <th class="px-4 py-2.5 border-b border-gray-200 dark:border-gray-800">Retention Horizon</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                      <tr class="border-b border-gray-100 dark:border-gray-800">
                        <td class="px-4 py-2.5 font-bold font-mono text-gray-900 dark:text-white">1. Working Memory</td>
                        <td class="px-4 py-2.5">Immediate task execution, active scratchpad, intermediate tool output parsing</td>
                        <td class="px-4 py-2.5 font-mono text-[11px]">LLM KV-Cache / Prompt Window</td>
                        <td class="px-4 py-2.5 font-mono text-[11px] text-red-500">Single Prompt Turn (Ephemeral)</td>
                      </tr>
                      <tr class="border-b border-gray-100 dark:border-gray-800">
                        <td class="px-4 py-2.5 font-bold font-mono text-gray-900 dark:text-white">2. Episodic Memory</td>
                        <td class="px-4 py-2.5">Chronological session logs, tool execution traces, historical debugging dialogues</td>
                        <td class="px-4 py-2.5 font-mono text-[11px]">Append-only Event Log + SQLite</td>
                        <td class="px-4 py-2.5 font-mono text-[11px] text-amber-500">Days to Weeks (Decaying)</td>
                      </tr>
                      <tr class="border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10">
                        <td class="px-4 py-2.5 font-bold font-mono text-[#D97757]">3. Semantic Memory</td>
                        <td class="px-4 py-2.5">Deduplicated entity relationships, architectural invariants, user preferences</td>
                        <td class="px-4 py-2.5 font-mono text-[11px] font-bold text-gray-900 dark:text-white">Entity Knowledge Graph + Vectors</td>
                        <td class="px-4 py-2.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Months to Years (Persistent)</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2.5 font-bold font-mono text-gray-900 dark:text-white">4. Procedural Memory</td>
                        <td class="px-4 py-2.5">Learned coding patterns, automated refactoring recipes, tool usage policies</td>
                        <td class="px-4 py-2.5 font-mono text-[11px]">Executable Skills &amp; MCP Tool Schemas</td>
                        <td class="px-4 py-2.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Permanent (Versioned)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  Traditional vector databases attempt to force all four tiers into a single primitive: high-dimensional embedding chunks. By treating a temporal event ("we upgraded to Next.js 15 on Tuesday") with the exact same coordinate logic as a permanent invariant ("never commit production secrets to Git"), flat vector databases guarantee cognitive confusion.
                </p>
              </div>
            </section>

            <!-- Section 2: Visual Comparison Diagram -->
            <section id="architectural-diagram" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                2. System Architecture: Static Vector Store vs. Stateful Agent Memory
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                The fundamental difference lies in the pipeline design. While a vector database operates entirely as a unidirectional read-only pipeline, an Agent Memory Layer implements a bidirectional feedback loop with automated conflict compaction:
              </p>

              <!-- Light Monotone SVG Architecture Diagram -->
              <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm">
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                    <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">Comparative Architecture Blueprint</span>
                  </div>
                  <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Static Coordinate Lookup vs Cognitive Graph Loop</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                  
                  <!-- Left Box: Static Vector DB -->
                  <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                    <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                      <span>Traditional Vector Database (RAG)</span>
                      <span class="text-[10px] bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-2 py-0.5 rounded border border-red-200 dark:border-red-900">Passive / Read-Only</span>
                    </div>
                    <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                      <div class="text-gray-900 dark:text-gray-200 font-semibold">Offline Batch ETL Pipeline:</div>
                      <div>┌─ Static Text Files / Code Repos</div>
                      <div>├─ Token Window Splitter (e.g. 500 chars)</div>
                      <div>├─ Embedding Model (text-embedding-3)</div>
                      <div>└─ Vector Table (Pinecone / Chroma / HNSW)</div>
                      <div class="pt-2 text-gray-900 dark:text-gray-200 font-semibold">Query Runtime Path:</div>
                      <div>┌─ Prompt Vectorized</div>
                      <div>├─ Cosine K-NN Lookup (e.g. Top-5 Chunks)</div>
                      <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">▼ DUMB CHUNK INJECTION (Unsorted / Blind to Time)</div>
                    </div>
                    <div class="space-y-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <div class="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <span>✕</span>
                        <span>Zero write-back: Corrections made in chat are lost</span>
                      </div>
                      <div class="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <span>✕</span>
                        <span>No concept of recency: Stale facts returned equally</span>
                      </div>
                      <div class="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <span>✕</span>
                        <span>Fragmented chunks break code function boundaries</span>
                      </div>
                    </div>
                  </div>

                  <!-- Right Box: AI Agent Memory Layer -->
                  <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                    <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                      <span>AI Agent Memory Layer (Memwyre)</span>
                      <span class="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">Active / Cognitive Loop</span>
                    </div>
                    <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                      <div class="text-gray-900 dark:text-gray-200 font-semibold">Continuous Write-Back Loop:</div>
                      <div>┌─ Chat / Terminal Session Event Hook</div>
                      <div>├─ Async Fact & Entity Extraction Worker</div>
                      <div>├─ Conflict Compaction (Deprecate Old Truths)</div>
                      <div>└─ Entity Knowledge Graph Reconciliation</div>
                      <div class="pt-2 text-gray-900 dark:text-gray-200 font-semibold">Cognitive Retrieval Path:</div>
                      <div>┌─ Query Entity Extraction + Multi-Hop Graph</div>
                      <div>├─ Hybrid Scoring (Semantic + Ebbinghaus Decay)</div>
                      <div class="text-gray-900 dark:text-white font-bold bg-gray-200/80 dark:bg-zinc-800 p-1 rounded">▲ PRECISION CONTEXT INJECTION (Compact & Verified)</div>
                    </div>
                    <div class="space-y-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <span>✓</span>
                        <span>Stateful continuity across Cursor, Claude Code, &amp; CLI</span>
                      </div>
                      <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <span>✓</span>
                        <span>Mathematical decay ensures recent updates dominate</span>
                      </div>
                      <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <span>✓</span>
                        <span>81% lower token consumption per prompt payload</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <!-- Section 3: The 5 Fundamental Failure Modes of Vector DBs -->
            <section id="failure-modes" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                3. The Five Failure Modes of Vector Databases in Agentic Workflows
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Why does building an autonomous coding assistant or multi-session agent directly on top of a vector database inevitably break down? In production engineering, vector databases exhibit five fatal failure modes when applied to dynamic agent state:
              </p>

              <div class="space-y-6 my-6">
                <!-- Failure Mode 1 -->
                <div class="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-mono font-bold flex items-center justify-center">1</span>
                    <h3 class="text-lg font-bold text-gray-950 dark:text-white">The Cosine Similarity Fallacy: Blindness to Time and Contradictions</h3>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Cosine distance calculates the geometric angle between two vector embeddings in an $N$-dimensional vector space:
                  </p>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900/60 rounded border border-gray-200 dark:border-zinc-800 font-mono text-xs text-center text-gray-800 dark:text-gray-200">
                    $$\text{Cosine Similarity}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2} = \frac{\sum_{i=1}^{n} u_i v_i}{\sqrt{\sum_{i=1}^{n} u_i^2} \sqrt{\sum_{i=1}^{n} v_i^2}}$$
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    This mathematical formulation answers exclusively: <em>"Does text A share vocabulary and semantic orientation with text B?"</em> It is completely incapable of answering temporal and stateful questions: <em>"Which statement represents current reality?"</em>
                  </p>
                  
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 font-mono text-xs text-gray-700 dark:text-gray-300 space-y-1.5">
                    <div class="text-gray-400">// Vector Database Query Result (K=2 Nearest Neighbors):</div>
                    <div class="text-red-600 dark:text-red-400">[Score: 0.91] "id_812" (Indexed Jan 12): "Auth pattern: Session cookie verification via Express middleware."</div>
                    <div class="text-red-600 dark:text-red-400">[Score: 0.89] "id_944" (Indexed Aug 24): "Auth pattern: Stateless JWT Bearer token inside Authorization headers."</div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    When an agent receives the instruction: <em>"Create an authenticated API client route"</em>, the vector database returns <strong>both</strong> chunks with nearly identical relevance scores. Because vector databases treat storage as an immutable write-once ledger, the LLM receives conflicting instructions within the same prompt and generates broken frankenstein code (e.g. attempting to read session cookies from a JWT Authorization header).
                  </p>
                </div>

                <!-- Failure Mode 2 -->
                <div class="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-mono font-bold flex items-center justify-center">2</span>
                    <h3 class="text-lg font-bold text-gray-950 dark:text-white">The Missing Write-Path: The Transient Chat Amnesia Trap</h3>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Vector databases are architected around offline, unidirectional batch ETL pipelines. A background worker periodically chunks Markdown or source code files, generates embeddings, and writes coordinates into HNSW indices.
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    In modern pair-programming workflows, however, software development is highly iterative. When an engineer instructs Cursor or Claude Code:
                  </p>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 font-mono text-xs text-gray-800 dark:text-gray-200">
                    <span class="text-[#D97757] font-bold">Developer:</span> "We've deprecated the legacy /v1/orders endpoint. All order creations must now route through the /v2/checkout gRPC service with idempotency headers."
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    In a standard vector RAG architecture, that instruction exists exclusively in the volatile RAM of the active chat. A vector database has no mechanism to intercept the dialogue lifecycle, extract the newly established constraint, reconcile it against the knowledge store, and overwrite outdated instructions. When the engineer terminates the session, the learning disappears completely.
                  </p>
                </div>

                <!-- Failure Mode 3 -->
                <div class="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-mono font-bold flex items-center justify-center">3</span>
                    <h3 class="text-lg font-bold text-gray-950 dark:text-white">Chunk Boundary Bleed: The Fragmentation of AST Code Context</h3>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Standard vector RAG splits documents into arbitrary token intervals (e.g. 512 tokens with a 50-token sliding window). In software codebases, semantic units conform to Abstract Syntax Trees (ASTs), not fixed token counts:
                  </p>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 font-mono text-xs text-gray-700 dark:text-gray-300 space-y-1">
                    <div class="text-gray-400">// Naive 512-Token Cut splits Interface from Implementation:</div>
                    <div class="text-emerald-600 dark:text-emerald-400">--- CHUNK_1 (Vector ID: v_401) ---</div>
                    <div>export interface BillingRecord { id: string; customerId: string; amount: number;</div>
                    <div class="text-red-500 font-bold">--- [ARBITRARY SPLIT OCCURS HERE AT 512 TOKENS] ---</div>
                    <div class="text-emerald-600 dark:text-emerald-400">--- CHUNK_2 (Vector ID: v_402) ---</div>
                    <div>status: 'pending' | 'settled'; createdAt: Date; metadata: Record&lt;string, any&gt;; }</div>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    When the model queries for payment validation logic, the vector index frequently retrieves <span class="font-mono text-xs">CHUNK_1</span> without <span class="font-mono text-xs">CHUNK_2</span>. Deprived of the full interface contract and type imports, the LLM hallucinates missing attributes and syntax errors.
                  </p>
                </div>

                <!-- Failure Mode 4 -->
                <div class="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-mono font-bold flex items-center justify-center">4</span>
                    <h3 class="text-lg font-bold text-gray-950 dark:text-white">Unbounded Token Bloat, Context Rot, and Economic Waste</h3>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Because vector search cannot determine which specific clause inside a 500-token chunk is relevant, it must inject entire chunks into the prompt window. Fetching the top-10 chunks injects <strong>5,000 to 10,000 noisy tokens</strong> into every single user message.
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    This triggers two critical failures:
                  </p>
                  <ul class="list-disc pl-5 space-y-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <li>
                      <strong>Cognitive Context Rot:</strong> Stanford/ACL research by <a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener noreferrer" class="text-[#D97757] hover:underline font-medium">Liu et al. ("Lost in the Middle")</a> proves that LLMs suffer a <strong>15–25 percentage point accuracy drop</strong> when critical facts are buried amidst noisy distractors in the prompt middle.
                    </li>
                    <li>
                      <strong>Severe Financial Drag:</strong> Quadratic self-attention computation means longer prompts slow model generation down by 3–8 seconds per turn while multiplying token invoices.
                    </li>
                  </ul>

                  <!-- Token Cost Equation Box -->
                  <div class="p-4 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 font-mono text-xs space-y-2">
                    <div class="text-[#D97757] font-bold uppercase text-[10px]">Monthly Token Cost Formula (10-Engineer Development Team)</div>
                    <div class="text-gray-700 dark:text-gray-300">
                      $$\text{Cost} = N_{\text{engineers}} \times D_{\text{sessions/day}} \times Q_{\text{queries/session}} \times T_{\text{tokens/query}} \times P_{\text{token}}$$
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                      <div class="p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded">
                        <div class="font-bold text-red-700 dark:text-red-400">Flat Vector RAG:</div>
                        <div>10 devs × 4 sess × 20 turns × 26,000 tok × $1.75/M</div>
                        <div class="text-red-700 dark:text-red-400 font-bold text-sm mt-1">≈ $728.00 / month in raw prompt waste</div>
                      </div>
                      <div class="p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded">
                        <div class="font-bold text-emerald-700 dark:text-emerald-400">Memwyre Precision Entity Layer:</div>
                        <div>10 devs × 4 sess × 20 turns × 4,924 tok × $1.75/M</div>
                        <div class="text-emerald-700 dark:text-emerald-400 font-bold text-sm mt-1">≈ $137.87 / month (−81% reduction)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Failure Mode 5 -->
                <div class="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-mono font-bold flex items-center justify-center">5</span>
                    <h3 class="text-lg font-bold text-gray-950 dark:text-white">Inability to Traverse Multi-Hop Relational Knowledge</h3>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Engineering queries routinely require relational chaining across disparate modules: <em>"Which microservices consume the billing event published by the checkout worker?"</em>
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    In a vector database, the document defining the checkout worker's Kafka producer does not semantically resemble the notification service's database schema. Because their vocabulary is dissimilar, cosine similarity scores rank below the retrieval threshold.
                  </p>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 font-mono text-xs text-gray-700 dark:text-gray-300">
                    <div class="text-emerald-600 dark:text-emerald-400 font-bold">// Relational Graph Traversal in Memwyre:</div>
                    <div>(CheckoutService:Service) ──[:PRODUCES]──&gt; (OrderBilledEvent:Topic)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──[:CONSUMED_BY]──&gt; (NotificationService:Service)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──[:CONSUMED_BY]──&gt; (InvoiceLedgerService:Service)</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 4: The Mathematical Foundations of AI Memory -->
            <section id="mathematical-foundation" class="space-y-6 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                4. The Mathematical Formulation: Logarithmic Forgetting Curves &amp; Multi-Factor Ranking
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                How does an Agent Memory Layer solve the temporal contradiction problem without requiring developers to manually delete outdated database rows? It applies formal psychological memory decay equations adapted from the <strong>Hermann Ebbinghaus Forgetting Curve</strong>, integrated into a multi-factor cognitive ranking function.
              </p>

              <!-- Master Formula Box -->
              <div class="my-6 p-6 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-center font-mono space-y-4">
                <div class="text-xs uppercase font-bold text-[#D97757] tracking-wider">Memwyre Hybrid Cognitive Scoring Formula</div>
                <div class="text-xl sm:text-2xl font-extrabold text-gray-950 dark:text-white py-2">
                  $$\text{Score}(m, q, t) = \alpha \cdot S_{\text{semantic}}(m, q) + \beta \cdot e^{-\lambda(n) \cdot \Delta t} + \gamma \cdot I(m) + \delta \cdot G_{\text{rel}}(m, q)$$
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Where $\alpha + \beta + \gamma + \delta = 1.0$, balancing semantic relevance ($S$), temporal recency retention ($e^{-\lambda \Delta t}$), intrinsic entity importance ($I$), and knowledge graph relational distance ($G$).
                </p>
              </div>

              <!-- Mathematical Subsections -->
              <div class="space-y-6">
                
                <!-- Sub 1: Spaced Reinforcement Dynamics -->
                <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <h3 class="hero-serif text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                    1. Spaced Reinforcement &amp; Dynamic Decay Rate ($\lambda$)
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Unlike static vector timestamps that age linearly, human cognitive retention reinforces facts whenever they are recalled. In Memwyre, the decay velocity parameter $\lambda$ decreases dynamically as a function of access frequency $n$ and verification score $v$:
                  </p>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900/60 rounded border border-gray-200 dark:border-zinc-800 font-mono text-xs text-center text-gray-800 dark:text-gray-200">
                    $$\lambda(n) = \lambda_0 \cdot \prod_{i=1}^{n} \left(1 - \min(\kappa \cdot v_i, 0.40)\right)$$
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Where $\lambda_0$ is the baseline half-life decay rate, $\kappa$ is the reinforcement coefficient (typically $0.25$), and $v_i \in [0, 1]$ is the retrieval verification factor (did the LLM successfully execute a tool call or answer a query based on this memory?). 
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>The Result:</strong> A core architectural choice confirmed across 5 coding sessions stabilizes with a decay rate approaching zero ($\lambda \to 0$, permanent long-term memory). A transient build warning or temporary port number decays rapidly into inactivity within 48 hours without polluting future prompt windows.
                  </p>
                </div>

                <!-- Sub 2: Hierarchical Importance Tiers -->
                <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <h3 class="hero-serif text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                    2. Hierarchical Importance Weighting ($I(m)$)
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Not all facts carry equal cognitive weight. During background ingestion, Memwyre's extractor evaluates statement criticality across four deterministic tiers:
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div class="p-3 rounded border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
                      <div class="font-bold text-red-700 dark:text-red-400 flex justify-between">
                        <span>Tier 1: Invariant &amp; Security ($I = 1.0$)</span>
                        <span>Immunity: High</span>
                      </div>
                      <div class="text-gray-600 dark:text-gray-400 mt-1 font-sans text-[11px]">
                        API credentials, regulatory mandates, database schema constraints, cryptographic standards. Decay is suspended entirely.
                      </div>
                    </div>
                    <div class="p-3 rounded border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
                      <div class="font-bold text-amber-700 dark:text-amber-400 flex justify-between">
                        <span>Tier 2: Architecture Rules ($I = 0.85$)</span>
                        <span>Half-life: 90 Days</span>
                      </div>
                      <div class="text-gray-600 dark:text-gray-400 mt-1 font-sans text-[11px]">
                        Framework versions, state management conventions, monorepo package boundaries, linting configurations.
                      </div>
                    </div>
                    <div class="p-3 rounded border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
                      <div class="font-bold text-blue-700 dark:text-blue-400 flex justify-between">
                        <span>Tier 3: User Preferences ($I = 0.60$)</span>
                        <span>Half-life: 30 Days</span>
                      </div>
                      <div class="text-gray-600 dark:text-gray-400 mt-1 font-sans text-[11px]">
                        Naming conventions, indent styles, comment verbosity, preferred test frameworks. Soft decay unless reinforced.
                      </div>
                    </div>
                    <div class="p-3 rounded border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
                      <div class="font-bold text-gray-700 dark:text-gray-300 flex justify-between">
                        <span>Tier 4: Ephemeral Context ($I = 0.15$)</span>
                        <span>Half-life: 48 Hours</span>
                      </div>
                      <div class="text-gray-600 dark:text-gray-400 mt-1 font-sans text-[11px]">
                        Temporary bug reproduction traces, test outputs, exploratory shell logs. Rapid background pruning.
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sub 3: Bi-Encoder vs Cross-Encoder Precision -->
                <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <h3 class="hero-serif text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                    3. Bi-Encoder Cosine Angle vs. Two-Stage Cross-Encoder Scoring
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Vector databases rely on <strong>bi-encoders</strong> (e.g. OpenAI <span class="font-mono text-xs">text-embedding-3</span>), where the query $q$ and document chunk $d$ are embedded into vectors independently: $\mathbf{u} = f(q)$ and $\mathbf{v} = g(d)$.
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Because $\mathbf{u}$ and $\mathbf{v}$ are compressed independently, the model cannot perform full cross-attention between the tokens of the question and the tokens of the memory. Bi-encoders collapse asymmetric relationships (e.g. <em>"Service A calls Service B"</em> vs <em>"Service B calls Service A"</em>) into identical symmetric distance scores.
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Memwyre implements a <strong>two-stage retrieval pipeline</strong>:
                  </p>
                  <ol class="list-decimal pl-5 space-y-1.5 text-xs text-gray-600 dark:text-gray-400 font-sans">
                    <li><strong>Stage 1 (High-Recall Candidate Retrieval):</strong> Queries the hybrid entity graph and dense index to retrieve the top-50 candidates ($K=50$).</li>
                    <li><strong>Stage 2 (Cross-Encoder Precision Re-Ranking):</strong> Passes candidate pairs $[q, m_i]$ through a dense cross-encoder transformer where all query tokens and memory tokens attend to each other simultaneously ($O(L^2)$ attention), producing an exact semantic alignment score before prompt injection.</li>
                  </ol>
                </div>

              </div>
            </section>

            <!-- Section 5: The 12-Factor Comparison Matrix -->
            <section id="comparison-table" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                5. The Exhaustive 12-Factor Comparison: Vector DB vs. Agent Memory
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Below is a side-by-side engineering comparison across storage mechanics, runtime behavior, and cognitive capabilities:
              </p>

              <div class="overflow-x-auto my-6">
                <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                  <thead>
                    <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                      <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Capability / Dimension</th>
                      <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Vector Database (Pinecone / Chroma / Qdrant)</th>
                      <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6] dark:bg-orange-950/20">
                        <span class="text-[#D97757]">AI Agent Memory (Memwyre)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-mono">
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Primary Abstraction</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">High-dimensional geometric vector coordinate table</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white font-sans">Evolving Entity Knowledge Graph + Temporal Index</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Write-Path Dynamics</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">Manual batch ETL (Split → Embed → Insert)</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400 font-sans">Autonomous lifecycle event hooks (Session start/end sync)</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Conflict Resolution</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-red-600 dark:text-red-400 font-sans">None. Contradictory facts coexist indefinitely</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400 font-sans">Automatic entity compaction &amp; factual supersession</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Temporal Awareness</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-red-600 dark:text-red-400 font-sans">Blind. Metadata filtering requires manual SQL/timestamps</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400 font-sans">Native Ebbinghaus exponential decay (<span class="font-mono">R = e<sup>-λt</sup></span>)</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Multi-Hop Reasoning</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">Poor (~42% overall recall on LoCoMo-10 benchmark)</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400 font-sans">High (70.5% non-adversarial accuracy; +28pp lift)</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Token Efficiency</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">High bloat (~26,000 raw dialog tokens retrieved)</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white font-sans">Pruned entity facts (~4,924 tokens; -81% overhead reduction)</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Developer Tool Integration</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">Requires custom Python / Node.js backend glue code</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400 font-sans">1-click CLI installer, native Cursor MCP, Claude Code sync</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Local Cache Support</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">Network round-trip per query (150–600ms network hop)</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white font-sans">Two-tier architecture: local SQLite cache + remote cloud sync</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Multi-Agent State Sharing</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">Siloed tables; risk of cross-agent hallucination</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400 font-sans">Universal vault: shared across OpenClaw, Cursor, &amp; Claude</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Data Pruning / Deletion</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">Manual database administrator script execution</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-emerald-600 dark:text-emerald-400 font-sans">Autonomous importance pruning &amp; manual UI dashboard override</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold border-b border-gray-100 dark:border-gray-800">Protocol Support</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 font-sans">Proprietary gRPC / REST API</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white font-sans">Open Model Context Protocol (MCP) JSON-RPC 2.0 stdio &amp; SSE</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-bold">Ideal Use Case</td>
                      <td class="px-4 py-3 font-sans">Static documentation search, PDF parsing, semantic Q&amp;A</td>
                      <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-[#D97757] font-sans">Autonomous coding agents, IDE workspace context, lifelong assistants</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Section 6: Empirical Benchmark Evidence (LoCoMo-10) -->
            <section id="empirical-benchmarks" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                6. Empirical Benchmark Proof: LoCoMo-10 Results
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                To move beyond marketing assertions, the <strong>LoCoMo-10 benchmark</strong> (<a href="https://arxiv.org/abs/2402.17753" target="_blank" rel="noopener noreferrer" class="text-[#D97757] hover:underline font-medium">Snap Research / ACL 2024, arXiv:2402.17753</a>) provides an objective, standardized test suite comprising 1,986 questions (including 446 adversarial abstention tests) evaluated over 10 long-term conversational trajectories.
              </p>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                When evaluating a standard flat vector RAG baseline against Memwyre's two-stage cognitive memory engine, the quantitative results demonstrate why flat vector indexing fails at conversational tasks:
              </p>

              <div class="overflow-x-auto my-6">
                <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                  <thead>
                    <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                      <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Benchmark Task Category</th>
                      <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Questions</th>
                      <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[#FDF8F6] dark:bg-orange-950/20">
                        <span class="text-[#D97757]">Memwyre Accuracy</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-mono">
                    <tr>
                      <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Single-Hop Recall</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">841</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">78.6%</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Adversarial (Abstain)</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">446</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">67.7%</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Temporal Reasoning</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">321</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">64.2%</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">World Knowledge</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">96</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">59.4%</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">Multi-Hop Reasoning</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">282</td>
                      <td class="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-gray-900 dark:text-white">57.5%</td>
                    </tr>
                    <tr class="bg-[#D97757]/5 dark:bg-[#D97757]/10">
                      <td class="px-4 py-3 font-bold text-[#D97757]">Overall (Non-Adversarial)</td>
                      <td class="px-4 py-3 font-bold text-gray-900 dark:text-white">1,540</td>
                      <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-[#D97757]">70.5%</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 font-semibold">Average Injected Token Burden</td>
                      <td class="px-4 py-3 text-gray-500" colspan="1">—</td>
                      <td class="px-4 py-3 bg-[#FDFCFB] dark:bg-orange-950/10 font-bold text-[#D97757]">~4,924 tokens (vs 26k+ raw; -81%)</td>
                    </tr>
                  </tbody>
                </table>
                <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">
                  Standard flat vector RAG baseline achieves ~42% overall recall on the same dataset. Refer to <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline">full methodology and architecture comparison</router-link> for complete baseline data.
                </p>
              </div>

              <!-- LoCoMo Deep Dive: Category Analysis & Concrete Traces -->
              <div class="space-y-6 pt-4">
                <h3 class="hero-serif text-xl sm:text-2xl tracking-tight text-gray-950 dark:text-white">
                  Why Vector RAG Degrades Across Benchmark Categories
                </h3>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  Analyzing the raw experimental failure logs from the LoCoMo-10 evaluation reveals the exact structural mechanisms that break vector database retrieval in dynamic conversations:
                </p>

                <!-- Case Study 1: Temporal Supercedence -->
                <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="flex items-center justify-between">
                    <h4 class="font-bold text-gray-950 dark:text-white text-sm">Case Study 1: Temporal Supercedence &amp; Preference Drift</h4>
                    <span class="text-[10px] font-mono uppercase bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">Temporal Reasoning: 64.2% vs ~31% RAG</span>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>Test Scenario:</strong> Across 35 sessions, the user establishes in Session 3 that they test code with <span class="font-mono">Jest</span>. In Session 22, after a major monorepo refactor, the user explicitly instructs: <em>"We have migrated all unit tests to Vitest; do not write any new Jest tests."</em> In Session 31, the user asks: <em>"Write a unit test suite for the auth controller."</em>
                  </p>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div class="p-3 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded space-y-1">
                      <div class="text-red-700 dark:text-red-400 font-bold">Vector Database Retrieval Output:</div>
                      <div class="text-gray-600 dark:text-gray-400 text-[11px]">Returns 4 chunks mentioning Jest from Sessions 3, 7, and 12, alongside 1 chunk mentioning Vitest from Session 22.</div>
                      <div class="text-red-600 dark:text-red-400 font-bold pt-1">Result: FAILS. Model writes Jest tests due to frequency dominance.</div>
                    </div>
                    <div class="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded space-y-1">
                      <div class="text-emerald-700 dark:text-emerald-400 font-bold">Memwyre Memory Engine Output:</div>
                      <div class="text-gray-600 dark:text-gray-400 text-[11px]">Entity graph marks Jest preference as <span class="text-red-500 font-bold">SUPERSEDED_BY</span> Vitest with Ebbinghaus decay applied to Session 3.</div>
                      <div class="text-emerald-600 dark:text-emerald-400 font-bold pt-1">Result: PASSES. Generates pure Vitest test suite with correct mocking.</div>
                    </div>
                  </div>
                </div>

                <!-- Case Study 2: Adversarial Abstention -->
                <div class="p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="flex items-center justify-between">
                    <h4 class="font-bold text-gray-950 dark:text-white text-sm">Case Study 2: Adversarial Abstention (Hallucination Resistance)</h4>
                    <span class="text-[10px] font-mono uppercase bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">Abstain Accuracy: 67.7%</span>
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>Test Scenario:</strong> The prompt queries a non-existent constraint: <em>"Which Redis cluster replica should handle our cache write-through?"</em> when the project has never deployed Redis (it uses local memory caching).
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>The Vector Failure:</strong> An approximate nearest neighbor index <em>must</em> return the top-K mathematical neighbors regardless of semantic relevance. It retrieves general caching documentation and a database replica config. The LLM assumes Redis exists and invents a fictional Redis host.
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>The Memory Engine Solution:</strong> Memwyre executes explicit negative entity verification. It detects zero validated entity edges for "Redis" and returns an explicit null fact assertion, allowing the agent to correctly state: <em>"No Redis infrastructure has been defined for this workspace."</em>
                  </p>
                </div>

              </div>

              <p class="text-xs text-gray-500 dark:text-gray-400 italic pt-2">
                Full experimental methodology, raw prompt transcripts, and open evaluation harnesses available in our <router-link to="/ai-memory-benchmark-locomo" class="text-[#D97757] hover:underline font-medium">LoCoMo-10 Benchmark Evaluation Report</router-link>.
              </p>
            </section>

            <!-- Section 7: Engineering Decision Guide & Enterprise Hybrid Stack -->
            <section id="decision-guide" class="space-y-6 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                7. Engineering Decision Guide: The Enterprise Hybrid Architecture
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                The prevailing question among enterprise architects is not whether to choose a vector database <em>or</em> an agent memory layer, but <strong>how to combine them into an optimal two-tier cognitive architecture</strong>:
              </p>

              <!-- Light Monotone Hybrid Stack Diagram -->
              <div class="p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-zinc-800">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#D97757]"></span>
                    <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">The Modern Two-Tier Enterprise AI Architecture</span>
                  </div>
                  <span class="text-[10px] font-mono text-gray-500 uppercase">Static Reference Knowledge + Dynamic Cognitive State</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 space-y-2">
                    <div class="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Tier 1: Static Knowledge Store (Vector DB)</div>
                    <div class="text-sm font-bold text-gray-900 dark:text-white font-serif">Pinecone / Weaviate / Chroma / Qdrant</div>
                    <ul class="text-[11px] text-gray-600 dark:text-gray-400 space-y-1 font-sans pt-1">
                      <li>• 100,000+ pages of public API reference documentation</li>
                      <li>• Corporate HR policies, compliance statutes, legal contracts</li>
                      <li>• Read-heavy, immutable batch ingestion; updated monthly</li>
                    </ul>
                  </div>

                  <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-[#D97757]/40 bg-[#FDFCFB] dark:bg-orange-950/10 space-y-2">
                    <div class="text-xs font-bold uppercase text-[#D97757]">Tier 2: Stateful Cognitive Layer (Agent Memory)</div>
                    <div class="text-sm font-bold text-gray-900 dark:text-white font-serif">Memwyre MCP Cloud &amp; Local Cache</div>
                    <ul class="text-[11px] text-gray-700 dark:text-gray-300 space-y-1 font-sans pt-1">
                      <li>• Live developer preferences, conventions, and architectural constraints</li>
                      <li>• Continuous write-back loop from Cursor, Claude Code, and terminal CLI</li>
                      <li>• Ebbinghaus temporal decay, conflict compaction, and entity graph sync</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Python Implementation Snippet: Unified Cognitive Router -->
              <div class="space-y-3 pt-2">
                <h3 class="hero-serif text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                  Implementation Blueprint: Unified Multi-Layer Retrieval in Python
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Below is an production-ready pattern demonstrating how an agent routes queries between static vector corpora and stateful entity memory:
                </p>

                <div class="p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-x-auto text-xs font-mono leading-relaxed">
                  <div class="text-gray-400">// Unified Agent Context Dispatcher (Python 3.11+)</div>
                  <div class="text-blue-600 dark:text-blue-400">from</div> dataclasses <div class="text-blue-600 dark:text-blue-400">import</div> dataclass<br/>
                  <div class="text-blue-600 dark:text-blue-400">import</div> asyncio<br/><br/>
                  <span class="text-gray-500 dark:text-gray-400"># 1. Query the static vector database for immutable external docs</span><br/>
                  <span class="text-blue-600 dark:text-blue-400">async def</span> <span class="text-amber-600 dark:text-amber-400">fetch_static_docs</span>(query: str, vector_client) -&gt; list[str]:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;q_vec = vector_client.embed(query)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;matches = vector_client.query(vector=q_vec, top_k=3, namespace=<span class="text-emerald-600">"api-docs-v2"</span>)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-600 dark:text-blue-400">return</span> [m.metadata[<span class="text-emerald-600">"text"</span>] <span class="text-blue-600 dark:text-blue-400">for</span> m <span class="text-blue-600 dark:text-blue-400">in</span> matches]<br/><br/>
                  <span class="text-gray-500 dark:text-gray-400"># 2. Query Memwyre for verified entity state, active constraints, and temporal facts</span><br/>
                  <span class="text-blue-600 dark:text-blue-400">async def</span> <span class="text-amber-600 dark:text-amber-400">fetch_agent_memory</span>(query: str, memwyre_client) -&gt; list[dict]:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-600 dark:text-blue-400">return</span> await memwyre_client.search_memory(<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;query=query,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apply_decay=<span class="text-blue-600 dark:text-blue-400">True</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-500 dark:text-gray-400"># Ebbinghaus curve automatically deprioritizes stale conventions</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve_conflicts=<span class="text-blue-600 dark:text-blue-400">True</span>&nbsp;&nbsp;<span class="text-gray-500 dark:text-gray-400"># Compaction worker excludes superseded architectural choices</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;)<br/><br/>
                  <span class="text-gray-500 dark:text-gray-400"># 3. Assemble compact, hallucination-resistant prompt payload</span><br/>
                  <span class="text-blue-600 dark:text-blue-400">async def</span> <span class="text-amber-600 dark:text-amber-400">assemble_agent_prompt</span>(user_prompt: str, v_client, m_client) -&gt; str:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;docs, memories = await asyncio.gather(<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fetch_static_docs(user_prompt, v_client),<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fetch_agent_memory(user_prompt, m_client)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-600 dark:text-blue-400">return</span> f<span class="text-emerald-600">"""<br/>
[ACTIVE WORKSPACE CONSTRAINTS - VERIFIED STATE]<br/>
{chr(10).join(f"- {m['statement']}" for m in memories)}<br/><br/>
[STATIC REFERENCE DOCUMENTATION]<br/>
{chr(10).join(docs)}<br/><br/>
[USER QUERY]<br/>
{user_prompt}"""</span>
                </div>
              </div>

              <!-- When to Use Which Quick Reference -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div class="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3">
                  <div class="text-xs font-mono uppercase font-bold text-gray-400 tracking-wider">DEPLOY A VECTOR DATABASE WHEN:</div>
                  <ul class="space-y-2 text-xs text-gray-600 dark:text-gray-400 list-disc list-inside leading-relaxed">
                    <li>You are indexing <strong>static, immutable documentation</strong> (legal statutes, medical literature, software manuals).</li>
                    <li>The underlying data updates via scheduled, infrequent batch ETL jobs.</li>
                    <li>There is <strong>no concept of user personalization</strong> or conversational history.</li>
                    <li>Your queries require raw string similarity search rather than relational graph traversal.</li>
                  </ul>
                </div>

                <div class="p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl space-y-3 bg-[#FDFCFB] dark:bg-orange-950/10 border-[#D97757]/30">
                  <div class="text-xs font-mono uppercase font-bold text-[#D97757] tracking-wider">DEPLOY AN AGENT MEMORY LAYER WHEN:</div>
                  <ul class="space-y-2 text-xs text-gray-700 dark:text-gray-300 list-disc list-inside leading-relaxed">
                    <li>You are building <strong>autonomous coding agents</strong> (Cursor, Claude Code, OpenClaw, OpenCode).</li>
                    <li>Users make corrections in chat that must persist into subsequent sessions.</li>
                    <li>The system must resolve conflicting facts across months of interaction.</li>
                    <li>You need a shared context bridge across multiple tools without vendor lock-in.</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Section 8: Semantic Fan-Out Linking Cluster -->
            <section id="fanout-cluster" class="space-y-4 pt-6">
              <h2 class="hero-serif text-xl sm:text-2xl tracking-tight text-gray-900 dark:text-white">
                Explore the AI Context &amp; Memory Architecture
              </h2>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Continue exploring the architectural pillars of stateful agent systems across our research reports and integration specifications:
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono my-4">
                <router-link to="/ai-memory-benchmark-locomo" class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757] transition-all shadow-sm">
                  <div class="text-[#D97757] font-bold text-[10px] uppercase">Empirical Benchmark</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm mt-1">LoCoMo-10 Report &rarr;</div>
                  <div class="text-gray-500 text-[11px] mt-1 font-sans">Evaluating 1,986 questions across 10 long-term agent trajectories.</div>
                </router-link>

                <router-link to="/research/what-is-ai-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757] transition-all shadow-sm">
                  <div class="text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">Core Ontology</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm mt-1">What is AI Memory? &rarr;</div>
                  <div class="text-gray-500 text-[11px] mt-1 font-sans">The engineering transition from transactional chats to stateful agents.</div>
                </router-link>

                <router-link to="/research/context-engineering" class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757] transition-all shadow-sm">
                  <div class="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase">Methodology</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm mt-1">Context Engineering &rarr;</div>
                  <div class="text-gray-500 text-[11px] mt-1 font-sans">Why prompt engineering is being replaced by hierarchical context graphs.</div>
                </router-link>

                <router-link to="/claude-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757] transition-all shadow-sm">
                  <div class="text-[#D97757] font-bold text-[10px] uppercase">CLI Integration</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm mt-1">Claude Code Memory &rarr;</div>
                  <div class="text-gray-500 text-[11px] mt-1 font-sans">Automating cross-session memory without manual CLAUDE.md files.</div>
                </router-link>

                <router-link to="/cursor-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757] transition-all shadow-sm">
                  <div class="text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">IDE Integration</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm mt-1">Cursor Memory &rarr;</div>
                  <div class="text-gray-500 text-[11px] mt-1 font-sans">Sharing persistent context across Composer chat windows via MCP.</div>
                </router-link>

                <router-link to="/mcp-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757] transition-all shadow-sm">
                  <div class="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase">Protocol Spec</div>
                  <div class="text-gray-900 dark:text-white font-semibold text-sm mt-1">MCP Protocol Reference &rarr;</div>
                  <div class="text-gray-500 text-[11px] mt-1 font-sans">Official JSON-RPC 2.0 tool schemas and lifecycle hook interfaces.</div>
                </router-link>
              </div>
            </section>

            <!-- Section 9: Frequently Asked Questions (Accordion) -->
            <section id="faq" class="space-y-6 scroll-mt-20 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div class="text-xs font-mono uppercase font-bold text-[#D97757] tracking-wider">FREQUENTLY ASKED QUESTIONS</div>
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white">
                Technical FAQ: Vector Databases vs. AI Agent Memory
              </h2>

              <div class="space-y-3">
                <div 
                  v-for="(faq, idx) in faqs" 
                  :key="idx" 
                  class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-[#111]"
                >
                  <button 
                    @click="toggleFaq(idx)" 
                    class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <span class="font-semibold text-sm text-gray-900 dark:text-white">{{ faq.q }}</span>
                    <span class="text-gray-400 text-lg shrink-0 font-mono">{{ openFaqs[idx] ? '−' : '+' }}</span>
                  </button>
                  <div v-if="openFaqs[idx]" class="px-5 pb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800 pt-3">
                    {{ faq.a }}
                  </div>
                </div>
              </div>
            </section>

          </article>
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

      <!-- CTA Footer Banner -->
      <div class="p-8 sm:p-12 border border-dashed border-gray-300 dark:border-zinc-800 bg-white dark:bg-[#111] rounded-xl text-center my-16 relative overflow-hidden">
        <div class="absolute top-2 left-2 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
        <div class="absolute top-2 right-2 w-3 h-3 pointer-events-none border-t-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
        <div class="absolute bottom-2 left-2 w-3 h-3 pointer-events-none border-b-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
        <div class="absolute bottom-2 right-2 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>

        <h3 class="hero-serif text-3xl mb-3 text-gray-950 dark:text-white">Give Your AI Agents Real Memory Today</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto mb-6">
          Stop struggling with vector chunk fragmentation and stateless chat resets. Install Memwyre in 60 seconds and give Cursor, Claude Code, and your CLI persistent state.
        </p>
        <div class="flex justify-center gap-4 flex-wrap">
          <router-link to="/signup" class="px-6 py-2.5 bg-[#D97757] hover:bg-[#c05c3d] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
            Get Started Free
          </router-link>
          <a href="https://docs.memwyre.tech" target="_blank" class="px-6 py-2.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg transition-colors">
            Read Documentation
          </a>
        </div>
      </div>

    </div>
    
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';

const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://memwyre.tech/research/vector-database-vs-agent-memory';
const pageTitle = 'Vector Database vs. AI Agent Memory: The Architectural Difference | Memwyre Research';

const copied = ref(false);
const copyLink = () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(pageUrl);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2500);
  }
};

const activeSection = ref('');
const toc = [
  { level: 2, text: '1. The Category Confusion', slug: 'category-confusion' },
  { level: 2, text: '2. Comparative Architecture', slug: 'architectural-diagram' },
  { level: 2, text: '3. Five Failure Modes', slug: 'failure-modes' },
  { level: 2, text: '4. Mathematical Foundations', slug: 'mathematical-foundation' },
  { level: 2, text: '5. 12-Factor Comparison', slug: 'comparison-table' },
  { level: 2, text: '6. LoCoMo-10 Benchmark', slug: 'empirical-benchmarks' },
  { level: 2, text: '7. Engineering Decision Guide', slug: 'decision-guide' },
  { level: 2, text: '8. Technical FAQ', slug: 'faq' }
];

// Scrollspy Observer
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
      threshold: 0
    });

    const headings = document.querySelectorAll('.scroll-mt-20');
    headings.forEach((h) => {
      observer.observe(h);
    });
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const openFaqs = reactive({
  0: true,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
});

const toggleFaq = (idx) => {
  openFaqs[idx] = !openFaqs[idx];
};

const faqs = [
  {
    q: "Why can't I just use Pinecone, Weaviate, or Chroma as my agent memory?",
    a: "Vector databases only calculate geometric semantic similarity between text embeddings. They lack a write-back feedback loop, have no concept of temporal decay (older facts are retrieved with equal weight to recent updates), cannot resolve contradictory statements, and fail to perform multi-hop relational entity traversal."
  },
  {
    q: "How does AI Agent Memory resolve conflicting facts across sessions?",
    a: "When an agent learns a new architectural decision or user preference, an entity reconciliation worker checks for existing semantic entities in the knowledge graph. If a contradiction is detected (e.g. migrating from MongoDB to PostgreSQL), the system deprecates the superseded statement, logs the timestamped change, and updates the entity state rather than storing duplicate conflicting chunks."
  },
  {
    q: "What is the Ebbinghaus forgetting curve in AI memory?",
    a: "It is an adaptation of Hermann Ebbinghaus's psychological retention formula R = e^(-λt). In an Agent Memory layer, learned memories decay over time unless reinforced through repeated access or high importance ratings. This ensures recent, actively verified developer constraints always take precedence over stale, outdated documentation."
  },
  {
    q: "Why does vector RAG consume so many more tokens than an entity memory layer?",
    a: "Vector RAG retrieves entire chunks of arbitrary text (typically 500 to 1,000 tokens each) to avoid cutting off words. Retrieving top-K chunks frequently injects 5,000 to 20,000 tokens of noisy prose into the prompt. In contrast, an AI Memory Layer extracts and injects concise, deduplicated entity facts, reducing prompt overhead by approximately 81%."
  },
  {
    q: "Does AI Agent Memory replace my vector database entirely?",
    a: "No. Vector databases and Agent Memory are complementary. A vector database is ideal for indexing large volumes of static, immutable reference data (such as 10,000 pages of compliance documentation or API reference docs). An Agent Memory Layer is designed for the active, dynamic state of the user and agent across sessions."
  },
  {
    q: "How does an Agent Memory Layer connect to my IDE (Cursor, VS Code, Claude Code)?",
    a: "Memwyre connects via the standard Model Context Protocol (MCP) as well as native CLI hooks. It automatically injects relevant project entities into the prompt on session initialization and extracts learned decisions from the session transcript upon termination."
  },
  {
    q: "What is the LoCoMo-10 benchmark score for Memwyre vs. Vector RAG?",
    a: "On the standardized LoCoMo-10 benchmark (1,986 questions across 10 long-term conversational trajectories), Memwyre achieves a 70.5% non-adversarial accuracy across 1,540 standard questions, scoring 78.6% on single-hop recall, 64.2% on temporal reasoning, and 57.5% on multi-hop reasoning. A standard flat vector RAG baseline achieves approximately 42% overall recall on the same dataset, while consuming over 26,000 tokens per query compared to Memwyre's ~4,924 tokens (an 81% reduction)."
  },
  {
    q: "Can multiple AI agents share the same memory vault?",
    a: "Yes. In Memwyre, multiple agents (such as an architect agent in Claude Code, a coding agent in Cursor Composer, and a headless testing agent in OpenClaw) connect to the same tenant vault. Decisions made by one agent are immediately queryable by another, eliminating multi-agent context fragmentation."
  },
  {
    q: "How does Memwyre handle sensitive credentials, API keys, and code privacy?",
    a: "Memwyre implements client-side regex and AST filters that automatically sanitize API keys, secrets, and PII before memory ingestion. In transit and at rest, memory graphs are encrypted with AES-256-GCM. Furthermore, Memwyre does not train foundation models on tenant memory vaults."
  },
  {
    q: "Can I self-host the Memwyre memory engine locally or within an isolated VPC?",
    a: "Yes. The Memwyre memory daemon provides a local-first SQLite + embedded vector execution mode that runs entirely on developer workstations with zero cloud network egress. For enterprise teams, a self-hosted Docker / Helm chart deployment is available for private AWS/GCP Kubernetes clusters."
  }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.hero-serif {
  font-family: 'Playfair Display', Georgia, serif;
}

.markdown-content h2,
.markdown-content h3 {
  font-family: 'Playfair Display', Georgia, serif;
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
</style>
