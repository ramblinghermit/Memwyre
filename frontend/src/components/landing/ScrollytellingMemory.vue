<template>
  <div 
    id="how-it-works" 
    ref="sectionRef" 
    data-theme="light" 
    class="relative z-25 pt-0 pb-[134px] sm:pb-[166px] bg-[#F5F2EC] select-none overflow-visible scroll-mt-16"
  >
    <!-- Anchor fallback for continuous-memory -->
    <div id="continuous-memory" class="absolute -top-16"></div>
    <!-- Subtle tactile background texture -->
    <div class="absolute inset-0 bg-[radial-gradient(#d1ccc2_1px,transparent_1px)] [background-size:20px_20px] opacity-35 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <!-- Header: Breadcrumb + Headline (Sticky on Desktop, Natural Scroll on Mobile) -->
      <div class="relative lg:sticky lg:top-0 z-20 lg:z-50 bg-transparent lg:bg-[#F5F2EC]/95 lg:backdrop-blur-md pt-6 sm:pt-8 pb-3 sm:pb-5 lg:pb-6 mb-4 sm:mb-6 lg:mb-8 lg:-mx-12 lg:px-12 lg:border-b lg:border-gray-200/60 lg:shadow-[0_4px_20px_rgba(245,242,236,0.8)]">
        <!-- Headline & Subtitle -->
        <div class="max-w-3xl">
          <h2 class="hero-serif text-2xl sm:text-4xl lg:text-[44px] tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mb-2.5 sm:mb-3.5">
            The memory that self-compiles.
          </h2>
          <p class="text-xs sm:text-base text-gray-600 leading-relaxed font-normal">
            Work happens in your tools. Memwyre compiles it into continuous shared memory, then recalls it before any tool acts.
          </p>
        </div>
      </div>

      <!-- Main Stage Container (Responsive Flex: Col on Mobile with sticky top sheet, Row on Desktop) -->
      <div ref="containerRef" class="relative flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 w-full">
        
        <!-- SVG Connecting Curve (Desktop Only, z-40 to stay visible OVER right div) -->
        <svg 
          class="hidden lg:block pointer-events-none absolute inset-0 w-full h-full z-40 overflow-visible"
          aria-hidden="true"
        >
          <g v-if="connectorPath">
            <!-- Animated Live Dotted Line Flowing Left to Right (Gray only, no transition lag) -->
            <path
              :d="connectorPath"
              fill="none"
              stroke="#9c9387"
              stroke-width="1.75"
              stroke-dasharray="8 6"
              stroke-linecap="round"
              class="animated-flow-line"
            />
            <!-- Left origin dot on active card edge -->
            <circle
              v-if="startPoint"
              :cx="startPoint.x"
              :cy="startPoint.y"
              r="3.5"
              fill="#8c857b"
              stroke="#ffffff"
              stroke-width="1.5"
            />
          </g>
        </svg>

        <!-- Left Column: Compact Scrolling Event Stream Cards (Scrolls behind sticky sheet on mobile) -->
        <div class="w-full lg:w-[440px] xl:w-[460px] shrink-0 flex flex-col space-y-16 sm:space-y-20 lg:space-y-24 xl:space-y-28 pt-8 sm:pt-10 lg:pt-[216px] pb-24 lg:pb-[150px] relative z-10 order-last lg:order-first">
          <div
            v-for="(step, idx) in steps"
            :key="idx"
            :ref="el => { if (el) cardRefs[idx] = el }"
            @click="selectStep(idx, true)"
            class="relative rounded-[22px] p-5 sm:p-6 cursor-pointer group transition-all duration-300 ease-out z-10"
            :class="[
              activeStep === idx
                ? 'bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.05)] opacity-100'
                : idx < activeStep
                  ? 'bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] opacity-100'
                  : 'bg-white/80 border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)] opacity-25 hover:opacity-70'
            ]"
          >
            <!-- Card Header: Tool Icon, Name, and Timestamp -->
            <div class="flex items-center justify-between gap-3 mb-2.5">
              <div class="flex items-center gap-3 min-w-0">
                <!-- App Icon (Direct & Bigger, no outer div) -->
                <img v-if="step.iconSrc" :src="step.iconSrc" :alt="step.navLabel" class="w-7 h-7 sm:w-8 sm:h-8 shrink-0 object-contain rounded-sm" />
                <!-- Slack Icon -->
                <svg v-else-if="step.icon === 'slack'" class="w-7 h-7 sm:w-8 sm:h-8 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                  <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                  <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                  <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
                </svg>

                <!-- Label -->
                <span class="text-[13px] sm:text-[14px] font-semibold text-gray-900 tracking-tight truncate">{{ step.sourceTitle }}</span>
              </div>

              <!-- Time -->
              <span class="text-[11px] text-gray-400 font-normal shrink-0">{{ step.timestamp }}</span>
            </div>

            <!-- Body Message -->
            <p class="text-[13px] text-gray-600 leading-relaxed font-normal">
              {{ step.content }}
            </p>
          </div>
        </div>

        <!-- Right Column: Living Memory Sheet (Direct child of containerRef: Sticky on Top on Mobile, Sticky at Offset on Desktop) -->
        <div 
          ref="rightCardRef"
          class="w-full lg:w-[500px] xl:w-[540px] shrink-0 sticky top-0 lg:top-[220px] xl:top-[240px] self-start z-30 order-first lg:order-last bg-[#F5F2EC] lg:bg-transparent pt-2 pb-3 lg:pt-0 lg:pb-0"
        >
          <div class="bg-white rounded-2xl sm:rounded-[24px] p-5 sm:p-7 md:p-9 border border-black/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] relative">
            
            <!-- Subtle Header -->
            <div class="text-[11px] text-gray-400 font-normal mb-2.5">
              Updated just now
            </div>

            <!-- Project Header -->
            <div class="flex items-center gap-2.5 mb-3.5">
              <svg class="w-5 h-5 text-gray-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span class="text-[16px] font-semibold text-gray-900 tracking-tight">payments-service</span>
            </div>

            <!-- Base Description Context -->
            <div class="text-[13px] sm:text-[13.5px] leading-relaxed text-gray-700 mb-4 space-y-1">
              <div>Production infrastructure and payment pipelines.</div>
              <div>
                <span class="text-[#b91c1c] underline decoration-[#fca5a5] underline-offset-2">Marcus Vance</span> owns the service architecture.
              </div>
            </div>

            <!-- Compiled Knowledge Items (Direct Instant Appearance, No Fade or Transitions) -->
            <div class="space-y-2.5 text-[13px] leading-relaxed text-gray-800">
              
              <!-- Memory Line 0 (Claude Code) -->
              <div 
                v-if="activeStep >= 0"
                :ref="el => { if (el) targetRefs[0] = el }"
                class="py-0.5"
              >
                <span class="type-reveal-text">Stripe webhook retry with exponential backoff on <code class="text-[11px] font-mono text-gray-800">invoice.payment_failed</code>.</span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[11px] font-medium text-gray-700 align-baseline ml-1.5 shadow-2xs badge-pop">
                  <img :src="claudeCodeIcon" alt="Claude Code" class="w-3 h-3 object-contain" />
                  <span>Claude Code</span>
                </span>
              </div>

              <!-- Memory Line 1 (Codex) -->
              <div 
                v-if="activeStep >= 1"
                :ref="el => { if (el) targetRefs[1] = el }"
                class="py-0.5"
              >
                <span class="type-reveal-text">Generated OpenAPI v3 schema & typed RPC client for billing endpoints.</span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[11px] font-medium text-gray-700 align-baseline ml-1.5 shadow-2xs badge-pop">
                  <img :src="codexIcon" alt="Codex" class="w-3 h-3 object-contain" />
                  <span>Codex</span>
                </span>
              </div>

              <!-- Memory Line 2 (Grok Bot) -->
              <div 
                v-if="activeStep >= 2"
                :ref="el => { if (el) targetRefs[2] = el }"
                class="py-0.5"
              >
                <span class="type-reveal-text">PgBouncer pool limit tuned to 50 max connections after 10k RPS load test.</span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[11px] font-medium text-gray-700 align-baseline ml-1.5 shadow-2xs badge-pop">
                  <img :src="grokBotIcon" alt="Grok Bot" class="w-3 h-3 object-contain rounded-xs" />
                  <span>Grok Bot</span>
                </span>
              </div>

              <!-- Memory Line 3 (Cursor) -->
              <div 
                v-if="activeStep >= 3"
                :ref="el => { if (el) targetRefs[3] = el }"
                class="py-0.5"
              >
                <span class="type-reveal-text">Migrated session tokens to 15m JWT rotation; refresh tokens in Redis.</span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[11px] font-medium text-gray-700 align-baseline ml-1.5 shadow-2xs badge-pop">
                  <img :src="cursorLightIcon" alt="Cursor" class="w-3 h-3 object-contain" />
                  <span>Cursor</span>
                </span>
              </div>

              <!-- Memory Line 4 (Recall Box - Step 4 Slack query) -->
              <div 
                v-if="activeStep >= 4"
                :ref="el => { if (el) targetRefs[4] = el }"
                class="pt-3 text-[12px] sm:text-[13px] text-gray-800 border-t border-gray-150 mt-2.5"
              >
                <span class="text-gray-400 font-normal text-[11px] block mb-1 type-reveal-text">Answered in 42ms:</span>
                <span>Stripe retries use exponential backoff </span>
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[10px] font-medium text-gray-700 align-baseline shadow-2xs">
                  <img :src="claudeCodeIcon" alt="Claude Code" class="w-2.5 h-2.5 object-contain" />
                  <span>Claude Code</span>
                </span>
                <span>, OpenAPI v3 RPC client active </span>
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[10px] font-medium text-gray-700 align-baseline shadow-2xs">
                  <img :src="codexIcon" alt="Codex" class="w-2.5 h-2.5 object-contain" />
                  <span>Codex</span>
                </span>
                <span>, PgBouncer pool limit capped at 50 </span>
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[10px] font-medium text-gray-700 align-baseline shadow-2xs">
                  <img :src="grokBotIcon" alt="Grok Bot" class="w-2.5 h-2.5 object-contain rounded-xs" />
                  <span>Grok Bot</span>
                </span>
                <span>, and session tokens rotate in 15m </span>
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#f2ede4] border border-[#e5dfd5] text-[10px] font-medium text-gray-700 align-baseline shadow-2xs">
                  <img :src="cursorLightIcon" alt="Cursor" class="w-2.5 h-2.5 object-contain" />
                  <span>Cursor</span>
                </span>.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import cursorLightIcon from '@/assets/cursor_CUBE_2D_LIGHT.svg';
import claudeCodeIcon from '@/assets/claudecode-color.svg';
import codexIcon from '@/assets/codex-color.svg';
import grokBotIcon from '@/assets/grok-bot.png';

const sectionRef = ref(null);
const containerRef = ref(null);
const activeStep = ref(-1);

watch(activeStep, () => {
  nextTick(() => {
    updateConnector();
  });
});

const cardRefs = ref([]);
const targetRefs = ref([]);
const rightCardRef = ref(null);
const connectorPath = ref('');
const startPoint = ref(null);
const endPoint = ref(null);

const steps = [
  {
    navLabel: 'Claude Code',
    sourceTitle: 'Claude Code · terminal CLI',
    timestamp: '10:14 AM',
    iconSrc: claudeCodeIcon,
    content: 'Patched Stripe webhook retry failure. Implemented exponential backoff for invoice.payment_failed.',
    isQuery: false,
  },
  {
    navLabel: 'Codex',
    sourceTitle: 'Codex · background agent',
    timestamp: '11:30 AM',
    iconSrc: codexIcon,
    content: 'Generated OpenAPI v3 schema & typed RPC client for billing and invoice endpoints.',
    isQuery: false,
  },
  {
    navLabel: 'Grok Bot',
    sourceTitle: 'Grok Bot · ops monitor',
    timestamp: '1:15 PM',
    iconSrc: grokBotIcon,
    content: 'Completed staging database load test under 10k RPS. Tuned PgBouncer connection ceiling to 50.',
    isQuery: false,
  },
  {
    navLabel: 'Cursor',
    sourceTitle: 'Cursor · coding session',
    timestamp: '2:45 PM',
    iconSrc: cursorLightIcon,
    content: 'Refactored session tokens to 15m JWTs with automatic Redis refresh rotation.',
    isQuery: false,
  },
  {
    navLabel: 'Slack Query',
    sourceTitle: 'Marcus · Slack',
    timestamp: '4:00 PM',
    icon: 'slack',
    content: '@memwyre what did we decide on Stripe retries, billing RPC, PgBouncer pool, and token rotation?',
    isQuery: true,
  },
];

const updateConnector = () => {
  if (typeof window === 'undefined') return;
  if (!containerRef.value) return;

  const cardEl = cardRefs.value[activeStep.value];
  const targetEl = targetRefs.value[activeStep.value];
  const rightEl = rightCardRef.value;

  if (!cardEl || !targetEl || !rightEl) {
    connectorPath.value = '';
    startPoint.value = null;
    endPoint.value = null;
    return;
  }

  const containerRect = containerRef.value.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();
  const rightRect = rightEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  const x1 = cardRect.right - containerRect.left;
  const y1 = cardRect.top + cardRect.height / 2 - containerRect.top;
  // Route line visibly over the right card surface directly to the active memory row:
  const x2 = targetRect.left - 10 - containerRect.left;
  const y2 = targetRect.top + targetRect.height / 2 - containerRect.top;

  const dx = Math.max(40, x2 - x1);
  connectorPath.value = `M ${x1} ${y1} C ${x1 + dx * 0.45} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`;
  startPoint.value = { x: x1, y: y1 };
  endPoint.value = { x: x2, y: y2 };
};

const selectStep = (idx, scroll = false) => {
  activeStep.value = idx;
  nextTick(() => {
    updateConnector();
    if (scroll && cardRefs.value[idx]) {
      cardRefs.value[idx].scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  });
};

let scrollRaf = null;

const onScroll = () => {
  if (typeof window === 'undefined') return;
  if (scrollRaf) cancelAnimationFrame(scrollRaf);

  scrollRaf = requestAnimationFrame(() => {
    if (!cardRefs.value.length) return;
    
    let newActiveIndex = -1;
    let focalY = window.innerHeight * 0.45;

    if (rightCardRef.value) {
      const sheetBottom = rightCardRef.value.getBoundingClientRect().bottom;
      if (window.innerWidth >= 1024) {
        // Desktop: Align relative to bottom of sticky sheet
        focalY = sheetBottom - 20;
      } else {
        // Mobile: Trigger as card approaches bottom of sticky top sheet
        focalY = sheetBottom + 40;
      }
    }

    cardRefs.value.forEach((card, idx) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardTarget = rect.top;
      
      if (cardTarget <= focalY) {
        newActiveIndex = idx;
      }
    });

    if (newActiveIndex !== activeStep.value) {
      activeStep.value = newActiveIndex;
    }
    updateConnector();
  });
};

let resizeObserver = null;

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    nextTick(() => {
      updateConnector();
      if (containerRef.value && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          updateConnector();
        });
        resizeObserver.observe(containerRef.value);
      }
    });
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (scrollRaf) cancelAnimationFrame(scrollRaf);
    if (resizeObserver) resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.hero-serif {
  font-family: 'Aleo', 'DM Serif Text', serif;
  letter-spacing: -0.02em;
}

.animated-flow-line {
  animation: flowDottedLine 0.8s linear infinite;
}

@keyframes flowDottedLine {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -14px;
  }
}

@keyframes typeReveal {
  0% { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0 0 0); }
}

@keyframes badgePop {
  0% { opacity: 0; transform: scale(0.7); }
  60% { opacity: 1; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}

.type-reveal-text {
  animation: typeReveal 0.6s steps(40, end) forwards;
}

.badge-pop {
  opacity: 0;
  animation: badgePop 0.3s ease-out 0.6s forwards;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
