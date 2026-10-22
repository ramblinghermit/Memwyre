<template>
  <div class="force-light relative min-h-screen bg-white text-gray-900 font-sans selection:bg-[#D97757] selection:text-white [overflow-x:clip]">
    <!-- Blueprint Grid Effect -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.035]">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    <!-- Background Artwork / Top Ambient -->
    <div class="absolute inset-x-0 top-0 h-[480px] pointer-events-none z-0 overflow-hidden select-none">
      <img
        :src="heroWatercolorBg"
        alt=""
        class="w-full h-full object-cover object-top opacity-70"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white"></div>
    </div>

    <!-- Global Vertical Grid Guide Lines -->
    <div class="hidden lg:block absolute top-0 bottom-0 left-6 sm:left-8 lg:left-[calc(50%-640px)] w-px bg-gray-300/60 pointer-events-none select-none z-30"></div>
    <div class="hidden lg:block absolute top-0 bottom-0 right-6 sm:right-8 lg:right-[calc(50%-640px)] w-px bg-gray-300/60 pointer-events-none select-none z-30"></div>

    <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10 pt-28 sm:pt-32 lg:pt-36 pb-20">
      <!-- Breadcrumb & Header -->
      <div class="max-w-4xl mb-16 text-left">
        <div class="text-xs tracking-wider uppercase font-bold font-mono text-gray-500 mb-4 px-1 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#D97757]"></span>
          <span>/ ABOUT US &amp; FOUNDING TEAM</span>
        </div>
        <h1 class="hero-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] tracking-[-0.02em] leading-[1.08] text-[rgb(1,1,16)] mb-6">
          Building the persistent memory substrate for AI.
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed">
          Memwyre is the unified persistent memory layer for modern AI agents, IDEs, and developer workflows. Founded in 2026, we are solving agent context amnesia and fragmentation across the global software development lifecycle.
        </p>
      </div>

      <!-- Quick Numbers / At a Glance -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20 text-left">
        <div class="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs">
          <div class="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 font-semibold">Founding Year</div>
          <div class="text-3xl sm:text-4xl font-extrabold text-gray-900">2026</div>
          <div class="text-xs text-gray-500 mt-1">Autonomous Agent Era</div>
        </div>
        <div class="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs">
          <div class="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 font-semibold">LoCoMo Benchmark</div>
          <div class="text-3xl sm:text-4xl font-extrabold text-[#D97757]">73.5%</div>
          <div class="text-xs text-gray-500 mt-1">vs 43.7% Flat Vector RAG</div>
        </div>
        <div class="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs">
          <div class="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 font-semibold">Token Savings</div>
          <div class="text-3xl sm:text-4xl font-extrabold text-gray-900">~88%</div>
          <div class="text-xs text-gray-500 mt-1">~3k vs ~26k Tokens / Prompt</div>
        </div>
        <div class="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs">
          <div class="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 font-semibold">Core Protocol</div>
          <div class="text-3xl sm:text-4xl font-extrabold text-gray-900">MCP</div>
          <div class="text-xs text-gray-500 mt-1">Model Context Protocol Native</div>
        </div>
      </div>

      <!-- SECTION 1: FOUNDING TEAM & LEADERSHIP -->
      <section id="leadership" class="mb-24 text-left">
        <div class="mb-8">
          <div class="text-xs font-mono text-[#D97757] uppercase tracking-wider font-bold mb-2">Executive Leadership</div>
          <h2 class="hero-serif text-3xl sm:text-4xl font-bold text-[rgb(1,1,16)]">
            Founding Team &amp; Leadership
          </h2>
          <p class="text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
            Meet the leadership driving Memwyre's architecture, product engineering, and long-term vision.
          </p>
        </div>

        <!-- Founder Profile Card -->
        <div class="border border-gray-200 rounded-3xl bg-white p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <!-- Left: Avatar, Role, Socials -->
            <div class="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div class="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md mb-6 bg-gray-100">
                <img
                  src="https://avatars.githubusercontent.com/u/170114968?v=4"
                  alt="Himansh Shivhare - Founder & CEO of Memwyre"
                  class="w-full h-full object-cover"
                  @error="$event.target.src = 'https://ui-avatars.com/api/?name=Himansh+Shivhare&background=111827&color=ffffff&size=256'"
                />
              </div>

              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900">Himansh Shivhare</h3>
              <div class="text-[#D97757] font-semibold text-sm sm:text-base mt-1 mb-2">Founder &amp; CEO, Chief Architect</div>
              
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium mb-6">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Bengaluru, India (Remote-first)
              </div>

              <!-- Direct Verified Links -->
              <div class="flex items-center gap-3 w-full justify-center lg:justify-start">
                <!-- LinkedIn -->
                <a
                  href="https://linkedin.com/in/himansh-shivhare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Himansh Shivhare LinkedIn"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  title="LinkedIn Profile"
                >
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                <!-- GitHub -->
                <a
                  href="https://github.com/ramblinghermit0403"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Himansh Shivhare GitHub"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  title="GitHub Profile"
                >
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                <!-- X / Twitter -->
                <a
                  href="https://x.com/Memwyre"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Memwyre on X"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  title="X (Twitter) Profile"
                >
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <!-- Direct Mail -->
                <a
                  href="mailto:himansh@memwyre.tech"
                  aria-label="Email Himansh Shivhare"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-[#D97757] hover:border-[#D97757]/40 hover:bg-[#D97757]/5 transition-colors"
                  title="Direct Founder Email"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>

              <!-- Direct email badge -->
              <div class="mt-4 text-xs font-mono text-gray-500">
                <a href="mailto:himansh@memwyre.tech" class="hover:text-[#D97757] transition-colors underline">himansh@memwyre.tech</a>
              </div>
            </div>

            <!-- Right: Founder Story & Architectural Leadership -->
            <div class="lg:col-span-8 space-y-5 text-gray-700 leading-relaxed text-sm sm:text-base">
              <div class="inline-block px-3 py-1 bg-[#D97757]/10 text-[#D97757] text-xs font-mono font-bold uppercase tracking-wider rounded-md">
                Background &amp; Architectural Focus
              </div>
              <p>
                <strong>Himansh Shivhare</strong> is the Founder and Chief Architect of Memwyre. With an extensive background in distributed backend systems, vector retrieval pipelines, and developer infrastructure, Himansh created Memwyre to bridge the gap between static vector databases and the living, dynamic context required by modern autonomous AI agents.
              </p>
              <p>
                Frustrated by the persistent "amnesia" of AI coding tools—where developers spend a substantial portion of their working hours repeatedly explaining project architecture, conventions, and previous debugging iterations to Cursor, Claude Code, and ChatGPT—Himansh conceived and engineered Memwyre's core architecture:
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
                  <div class="text-xs font-mono font-bold text-gray-900 mb-1">Decoupled Persistent Memory</div>
                  <div class="text-xs text-gray-600">Model-agnostic memory protocol enabling uniform recall across OpenAI, Claude, Gemini, and local LLMs.</div>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
                  <div class="text-xs font-mono font-bold text-gray-900 mb-1">Ebbinghaus Recency Decay</div>
                  <div class="text-xs text-gray-600">Logarithmic pruning engine that chronologically deprecates obsolete code patterns and superseded decisions.</div>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
                  <div class="text-xs font-mono font-bold text-gray-900 mb-1">SPO Fact Extraction</div>
                  <div class="text-xs text-gray-600">Atomic Subject-Predicate-Object knowledge graph extraction via asynchronous background Celery workers.</div>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
                  <div class="text-xs font-mono font-bold text-gray-900 mb-1">Universal MCP Connectivity</div>
                  <div class="text-xs text-gray-600">Native Model Context Protocol server delivering zero-friction context directly to Cursor, Windsurf, and Claude.</div>
                </div>
              </div>

              <p>
                Himansh leads all product development, systems engineering, research evaluations (such as the LoCoMo benchmark suite), and open-source roadmap execution. Under his direction, Memwyre maintains strict standards for data privacy, open protocols, and token efficiency.
              </p>

              <div class="pt-4 border-t border-gray-200/80 flex flex-wrap gap-2">
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Distributed Systems</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Context Engineering</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Model Context Protocol</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Vector Indexing &amp; RAG</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Python &amp; FastAPI</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Autonomous Agent Tooling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: OPEN-SOURCE COMMUNITY & CONTRIBUTORS -->
      <section id="community" class="mb-24 text-left">
        <div class="mb-8">
          <div class="text-xs font-mono text-[#D97757] uppercase tracking-wider font-bold mb-2">Extended Team &amp; Ecosystem</div>
          <h2 class="hero-serif text-3xl sm:text-4xl font-bold text-[rgb(1,1,16)]">
            Engineering Contributors &amp; Research Group
          </h2>
          <p class="text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
            Memwyre is built developer-first with open governance. In addition to core leadership, our ecosystem is supported by open-source contributors and academic benchmark maintainers.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Col 1: Open Source Core -->
          <div class="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm mb-4">
                OSS
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Open-Source Contributors</h3>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Community developers contributing CLI tooling, documentation updates, IDE connector extensions, and bug fixes to the Apache 2.0 public repository.
              </p>
            </div>
            <a
              href="https://github.com/ramblinghermit0403/Memwyre"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97757] hover:underline"
            >
              <span>Explore GitHub Repository</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <!-- Col 2: Benchmark & Research Group -->
          <div class="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-[#D97757] text-white flex items-center justify-center font-bold text-sm mb-4">
                LAB
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Memwyre Research Lab</h3>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Conducting reproducible empirical benchmarks across multi-hop reasoning, temporal alignment, and multi-session retention using datasets like LoCoMo and MemoryBench.
              </p>
            </div>
            <router-link
              to="/ai-memory-benchmark-locomo"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97757] hover:underline"
            >
              <span>Read LoCoMo Report (73.5%)</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>

          <!-- Col 3: Developer Advisory & Integrations -->
          <div class="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-sm mb-4">
                MCP
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">MCP &amp; Agent Working Group</h3>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Advising on Model Context Protocol conformance, CLI hook standards, and seamless context synchronization across Cursor, Windsurf, Claude Code, and autonomous terminal agents.
              </p>
            </div>
            <router-link
              to="/mcp"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97757] hover:underline"
            >
              <span>View MCP Architecture</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>
        </div>
      </section>

      <!-- SECTION 3: COMPANY VERIFICATION & AT A GLANCE TABLE -->
      <section id="company-facts" class="mb-24 text-left">
        <div class="mb-8">
          <div class="text-xs font-mono text-[#D97757] uppercase tracking-wider font-bold mb-2">Corporate Information</div>
          <h2 class="hero-serif text-3xl sm:text-4xl font-bold text-[rgb(1,1,16)]">
            Company Facts &amp; Verification Details
          </h2>
          <p class="text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
            Auditable corporate profile, official contacts, and governance for partner programs, accelerators, and enterprise auditors.
          </p>
        </div>

        <div class="border border-gray-200 rounded-3xl bg-white overflow-hidden shadow-xs">
          <table class="w-full text-left text-sm">
            <tbody class="divide-y divide-gray-200">
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70 sm:w-1/3">Company Name</td>
                <td class="py-4 px-6 font-semibold text-gray-900">Memwyre</td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Founding Team &amp; Leadership</td>
                <td class="py-4 px-6 text-gray-900 font-medium">
                  <strong>Himansh Shivhare</strong> — Founder &amp; CEO, Chief Architect
                  <div class="text-xs text-gray-500 mt-1 font-mono">
                    <a href="https://linkedin.com/in/himansh-shivhare" target="_blank" class="text-[#D97757] hover:underline">LinkedIn</a> &bull;
                    <a href="https://github.com/ramblinghermit0403" target="_blank" class="text-[#D97757] hover:underline ml-1">GitHub</a> &bull;
                    <a href="mailto:himansh@memwyre.tech" class="text-[#D97757] hover:underline ml-1">himansh@memwyre.tech</a>
                  </div>
                </td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Official Website</td>
                <td class="py-4 px-6 text-gray-900 font-mono text-xs">
                  <a href="https://memwyre.tech" class="text-[#D97757] hover:underline font-bold">https://memwyre.tech</a>
                </td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Company Email</td>
                <td class="py-4 px-6 text-gray-900 font-mono text-xs">
                  <a href="mailto:himansh@memwyre.tech" class="hover:underline">himansh@memwyre.tech</a> / 
                  <a href="mailto:shivharehimansh@gmail.com" class="hover:underline ml-1 text-gray-500">shivharehimansh@gmail.com</a>
                </td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Headquarters / Location</td>
                <td class="py-4 px-6 text-gray-900">
                  Bengaluru, Karnataka, India &bull; Operating globally with distributed remote contributors
                </td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Startup Status</td>
                <td class="py-4 px-6 text-gray-900">
                  Independent Early-Stage Software Startup &bull; Google for Startups Cloud Program Participant
                </td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Core Software License</td>
                <td class="py-4 px-6 text-gray-900 font-medium">
                  Open Source (Apache 2.0 License) with Managed Cloud Services
                </td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Public Source Code</td>
                <td class="py-4 px-6 text-gray-900 font-mono text-xs">
                  <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" class="text-[#D97757] hover:underline">
                    github.com/ramblinghermit0403/Memwyre
                  </a>
                </td>
              </tr>
              <tr class="flex flex-col sm:table-row">
                <td class="py-4 px-6 font-mono text-xs uppercase font-bold text-gray-500 bg-gray-50/70">Primary Stack</td>
                <td class="py-4 px-6 text-gray-900">
                  Python 3.12 (FastAPI), Celery distributed task workers, Redis broker, PostgreSQL, ChromaDB / Pinecone vector indexes, Vue 3 + Vite, MCP SDK
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 4: MISSION & ARCHITECTURAL PRINCIPLES -->
      <section id="principles" class="mb-24 text-left">
        <div class="mb-8">
          <div class="text-xs font-mono text-[#D97757] uppercase tracking-wider font-bold mb-2">Our Manifesto</div>
          <h2 class="hero-serif text-3xl sm:text-4xl font-bold text-[rgb(1,1,16)]">
            Why We Are Building Memwyre
          </h2>
          <p class="text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
            The foundation of autonomous programming is persistent context. Here are the core pillars guiding our development.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-8 rounded-3xl bg-gray-50/60 border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">01. Model Agnostic Freedom</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Never Lock Memory to a Single Vendor</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              When OpenAI, Anthropic, or Google releases a next-generation model, you should be able to switch instantly without losing months of accumulated project memory, user preferences, and debugging history. Memwyre lives outside the model, serving all of them equally.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-gray-50/60 border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">02. Human-in-the-Loop Integrity</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Zero Memory Hallucination in Permanent Storage</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Automated memory capture is prone to recording temporary sarcasm, testing mocks, and hallucinations as permanent facts. Memwyre's approval inbox gives developers complete visibility to review, edit, or reject memories before they enter production indexes.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-gray-50/60 border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">03. Temporal Context Decay</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Context That Evolves Like Human Recall</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Codebases and preferences change over time. Using an Ebbinghaus logarithmic decay formula, Memwyre automatically down-ranks outdated conventions while preserving core architectural constraints, preventing bloated prompts and conflicting guidance.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-gray-50/60 border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">04. Data Sovereignty &amp; Privacy</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Enterprise Security by Default</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Memwyre guarantees zero data retention for AI model training. All customer memories and embeddings are encrypted at rest with AES-256 and in transit with TLS 1.3. For teams requiring strict air-gapped isolation, full Docker self-hosting is supported.
            </p>
          </div>
        </div>
      </section>

      <!-- SECTION 5: CALL TO ACTION -->
      <section class="rounded-3xl bg-black text-white p-8 sm:p-14 text-center sm:text-left relative overflow-hidden">
        <div class="relative z-10 max-w-3xl">
          <div class="text-xs font-mono text-[#D97757] uppercase tracking-wider font-bold mb-3">Join Our Journey</div>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to give your AI tools persistent memory?
          </h2>
          <p class="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
            Start free today, connect your IDE via our open MCP server, or connect directly with our founder to discuss enterprise support and partnerships.
          </p>

          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <router-link
              to="/signup"
              class="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors shadow-sm"
            >
              Get Started Free
            </router-link>
            <router-link
              to="/contact"
              class="px-6 py-3 rounded-xl bg-neutral-800 text-white font-medium text-sm hover:bg-neutral-700 transition-colors border border-neutral-700"
            >
              Contact Founder &amp; Team
            </router-link>
            <a
              href="https://github.com/ramblinghermit0403/Memwyre"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 rounded-xl text-gray-300 hover:text-white font-medium text-sm transition-colors inline-flex items-center gap-2"
            >
              <span>View GitHub</span>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>

    <!-- Site Footer -->
    <SiteFooter class="!mt-0" />
  </div>
</template>

<script setup>
import heroWatercolorBg from '@/assets/hero-watercolor-bg.jpg';
import SiteFooter from '@/components/SiteFooter.vue';
</script>
