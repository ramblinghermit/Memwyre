<template>
  <div class="force-light relative min-h-[100svh] bg-white text-gray-900 font-sans selection:bg-[#D97757] selection:text-white [overflow-x:clip]">

    <!-- Hero & Papers Section -->
    <div class="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left pb-4 sm:pb-6">
        <h1 class="sr-only">Advancing AI Long-Term Memory - Memwyre Research Lab</h1>

        <!-- Research Highlights Badges -->
        <div class="flex items-center justify-start flex-wrap gap-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200/80 text-xs font-medium text-gray-700 shadow-2xs">
            <span class="text-[#D97756] font-mono font-bold">LoCoMo:</span>
            <span>70.5% Accuracy · 79.9% Hit@10</span>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200/80 text-xs font-medium text-gray-700 shadow-2xs">
            <span>1,540 Test Evaluations</span>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200/80 text-xs font-medium text-gray-700 shadow-2xs">
            <span>Open Source Reproducibility</span>
          </div>
        </div>
      </div>

      <!-- Papers & Studies Section (Standard 3-Column Grid) -->
      <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-2 sm:pt-4 z-10">
      
      <!-- Research Papers Grid (All uniform 3-column cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article 
          v-for="paper in papers" 
          :key="paper.title"
          class="group relative flex flex-col justify-between p-6 sm:p-7 bg-white border border-gray-200/90 rounded-none hover:border-gray-400 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div>
            <!-- Cover Image (clickable, sharp edges) -->
            <router-link 
              :to="paper.link" 
              class="block w-full aspect-[16/9] rounded-none overflow-hidden mb-5 bg-gray-50 border border-gray-100 cursor-pointer"
            >
              <img 
                :src="paper.cover" 
                :alt="paper.title" 
                class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              />
            </router-link>

            <!-- Category & Read Time -->
            <div class="flex items-center justify-between mb-3">
              <span class="text-[11px] font-semibold text-[#D97756] bg-[#D97756]/10 border border-[#D97756]/20 px-2.5 py-0.5 rounded-full">
                {{ paper.category }}
              </span>
              <span class="text-xs text-gray-400 font-normal">
                {{ paper.readTime }}
              </span>
            </div>
            
            <!-- Title -->
            <h2 class="text-[17px] font-bold text-black group-hover:text-black mb-2.5 leading-snug tracking-tight">
              <router-link :to="paper.link">
                {{ paper.title }}
              </router-link>
            </h2>
            
            <!-- Excerpt -->
            <p class="text-[13.5px] text-neutral-800 leading-relaxed font-normal mb-5 line-clamp-3">
              {{ paper.excerpt }}
            </p>
          </div>

          <!-- Card Bottom -->
          <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <span class="text-xs text-gray-400 font-normal">
              {{ paper.date }}
            </span>
            <router-link 
              :to="paper.link"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 group-hover:text-black hover:underline transition-colors"
            >
              <span>Read Study</span>
              <svg class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </div>

    <!-- SIGNATURE CRAFT PAPER DARK CTA & FOOTER (Matches Landing & Pricing) -->
    <div class="pt-16 sm:pt-20 pb-0 text-center relative overflow-hidden craft-paper-black z-30 mt-12 sm:mt-16">
      <!-- Craft Paper Noise & Fiber Texture -->
      <div class="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"></div>
        <div class="absolute inset-0 opacity-30 mix-blend-screen"
             style="background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 3px 3px;"></div>
        <svg class="absolute inset-0 w-full h-full opacity-[0.065] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          <filter id="craft-paper-grain-research">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#craft-paper-grain-research)" fill="white" />
        </svg>
      </div>

      <!-- Numeric background animation -->
      <NumericBgAnimation :invert="false" class="absolute inset-0 z-0 opacity-[0.13] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        <div class="max-w-3xl text-left">
          <h2 class="hero-serif text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.02em] leading-[1.05] text-white">
            The second brain <br class="hidden sm:inline" />
            <span class="block text-zinc-200">for your AI.</span>
          </h2>
          <p class="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl font-normal leading-relaxed">
            Access open benchmarks, stateful context graphs, and research datasets. Set up in under 2 minutes.
          </p>

          <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <router-link 
              to="/signup"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-white text-[#0c0d10] font-bold rounded-full hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 shadow-md text-sm sm:text-base inline-flex items-center justify-center"
            >
              Get Started &rarr;
            </router-link>
            <a 
              href="https://github.com/ramblinghermit0403/Memwyre" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-auto px-7 py-3 sm:px-9 sm:py-3.5 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-sm sm:text-base inline-flex items-center justify-center"
            >
              Explore GitHub
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
import SiteFooter from '@/components/SiteFooter.vue';
import NumericBgAnimation from '@/components/landing/NumericBgAnimation.vue';

const copiedText = ref('');
const copyCommand = (cmd) => {
  navigator.clipboard.writeText(cmd);
  copiedText.value = cmd;
  setTimeout(() => {
    copiedText.value = '';
  }, 2000);
};

const papers = [
  {
    category: 'Evaluation Report',
    title: 'The LoCoMo Benchmark Report',
    excerpt: 'Our core evaluation matrix checking long-context recall, entity traversal, and temporal consistency across 1,540 simulated developer query runs.',
    readTime: 'Active',
    date: 'ACCURACY: 70.5% | HIT@10: 79.9%',
    link: '/ai-memory-benchmark-locomo',
    cover: '/blog-covers/ai-memory-benchmark-locomo-v2.png'
  },
  {
    category: 'Architecture Study',
    title: 'What is AI Memory? The Architecture of Long-Term Context',
    excerpt: 'Explore the technical architecture of AI memory, from flat vector embeddings to hierarchical entity graphs, and how it solves LLM amnesia.',
    readTime: '6 min read',
    date: 'Apr 2026',
    link: '/research/what-is-ai-memory',
    cover: '/blog-covers/state-of-ai-memory-2026.png'
  },
  {
    category: 'Architecture Study',
    title: 'Vector Database vs. AI Agent Memory',
    excerpt: 'The fundamental engineering differences between passive semantic vector tables and active cognitive agent memory layers with Ebbinghaus decay.',
    readTime: '16 min read',
    date: 'Sep 2026',
    link: '/research/vector-database-vs-agent-memory',
    cover: '/blog-covers/rag-vs-memory-long-term-knowledge.png'
  },
  {
    category: 'Developer Guide',
    title: 'Context Engineering: The 2026 Guide for Developers',
    excerpt: 'Prompt engineering is dead. Learn how Context Engineering and hierarchical entity graphs replace standard RAG for production AI agents.',
    readTime: '7 min read',
    date: 'May 2026',
    link: '/research/context-engineering',
    cover: '/blog-covers/mcp-persistent-memory.png'
  }
];
</script>
