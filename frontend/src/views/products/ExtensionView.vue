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
          <div class="lg:col-span-6 space-y-6 text-left">
            <span class="text-xs font-mono font-bold tracking-wider uppercase text-neutral-500 block">04 / BROWSER COMPANION</span>
            
            <h1 class="hero-serif text-4xl sm:text-6xl lg:text-[70px] tracking-[-0.02em] leading-[1.08] text-[rgb(1,1,16)] max-w-3xl">
              Your browser, with a photographic memory.
            </h1>

            <p class="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl font-normal">
              Save AI chats, reusable prompts, code snippets, and webpage content directly from ChatGPT, Claude, Gemini, and Perplexity with a single click. Keep your research context fresh without breaking flow.
            </p>
            
            <!-- Clean Action Buttons -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a href="https://chromewebstore.google.com/detail/memwyre/biplnkodgfdgejgblohhjeckiclfpekn" target="_blank"
                class="w-auto px-6 py-3 bg-[#050614] text-white font-bold rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-md text-xs sm:text-sm inline-flex items-center justify-center gap-2">
                Install Chrome Extension &rarr;
              </a>
              <a href="https://microsoftedge.microsoft.com/addons/detail/memwyre/ihibkjgaiafhhbjmchmkphlkomodkmpd" target="_blank"
                class="w-auto px-6 py-3 bg-white text-gray-900 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm inline-flex items-center justify-center">
                View Edge Add-on
              </a>
            </div>
          </div>

          <!-- Right: Light Mode Browser GUI Mockup Visual -->
          <div class="lg:col-span-6 relative">
            <div class="border border-neutral-200/90 bg-white rounded-2xl relative flex flex-col justify-between min-h-[380px] shadow-[0_12px_36px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
              <!-- Browser Header -->
              <div class="bg-neutral-50 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-neutral-300 border border-neutral-400/40"></div>
                </div>
                <div class="bg-white border border-neutral-200/90 rounded-md px-3 py-1 text-[11px] font-mono text-neutral-600 w-2/3 truncate text-center shadow-2xs flex items-center justify-center gap-1.5">
                  <svg class="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <span>https://chatgpt.com/c/architecture-review</span>
                </div>
                <div class="w-6 h-6 rounded bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[10px] font-bold text-neutral-700 font-mono">MW</div>
              </div>
              
              <!-- Active Webpage Content -->
              <div class="p-6 flex-1 bg-neutral-50/50 flex flex-col justify-between relative text-left">
                <div class="space-y-4 max-w-[85%]">
                  <div class="flex items-start gap-2.5">
                    <div class="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">AI</div>
                    <div class="bg-white border border-neutral-200/80 p-3.5 rounded-xl shadow-2xs text-xs text-neutral-700 leading-relaxed">
                      Here is the unified MCP schema configuration for your team's memory layer...
                    </div>
                  </div>
                </div>

                <!-- Floating Memwyre Extension Popup -->
                <div class="absolute top-4 right-4 w-72 sm:w-80 bg-white border border-neutral-200/90 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] rounded-xl p-4 font-sans text-xs z-20 text-left">
                  <div class="flex items-center justify-between border-b border-neutral-100 pb-2.5 mb-3">
                    <div class="flex items-center gap-1.5">
                      <img src="/logo.png" alt="Memwyre" class="h-4 w-auto" />
                      <span class="font-bold text-[11px] text-neutral-900">Browser Ingest</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-[10px] text-neutral-700 font-mono font-medium bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200/80">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                      Vault Sync Active
                    </div>
                  </div>

                  <div class="space-y-3">
                    <div class="bg-neutral-50 border border-neutral-200/70 p-2.5 rounded-lg font-mono text-[10px] text-neutral-600 space-y-0.5">
                      <div class="font-bold text-neutral-900">DETECTED: AI Chat Exchange</div>
                      <div>Adapter: chatgpt.com (Turndown v1.1)</div>
                      <div>Payload: Clean Markdown block array</div>
                    </div>

                    <div>
                      <label class="block font-medium text-neutral-700 mb-1 text-[11px]">Add Tags / Context</label>
                      <input type="text" value="#architecture #mcp #auth-flow" class="w-full bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-400" />
                    </div>

                    <button @click="triggerCapture" class="w-full py-2 bg-[#050614] text-white font-bold rounded-lg shadow-sm hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer">
                      <span v-if="!isSaving">Save Conversation Context</span>
                      <span v-else class="flex items-center gap-1">
                        <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Syncing to Vault...
                      </span>
                    </button>
                    <p class="text-[10px] text-emerald-700 text-center font-bold mt-1.5 flex items-center justify-center gap-1" v-if="hasSaved"><span class="text-emerald-600">✔</span> Captured successfully to Vault!</p>
                  </div>
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
            AI research context decays in minutes.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div v-for="(problem, idx) in [
            { title: 'Chat Expiry & Loss', body: 'Valuable debugging logs, prompts, and config details roll off ChatGPT and Claude listings or get lost in hundreds of threads.' },
            { title: 'Copy-Paste Fatigue', body: 'Constantly copy-pasting code blocks and stack trace logs from your browser into local text files is slow and disrupts flow.' },
            { title: 'Resource-Heavy Tabs', body: 'Keeping 60 browser tabs open for context consumes system memory and offers no searchable indexing.' }
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
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Manifest V3 Workflow</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            One click to freeze browser context.
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          <div class="lg:col-span-6 space-y-8">
            <div v-for="(step, idx) in [
              { title: '1. Secure 30-Day Token Authentication', body: 'Link your browser to your private vault in one step using an Access Token generated directly in Settings → Extension Token.' },
              { title: '2. Native In-Chat AI Adapters', body: 'Detects and captures active exchanges from chatgpt.com, claude.ai, gemini.google.com, and perplexity.ai automatically.' },
              { title: '3. Client-Side Turndown Serialization', body: 'Uses turndown.min.js to convert webpage DOM trees into clean, formatted Markdown before transmission, preventing token bloat.' }
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

          <!-- Browser & AI Ecosystem Card -->
          <div class="lg:col-span-6 border border-gray-200/90 rounded-2xl overflow-hidden bg-gray-50 p-6 sm:p-7 shadow-2xs">
            <div class="text-center space-y-4">
              <div class="font-bold text-gray-900 text-base">Supported Browsers &amp; AI Sites</div>
              <p class="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                Built on Manifest V3. Compatible with Google Chrome and Microsoft Edge with dedicated adapters for the leading AI web assistants.
              </p>
              
              <!-- Browser Logos -->
              <div class="flex justify-center gap-4 pt-2">
                <div class="bg-white border border-gray-200 rounded-xl flex items-center gap-2.5 px-4 py-2.5 shadow-2xs">
                  <img :src="chromeLogo" class="w-5 h-5 object-contain" alt="Google Chrome" />
                  <span class="text-xs font-semibold text-gray-800">Chrome</span>
                </div>
                <div class="bg-white border border-gray-200 rounded-xl flex items-center gap-2.5 px-4 py-2.5 shadow-2xs">
                  <img :src="edgeLogo" class="w-5 h-5 object-contain" alt="Microsoft Edge" />
                  <span class="text-xs font-semibold text-gray-800">Edge</span>
                </div>
              </div>

              <!-- AI Site Badges -->
              <div class="flex flex-wrap justify-center gap-2 pt-2 border-t border-gray-200/80">
                <div class="bg-white border border-gray-200/70 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-gray-700">
                  <img :src="openaiLogo" class="w-4 h-4 object-contain" alt="ChatGPT" />
                  <span>ChatGPT</span>
                </div>
                <div class="bg-white border border-gray-200/70 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-gray-700">
                  <img :src="claudeLogo" class="w-4 h-4 object-contain" alt="Claude" />
                  <span>Claude</span>
                </div>
                <div class="bg-white border border-gray-200/70 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-gray-700">
                  <img :src="geminiLogo" class="w-4 h-4 object-contain" alt="Gemini" />
                  <span>Gemini</span>
                </div>
                <div class="bg-white border border-gray-200/70 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-xs text-gray-700">
                  <img :src="perplexityLogo" class="w-4 h-4 object-contain" alt="Perplexity" />
                  <span>Perplexity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. SECURITY & PERMISSIONS (LIGHT-MODE COMPATIBLE) -->
      <div class="py-12 sm:py-16 border-t border-gray-150">
        <div class="max-w-3xl mb-8 sm:mb-10 text-left">
          <span class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400">Security &amp; Privacy</span>
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mt-2">
            Secure browser isolation by design.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-gray-900">Only save what you choose</h3>
            <p class="text-sm text-gray-500 leading-relaxed">
              We value privacy above all else. The extension runs in strict isolation and only extracts text from target pages (like ChatGPT, Claude, and active research documents) when you explicitly trigger the save function or right-click context menu.
            </p>
            <ul class="space-y-2 text-sm text-neutral-600">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                <span>Short-lived 30-day tokens securely isolated in local extension storage</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                <span>100% client-side HTML-to-Markdown serialization via Turndown</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                <span>Host permissions restricted exclusively to server.memwyre.tech</span>
              </li>
            </ul>
          </div>

          <!-- Light Mode Permissions Box -->
          <div class="border border-neutral-200/90 rounded-2xl p-6 bg-neutral-50 text-neutral-800 flex flex-col justify-center shadow-2xs">
            <div class="text-xs font-mono text-neutral-500 mb-3 font-semibold">// MANIFEST V3 PERMISSIONS</div>
            <div class="font-mono text-xs sm:text-sm space-y-2.5">
              <div><span class="text-neutral-900 font-semibold font-mono">activeTab</span>: <span class="text-neutral-600">Only read current page text upon explicit user clip.</span></div>
              <div><span class="text-neutral-900 font-semibold font-mono">storage</span>: <span class="text-neutral-600">Securely cache auth tokens and user settings locally.</span></div>
              <div><span class="text-neutral-900 font-semibold font-mono">sidePanel</span>: <span class="text-neutral-600">Direct sidebar access for vault search and Inbox review.</span></div>
              <div><span class="text-neutral-900 font-semibold font-mono">contextMenus</span>: <span class="text-neutral-600">Right-click shortcut to "Save to Memwyre".</span></div>
              <div class="text-neutral-400 pt-2 border-t border-neutral-200">// Zero tracking of outside browser tabs or web history</div>
            </div>
          </div>
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
          <filter id="craft-paper-grain-extension">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#craft-paper-grain-extension)" fill="white" />
        </svg>
      </div>

      <!-- Numeric background animation -->
      <NumericBgAnimation :invert="false" class="absolute inset-0 z-0 opacity-[0.13] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        <div class="max-w-3xl text-left">
          <h2 class="hero-serif text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.02em] leading-[1.05] text-white">
            Capture context, <br class="hidden sm:inline" />
            <span class="block text-zinc-200">anywhere on the web.</span>
          </h2>
          <p class="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
            Install the browser extension today and never repeat yourself to a blank AI slate.
          </p>

          <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <a 
              href="https://chromewebstore.google.com/detail/memwyre/biplnkodgfdgejgblohhjeckiclfpekn" 
              target="_blank"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-white text-[#0c0d10] font-bold rounded-full hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 shadow-md text-sm sm:text-base inline-flex items-center justify-center"
            >
              Install Chrome Extension &rarr;
            </a>
            <a 
              href="https://microsoftedge.microsoft.com/addons/detail/memwyre/ihibkjgaiafhhbjmchmkphlkomodkmpd" 
              target="_blank"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-sm sm:text-base inline-flex items-center justify-center"
            >
              Microsoft Edge Add-on
            </a>
          </div>
        </div>
      </div>

      <SiteFooter craft-paper class="!bg-transparent !mt-8 sm:!mt-10" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import heroWatercolorBg from '@/assets/hero-watercolor-bg.jpg';
import chromeLogo from '@/assets/chrome-logo-svgrepo-com.svg';
import edgeLogo from '@/assets/microsoft-edge-logo.svg';
import openaiLogo from '@/assets/openai.svg';
import claudeLogo from '@/assets/claude-color.svg';
import geminiLogo from '@/assets/gemini-color.svg';
import perplexityLogo from '@/assets/perplexity-color.svg';
import NumericBgAnimation from '@/components/landing/NumericBgAnimation.vue';
import SiteFooter from '@/components/SiteFooter.vue';

const isSaving = ref(false);
const hasSaved = ref(false);

const triggerCapture = () => {
  if (isSaving.value || hasSaved.value) return;
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
    hasSaved.value = true;
  }, 1200);
};
</script>

<style scoped>
.hero-serif {
  font-family: 'Aleo', 'DM Serif Text', serif;
  letter-spacing: -0.02em;
  font-variant-numeric: lining-nums;
  font-feature-settings: "lnum" 1;
}
</style>
