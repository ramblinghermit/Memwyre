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
          PROTOCOL REFERENCE <span class="text-gray-300 dark:text-gray-700 mx-2">/</span> AUGUST 2026
        </div>
        
        <h1 class="hero-serif text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.1] text-gray-950 dark:text-white">
          MCP Memory Server <br />
          <span class="italic font-medium text-gray-900 dark:text-gray-100">Universal Model Context Protocol <span class="inline-block bg-[#D97757] text-white px-3 py-0.5 italic font-medium">Architecture.</span></span>
        </h1>

        <div class="text-[10px] tracking-wider uppercase font-bold font-mono text-gray-400 dark:text-gray-500 pt-2">
          13 MIN READ · PROTOCOL SPECIFICATION &amp; TRANSPORT REFERENCE
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
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">OFFICIAL PROTOCOL</div>
              <a 
                href="https://modelcontextprotocol.io" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                MCP Official Spec (Anthropic)
              </a>
              <a 
                href="https://github.com/modelcontextprotocol" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                MCP GitHub Organization
              </a>
              <a 
                href="https://github.com/memwyreai/Memwyre" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                Memwyre MCP Source
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
                <span class="font-bold text-gray-900 dark:text-white uppercase">MCP SPEC 2024-11-05 READY</span>
              </div>
              <div class="flex flex-wrap items-center gap-4 text-[11px]">
                <span>Transports: <strong class="text-gray-800 dark:text-gray-200">Stdio, HTTP/SSE (mcp-remote)</strong></span>
                <span>Clients: <strong class="text-gray-800 dark:text-gray-200">Cursor, Claude, VS Code, Windsurf</strong></span>
                <span>License: <strong class="text-gray-800 dark:text-gray-200">Apache-2.0</strong></span>
              </div>
            </div>

            <!-- TL;DR -->
            <h2 id="tldr">TL;DR</h2>
            <p>
              The Memwyre MCP Memory Server provides a universal context gateway conforming strictly to Anthropic's open Model Context Protocol. It exposes standardized tool primitives (<code>search_memwyre</code>, <code>save_memory</code>, <code>get_inbox</code>, <code>approve_memory</code>, <code>delete_memory</code>) to equip any compliant AI coding client with durable long-term memory.
            </p>
            <div class="flex flex-wrap gap-3 my-6">
              <router-link to="/signup" class="px-6 py-2.5 bg-[#050614] dark:bg-white text-white dark:text-black text-sm font-semibold rounded hover:bg-gray-800 transition-colors shadow-sm">
                Get MCP API Key →
              </router-link>
              <router-link to="/mcp" class="px-6 py-2.5 bg-white dark:bg-transparent text-[#050614] dark:text-white text-sm font-semibold rounded border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Setup Guides for All IDEs
              </router-link>
            </div>

            <!-- Quick Summary / Answer-First Box -->
            <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm my-6">
              <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="space-y-2">
                <div class="text-[#D97757] font-mono text-xs uppercase font-bold tracking-wider">Quick Summary / Key Takeaways</div>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  <strong>Answer:</strong> The <strong>Model Context Protocol (MCP)</strong> eliminates brittle, custom vendor plugins by establishing an open JSON-RPC standard for AI agents to interact with external tools. The <strong>Memwyre MCP Memory Server</strong> implements this standard across both Stdio and remote HTTP/SSE transports. By exposing a declarative 5-tool schema, any agent (Cursor Composer, Claude Desktop, Roo-Code, Windsurf) can autonomously retrieve relevant architectural decisions on demand and record insights with zero local disk footprint.
                </p>
              </div>
            </div>

            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">5 Tools</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Standard MCP Primitives</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">CRUD &amp; Semantic Search</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">2 Modes</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Transport Flexibility</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Stdio &amp; Remote HTTP/SSE</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">70.5%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">LoCoMo Recall</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Graph Retrieval Benchmark</div>
                </div>
              </div>
            </div>

            <!-- The Problem Section -->
            <h2 id="the-problem">The Problem: Fragmentation in AI Agent Memory</h2>
            <p>
              As developer AI tooling rapidly proliferated through 2025 and 2026, software engineers faced extreme fragmentation:
            </p>
            <ul>
              <li>Cursor implemented its own internal codebase vector embeddings and local <code>.cursorrules</code>.</li>
              <li>Claude Code CLI developed a local Markdown store in <code>src/memdir/</code> capped at 200 lines.</li>
              <li>VS Code agents (Cline, Roo-Code, Continue) invented independent, incompatible storage formats.</li>
            </ul>
            <p>
              The result was total memory isolation. Knowledge gained while debugging in Cursor was invisible when running Claude Code in the terminal. The Model Context Protocol (MCP) solves this by standardizing the interface between models, tools, and persistent memory stores.
            </p>

            <!-- Visual Diagram 1: MCP Core Architecture (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">MCP Protocol Architecture</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Host Clients &rarr; JSON-RPC 2.0 &rarr; Memory Server</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <!-- Host Clients Column -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>MCP Host Clients</span>
                    <span class="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Consumers</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">IDE &amp; CLI Ecosystem</div>
                    <div>├─ Cursor (Composer / Chat)</div>
                    <div>├─ Claude Desktop &amp; Claude Code</div>
                    <div>├─ VS Code (Cline / Roo-Code)</div>
                    <div>└─ Windsurf / Custom Agents</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Hosts initiate sessions, declare capability negotiation, and pass tool calls to the protocol transport layer.
                  </div>
                </div>

                <!-- Transport Layer Column -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>Transport Layer</span>
                    <span class="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">JSON-RPC 2.0</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Two Core Transports</div>
                    <div>┌─ Stdio (Local child process)</div>
                    <div>│&nbsp;&nbsp;↳ stdin / stdout pipes</div>
                    <div>└─ HTTP + SSE (Remote bridge)</div>
                    <div>&nbsp;&nbsp;&nbsp;↳ POST /mcp &amp; SSE events</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Standardized message framing guarantees language and machine agnosticism with zero serialization friction.
                  </div>
                </div>

                <!-- Memory Server Column -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm space-y-3">
                  <div class="flex items-center justify-between text-gray-900 dark:text-white font-bold">
                    <span>Memory Server</span>
                    <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black font-semibold px-2 py-0.5 rounded">Vault &amp; Graph</span>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-1.5 text-gray-600 dark:text-gray-400 leading-snug font-mono">
                    <div class="text-gray-900 dark:text-gray-200 font-semibold">Universal State Engine</div>
                    <div>┌─ Tool Discovery (tools/list)</div>
                    <div>├─ Semantic Search (On-Demand)</div>
                    <div>├─ Entity Extraction Graph</div>
                    <div>└─ Cross-Tool Sync Engine</div>
                  </div>
                  <div class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    Executes queries against hierarchical entity graph; delivers scoped architectural context across every client.
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 1: The Model Context Protocol Specification Masterclass -->
            <h2 id="mcp-specification-masterclass">The Model Context Protocol Specification: Architecture &amp; Lifecycle</h2>
            <p>
              Announced by Anthropic in late 2024, the <strong>Model Context Protocol (MCP)</strong> establishes an open standard for connecting AI models to external data sources, developer tools, and operational environments. Rather than requiring developers to write brittle, bespoke integrations for each IDE, MCP operates identically to the <strong>Language Server Protocol (LSP)</strong>: write one MCP server, and it works natively across Cursor, Claude, VS Code, and Windsurf.
            </p>

            <h3 id="mcp-lifecycle-phases">Protocol Lifecycle: Handshake, Negotiation &amp; Teardown</h3>
            <p>
              Every MCP connection progresses through three formal phases defined in the JSON-RPC 2.0 specification:
            </p>
            <ol>
              <li><strong>Initialization &amp; Handshake:</strong> The client sends an <code>initialize</code> request indicating its protocol version and supported capabilities (e.g. roots, sampling, notifications). The server responds with its own capabilities (tools, resources, prompts) and server identification metadata.</li>
              <li><strong>Initialized Notification:</strong> Once the client validates the server's protocol response, it issues an <code>notifications/initialized</code> message. The session is now officially established.</li>
              <li><strong>Active Operation &amp; Tool Invocations:</strong> The client sends <code>tools/list</code> to discover available tools and parameter JSON schemas. When the LLM decides to execute an action, the client transmits <code>tools/call</code> with structured arguments and waits for the JSON-RPC response.</li>
            </ol>

            <pre><code class="language-json">{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "roots": { "listChanged": true },
      "sampling": {}
    },
    "clientInfo": {
      "name": "Cursor-Composer",
      "version": "0.45.0"
    }
  }
}</code></pre>

            <!-- Visual Diagram 2: Handshake Sequence Flow (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">MCP Session Lifecycle &amp; Tool Execution</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Handshake &rarr; Discovery &rarr; Query</span>
              </div>

              <div class="space-y-4 font-mono text-xs min-w-[580px]">
                <!-- Step 1: Handshake -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Protocol Handshake &amp; Capability Exchange</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">JSON-RPC 2.0</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Client sends <code>initialize</code> with supported features. Server verifies protocol compliance (2024-11-05) and returns tool capabilities. Client responds with <code>notifications/initialized</code>.
                    </p>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 2: Discovery -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Dynamic Schema Discovery (tools/list)</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Zero Hardcoding</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      Client requests available tools. Server exposes JSON Schemas for <code>search_memwyre</code>, <code>save_memory</code>, and management endpoints so the LLM knows exact argument types.
                    </p>
                  </div>
                </div>

                <!-- Arrow Down -->
                <div class="flex justify-center text-gray-400 dark:text-gray-600 -my-2 text-xs font-mono">&darr;</div>

                <!-- Step 3: Tool Execution -->
                <div class="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div class="w-7 h-7 rounded-md bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-gray-900 dark:text-white text-xs">Autonomous Execution (tools/call &rarr; Result)</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700">Rapid Delivery</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 font-sans text-xs">
                      The model issues a tool call. The server executes vector retrieval and entity graph re-ranking, returning synthesized context back into the agent's active prompt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deep Educational Section 2: Transports Deep Dive -->
            <h2 id="transport-modes">Transport Architecture: Stdio vs Remote HTTP/SSE</h2>
            <p>
              The Model Context Protocol decouples application logic from message transportation. Two primary transport protocols are defined in the specification:
            </p>

            <div class="overflow-x-auto my-6">
              <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
                <thead>
                  <tr class="bg-gray-50 dark:bg-zinc-900 text-xs uppercase font-mono font-bold text-gray-500">
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Dimension</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">Stdio Transport</th>
                    <th class="px-4 py-3 border-b border-gray-200 dark:border-gray-800">HTTP + SSE Transport</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-mono">
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">Process Model</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Spawns local sub-process (child process of IDE).</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Connects to remote persistent cloud MCP server via HTTPS.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">Communication Channel</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Standard input (<code>stdin</code>) &amp; standard output (<code>stdout</code>).</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">HTTP POST for requests; Server-Sent Events (SSE) for streams.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">Authentication</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">OS-level environment variables (<code>env</code> block).</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">HTTP headers (<code>Authorization: Bearer &lt;token&gt;</code>).</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757] border-b border-gray-100 dark:border-gray-800">Multi-Machine Sync</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Locked to host filesystem; requires manual disk sync.</td>
                    <td class="px-4 py-3 font-sans border-b border-gray-100 dark:border-gray-800">Instantaneous across all workstations, laptops, and CI/CD runners.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-bold text-[#D97757]">Best Used For</td>
                    <td class="px-4 py-3 font-sans">Air-gapped VPCs, local git inspection, and offline tooling.</td>
                    <td class="px-4 py-3 font-sans">Centralized engineering knowledge graphs, team memory vaults.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="mode-stdio">1. Local Stdio Transport Architecture</h3>
            <p>
              In Stdio mode, the client IDE launches the server executable directly. The client writes newline-delimited JSON-RPC messages to the process's <code>stdin</code> and reads responses from <code>stdout</code>. Any logging messages must strictly output to <code>stderr</code> to avoid corrupting protocol framing.
            </p>

            <h3 id="mode-remote">2. Remote HTTP with Server-Sent Events (SSE)</h3>
            <p>
              Remote transport decouples agent execution from server hosting. Using lightweight bridging utilities like <code>mcp-remote</code>, clients establish an outbound SSE connection to receive streaming notifications and send RPC commands over secure HTTP POST endpoints:
            </p>
            <pre><code class="language-bash">npx -y mcp-remote https://server.memwyre.tech/mcp --header "Authorization:Bearer YOUR_MEMWYRE_API_KEY"</code></pre>

            <!-- Deep Educational Section 3: Tool Schemas Masterclass -->
            <h2 id="tool-specification">Technical Tool Specification: JSON-RPC Schema Reference</h2>
            <p>
              The Memwyre MCP Server exposes five declarative tool primitives adhering strictly to the JSON Schema Draft 7 specification. Below are the exact parameter definitions and response payloads:
            </p>

            <h3 id="schema-search">search_memwyre (Semantic Context Discovery)</h3>
            <p>
              Queries the knowledge graph for relevant architectural facts, database schemas, and conventions. Returns top-k entities ranked by vector similarity and temporal decay:
            </p>
            <pre><code class="language-json">{
  "name": "search_memwyre",
  "description": "Searches the persistent memory vault for architectural decisions, schemas, and coding conventions.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Natural language question or technical concept to retrieve (e.g. 'auth token rotation', 'Drizzle schema conventions')."
      },
      "limit": {
        "type": "integer",
        "description": "Maximum number of memory items to return (default: 5, max: 20).",
        "default": 5
      }
    },
    "required": ["query"]
  }
}</code></pre>

            <h3 id="schema-save">save_memory (Dynamic Knowledge Persistence)</h3>
            <p>
              Persists an architectural constraint, convention, or debugging insight. Memwyre automatically extracts named entities and updates relational links:
            </p>
            <pre><code class="language-json">{
  "name": "save_memory",
  "description": "Persists an architectural rule, decision, or debugging breakthrough to long-term memory.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "content": {
        "type": "string",
        "description": "The synthesized rule or fact to record. Must be concise and self-contained."
      },
      "tags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Categorical tags for filtering (e.g. ['database', 'security', 'auth'])."
      }
    },
    "required": ["content"]
  }
}</code></pre>

            <!-- Deep Educational Section 4: Security & Enterprise Hardening -->
            <h2 id="mcp-security-hardening">MCP Security, Sandboxing &amp; Governance</h2>
            <p>
              Because MCP grants language models the ability to execute tools on behalf of users, security governance is paramount. Connecting an unverified or poorly configured MCP server introduces serious attack vectors:
            </p>
            <ul>
              <li><strong>Prompt Injection via Stored Memory:</strong> If an agent scrapes untrusted web content and stores it via <code>save_memory</code>, malicious prompt injections could alter subsequent agent behavior. Memwyre mitigates this by passing candidate memories through an extraction sandbox that strips active instructions and isolates factual assertions.</li>
              <li><strong>Zero Source Code Transmission:</strong> Memwyre never scans or uploads full repository trees. Only synthesized architectural rules explicitly queried or committed by the developer or agent cross the wire.</li>
              <li><strong>Scoped Access Tokens:</strong> When using remote HTTP/SSE transport, tokens can be restricted by IP range, read-only permissions, or repository project boundaries.</li>
            </ul>

            <!-- Visual Diagram 3: Context Economics Math (Light Monotone) -->
            <div class="my-8 p-6 rounded-xl bg-gray-50/80 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 shadow-sm overflow-x-auto">
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-zinc-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span>
                  <span class="text-xs font-mono uppercase font-bold text-gray-900 dark:text-white tracking-wider">MCP Protocol Token Efficiency</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase">Context Budget per Agent Session</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono min-w-[580px]">
                <!-- Unmanaged Strategy -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">Unmanaged Tool Stacks</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~35 Tools Loaded</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Loading dozens of heavy MCP schemas</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Schema Overhead: ~14,000 tokens/turn</div>
                    <div>Agent Confusion: High</div>
                    <div class="font-bold text-gray-900 dark:text-white">Degraded Reasoning</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Bloating system prompts with massive schema registries causes LLM tool selection errors.
                  </div>
                </div>

                <!-- Standard Local DB MCP -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="text-gray-500 dark:text-gray-400 text-[11px] uppercase font-bold">Local SQLite / Chroma MCP</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">~6,500 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Flat vector retrieval dumps</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Latency: 800ms – 2,200ms</div>
                    <div>Team Sync: None (Local Disk)</div>
                    <div class="font-bold text-gray-900 dark:text-white">High Noise Ratio</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Lacks temporal decay and cross-encoder re-ranking; injects stale debug notes into prompts.
                  </div>
                </div>

                <!-- Memwyre Scoped MCP -->
                <div class="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-900 dark:text-white text-[11px] uppercase font-bold">Memwyre MCP Server</span>
                      <span class="text-[10px] bg-gray-900 dark:bg-white text-white dark:text-black px-1.5 py-0.5 rounded font-semibold">Low Overhead</span>
                    </div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white mt-1">&lt;1,200 Tokens</div>
                    <div class="text-[10px] text-gray-500 dark:text-gray-400">Minimal 5-tool schema + Graph</div>
                  </div>
                  <div class="p-3 bg-gray-50 dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 text-[11px] space-y-2 text-gray-700 dark:text-gray-300">
                    <div>Schema Token Cost: &lt;650 tokens</div>
                    <div>Token Reduction: -81%</div>
                    <div class="font-bold text-gray-900 dark:text-white">Universal Cross-Tool Sync</div>
                  </div>
                  <div class="text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                    Lightweight schema footprint preserves context window capacity for actual developer code.
                  </div>
                </div>
              </div>
            </div>

            <!-- Client Configuration Snippets (15% Focused Memwyre Integration) -->
            <h2 id="client-configurations">Client Configuration Snippets</h2>
            <p>
              Because Memwyre conforms strictly to the Model Context Protocol, connecting your preferred AI coding environment requires just a simple JSON block:
            </p>
            
            <h3 id="config-claude-desktop">1. Claude Desktop Configuration (claude_desktop_config.json)</h3>
            <p>
              Open <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) or <code>%APPDATA%\Claude\claude_desktop_config.json</code> (Windows) and add:
            </p>
            <pre><code class="language-json">{
  "mcpServers": {
    "memwyre": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://server.memwyre.tech/mcp",
        "--header",
        "Authorization:Bearer YOUR_MEMWYRE_API_KEY"
      ]
    }
  }
}</code></pre>

            <h3 id="config-cursor">2. Cursor AI IDE MCP Setup</h3>
            <p>
              Navigate to <strong>Cursor Settings &rarr; Features &rarr; MCP &rarr; Add New MCP Server</strong>. Choose <strong>Type: command</strong> and input:
            </p>
            <pre><code class="language-bash">npx -y mcp-remote https://server.memwyre.tech/mcp --header "Authorization:Bearer YOUR_MEMWYRE_API_KEY"</code></pre>

            <h3 id="config-windsurf">3. Windsurf &amp; Roo-Code Integration</h3>
            <p>
              In Windsurf's <code>mcp_config.json</code> or Roo-Code's MCP settings panel, paste the exact same command configuration. Both agents will immediately gain the ability to search your architectural memory vault.
            </p>

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
              <h3 class="text-lg font-bold mb-2 hero-serif !mt-0">Connect Any MCP Client to Memwyre</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Deploy the universal Model Context Protocol memory server and equip Cursor, Claude, and VS Code with unified long-term context.
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
const pageTitle = 'MCP Memory Server | Universal Protocol Reference | Memwyre';
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
  { level: 2, text: 'MCP Specification Masterclass', slug: 'mcp-specification-masterclass' },
  { level: 3, text: 'Lifecycle & Handshake', slug: 'mcp-lifecycle-phases' },
  { level: 2, text: 'Transport Architecture', slug: 'transport-modes' },
  { level: 3, text: 'Local Stdio Mode', slug: 'mode-stdio' },
  { level: 3, text: 'Remote HTTP/SSE Mode', slug: 'mode-remote' },
  { level: 2, text: 'Tool Schema Reference', slug: 'tool-specification' },
  { level: 3, text: 'search_memwyre', slug: 'schema-search' },
  { level: 3, text: 'save_memory', slug: 'schema-save' },
  { level: 2, text: 'Security & Governance', slug: 'mcp-security-hardening' },
  { level: 2, text: 'Client Configurations', slug: 'client-configurations' },
  { level: 3, text: 'Claude Desktop', slug: 'config-claude-desktop' },
  { level: 3, text: 'Cursor AI', slug: 'config-cursor' },
  { level: 3, text: 'Windsurf & Roo-Code', slug: 'config-windsurf' },
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
    question: 'What is the Model Context Protocol (MCP)?',
    answer: 'MCP is an open standard created by Anthropic that allows AI models and IDE clients to securely discover and invoke tools, read context resources, and access external databases via standardized JSON-RPC protocols.'
  },
  {
    question: 'What is the difference between Stdio transport and HTTP/SSE transport in MCP?',
    answer: 'Stdio transport spawns a local child process communicating via stdin/stdout pipes, which is fast and secure for local offline tooling but locked to a single workstation. Remote HTTP/SSE transport communicates over persistent HTTPS streams, enabling multi-machine context synchronization across work laptops, desktops, and CI/CD agents.'
  },
  {
    question: 'How does Memwyre prevent prompt injection attacks through MCP memory tools?',
    answer: 'Memwyre routes candidate memories through an isolated extraction sandbox before writing them to the knowledge graph. This pipeline strips imperatival instructions, removes adversarial injection prompts, and only persists factual architectural assertions and schemas.'
  },
  {
    question: 'Which IDEs and tools support the Memwyre MCP Memory Server?',
    answer: 'Any client implementing MCP can connect to Memwyre, including Cursor AI IDE, Claude Desktop, Claude Code CLI, Windsurf, Roo-Code, Cline, and custom Python/TypeScript agent frameworks.'
  },
  {
    question: 'What is the difference between this page (/mcp-memory) and /mcp?',
    answer: 'This page provides the in-depth technical protocol specification, tool schemas, and transport reference for the MCP Memory Server. The <code>/mcp</code> page provides high-level step-by-step installation guides tailored for specific IDE clients.'
  },
  {
    question: 'How do agents authenticate with the MCP server?',
    answer: 'Authentication is performed using HTTP Bearer tokens passed in the transport header (<code>Authorization:Bearer YOUR_API_KEY</code>) or via local configuration environment variables.'
  },
  {
    question: 'Can I self-host the Memwyre MCP server on my own infrastructure?',
    answer: 'Yes. The Memwyre MCP server is open-source under Apache-2.0 and can be deployed via Docker inside your private VPC or on-prem Kubernetes cluster.'
  },
  {
    question: 'What is the latency of MCP tool calls in Memwyre?',
    answer: 'Semantic memory searches execute with low overhead, ensuring that agentic loops and multi-file composer generations are never blocked by context retrieval.'
  },
  {
    question: 'How does Memwyre compare to SQLite or ChromaDB local MCP memory servers?',
    answer: 'Local SQLite/Chroma servers cannot synchronize state across multiple developers or across separate machines without fragile SSH mounting. Memwyre provides a centralized cloud vault with multi-factor entity graphs and cross-encoder re-ranking.'
  },
  {
    question: 'Does Memwyre support MCP resource subscriptions?',
    answer: 'Yes. Clients can subscribe to memory change events, receiving real-time notifications when another team member or agent updates an architectural convention.'
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
