<template>
  <div
    class="force-light relative min-h-[100svh] bg-white text-text-primary transition-colors duration-300 font-sans [overflow-x:clip] selection:bg-primary selection:text-white *:selection:bg-primary *:selection:text-white">

    <!-- Global Vertical Grid Lines -->
    <div class="hidden lg:block absolute top-0 bottom-0 left-6 sm:left-8 lg:left-[calc(50%-640px)] w-px bg-gray-300/80 pointer-events-none select-none z-30"></div>
    <div class="hidden lg:block absolute top-0 bottom-0 right-6 sm:right-8 lg:right-[calc(50%-640px)] w-px bg-gray-300/80 pointer-events-none select-none z-30"></div>

    <!-- Hero Section -->
    <div data-theme="light"
      class="hero-wash relative z-40 pt-16 sm:pt-24 lg:pt-12 pb-10 sm:pb-20 overflow-hidden min-h-[calc(100svh-88px)] flex items-center">

      <div class="absolute inset-0 z-0 hero-grain pointer-events-none"></div>

      <!-- Layout Grid Lines (Behind Hero Animation) -->
      <div class="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <!-- Hero Side Vertical Grid Lines -->
        <div class="hidden lg:block absolute top-0 bottom-0 left-6 sm:left-8 lg:left-[calc(50%-640px)] w-px bg-gray-300/80 pointer-events-none select-none"></div>
        <div class="hidden lg:block absolute top-0 bottom-0 right-6 sm:right-8 lg:right-[calc(50%-640px)] w-px bg-gray-300/80 pointer-events-none select-none"></div>
        <!-- Center column divider line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden lg:block"></div>
      </div>

      <!-- Background Animation Layer (Above Vertical Lines) -->
      <div
        class="hero-animation-layer absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-center justify-end"
        :class="{ 'hero-animation-layer-ready': heroAnimationReady }"
        :style="heroAnimationStyle"
        aria-hidden="true">
        <div class="relative w-full lg:w-1/2 h-full flex items-center justify-center">
          <ProcessorAnimation v-if="heroAnimationMounted" />
        </div>
      </div>

      <div
        class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-20 w-full">

        <div class="lg:col-span-6 text-left pt-6 pb-6 sm:pt-12 lg:pt-0 lg:mt-[20px] lg:ml-10 px-0 sm:px-4 -translate-y-6 md:-translate-y-4 lg:translate-y-0">

          <h1
            class="animate-fade-in-up hero-serif text-4xl sm:text-5xl md:text-5xl lg:text-[70px] tracking-[-0.02em] leading-[1.1] lg:leading-[78px] text-[rgb(1,1,16)] max-w-4xl">
            Your AI <br class="hidden md:block" />should <span class="italic font-medium">remember <span class="inline-block bg-[#D97756] text-white px-3 py-0.5 italic font-medium">everything.</span></span>
          </h1>

          <p
            class="animate-fade-in-up animation-delay-150 text-balance text-base text-gray-600 leading-relaxed mt-4 sm:mt-5 max-w-2xl font-normal">
            Memwyre is the AI Memory Platform that gives every AI tool, agent, and conversation a persistent, shared memory.
          </p>

          <!-- Unified Buttons and Installer Container for symmetry -->
          <div class="flex flex-col gap-3 mt-6 sm:mt-8 max-w-[340px] sm:max-w-[380px] w-full animate-fade-in-up animation-delay-300 z-20">
            <!-- Buttons -->
            <div class="flex flex-row items-center justify-start gap-3 sm:gap-4 w-full">
              <router-link to="/signup/"
                class="flex-1 px-4 py-2.5 bg-[#050614] text-white font-bold sm:font-semibold lg:font-bold rounded-md hover:bg-gray-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 transition-all duration-200 shadow-md text-xs sm:text-sm lg:text-base inline-flex items-center justify-center text-center">
                Get Started
              </router-link>
              <router-link to="/#pricing"
                class="flex-1 px-4 py-2.5 bg-white text-[#050614] font-bold sm:font-semibold lg:font-bold rounded-md border border-gray-250 hover:bg-gray-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 transition-all duration-200 text-xs sm:text-sm lg:text-base inline-flex items-center justify-center text-center">
                See Plans
              </router-link>
            </div>

            <!-- Command Installer Codeblock in Hero -->
            <div class="relative bg-gray-50 border border-dashed border-gray-300 rounded-md p-3.5 font-mono text-[11px] sm:text-xs text-gray-800 flex items-center justify-between gap-3 w-full select-none">
              <div class="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none select-all py-0.5">
                <span class="text-[#D97756] select-none font-bold">$</span>
                <span>npx -y install-memwyre</span>
              </div>
              <button 
                @click="copyHeroCommand" 
                class="text-[#D97756] hover:text-[#C4654A] font-semibold text-[10px] sm:text-xs tracking-wider uppercase shrink-0 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40 rounded px-1"
              >
                {{ heroCommandCopied ? 'Copied' : 'Copy' }}
              </button>
            </div>
          </div>

        </div>

        <div class="hidden lg:block lg:col-span-6 relative min-h-[650px] pointer-events-none" aria-hidden="true">
        </div>

      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>


    <!-- Product Features Section (Brought to first place below Hero) -->
    <div id="features" data-theme="light" class="relative z-20 pt-0 pb-10 md:pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">

        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-8 md:mb-12">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ PRODUCT FEATURES</div>
            <div>[1/9]</div>
          </div>
        </div>

        <!-- 2-Column Tabbed Showcase -->
        <div ref="showcaseContainer" class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <!-- Left Column: Tabs List -->
          <div class="lg:col-span-5 flex flex-col h-full">
            <h2 class="hero-serif text-3xl sm:text-5xl lg:text-[56px] tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mb-4 md:mb-6 px-1">
              All the tools to <span class="italic font-medium text-[#D97756]">make AI remember.</span>
            </h2>
            <p class="text-base text-gray-500 leading-relaxed font-normal mb-8 px-1">
              Every feature you need to capture, organize, and query your shared memory platform seamlessly across your workflow.
            </p>

            <!-- Tabs Navigation -->
            <div class="border-t border-gray-300/80 flex flex-col">
              <button
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectTab(index)"
                :class="[
                  'w-full text-left py-4 px-4 border-b border-gray-300/80 transition-all duration-300 flex items-center justify-between group relative border-l-2',
                  activeTab === index 
                    ? 'border-l-[#D97756] bg-gray-50/50 text-gray-900 font-bold' 
                    : 'border-l-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/30'
                ]"
              >
                <div class="flex items-center gap-4">
                  <span :class="[
                    'text-xs font-mono font-bold transition-colors',
                    activeTab === index ? 'text-[#D97756]' : 'text-gray-300 group-hover:text-gray-400'
                  ]">{{ tab.num }}</span>
                  <span class="text-base tracking-tight">{{ tab.tabTitle }}</span>
                </div>
                <!-- Small orange indicator square when active -->
                <span v-if="activeTab === index" class="w-1.5 h-1.5 bg-[#D97756] rounded-sm shrink-0"></span>
                <!-- Progress bar line absolute at bottom -->
                <div
                  v-if="activeTab === index"
                  class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D97756] pointer-events-none origin-left"
                  :style="{ 
                    transform: `scaleX(${progressWidth / 100})`,
                    transition: progressWidth === 0 ? 'none' : 'transform 50ms linear'
                  }"
                ></div>
              </button>
            </div>
          </div>

          <!-- Right Column: Active Visual & Details -->
          <div class="lg:col-span-7 flex flex-col">
            <!-- Premium Video Wrapper -->
            <div class="rounded-md overflow-hidden shadow-xl border border-gray-200 relative aspect-[16/10] bg-black">
              <video
                v-for="(tab, index) in tabs"
                :key="index"
                :ref="el => { if (el) videoRefs[index] = el }"
                v-show="activeTab === index"
                class="w-full h-full object-cover"
                muted
                playsinline
                :preload="activeTab === index ? 'auto' : 'none'"
                :src="activeTab === index || loadedTabs.has(index) ? tab.videoSrc : ''"
                @ended="onVideoEnded"
              >
              </video>
            </div>

            <!-- Active Tab Content Details -->
            <div class="mt-8 sm:mt-10 text-left px-1">
              <div class="text-xs font-bold text-[#D97756] tracking-widest uppercase mb-3 font-mono">
                {{ tabs[activeTab].label }}
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {{ tabs[activeTab].title }}
              </h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {{ tabs[activeTab].bodyText }}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    <!-- WHAT WE DO Section -->
    <div id="what-we-do" data-theme="light" class="relative z-20 pt-0 pb-10 md:pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">

        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-8 md:mb-12">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ WHAT WE DO</div>
            <div>[2/9]</div>
          </div>
        </div>

        <!-- Hero Headline -->
        <div class="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-[56px] tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mb-4 md:mb-5">
            Bring your knowledge <span class="inline-flex items-center align-middle mx-1.5 -translate-y-0.5"><img src="/favicon-192.png" alt="Memwyre" class="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full shadow-sm object-contain" /></span> <span class="italic font-medium text-[#D97756]">We build memory.</span> Your AI just knows
          </h2>
          <p class="text-base text-gray-500 leading-relaxed font-normal max-w-2xl mx-auto">
            Persistent memory infrastructure for AI agents. One platform, every capability.
          </p>
        </div>

        <!-- Two-Column Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          <!-- LEFT CARD: For Developers & Teams (Liquid Glass Aura Glow) -->
          <div class="group relative text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[480px] shadow-[0_20px_50px_-15px_rgba(230,60,0,0.35)] border border-white/40 hover:border-white/60 transition-colors duration-700 ease-out">
            <!-- Liquid Glass Phone Background with subtle hover dynamics -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <!-- Base vibrant sunset-to-electric-orange liquid gradient -->
              <div class="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105" style="background: linear-gradient(145deg, #FFA056 0%, #FF6618 30%, #FF3D00 65%, #CF1B00 100%);"></div>

              <!-- Top-right warm golden peach ambient light -->
              <div class="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:translate-x-2 group-hover:-translate-y-2" style="background: radial-gradient(circle at 85% 15%, rgba(255, 220, 165, 0.75) 0%, rgba(255, 155, 65, 0.35) 40%, transparent 70%);"></div>

              <!-- Soft organic fluid body reflection (mimics the liquid glass phone back) -->
              <div class="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:translate-y-2 opacity-100 group-hover:opacity-90" style="background: radial-gradient(ellipse 60% 85% at 38% 50%, rgba(255, 130, 45, 0.6) 0%, rgba(255, 75, 0, 0.25) 50%, transparent 80%);"></div>

              <!-- Bottom radiant fiery red-orange glow -->
              <div class="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-105" style="background: radial-gradient(circle at 50% 110%, rgba(255, 35, 0, 0.85) 0%, rgba(205, 20, 0, 0.35) 50%, transparent 80%);"></div>

              <!-- Luminous center vertical liquid light beam -->
              <div class="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-y-110 group-hover:opacity-90" style="background: radial-gradient(ellipse 28% 90% at 50% 45%, rgba(255, 235, 205, 0.5) 0%, rgba(255, 185, 125, 0.22) 45%, transparent 85%);"></div>

              <!-- Diagonal liquid glass specular reflection sheen -->
              <div class="absolute inset-0 transition-all duration-700 ease-out group-hover:opacity-90" style="background: linear-gradient(125deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 24%, transparent 48%, rgba(255, 255, 255, 0.1) 72%, transparent 100%);"></div>

              <!-- Subtle passing specular light streak on hover -->
              <div class="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-45 translate-x-[-120%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

              <!-- Inner glass bevel & border rim highlight -->
              <div class="absolute inset-0 rounded-2xl transition-all duration-700 ease-out" style="box-shadow: inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.2), inset 0 0 35px rgba(255, 175, 85, 0.25);"></div>
            </div>

            <div class="relative z-10 flex flex-col h-full">
              <!-- Label -->
              <div class="flex items-center gap-2 mb-6">
                <div class="w-6 h-6 rounded-md bg-white/20 backdrop-blur-md border border-white/40 group-hover:border-white/60 flex items-center justify-center shadow-xs transition-colors duration-500">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <span class="text-[11px] font-bold tracking-[0.15em] uppercase text-white/95 drop-shadow-xs">For Developers & Teams</span>
              </div>

              <!-- Title -->
              <h3 class="hero-serif text-[28px] sm:text-[34px] tracking-[-0.02em] leading-[1.15] text-white mb-4 drop-shadow-sm">
                The Memwyre MCP Server
              </h3>

              <!-- Description -->
              <p class="text-sm sm:text-base text-white/90 leading-relaxed mb-8 max-w-md drop-shadow-xs font-normal">
                State-of-the-art retrieval and memory. Semantic search, fact extraction, and context pruning. One MCP server, every AI tool connected.
              </p>

              <!-- Stats Row -->
              <div class="grid grid-cols-2 gap-3 mb-8 w-full">
                <div class="bg-white/20 group-hover:bg-white/25 backdrop-blur-md border border-white/35 group-hover:border-white/50 rounded-xl px-4 sm:px-5 py-3.5 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500">
                  <div class="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-xs">70.5%</div>
                  <div class="text-[10px] font-bold tracking-[0.12em] uppercase text-white/90 mt-1">LOCOMO ACCURACY</div>
                </div>
                <div class="bg-white/20 group-hover:bg-white/25 backdrop-blur-md border border-white/35 group-hover:border-white/50 rounded-xl px-4 sm:px-5 py-3.5 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-500">
                  <div class="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-xs">81%</div>
                  <div class="text-[10px] font-bold tracking-[0.12em] uppercase text-white/90 mt-1">TOKEN REDUCTION</div>
                </div>
              </div>

              <!-- Tech badges -->
              <p class="text-xs text-white/85 font-medium mb-8 drop-shadow-xs">
                Self-hostable · Model-agnostic · TypeScript & Python SDKs
              </p>

              <!-- CTA -->
              <div class="mt-auto">
                <router-link to="/signup/" class="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-white text-gray-950 font-bold text-sm rounded-xl hover:bg-orange-50 active:scale-[0.98] transition-all duration-300 shadow-md group-hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2">
                  <span>Start building in 5 minutes</span>
                  <svg class="w-4 h-4 text-gray-950 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </router-link>
              </div>
            </div>
          </div>

          <!-- RIGHT CARD: For Everyone (Light) -->
          <div class="group relative bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[480px] shadow-sm hover:shadow-md transition-shadow duration-300">

            <div class="flex flex-col h-full">
              <!-- Label -->
              <div class="flex items-center gap-2 mb-6">
                <div class="w-6 h-6 rounded-md bg-[#D97756]/10 border border-[#D97756]/20 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-[#D97756]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <span class="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400">For Everyone</span>
              </div>

              <!-- Title -->
              <h3 class="hero-serif text-[28px] sm:text-[34px] tracking-[-0.02em] leading-[1.15] text-[rgb(1,1,16)] mb-4">
                Personal AI Memory
              </h3>

              <!-- Description -->
              <p class="text-sm sm:text-base text-gray-500 leading-relaxed mb-8 max-w-md">
                One memory across everything you use. What you teach one AI, every AI remembers.
              </p>

              <!-- Integration Items -->
              <div class="flex flex-col gap-0 border-t border-gray-200 mb-8">
                <!-- Memwyre Dashboard -->
                <div class="flex items-center justify-between py-3.5 border-b border-gray-100">
                  <div class="flex items-center gap-3">
                    <img src="/favicon-192.png" alt="Memwyre" class="w-5 h-5 object-contain" />
                    <span class="text-sm font-semibold text-gray-800">Memwyre Dashboard</span>
                  </div>
                  <span class="text-xs text-gray-400 font-medium">Control panel</span>
                </div>

                <!-- AI Editors -->
                <div class="flex items-center justify-between py-3.5 border-b border-gray-100">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center -space-x-1">
                      <img src="@/assets/cursor_CUBE_2D_LIGHT.svg" alt="Cursor" class="w-4.5 h-4.5 object-contain" />
                      <img src="@/assets/vscode.svg" alt="VS Code" class="w-4.5 h-4.5 object-contain" />
                      <img src="@/assets/claude-color.svg" alt="Claude" class="w-4.5 h-4.5 object-contain" />
                    </div>
                    <span class="text-sm font-semibold text-gray-800">Cursor · VS Code · Claude · OpenCode</span>
                  </div>
                  <span class="text-xs text-gray-400 font-medium">MCP plugins</span>
                </div>

                <!-- Chrome Extension -->
                <div class="flex items-center justify-between py-3.5">
                  <div class="flex items-center gap-3">
                    <img src="@/assets/chrome-logo-svgrepo-com.svg" alt="Chrome" class="w-5 h-5 object-contain" />
                    <span class="text-sm font-semibold text-gray-800">Chrome Extension</span>
                  </div>
                  <span class="text-xs text-gray-400 font-medium">One-click save</span>
                </div>
              </div>

              <!-- User Count -->
              <div class="mb-8">
                <span class="text-2xl sm:text-3xl font-extrabold text-[rgb(1,1,16)] tracking-tight">Early Access</span>
                <span class="text-sm text-gray-400 font-medium ml-2">open for power users</span>
              </div>

              <!-- CTA -->
              <div class="mt-auto">
                <router-link to="/signup/" class="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#D97756] text-white font-bold text-sm rounded-xl hover:bg-[#C4654A] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2">
                  <span>Get Personal Memory</span>
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </router-link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    <!-- Works with every LLM & Tool Section -->
    <div id="llm-compatibility" data-theme="light" class="relative z-20 pt-0 pb-0 bg-white">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-6 md:mb-12">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ PLATFORM COMPATIBILITY</div>
            <div>[3/9]</div>
          </div>
        </div>

        <div class="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <h2 class="hero-serif text-2xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mb-3 sm:mb-4">
            One memory layer. <span class="italic font-medium">Every tool connected.</span>
          </h2>
          <p class="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
            Memwyre is not a standalone chatbot. It is a universal context layer that plugs directly into the models, editors, and terminal tools you already use every day.
          </p>
        </div>

        <!-- Continuous Horizontal Logo Marquee with Official Brand Lockups -->
        <div class="-mx-6 sm:-mx-8 lg:-mx-12 bg-white relative z-20 mb-4 sm:mb-6 overflow-hidden py-2 sm:py-3 [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
          <!-- Gradient Fade Edges -->
          <div class="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 md:w-44 bg-gradient-to-r from-white via-white/90 to-transparent z-20"></div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 md:w-44 bg-gradient-to-l from-white via-white/90 to-transparent z-20"></div>

          <div class="flex overflow-hidden select-none group">
            <!-- Track 1 -->
            <div class="flex items-center shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
              <div
                v-for="(item, i) in platformIntegrations"
                :key="'p1-' + i"
                class="flex items-center justify-center px-4 sm:px-6 py-1 hover:opacity-75 transition-opacity cursor-default shrink-0 h-9 sm:h-11"
              >
                <img
                  :src="item.logo"
                  :alt="item.name"
                  :class="[
                    item.name === 'Windsurf'
                      ? 'h-[20px] sm:h-[23px] md:h-[25px]'
                      : (item.name === 'Claude' || item.name === 'OpenAI')
                        ? 'h-[20px] sm:h-[24px] md:h-[26px]'
                        : 'h-5 sm:h-6 md:h-[28px]',
                    'w-auto max-w-[190px] object-contain pointer-events-none select-none'
                  ]"
                />
              </div>
            </div>

            <!-- Track 2 (Seamless Infinite Duplicate) -->
            <div class="flex items-center shrink-0 animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
              <div
                v-for="(item, i) in platformIntegrations"
                :key="'p2-' + i"
                class="flex items-center justify-center px-4 sm:px-6 py-1 hover:opacity-75 transition-opacity cursor-default shrink-0 h-9 sm:h-11"
              >
                <img
                  :src="item.logo"
                  :alt="item.name"
                  :class="[
                    item.name === 'Windsurf'
                      ? 'h-[20px] sm:h-[23px] md:h-[25px]'
                      : (item.name === 'Claude' || item.name === 'OpenAI')
                        ? 'h-[20px] sm:h-[24px] md:h-[26px]'
                        : 'h-5 sm:h-6 md:h-[28px]',
                    'w-auto max-w-[190px] object-contain pointer-events-none select-none'
                  ]"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Snippets of Use Cases (IDE/Agent Integrations & Multi-Model compatibility) -->
        <div class="-mx-8 sm:-mx-8 lg:-mx-12 lg:border-t lg:border-b lg:border-gray-300/80 bg-white relative z-20">
          <div class="flex lg:grid flex-nowrap lg:grid-cols-3 items-stretch gap-6 lg:gap-0 overflow-x-auto no-scrollbar scrollbar-none snap-x snap-mandatory px-8 lg:px-0">
            
            <!-- Column 1: IDE Integration -->
            <div class="w-[290px] sm:w-[390px] lg:w-full shrink-0 snap-align-start p-5 sm:p-7 md:p-8 flex flex-col text-left border border-gray-200 lg:border-0 lg:border-r lg:border-gray-300/80 rounded-lg lg:rounded-none">
              <div class="flex-1">
                <div class="text-xs font-bold text-[#D97756] tracking-widest uppercase mb-2 sm:mb-3 font-mono">01 / IDE INTEGRATION</div>
                <h3 class="font-display text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 tracking-tight">Native IDE Memory</h3>
                <p class="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal">
                  Connect your IDE directly via MCP. Past bug fixes, configuration choices, and API schemas become instantly searchable context inside Cursor, VS Code, or Windsurf.
                </p>
              </div>
              <div class="mt-4 sm:mt-5 -mx-5 sm:-mx-7 md:-mx-8 -mb-5 sm:-mb-7 md:-mb-8 flex items-center justify-center h-60 sm:h-68 md:h-76 overflow-hidden border-t border-gray-200/80 bg-[#F3C969] relative">
                <!-- Subtle ambient curves matching the card aesthetic -->
                <div class="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-white/40 pointer-events-none"></div>
                <div class="absolute -bottom-28 -right-20 w-80 h-80 rounded-full border border-white/30 pointer-events-none"></div>
                <div class="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/[0.06] pointer-events-none"></div>

                <div class="scale-[0.78] sm:scale-[0.86] md:scale-[0.92] origin-center w-full flex justify-center px-4 relative z-10">
                  <EngineerMinAnimation />
                </div>
              </div>
            </div>
            
            <!-- Column 2: Terminal Agents -->
            <div class="w-[290px] sm:w-[390px] lg:w-full shrink-0 snap-align-start p-5 sm:p-7 md:p-8 flex flex-col text-left border border-gray-200 lg:border-0 lg:border-r lg:border-gray-300/80 rounded-lg lg:rounded-none">
              <div class="flex-1">
                <div class="text-xs font-bold text-[#D97756] tracking-widest uppercase mb-2 sm:mb-3 font-mono">02 / TERMINAL AGENTS</div>
                <h3 class="font-display text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 tracking-tight">Code Agents</h3>
                <p class="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal">
                  Empower terminal tools like Claude Code and OpenClaw. Agents save debug results and project conventions, building cumulative operational memory.
                </p>
              </div>
              <div class="mt-4 sm:mt-5 -mx-5 sm:-mx-7 md:-mx-8 -mb-5 sm:-mb-7 md:-mb-8 h-60 sm:h-68 md:h-76 overflow-hidden border-t border-gray-200/80 bg-[#DB765A] relative flex items-start justify-start pt-7 pl-7 sm:pt-8 sm:pl-8">
                <!-- Subtle ambient curves matching Claude aesthetic -->
                <div class="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-white/15 pointer-events-none"></div>
                <div class="absolute -bottom-28 -right-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none"></div>
                <div class="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none"></div>

                <!-- Terminal window with top-left padding, overflowing bottom & right -->
                <div class="w-[125%] sm:w-[130%] origin-top-left scale-[0.88] sm:scale-[0.95] relative z-10 -mr-16 -mb-16">
                  <DevOpsMinAnimation />
                </div>
              </div>
            </div>

            <!-- Column 3: Multi-Model -->
            <div class="w-[290px] sm:w-[390px] lg:w-full shrink-0 snap-align-start p-5 sm:p-7 md:p-8 flex flex-col text-left border border-gray-200 lg:border-0 rounded-lg lg:rounded-none">
              <div class="flex-1">
                <div class="text-xs font-bold text-[#D97756] tracking-widest uppercase mb-2 sm:mb-3 font-mono">03 / MULTI-MODEL</div>
                <h3 class="font-display text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 tracking-tight">Works With Every LLM</h3>
                <p class="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal">
                  One shared memory layer across Claude, ChatGPT, and Gemini. If you explain a code pattern in ChatGPT, your Cursor agent retrieves it instantly when you ask.
                </p>
              </div>
              <div class="mt-4 sm:mt-5 -mx-5 sm:-mx-7 md:-mx-8 -mb-5 sm:-mb-7 md:-mb-8 flex items-center justify-center h-60 sm:h-68 md:h-76 overflow-hidden border-t border-gray-200/80 bg-[#3B828E] relative">
                <!-- Subtle ambient curves matching style of card 2 in contrasting teal -->
                <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/20 pointer-events-none"></div>
                <div class="absolute -bottom-28 -left-20 w-80 h-80 rounded-full border border-white/15 pointer-events-none"></div>
                <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>

                <div class="scale-[0.85] sm:scale-[0.95] md:scale-100 origin-center w-full flex justify-center px-4 relative z-10">
                  <ScatteredWorkMinAnimation />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

<!-- Comparison Section (WHITE) -->
    <div id="comparison" data-theme="light" class="pt-0 pb-0 bg-white relative z-25">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        
        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-4 sm:mb-8">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ WHY MEMWYRE</div>
            <div>[4/9]</div>
          </div>
        </div>

        <!-- Header Row (Title and Description) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-6 sm:mb-12 items-start lg:items-center">
          <div>
            <h2 class="hero-serif text-2xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)]">
              Context for humans, <span class="italic font-medium text-[#D97756]">not just databases.</span>
            </h2>
          </div>
          <div>
            <p class="text-base text-gray-500 leading-relaxed font-normal">
              Mem0 and Zep are built as backend database infrastructure for AI agents. Memwyre is built as the out-of-the-box context layer for individual developers, power users, and the tools they work in daily.
            </p>
          </div>
        </div>

        <!-- Comparison Table Container -->
        <div class="w-full overflow-x-auto no-scrollbar py-3.5 mb-8">
          <div class="relative min-w-[620px] bg-white border border-gray-300/80 rounded-none shadow-xs">
            
            <!-- Single Continuous Liquid Glass Column for Memwyre (Elevated / Pop out with soft blended edges) -->
            <div class="absolute -top-2.5 -bottom-2.5 left-[42%] w-[26%] pointer-events-none overflow-hidden z-10 rounded-2xl border border-white/30 shadow-[0_12px_32px_-6px_rgba(220,70,20,0.22),0_4px_12px_-2px_rgba(0,0,0,0.06)]">
              <!-- Continuous Full-Height Liquid Gradient (Harmonized, soft sunset tones) -->
              <div class="absolute inset-0" style="background: linear-gradient(180deg, #FFA25C 0%, #FF7522 25%, #FF5814 60%, #E84306 100%);"></div>
              
              <!-- Top Ambient Peach Light Bloom (Breathing every 4s) -->
              <div class="absolute inset-0 animate-liquid-1" style="background: radial-gradient(circle at 85% 4%, rgba(255, 235, 195, 0.75) 0%, rgba(255, 170, 85, 0.3) 22%, transparent 48%);"></div>
              
              <!-- Mid-body fluid light reflection (Breathing every 4s) -->
              <div class="absolute inset-0 animate-liquid-2" style="background: radial-gradient(ellipse 85% 45% at 50% 50%, rgba(255, 155, 70, 0.3) 0%, transparent 80%);"></div>
              
              <!-- Bottom subtle warm depth glow -->
              <div class="absolute inset-0" style="background: radial-gradient(circle at 50% 98%, rgba(210, 50, 0, 0.25) 0%, transparent 60%);"></div>
              
              <!-- Diagonal liquid glass specular reflection sheen -->
              <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 10%, transparent 24%, rgba(255, 255, 255, 0.05) 65%, transparent 100%);"></div>
              
              <!-- Specular light streak shimmer sweeping every 4 seconds -->
              <div class="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shimmer-sweep"></div>
              
              <!-- Softened inner glass rim highlight -->
              <div class="absolute inset-0 rounded-2xl" style="box-shadow: inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45), inset 0 0 20px rgba(255, 160, 60, 0.15);"></div>
            </div>

            <table class="w-full text-left border-collapse table-fixed relative z-20">
              <thead>
                <tr>
                  <!-- Column 1: Feature Header -->
                  <th class="py-5 px-4 sm:px-6 w-[42%] text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-200/80">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 bg-[#D97756] inline-block rounded-xs"></span>
                      <span>FEATURE</span>
                    </div>
                  </th>

                  <!-- Column 2: Memwyre Header (Transparent over continuous liquid glass) -->
                  <th class="py-5 px-3 text-center w-[26%] text-white border-b border-white/20 relative z-30">
                    <div class="inline-flex items-center justify-center bg-white text-[#CF1B00] text-[9px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1.5 shadow-sm">
                      BEST
                    </div>
                    <div class="flex items-center justify-center">
                      <img src="/logo.png" alt="Memwyre" class="h-7 sm:h-[30px] w-auto brightness-0 invert drop-shadow-xs object-contain" />
                    </div>
                  </th>

                  <!-- Column 3: Mem0 Header -->
                  <th class="py-5 px-3 text-center w-[16%] text-gray-700 font-display text-xs sm:text-sm font-semibold border-b border-gray-200/80">
                    <div class="flex items-center justify-center gap-1.5 text-gray-500">
                      <span class="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-[10px] font-bold font-mono">m</span>
                      <span>Mem0</span>
                    </div>
                  </th>

                  <!-- Column 4: Zep Header -->
                  <th class="py-5 px-3 text-center w-[16%] text-gray-700 font-display text-xs sm:text-sm font-semibold border-b border-gray-200/80">
                    <div class="flex items-center justify-center gap-1.5 text-gray-500">
                      <span class="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-[10px] font-bold font-mono">Z</span>
                      <span>Zep</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="feature in comparisonFeatures" 
                  :key="feature.name"
                >
                  <!-- Feature Name with Icon -->
                  <td class="py-4 px-4 sm:px-6 border-b border-gray-100">
                    <div class="flex items-center gap-3">
                      <div class="w-7 h-7 rounded-md bg-[#D97756]/10 flex items-center justify-center shrink-0 text-[#D97756]">
                        <!-- Memory Graph -->
                        <svg v-if="feature.icon === 'graph'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="3" />
                          <circle cx="4" cy="6" r="2" />
                          <circle cx="20" cy="6" r="2" />
                          <circle cx="5" cy="18" r="2" />
                          <circle cx="19" cy="18" r="2" />
                          <line x1="5.6" y1="7.2" x2="9.6" y2="10.2" />
                          <line x1="18.4" y1="7.2" x2="14.4" y2="10.2" />
                          <line x1="6.5" y1="16.7" x2="9.7" y2="13.9" />
                          <line x1="17.5" y1="16.7" x2="14.3" y2="13.9" />
                        </svg>

                        <!-- User Profiles -->
                        <svg v-else-if="feature.icon === 'user'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>

                        <!-- Document Retrieval -->
                        <svg v-else-if="feature.icon === 'document'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <circle cx="11" cy="14" r="2.5" />
                          <line x1="13" y1="16" x2="16" y2="19" />
                        </svg>

                        <!-- Connectors -->
                        <svg v-else-if="feature.icon === 'connector'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                          <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>

                        <!-- Document Extractors -->
                        <svg v-else-if="feature.icon === 'extractor'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                          <line x1="7" y1="8" x2="17" y2="8" />
                          <line x1="7" y1="12" x2="17" y2="12" />
                          <line x1="7" y1="16" x2="13" y2="16" />
                        </svg>

                        <!-- Self-hostable -->
                        <svg v-else-if="feature.icon === 'selfhost'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                          <line x1="6" y1="6" x2="6.01" y2="6" />
                          <line x1="6" y1="18" x2="6.01" y2="18" />
                          <line x1="10" y1="6" x2="18" y2="6" />
                          <line x1="10" y1="18" x2="18" y2="18" />
                        </svg>

                        <!-- Consumer Plugins -->
                        <svg v-else-if="feature.icon === 'plugin'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path d="M14 4a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1a2 2 0 0 0-2 2v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2h2z" />
                        </svg>

                        <!-- Fallback / Default -->
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                        </svg>
                      </div>
                      <span class="font-medium text-gray-800 text-xs sm:text-sm tracking-tight">{{ feature.name }}</span>
                    </div>
                  </td>

                  <!-- Column 2: Memwyre Cell (Transparent over continuous liquid glass) -->
                  <td class="py-4 px-3 text-center border-b border-white/15">
                    <div class="flex items-center justify-center">
                      <div class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#CF1B00] shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                        <svg class="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </td>

                  <!-- Column 3: Mem0 Cell -->
                  <td class="py-4 px-3 text-center border-b border-gray-100">
                    <div class="flex items-center justify-center">
                      <svg v-if="feature.mem0" class="w-4 h-4 text-gray-500 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span v-else class="text-gray-300 font-mono text-base select-none">—</span>
                    </div>
                  </td>

                  <!-- Column 4: Zep Cell -->
                  <td class="py-4 px-3 text-center border-b border-gray-100">
                    <div class="flex items-center justify-center">
                      <svg v-if="feature.zep" class="w-4 h-4 text-gray-500 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span v-else class="text-gray-300 font-mono text-base select-none">—</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    <!-- Get Started Installer Section (Standalone) -->
    <div class="relative z-20 bg-white pt-0 pb-12 sm:pb-16">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ INSTALLER</div>
            <div>[5/9]</div>
          </div>
        </div>

        <!-- Header Row (Title and Description) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10 sm:mb-12 items-start lg:items-center">
          <div>
            <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)]">
              60-Second <span class="italic font-medium text-[#D97756]">Setup.</span>
            </h2>
          </div>
          <div>
            <p class="text-base text-gray-500 leading-relaxed font-normal">
              No complex onboarding or data migrations. Install the MCP server and connect your workspace instantly.
            </p>
          </div>
        </div>

        <!-- Interactive Get Started Command Block (Pinecone Style) -->
        <div class="p-8 sm:p-10 bg-white border border-dashed border-gray-300 rounded-md relative overflow-hidden text-left shadow-sm">


          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6 border-b border-gray-200/60 pb-5">
            <div>
              <h4 class="text-xs uppercase font-bold tracking-widest text-gray-400">Get Started</h4>
            </div>
            
            <!-- Navigation Option Tabs -->
            <div class="flex flex-wrap gap-x-6 gap-y-2 items-center">
              <button 
                v-for="tab in getStartedTabs" 
                :key="tab.id"
                @click="activeGetStartedTab = tab.id"
                :class="activeGetStartedTab === tab.id ? 'border-b-2 border-[#D97756] text-[#D97756] font-semibold' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-800'"
                class="pb-1 text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40 rounded-sm"
              >
                {{ '{' + tab.name + '}' }}
              </button>
            </div>
            
            <div>
              <a href="https://docs.memwyre.tech" target="_blank" class="text-xs font-semibold text-[#D97756] hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40 rounded px-1">
                View Docs <svg class="w-3 h-3 text-[#D97756]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>

          <!-- Format Toggle (CLI vs JSON) -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <button 
                @click="installerMode = 'cli'" 
                :class="installerMode === 'cli' ? 'bg-[#D97756]/10 text-[#D97756] border-[#D97756]/30 font-semibold' : 'bg-transparent text-gray-400 border-gray-200 hover:text-gray-600'"
                class="px-2.5 py-0.5 text-[11px] font-mono rounded border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40">
                CLI Command
              </button>
              <button 
                v-if="['claude', 'cursor', 'vscode'].includes(activeGetStartedTab)"
                @click="installerMode = 'json'" 
                :class="installerMode === 'json' ? 'bg-[#D97756]/10 text-[#D97756] border-[#D97756]/30 font-semibold' : 'bg-transparent text-gray-400 border-gray-200 hover:text-gray-600'"
                class="px-2.5 py-0.5 text-[11px] font-mono rounded border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40">
                MCP Config JSON
              </button>
            </div>
            <span class="text-[11px] font-mono text-gray-400 hidden sm:inline">
              {{ activeGetStartedTab === 'claude' ? 'claude_desktop_config.json' : activeGetStartedTab === 'cursor' ? '.cursor/mcp.json' : activeGetStartedTab === 'vscode' ? 'settings.json' : '' }}
            </span>
          </div>

          <!-- Command Installer Codeblock -->
          <div class="relative bg-gray-50 border border-dashed border-gray-300 rounded-md p-4 font-mono text-xs sm:text-sm text-gray-800 flex flex-col justify-between gap-3">
            <div class="flex items-start sm:items-center justify-between gap-4">
              <div v-if="installerMode === 'cli' || !['claude', 'cursor', 'vscode'].includes(activeGetStartedTab)" class="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1 select-all">
                <span class="text-[#D97756] select-none font-bold">$</span>
                <span>{{ getStartedCommand }}</span>
              </div>
              <pre v-else class="text-[11px] sm:text-xs text-gray-800 overflow-x-auto py-1 leading-relaxed select-all font-mono"><code>{{ getStartedJson }}</code></pre>

              <button 
                @click="copyGetStartedContent" 
                class="flex-shrink-0 self-end sm:self-center inline-flex items-center justify-center gap-1.5 px-4.5 py-2 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 transition-all duration-200 shadow-sm select-none"
              >
                <svg v-if="getStartedCopied" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>{{ getStartedCopied ? 'Copied!' : 'Copy' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    
<!-- How It Works Section -->
    <div id="how-it-works" ref="howItWorksSectionRef" data-theme="light" class="pt-0 pb-12 sm:pb-16 bg-white relative z-25">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        
        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ HOW IT WORKS</div>
            <div>[6/9]</div>
          </div>
        </div>

        <!-- Header Row (Title, Subtitle, and Docs Button) -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)]">
            How Memwyre <span class="italic font-medium text-gray-900">works.</span>
          </h2>
          <a href="https://docs.memwyre.tech" target="_blank" class="mt-4 md:mt-0 w-auto px-6 py-2 bg-white text-[#050614] font-bold rounded-md border border-gray-300 hover:bg-gray-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 transition-all duration-200 text-sm inline-flex items-center justify-center shadow-sm">
            Read the docs
          </a>
        </div>
        <p class="max-w-3xl text-base text-gray-500 leading-relaxed font-normal mb-12">
          Connect your AI tools in seconds. Save context once, and let your AI automatically remember everything across every conversation.
        </p>

        <!-- 3-Column Bordered Card Grid -->
        <div 
          class="border border-gray-200/85 rounded-lg overflow-hidden bg-white relative z-20"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/85">
            
            <!-- Column 1: Install & Forget -->
            <div 
              class="p-8 sm:p-10 flex flex-col justify-between min-h-[380px] transition-colors duration-300"
              :class="{ 'bg-gray-50/50': activeStep === 0 }"
            >
              <div>
                <div class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400 mb-6">01 . INSTALL &amp; FORGET</div>
                <div class="mb-4">
                  <div class="text-xl sm:text-2xl font-bold text-[#D97756] tracking-tight">Install</div>
                  <div class="text-sm sm:text-base font-semibold text-gray-900 leading-tight mt-1">&amp; forget</div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                  Run the one-line installer or add the browser extension, sign in, and your shared memory vault is ready in seconds.
                </p>
              </div>
              
              <div>
                <!-- Visual Element: Progressively Raising Bars -->
                <div class="flex items-end gap-2 w-full h-20 mb-4">
                  <div v-for="i in 8" :key="i" 
                    class="flex-1 bg-[#D97756] border border-black rounded-t transition-all duration-300 origin-bottom"
                    :style="{ 
                      height: (30 + i * 8) + '%', 
                      opacity: activeStep === 0 ? 0.95 : 0.3,
                      transform: `scaleY(${getIngestBarScaleY(i - 1)})`
                    }"></div>
                </div>
                <div class="text-xs tracking-widest uppercase font-bold font-mono text-gray-400">one-command install</div>
              </div>
            </div>

            <!-- Column 2: Connect to LLM -->
            <div 
              class="p-8 sm:p-10 flex flex-col justify-between min-h-[380px] transition-colors duration-300"
              :class="{ 'bg-gray-50/50': activeStep === 1 }"
            >
              <div>
                <div class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400 mb-6">02 . CONNECT TO LLM</div>
                <div class="mb-4">
                  <div class="text-xl sm:text-2xl font-bold text-[#D97756] tracking-tight">Connect</div>
                  <div class="text-sm sm:text-base font-semibold text-gray-900 leading-tight mt-1">to your LLM</div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                  Copy your MCP link or plugin and paste it into Claude Desktop, Cursor, VS Code, or ChatGPT.
                </p>
              </div>

              <div>
                <!-- Visual Element: Indexing Bar Graph -->
                <div class="flex items-end gap-2 w-full h-20 mb-4">
                  <div v-for="(height, idx) in [40, 65, 50, 85, 30, 75, 60, 45]" :key="idx" 
                    class="flex-1 bg-[#D97756] border border-black rounded-t transition-all duration-500 origin-bottom"
                    :class="{ 'animate-raise-random': activeStep === 1 }"
                    :style="{ 
                      height: height + '%', 
                      opacity: activeStep === 1 ? 0.95 : 0.3,
                      animationDelay: (idx * 0.07) + 's',
                      animationDuration: [1.1, 0.7, 1.3, 0.9, 1.2, 0.8, 1.4, 1.0][idx] + 's',
                      transform: activeStep === 1 ? 'none' : 'scaleY(0.5)'
                    }"></div>
                </div>
                <div class="text-xs tracking-widest uppercase font-bold font-mono text-gray-400">cursor &bull; claude &bull; chatgpt</div>
              </div>
            </div>

            <!-- Column 3: Start Chatting -->
            <div 
              class="p-8 sm:p-10 flex flex-col justify-between min-h-[380px] transition-colors duration-300"
              :class="{ 'bg-gray-50/50': activeStep === 2 }"
            >
              <div>
                <div class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400 mb-6">03 . START CHATTING</div>
                <div class="mb-4">
                  <div class="text-xl sm:text-2xl font-bold text-[#D97756] tracking-tight">Start</div>
                  <div class="text-sm sm:text-base font-semibold text-gray-900 leading-tight mt-1">chatting</div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                  Start a new chat with your AI. Memwyre automatically uses your shared memory to answer with full context.
                </p>
              </div>

              <div>
                <!-- Visual Element: SVG Latency Area/Line Chart -->
                <div class="h-20 w-full relative pr-4 mb-4">
                  <svg viewBox="0 0 100 30" class="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="queryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#D97756" :stop-opacity="activeStep === 2 ? 0.25 : 0.08" />
                        <stop offset="100%" stop-color="#D97756" stop-opacity="0" />
                      </linearGradient>
                      <clipPath id="queryClip">
                        <rect x="0" y="0" width="100" height="30" 
                          class="transition-transform duration-1000 ease-out origin-left" 
                          :style="{ transform: activeStep === 2 ? 'scaleX(1)' : 'scaleX(0)' }" />
                      </clipPath>
                    </defs>
                    <!-- Area -->
                    <path d="M0,30 Q25,20 50,15 T100,5 L100,30 Z" fill="url(#queryGrad)" clip-path="url(#queryClip)" />
                    <!-- Line -->
                    <path d="M0,30 Q25,20 50,15 T100,5" fill="none" stroke="#D97756" stroke-width="2" 
                      class="transition-all duration-1000 ease-out" 
                      :style="{ 
                        opacity: activeStep === 2 ? 0.9 : 0.3,
                        strokeDasharray: 120,
                        strokeDashoffset: activeStep === 2 ? 0 : 120
                      }" />
                    <!-- Dot -->
                    <circle cx="100" cy="5" r="3" fill="#D97756" 
                      class="transition-all duration-300 delay-[800ms]" 
                      :style="{ 
                        opacity: activeStep === 2 ? 1 : 0,
                        transform: activeStep === 2 ? 'scale(1)' : 'scale(0)',
                        transformOrigin: '100px 5px'
                      }" />
                  </svg>
                </div>
                <div class="text-xs tracking-widest uppercase font-bold font-mono text-gray-400">automatic context recall</div>
              </div>
            </div>

          </div>

          <!-- Bottom sliding progress indicator line -->
          <div class="w-full h-[3px] bg-gray-200/50 relative">
            <div 
              class="absolute top-0 bottom-0 h-full bg-[#D97756]"
              :style="{ 
                width: stepProgress + '%' 
              }"
            ></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    
<!-- Benchmark Section (LIGHT) -->
    <div id="benchmark" ref="benchmarkSectionRef" data-theme="light"
      class="relative pt-0 pb-12 sm:pb-16 text-gray-900 z-25">

      <div class="relative z-10 max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ BENCHMARK</div>
            <div>[7/9]</div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
             <!-- Left Column: Title, Subtitle, and Metrics -->
          <div class="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mb-3">
              The <span class="italic font-medium text-[#D97756]">LoCoMo</span> Benchmark.
            </h2>
            <p class="text-gray-500 text-sm sm:text-base font-medium mb-4">1,540 questions &bull; 5 categories</p>
            <p class="text-base text-gray-500 leading-relaxed font-normal mb-6 max-w-xl text-center lg:text-left">
              If your memory platform returns noisy facts or misses key details, your AI writes broken code. Retrieval quality dictates the quality of your AI outcomes. Here is how Memwyre's accuracy compares on the LoCoMo long-context benchmark dataset:
            </p>
            
            <div class="mb-8">
              <router-link to="/ai-memory-benchmark-locomo" class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-md font-medium text-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 shadow-sm">
                <span>Read Research</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </router-link>
            </div>
            
            <!-- Metric Cards stacked vertically -->
            <div class="space-y-4 w-full max-w-md">
              <div class="relative flex items-center gap-5 bg-white border border-gray-200 rounded-xl p-5 shadow-xs transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
                <div class="text-[#D97756] text-4xl font-extrabold font-mono tracking-tight">70.5%</div>
                <div class="text-left">
                  <div class="text-gray-900 font-bold text-base leading-tight">Non-Adversarial Accuracy</div>
                  <div class="text-gray-500 text-xs tracking-widest uppercase font-semibold mt-0.5">Full 1,540 Benchmark Suite</div>
                </div>
              </div>
              <div class="relative flex items-center gap-5 bg-white border border-gray-200 rounded-xl p-5 shadow-xs transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
                <div class="text-gray-900 text-4xl font-extrabold font-mono tracking-tight">4.9k</div>
                <div class="text-left">
                  <div class="text-gray-900 font-bold text-base leading-tight">Mean Context Tokens</div>
                  <div class="text-gray-500 text-xs tracking-widest uppercase font-semibold mt-0.5">Vs 26k+ Raw Context</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Bar Chart -->
          <div class="lg:col-span-7 w-full">
            <div class="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div class="hidden md:block relative w-full">
                <!-- Chart Area -->
                <div class="relative z-10 h-72 sm:h-96 flex items-end justify-between px-2 sm:px-6 mb-6">
                  <!-- Horizontal subtle gridlines perfectly contained in chart area -->
                  <div class="absolute inset-x-2 sm:inset-x-6 inset-y-0 flex flex-col justify-between pointer-events-none z-0">
                    <div class="w-full border-t border-dashed border-gray-200/80"></div>
                    <div class="w-full border-t border-dashed border-gray-200/80"></div>
                    <div class="w-full border-t border-dashed border-gray-200/80"></div>
                    <div class="w-full border-t border-dashed border-gray-200/80"></div>
                    <div class="w-full border-t border-gray-200"></div>
                  </div>

                  <!-- Category 1: Single-hop -->
                  <div class="flex flex-col items-center flex-1 h-full justify-end group z-10">
                    <div class="flex items-end justify-center gap-1.5 sm:gap-4 h-[85%] w-full">
                      <!-- Old Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-gray-500 font-mono text-[10px] sm:text-xs mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">53.0</span>
                        <div 
                          class="w-full bg-zinc-300 border border-black rounded-t hover:bg-zinc-400 transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 53.0%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.2) 8px, rgba(0, 0, 0, 0.2) 9px);"
                        ></div>
                      </div>
                      <!-- New Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-[#D97756] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">78.6</span>
                        <div 
                          class="w-full bg-[#D97756] border border-black rounded-t hover:bg-[#e68a6c] hover:shadow-[0_0_15px_rgba(217,119,87,0.15)] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 78.6%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Category 2: Multi-hop -->
                  <div class="flex flex-col items-center flex-1 h-full justify-end group z-10">
                    <div class="flex items-end justify-center gap-1.5 sm:gap-4 h-[85%] w-full">
                      <!-- Old Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-gray-500 font-mono text-[10px] sm:text-xs mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">24.0</span>
                        <div 
                          class="w-full bg-zinc-300 border border-black rounded-t hover:bg-zinc-400 transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 24.0%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.2) 8px, rgba(0, 0, 0, 0.2) 9px);"
                        ></div>
                      </div>
                      <!-- New Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-[#D97756] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">57.5</span>
                        <div 
                          class="w-full bg-[#D97756] border border-black rounded-t hover:bg-[#e68a6c] hover:shadow-[0_0_15px_rgba(217,119,87,0.15)] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 57.5%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Category 3: Adversarial -->
                  <div class="flex flex-col items-center flex-1 h-full justify-end group z-10">
                    <div class="flex items-end justify-center gap-1.5 sm:gap-4 h-[85%] w-full">
                      <!-- Old Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-gray-500 font-mono text-[10px] sm:text-xs mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">50.0</span>
                        <div 
                          class="w-full bg-zinc-300 border border-black rounded-t hover:bg-zinc-400 transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 50.0%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.2) 8px, rgba(0, 0, 0, 0.2) 9px);"
                        ></div>
                      </div>
                      <!-- New Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-[#D97756] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">67.7</span>
                        <div 
                          class="w-full bg-[#D97756] border border-black rounded-t hover:bg-[#e68a6c] hover:shadow-[0_0_15px_rgba(217,119,87,0.15)] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 67.7%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Category 4: Temporal -->
                  <div class="flex flex-col items-center flex-1 h-full justify-end group z-10">
                    <div class="flex items-end justify-center gap-1.5 sm:gap-4 h-[85%] w-full">
                      <!-- Old Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-gray-500 font-mono text-[10px] sm:text-xs mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">48.0</span>
                        <div 
                          class="w-full bg-zinc-300 border border-black rounded-t hover:bg-zinc-400 transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 48.0%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.2) 8px, rgba(0, 0, 0, 0.2) 9px);"
                        ></div>
                      </div>
                      <!-- New Bar -->
                      <div class="flex flex-col items-center justify-end h-full w-7 sm:w-12 relative">
                        <span class="text-[#D97756] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">64.2</span>
                        <div 
                          class="w-full bg-[#D97756] border border-black rounded-t hover:bg-[#e68a6c] hover:shadow-[0_0_15px_rgba(217,119,87,0.15)] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                          :class="{ 'scale-y-100': animateBars }"
                          style="height: 64.2%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom labels (X-axis) with Interactive Category Buttons -->
                <div class="grid grid-cols-4 gap-1.5 sm:gap-2 border-t border-gray-200/80 pt-4 relative z-10 text-xs sm:text-sm font-medium">
                  <button 
                    @click="activeBenchmarkCategory = activeBenchmarkCategory === 'single' ? 'all' : 'single'" 
                    :class="activeBenchmarkCategory === 'single' ? 'bg-[#D97756]/10 text-[#D97756] font-bold border-[#D97756]/30 shadow-xs' : 'text-gray-600 hover:text-gray-900 border-gray-200/70 hover:bg-gray-50 hover:border-gray-300'"
                    class="py-2 px-1 text-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40">
                    Single-hop
                  </button>
                  <button 
                    @click="activeBenchmarkCategory = activeBenchmarkCategory === 'multi' ? 'all' : 'multi'" 
                    :class="activeBenchmarkCategory === 'multi' ? 'bg-[#D97756]/10 text-[#D97756] font-bold border-[#D97756]/30 shadow-xs' : 'text-gray-600 hover:text-gray-900 border-gray-200/70 hover:bg-gray-50 hover:border-gray-300'"
                    class="py-2 px-1 text-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40">
                    Multi-hop
                  </button>
                  <button 
                    @click="activeBenchmarkCategory = activeBenchmarkCategory === 'adversarial' ? 'all' : 'adversarial'" 
                    :class="activeBenchmarkCategory === 'adversarial' ? 'bg-[#D97756]/10 text-[#D97756] font-bold border-[#D97756]/30 shadow-xs' : 'text-gray-600 hover:text-gray-900 border-gray-200/70 hover:bg-gray-50 hover:border-gray-300'"
                    class="py-2 px-1 text-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40">
                    Adversarial
                  </button>
                  <button 
                    @click="activeBenchmarkCategory = activeBenchmarkCategory === 'temporal' ? 'all' : 'temporal'" 
                    :class="activeBenchmarkCategory === 'temporal' ? 'bg-[#D97756]/10 text-[#D97756] font-bold border-[#D97756]/30 shadow-xs' : 'text-gray-600 hover:text-gray-900 border-gray-200/70 hover:bg-gray-50 hover:border-gray-300'"
                    class="py-2 px-1 text-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/40">
                    Temporal
                  </button>
                </div>

                <!-- Interactive Category Insight Card -->
                <div class="mt-4 p-4 bg-gray-50/80 border border-gray-200/80 rounded-xl text-left transition-all duration-300">
                  <div class="flex items-center justify-between text-xs font-mono font-bold text-gray-800 mb-1.5">
                    <span class="text-[#D97756]">{{ benchmarkInsights[activeBenchmarkCategory].title }}</span>
                    <span class="text-[10px] text-gray-400 uppercase tracking-wider">Click category to inspect</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                    {{ benchmarkInsights[activeBenchmarkCategory].desc }}
                  </p>
                </div>

                <!-- Legend and Footer -->
                <div class="flex justify-between items-center mt-6 px-1 relative z-10 text-xs tracking-wider uppercase font-bold">
                  <!-- Legend -->
                  <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 bg-zinc-300 rounded-sm"></span>
                      <span class="text-gray-500 font-mono text-[11px]">Previous Benchmark</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 bg-[#D97756] rounded-sm"></span>
                      <span class="text-[#D97756] font-mono text-[11px]">Memwyre</span>
                    </div>
                  </div>
                  <!-- Sublabel -->
                  <div class="text-gray-400 tracking-widest font-mono">LOCOMO BENCHMARK</div>
                </div>

              </div>

              <!-- Mobile horizontal chart version (visible on mobile only) -->
              <div class="block md:hidden relative w-full text-left">
                <div class="flex justify-between items-center mb-4">
                  <h4 class="text-xs uppercase font-bold tracking-wider text-gray-400 font-mono">/ Accuracy Metrics</h4>
                  <div class="flex items-center gap-3 text-[10px] font-mono">
                    <span class="text-gray-500">Previous</span>
                    <span class="text-[#D97756] font-bold">Memwyre</span>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <!-- Category 1: Single-hop -->
                  <div class="space-y-1.5">
                    <div class="flex justify-between items-center text-xs font-semibold text-gray-800">
                      <span>Single-hop</span>
                      <span class="font-mono text-[10px] text-gray-400">Previous: 53.0% / <span class="text-[#D97756] font-bold">Memwyre: 78.6%</span></span>
                    </div>
                    <div class="space-y-1">
                      <!-- Previous Bar -->
                      <div class="w-full bg-gray-150 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-zinc-300 h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '53.0%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.1) 6px, rgba(0, 0, 0, 0.1) 7px);"></div>
                      </div>
                      <!-- Memwyre Bar -->
                      <div class="w-full bg-[#D97756]/10 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-[#D97756] h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '78.6%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.25) 6px, rgba(0, 0, 0, 0.25) 7px);"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Category 2: Multi-hop -->
                  <div class="space-y-1.5">
                    <div class="flex justify-between items-center text-xs font-semibold text-gray-800">
                      <span>Multi-hop</span>
                      <span class="font-mono text-[10px] text-gray-400">Previous: 24.0% / <span class="text-[#D97756] font-bold">Memwyre: 57.5%</span></span>
                    </div>
                    <div class="space-y-1">
                      <!-- Previous Bar -->
                      <div class="w-full bg-gray-150 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-zinc-300 h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '24.0%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.1) 6px, rgba(0, 0, 0, 0.1) 7px);"></div>
                      </div>
                      <!-- Memwyre Bar -->
                      <div class="w-full bg-[#D97756]/10 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-[#D97756] h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '57.5%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.25) 6px, rgba(0, 0, 0, 0.25) 7px);"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Category 3: Adversarial -->
                  <div class="space-y-1.5">
                    <div class="flex justify-between items-center text-xs font-semibold text-gray-800">
                      <span>Adversarial</span>
                      <span class="font-mono text-[10px] text-gray-400">Previous: 50.0% / <span class="text-[#D97756] font-bold">Memwyre: 67.7%</span></span>
                    </div>
                    <div class="space-y-1">
                      <!-- Previous Bar -->
                      <div class="w-full bg-gray-150 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-zinc-300 h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '50.0%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.1) 6px, rgba(0, 0, 0, 0.1) 7px);"></div>
                      </div>
                      <!-- Memwyre Bar -->
                      <div class="w-full bg-[#D97756]/10 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-[#D97756] h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '67.7%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.25) 6px, rgba(0, 0, 0, 0.25) 7px);"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Category 4: Temporal -->
                  <div class="space-y-1.5">
                    <div class="flex justify-between items-center text-xs font-semibold text-gray-800">
                      <span>Temporal</span>
                      <span class="font-mono text-[10px] text-gray-400">Previous: 48.0% / <span class="text-[#D97756] font-bold">Memwyre: 64.2%</span></span>
                    </div>
                    <div class="space-y-1">
                      <!-- Previous Bar -->
                      <div class="w-full bg-gray-150 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-zinc-300 h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '48.0%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.1) 6px, rgba(0, 0, 0, 0.1) 7px);"></div>
                      </div>
                      <!-- Memwyre Bar -->
                      <div class="w-full bg-[#D97756]/10 h-2.5 rounded overflow-hidden relative">
                        <div class="bg-[#D97756] h-full rounded transition-all duration-1000 ease-out origin-left scale-x-0" :class="{ 'scale-x-100': animateBars }" :style="{ width: animateBars ? '64.2%' : '0%' }" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.25) 6px, rgba(0, 0, 0, 0.25) 7px);"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Mobile Legend -->
                <div class="flex justify-between items-center mt-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 bg-zinc-300 rounded-sm"></span>
                      <span>Previous Benchmark</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 bg-[#D97756] rounded-sm"></span>
                      <span>Memwyre</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    <!-- Memory vs RAG Section -->
    <div class="relative z-20 bg-white py-6 sm:py-8">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        <div ref="comparisonSectionRef" class="relative p-8 sm:p-10 border border-gray-300 rounded-none overflow-hidden text-left shadow-sm">
          <!-- Corner Brackets -->
          <div class="absolute -top-1 -left-1 w-2.5 h-2.5 pointer-events-none z-20">
            <div class="absolute top-1 left-0 w-full h-px bg-white/70"></div>
            <div class="absolute left-1 top-0 h-full w-px bg-white/70"></div>
          </div>
          <div class="absolute -top-1 -right-1 w-2.5 h-2.5 pointer-events-none z-20">
            <div class="absolute top-1 left-0 w-full h-px bg-white/70"></div>
            <div class="absolute left-1 top-0 h-full w-px bg-white/70"></div>
          </div>
          <div class="absolute -bottom-1 -left-1 w-2.5 h-2.5 pointer-events-none z-20">
            <div class="absolute top-1 left-0 w-full h-px bg-white/70"></div>
            <div class="absolute left-1 top-0 h-full w-px bg-white/70"></div>
          </div>
          <div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 pointer-events-none z-20">
            <div class="absolute top-1 left-0 w-full h-px bg-white/70"></div>
            <div class="absolute left-1 top-0 h-full w-px bg-white/70"></div>
          </div>

          <!-- Liquid Glass Phone Background with 4s automatic recurring animation (covering full square border) -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-none">
            <!-- Base vibrant sunset-to-electric-orange liquid gradient -->
            <div class="absolute inset-0" style="background: linear-gradient(145deg, #FFA056 0%, #FF6618 30%, #FF3D00 65%, #CF1B00 100%);"></div>

            <!-- Top-right warm golden peach ambient light with 4s breathing pulse -->
            <div class="absolute inset-0 animate-liquid-1" style="background: radial-gradient(circle at 85% 15%, rgba(255, 220, 165, 0.75) 0%, rgba(255, 155, 65, 0.35) 40%, transparent 70%);"></div>

            <!-- Soft organic fluid body reflection with 4s breathing pulse -->
            <div class="absolute inset-0 animate-liquid-2 opacity-100" style="background: radial-gradient(ellipse 60% 85% at 38% 50%, rgba(255, 130, 45, 0.6) 0%, rgba(255, 75, 0, 0.25) 50%, transparent 80%);"></div>

            <!-- Bottom radiant fiery red-orange glow -->
            <div class="absolute inset-0" style="background: radial-gradient(circle at 50% 110%, rgba(255, 35, 0, 0.85) 0%, rgba(205, 20, 0, 0.35) 50%, transparent 80%);"></div>

            <!-- Luminous center vertical liquid light beam -->
            <div class="absolute inset-0" style="background: radial-gradient(ellipse 28% 90% at 50% 45%, rgba(255, 235, 205, 0.5) 0%, rgba(255, 185, 125, 0.22) 45%, transparent 85%);"></div>

            <!-- Diagonal liquid glass specular reflection sheen -->
            <div class="absolute inset-0" style="background: linear-gradient(125deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 24%, transparent 48%, rgba(255, 255, 255, 0.1) 72%, transparent 100%);"></div>

            <!-- Automatic specular light streak shimmer sweeping every 4 seconds -->
            <div class="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shimmer-sweep"></div>

            <!-- Inner glass bevel & border rim highlight -->
            <div class="absolute inset-0 rounded-none" style="box-shadow: inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.2), inset 0 0 35px rgba(255, 175, 85, 0.25);"></div>
          </div>

          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center text-white">
            
            <!-- Left Column: Latency Chart -->
            <div class="lg:col-span-7 w-full flex flex-col items-start text-left">
              <h3 class="text-2xl sm:text-3xl font-bold tracking-tight mb-1 text-white font-display">Memory vs RAG</h3>
              <p class="text-white/80 text-xs sm:text-sm font-medium mb-3">Latency (seconds)</p>
              
              <div class="relative w-full h-36 sm:h-56 mt-1 flex pb-6">
                <!-- Y-Axis Labels -->
                <div class="flex flex-col justify-between h-full text-[10px] sm:text-xs font-mono text-white/70 pr-4 select-none">
                  <span>40</span>
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                  <span>0</span>
                </div>
                
                <!-- Grid & Bars Container -->
                <div class="relative flex-1 h-full border-l border-white/20">
                  <!-- Horizontal Grid Lines -->
                  <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                    <div class="w-full border-t border-white/15"></div>
                    <div class="w-full border-t border-white/15"></div>
                    <div class="w-full border-t border-white/15"></div>
                    <div class="w-full border-t border-white/15"></div>
                    <div class="w-full border-b border-white/30"></div>
                  </div>
                  
                  <!-- Bars -->
                  <div class="relative z-10 h-full flex justify-around items-end px-4 sm:px-12">
                    <!-- Memory Bar -->
                    <div class="w-16 sm:w-24 h-full relative">
                      <span 
                        class="absolute left-1/2 -translate-x-1/2 text-white font-bold text-xs sm:text-sm font-mono transition-all duration-1000 ease-out whitespace-nowrap drop-shadow-xs" 
                        :class="{ 'opacity-100': animateComparisonBars, 'opacity-0': !animateComparisonBars }"
                        :style="{ bottom: animateComparisonBars ? 'calc(30% + 8px)' : '8px' }"
                      >
                        12s
                      </span>
                      <div 
                        class="w-full bg-white rounded-t-md transition-all duration-1000 ease-out origin-bottom shadow-[0_0_20px_rgba(255,255,255,0.4)] absolute bottom-0"
                        :style="{ height: animateComparisonBars ? '30%' : '0%' }"
                      ></div>
                      <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white font-semibold whitespace-nowrap">Memory</span>
                    </div>
                    
                    <!-- RAG Bar -->
                    <div class="w-16 sm:w-24 h-full relative">
                      <span 
                        class="absolute left-1/2 -translate-x-1/2 text-white/75 font-bold text-xs sm:text-sm font-mono transition-all duration-1000 ease-out whitespace-nowrap" 
                        :class="{ 'opacity-100': animateComparisonBars, 'opacity-0': !animateComparisonBars }"
                        :style="{ bottom: animateComparisonBars ? 'calc(100% + 8px)' : '8px' }"
                      >
                        40s
                      </span>
                      <div 
                        class="w-full bg-white/25 backdrop-blur-xs rounded-t-md transition-all duration-1000 ease-out origin-bottom shadow-sm absolute bottom-0 border border-white/20"
                        :style="{ height: animateComparisonBars ? '100%' : '0%' }"
                      ></div>
                      <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white/80 font-medium whitespace-nowrap">RAG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Right Column: Stats & view on X -->
            <div class="lg:col-span-5 flex flex-col items-start text-left lg:pl-6">
              <div class="text-[70px] sm:text-[85px] font-extrabold leading-none tracking-tighter mb-1 font-mono text-white drop-shadow-sm">{{ fewerTokensPercent }}%</div>
              <h4 class="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-white">Fewer tokens</h4>
              <p class="text-white/80 text-xs sm:text-sm mb-5 max-w-sm">Compared to RAG baseline</p>
              
              <!-- VIEW ON X Button -->
              <a 
                href="https://x.com/Memwyre" 
                target="_blank"
                class="inline-flex items-center bg-white text-gray-950 hover:bg-white/90 transition-all duration-200 text-sm font-semibold tracking-wider rounded-none overflow-hidden select-none shadow-md"
              >
                <span class="px-6 py-3 border-r border-gray-200 uppercase font-mono text-xs tracking-widest">View on X</span>
                <span class="px-4 py-3 flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </div>





    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    <!-- Pricing Section -->
    <div id="pricing" data-theme="light" class="pt-0 pb-0 bg-white relative z-25">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        
        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ PRICING</div>
            <div>[8/9]</div>
          </div>
        </div>

        <!-- Title / Header info -->
        <div class="text-center mb-12 sm:mb-16">
          <p class="hero-serif text-4xl sm:text-5xl tracking-tight text-gray-900 leading-[1.1]">
            AI that works where <span class="italic font-medium text-gray-900">your team works.</span>
          </p>
          <p class="mt-4 text-base text-gray-500 max-w-xl mx-auto">
            Simple, transparent pricing for individuals and teams. Start building your persistent AI memory layer today.
          </p>
        </div>

        <!-- 3-Column Bordered Grid matching "How It Works" Section -->
        <div class="lg:border-y lg:border-gray-300 rounded-none bg-white relative z-20 -mx-8 sm:-mx-8 lg:-mx-12">
          <div class="flex lg:grid flex-nowrap lg:grid-cols-3 items-stretch gap-6 lg:gap-0 overflow-x-auto no-scrollbar scrollbar-none snap-x snap-mandatory px-8 lg:px-0 py-4 lg:py-0">
            
            <!-- Free Plan -->
            <div class="w-[290px] sm:w-[390px] lg:w-full shrink-0 snap-align-start pt-6 px-5 pb-5 sm:pt-10 sm:px-10 lg:px-10 sm:pb-5 flex flex-col justify-between h-auto lg:h-full bg-white border border-gray-200 rounded-md lg:border-0 lg:border-r lg:border-gray-300 lg:rounded-none">
              <div>
                <div class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400 mb-6">01 . FREE</div>
                <div class="mb-4">
                  <div class="text-4xl font-extrabold tracking-tight text-gray-900">$0</div>
                  <div class="text-xs tracking-widest uppercase font-bold font-mono text-gray-400 mt-1">forever</div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                  A great way to get started with building your persistent AI memory layer.
                </p>

                <ul class="space-y-4 text-sm text-gray-600">
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Up to 50 memories</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Up to 10 document uploads</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Standard AI token budget</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>IDE Integration (MCP)</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Community Support</span>
                  </li>
                </ul>
              </div>

              <div class="mt-8">
                <router-link to="/signup/"
                  class="inline-flex w-full items-center justify-center rounded-md bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3.5 text-sm font-bold hover:bg-gray-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 transition-all duration-200 shadow-sm">
                  Get Started for Free
                </router-link>
              </div>
            </div>

            <!-- Pro Plan (Recommended - Liquid Glass with 4s Auto Glow Effect) -->
            <div class="group relative w-[290px] sm:w-[390px] lg:w-full shrink-0 snap-align-start pt-6 px-5 pb-5 sm:pt-10 sm:px-10 lg:px-10 sm:pb-5 flex flex-col justify-between h-auto lg:h-full overflow-hidden text-white border border-white/40 rounded-xl lg:rounded-none lg:border-0 lg:border-r lg:border-gray-300 shadow-md">
              <!-- Liquid Glass Background with 4s recurring auto glow shimmer -->
              <div class="absolute inset-0 pointer-events-none overflow-hidden">
                <!-- Base vibrant sunset-to-electric-orange liquid gradient -->
                <div class="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105" style="background: linear-gradient(145deg, #FFA056 0%, #FF6618 30%, #FF3D00 65%, #CF1B00 100%);"></div>

                <!-- Top-right warm golden peach ambient light with 4s breathing pulse -->
                <div class="absolute inset-0 animate-liquid-1" style="background: radial-gradient(circle at 85% 15%, rgba(255, 220, 165, 0.75) 0%, rgba(255, 155, 65, 0.35) 40%, transparent 70%);"></div>

                <!-- Soft organic fluid body reflection with 4s breathing pulse -->
                <div class="absolute inset-0 animate-liquid-2 opacity-100" style="background: radial-gradient(ellipse 60% 85% at 38% 50%, rgba(255, 130, 45, 0.6) 0%, rgba(255, 75, 0, 0.25) 50%, transparent 80%);"></div>

                <!-- Bottom radiant fiery red-orange glow -->
                <div class="absolute inset-0" style="background: radial-gradient(circle at 50% 110%, rgba(255, 35, 0, 0.85) 0%, rgba(205, 20, 0, 0.35) 50%, transparent 80%);"></div>

                <!-- Luminous center vertical liquid light beam -->
                <div class="absolute inset-0 transition-all duration-1000 ease-out" style="background: radial-gradient(ellipse 28% 90% at 50% 45%, rgba(255, 235, 205, 0.5) 0%, rgba(255, 185, 125, 0.22) 45%, transparent 85%);"></div>

                <!-- Diagonal liquid glass specular reflection sheen -->
                <div class="absolute inset-0" style="background: linear-gradient(125deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 24%, transparent 48%, rgba(255, 255, 255, 0.1) 72%, transparent 100%);"></div>

                <!-- Specular light streak shimmer sweeping every 4 seconds -->
                <div class="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shimmer-sweep"></div>

                <!-- Inner glass bevel & border rim highlight -->
                <div class="absolute inset-0" style="box-shadow: inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.2), inset 0 0 35px rgba(255, 175, 85, 0.25);"></div>
              </div>

              <div class="relative z-10">
                <div class="flex justify-between items-center mb-6">
                  <div class="text-xs tracking-wider uppercase font-bold font-mono text-white/90">02 . PRO</div>
                  <span class="text-[9px] font-bold px-2.5 py-0.5 rounded bg-white text-[#CF1B00] uppercase font-mono tracking-wider shadow-xs">
                    Recommended
                  </span>
                </div>
                <div class="mb-4">
                  <div class="text-4xl font-extrabold tracking-tight text-white drop-shadow-xs">$12</div>
                  <div class="text-xs tracking-widest uppercase font-bold font-mono text-white/75 mt-1">/ month</div>
                </div>
                <p class="text-white/90 text-sm leading-relaxed mb-6">
                  Everything in Free, plus unlimited storage and priority features.
                </p>

                <div class="flex items-center mb-6">
                  <span class="text-[9px] font-mono font-bold uppercase tracking-widest text-white/80 mr-3">Integrations</span>
                  <div class="flex items-center -space-x-2.5 isolate">
                    <!-- VS Code -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[10] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/vscode.svg" alt="VS Code" class="w-4.5 h-4.5 object-contain" title="VS Code" />
                    </div>
                    <!-- OpenAI -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[11] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/openai.svg" alt="OpenAI / ChatGPT" class="w-4.5 h-4.5 object-contain" title="OpenAI / ChatGPT" />
                    </div>
                    <!-- Claude Desktop -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[12] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/claude-color.svg" alt="Claude Desktop" class="w-4.5 h-4.5 object-contain" title="Claude Desktop" />
                    </div>
                    <!-- Gemini -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[13] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/gemini-color.svg" alt="Google Gemini" class="w-4.5 h-4.5 object-contain" title="Google Gemini" />
                    </div>
                    <!-- Notion -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[14] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/notion-svgrepo-com.svg" alt="Notion" class="w-4.5 h-4.5 object-contain" title="Notion" />
                    </div>
                    <!-- Perplexity -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[15] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/perplexity-color.svg" alt="Perplexity" class="w-4.5 h-4.5 object-contain" title="Perplexity" />
                    </div>
                    <!-- Claude Code -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[16] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/claudecode-color.svg" alt="Claude Code" class="w-4.5 h-4.5 object-contain" title="Claude Code" />
                    </div>
                    <!-- OpenClaw -->
                    <div class="w-7 h-7 rounded-full bg-white border border-white/40 shadow-sm flex items-center justify-center p-1 relative z-[17] transition-all duration-300 hover:z-[40] hover:-translate-y-1">
                      <img src="@/assets/openclaw-color.svg" alt="OpenClaw" class="w-4.5 h-4.5 object-contain" title="OpenClaw" />
                    </div>
                  </div>
                </div>

                <ul class="space-y-4 text-sm text-white">
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited memories &amp; documents</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Google Drive &amp; Notion sync</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Claude Code, OpenCode &amp; OpenClaw plugins</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Browser Extension &amp; MCP IDE Server</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Extended daily AI chat quota &amp; support</span>
                  </li>
                </ul>
              </div>

              <div class="mt-8 relative z-10">
                <router-link to="/signup/"
                  class="inline-flex w-full items-center justify-center rounded-none bg-black text-white px-4 py-3.5 text-sm font-bold shadow-md hover:bg-gray-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 transition-all duration-200">
                  Start Building Your Brain
                </router-link>
              </div>
            </div>

            <!-- Enterprise Plan -->
            <div class="w-[290px] sm:w-[390px] lg:w-full shrink-0 snap-align-start pt-6 px-5 pb-5 sm:pt-10 sm:px-10 lg:px-10 sm:pb-5 flex flex-col justify-between h-auto lg:h-full bg-white border border-gray-200 rounded-md lg:border-0 lg:rounded-none">
              <div>
                <div class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400 mb-6">03 . ENTERPRISE</div>
                <div class="mb-4">
                  <div class="text-4xl font-extrabold tracking-tight text-gray-900">Custom</div>
                  <div class="text-xs tracking-widest uppercase font-bold font-mono text-gray-400 mt-1">volume pricing</div>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">
                  Tailored deployments for teams that need dedicated infrastructure, SSO, and volume pricing.
                </p>

                <ul class="space-y-4 text-sm text-gray-600">
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Everything in Pro</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated infrastructure &amp; SSO</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom integrations &amp; SLA</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated support</span>
                  </li>
                </ul>
              </div>

              <div class="mt-8">
                <a href="mailto:shivharehimansh@gmail.com?subject=Memwyre%20Enterprise%20Inquiry"
                  class="inline-flex w-full items-center justify-center rounded-md bg-gray-50 text-gray-900 border border-gray-200 px-4 py-3.5 text-sm font-bold hover:bg-gray-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 transition-all duration-200 shadow-sm">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blogs Section -->
    <div id="blog-section" data-theme="light" class="relative z-20 pt-0 pb-10 md:pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12 text-center">

        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-8 md:mb-12">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ BLOG</div>
            <div>[9/9]</div>
          </div>
        </div>
        
        <!-- Heading -->
        <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mb-12">
          Latest from the <span class="italic font-medium text-[#D97756]">Memwyre Blog</span>
        </h2>
        
        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 text-left">
          
          <!-- Blog Card 1 -->
          <router-link to="/blog/mcp-persistent-memory" class="group flex flex-row md:flex-col items-start md:items-stretch gap-4 md:gap-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 p-1">
            <div class="w-24 h-16 md:w-full md:h-auto md:aspect-[16/10] shrink-0 rounded-md overflow-hidden border border-gray-200/85 bg-gray-50 flex items-center justify-center relative">
              <img 
                src="/blog-covers/mcp-persistent-memory.png" 
                alt="How to Give Claude Desktop Persistent Memory using MCP" 
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                @error="$event.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-sm md:text-base lg:text-lg font-bold text-[rgb(1,1,16)] leading-snug group-hover:text-[#D97756] transition-colors duration-250 md:mt-5 md:mb-2 font-sans">
                How to Give Claude Desktop Persistent Memory using MCP
              </h3>
              <div class="text-[10px] md:text-xs text-gray-500 font-sans mt-1 md:mt-0">
                June 15, 2026 &nbsp;&bull;&nbsp; MCP Server
              </div>
            </div>
          </router-link>

          <!-- Blog Card 2 -->
          <router-link to="/blog/vscode-mcp-persistent-memory" class="group flex flex-row md:flex-col items-start md:items-stretch gap-4 md:gap-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 p-1">
            <div class="w-24 h-16 md:w-full md:h-auto md:aspect-[16/10] shrink-0 rounded-md overflow-hidden border border-gray-200/85 bg-gray-50 flex items-center justify-center relative">
              <img 
                src="/blog-covers/vscode-mcp-persistent-memory.png" 
                alt="How to Enable Persistent Codebase Memory in VS Code with MCP and Cline" 
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                @error="$event.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-sm md:text-base lg:text-lg font-bold text-[rgb(1,1,16)] leading-snug group-hover:text-[#D97756] transition-colors duration-250 md:mt-5 md:mb-2 font-sans">
                How to Enable Persistent Codebase Memory in VS Code with MCP and Cline
              </h3>
              <div class="text-[10px] md:text-xs text-gray-500 font-sans mt-1 md:mt-0">
                June 02, 2026 &nbsp;&bull;&nbsp; MCP Server
              </div>
            </div>
          </router-link>

          <!-- Blog Card 3 -->
          <router-link to="/blog/claude-code-memory-ingestion" class="group flex flex-row md:flex-col items-start md:items-stretch gap-4 md:gap-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 p-1">
            <div class="w-24 h-16 md:w-full md:h-auto md:aspect-[16/10] shrink-0 rounded-md overflow-hidden border border-gray-200/85 bg-gray-50 flex items-center justify-center relative">
              <img 
                src="/blog-covers/claude-code-memory-ingestion.png" 
                alt="Building Persistent Terminal Sessions: Claude Code Memory Ingestion" 
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                @error="$event.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-sm md:text-base lg:text-lg font-bold text-[rgb(1,1,16)] leading-snug group-hover:text-[#D97756] transition-colors duration-250 md:mt-5 md:mb-2 font-sans">
                Building Persistent Terminal Sessions: Claude Code Memory Ingestion
              </h3>
              <div class="text-[10px] md:text-xs text-gray-500 font-sans mt-1 md:mt-0">
                May 18, 2026 &nbsp;&bull;&nbsp; CLI Plugins
              </div>
            </div>
          </router-link>

        </div>
      </div>
    </div>

    
<!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    <div id="faq" data-theme="light" class="pt-0 pb-12 sm:pb-16 bg-white relative z-25">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12">
        
        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-6 sm:mb-8">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ FAQ</div>
            <div>[HELP &amp; PRIVACY]</div>
          </div>
        </div>

        <!-- Header Row -->
        <div class="mb-10 text-left">
          <h2 class="hero-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)]">
            Frequently asked <span class="italic font-medium text-[#D97756]">questions.</span>
          </h2>
        </div>

        <div class="border-t border-gray-200">
          <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200">
            <button @click="toggleFaq(index)" class="flex justify-between items-center w-full text-left py-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 rounded-sm px-2 -mx-2 transition-all duration-200">
              <span class="text-base font-semibold text-gray-900 group-hover:text-[#D97756] transition-colors duration-200">{{
                faq.question }}</span>
              <span class="ml-4 flex-shrink-0 text-gray-400 font-light text-2xl leading-none transition-colors duration-200 group-hover:text-[#D97756]">
                <span v-if="faq.isOpen">&minus;</span>
                <span v-else>+</span>
              </span>
            </button>
            <div v-show="faq.isOpen" class="text-gray-500 pb-6 leading-relaxed text-sm sm:text-base pr-8">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Divider -->
    <div class="w-full h-px bg-gray-300/80 pointer-events-none select-none relative z-30"></div>

    <!-- Final CTA Section: Memory and Personality -->
    <div
      class="pt-6 pb-8 sm:pt-8 sm:pb-10 bg-white text-center relative overflow-hidden">
      <!-- Numeric background animation -->
      <NumericBgAnimation :invert="true" class="absolute inset-0 z-0 opacity-40" />

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <h2 class="hero-serif text-4xl sm:text-6xl lg:text-[72px] tracking-[-0.02em] leading-[1.05] text-[rgb(1,1,16)] mb-8 max-w-4xl mx-auto">
          The second brain <br class="hidden md:block" />
          <span class="block italic font-medium text-[#D97756]">for your AI.</span>
        </h2>

        <div class="relative inline-flex p-3 mt-6 border border-dashed border-gray-300 rounded-md max-w-max mx-auto z-20">


          <div class="flex flex-row items-center justify-start gap-3 sm:gap-4">
            <router-link to="/signup/"
              class="w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 transition-all duration-200 shadow-md text-xs sm:text-base inline-flex items-center justify-center">
              Get Started
            </router-link>
            <router-link to="/#pricing"
              class="w-auto px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black font-bold rounded-md border border-gray-250 hover:bg-gray-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97756]/50 focus-visible:ring-offset-2 transition-all duration-200 text-xs sm:text-base inline-flex items-center justify-center">
              Compare Plans
            </router-link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>

    <!-- ScrollLaunch Badge (Detectable but visually hidden) -->
    <div class="sr-only">
      <a href="https://www.scrolllaunch.com/products/memwyre?utm_source=badge&utm_medium=embed&utm_campaign=memwyre&ref=scrolllaunch"
        target="_blank" rel="noopener noreferrer">
        <img src="https://www.scrolllaunch.com/api/badge/memwyre" alt="Featured on ScrollLaunch" width="220" height="48"
          loading="lazy" />
      </a>
    </div>

  </div>

</template>

<script setup>
import { computed, nextTick, ref, onMounted, onUnmounted } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';
import frame10Png from '@/assets/motion/FRAME 10.png';
import ChatDemo from '@/components/landing/ChatDemo.vue';
import OmnipresentDemo from '@/components/landing/OmnipresentDemo.vue';
import TimelineDemo from '@/components/landing/TimelineDemo.vue';
import InboxDemo from '@/components/landing/InboxDemo.vue';
import ScatteredWorkHero from '@/components/landing/ScatteredWorkHero.vue';
import ProductShowcase from '@/components/landing/ProductShowcase.vue';
import SetupTimerAnimation from '@/components/landing/usecases/SetupTimerAnimation.vue';
import NumericBgAnimation from '@/components/landing/NumericBgAnimation.vue';
import LavaNumericPattern from '@/components/landing/LavaNumericPattern.vue';
import ProcessorAnimation from '@/components/landing/ProcessorAnimation.vue';

// Use Case Animations
import EngineerMinAnimation from '@/components/landing/usecases/EngineerMinAnimation.vue';
import DevOpsMinAnimation from '@/components/landing/usecases/DevOpsMinAnimation.vue';
import ScatteredWorkMinAnimation from '@/components/landing/usecases/ScatteredWorkMinAnimation.vue';

// Official Branding Logo Wordmark Lockups (downloaded directly from official sources)
import claudeBrand from '@/assets/brands/claude.svg';
import cursorBrand from '@/assets/brands/cursor.svg';
import openaiBrand from '@/assets/brands/openai.png';
import geminiBrand from '@/assets/brands/gemini.svg';
import perplexityBrand from '@/assets/brands/perplexity.svg';
import notionBrand from '@/assets/brands/notion.png';
import windsurfBrand from '@/assets/brands/windsurf.png';

const platformIntegrations = [
  { name: 'Claude', logo: claudeBrand },
  { name: 'Cursor', logo: cursorBrand },
  { name: 'OpenAI', logo: openaiBrand },
  { name: 'Google Gemini', logo: geminiBrand },
  { name: 'Perplexity', logo: perplexityBrand },
  { name: 'Windsurf', logo: windsurfBrand },
  { name: 'Notion', logo: notionBrand },
];


// --- Hero Animation & Theme State ---
const heroAnimationMounted = ref(false);
const heroAnimationReady = ref(false);
let shouldRestoreDarkClass = false;

const heroAnimationStyle = computed(() => ({
  opacity: heroAnimationReady.value ? 1 : 0,
  transform: heroAnimationReady.value
    ? 'translate3d(0, 0, 0) scale(1)'
    : 'translate3d(18px, 0, 0) scale(0.985)',
}));

// --- Get Started Installer state & actions ---
const activeGetStartedTab = ref('claude');
const installerMode = ref('cli');
const getStartedCopied = ref(false);

const getStartedTabs = [
  { id: 'claude', name: 'Claude Desktop' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'vscode', name: 'VS Code' },
  { id: 'claudecode', name: 'Claude Code' },
  { id: 'codex', name: 'Codex' },
  { id: 'openclaw', name: 'OpenClaw' }
];

const getStartedCommand = computed(() => {
  const tab = activeGetStartedTab.value;
  if (tab === 'openclaw') {
    return 'openclaw plugins install @memwyre/openclaw-plugin';
  } else if (tab === 'claudecode') {
    return 'claude mcp add memwyre -- npx -y mcp-remote https://server.memwyre.tech/mcp';
  } else {
    return `npx -y install-memwyre --${tab}`;
  }
});

const getStartedJson = computed(() => {
  return JSON.stringify({
    mcpServers: {
      memwyre: {
        command: "npx",
        args: ["-y", "mcp-remote", "https://server.memwyre.tech/mcp"]
      }
    }
  }, null, 2);
});

const getStartedContent = computed(() => {
  if (installerMode.value === 'json' && ['claude', 'cursor', 'vscode'].includes(activeGetStartedTab.value)) {
    return getStartedJson.value;
  }
  return getStartedCommand.value;
});

const copyGetStartedContent = async () => {
  try {
    await navigator.clipboard.writeText(getStartedContent.value);
    getStartedCopied.value = true;
    setTimeout(() => {
      getStartedCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// --- LoCoMo Benchmark State ---
const activeBenchmarkCategory = ref('all');
const benchmarkInsights = {
  all: {
    title: 'Full Benchmark Suite (1,540 Queries)',
    desc: 'Across the complete evaluation suite, Memwyre improves upon previous benchmark results by +24.4% average accuracy while reducing context footprint by 81%.'
  },
  single: {
    title: 'Single-hop Entity Retrieval (+25.6% Accuracy)',
    desc: 'Direct factual retrieval across past chats. Memwyre indexes structured entity relations to resolve exact variable names, credentials, and preferences without hallucinations.'
  },
  multi: {
    title: 'Multi-hop Link Reasoning (+33.5% Accuracy)',
    desc: 'Synthesizing context across disconnected sessions. Memwyre connects past architectural decisions with current code changes without losing intermediate hops.'
  },
  adversarial: {
    title: 'Adversarial Noise Resistance (+17.7% Accuracy)',
    desc: 'When conflicting or outdated facts exist, Memwyre uses temporal decay and relevance scoring to prevent stale context from polluting model generation.'
  },
  temporal: {
    title: 'Temporal Evolution Tracking (+16.2% Accuracy)',
    desc: 'Tracks when requirements or conventions evolve over time, invalidating deprecated rules so your AI always uses your newest guidelines.'
  }
};

const heroCommandCopied = ref(false);
const copyHeroCommand = async () => {
  try {
    await navigator.clipboard.writeText('npx -y install-memwyre');
    heroCommandCopied.value = true;
    setTimeout(() => {
      heroCommandCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// --- Benchmark Section Refs & Animation State ---
const animateBars = ref(false);
const benchmarkSectionRef = ref(null);
let benchmarkObserver = null;

// --- Comparison Section Data & State ---
const animateComparisonBars = ref(false);
const comparisonSectionRef = ref(null);
let comparisonObserver = null;
const fewerTokensPercent = ref(40);

const comparisonFeatures = [
  {
    name: 'Memory Graph',
    icon: 'graph',
    memwyre: true,
    mem0: false,
    zep: true
  },
  {
    name: 'User Profiles',
    icon: 'user',
    memwyre: true,
    mem0: false,
    zep: false
  },
  {
    name: 'Document Retrieval',
    icon: 'document',
    memwyre: true,
    mem0: false,
    zep: false
  },
  {
    name: 'Connectors',
    icon: 'connector',
    memwyre: true,
    mem0: false,
    zep: false
  },
  {
    name: 'Document Extractors',
    icon: 'extractor',
    memwyre: true,
    mem0: false,
    zep: false
  },
  {
    name: 'Self-hostable',
    icon: 'selfhost',
    memwyre: true,
    mem0: true,
    zep: false
  },
  {
    name: 'Consumer Plugins',
    icon: 'plugin',
    memwyre: true,
    mem0: false,
    zep: false
  }
];

// --- Auto-rotating Feature Showcase State & Logic ---
const activeTab = ref(0);
const progressWidth = ref(0);
const videoRefs = ref([]);
const loadedTabs = ref(new Set([0]));
const activeVideoRef = computed(() => videoRefs.value[activeTab.value]);
const showcaseContainer = ref(null);
let showcaseObserver = null;
const isVisible = ref(false);
let progressFrameId = null;

const tabs = ref([
  {
    num: '01',
    tabTitle: 'Omnipresent Overlay',
    videoSrc: '/demo1.mp4',
    label: '01 / OMNIPRESENT OVERLAY',
    title: 'Access it from any app',
    bodyText: 'Invoke Memwyre instantly over any app. Access your shared memory layer across ChatGPT, Claude, Notion, or email to capture thoughts mid-conversation and sync context in a single click.'
  },
  {
    num: '02',
    tabTitle: 'Cross-Post Context',
    videoSrc: '/demo2.mp4',
    label: '02 / CROSS-POST CONTEXT',
    title: 'Send to any AI in one click',
    bodyText: 'Find notes or past context instantly with semantic search, even without exact keywords. Launch references directly into your preferred LLM without manual copy-pasting.'
  },
  {
    num: '03',
    tabTitle: 'Contextual Chat',
    videoSrc: '/demo3.mp4',
    label: '03 / CONTEXTUAL CHAT',
    title: 'Chat with your notes',
    bodyText: 'Get answers grounded in your saved notes rather than generic web data. View precise inline citations for every source, leveraging an AI that already knows your context.'
  },
  {
    num: '04',
    tabTitle: 'Granular Control',
    videoSrc: '/demo4.mp4',
    label: '04 / GRANULAR CONTROL',
    title: 'You decide what\'s saved',
    bodyText: 'Preview, edit, and tag captured memories before saving to ensure they surface in the right context, while retaining full control over your private shared memory layer.'
  }
]);

const updateProgress = () => {
  const video = activeVideoRef.value;
  if (video && video.duration) {
    progressWidth.value = (video.currentTime / video.duration) * 100;
  } else {
    progressWidth.value = 0;
  }
  if (isVisible.value) {
    progressFrameId = requestAnimationFrame(updateProgress);
  }
};

const startProgressLoop = () => {
  stopProgressLoop();
  if (isVisible.value) {
    progressFrameId = requestAnimationFrame(updateProgress);
  }
};

const stopProgressLoop = () => {
  if (progressFrameId) {
    cancelAnimationFrame(progressFrameId);
    progressFrameId = null;
  }
  progressWidth.value = 0;
};

const playActiveVideo = (reset = false) => {
  videoRefs.value.forEach((vid, i) => {
    if (vid) {
      if (i === activeTab.value) {
        const targetSrc = tabs.value[i].videoSrc;
        const currentSrc = vid.currentSrc || vid.src || '';
        const isSrcLoaded = currentSrc.includes(targetSrc);
        
        if (!isSrcLoaded) {
          vid.load();
        }
        if (reset) {
          vid.currentTime = 0;
        }
        if (isVisible.value) {
          vid.play().catch(() => {});
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    }
  });
};

const onVideoEnded = () => {
  const nextIndex = (activeTab.value + 1) % tabs.value.length;
  loadedTabs.value.add(nextIndex);
  loadedTabs.value = new Set(loadedTabs.value);
  activeTab.value = nextIndex;
  nextTick(() => {
    startProgressLoop();
    playActiveVideo(true);
  });
};

const selectTab = (index) => {
  loadedTabs.value.add(index);
  loadedTabs.value = new Set(loadedTabs.value);
  activeTab.value = index;
  progressWidth.value = 0;
  nextTick(() => {
    startProgressLoop();
    playActiveVideo(true);
  });
};

const setupShowcaseObserver = () => {
  showcaseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          loadedTabs.value.add(activeTab.value);
          loadedTabs.value = new Set(loadedTabs.value);
          startProgressLoop();
          nextTick(() => {
            playActiveVideo(false);
          });
        } else {
          isVisible.value = false;
          stopProgressLoop();
          if (activeVideoRef.value) {
            activeVideoRef.value.pause();
          }
        }
      });
    },
    { threshold: 0.15 }
  );

  if (showcaseContainer.value) {
    showcaseObserver.observe(showcaseContainer.value);
  }
};

const setupBenchmarkObserver = () => {
  benchmarkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateBars.value = true;
          if (benchmarkObserver && benchmarkSectionRef.value) {
            benchmarkObserver.unobserve(benchmarkSectionRef.value);
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  if (benchmarkSectionRef.value) {
    benchmarkObserver.observe(benchmarkSectionRef.value);
  }
};

const animateFewerTokens = () => {
  const start = 40;
  const end = 60;
  const duration = 3500; // 3.5 seconds (slower)
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeInOutQuad
    const easeProgress = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    fewerTokensPercent.value = Math.round(start + (end - start) * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const setupComparisonObserver = () => {
  comparisonObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateComparisonBars.value = true;
          animateFewerTokens();
          if (comparisonObserver && comparisonSectionRef.value) {
            comparisonObserver.unobserve(comparisonSectionRef.value);
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  if (comparisonSectionRef.value) {
    comparisonObserver.observe(comparisonSectionRef.value);
  }
};

onUnmounted(() => {
  stopProgressLoop();
  stopHowItWorksLoop();
  if (showcaseObserver) showcaseObserver.disconnect();
  if (benchmarkObserver) benchmarkObserver.disconnect();
  if (howItWorksObserver) howItWorksObserver.disconnect();
  if (comparisonObserver) comparisonObserver.disconnect();
});

// --- Animations & Lifecycle Hooks ---
onMounted(() => {
  nextTick(() => {
    requestAnimationFrame(() => {
      heroAnimationMounted.value = true;
      requestAnimationFrame(() => {
        heroAnimationReady.value = true;
      });
    });
  });
  typeWriter();
  setupShowcaseObserver();
  setupBenchmarkObserver();
  setupComparisonObserver();
  setupHowItWorksObserver();
});


// 3. FAQ accordion
const faqs = ref([
  {
    question: "What exactly is Memwyre?",
    answer: "Memwyre is a unified AI memory platform that captures your context across tools (browser, ChatGPT, Claude, Cursor) so you never lose an insight, code snippet, or research finding. It makes this knowledge instantly searchable and reusable by any tool.",
    isOpen: true
  },
  {
    question: "Is there a free plan?",
    answer: "Yes! Memwyre has a generous free tier that includes up to 50 memories, 10 document uploads, 30 AI chat messages, and full IDE integration via MCP. No credit card required — just sign up and start building your memory layer.",
    isOpen: false
  },
  {
    question: "How do I connect Memwyre to Cursor or VS Code?",
    answer: "You can connect Memwyre to Cursor, VS Code, or Claude Desktop using our official Model Context Protocol (MCP) server. This gives your AI assistant direct, real-time access to your entire shared memory layer.",
    isOpen: false
  },
  {
    question: "Do you offer a browser extension?",
    answer: "Yes! The Memwyre browser extension (available for Chrome and Edge) lets you instantly clip text, articles, and code snippets directly into your memory layer without breaking your flow.",
    isOpen: false
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. Your memory layer is fully private and encrypted. Your data is only accessible to you via authenticated sessions and your personal API keys.",
    isOpen: false
  },
  {
    question: "What is the OpenClaw plugin?",
    answer: "The OpenClaw plugin allows autonomous AI agents to read from and write to your Memwyre memory layer. This gives agents persistent memory across runs, letting them build on past debugging sessions and research.",
    isOpen: false
  },
  {
    question: "Why not just use ChatGPT's built-in memory?",
    answer: "ChatGPT memory is locked entirely inside ChatGPT. It cannot be accessed by Claude, Cursor, your terminal agents, or other LLMs. Memwyre acts as a universal, shared memory layer that works across all of these tools simultaneously.",
    isOpen: false
  },
  {
    question: "How is this different from traditional RAG?",
    answer: "Traditional RAG search takes static documents, chunks them, and searches for matches. Memwyre builds active, connected semantic profiles of your project guidelines, API models, and style rules, updating them dynamically in the background.",
    isOpen: false
  },
  {
    question: "How does Memwyre compare to Mem0 or Zep?",
    answer: "Mem0 and Zep are developer databases designed as backend infrastructure for teams building custom agents. Memwyre is a ready-to-use memory platform that connects directly to everyday consumer tools. You can view our detailed feature comparison table above.",
    isOpen: false
  }
]);

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};

// 2. Typing Effect
const typedText = ref("> How do I implement the new auth flow?");

const stepProgress = ref(0);
const activeStep = computed(() => {
  if (stepProgress.value < 33.333) return 0;
  if (stepProgress.value < 66.666) return 1;
  return 2;
});

const getIngestBarScaleY = (index) => {
  if (stepProgress.value >= 33.333) return 0.3;
  const normalizedProgress = (stepProgress.value / 33.333) * 100;
  const startThreshold = index * 6;
  const duration = 15;
  if (normalizedProgress < startThreshold) return 0.3;
  if (normalizedProgress > startThreshold + duration) return 1.0;
  const pct = (normalizedProgress - startThreshold) / duration;
  return 0.3 + pct * 0.7;
};

// --- Auto-rotating How It Works Grid ---
const howItWorksSectionRef = ref(null);
const isHowItWorksVisible = ref(false);
let howItWorksObserver = null;
let howItWorksFrameId = null;

let lastHowItWorksTime = 0;
const rotateSteps = (timestamp) => {
  if (!lastHowItWorksTime) lastHowItWorksTime = timestamp;
  const delta = timestamp - lastHowItWorksTime;
  lastHowItWorksTime = timestamp;

  if (isHowItWorksVisible.value) {
    stepProgress.value += (delta / 6000) * 100; // 6000ms for full loop (2000ms per step)
    if (stepProgress.value >= 100) {
      stepProgress.value = stepProgress.value % 100;
    }
  }

  if (isHowItWorksVisible.value) {
    howItWorksFrameId = requestAnimationFrame(rotateSteps);
  } else {
    lastHowItWorksTime = 0;
  }
};

const startHowItWorksLoop = () => {
  stopHowItWorksLoop();
  if (isHowItWorksVisible.value) {
    lastHowItWorksTime = 0;
    howItWorksFrameId = requestAnimationFrame(rotateSteps);
  }
};

const stopHowItWorksLoop = () => {
  if (howItWorksFrameId) {
    cancelAnimationFrame(howItWorksFrameId);
    howItWorksFrameId = null;
  }
  stepProgress.value = 0;
};

const setupHowItWorksObserver = () => {
  howItWorksObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isHowItWorksVisible.value = true;
          startHowItWorksLoop();
        } else {
          isHowItWorksVisible.value = false;
          stopHowItWorksLoop();
        }
      });
    },
    { threshold: 0.15 }
  );

  if (howItWorksSectionRef.value) {
    howItWorksObserver.observe(howItWorksSectionRef.value);
  }
};

const typeWriter = () => {
  // No-op - text is now pre-typed
};

</script>

<style scoped>
@keyframes pulse-flow {
  0%, 100% { opacity: 0.25; transform: scaleX(1); }
  50% { opacity: 0.9; transform: scaleX(1.15); }
}



.animate-raise-random {
  animation: raise-random 1s infinite ease-in-out;
}
@keyframes raise-random {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}

html {
  scroll-behavior: smooth;
}

/* Force light mode — override dark theme CSS variables */
.hero-wash {
  background: white;
}

.hero-grain {
  display: none;
}

.hero-animation-layer {
  opacity: 0;
  transform: translate3d(18px, 0, 0) scale(0.985);
  transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.hero-animation-layer.hero-animation-layer-ready {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.hero-serif {
  font-family: 'DM Serif Text', serif;
  letter-spacing: -0.02em;
}

.hero-visual {
  transform: translate(5%, 3%) rotate(-29deg) skewX(-2deg) scale(0.92);
  transform-origin: center;
}

.hero-track {
  position: absolute;
  left: -12%;
  right: -20%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(5, 6, 20, 0.16), transparent);
}

.hero-track-one {
  top: 48%;
}

.hero-track-two {
  top: 64%;
}

.voice-card {
  position: absolute;
  width: 182px;
  min-height: 62px;
  display: grid;
  gap: 6px;
  padding: 14px 18px;
  border: 1.5px solid rgba(5, 6, 20, 0.86);
  border-radius: 999px;
  background: rgba(247, 251, 255, 0.76);
  box-shadow: 0 18px 0 rgba(5, 6, 20, 0.08);
}

.voice-card span {
  height: 2px;
  border-radius: 999px;
  background: repeating-linear-gradient(90deg, #050614 0 9px, transparent 9px 17px);
}

.voice-card-one {
  left: 5%;
  bottom: 12%;
}

.voice-card-two {
  left: 34%;
  bottom: 21%;
}

.voice-card-three {
  left: 17%;
  bottom: -1%;
}

.hero-keyboard {
  position: absolute;
  left: 40%;
  top: 43%;
  width: 320px;
  height: 150px;
  border: 2px solid #050614;
  border-radius: 24px;
  background: linear-gradient(180deg, #fffef6 0%, #ffe477 100%);
  box-shadow: 18px 24px 0 rgba(5, 6, 20, 0.1);
}

.hero-keyboard::before {
  content: "";
  position: absolute;
  inset: 18px 20px 34px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(5, 6, 20, 0.18);
}

.key {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 74px;
  border: 2px solid #050614;
  border-radius: 14px;
  background: #fbfcff;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 10px 12px 0 rgba(5, 6, 20, 0.1);
}

.key-shift {
  left: 6px;
  top: -48px;
}

.key-control {
  right: 4px;
  top: -14px;
}

.key-main {
  left: 98px;
  top: 30px;
  min-width: 96px;
  height: 78px;
  background: #2c2b27;
}

.key-main img {
  width: 42px;
  height: 42px;
  filter: brightness(0) invert(1);
}

.hero-pill {
  position: absolute;
  min-width: 190px;
  padding: 13px 20px;
  border-radius: 999px;
  background: #2c2b27;
  color: #ffe26e;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 12px 0 rgba(5, 6, 20, 0.12);
}

.hero-pill::before {
  content: "";
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 12px;
  vertical-align: middle;
  border-radius: 999px;
  border: 2px solid #050614;
  background: radial-gradient(circle at center, #ffe26e 0 45%, transparent 47%), #ffe26e;
}

.pill-one {
  right: -2%;
  top: 8%;
}

.pill-two {
  right: 20%;
  top: 30%;
}

.pill-three {
  right: 33%;
  top: 50%;
}

.pill-four {
  right: -12%;
  top: 45%;
}

@media (max-width: 1023px) {
  .hero-visual {
    transform: rotate(-23deg) scale(0.84);
    min-height: 430px;
  }

  .hero-keyboard {
    left: 31%;
  }

  .pill-one {
    right: 2%;
  }

  .pill-four {
    right: -2%;
  }
}

@media (max-width: 512px) {
  .hero-visual {
    margin-top: -34px;
    transform: rotate(-19deg) scale(0.66);
    min-height: 330px;
  }
}

/* General mobile optimizations for all mobile screens */
@media (max-width: 512px) {
  .hero-wash {
    padding-top: 3rem !important;
    padding-bottom: 2rem !important;
    min-height: calc(100svh - 64px) !important;
  }

  .hero-wash .pt-20 {
    padding-top: 1.5rem !important;
  }

  .hero-wash h1 {
    font-size: 2.25rem !important;
    line-height: 1.25 !important;
  }

  .hero-wash h1 br {
    display: none !important;
  }

  .hero-wash p {
    margin-top: 0.75rem !important;
    font-size: 0.875rem !important;
    line-height: 1.45 !important;
  }

  .hero-wash .relative.inline-flex.p-3 {
    margin-top: 1rem !important;
    padding: 0.375rem !important;
  }

  /* Compact padding for sections to reduce scroll depth */
  #what-we-do,
  #llm-compatibility,
  #comparison,
  #features,
  #how-it-works,
  #benchmark,
  #ecosystem,
  #pricing,
  #blog-section,
  #faq {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }

  /* Compact section headings */
  #what-we-do h2,
  #llm-compatibility h2,
  #comparison h2,
  #features h2,
  #how-it-works h2,
  #benchmark h2,
  #ecosystem h2,
  #pricing h2,
  #blog-section h2,
  #faq h2 {
    font-size: 1.75rem !important;
    margin-bottom: 0.75rem !important;
    line-height: 1.2 !important;
  }

  /* Reduce margins on division lines */
  #what-we-do .mb-12,
  #llm-compatibility .mb-12,
  #comparison .mb-8,
  #features .mb-12,
  #how-it-works .mb-12,
  #benchmark .mb-8,
  #ecosystem .mb-16,
  #pricing .mb-12,
  #blog-section .mb-12,
  #faq .mb-16 {
    margin-bottom: 1.25rem !important;
  }
}

/* Specific optimizations for tall aspect ratio mobile viewports (19.5:9, 20:9, 21:9) */
@media (max-width: 512px) and (max-aspect-ratio: 9/17) {
  .hero-wash {
    min-height: calc(100svh - 64px) !important;
    padding-top: 4.5rem !important;
    padding-bottom: 4.5rem !important;
  }
  
  .hero-wash h1 {
    font-size: 2.375rem !important;
    line-height: 1.2 !important;
  }

  .hero-wash p {
    margin-top: 1.25rem !important;
    font-size: 0.95rem !important;
    line-height: 1.5 !important;
  }

  .hero-wash .relative.inline-flex.p-3 {
    margin-top: 2rem !important;
    padding: 0.5rem !important;
  }

  /* Give sections a bit more breathing room on tall flagships */
  #what-we-do,
  #llm-compatibility,
  #comparison,
  #features,
  #how-it-works,
  #benchmark,
  #ecosystem,
  #pricing,
  #blog-section,
  #faq {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
}



.force-light,
.force-light * {
  --bg-app: #FAF6F0;
  --bg-surface: #FFFFFF;
  --bg-surface-2: #F7F6F3;
  --bg-elevated: #FFFFFF;
  --primary: #D97756;
  --primary-600: #C4654A;
  --accent: #D97756;
  --accent-600: #C4654A;
  --success: #059669;
  --warning: #D97706;
  --danger: #DC2626;
  --info: #D97756;
  --text-primary: #191919;
  --text-secondary: #37352F99;
  --text-muted: #37352F66;
  --border: rgba(25, 25, 25, 0.06);
  --divider-strong: rgba(25, 25, 25, 0.09);
  --backdrop: rgba(0, 0, 0, 0.4);
  --input-bg: #FFFFFF;
  --input-border: rgba(25, 25, 25, 0.08);
  --placeholder: #37352F66;
  color-scheme: light;
}

/* Typing Cursor */
.cursor {
  display: inline-block;
  width: 8px;
  background-color: currentColor;
  animation: blink 1s step-end infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@keyframes gradient-slow {

  0%,
  100% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 100%;
  }
}

.animate-gradient-slow {
  background-size: 200% 200%;
  animation: gradient-slow 8s ease-in-out infinite;
}

/* Video edge feathering via CSS mask — no overlays needed */
.video-blend {
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, black 40%),
    linear-gradient(to top, transparent 0%, black 40%),
    linear-gradient(to bottom, transparent 0%, black 15%);
  -webkit-mask-composite: destination-in;
  mask-image:
    linear-gradient(to right, transparent 0%, black 40%),
    linear-gradient(to top, transparent 0%, black 40%),
    linear-gradient(to bottom, transparent 0%, black 15%);
  mask-composite: intersect;
}

/* Floating icon animations */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float-1 {
  animation: float 4s ease-in-out infinite;
}

.animate-float-2 {
  animation: float 5s ease-in-out infinite reverse;
}

.animate-float-3 {
  animation: float 6s ease-in-out infinite;
}

@keyframes gradient-x {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 4s ease-in-out infinite;
}

/* 4-second Recurring Liquid Glass Shimmer Sweep */
@keyframes shimmer-sweep {
  0% {
    transform: rotate(-45deg) translateX(-160%);
  }
  28% {
    transform: rotate(-45deg) translateX(160%);
  }
  100% {
    transform: rotate(-45deg) translateX(160%);
  }
}

.animate-shimmer-sweep {
  animation: shimmer-sweep 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* 4-second Recurring Liquid Glass Ambient Breathing */
@keyframes liquid-breathe-1 {
  0%, 100% {
    transform: scale(1) translate(0, 0);
  }
  30% {
    transform: scale(1.08) translate(3px, -3px);
  }
  60% {
    transform: scale(1.03) translate(1px, -1px);
  }
}

@keyframes liquid-breathe-2 {
  0%, 100% {
    transform: scale(1) translate(0, 0);
    opacity: 0.9;
  }
  30% {
    transform: scale(1.1) translate(-3px, 3px);
    opacity: 1;
  }
  60% {
    transform: scale(1.04) translate(-1px, 1px);
    opacity: 0.95;
  }
}

.animate-liquid-1 {
  animation: liquid-breathe-1 4s ease-in-out infinite;
}

.animate-liquid-2 {
  animation: liquid-breathe-2 4s ease-in-out infinite;
}

/* Infinite Horizontal Marquee */
@keyframes marquee-scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  display: flex;
  animation: marquee-scroll 32s linear infinite;
  will-change: transform;
}
</style>
