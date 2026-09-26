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
            <span class="text-xs font-mono font-bold tracking-wider uppercase text-neutral-500 block">03 / DEVELOPER &amp; CLI PLUGINS</span>
            
            <h1 class="hero-serif text-4xl sm:text-6xl lg:text-[70px] tracking-[-0.02em] leading-[1.08] text-[rgb(1,1,16)] max-w-3xl">
              Your AI knows your project.
            </h1>

            <p class="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl font-normal">
              Memwyre plugins for Claude Code, Grok Bot, OpenClaw, and OpenCode. Automatic context injection on session start and automated transcript capture on exit.
            </p>
            
            <!-- Clean Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <router-link to="/signup"
                class="w-auto px-6 py-3 bg-[#050614] text-white font-bold rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-md text-xs sm:text-sm inline-flex items-center justify-center gap-2">
                Get Developer Plugins &rarr;
              </router-link>
              <a href="https://docs.memwyre.tech/integrations/plugins/claude" target="_blank"
                class="w-auto px-6 py-3 bg-white text-gray-900 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm inline-flex items-center justify-center">
                View Documentation
              </a>
            </div>
          </div>

          <!-- Right: Light Mode Compatible CLI Hooks Visual -->
          <div class="lg:col-span-5 relative">
            <div class="border border-neutral-200/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-[0_12px_36px_-12px_rgba(0,0,0,0.08)] text-neutral-800">
              <!-- Window Bar -->
              <div class="flex items-center justify-between border-b border-neutral-150 pb-3 mb-4">
                <div class="flex items-center gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                </div>
                <span class="font-mono text-xs text-neutral-500 font-medium">Session Hooks — claude / openclaw</span>
                <span class="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200/80">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>Live Hook
                </span>
              </div>

              <!-- Terminal Output (Light Theme) -->
              <div class="font-mono text-xs sm:text-[13px] space-y-2.5 text-left leading-relaxed">
                <div class="text-neutral-500 font-medium"><span class="text-neutral-400 font-bold select-none">$ </span>claude --plugin @memwyre/claude-memwyre</div>
                <div class="text-neutral-900 font-semibold">[SessionStart] Project scope detected:</div>
                <div class="text-neutral-700 flex items-center gap-2 font-medium">
                  <span class="text-emerald-600 font-bold">✔</span>
                  <span>Injected 18 past memories for <span class="text-neutral-500">/workspace/src</span></span>
                </div>
                <div class="text-neutral-700 flex items-center gap-2 font-medium">
                  <span class="text-emerald-600 font-bold">✔</span>
                  <span>Conventions active: <span class="text-neutral-900 font-medium">Strict TypeScript, Tailwind v4</span></span>
                </div>
                <div class="text-neutral-700 flex items-center gap-2 font-medium">
                  <span class="text-emerald-600 font-bold">✔</span>
                  <span>Stop hook armed: <span class="text-neutral-500">auto-syncs session transcript</span></span>
                </div>
                <div class="text-neutral-400 pt-1.5 border-t border-neutral-100 text-[11px] sm:text-xs">// Continuous autonomous memory across agent runs</div>
                <div class="text-neutral-900 pt-0.5 font-medium flex items-start gap-1.5">
                  <span class="text-[#D97757] font-bold select-none">&gt;</span>
                  <span>Claude Code: <span class="text-neutral-600 font-normal">"Applied architecture pattern from session #14."</span></span>
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
            Every AI tool starts from zero.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div v-for="(problem, idx) in [
            { title: 'No Persistent Project Memory', body: 'Command-line agents only see what you paste into the immediate prompt. When the terminal session exits, all context is lost.' },
            { title: 'Repeated Explanations', body: 'Engineers spend precious time repeatedly explaining dependency versions, build prerequisites, and architectural standards.' },
            { title: 'Multi-Agent Blindspots', body: 'When running multiple bots (e.g. Researcher, Coder, Tester in Grok or OpenClaw), agents cannot see what their peers have solved.' }
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
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Plugin Specs</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Install once. Remember forever.
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          <div class="lg:col-span-5 space-y-8">
            <div v-for="(step, idx) in [
              { title: 'Deterministic Shell Hooks', body: 'SessionStart injects relevant memory based on workspace root. Stop captures terminal transcript and posts it to extraction backend.' },
              { title: 'Non-Blocking Execution', body: 'Hooks are strictly non-blocking (always exit 0) and silently fail open if the network is unreachable, never halting your terminal.' },
              { title: 'Curation & Inbox Control', body: 'Captured insights are placed in your Memwyre Inbox where you can review, approve, or discard memories before indexing.' }
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
                <span class="ml-2 font-semibold text-neutral-800">~/.openclaw/config.json</span>
              </div>
              <span class="bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-600">v2.0.14</span>
            </div>
            <pre class="text-xs sm:text-sm font-mono overflow-x-auto text-neutral-800 leading-relaxed bg-white p-4 rounded-xl border border-neutral-200/80"><code>{
  <span class="text-neutral-500">"plugins"</span>: {
    <span class="text-neutral-500">"entries"</span>: {
      <span class="text-neutral-500">"openclaw-plugin"</span>: {
        <span class="text-neutral-500">"enabled"</span>: <span class="text-neutral-900 font-semibold">true</span>,
        <span class="text-neutral-500">"config"</span>: {
          <span class="text-neutral-500">"apiKey"</span>: <span class="text-[#D97757]">"bv_sk_your_api_key_here"</span>,
          <span class="text-neutral-500">"hostUrl"</span>: <span class="text-[#D97757]">"https://server.memwyre.tech"</span>
        }
      }
    }
  }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 4. DOCUMENTED PLUGINS (MATCHING DOCUMENTATION) -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Documented Integrations</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Built for the tools you love.
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <!-- 1. Claude Code -->
          <router-link 
            to="/claude-memory"
            class="p-6 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[190px] cursor-pointer group"
          >
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <img :src="claudecodeLogo" class="w-7 h-7 shrink-0 object-contain" alt="Claude Code" />
                <div class="font-bold text-gray-900 group-hover:text-[#D97757] transition-colors text-base leading-tight">Claude Code</div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">
                @memwyre/claude-memwyre lifecycle hooks (SessionStart &amp; Stop transcript archival).
              </p>
            </div>
            <div class="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 font-semibold uppercase tracking-wider mt-4">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Package Active
            </div>
          </router-link>

          <!-- 2. Grok Build & Bot -->
          <router-link 
            to="/grok-bot-memory"
            class="p-6 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[190px] cursor-pointer group"
          >
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <img :src="grokLogo" class="w-7 h-7 shrink-0 object-contain" alt="Grok Bot" />
                <div class="font-bold text-gray-900 group-hover:text-[#D97757] transition-colors text-base leading-tight">Grok Bot</div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">
                @memwyre/grok-plugin cross-bot shared memory across Researcher, Coder, and Ops.
              </p>
            </div>
            <div class="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 font-semibold uppercase tracking-wider mt-4">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Zero Dependencies
            </div>
          </router-link>

          <!-- 3. OpenClaw -->
          <router-link 
            to="/openclaw-memory"
            class="p-6 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[190px] cursor-pointer group"
          >
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <img :src="openclawLogo" class="w-7 h-7 shrink-0 object-contain" alt="OpenClaw" />
                <div class="font-bold text-gray-900 group-hover:text-[#D97757] transition-colors text-base leading-tight">OpenClaw</div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">
                @memwyre/openclaw-plugin persistent memory provider for autonomous agents.
              </p>
            </div>
            <div class="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 font-semibold uppercase tracking-wider mt-4">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>v2.0.14 Ready
            </div>
          </router-link>

          <!-- 4. OpenCode -->
          <router-link 
            to="/opencode-memory"
            class="p-6 border border-gray-200/90 rounded-2xl bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between min-h-[190px] cursor-pointer group"
          >
            <div>
              <div class="flex items-center gap-3 mb-2.5">
                <img :src="opencodeLogo" class="w-7 h-7 shrink-0 object-contain" alt="OpenCode" />
                <div class="font-bold text-gray-900 group-hover:text-[#D97757] transition-colors text-base leading-tight">OpenCode</div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">
                memwyre-opencode-plugin auto-injecting shared conventions and architecture patterns.
              </p>
            </div>
            <div class="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 font-semibold uppercase tracking-wider mt-4">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Marketplace v1.1.5
            </div>
          </router-link>
        </div>
      </div>

      <!-- 4b. DETAILED TECHNICAL SPECIFICATIONS -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Technical Specifications</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Technical specifications of our developer plugins.
          </h2>
        </div>

        <div class="space-y-6 text-sm text-gray-600 leading-relaxed text-left max-w-4xl">
          <p>
            Memwyre developer plugins integrate directly into command-line and agent execution cycles. For CLI tools like Claude Code, the package (<code>@memwyre/claude-memwyre</code>) exposes two primary lifecycle hooks in <code>hooks.json</code>: <code>SessionStart</code> which executes <code>inject-memory.cjs</code> to retrieve workspace memories matching your project directory, and <code>Stop</code> which executes <code>capture-session.cjs</code> to parse and upload your session transcript upon exit.
          </p>
          <p>
            For autonomous frameworks like OpenClaw, the plugin (<code>@memwyre/openclaw-plugin@2.0.14</code>) implements a persistent memory provider. When agent tool profiles are configured to <code>full</code> or <code>coding</code>, OpenClaw gains direct access to <code>save_memory</code> and <code>search_memwyre</code>, enabling continuous cross-run recall.
          </p>
          <p>
            In multi-bot environments like Grok Bot, the plugin (<code>@memwyre/grok-plugin</code>) enables cross-bot shared memory. Built with zero external npm dependencies, it ensures that findings discovered by your Researcher bot are instantly available when your Coder or Ops bot initializes, eliminating duplicate work across your roster.
          </p>
          <p>
            For OpenCode, the plugin injects shared architecture decisions and conventions via <code>get_conventions</code> and <code>search_memwyre</code>, preventing stylistic deviations and ensuring generated code complies with your team's established standards.
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
          <filter id="craft-paper-grain-plugins">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#craft-paper-grain-plugins)" fill="white" />
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
            Give your AI agents a persistent long-term memory. Setup plugins in under 5 minutes.
          </p>

          <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <router-link 
              to="/signup"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-white text-[#0c0d10] font-bold rounded-full hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 shadow-md text-sm sm:text-base inline-flex items-center justify-center"
            >
              Get Developer Plugins &rarr;
            </router-link>
            <a 
              href="https://docs.memwyre.tech/integrations/plugins/claude" 
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
import claudecodeLogo from '@/assets/claudecode-color.svg';
import grokLogo from '@/assets/grok-color.svg';
import openclawLogo from '@/assets/openclaw-color.svg';
import opencodeLogo from '@/assets/opencode-color.svg';
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
