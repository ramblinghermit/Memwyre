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
            <span class="text-xs font-mono font-bold tracking-wider uppercase text-neutral-500 block">02 / MODEL CONTEXT PROTOCOL</span>
            
            <h1 class="hero-serif text-4xl sm:text-6xl lg:text-[70px] tracking-[-0.02em] leading-[1.08] text-[rgb(1,1,16)] max-w-3xl">
              One memory. Every AI tool.
            </h1>

            <p class="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl font-normal">
              Connect Memwyre to Cursor, Claude Desktop, VS Code, and Windsurf via the open Model Context Protocol. Centralized memories follow you across every assistant.
            </p>
            
            <!-- Clean Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <router-link to="/signup"
                class="w-auto px-6 py-3 bg-[#050614] text-white font-bold rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-md text-xs sm:text-sm inline-flex items-center justify-center gap-2">
                Get MCP Keys &rarr;
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/mcp-server" target="_blank"
                class="w-auto px-6 py-3 bg-white text-gray-900 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm inline-flex items-center justify-center">
                Read Configuration
              </a>
            </div>
          </div>

          <!-- Right: Light Mode Compatible Terminal Visual -->
          <div class="lg:col-span-5 relative">
            <div class="border border-neutral-200/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-[0_12px_36px_-12px_rgba(0,0,0,0.08)] text-neutral-800">
              <!-- Window Bar -->
              <div class="flex items-center justify-between border-b border-neutral-150 pb-3 mb-4">
                <div class="flex items-center gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                </div>
                <span class="font-mono text-xs text-neutral-500 font-medium">Terminal — npx install-memwyre</span>
                <span class="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200/80">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>MCP v1.1
                </span>
              </div>
              
              <!-- Terminal Output (Light Theme) -->
              <div class="font-mono text-xs sm:text-[13px] space-y-2.5 text-left leading-relaxed">
                <div class="text-neutral-500 font-medium"><span class="text-neutral-400 font-bold select-none">$ </span>npx -y install-memwyre</div>
                <div class="text-neutral-900 font-semibold">Memwyre MCP Protocol Handshake:</div>
                <div class="text-neutral-700 flex items-center gap-2 font-medium">
                  <span class="text-emerald-600 font-bold">✔</span>
                  <span>Authenticated: <span class="text-neutral-500">https://server.memwyre.tech/mcp</span></span>
                </div>
                <div class="text-neutral-700 flex items-center gap-2 font-medium">
                  <span class="text-emerald-600 font-bold">✔</span>
                  <span>Tools: <span class="text-neutral-900 font-medium">search_memwyre, save_memory, approve_memory</span></span>
                </div>
                <div class="text-neutral-700 flex items-center gap-2 font-medium">
                  <span class="text-emerald-600 font-bold">✔</span>
                  <span>Configured: <span class="text-neutral-500">~/.cursor/mcp.json &amp; claude_desktop_config</span></span>
                </div>
                <div class="text-neutral-400 pt-1.5 border-t border-neutral-100 text-[11px] sm:text-xs">// Ready: cross-tool memory layer active over stdio</div>
                <div class="text-neutral-900 pt-0.5 font-medium flex items-start gap-1.5">
                  <span class="text-[#D97757] font-bold select-none">&gt;</span>
                  <span>Cursor: <span class="text-neutral-600 font-normal">"Recalled 4 architectural memories for active session."</span></span>
                </div>
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
            Every AI conversation starts from zero.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div v-for="(problem, idx) in [
            { title: 'Context Amnesia', body: 'AI clients do not share context. Moving from VS Code to Claude Desktop forces you to re-explain your stack from scratch.' },
            { title: 'Repeated Setup Prompts', body: 'Developers waste the first 5 prompts of every session repeating setup preferences, workspace rules, and guidelines.' },
            { title: 'Siloed Tooling', body: 'Valuable insights discovered in Cursor remain trapped in local editor logs and cannot be leveraged elsewhere.' }
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
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Protocol Specs</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            The universal protocol for AI context.
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          <div class="lg:col-span-5 space-y-8">
            <div v-for="(step, idx) in [
              { title: 'Remote HTTP Tunneling (Recommended)', body: 'Utilizes mcp-remote to connect your IDE or agent directly to our secure cloud endpoint over JSON-RPC 2.0.' },
              { title: 'Standardized Tool Suite', body: 'Exposes search_memwyre, save_memory, approve_memory, discard_memory, and generate_prompt directly to your LLM.' },
              { title: 'Dynamic Multi-Session Recall', body: 'When your agent queries context, Memwyre performs semantic hybrid search across your vault with under 300ms latency.' }
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
                <span class="ml-2 font-semibold text-neutral-800">~/.cursor/mcp.json</span>
              </div>
              <span class="bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-600">JSON-RPC 2.0</span>
            </div>
            <pre class="text-xs sm:text-sm font-mono overflow-x-auto text-neutral-800 leading-relaxed bg-white p-4 rounded-xl border border-neutral-200/80"><code>{
  <span class="text-neutral-500">"mcpServers"</span>: {
    <span class="text-neutral-500">"memwyre"</span>: {
      <span class="text-neutral-500">"command"</span>: <span class="text-[#D97757]">"npx"</span>,
      <span class="text-neutral-500">"args"</span>: [
        <span class="text-neutral-700">"-y"</span>,
        <span class="text-neutral-700">"mcp-remote"</span>,
        <span class="text-neutral-700">"https://server.memwyre.tech/mcp"</span>,
        <span class="text-neutral-700">"--header"</span>,
        <span class="text-neutral-700">"Authorization:Bearer bv_sk_your_key_here"</span>
      ]
    }
  }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 4. ECOSYSTEM / COMPATIBILITY (MATCHING DOCUMENTATION) -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Supported MCP Clients</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            One command. Infinite context.
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          <!-- 1. Cursor -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <img :src="cursorLogo" class="w-6 h-6 shrink-0 object-contain" alt="Cursor" />
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">Cursor</div>
              <div class="text-xs text-gray-500">~/.cursor/mcp.json</div>
            </div>
          </div>

          <!-- 2. Claude Desktop -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <img :src="claudeLogo" class="w-6 h-6 shrink-0 object-contain" alt="Claude Desktop" />
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">Claude Desktop</div>
              <div class="text-xs text-gray-500">claude_desktop_config</div>
            </div>
          </div>

          <!-- 3. Windsurf -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <img :src="windsurfLogo" class="w-6 h-6 shrink-0 object-contain" alt="Windsurf" />
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">Windsurf</div>
              <div class="text-xs text-gray-500">Cascade MCP provider</div>
            </div>
          </div>

          <!-- 4. VS Code -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <img :src="vscodeLogo" class="w-6 h-6 shrink-0 object-contain" alt="VS Code" />
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">VS Code</div>
              <div class="text-xs text-gray-500">Extension MCP registry</div>
            </div>
          </div>

          <!-- 5. Interactive CLI Installer -->
          <div class="p-5 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-xs transition-all flex items-center gap-3.5">
            <svg class="w-6 h-6 shrink-0 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="4 17 10 11 4 5"/>
              <line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
            <div>
              <div class="font-bold text-gray-900 text-sm mb-0.5">CLI Installer</div>
              <div class="text-xs text-gray-500">npx install-memwyre</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4b. DETAILED TECHNICAL SPECIFICATIONS -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Technical Specifications</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Technical specifications of our MCP server.
          </h2>
        </div>

        <div class="space-y-6 text-sm text-gray-600 leading-relaxed text-left max-w-4xl">
          <p>
            The Model Context Protocol (MCP) server acts as a standard proxy between client IDEs (such as Cursor, VS Code, and Claude Desktop) and your secure Memwyre Cloud vault. Communication is established over standard I/O (stdio) exchanging JSON-RPC 2.0 messages. This ensures that your API tokens remain securely isolated to your local environment.
          </p>
          <p>
            The server exposes core context management tools to connected LLM agents: <code>search_memwyre</code> for hybrid vector and keyword recall, <code>save_memory</code> to capture insights into the Inbox, <code>approve_memory</code> and <code>discard_memory</code> for curation, and <code>generate_prompt</code> to format retrieved memories into structured prompt templates.
          </p>
          <p>
            Memwyre provides two connection modes: Remote HTTP Tunneling using the lightweight <code>mcp-remote</code> utility (connecting directly to <code>https://server.memwyre.tech/mcp</code> with TLS 1.3), or full local Python execution running <code>mcp_server.py</code> on Python 3.10+ with local SQLite vector indexing. Both methods ensure seamless cross-client memory portability.
          </p>
          <p>
            To optimize developer latency, our auto-installer (<code>npx -y install-memwyre</code>) automates OAuth loopback authentication and writes configurations directly to your global client configs. Real-time updates from other devices trigger instant cache invalidations, guaranteeing your agents operate on fresh context.
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
          <filter id="craft-paper-grain-mcp">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#craft-paper-grain-mcp)" fill="white" />
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
            Connect your team's stack to a shared memory. Stop repeating settings and setup parameters.
          </p>

          <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <router-link 
              to="/signup"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-white text-[#0c0d10] font-bold rounded-full hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 shadow-md text-sm sm:text-base inline-flex items-center justify-center"
            >
              Connect Your AI Tools &rarr;
            </router-link>
            <a 
              href="https://docs.memwyre.tech/integrations/mcp-server" 
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
import cursorLogo from '@/assets/cursor_CUBE_2D_LIGHT.svg';
import claudeLogo from '@/assets/claude-color.svg';
import vscodeLogo from '@/assets/vscode.svg';
import windsurfLogo from '@/assets/windsurf-color.svg';
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
