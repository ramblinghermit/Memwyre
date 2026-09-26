<template>
  <div class="force-light relative min-h-[100svh] bg-white text-gray-900 font-sans selection:bg-[#D97757] selection:text-white [overflow-x:clip]">

    <!-- 1. HERO & PRICING CARDS (Combined with background extending behind cards and fading out) -->
    <div class="relative overflow-hidden">
      
      <!-- Artistic Watercolor Background (extends behind hero and cards) -->
      <div class="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          :src="heroWatercolorBg"
          alt=""
          class="w-full h-full object-cover object-top opacity-85"
        />
        <!-- Subtle top softening -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent 30% to-transparent"></div>
        <!-- Bottom fadeout into pure white surface -->
        <div class="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-white via-white/85 to-transparent"></div>
      </div>

      <!-- Hero Header & Cards in Unified Container with proper headroom below navbar -->
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-14">
        <!-- Main Heading: Simple, transparent pricing -->
        <h1 class="hero-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] max-w-4xl mx-auto">
          Simple, transparent pricing.
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg text-gray-600 leading-relaxed mt-3 sm:mt-3.5 max-w-2xl mx-auto font-normal">
          Equip your models, IDEs, and terminal agents with persistent long-term memory. Start free forever or upgrade for unlimited memories and automated connectors.
        </p>

        <!-- Pricing Cards Grid (tight margin, well-proportioned ratio) -->
        <div class="mt-8 sm:mt-10 text-left">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            <!-- Card 1: Free Tier -->
            <div class="border border-gray-200/90 rounded-2xl bg-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-950">Free</h3>
                  <span class="text-[10px] font-mono uppercase tracking-wider text-gray-400">Starter</span>
                </div>
                <p class="text-xs text-gray-500 leading-relaxed min-h-[32px]">
                  Essential persistent memory for developers exploring Claude, Cursor, and ChatGPT.
                </p>
                
                <div class="mt-4 flex items-baseline gap-1">
                  <span class="text-4xl font-extrabold text-gray-950 tracking-tight">$0</span>
                  <span class="text-xs font-mono text-gray-400 uppercase tracking-wider">/forever</span>
                </div>

                <router-link 
                  to="/signup" 
                  class="mt-5 w-full py-2.5 px-4 bg-white text-gray-900 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm inline-flex items-center justify-center shadow-2xs"
                >
                  Get Started Free
                </router-link>

                <div class="mt-6 pt-5 border-t border-gray-100">
                  <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-3">Included in Free</div>
                  <ul class="space-y-2.5 text-xs sm:text-[13px] text-gray-600">
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>50 persistent memories</strong></span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>10 document uploads (PDF, MD, Code)</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Model Context Protocol (MCP) server</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>CLI session lifecycle hooks</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Community Discord support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Card 2: Pro Tier (Recommended) -->
            <div class="border-2 border-[#D97757] rounded-2xl bg-white p-6 sm:p-7 flex flex-col justify-between shadow-[0_12px_36px_-12px_rgba(217,119,87,0.22)] relative hover:shadow-[0_20px_48px_-12px_rgba(217,119,87,0.3)] transition-all duration-300 md:-translate-y-1">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-950">Pro</h3>
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D97757] text-white">Recommended</span>
                </div>
                <p class="text-xs text-gray-500 leading-relaxed min-h-[32px]">
                  Unlimited capacity, cross-tool synchronization, and LoCoMo re-ranking for power developers.
                </p>
                
                <div class="mt-4 flex items-baseline gap-1">
                  <span class="text-4xl font-extrabold text-gray-950 tracking-tight">$12</span>
                  <span class="text-xs font-mono text-gray-400 uppercase tracking-wider">/month</span>
                </div>

                <!-- Primary CTA Button -->
                <router-link 
                  to="/signup" 
                  class="mt-5 w-full py-2.5 px-4 bg-[#050614] text-white font-bold rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-md text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                >
                  <span>Get Started with Pro</span>
                  <span>&rarr;</span>
                </router-link>

                <!-- Compact Connectors Bar -->
                <div class="mt-3.5 px-2.5 py-1.5 bg-neutral-50 rounded-md border border-neutral-200/70 flex items-center justify-between">
                  <span class="text-[10px] font-mono font-medium uppercase tracking-wider text-neutral-500">Connectors</span>
                  <div class="flex items-center gap-1.5">
                    <img :src="vscodeLogo" alt="VS Code" class="w-3.5 h-3.5 object-contain" title="VS Code" />
                    <img :src="cursorLogo" alt="Cursor" class="w-3.5 h-3.5 object-contain" title="Cursor" />
                    <img :src="claudeLogo" alt="Claude Desktop" class="w-3.5 h-3.5 object-contain" title="Claude Desktop" />
                    <img :src="claudecodeLogo" alt="Claude Code" class="w-3.5 h-3.5 object-contain" title="Claude Code" />
                    <img :src="openclawLogo" alt="OpenClaw" class="w-3.5 h-3.5 object-contain" title="OpenClaw" />
                    <img :src="notionLogo" alt="Notion" class="w-3.5 h-3.5 object-contain" title="Notion" />
                    <img :src="driveLogo" alt="Google Drive" class="w-3.5 h-3.5 object-contain" title="Google Drive" />
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-100">
                  <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D97757] mb-3">Everything in Free, plus</div>
                  <ul class="space-y-2.5 text-xs sm:text-[13px] text-gray-700">
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-[#D97757] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Unlimited</strong> memories &amp; documents</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-[#D97757] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Google Drive &amp; Notion sync</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-[#D97757] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Claude Code, OpenCode &amp; OpenClaw plugins</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-[#D97757] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Cross-encoder re-ranking (LoCoMo 94.6%)</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-[#D97757] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Priority developer support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Card 3: Enterprise Tier -->
            <div class="border border-gray-200/90 rounded-2xl bg-white p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <h3 class="text-xl sm:text-2xl font-bold text-gray-950">Enterprise</h3>
                  <span class="text-[10px] font-mono uppercase tracking-wider text-gray-400">Team</span>
                </div>
                <p class="text-xs text-gray-500 leading-relaxed min-h-[32px]">
                  Dedicated infrastructure, on-premise VPC self-hosting, and organizational governance.
                </p>
                
                <div class="mt-4 flex items-baseline gap-1">
                  <span class="text-4xl font-extrabold text-gray-950 tracking-tight">Custom</span>
                </div>

                <router-link 
                  to="/contact" 
                  class="mt-5 w-full py-2.5 px-4 bg-white text-gray-900 font-bold rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm inline-flex items-center justify-center shadow-2xs"
                >
                  Contact Sales
                </router-link>

                <div class="mt-6 pt-5 border-t border-gray-100">
                  <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-3">Everything in Pro, plus</div>
                  <ul class="space-y-2.5 text-xs sm:text-[13px] text-gray-600">
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Self-hosted / VPC deployment</strong></span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Organization shared memory vault</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>SAML 2.0 / Okta SSO &amp; RBAC</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Zero data retention &amp; legal BAA</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>99.9% uptime SLA &amp; dedicated Slack</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- 2. FREQUENTLY ASKED QUESTIONS (Matching Landing Page Accordion Pattern) -->
    <div id="faq" class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-12 pb-10 sm:pb-12">
      <!-- Header Row -->
      <div class="mb-8 text-left">
        <span class="text-xs font-bold text-[#D97757] tracking-widest uppercase mb-2 font-mono block">FAQ</span>
        <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)]">
          Frequently asked questions.
        </h2>
        <p class="text-sm sm:text-base text-gray-500 leading-relaxed font-normal mt-2">
          Everything you need to know about Memwyre plans, integrations, and data security.
        </p>
      </div>

      <div class="border-t border-gray-200">
        <div v-for="(faq, index) in pricingFaqs" :key="index" class="border-b border-gray-200">
          <button 
            @click="toggleFaq(index)" 
            class="flex justify-between items-center w-full text-left py-5 sm:py-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97757]/50 rounded-sm px-2 -mx-2 transition-all duration-200 cursor-pointer"
          >
            <span class="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-[#D97757] transition-colors duration-200 pr-4">
              {{ faq.question }}
            </span>
            <span class="ml-4 flex-shrink-0 text-gray-400 font-light text-2xl leading-none transition-colors duration-200 group-hover:text-[#D97757]">
              <span v-if="faq.isOpen">&minus;</span>
              <span v-else>+</span>
            </span>
          </button>
          <div v-show="faq.isOpen" class="text-gray-500 pb-6 leading-relaxed text-sm sm:text-base pr-8 max-w-4xl">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>

    <!-- 3. SIGNATURE CRAFT PAPER DARK CTA (Exact Match to Landing Page) -->
    <div class="pt-10 sm:pt-14 pb-0 text-center relative overflow-hidden craft-paper-black z-30">
      <!-- Craft Paper Noise & Fiber Texture -->
      <div class="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"></div>
        <div class="absolute inset-0 opacity-30 mix-blend-screen"
             style="background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 3px 3px;"></div>
        <svg class="absolute inset-0 w-full h-full opacity-[0.065] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          <filter id="craft-paper-grain-pricing">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#craft-paper-grain-pricing)" fill="white" />
        </svg>
      </div>

      <!-- Numeric background animation -->
      <NumericBgAnimation :invert="false" class="absolute inset-0 z-0 opacity-[0.13] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        <div class="max-w-3xl text-left">
          <h2 class="hero-serif text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.02em] leading-[1.05] text-white">
            Give your AI agents <br class="hidden sm:inline" />
            <span class="block text-zinc-200">continuous memory today.</span>
          </h2>
          <p class="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
            Set up in under 2 minutes. Free forever tier, no credit card required.
          </p>

          <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <router-link 
              to="/signup"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-white text-[#0c0d10] font-bold rounded-full hover:bg-zinc-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97757]/50 focus-visible:ring-offset-2 transition-all duration-200 shadow-md text-sm sm:text-base inline-flex items-center justify-center"
            >
              Start Free Now &rarr;
            </router-link>
            <router-link 
              to="/contact"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-sm sm:text-base inline-flex items-center justify-center"
            >
              Contact Sales
            </router-link>
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
import notionLogo from '@/assets/notion-svgrepo-com.svg';
import driveLogo from '@/assets/google-drive.svg';
import vscodeLogo from '@/assets/vscode.svg';
import cursorLogo from '@/assets/cursor_CUBE_2D_LIGHT.svg';
import claudeLogo from '@/assets/claude-color.svg';
import claudecodeLogo from '@/assets/claudecode-color.svg';
import openclawLogo from '@/assets/openclaw-color.svg';
import NumericBgAnimation from '@/components/landing/NumericBgAnimation.vue';
import SiteFooter from '@/components/SiteFooter.vue';

const pricingFaqs = ref([
  {
    question: "Can I upgrade, downgrade, or cancel at any time?",
    answer: "Yes, absolutely. You can upgrade to Pro directly from your dashboard whenever you need unlimited storage and connectors. If you cancel or downgrade, your existing memories remain safely preserved and searchable, and your account will simply adhere to the Free tier caps for new additions.",
    isOpen: true
  },
  {
    question: "Does the Free tier require a credit card?",
    answer: "No credit card required. You can sign up with your email or GitHub account and immediately start using the Free tier with Cursor, VS Code, and terminal agents via MCP.",
    isOpen: false
  },
  {
    question: "How is Memwyre different from standard vector databases or Mem0/Zep?",
    answer: "Vector databases only store raw embeddings and require you to build retrieval pipelines yourself. Infrastructure libraries like Mem0 or Zep require backend infrastructure and API plumbing. Memwyre is a turnkey memory platform: it includes ready-to-use plugins for Claude Desktop, Claude Code, Cursor, OpenClaw, and VS Code, automatically extracts entities, and uses temporal decay to prune obsolete context.",
    isOpen: false
  },
  {
    question: "Why not just use ChatGPT or Claude's built-in memory?",
    answer: "Built-in memories are vendor-locked silos. Claude doesn't know what you solved in Cursor; ChatGPT has no idea about the architectural conventions in your terminal sessions. Memwyre acts as a universal, cross-tool memory layer that synchronizes knowledge across all your AI assistants simultaneously.",
    isOpen: false
  },
  {
    question: "How do I connect Memwyre to Cursor, VS Code, or Claude Code?",
    answer: "Connecting takes less than two minutes via our official Model Context Protocol (MCP) server. You can install it using a single command (npx -y install-memwyre) or by adding the remote MCP server URL to your configuration file.",
    isOpen: false
  },
  {
    question: "Is my code, prompt data, and transcript private?",
    answer: "Yes. Memwyre operates with a strict zero-retention policy for model training: your code, notes, and memories are never used to train public models. All data is encrypted in transit via TLS 1.3 and at rest with AES-256-GCM. Enterprise plans also offer self-hosted Docker and VPC deployment options.",
    isOpen: false
  },
  {
    question: "What happens when I exceed the 50 memories limit on the Free plan?",
    answer: "You can continue querying and retrieving your existing memories without interruption. To add more memories, documents, or enable automated syncing from Notion and Google Drive, you can upgrade to Pro anytime with one click.",
    isOpen: false
  },
  {
    question: "Do you offer team and enterprise volume discounts?",
    answer: "Yes. For engineering teams with 5+ developers or custom compliance requirements (SOC2, BAA, Okta SSO), our Enterprise plan offers volume billing, dedicated infrastructure clusters, and direct shared organization vaults.",
    isOpen: false
  }
]);

const toggleFaq = (index) => {
  pricingFaqs.value[index].isOpen = !pricingFaqs.value[index].isOpen;
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
