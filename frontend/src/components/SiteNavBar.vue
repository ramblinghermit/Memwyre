<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isSolidNav = computed(() => {
  const p = route.path;
  return p !== '/' && p !== '';
});

const isScrolled = ref(false);
const navHidden = ref(false);
let lastScrollY = 0;
let accumulatedScrollUp = 0;

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    const currentScrollY = Math.max(0, window.scrollY);
    isScrolled.value = currentScrollY > 20;

    // Hide/show on scroll direction — only on the landing page
    if (!isSolidNav.value) {
      if (currentScrollY <= 20) {
        // At the top of the landing page, always show the transparent hero navbar
        navHidden.value = false;
        accumulatedScrollUp = 0;
      } else if (currentScrollY > lastScrollY) {
        // Scrolling DOWN on the landing page:
        // Always hide and reset scroll-up accumulator so it never flickers or reappears
        navHidden.value = true;
        accumulatedScrollUp = 0;
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP on the landing page:
        // Accumulate scroll-up delta to prevent micro-jitters/bounces from triggering it
        accumulatedScrollUp += (lastScrollY - currentScrollY);
        if (accumulatedScrollUp > 60) {
          navHidden.value = false;
        }
      }
    } else {
      // Everywhere else: navbar remains visible
      navHidden.value = false;
      accumulatedScrollUp = 0;
    }

    lastScrollY = currentScrollY;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});

const scrollToSection = (hash) => {
  closeAll();
  isMobileMenuOpen.value = false;
  if (route.path === '/' || route.path === '') {
    navHidden.value = true;
    accumulatedScrollUp = 0;
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    router.push({ path: '/', hash });
  }
};

const isProductsOpen = ref(false);
const isResourcesOpen = ref(false);
const isMobileMenuOpen = ref(false);

let closeTimer = null;

const openDropdown = (type) => {
  if (closeTimer) clearTimeout(closeTimer);
  if (type === 'products') {
    isProductsOpen.value = true;
    isResourcesOpen.value = false;
  } else if (type === 'resources') {
    isResourcesOpen.value = true;
    isProductsOpen.value = false;
  }
};

const toggleDropdown = (type) => {
  if (type === 'products') {
    isProductsOpen.value = !isProductsOpen.value;
    if (isProductsOpen.value) isResourcesOpen.value = false;
  } else if (type === 'resources') {
    isResourcesOpen.value = !isResourcesOpen.value;
    if (isResourcesOpen.value) isProductsOpen.value = false;
  }
};

const scheduleClose = () => {
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    isProductsOpen.value = false;
    isResourcesOpen.value = false;
  }, 140);
};

const cancelClose = () => {
  if (closeTimer) clearTimeout(closeTimer);
};

const closeAll = () => {
  if (closeTimer) clearTimeout(closeTimer);
  isProductsOpen.value = false;
  isResourcesOpen.value = false;
};

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};

onUnmounted(() => {
  if (closeTimer) clearTimeout(closeTimer);
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});

// Reset state on route change
watch(() => route.path, () => {
  closeAll();
  isMobileMenuOpen.value = false;
  navHidden.value = false;
  accumulatedScrollUp = 0;
  lastScrollY = typeof window !== 'undefined' ? Math.max(0, window.scrollY) : 0;
});

const products = [
  {
    name: 'Connectors',
    desc: 'Knowledge ingestion from GitHub, Slack, Notion & Google Drive.',
    to: '/connectors',
    badge: 'Popular',
    iconType: 'connectors'
  },
  {
    name: 'MCP Servers',
    desc: 'Persistent memory server for Cursor, Claude Code, Windsurf & Cline.',
    to: '/mcp',
    badge: 'Open Standard',
    iconType: 'mcp'
  },
  {
    name: 'Chrome Extension',
    desc: 'Ingest ChatGPT, Claude, and Perplexity web sessions in real time.',
    to: '/extension',
    iconType: 'extension'
  },
  {
    name: 'IDE & CLI Plugins',
    desc: 'Native integrations for VS Code, JetBrains, and terminal agents.',
    to: '/plugins',
    iconType: 'plugins'
  }
];

const resourceSections = [
  {
    title: 'Research & Science',
    items: [
      {
        name: 'Research Hub',
        desc: 'Architectures for autonomous agent memory systems.',
        to: '/research'
      },
      {
        name: 'LoCoMo Benchmark',
        desc: 'Multi-session recall accuracy vs vector databases.',
        to: '/ai-memory-benchmark-locomo'
      },
      {
        name: 'RAG vs Persistent Memory',
        desc: 'Why classic vector search fails stateful coding agents.',
        to: '/rag-vs-memory-long-term-knowledge'
      },
      {
        name: 'State of AI Memory 2026',
        desc: 'Comprehensive industry landscape and evaluation report.',
        to: '/state-of-ai-memory-2026'
      }
    ]
  },
  {
    title: 'Ecosystem & Guides',
    items: [
      {
        name: 'Claude Code Memory',
        desc: 'Cross-repo persistent memory and automatic note sync.',
        to: '/claude-memory'
      },
      {
        name: 'Cursor & Windsurf',
        desc: 'Zero-config persistent context via MCP.',
        to: '/cursor-memory'
      },
      {
        name: 'ChatGPT & Web Session',
        desc: 'Shared cross-tool memory layer.',
        to: '/chatgpt-memory'
      },
      {
        name: 'OpenClaw & Agents',
        desc: 'Autonomous agent memory infrastructure.',
        to: '/openclaw-memory'
      }
    ]
  },
  {
    title: 'Learn & Compare',
    items: [
      {
        name: 'Engineering Blog',
        desc: 'Technical deep-dives, updates, and releases.',
        to: '/blog'
      },
      {
        name: 'Documentation',
        desc: 'API references, quickstart SDKs, and CLI guides.',
        href: 'https://docs.memwyre.tech',
        external: true
      },
      {
        name: 'Memwyre vs Mem0',
        desc: 'Architectural, latency, and token efficiency analysis.',
        to: '/memwyre-vs-mem0'
      },
      {
        name: 'Memwyre vs Zep',
        desc: 'Retrieval accuracy and benchmark comparison.',
        to: '/memwyre-vs-zep'
      }
    ]
  }
];
</script>

<template>
  <header 
    class="top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
    :class="[
      isSolidNav || isScrolled
        ? 'fixed bg-white border-b border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]' 
        : (isMobileMenuOpen ? 'absolute bg-white shadow-xs' : 'absolute bg-transparent'),
      navHidden && !isMobileMenuOpen ? '-translate-y-full pointer-events-none' : 'translate-y-0'
    ]"
  >
    <div class="w-full px-4 sm:px-6 lg:px-12">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group">
          <img src="/logo.png" alt="Memwyre"
            class="h-[35px] w-auto dark:invert transition-transform duration-300 group-hover:scale-[1.02]" />
        </router-link>

        <!-- Desktop Navigation Items -->
        <div class="hidden lg:flex items-center gap-1 text-[14px]">
          <!-- 1. Products Dropdown -->
          <div 
            class="relative" 
            @mouseenter="openDropdown('products')" 
            @mouseleave="scheduleClose"
            v-click-outside="closeAll"
          >
            <button 
              @click="toggleDropdown('products')" 
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-neutral-800 hover:text-black hover:bg-black/[0.04] transition-colors focus:outline-none"
              :class="{ 'bg-black/[0.05] text-black font-medium': isProductsOpen }"
            >
              <span>Products</span>
              <svg 
                class="w-3.5 h-3.5 transition-transform duration-200 text-neutral-400 group-hover:text-black" 
                :class="{ 'rotate-180 text-black': isProductsOpen }" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <transition
              enter-active-class="transition ease-out duration-150"
              enter-from-class="transform opacity-0 -translate-y-1 scale-[0.98]"
              enter-to-class="transform opacity-100 translate-y-0 scale-100"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="transform opacity-100 translate-y-0 scale-100"
              leave-to-class="transform opacity-0 -translate-y-1 scale-[0.98]"
            >
              <div 
                v-if="isProductsOpen" 
                class="absolute left-0 top-full pt-2 z-50 w-[380px]"
                @mouseenter="cancelClose"
                @mouseleave="scheduleClose"
              >
                <div class="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.14),0_4px_16px_-4px_rgba(0,0,0,0.04)] p-3">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2 px-2 pt-1">
                    Platform & Interfaces
                  </div>
                  <div class="space-y-1">
                    <router-link 
                      v-for="product in products" 
                      :key="product.name" 
                      :to="product.to" 
                      class="group flex items-start gap-3 p-2 rounded-xl hover:bg-neutral-100/70 transition-colors duration-150"
                      @click="closeAll"
                    >
                      <!-- Monochrome Minimal Icon Box -->
                      <div class="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-150 mt-0.5">
                        <!-- Connectors Icon -->
                        <svg v-if="product.iconType === 'connectors'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <!-- MCP Protocol Icon -->
                        <svg v-else-if="product.iconType === 'mcp'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <!-- Chrome Extension Icon -->
                        <svg v-else-if="product.iconType === 'extension'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <!-- Plugins Icon -->
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>

                      <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-semibold text-neutral-900 group-hover:text-black">{{ product.name }}</span>
                          <span v-if="product.badge" class="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-mono">{{ product.badge }}</span>
                        </div>
                        <p class="text-xs text-neutral-500 leading-snug mt-0.5 group-hover:text-neutral-700">{{ product.desc }}</p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- 2. Resources Dropdown (Inspired by Notion & Mem0) -->
          <div 
            class="relative" 
            @mouseenter="openDropdown('resources')" 
            @mouseleave="scheduleClose"
            v-click-outside="closeAll"
          >
            <button 
              @click="toggleDropdown('resources')" 
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-neutral-800 hover:text-black hover:bg-black/[0.04] transition-colors focus:outline-none"
              :class="{ 'bg-black/[0.05] text-black font-medium': isResourcesOpen }"
            >
              <span>Resources</span>
              <svg 
                class="w-3.5 h-3.5 transition-transform duration-200 text-neutral-400 group-hover:text-black" 
                :class="{ 'rotate-180 text-black': isResourcesOpen }" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <transition
              enter-active-class="transition ease-out duration-150"
              enter-from-class="transform opacity-0 -translate-y-1 scale-[0.98]"
              enter-to-class="transform opacity-100 translate-y-0 scale-100"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="transform opacity-100 translate-y-0 scale-100"
              leave-to-class="transform opacity-0 -translate-y-1 scale-[0.98]"
            >
              <div 
                v-if="isResourcesOpen" 
                class="absolute left-[-150px] top-full pt-2 z-50 w-[720px]"
                @mouseenter="cancelClose"
                @mouseleave="scheduleClose"
              >
                <div class="rounded-2xl bg-white border border-neutral-200/90 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.14),0_4px_16px_-4px_rgba(0,0,0,0.04)] p-5 grid grid-cols-3 gap-6">
                  <!-- Column 1: Research & Science -->
                  <div>
                    <div class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2.5 px-2">
                      {{ resourceSections[0].title }}
                    </div>
                    <div class="space-y-1">
                      <router-link
                        v-for="item in resourceSections[0].items"
                        :key="item.name"
                        :to="item.to"
                        class="group block p-2 rounded-xl hover:bg-neutral-100/70 transition-colors duration-150"
                        @click="closeAll"
                      >
                        <div class="text-sm font-semibold text-neutral-900 group-hover:text-black">{{ item.name }}</div>
                        <p class="text-xs text-neutral-500 leading-snug mt-0.5 group-hover:text-neutral-700">{{ item.desc }}</p>
                      </router-link>
                    </div>
                  </div>

                  <!-- Column 2: Ecosystem & Guides -->
                  <div>
                    <div class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2.5 px-2">
                      {{ resourceSections[1].title }}
                    </div>
                    <div class="space-y-1">
                      <router-link
                        v-for="item in resourceSections[1].items"
                        :key="item.name"
                        :to="item.to"
                        class="group block p-2 rounded-xl hover:bg-neutral-100/70 transition-colors duration-150"
                        @click="closeAll"
                      >
                        <div class="text-sm font-semibold text-neutral-900 group-hover:text-black">{{ item.name }}</div>
                        <p class="text-xs text-neutral-500 leading-snug mt-0.5 group-hover:text-neutral-700">{{ item.desc }}</p>
                      </router-link>
                    </div>
                  </div>

                  <!-- Column 3: Learn & Compare -->
                  <div>
                    <div class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2.5 px-2">
                      {{ resourceSections[2].title }}
                    </div>
                    <div class="space-y-1">
                      <template v-for="item in resourceSections[2].items" :key="item.name">
                        <a
                          v-if="item.external"
                          :href="item.href"
                          target="_blank"
                          class="group block p-2 rounded-xl hover:bg-neutral-100/70 transition-colors duration-150"
                          @click="closeAll"
                        >
                          <div class="flex items-center gap-1 text-sm font-semibold text-neutral-900 group-hover:text-black">
                            <span>{{ item.name }}</span>
                            <svg class="w-3 h-3 text-neutral-400 group-hover:text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                          <p class="text-xs text-neutral-500 leading-snug mt-0.5 group-hover:text-neutral-700">{{ item.desc }}</p>
                        </a>
                        <router-link
                          v-else
                          :to="item.to"
                          class="group block p-2 rounded-xl hover:bg-neutral-100/70 transition-colors duration-150"
                          @click="closeAll"
                        >
                          <div class="text-sm font-semibold text-neutral-900 group-hover:text-black">{{ item.name }}</div>
                          <p class="text-xs text-neutral-500 leading-snug mt-0.5 group-hover:text-neutral-700">{{ item.desc }}</p>
                        </router-link>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <router-link 
            to="/#how-it-works"
            class="px-3 py-1.5 text-sm font-normal transition-colors rounded-lg text-neutral-800 hover:text-black hover:bg-black/[0.04]"
            @click="scrollToSection('#how-it-works')"
          >
            How it Works
          </router-link>

          <router-link 
            to="/#ecosystem"
            class="px-3 py-1.5 text-sm font-normal transition-colors rounded-lg text-neutral-800 hover:text-black hover:bg-black/[0.04]"
            @click="scrollToSection('#ecosystem')"
          >
            Ecosystem
          </router-link>

          <router-link 
            to="/pricing"
            class="px-3 py-1.5 text-sm font-normal transition-colors rounded-lg text-neutral-800 hover:text-black hover:bg-black/[0.04]"
          >
            Pricing
          </router-link>

          <a 
            href="https://docs.memwyre.tech" 
            target="_blank"
            class="px-3 py-1.5 text-sm font-normal transition-colors rounded-lg text-neutral-800 hover:text-black hover:bg-black/[0.04]"
          >
            Docs
          </a>
        </div>

        <!-- Action CTAs -->
        <div class="flex items-center gap-2 sm:gap-3">
          <a 
            href="https://app.memwyre.tech/login"
            class="hidden lg:inline-block text-sm font-normal transition-colors duration-200 text-black/60 hover:text-black px-2 py-1"
          >
            Log in
          </a>
          <a 
            href="https://app.memwyre.tech/signup"
            class="hidden sm:inline-block px-3.5 py-1.5 sm:px-4 sm:py-2 bg-black text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-xs"
          >
            Start Free
          </a>

          <!-- Hamburger Menu Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            class="lg:hidden p-1.5 text-black hover:bg-black/5 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                v-if="!isMobileMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 -translate-y-4"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="lg:hidden bg-white border-t border-black/5 px-6 py-5 space-y-5 shadow-xl max-h-[85vh] overflow-y-auto"
      >
        <!-- Products Section -->
        <div class="space-y-2">
          <div class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">Platform & Products</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <router-link 
              v-for="product in products" 
              :key="product.name" 
              :to="product.to" 
              class="block p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
              @click="isMobileMenuOpen = false"
            >
              <div class="text-sm font-semibold text-neutral-900">{{ product.name }}</div>
              <div class="text-xs text-neutral-500 leading-snug mt-0.5">{{ product.desc }}</div>
            </router-link>
          </div>
        </div>
        
        <hr class="border-black/5" />

        <!-- Resources Section -->
        <div class="space-y-2">
          <div class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">Research & Resources</div>
          <div class="grid grid-cols-2 gap-2 text-sm pt-1">
            <router-link to="/research" class="py-1 text-neutral-800 hover:text-black font-medium" @click="isMobileMenuOpen = false">Research Hub</router-link>
            <router-link to="/ai-memory-benchmark-locomo" class="py-1 text-neutral-800 hover:text-black font-medium" @click="isMobileMenuOpen = false">LoCoMo Benchmark</router-link>
            <router-link to="/blog" class="py-1 text-neutral-800 hover:text-black font-medium" @click="isMobileMenuOpen = false">Engineering Blog</router-link>
            <a href="https://docs.memwyre.tech" target="_blank" class="py-1 text-neutral-800 hover:text-black font-medium" @click="isMobileMenuOpen = false">Documentation ↗</a>
            <router-link to="/memwyre-vs-mem0" class="py-1 text-neutral-800 hover:text-black font-medium" @click="isMobileMenuOpen = false">Memwyre vs Mem0</router-link>
            <router-link to="/claude-memory" class="py-1 text-neutral-800 hover:text-black font-medium" @click="isMobileMenuOpen = false">Claude Code Memory</router-link>
          </div>
        </div>

        <hr class="border-black/5" />

        <!-- Direct Links -->
        <div class="space-y-2 text-[15px] font-medium text-neutral-900">
          <router-link 
            to="/#how-it-works"
            class="block py-1 hover:text-black transition-colors"
            @click="scrollToSection('#how-it-works')"
          >
            How it Works
          </router-link>
          <router-link 
            to="/#ecosystem"
            class="block py-1 hover:text-black transition-colors"
            @click="scrollToSection('#ecosystem')"
          >
            Ecosystem
          </router-link>
          <router-link 
            to="/pricing"
            class="block py-1 hover:text-black transition-colors"
            @click="isMobileMenuOpen = false"
          >
            Pricing
          </router-link>
        </div>

        <hr class="border-black/5" />

        <!-- Mobile CTAs -->
        <div class="pt-2 space-y-2.5">
          <a 
            href="https://app.memwyre.tech/signup"
            class="block w-full text-center px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-xs"
            @click="isMobileMenuOpen = false"
          >
            Start Free
          </a>
          <a 
            href="https://app.memwyre.tech/login"
            class="block w-full text-center px-4 py-2 border border-black/10 text-black text-sm font-medium rounded-lg hover:bg-black/5 transition-colors"
            @click="isMobileMenuOpen = false"
          >
            Log in
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
