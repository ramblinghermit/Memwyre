<template>
  <div class="relative w-full h-full flex flex-col overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40" @mouseenter="pause" @mouseleave="resume">

    <!-- Slides -->
    <div class="relative flex-1 overflow-hidden">
      <div
        v-for="(slide, i) in slides"
        :key="slide.id"
        class="absolute inset-0 transition-all duration-500 ease-out"
        :class="current === i ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-[0.98] pointer-events-none'"
      >
        <div class="h-full flex flex-col md:flex-row">

          <!-- Left: use-case text -->
          <div class="flex flex-col justify-center px-8 md:px-10 py-8 md:w-[44%] shrink-0 gap-5 z-10">
            <div class="flex items-center gap-2.5">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Feature Highlight</span>
              <span class="text-zinc-300 dark:text-zinc-700">•</span>
              <span class="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{{ String(i + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</span>
            </div>
            <div class="space-y-2">
              <h3 class="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-snug">{{ slide.title }}</h3>
              <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">{{ slide.description }}</p>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in slide.tags"
                :key="tag"
                class="text-[11px] px-2.5 py-0.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-900/80 font-medium"
              >{{ tag }}</span>
            </div>
            <div class="pt-1">
              <button
                @click="openQuickAdd"
                class="w-fit text-xs px-4 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2 group"
              >
                <span>Get started</span>
                <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Right: Apple Minimal Visual Scene -->
          <div class="flex-1 relative overflow-hidden border-t md:border-t-0 md:border-l border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-xs flex items-center justify-center p-6">
            <!-- Subtle Apple Dot Grid Background Pattern -->
            <div class="absolute inset-0 opacity-40 dark:opacity-25 pointer-events-none bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] dark:bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
            
            <!-- Subtle Concentric Architectural Rings -->
            <div class="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 pointer-events-none opacity-60" />
            <div class="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 pointer-events-none opacity-60" />

            <!-- Corner Precision Marks -->
            <div class="absolute top-3 left-3 text-[10px] font-mono text-zinc-300 dark:text-zinc-800 pointer-events-none">+</div>
            <div class="absolute top-3 right-3 text-[10px] font-mono text-zinc-300 dark:text-zinc-800 pointer-events-none">+</div>
            <div class="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-300 dark:text-zinc-800 pointer-events-none">+</div>
            <div class="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-300 dark:text-zinc-800 pointer-events-none">+</div>

            <div class="w-full max-w-[340px] relative z-10">
              <component :is="slide.visual" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Apple-style Capsule Dot Nav -->
    <div class="flex items-center justify-center gap-2 py-3 border-t border-zinc-200/60 dark:border-zinc-800/60 shrink-0 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
      <button
        v-for="(_, i) in slides"
        :key="i"
        @click="goTo(i)"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="current === i ? 'w-6 bg-zinc-900 dark:bg-white' : 'w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, h } from 'vue';
import { useRouter } from 'vue-router';

import openaiSrc from '../assets/openai.svg';
import TimelineStaticMock from './slides/mocks/TimelineStaticMock.vue';

const router = useRouter();
const current = ref(0);
let timer = null;
const INTERVAL = 6000;

// Helper function to render Lucide-style SVG icons
const createSvgIcon = (d, className = 'w-3.5 h-3.5') => {
  return h('svg', {
    class: className,
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  }, [h('path', { d })]);
};

// ── Visual 1: AI Agent with memory ───────────────────────────────────────────
const AgentVisual = {
  render() {
    const memories = [
      { name: 'OAuth2 PKCE Architecture', tag: 'Arch', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
      { name: 'User preference: Vue 3 & Tailwind', tag: 'Config', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
      { name: 'PostgreSQL Schema v2.4', tag: 'DB', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
    ];
    return h('div', { class: 'space-y-3 font-sans' }, [
      // Card Container
      h('div', { class: 'bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden' }, [
        // Header bar with window dots
        h('div', { class: 'px-4 py-3 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50' }, [
          h('div', { class: 'flex items-center gap-2' }, [
            h('div', { class: 'flex gap-1.5' }, [
              h('div', { class: 'w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700' }),
              h('div', { class: 'w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700' }),
              h('div', { class: 'w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700' }),
            ]),
            h('span', { class: 'text-xs font-semibold text-zinc-900 dark:text-white ml-1' }, 'Memwyre Context'),
          ]),
          h('span', { class: 'text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 font-semibold border border-zinc-200/60 dark:border-zinc-700/60' }, '● 3 Injected'),
        ]),
        // Memories list
        h('div', { class: 'p-3 space-y-2' },
          memories.map((m, idx) =>
            h('div', {
              class: 'flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800',
              style: `animation: fadeSlideIn 0.4s ease ${idx * 0.08}s both`,
            }, [
              h('div', { class: 'flex items-center gap-2.5 min-w-0' }, [
                h('div', { class: 'w-6 h-6 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/50 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0' }, [
                  createSvgIcon(m.icon, 'w-3.5 h-3.5')
                ]),
                h('span', { class: 'text-xs text-zinc-800 dark:text-zinc-200 font-medium truncate' }, m.name),
              ]),
              h('span', { class: 'text-[9px] font-mono px-1.5 py-0.5 rounded text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-700/50 shrink-0' }, m.tag),
            ])
          )
        ),
      ]),
      // Active prompt preview card
      h('div', { class: 'bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm p-3.5 text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-3' }, [
        h('img', { src: openaiSrc, class: 'w-4 h-4 mt-0.5 shrink-0 text-zinc-900 dark:text-white' }),
        h('div', { class: 'space-y-1' }, [
          h('p', { class: 'font-semibold text-zinc-900 dark:text-white text-[11px]' }, 'Using injected OAuth2 architecture:'),
          h('p', { class: 'text-zinc-500 dark:text-zinc-400 leading-relaxed text-[11px]' }, 'Configured PKCE flow with 15-minute access token rotation and secure refresh storage.'),
        ]),
      ]),
    ]);
  }
};

// ── Visual 2: Company knowledge base ─────────────────────────────────────────
const CompanyKBVisual = {
  render() {
    const docs = [
      { title: 'Architecture-RFC-v2.md', tag: 'Engineering', size: '2.4 MB', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { title: 'Sales-Playbook-Q3.pdf', tag: 'Sales', size: '1.1 MB', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { title: 'Security-Compliance.docx', tag: 'Security', size: '840 KB', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { title: 'Design-Tokens-2026.json', tag: 'Design', size: '420 KB', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    ];
    return h('div', { class: 'bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden font-sans' }, [
      // Search / Header
      h('div', { class: 'px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50' }, [
        h('div', { class: 'flex items-center gap-2 text-zinc-500 dark:text-zinc-400' }, [
          createSvgIcon('M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', 'w-3.5 h-3.5'),
          h('span', { class: 'text-xs text-zinc-600 dark:text-zinc-400 font-medium' }, 'Search knowledge vault...'),
        ]),
        h('span', { class: 'text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded' }, '42 docs'),
      ]),
      // Docs list
      h('div', { class: 'divide-y divide-zinc-100 dark:divide-zinc-800/60' },
        docs.map(({ title, tag, size, icon }, idx) =>
          h('div', {
            class: 'flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors',
            style: `animation: fadeSlideIn 0.4s ease ${idx * 0.08}s both`,
          }, [
            h('div', { class: 'flex items-center gap-3 min-w-0' }, [
              h('div', { class: 'w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center text-zinc-600 dark:text-zinc-300 shrink-0' }, [
                createSvgIcon(icon, 'w-3.5 h-3.5')
              ]),
              h('div', { class: 'min-w-0' }, [
                h('p', { class: 'text-xs font-semibold text-zinc-900 dark:text-white truncate' }, title),
                h('p', { class: 'text-[10px] text-zinc-400 dark:text-zinc-500 font-mono' }, size),
              ]),
            ]),
            h('span', { class: 'text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60 shrink-0' }, tag),
          ])
        )
      ),
    ]);
  }
};

// ── Visual 3: Personal second brain ──────────────────────────────────────────
const TimelineSlideVisual = {
  render() {
    const timelineEvents = [
      {
        title: 'Captured OAuth2 Security Flow',
        source: 'ChatGPT',
        time: '10:42 AM',
        snippet: 'Token rotation with PKCE and 15-minute access token TTL',
        tag: 'Memory',
        icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      },
      {
        title: 'Indexed Architecture RFC v2',
        source: 'Claude 3.5',
        time: 'Yesterday',
        snippet: 'Microservices event queue & Redis caching strategy',
        tag: 'Vectorized',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      },
      {
        title: 'Dodo Payments Doc Saved',
        source: 'Web Capture',
        time: '3 days ago',
        snippet: 'Credit-based monetization and usage metering API specs',
        tag: 'Web',
        icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9'
      }
    ];

    return h('div', { class: 'bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden font-sans' }, [
      // Window Header
      h('div', { class: 'px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50' }, [
        h('div', { class: 'flex items-center gap-2' }, [
          h('div', { class: 'flex gap-1.5' }, [
            h('div', { class: 'w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700' }),
            h('div', { class: 'w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700' }),
            h('div', { class: 'w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700' }),
          ]),
          h('span', { class: 'text-xs font-semibold text-zinc-900 dark:text-white ml-1' }, 'Timeline Memory Stream'),
        ]),
        h('span', { class: 'text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded' }, '1,280 entries'),
      ]),
      // Timeline content with vertical connection line
      h('div', { class: 'p-3.5 relative space-y-3' }, [
        // Vertical line thread
        h('div', { class: 'absolute left-[25px] top-5 bottom-5 w-0.5 bg-zinc-200 dark:bg-zinc-800' }),
        ...timelineEvents.map((item, idx) =>
          h('div', {
            class: 'relative flex items-start gap-3 z-10',
            style: `animation: fadeSlideIn 0.4s ease ${idx * 0.08}s both`,
          }, [
            // Node point
            h('div', { class: 'w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5 shadow-xs' }, [
              createSvgIcon(item.icon, 'w-3 h-3')
            ]),
            // Card body
            h('div', { class: 'flex-1 bg-zinc-50/80 dark:bg-zinc-800/40 rounded-xl p-2.5 border border-zinc-100 dark:border-zinc-800 min-w-0 space-y-1' }, [
              h('div', { class: 'flex items-center justify-between gap-2' }, [
                h('p', { class: 'text-xs font-semibold text-zinc-900 dark:text-white truncate' }, item.title),
                h('span', { class: 'text-[9px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0' }, item.time),
              ]),
              h('p', { class: 'text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-snug' }, item.snippet),
              h('div', { class: 'flex items-center justify-between pt-1' }, [
                h('span', { class: 'text-[9px] text-zinc-400 dark:text-zinc-500 font-medium' }, item.source),
                h('span', { class: 'text-[9px] font-mono px-1.5 py-0.2 rounded bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400' }, item.tag),
              ])
            ])
          ])
        )
      ])
    ]);
  }
};

// ── Visual 4: Dev context manager ────────────────────────────────────────────
const DevContextVisual = {
  render() {
    const contexts = [
      { label: 'auth.ts — Token Refresh Logic', tag: 'TypeScript', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
      { label: 'schema.prisma — User Model', tag: 'Database', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4' },
      { label: 'api.config.json — Endpoints', tag: 'Config', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];
    return h('div', { class: 'space-y-3 font-sans' }, [
      // IDE Context Header Card
      h('div', { class: 'bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden' }, [
        h('div', { class: 'px-4 py-3 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50' }, [
          h('div', { class: 'flex items-center gap-2' }, [
            createSvgIcon('M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', 'w-4 h-4 text-zinc-700 dark:text-zinc-300'),
            h('span', { class: 'text-xs font-semibold text-zinc-900 dark:text-white' }, 'Claude 3.5 Sonnet'),
          ]),
          h('span', { class: 'text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono font-medium border border-zinc-200/60 dark:border-zinc-700/60' }, '98% relevance'),
        ]),
        h('div', { class: 'px-4 py-3' }, [
          h('div', { class: 'flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400' }, [
            h('span', { class: 'text-zinc-700 dark:text-zinc-200 font-mono' }, 'Fix refresh token race condition in auth.ts...'),
            h('div', { class: 'w-0.5 h-4 bg-zinc-400 dark:bg-zinc-500 rounded-sm animate-pulse' }),
          ]),
        ]),
      ]),
      // Context stack
      h('div', { class: 'space-y-2' },
        contexts.map(({ label, tag, icon }, idx) =>
          h('div', {
            class: 'flex items-center justify-between px-3 py-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xs',
            style: `animation: fadeSlideIn 0.4s ease ${idx * 0.08}s both`,
          }, [
            h('div', { class: 'flex items-center gap-2.5 min-w-0' }, [
              h('div', { class: 'w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 shrink-0 border border-zinc-200/50 dark:border-zinc-700/50' }, [
                createSvgIcon(icon, 'w-3 h-3')
              ]),
              h('span', { class: 'text-xs text-zinc-800 dark:text-zinc-200 font-medium truncate' }, label),
            ]),
            h('span', { class: 'text-[9px] font-mono px-1.5 py-0.5 rounded text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 shrink-0' }, tag),
          ])
        )
      ),
    ]);
  }
};

// ── Slides config ─────────────────────────────────────────────────────────────
const slides = [
  {
    id: 'agent',
    title: 'Build AI agents with memory',
    description: 'Give your AI agents persistent context. They remember what you\'ve built, decided, and learned across every coding session.',
    tags: ['#agents', '#memory', '#ChatGPT', '#Claude'],
    visual: AgentVisual,
  },
  {
    id: 'company-kb',
    title: 'Company knowledge base',
    description: 'Centralize RFCs, playbooks, and policies. Every teammate\'s AI tool pulls from the same verified source of truth.',
    tags: ['#teams', '#knowledge', '#onboarding', '#docs'],
    visual: CompanyKBVisual,
  },
  {
    id: 'second-brain',
    title: 'Your personal second brain',
    description: 'Every insight, code snippet, and conversation saved automatically. Query your entire knowledge history from any AI tool.',
    tags: ['#personal', '#notes', '#research', '#PKM'],
    visual: TimelineSlideVisual,
  },
  {
    id: 'dev-context',
    title: 'Never lose dev context again',
    description: 'Save architecture decisions, API specs, and coding standards. Inject them into any AI coding tool with one click.',
    tags: ['#developers', '#architecture', '#Cursor', '#Copilot'],
    visual: DevContextVisual,
  },
];

// ── Carousel logic ────────────────────────────────────────────────────────────
const advance = () => { current.value = (current.value + 1) % slides.length; };
const goTo = (i) => { current.value = i; restart(); };
const pause = () => clearInterval(timer);
const resume = () => { clearInterval(timer); timer = setInterval(advance, INTERVAL); };
const restart = () => { clearInterval(timer); timer = setInterval(advance, INTERVAL); };
const openQuickAdd = () => router.push({ query: { quick_add: 'documents' } });

onMounted(() => { timer = setInterval(advance, INTERVAL); });
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>

