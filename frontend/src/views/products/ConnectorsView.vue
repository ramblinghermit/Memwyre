<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans relative overflow-x-hidden selection:bg-[#D97757] selection:text-white">

    <!-- 1. HERO SECTION WITH ARTISTIC WATERCOLOR BACKGROUND -->
    <div class="relative overflow-hidden">
      <!-- Artistic Watercolor Background -->
      <div class="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          :src="heroWatercolorBg"
          alt=""
          class="w-full h-full object-cover object-top opacity-85"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent 30% to-transparent"></div>
        <div class="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-white via-white/85 to-transparent"></div>
      </div>

      <!-- Container with proper headroom below navbar -->
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          <!-- Left: Copy & CTAs -->
          <div class="lg:col-span-7 space-y-6 text-left">
            <span class="text-xs font-mono font-bold tracking-wider uppercase text-neutral-500 block">01 / DATA CONNECTORS</span>
            
            <h1 class="hero-serif text-4xl sm:text-6xl lg:text-[70px] tracking-[-0.02em] leading-[1.08] text-[rgb(1,1,16)] max-w-3xl">
              Your data, always in sync.
            </h1>

            <p class="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl font-normal">
              Pull from Notion, GitHub, Slack, Google Drive, OneDrive, and S3. Configure once — your AI agent's context stays fresh automatically without manual copy-pasting.
            </p>
            
            <!-- Clean Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <router-link to="/signup"
                class="w-auto px-6 py-3 bg-[#050614] text-white font-bold rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-md text-xs sm:text-sm inline-flex items-center justify-center gap-2">
                Start Connecting &rarr;
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/connectors" target="_blank"
                class="w-auto px-6 py-3 bg-white text-gray-900 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm inline-flex items-center justify-center">
                Read Documentation
              </a>
            </div>
          </div>

          <!-- Right: Light Mode Compatible Live Sync Pipeline Visual -->
          <div class="lg:col-span-5 relative">
            <div class="bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.08)]">
              <!-- Header -->
              <div class="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                <div class="flex items-center gap-2">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97757] opacity-60"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#D97757]"></span>
                  </span>
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">Sync Engine Active</span>
                </div>
                <span class="text-[11px] font-mono text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded border border-neutral-200/70">Webhook 200 OK</span>
              </div>

              <!-- Live Streams List -->
              <div class="space-y-3">
                <!-- Google Drive -->
                <div class="p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/70 flex items-center justify-between hover:bg-white hover:border-neutral-300 hover:shadow-2xs transition-all">
                  <div class="flex items-center gap-3 min-w-0">
                    <img :src="driveLogo" alt="Drive" class="w-5 h-5 shrink-0 object-contain" />
                    <div class="truncate text-left">
                      <div class="text-xs font-semibold text-neutral-900 truncate">Architecture_Manual.pdf</div>
                      <div class="text-[10px] text-neutral-500 font-mono">Google Drive • Auto-sync every 24h</div>
                    </div>
                  </div>
                  <span class="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200/80 shrink-0">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Synced
                  </span>
                </div>

                <!-- Notion -->
                <div class="p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/70 flex items-center justify-between hover:bg-white hover:border-neutral-300 hover:shadow-2xs transition-all">
                  <div class="flex items-center gap-3 min-w-0">
                    <img :src="notionLogo" alt="Notion" class="w-5 h-5 shrink-0 object-contain" />
                    <div class="truncate text-left">
                      <div class="text-xs font-semibold text-neutral-900 truncate">Engineering Database</div>
                      <div class="text-[10px] text-neutral-500 font-mono">Notion • Clean Markdown array</div>
                    </div>
                  </div>
                  <span class="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200/80 shrink-0">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>Listening
                  </span>
                </div>

                <!-- GitHub -->
                <div class="p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/70 flex items-center justify-between hover:bg-white hover:border-neutral-300 hover:shadow-2xs transition-all">
                  <div class="flex items-center gap-3 min-w-0">
                    <svg class="w-5 h-5 shrink-0 text-neutral-900" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <div class="truncate text-left">
                      <div class="text-xs font-semibold text-neutral-900 truncate">PR #284 (Auth API Redesign)</div>
                      <div class="text-[10px] text-neutral-500 font-mono">GitHub Webhook • Commits &amp; Issues</div>
                    </div>
                  </div>
                  <span class="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200/80 shrink-0">
                    <span class="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>Parsed
                  </span>
                </div>

                <!-- Slack -->
                <div class="p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/70 flex items-center justify-between hover:bg-white hover:border-neutral-300 hover:shadow-2xs transition-all">
                  <div class="flex items-center gap-3 min-w-0">
                    <svg class="w-5 h-5 shrink-0 text-neutral-800" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.04 14.73a2.38 2.38 0 0 1-2.38-2.38c0-1.31 1.07-2.38 2.38-2.38h2.38v2.38c0 1.31-1.07 2.38-2.38 2.38zm3.57 0c1.31 0 2.38-1.07 2.38-2.38V5.04a2.38 2.38 0 0 0-2.38-2.38 2.38 2.38 0 0 0-2.38 2.38v7.31c0 1.31 1.07 2.38 2.38 2.38z"/>
                      <path d="M9.27 5.04a2.38 2.38 0 0 1 2.38-2.38c1.31 0 2.38 1.07 2.38 2.38v2.38h-2.38a2.38 2.38 0 0 1-2.38-2.38zm0 3.57c0 1.31 1.07 2.38 2.38 2.38h7.31a2.38 2.38 0 0 0 2.38-2.38 2.38 2.38 0 0 0-2.38-2.38H11.65c-1.31 0-2.38 1.07-2.38 2.38z"/>
                      <path d="M18.96 9.27c1.31 0 2.38 1.07 2.38 2.38 0 1.31-1.07 2.38-2.38 2.38h-2.38V11.65c0-1.31 1.07-2.38 2.38-2.38zm-3.57 0c-1.31 0-2.38 1.07-2.38 2.38v7.31a2.38 2.38 0 0 0 2.38 2.38 2.38 2.38 0 0 0 2.38-2.38v-7.31c0-1.31-1.07-2.38-2.38-2.38z"/>
                      <path d="M14.73 18.96a2.38 2.38 0 0 1-2.38 2.38 2.38 2.38 0 0 1-2.38-2.38v-2.38h2.38a2.38 2.38 0 0 1 2.38 2.38zm0-3.57a2.38 2.38 0 0 0-2.38-2.38H5.04a2.38 2.38 0 0 0-2.38 2.38 2.38 2.38 0 0 0 2.38-2.38h7.31c1.31 0 2.38-1.07 2.38-2.38z"/>
                    </svg>
                    <div class="truncate text-left">
                      <div class="text-xs font-semibold text-neutral-900 truncate">#engineering-public</div>
                      <div class="text-[10px] text-neutral-500 font-mono">Slack Bot • Filtered privacy tags</div>
                    </div>
                  </div>
                  <span class="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200/80 shrink-0">
                    <span class="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>Indexed
                  </span>
                </div>
              </div>

              <!-- Vault Output Status -->
              <div class="mt-4 pt-3.5 border-t border-neutral-200/80 flex items-center justify-between text-xs">
                <span class="text-neutral-500 font-mono text-[11px]">Destination: Unified Vault</span>
                <span class="text-neutral-900 font-mono font-semibold text-[11px]">LoCoMo Benchmark 94.6%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- MAIN BODY CONTAINER -->
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

      <!-- 2. THE PROBLEM / USE CASE -->
      <div class="py-12 sm:py-16">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">The Problem</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Your agent's knowledge is always stale.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div v-for="(problem, idx) in [
            { title: 'Manual File Parsing', body: 'Extracting clean text from multi-format PDFs, docx, and markdowns manually is tedious and fails to scale.' },
            { title: 'Scattered Knowledge', body: 'Documentation lives in Notion, discussions in Slack, and code changes in GitHub PRs — with no unified memory layer.' },
            { title: 'Stale Context Window', body: 'When requirements change or team docs are revised, AI assistants continue working off obsolete premises.' }
          ]" :key="idx" class="p-6 sm:p-7 border border-gray-200/90 rounded-2xl bg-white shadow-2xs hover:border-gray-300 transition-colors">
            <div class="text-xs tracking-wider font-mono font-bold text-gray-400 mb-3">0{{ idx + 1 }} . PROBLEM</div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ problem.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ problem.body }}</p>
          </div>
        </div>
      </div>

      <!-- 3. TECHNICAL DETAILS / HOW IT WORKS (LIGHT-MODE COMPATIBLE) -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Deep Dive</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Set once. Always fresh.
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          <div class="lg:col-span-5 space-y-8">
            <div v-for="(step, idx) in [
              { title: 'Ingest via API, Webhooks or Upload', body: 'Upload files, receive GitHub/Notion webhook payloads, or call our url-ingestion endpoint directly via httpx (HTTP/2 enabled).' },
              { title: 'Celery Background Queue', body: 'Workers process raw content, stripping HTML boilerplate, navigational elements, and scripts to prevent token bloat.' },
              { title: 'Realtime WebSocket Broadcasts', body: 'Once processed, the server broadcasts an update event to instantly refresh all active client MCP servers in under 300ms.' }
            ]" :key="idx" class="flex gap-4">
              <div class="w-8 h-8 rounded-full border border-gray-300 text-sm font-bold font-mono flex items-center justify-center shrink-0 text-gray-800 bg-white shadow-2xs">
                {{ idx + 1 }}
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1">{{ step.title }}</h4>
                <p class="text-sm text-gray-500 leading-relaxed">{{ step.body }}</p>
              </div>
            </div>
          </div>

          <!-- Light Mode Code Visual -->
          <div class="lg:col-span-7 border border-neutral-200/90 rounded-2xl overflow-hidden bg-neutral-50 p-6 shadow-2xs">
            <div class="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4 font-mono text-xs text-neutral-500">
              <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                <span class="ml-2 font-semibold text-neutral-800">POST /api/v1/ingest/url</span>
              </div>
              <span class="bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-600">application/json</span>
            </div>
            <pre class="text-xs sm:text-sm font-mono overflow-x-auto text-neutral-800 leading-relaxed bg-white p-4 rounded-xl border border-neutral-200/80"><code>{
  <span class="text-neutral-500">"url"</span>: <span class="text-[#D97757]">"https://docs.example.com/api-architecture"</span>,
  <span class="text-neutral-500">"tags"</span>: [
    <span class="text-neutral-700">"kubernetes"</span>,
    <span class="text-neutral-700">"deployment"</span>
  ],
  <span class="text-neutral-500">"auto_approve"</span>: <span class="text-neutral-900 font-semibold">true</span>
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 4. SUPPORTED CONNECTORS & INTEGRATIONS (MATCHING DOCUMENTATION) -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Workspace Integrations</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Connect everything your team uses.
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <!-- 1. Notion -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <img :src="notionLogo" class="w-6 h-6 shrink-0 object-contain" alt="Notion" />
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">Notion</div>
              <div class="text-xs text-gray-500">Pages, tables &amp; databases</div>
            </div>
          </div>

          <!-- 2. GitHub -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <svg class="w-6 h-6 shrink-0 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">GitHub</div>
              <div class="text-xs text-gray-500">PRs, Issues &amp; Webhooks</div>
            </div>
          </div>

          <!-- 3. Slack -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24">
              <path fill="#E01E5A" d="M5.04 14.73a2.38 2.38 0 0 1-2.38-2.38c0-1.31 1.07-2.38 2.38-2.38h2.38v2.38c0 1.31-1.07 2.38-2.38 2.38zm3.57 0c1.31 0 2.38-1.07 2.38-2.38V5.04a2.38 2.38 0 0 0-2.38-2.38 2.38 2.38 0 0 0-2.38 2.38v7.31c0 1.31 1.07 2.38 2.38 2.38z"/>
              <path fill="#36C5F0" d="M9.27 5.04a2.38 2.38 0 0 1 2.38-2.38c1.31 0 2.38 1.07 2.38 2.38v2.38h-2.38a2.38 2.38 0 0 1-2.38-2.38zm0 3.57c0 1.31 1.07 2.38 2.38 2.38h7.31a2.38 2.38 0 0 0 2.38-2.38 2.38 2.38 0 0 0-2.38-2.38H11.65c-1.31 0-2.38 1.07-2.38 2.38z"/>
              <path fill="#2EB67D" d="M18.96 9.27c1.31 0 2.38 1.07 2.38 2.38 0 1.31-1.07 2.38-2.38 2.38h-2.38V11.65c0-1.31 1.07-2.38 2.38-2.38zm-3.57 0c-1.31 0-2.38 1.07-2.38 2.38v7.31a2.38 2.38 0 0 0 2.38 2.38 2.38 2.38 0 0 0 2.38-2.38v-7.31c0-1.31-1.07-2.38-2.38-2.38z"/>
              <path fill="#ECB22E" d="M14.73 18.96a2.38 2.38 0 0 1-2.38 2.38 2.38 2.38 0 0 1-2.38-2.38v-2.38h2.38a2.38 2.38 0 0 1 2.38 2.38zm0-3.57a2.38 2.38 0 0 0-2.38-2.38H5.04a2.38 2.38 0 0 0-2.38 2.38 2.38 2.38 0 0 0 2.38-2.38h7.31c1.31 0 2.38-1.07 2.38-2.38z"/>
            </svg>
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">Slack</div>
              <div class="text-xs text-gray-500">Public channel knowledge</div>
            </div>
          </div>

          <!-- 4. Google Drive -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <img :src="driveLogo" class="w-6 h-6 shrink-0 object-contain" alt="Google Drive" />
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">Google Drive</div>
              <div class="text-xs text-gray-500">PDF, DOCX, TXT &amp; GDocs</div>
            </div>
          </div>

          <!-- 5. OneDrive -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <svg class="w-6 h-6 shrink-0 text-[#0078D4]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
            </svg>
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">OneDrive</div>
              <div class="text-xs text-gray-500">MS Graph sync for office docs</div>
            </div>
          </div>

          <!-- 6. S3 / R2 Buckets -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <svg class="w-6 h-6 shrink-0 text-[#E05243]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2z"/>
              <path d="M2 6.5v5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-5"/>
              <path d="M2 11.5v5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-5"/>
            </svg>
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">S3 &amp; R2 Buckets</div>
              <div class="text-xs text-gray-500">Real-time SQS event sync</div>
            </div>
          </div>

          <!-- 7. Web Scraper -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <svg class="w-6 h-6 shrink-0 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">Web Scraper</div>
              <div class="text-xs text-gray-500">HTML &amp; clean Markdown ingest</div>
            </div>
          </div>

          <!-- 8. REST Ingestion API -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <svg class="w-6 h-6 shrink-0 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">REST API</div>
              <div class="text-xs text-gray-500">Custom pipeline endpoints</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4b. DETAILED TECHNICAL SPECIFICATIONS -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Technical Architecture</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Technical specifications of our sync engine.
          </h2>
        </div>

        <div class="space-y-6 text-sm text-gray-600 leading-relaxed text-left max-w-4xl">
          <p>
            Memwyre’s data connectors integrate directly into your team's existing workflow. The sync engine monitors third-party APIs (including Notion, Google Drive, Slack, GitHub, and AWS S3) and ingests new updates into your memory vault. For databases like Notion, the connector polls authorized pages and transforms blocks into structured Markdown arrays.
          </p>
          <p>
            When processing file attachments from Google Drive or local uploads (PDF, Docx, or raw text), the system extracts raw text and passes it to our parsing queue. This Celery-backed ingestion pipeline strips navigation elements, scripts, and null bytes, preventing database errors and eliminating useless token bloat before indexing.
          </p>
          <p>
            For engineering teams, the GitHub connector maps commits, pull request changes, and issues into relational entities using lightweight webhooks. In team chats like Slack, the bot is invited via <code>/invite @Memwyre</code> and strictly respects privacy by ignoring direct messages and any message marked with sensitive tags such as <code>[private]</code> or <code>[secret]</code>.
          </p>
          <p>
            To ensure secure connectivity, all third-party integrations utilize OAuth 2.0 authorization flows. The tokens are encrypted at rest using AES-256-GCM and stored within an isolated vault environment. The connector orchestrator supports customizable sync schedules (ranging from real-time webhook updates to hourly or daily cron cycles) guaranteeing that background workers stay well within platform rate limits.
          </p>
        </div>
      </div>

    </div>

    <!-- 5. SIGNATURE CRAFT PAPER DARK CTA (Exact Match to Landing Page) -->
    <div class="pt-16 sm:pt-20 pb-0 text-center relative overflow-hidden craft-paper-black z-30 mt-12 sm:mt-16">
      <!-- Craft Paper Noise & Fiber Texture -->
      <div class="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"></div>
        <div class="absolute inset-0 opacity-30 mix-blend-screen"
             style="background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 3px 3px;"></div>
        <svg class="absolute inset-0 w-full h-full opacity-[0.065] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          <filter id="craft-paper-grain-connectors">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#craft-paper-grain-connectors)" fill="white" />
        </svg>
      </div>

      <!-- Numeric background animation -->
      <NumericBgAnimation :invert="false" class="absolute inset-0 z-0 opacity-[0.13] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        <div class="max-w-3xl text-left">
          <h2 class="hero-serif text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.02em] leading-[1.05] text-white">
            Context infrastructure <br class="hidden sm:inline" />
            <span class="block text-zinc-200">for AI agents.</span>
          </h2>
          <p class="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
            Stop importing. Start connecting. Set up your first data stream in minutes.
          </p>

          <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <router-link 
              to="/signup"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-white text-[#0c0d10] font-bold rounded-full hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 shadow-md text-sm sm:text-base inline-flex items-center justify-center"
            >
              Connect Your Vault &rarr;
            </router-link>
            <a 
              href="https://docs.memwyre.tech/integrations/connectors" 
              target="_blank"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-sm sm:text-base inline-flex items-center justify-center"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>

      <SiteFooter craft-paper class="!bg-transparent !mt-8 sm:!mt-10" />
    </div>

  </div>
</template>

<script setup>
import heroWatercolorBg from '@/assets/hero-watercolor-bg.jpg';
import notionLogo from '@/assets/notion-svgrepo-com.svg';
import driveLogo from '@/assets/google-drive.svg';
import NumericBgAnimation from '@/components/landing/NumericBgAnimation.vue';
import SiteFooter from '@/components/SiteFooter.vue';
</script>

<style scoped>
.hero-serif {
  font-family: 'Aleo', 'DM Serif Text', serif;
  letter-spacing: -0.02em;
  font-variant-numeric: lining-nums;
  font-feature-settings: "lnum" 1;
}
</style>
