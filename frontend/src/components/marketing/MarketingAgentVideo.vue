<template>
  <div 
    ref="containerRef"
    class="video-stage font-sans relative w-full h-full select-none overflow-hidden flex flex-col items-center justify-center bg-[#09090b]"
    tabindex="0"
    @keydown.space.prevent="togglePlay"
    @keydown.left.prevent="seekRelative(-2)"
    @keydown.right.prevent="seekRelative(2)"
    @keydown.f.prevent="toggleFullscreen"
  >
    <!-- Background Ambient Glow -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        class="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-all duration-400 ease-out"
        :style="{ background: ambientGlowColor }"
      ></div>
      <div 
        class="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-all duration-400 ease-out"
        :style="{ background: ambientGlowColor }"
      ></div>
    </div>

    <!-- Main Viewport Box: Square Frame -->
    <div 
      class="canvas-wrapper relative aspect-square w-full max-w-[680px] sm:max-w-[720px] max-h-[84vh] rounded-[36px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.65)] border border-white/10 flex flex-col justify-between"
      style="background: #ECEAE4;"
    >
      <!-- Center Interactive Canvas: One Main Morphing Div with Headline Just Above Component -->
      <div class="relative flex-1 w-full flex items-center justify-center p-3 sm:p-4 overflow-visible">
        <!-- Responsive Scaled Stage for Components Inside Main Frame -->
        <div 
          ref="stageRef"
          class="zoom-stage relative w-full h-full flex items-center justify-center pointer-events-none"
          :style="{ transform: `scale(${stageScale})`, transformOrigin: 'center' }"
        >
          <!-- Component Wrapper with Headline Attached Directly Above -->
          <div class="relative flex flex-col items-center">
            <!-- Dynamic Headline: Positioned just above the component -->
            <div class="absolute bottom-full mb-4 sm:mb-5 left-1/2 -translate-x-1/2 w-max max-w-[640px] flex justify-center pointer-events-none z-20">
              <h2 
                class="headline-text text-[24px] sm:text-[28px] font-semibold tracking-[-0.025em] text-[#111111] text-center leading-tight transition-all duration-300 ease-out whitespace-nowrap"
                :class="headlineAnimating ? 'opacity-0 scale-[0.96]' : 'opacity-100 scale-100'"
              >
                {{ currentHeadline }}
              </h2>
            </div>

            <!-- Persistent Morphing Container (Shape-shifts: Pill -> Rectangle -> Badge -> Menu -> Card -> Square) -->
            <div 
              ref="morphRef"
              class="morph-container pointer-events-auto relative flex flex-col justify-center items-center overflow-hidden"
              :style="containerMorphStyle"
            >
            <!-- Scene 1: Button Pill -->
            <div 
              v-if="sceneIndex === 0" 
              class="scene-inner w-full h-full flex items-center justify-center gap-3.5 cursor-pointer select-none transition-all duration-150"
              :class="{
                'scale-[0.98]': cursorClicked && time < 2.5,
                'opacity-0 scale-95': time >= 2.74
              }"
            >
              <img 
                src="/favicon-192.png" 
                alt="Memwyre" 
                class="w-11 h-11 object-contain rounded-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
              />
              <span class="text-[25px] sm:text-[26px] font-semibold tracking-tight text-white whitespace-nowrap">
                Sync with Memwyre
              </span>
              <div 
                v-if="clickRippleScene1" 
                class="absolute inset-0 rounded-full border-2 border-white/40 animate-ping pointer-events-none"
              ></div>
            </div>

            <!-- Scene 2: Needs Grid -->
            <div v-if="sceneIndex === 1" class="scene-inner w-full h-full flex flex-col justify-between">
              <div class="text-[15px] font-semibold text-neutral-500 uppercase tracking-wider pb-1">
                Every agent needs
              </div>
              <div class="grid grid-cols-2 gap-2.5 flex-1 mt-1">
                <div class="pill-item h-11 sm:h-12 flex items-center gap-2.5 px-4.5 rounded-full bg-[#f6f5f3] text-neutral-800 text-[16px] font-medium transition-all duration-200" :class="time >= 2.9 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
                  <svg class="w-5 h-5 text-neutral-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                    <path d="M16 21h5v-5"/>
                  </svg>
                  <span>Session Sync</span>
                </div>
                <div class="pill-item h-11 sm:h-12 flex items-center gap-2.5 px-4.5 rounded-full bg-[#f6f5f3] text-neutral-800 text-[16px] font-medium transition-all duration-200 delay-75" :class="time >= 3.0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
                  <svg class="w-5 h-5 text-neutral-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  <span>Fast Recall</span>
                </div>
                <div class="pill-item h-11 sm:h-12 flex items-center gap-2.5 px-4.5 rounded-full bg-[#f6f5f3] text-neutral-800 text-[16px] font-medium transition-all duration-200 delay-100" :class="time >= 3.1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
                  <svg class="w-5 h-5 text-neutral-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>Memory Graph</span>
                </div>
                <div class="pill-item h-11 sm:h-12 flex items-center gap-2.5 px-4.5 rounded-full bg-[#f6f5f3] text-neutral-800 text-[16px] font-medium transition-all duration-200 delay-150" :class="time >= 3.2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
                  <svg class="w-5 h-5 text-neutral-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span>Auto Pruning</span>
                </div>
                <div class="pill-item h-11 sm:h-12 flex items-center gap-2.5 px-4.5 rounded-full bg-neutral-900 text-white text-[16px] font-semibold transition-all duration-200 shadow-sm" :class="time >= 3.7 ? 'opacity-100 scale-100 ring-2 ring-orange-500/50' : 'opacity-0 scale-90'">
                  <img src="/favicon-192.png" class="w-5 h-5 object-contain rounded-xs" />
                  <span>Persistent Memory</span>
                </div>
                <div class="pill-item h-11 sm:h-12 flex items-center gap-2.5 px-4.5 rounded-full bg-[#f6f5f3] text-neutral-800 text-[16px] font-medium transition-all duration-200 delay-100" :class="time >= 3.9 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
                  <svg class="w-5 h-5 text-neutral-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Recency decay</span>
                </div>
              </div>
            </div>

            <!-- Scene 3: Meet Memwyre Wordmark Badge (Two-step transformation) -->
            <div 
              v-if="sceneIndex === 2" 
              class="scene-inner w-full h-full flex flex-col items-center justify-center text-center transition-all duration-300 ease-out"
              :class="time >= 6.0 ? 'gap-2' : 'gap-0'"
            >
              <img 
                src="/logo.png" 
                alt="Memwyre" 
                class="w-auto object-contain transition-all duration-300 ease-out"
                :class="time < 6.0 ? 'h-[64px] sm:h-[68px]' : 'h-10 sm:h-[44px]'"
              />
              <p 
                v-if="time >= 5.95"
                class="text-[14px] sm:text-[15.5px] text-neutral-500 font-medium tracking-tight whitespace-nowrap transition-all duration-300 ease-out transform animate-scale-spring"
                :class="time >= 6.05 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'"
              >
                Memory for every AI agent & LLM
              </p>
            </div>

            <!-- Scene 4: Connected Tools Card -->
            <div v-if="sceneIndex === 3" class="scene-inner w-full h-full flex flex-col">
              <div class="flex items-center justify-between pb-2.5 border-b border-black/[0.06] flex-shrink-0">
                <span class="text-[17px] sm:text-[18px] font-semibold text-neutral-900">Connected Tools</span>
              </div>
              <div class="flex flex-col gap-2 mt-2 flex-1">
                <!-- Option 1: Cursor -->
                <div 
                  class="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/[0.03] transition-opacity duration-200"
                  :class="time >= 7.05 ? 'opacity-100' : 'opacity-0'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="cursorCubeLight" class="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div class="text-[17px] font-semibold text-neutral-900 leading-tight">Cursor</div>
                      <div class="text-[14px] text-neutral-500">Active IDE · Workspace Context</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-[14px] font-medium text-neutral-400">
                    <span class="w-2.5 h-2.5 rounded-full bg-neutral-400"></span>
                    <span>Synced</span>
                  </div>
                </div>

                <!-- Option 2: Claude Code -->
                <div 
                  v-if="time >= 7.55"
                  class="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/[0.03] transition-opacity duration-200"
                  :class="time >= 7.6 ? 'opacity-100' : 'opacity-0'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="claudeCodeColor" class="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div class="text-[17px] font-semibold text-neutral-900 leading-tight">Claude Code</div>
                      <div class="text-[14px] text-neutral-500">Terminal Agent · Shared Memory</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-[14px] font-medium text-neutral-400">
                    <span class="w-2.5 h-2.5 rounded-full bg-neutral-400"></span>
                    <span>Synced</span>
                  </div>
                </div>

                <!-- Option 3: Codex -->
                <div 
                  v-if="time >= 8.15"
                  class="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/[0.03] transition-opacity duration-200"
                  :class="time >= 8.2 ? 'opacity-100' : 'opacity-0'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="codexColor" class="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div class="text-[17px] font-semibold text-neutral-900 leading-tight">Codex</div>
                      <div class="text-[14px] text-neutral-500">Cloud Agent · Background Sync</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-[14px] font-medium text-neutral-400">
                    <span class="w-2.5 h-2.5 rounded-full bg-neutral-400"></span>
                    <span>Synced</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scene 5: LLM Engine Vertical Menu -->
            <div v-if="sceneIndex === 4" class="scene-inner w-full h-full flex flex-col justify-between">
              <div class="text-[14.5px] sm:text-[15.5px] font-semibold text-neutral-500 uppercase tracking-wider px-2 pb-1">
                LLM Engine (Decoupled Memory)
              </div>
              <div class="space-y-2 flex-1 flex flex-col justify-between pt-1">
                <div 
                  class="flex items-center gap-3.5 px-4 h-12 sm:h-[52px] rounded-xl text-[18.5px] sm:text-[19.5px] font-medium transition-all duration-150 cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
                  :class="activeHoverLlm === 'claude' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-700'"
                >
                  <img :src="claudeColor" class="w-6.5 h-6.5 sm:w-7 sm:h-7 flex-shrink-0 object-contain" />
                  <span>Claude</span>
                </div>
                <div 
                  class="flex items-center gap-3.5 px-4 h-12 sm:h-[52px] rounded-xl text-[18.5px] sm:text-[19.5px] font-medium transition-all duration-150 cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
                  :class="activeHoverLlm === 'gpt' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-700'"
                >
                  <img :src="openaiColor" class="w-6.5 h-6.5 sm:w-7 sm:h-7 flex-shrink-0 object-contain" />
                  <span>GPT</span>
                </div>
                <div 
                  class="flex items-center gap-3.5 px-4 h-12 sm:h-[52px] rounded-xl text-[18.5px] sm:text-[19.5px] font-medium transition-all duration-150 cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
                  :class="activeHoverLlm === 'gemini' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-700'"
                >
                  <img :src="geminiColor" class="w-6.5 h-6.5 sm:w-7 sm:h-7 flex-shrink-0 object-contain" />
                  <span>Gemini</span>
                </div>
                <div 
                  class="flex items-center gap-3.5 px-4 h-12 sm:h-[52px] rounded-xl text-[18.5px] sm:text-[19.5px] font-medium transition-all duration-150 cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
                  :class="activeHoverLlm === 'grok' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-700'"
                >
                  <img :src="grokColor" class="w-6.5 h-6.5 sm:w-7 sm:h-7 flex-shrink-0 object-contain" />
                  <span>Grok</span>
                </div>
                <div 
                  class="flex items-center justify-between px-4 h-12 sm:h-[52px] rounded-xl text-[18.5px] sm:text-[19.5px] font-medium transition-all duration-150 cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
                  :class="activeHoverLlm === 'perplexity' ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-700'"
                >
                  <div class="flex items-center gap-3.5">
                    <img :src="perplexityColor" class="w-6.5 h-6.5 sm:w-7 sm:h-7 flex-shrink-0 object-contain" />
                    <span>Perplexity</span>
                  </div>
                  <svg v-if="time >= 10.8" class="w-6 h-6 text-neutral-900 animate-scale-spring flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Scene 6: Any Agent Universal MCP -->
            <div v-if="sceneIndex === 5" class="scene-inner w-full h-full flex flex-col justify-between">
              <div>
                <div class="text-[15px] font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">Agents</div>
                <div class="flex items-center justify-between px-0.5">
                  <div 
                    class="flex flex-col items-center gap-1.5 transition-all duration-200 ease-out transform"
                    :class="time >= 11.05 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'"
                  >
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="claudeCodeColor" class="w-full h-full object-contain" />
                    </div>
                    <span class="text-[14px] text-neutral-500 font-medium">Claude Code</span>
                  </div>

                  <div 
                    class="flex flex-col items-center gap-1.5 transition-all duration-200 ease-out transform"
                    :class="time >= 11.12 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'"
                  >
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="codexColor" class="w-full h-full object-contain" />
                    </div>
                    <span class="text-[14px] text-neutral-500 font-medium">Codex</span>
                  </div>

                  <div 
                    class="flex flex-col items-center gap-1.5 transition-all duration-200 ease-out transform"
                    :class="time >= 11.19 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'"
                  >
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="openCodeColor" class="w-full h-full object-contain" />
                    </div>
                    <span class="text-[14px] text-neutral-500 font-medium">OpenCode</span>
                  </div>

                  <div 
                    class="flex flex-col items-center gap-1.5 transition-all duration-200 ease-out transform"
                    :class="time >= 11.26 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'"
                  >
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs overflow-hidden">
                      <img src="/hermes-icon.png" alt="Hermes" class="w-full h-full object-contain" />
                    </div>
                    <span class="text-[14px] text-neutral-500 font-medium">Hermes</span>
                  </div>

                  <div 
                    class="flex flex-col items-center gap-1.5 transition-all duration-200 ease-out transform"
                    :class="time >= 11.33 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'"
                  >
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="openclawColor" class="w-full h-full object-contain" />
                    </div>
                    <span class="text-[14px] text-neutral-500 font-medium">OpenClaw</span>
                  </div>

                  <div 
                    class="flex flex-col items-center gap-1.5 transition-all duration-200 ease-out transform"
                    :class="time >= 11.40 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-2'"
                  >
                    <div class="w-12 h-12 rounded-xl bg-neutral-100 border border-black/[0.08] flex items-center justify-center p-2.5 shadow-2xs">
                      <img :src="windsurfColor" class="w-full h-full object-contain" />
                    </div>
                    <span class="text-[14px] text-neutral-500 font-medium">Windsurf</span>
                  </div>
                </div>
              </div>

              <div class="w-full h-px bg-neutral-200/60 my-2.5"></div>

              <div>
                <div class="text-[15px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Tools</div>
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between h-11 px-2 rounded-xl hover:bg-black/[0.02]">
                    <div class="flex items-center gap-2.5 text-[17px] font-medium text-neutral-800">
                      <svg class="w-5 h-5 text-neutral-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2"></polygon>
                        <line x1="12" y1="22" x2="12" y2="15.5"></line>
                        <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                        <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
                        <line x1="12" y1="22" x2="12" y2="8.5"></line>
                      </svg>
                      <span>MCP Memory Server</span>
                    </div>
                    <div class="w-[58px] h-[32px] rounded-full p-1 bg-[#8f8f8f] transition-colors duration-200 flex-shrink-0">
                      <div class="w-6 h-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] translate-x-0"></div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between h-11 px-2 rounded-xl hover:bg-black/[0.02]">
                    <div class="flex items-center gap-2.5 text-[17px] font-medium text-neutral-800">
                      <img :src="chromeLogo" class="w-5 h-5 object-contain flex-shrink-0" />
                      <span>Chrome Extension</span>
                    </div>
                    <div 
                      class="w-[58px] h-[32px] rounded-full p-1 transition-colors duration-200 flex-shrink-0"
                      :style="{ backgroundColor: time >= 12.4 ? '#171717' : '#8f8f8f' }"
                    >
                      <div 
                        class="w-6 h-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200"
                        :class="time >= 12.4 ? 'translate-x-[26px]' : 'translate-x-0'"
                      ></div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between h-11 px-2 rounded-xl hover:bg-black/[0.02]">
                    <div class="flex items-center gap-2.5 text-[17px] font-medium text-neutral-800">
                      <img :src="googleDriveLogo" class="w-5 h-5 object-contain flex-shrink-0" />
                      <span>Google Drive</span>
                    </div>
                    <div 
                      class="w-[58px] h-[32px] rounded-full p-1 transition-colors duration-200 flex-shrink-0"
                      :style="{ backgroundColor: time >= 12.8 ? '#171717' : '#8f8f8f' }"
                    >
                      <div 
                        class="w-6 h-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200"
                        :class="time >= 12.8 ? 'translate-x-[26px]' : 'translate-x-0'"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scene 7: Context Engine Slider -->
            <div v-if="sceneIndex === 6" class="scene-inner w-full h-full flex flex-col justify-center gap-3">
              <div class="flex items-center gap-2.5">
                <div class="flex-1 flex items-center justify-center gap-2.5 h-12 px-4 rounded-full bg-[#f6f5f3] text-[15.5px] font-medium text-neutral-800 border border-black/[0.04]">
                  <svg class="w-5 h-5 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span class="whitespace-nowrap">Fact Extraction</span>
                </div>
                <div class="flex-1 flex items-center justify-center gap-2.5 h-12 px-4 rounded-full bg-[#f6f5f3] text-[15.5px] font-medium text-neutral-800 border border-black/[0.04]">
                  <svg class="w-5 h-5 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span class="whitespace-nowrap">Fresh Context</span>
                </div>
              </div>
              <div class="h-12 relative bg-neutral-100 rounded-full overflow-hidden flex items-center justify-between text-[16px] font-semibold">
                <div 
                  class="absolute top-0 bottom-0 rounded-full bg-neutral-900 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  :style="autonomySliderStyle"
                ></div>
                <div class="relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-200" :class="autonomyActiveSide === 'left' ? 'text-white' : 'text-neutral-500'">
                  Auto-Recall
                </div>
                <div class="relative z-10 flex-1 h-full flex items-center justify-center transition-colors duration-200" :class="autonomyActiveSide === 'right' ? 'text-white' : 'text-neutral-500'">
                  Approval Inbox
                </div>
              </div>
            </div>

            <!-- Scene 8: Dev Chat Input -->
            <div v-if="sceneIndex === 7" class="scene-inner w-full h-full flex flex-col justify-center gap-2.5">
              <div class="flex items-center justify-between pb-2 border-b border-black/[0.06]">
                <div class="flex items-center gap-2">
                  <span class="text-neutral-400 font-bold text-[17px]">#</span>
                  <span class="text-[17px] font-semibold text-neutral-900">dev-chat</span>
                </div>
                <div class="flex items-center gap-2.5 text-neutral-400">
                  <img :src="slackColor" class="w-5 h-5 object-contain" />
                  <img :src="notionLogo" class="w-5 h-5 object-contain" />
                </div>
              </div>
              <div class="relative flex items-center bg-[#f6f5f3] rounded-2xl px-4 py-2.5 border border-black/[0.06] min-h-[52px]">
                <div class="flex-1 min-w-0 text-[16.5px] text-neutral-900 font-normal flex items-center flex-nowrap gap-2.5 whitespace-nowrap overflow-hidden">
                  <span v-if="time >= 15.4" class="inline-flex items-center bg-neutral-200/90 text-neutral-900 px-2.5 py-0.5 rounded-md text-[14.5px] font-semibold flex-shrink-0 animate-scale-spring">
                    @memwyre
                  </span>
                  <span class="whitespace-nowrap flex-shrink-0">{{ typedChatText }}</span>
                  <span v-if="time < 16.8" class="inline-block w-0.5 h-4.5 bg-neutral-800 animate-pulse flex-shrink-0"></span>
                </div>
                <div class="w-9.5 h-9.5 rounded-full flex-shrink-0 flex items-center justify-center transition-transform duration-150 ml-2.5" :class="time >= 16.8 ? 'bg-neutral-900 scale-90 text-white' : 'bg-neutral-900 text-white shadow-xs'">
                  <svg class="w-4.5 h-4.5 -translate-x-[1px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Scene 9: Instant Recall -->
            <div v-if="sceneIndex === 8" class="scene-inner w-full h-full flex items-center justify-center">
              <div v-if="time < 17.65" class="w-full flex items-center justify-between whitespace-nowrap flex-nowrap gap-3">
                <div class="flex items-center gap-3 whitespace-nowrap flex-nowrap min-w-0">
                  <img src="/favicon-192.png" alt="Memwyre" class="w-6 h-6 object-contain rounded-xs flex-shrink-0" />
                  <span class="text-[17.5px] font-semibold text-white whitespace-nowrap flex-shrink-0">memwyre</span>
                  <span class="text-[16px] text-neutral-400 font-normal whitespace-nowrap flex-shrink-0">retrieving context...</span>
                </div>
                <div class="flex items-center gap-1.5 h-5 pl-1 flex-shrink-0">
                  <span class="w-1.5 h-4 bg-neutral-200 rounded-full animate-wave-1"></span>
                  <span class="w-1.5 h-5 bg-neutral-200 rounded-full animate-wave-2"></span>
                  <span class="w-1.5 h-4 bg-neutral-200 rounded-full animate-wave-3"></span>
                  <span class="w-1.5 h-3 bg-neutral-200 rounded-full animate-wave-4"></span>
                </div>
              </div>
              <div v-else class="w-full h-full flex flex-col justify-center gap-2.5">
                <div class="flex items-center justify-between pb-2 border-b border-white/10">
                  <div class="flex items-center gap-2.5">
                    <img src="/favicon-192.png" alt="Memwyre" class="w-6 h-6 object-contain rounded-xs" />
                    <span class="text-[17.5px] font-semibold text-white">memwyre</span>
                    <span class="text-[15px] text-neutral-400 font-normal">in #dev-chat</span>
                  </div>
                  <div class="flex items-center gap-2.5">
                    <span class="text-[14.5px] px-2.5 py-0.5 rounded bg-white/10 text-neutral-300 font-medium tabular-nums">0.8s</span>
                    <img :src="slackColor" class="w-5 h-5 object-contain opacity-70" />
                  </div>
                </div>
                <div class="text-[17px] font-medium text-white/95 leading-snug">
                  Retrieved 3 facts: JWT TTL is <span class="tabular-nums font-semibold">24h</span>, PostgreSQL schemas cached (LoCoMo <span class="tabular-nums font-semibold">73.5%</span>).
                </div>
              </div>
            </div>

            <!-- Scene 10: LoCoMo Tokens -->
            <div v-if="sceneIndex === 9" class="scene-inner w-full h-full flex flex-col justify-between">
              <div class="flex items-center justify-center">
                <div class="bg-neutral-100 rounded-full p-1.5 flex items-center gap-2 text-[17px] sm:text-[18px] font-semibold border border-black/[0.04]">
                  <span class="px-5 py-1.5 text-neutral-500">Accuracy</span>
                  <span class="px-5 py-1.5 text-neutral-500">Latency</span>
                  <span class="px-5.5 py-1.5 rounded-full transition-all duration-300" :class="time >= 19.5 ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-500'">
                    Tokens
                  </span>
                </div>
              </div>
              <div class="mt-1">
                <div class="text-[14.5px] text-neutral-500 font-medium tracking-wide uppercase">Mean token footprint (LoCoMo-10)</div>
                <div class="text-[34px] font-bold text-neutral-900 leading-tight tabular-nums">~3,000 tokens</div>
              </div>
              <div class="w-full flex flex-col gap-2">
                <div class="relative w-full h-[90px]">
                  <svg class="w-full h-full overflow-visible" viewBox="0 0 320 80">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#141414" stop-opacity="0.12" />
                        <stop offset="100%" stop-color="#141414" stop-opacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M 10 55 Q 50 50, 90 40 T 170 30 T 230 45 T 310 15 L 310 75 L 10 75 Z" fill="url(#chartGradient)" />
                    <path d="M 10 55 Q 50 50, 90 40 T 170 30 T 230 45 T 310 15" fill="none" stroke="#141414" stroke-width="2" stroke-linecap="round" />
                    <circle :cx="chartTooltipX" :cy="chartTooltipY" r="4.5" fill="#141414" stroke="#ffffff" stroke-width="2" />
                  </svg>
                  <div class="absolute z-20 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-[14.5px] tabular-nums font-semibold shadow-md pointer-events-none transition-all duration-300 transform -translate-x-1/2 -translate-y-8 animate-scale-spring" :style="{ left: chartTooltipLeft + '%', top: chartTooltipTop + '%' }">
                    {{ time >= 20.2 ? '~3k tokens' : '~26k tokens' }}
                  </div>
                </div>
                <div class="flex items-center justify-between text-[14.5px] text-neutral-400 font-medium">
                  <span>Flat RAG (<span class="tabular-nums">26k</span>)</span>
                  <span>Memwyre (<span class="tabular-nums">3k</span>)</span>
                </div>
              </div>
            </div>

            <!-- Scene 11: Self-Host -->
            <div 
              v-if="sceneIndex === 10" 
              class="scene-inner w-full h-full flex flex-col"
              :class="time < 21.58 ? 'justify-center' : 'justify-between'"
            >
              <div class="flex items-center justify-between flex-shrink-0">
                <span class="text-[20px] font-semibold text-neutral-900 leading-none">Self-hosted</span>
                <div 
                  class="w-[58px] h-[32px] rounded-full p-1 transition-colors duration-200 flex-shrink-0"
                  :style="{ backgroundColor: time >= 21.6 ? '#171717' : '#8f8f8f' }"
                >
                  <div 
                    class="w-6 h-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200"
                    :class="time >= 21.6 ? 'translate-x-[26px]' : 'translate-x-0'"
                  ></div>
                </div>
              </div>

              <div v-if="time >= 21.58" class="flex flex-col gap-2.5 pt-2.5 border-t border-black/[0.06] mt-1.5 flex-1">
                <!-- Option 1: Docker -->
                <div 
                  class="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-black/[0.04] text-[16.5px] font-medium text-neutral-800 transition-opacity duration-200"
                  :class="time >= 21.6 ? 'opacity-100' : 'opacity-0'"
                >
                  <svg class="w-5 h-5 text-neutral-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span>One-Command Docker</span>
                </div>

                <!-- Option 2: Database -->
                <div 
                  v-if="time >= 21.92"
                  class="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-black/[0.04] text-[16.5px] font-medium text-neutral-800 transition-opacity duration-200"
                  :class="time >= 21.95 ? 'opacity-100' : 'opacity-0'"
                >
                  <svg class="w-5 h-5 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                  </svg>
                  <span>Bring Your Own Database</span>
                </div>

                <!-- Option 3: Air-gapped -->
                <div 
                  v-if="time >= 22.27"
                  class="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-black/[0.04] text-[16.5px] font-medium text-neutral-800 transition-opacity duration-200"
                  :class="time >= 22.3 ? 'opacity-100' : 'opacity-0'"
                >
                  <svg class="w-5 h-5 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Air-gapped & Local-first</span>
                </div>
              </div>
            </div>

            <!-- Scene 12: Outro Wordmark & CTA -->
            <div v-if="sceneIndex === 11" class="scene-inner w-full h-full flex flex-col items-center justify-center text-center gap-3.5">
              <img src="/logo.png" alt="Memwyre" class="h-12 w-auto object-contain" />
              <div class="px-5 py-2.5 rounded-full bg-neutral-100 text-neutral-900 text-[16px] font-semibold border border-black/[0.08] shadow-2xs tracking-tight">
                npx -y install-memwyre
              </div>
              <p class="text-[15px] font-medium text-neutral-500 tracking-tight">
                memwyre.tech · Apache 2.0
              </p>
            </div>
            </div>
          </div>

          <!-- Simulated mouse cursor -->
          <div 
            v-show="cursorVisible"
            class="animated-cursor absolute z-50 pointer-events-none transition-transform ease-out"
            :style="cursorStyle"
          >
            <svg 
              class="w-6 h-6 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] transition-transform duration-100"
              :class="{ 'scale-90': cursorClicked }"
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z" 
                fill="#121212" 
                stroke="#FFFFFF" 
                stroke-width="1.8" 
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Bottom Video Player Control Bar -->
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-2 z-40">
        <!-- Scrub Track: Touch/Mouse Pointer Support with 24px Target -->
        <div 
          class="relative w-full h-6 flex items-center cursor-pointer group touch-none"
          role="slider" 
          aria-label="Seek" 
          :aria-valuemin="0" 
          :aria-valuemax="TOTAL_DURATION"
          :aria-valuenow="Math.round(time)" 
          @pointerdown="handleScrubStart"
        >
          <div class="w-full h-1 bg-white/30 rounded-full group-hover:h-1.5 transition-all">
            <div 
              class="h-full bg-white rounded-full relative"
              :style="{ width: progressPercent + '%' }"
            >
              <div class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>

        <!-- Controls Row -->
        <div class="flex items-center justify-between text-white text-xs px-1">
          <div class="flex items-center gap-2">
            <button 
              @click="togglePlay"
              class="size-8 grid place-items-center rounded-md hover:bg-white/10 transition-colors"
              :title="isPlaying ? 'Pause' : 'Play'"
            >
              <svg v-if="!isPlaying" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <svg v-else class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </button>

            <button 
              @click="restart"
              class="size-8 grid place-items-center rounded-md hover:bg-white/10 transition-colors"
              title="Restart"
            >
              <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <span class="text-[12px] text-white/90 pl-1 tabular-nums">
              {{ formattedCurrentTime }} / {{ formattedDuration }}
            </span>
          </div>

          <!-- Right Controls -->
          <div class="flex items-center gap-2">
            <button 
              @click="cycleSpeed"
              class="h-8 px-2.5 flex items-center justify-center rounded-md text-[12px] tabular-nums bg-white/10 hover:bg-white/20 transition-colors"
              title="Playback Speed"
            >
              {{ playbackSpeed }}x
            </button>

            <button 
              @click="isLooping = !isLooping"
              class="size-8 grid place-items-center rounded-md hover:bg-white/10 transition-colors"
              :class="{ 'text-white': isLooping, 'text-white/40': !isLooping }"
              title="Toggle Loop"
            >
              <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 1l4 4-4 4m-14 6l-4-4 4-4m14-2H5a2 2 0 00-2 2v2m16 4v2a2 2 0 01-2 2H5" />
              </svg>
            </button>

            <button 
              @click="toggleFullscreen" 
              class="size-8 grid place-items-center rounded-md hover:bg-white/10 transition-colors"
              title="Toggle Fullscreen"
            >
              <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Scene Navigation Pills -->
    <div class="mt-6 flex flex-wrap items-center justify-center gap-1.5 max-w-[700px] px-4 z-20">
      <button 
        v-for="(scene, idx) in scenes" 
        :key="idx"
        @click="jumpToScene(idx)"
        class="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all"
        :class="sceneIndex === idx ? 'bg-white text-black font-semibold shadow-md scale-105' : 'bg-white/10 text-white/70 hover:bg-white/20'"
      >
        {{ idx + 1 }}. {{ scene.shortTitle }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, reactive, nextTick } from 'vue'

// Production SVG Asset Imports (avoids dev-only Vite /src path 404s)
import cursorCubeLight from '@/assets/cursor_CUBE_2D_LIGHT.svg'
import claudeCodeColor from '@/assets/claudecode-color.svg'
import openclawColor from '@/assets/openclaw-color.svg'
import claudeColor from '@/assets/claude-color.svg'
import openaiColor from '@/assets/openai.svg'
import geminiColor from '@/assets/gemini-color.svg'
import grokColor from '@/assets/grok-color.svg'
import perplexityColor from '@/assets/perplexity-color.svg'
import codexColor from '@/assets/codex-color.svg'
import openCodeColor from '@/assets/opencode-color.svg'
import windsurfColor from '@/assets/windsurf-color.svg'
import chromeLogo from '@/assets/chrome-logo-svgrepo-com.svg'
import googleDriveLogo from '@/assets/google-drive.svg'
import slackColor from '@/assets/slack-color.svg'
import notionLogo from '@/assets/notion-svgrepo-com.svg'

const TOTAL_DURATION = 24.1

const time = ref(0.0)
const isPlaying = ref(true)
const isLooping = ref(true)
const playbackSpeed = ref(1.0)
const containerRef = ref(null)
const morphRef = ref(null)

// Adaptive Mobile Stage Scaling via ResizeObserver
const stageRef = ref(null)
const stageScale = ref(1.0)
let ro = null

const scenes = [
  { start: 0.0, end: 2.8, shortTitle: 'The Need', headline: 'AI agents can do real work.', glow: '#f97316' },
  { start: 2.8, end: 5.0, shortTitle: 'Context Loss', headline: 'Remembering across sessions is the hard part.', glow: '#ec4899' },
  { start: 5.0, end: 7.0, shortTitle: 'Meet Memwyre', headline: 'Meet Memwyre.', glow: '#3b82f6' },
  { start: 7.0, end: 8.8, shortTitle: 'Unified Memory', headline: 'One persistent brain across every tool.', glow: '#10b981' },
  { start: 8.8, end: 11.0, shortTitle: 'Any Model', headline: 'Bring any model. Decoupled memory.', glow: '#f59e0b' },
  { start: 11.0, end: 13.0, shortTitle: 'Universal MCP', headline: 'Any agent. Universal MCP.', glow: '#8b5cf6' },
  { start: 13.0, end: 15.0, shortTitle: 'Context Engine', headline: 'With exact context and temporal decay.', glow: '#06b6d4' },
  { start: 15.0, end: 17.0, shortTitle: 'Cross-App Sync', headline: 'Recall context where you already work.', glow: '#22c55e' },
  { start: 17.0, end: 19.1, shortTitle: 'Instant Recall', headline: '@-tag your memory. Instant recall.', glow: '#eab308' },
  { start: 19.1, end: 21.1, shortTitle: 'LoCoMo Proof', headline: '88% token reduction. 73.5% LoCoMo recall.', glow: '#38bdf8' },
  { start: 21.1, end: 23.1, shortTitle: 'Self-Host', headline: 'Open source. Self-host anywhere.', glow: '#a855f7' },
  { start: 23.1, end: 24.1, shortTitle: 'Get Started', headline: 'Persistent memory for every AI.', glow: '#f97316' }
]

const sceneIndex = computed(() => {
  const current = time.value
  const found = scenes.findIndex(s => current >= s.start && current < s.end)
  return found !== -1 ? found : (current >= TOTAL_DURATION ? scenes.length - 1 : 0)
})

const currentHeadline = computed(() => scenes[sceneIndex.value]?.headline || '')
const ambientGlowColor = computed(() => scenes[sceneIndex.value]?.glow || '#f97316')

// Headline transition helper
const headlineAnimating = ref(false)
watch(sceneIndex, () => {
  headlineAnimating.value = true
  setTimeout(() => {
    headlineAnimating.value = false
  }, 160)
})

// Dev Clipping Detector: Warns if content exceeds client bounds
watch(sceneIndex, async () => {
  await nextTick()
  setTimeout(() => {
    const el = morphRef.value
    if (el && el.scrollHeight > el.clientHeight + 1) {
      console.warn(`Scene ${sceneIndex.value + 1} clipped by ${el.scrollHeight - el.clientHeight}px`)
    }
  }, 400)
})

// Smoothstep cubic easing: 3t^2 - 2t^3
function easeSmoothstep(t) {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

/**
 * Single-timeline Continuous Pill-to-Rectangle Morph
 * Phase 1: Width expands immediately (0% -> 55%)
 * Phase 2: Height expands with deliberate overlap (38% -> 100%)
 * Phase 3: Radius transitions from pill-curvature to rounded-rect (35% -> 100%)
 */
function morphPillToRect(progress, startW, startH, startR, endW, endH, endR) {
  const p = Math.max(0, Math.min(1, progress))

  // Phase 1: Width expansion
  const tW = easeSmoothstep(Math.min(1, p / 0.55))
  const width = startW + (endW - startW) * tW

  // Phase 2: Height expansion (overlapping, starts at 38%)
  const tH = easeSmoothstep(Math.max(0, (p - 0.38) / 0.62))
  const height = startH + (endH - startH) * tH

  // Phase 3: Radius transition (starts at 35%)
  const tR = easeSmoothstep(Math.max(0, (p - 0.35) / 0.65))
  const rawR = startR + (endR - startR) * tR
  const borderRadius = Math.min(rawR, height / 2)

  return { width, height, borderRadius }
}

// ============================================================
// JS-DRIVEN MORPH INTERPOLATION ENGINE (Refresh-Rate Independent)
// ============================================================
function getSceneTarget(s, t) {
  let width = 510, height = 300, borderRadius = 26
  let bgR = 255, bgG = 255, bgB = 255, bgA = 1
  let colorR = 17, colorG = 17, colorB = 17
  let shadowAlpha = 0.08, shadowBlur = 32, shadowY = 12
  let borderAlpha = 0.08
  let padV = 18, padH = 24
  let dark = false

  if (s === 0 || s === 1) {
    if (t < 2.50) {
      // Scene 0: Initial pill capsule button (380 x 86, radius 43 = 86/2)
      width = 380; height = 86; borderRadius = 43
      bgR = 18; bgG = 18; bgB = 18
      colorR = 255; colorG = 255; colorB = 255
      shadowAlpha = 0.25; shadowBlur = 32; shadowY = 12
      borderAlpha = 0.12; padV = 16; padH = 28; dark = true
    } else if (t < 2.92) {
      // Unified single-timeline continuous morph: Pill -> Rectangle
      // Width expands immediately (0% -> 55%), height overlaps starting at 38%, radius smoothly transitions
      const p = (t - 2.50) / 0.42
      const m = morphPillToRect(p, 380, 86, 43, 510, 266, 26)
      width = m.width; height = m.height; borderRadius = m.borderRadius
      padV = 16; padH = 28 + (22 - 28) * easeSmoothstep(p)
      bgR = 18 + (255 - 18) * easeSmoothstep(p)
      bgG = 18 + (255 - 18) * easeSmoothstep(p)
      bgB = 18 + (255 - 18) * easeSmoothstep(p)
      colorR = 255 + (17 - 255) * easeSmoothstep(p)
      colorG = 255 + (17 - 255) * easeSmoothstep(p)
      colorB = 255 + (17 - 255) * easeSmoothstep(p)
      shadowAlpha = 0.25 + (0.08 - 0.25) * easeSmoothstep(p)
      borderAlpha = 0.12 + (0.08 - 0.12) * easeSmoothstep(p)
      dark = p < 0.5
    } else {
      // Scene 1: Fully expanded Needs Grid (510 x 266, radius 26)
      width = 510; height = 266; borderRadius = 26
      padV = 16; padH = 22
    }
  } else if (s === 2) {
    borderRadius = 24
    padV = 14; padH = 20
    if (t < 5.95) {
      // Sleek compact badge wrapping logo snugly
      width = 300; height = 98
    } else {
      // Clean, well-proportioned badge with extra padding removed
      width = 292; height = 104
    }
  } else if (s === 3) {
    width = 510; borderRadius = 26
    padV = 16; padH = 24
    if (t < 7.6) {
      height = 166
    } else if (t < 8.2) {
      height = 245
    } else {
      height = 324
    }
  } else if (s === 4) {
    width = 410; height = 376; borderRadius = 26
    padV = 18; padH = 20
  } else if (s === 5) {
    width = 520; height = 368; borderRadius = 26
    padV = 18; padH = 24
  } else if (s === 6) {
    width = 500; height = 156; borderRadius = 26
    padV = 16; padH = 24
  } else if (s === 7) {
    width = 550; height = 142; borderRadius = 26
    padV = 16; padH = 24
  } else if (s === 8) {
    bgR = 20; bgG = 20; bgB = 20
    colorR = 255; colorG = 255; colorB = 255
    dark = true
    if (t < 17.38) {
      // Initial pill capsule (460 x 70, radius 35 = 70/2)
      width = 460; height = 70; borderRadius = 35
      shadowAlpha = 0.35; shadowBlur = 32; shadowY = 12
      borderAlpha = 0.12; padV = 14; padH = 26
    } else if (t < 17.75) {
      // Unified single-timeline continuous morph: Pill -> Rectangle
      const p = (t - 17.38) / 0.37
      const m = morphPillToRect(p, 460, 70, 35, 550, 142, 26)
      width = m.width; height = m.height; borderRadius = m.borderRadius
      padV = 14 + (16 - 14) * easeSmoothstep(p)
      padH = 26 + (24 - 26) * easeSmoothstep(p)
      shadowAlpha = 0.35 + (0.45 - 0.35) * easeSmoothstep(p)
      shadowBlur = 32 + (40 - 32) * easeSmoothstep(p)
      shadowY = 12 + (16 - 12) * easeSmoothstep(p)
      borderAlpha = 0.12 + (0.14 - 0.12) * easeSmoothstep(p)
    } else {
      width = 550; height = 142; borderRadius = 26
      shadowAlpha = 0.45; shadowBlur = 40; shadowY = 16
      borderAlpha = 0.14; padV = 16; padH = 24
    }
  } else if (s === 9) {
    width = 510; height = 338; borderRadius = 26
    padV = 18; padH = 24
  } else if (s === 10) {
    width = 400
    if (t < 21.58) {
      // Initial pill capsule (400 x 70, radius 35 = 70/2)
      borderRadius = 35; height = 70; padV = 18; padH = 20
    } else if (t < 21.95) {
      // Continuous expansion upon switch toggle
      const p = (t - 21.58) / 0.37
      const tH = easeSmoothstep(p)
      borderRadius = 35 + (26 - 35) * tH
      height = 70 + (142 - 70) * tH
      padV = 18 + (16 - 18) * tH
      padH = 20
    } else if (t < 22.3) {
      borderRadius = 26; height = 198; padV = 16; padH = 20
    } else {
      borderRadius = 26; height = 256; padV = 16; padH = 20
    }
  } else if (s === 11) {
    width = 400; height = 210; borderRadius = 26
    padV = 22; padH = 26
  }

  return { width, height, borderRadius, bgR, bgG, bgB, bgA, colorR, colorG, colorB, shadowAlpha, shadowBlur, shadowY, borderAlpha, padV, padH, dark }
}

// Current rendered interpolation state
const morph = reactive({
  width: 380, height: 86, borderRadius: 43,
  bgR: 18, bgG: 18, bgB: 18,
  colorR: 255, colorG: 255, colorB: 255,
  shadowAlpha: 0.25, shadowBlur: 32, shadowY: 12,
  borderAlpha: 0.12, padV: 16, padH: 28, dark: true
})

function lerpValue(current, target, factor) {
  const diff = target - current
  if (Math.abs(diff) < 0.2) return target
  return current + diff * factor
}

function lerpColor(current, target, factor) {
  const diff = target - current
  if (Math.abs(diff) < 0.5) return target
  return Math.round(current + diff * factor)
}

function updateMorphInterpolation(factor) {
  const target = getSceneTarget(sceneIndex.value, time.value)

  // Synchronous lerp following the continuous overlapping morph target curve
  morph.width = lerpValue(morph.width, target.width, factor)
  morph.height = lerpValue(morph.height, target.height, factor)
  morph.borderRadius = lerpValue(morph.borderRadius, target.borderRadius, factor)

  // All other properties always lerp at normal speed
  morph.bgR = lerpColor(morph.bgR, target.bgR, factor)
  morph.bgG = lerpColor(morph.bgG, target.bgG, factor)
  morph.bgB = lerpColor(morph.bgB, target.bgB, factor)
  morph.colorR = lerpColor(morph.colorR, target.colorR, factor)
  morph.colorG = lerpColor(morph.colorG, target.colorG, factor)
  morph.colorB = lerpColor(morph.colorB, target.colorB, factor)
  morph.shadowAlpha = morph.shadowAlpha + (target.shadowAlpha - morph.shadowAlpha) * factor
  morph.shadowBlur = lerpValue(morph.shadowBlur, target.shadowBlur, factor)
  morph.shadowY = lerpValue(morph.shadowY, target.shadowY, factor)
  morph.borderAlpha = morph.borderAlpha + (target.borderAlpha - morph.borderAlpha) * factor
  morph.padV = lerpValue(morph.padV, target.padV, factor)
  morph.padH = lerpValue(morph.padH, target.padH, factor)
  morph.dark = target.dark
}

const containerMorphStyle = computed(() => {
  const _t = time.value
  return {
    width: `${Math.round(morph.width)}px`,
    height: `${Math.round(morph.height)}px`,
    borderRadius: `${Math.round(morph.borderRadius)}px`,
    backgroundColor: `rgb(${morph.bgR}, ${morph.bgG}, ${morph.bgB})`,
    color: `rgb(${morph.colorR}, ${morph.colorG}, ${morph.colorB})`,
    boxShadow: `0 ${Math.round(morph.shadowY)}px ${Math.round(morph.shadowBlur)}px rgba(0,0,0,${morph.shadowAlpha.toFixed(3)})`,
    border: morph.dark
      ? `1px solid rgba(255,255,255,${morph.borderAlpha.toFixed(3)})`
      : `1px solid rgba(0,0,0,${morph.borderAlpha.toFixed(3)})`,
    padding: `${Math.round(morph.padV)}px ${Math.round(morph.padH)}px`,
    contain: 'layout style paint',
    willChange: 'contents'
  }
})

const progressPercent = computed(() => Math.min(100, Math.max(0, (time.value / TOTAL_DURATION) * 100)))

const formattedCurrentTime = computed(() => {
  const totalSecs = Math.floor(time.value)
  const mins = Math.floor(totalSecs / 60)
  const secs = totalSecs % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const formattedDuration = computed(() => {
  const totalSecs = Math.floor(TOTAL_DURATION)
  const mins = Math.floor(totalSecs / 60)
  const secs = totalSecs % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

// Simulated Mouse Cursor State & Choreography (1.5x quicker movements)
const cursorVisible = computed(() => {
  const s = sceneIndex.value
  return [0, 4, 5, 6, 7, 9, 10].includes(s)
})

const cursorClicked = computed(() => {
  const t = time.value
  if (t >= 2.50 && t <= 2.70) return true // Scene 1 (200ms before 2.80s transition)
  if (t >= 10.70 && t <= 10.88) return true // Scene 5 Perplexity (200ms before 11.00s transition)
  if (t >= 12.35 && t <= 12.50) return true // Scene 6 Switch 1 (Chrome Ext)
  if (t >= 12.75 && t <= 12.88) return true // Scene 6 Switch 2 (Google Drive, 200ms before 13.00s transition)
  if (t >= 14.70 && t <= 14.88) return true // Scene 7 Slider toggle (200ms before 15.00s transition)
  if (t >= 16.75 && t <= 16.88) return true // Scene 8 Dev Chat send (200ms before 17.00s transition)
  if (t >= 19.50 && t <= 19.70) return true // Scene 10 Tokens tab
  if (t >= 21.55 && t <= 21.75) return true // Scene 11 Self-host toggle
  return false
})

const clickRippleScene1 = computed(() => time.value >= 2.50 && time.value <= 2.80)

const cursorStyle = computed(() => {
  const t = time.value
  let x = 80
  let y = 80

  if (t < 2.8) {
    const p = Math.min(1, Math.max(0, (t - 1.6) / 0.85))
    x = 85 - (85 - 54) * easeOutQuart(p)
    y = 85 - (85 - 53) * easeOutQuart(p)
  } else if (t >= 8.8 && t < 11.0) {
    const p = Math.min(1, Math.max(0, (t - 9.8) / 0.8))
    x = 72 - (72 - 66) * p
    y = 30 + (66 - 30) * p
  } else if (t >= 11.0 && t < 13.0) {
    if (t < 12.55) {
      const p = Math.min(1, Math.max(0, (t - 12.0) / 0.35))
      x = 80 - (80 - 72) * easeOutQuart(p)
      y = 74 - (74 - 60) * easeOutQuart(p)
    } else {
      const p = Math.min(1, Math.max(0, (t - 12.52) / 0.22))
      x = 72
      y = 60 + (67 - 60) * easeOutQuart(p)
    }
  } else if (t >= 13.0 && t < 15.0) {
    const p = Math.min(1, Math.max(0, (t - 14.15) / 0.52))
    x = 80 - (80 - 65) * easeOutQuart(p)
    y = 75 - (75 - 54) * easeOutQuart(p)
  } else if (t >= 15.0 && t < 17.0) {
    const p = Math.min(1, Math.max(0, (t - 16.30) / 0.42))
    x = 80 - (80 - 74) * easeOutQuart(p)
    y = 75 - (75 - 53.5) * easeOutQuart(p)
  } else if (t >= 19.1 && t < 21.1) {
    if (t < 19.7) {
      const p = Math.min(1, Math.max(0, (t - 19.1) / 0.26))
      x = 75 - (75 - 64) * easeOutQuart(p)
      y = 45 - (45 - 30) * easeOutQuart(p)
    } else {
      const p = Math.min(1, Math.max(0, (t - 19.75) / 0.58))
      x = 55 + (78 - 55) * easeOutQuart(p)
      y = 52 - (52 - 42) * easeOutQuart(p)
    }
  } else if (t >= 21.1 && t < 23.1) {
    if (t < 21.8) {
      const p = Math.min(1, Math.max(0, (t - 21.15) / 0.33))
      x = 82 - (82 - 71) * easeOutQuart(p)
      y = 65 - (65 - 50) * easeOutQuart(p)
    } else {
      const p2 = Math.min(1, Math.max(0, (t - 21.85) / 0.45))
      x = 71 - (71 - 65) * easeOutQuart(p2)
      y = 50 + (64 - 50) * easeOutQuart(p2)
    }
  }

  return {
    left: `${x}%`,
    top: `${y}%`
  }
})

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4)
}

const activeHoverLlm = computed(() => {
  const t = time.value
  if (t >= 9.80 && t < 9.96) return 'claude'
  if (t >= 9.96 && t < 10.12) return 'gpt'
  if (t >= 10.12 && t < 10.28) return 'gemini'
  if (t >= 10.28 && t < 10.44) return 'grok'
  if (t >= 10.44 && t < 11.00) return 'perplexity'
  return null
})

const autonomyActiveSide = computed(() => (time.value >= 14.8 ? 'right' : 'left'))
const autonomySliderStyle = computed(() => {
  if (time.value >= 14.8) {
    return { left: '50%', width: '50%' }
  }
  return { left: '0%', width: '50%' }
})

// Bug 1 Fix: Safe Typing Effect without negative-index flash
const TYPE_START = 15.4
const CPS = 36 // 39 characters typed out cleanly by ~16.48s before send click at 16.75s

const typedChatText = computed(() => {
  const fullText = 'recall auth architecture from last week'
  const n = Math.floor((time.value - TYPE_START) * CPS)
  return fullText.slice(0, Math.max(0, Math.min(fullText.length, n)))
})

const chartTooltipX = computed(() => (time.value >= 20.2 ? 245 : 180))
const chartTooltipY = computed(() => (time.value >= 20.2 ? 28 : 34))
const chartTooltipLeft = computed(() => (time.value >= 20.2 ? 76.5 : 56.2))
const chartTooltipTop = computed(() => (time.value >= 20.2 ? 35 : 42.5))

// Bug 2 Fix: Frame-rate independent lerp & active loop during paused scrubbing
const SMOOTH = 25 // Tuned for snappy yet liquid-smooth morphing (~130ms settle)
const isScrubbing = ref(false)
let raf = null
let last = null

function tick(ts) {
  const dt = last === null ? 0 : Math.min((ts - last) / 1000, 0.05)
  last = ts

  if (isPlaying.value && !isScrubbing.value) {
    time.value += dt * playbackSpeed.value
    if (time.value >= TOTAL_DURATION) {
      if (isLooping.value) {
        time.value = 0
        Object.assign(morph, getSceneTarget(0, 0))
      } else {
        time.value = TOTAL_DURATION
        isPlaying.value = false
      }
    }
  }

  updateMorphInterpolation(1 - Math.exp(-SMOOTH * dt))
  raf = requestAnimationFrame(tick)
}

function togglePlay() {
  if (!isPlaying.value && time.value >= TOTAL_DURATION) {
    time.value = 0
  }
  isPlaying.value = !isPlaying.value
}

function restart() {
  time.value = 0
  Object.assign(morph, getSceneTarget(0, 0))
  isPlaying.value = true
}

function seekRelative(seconds) {
  time.value = Math.max(0, Math.min(TOTAL_DURATION, time.value + seconds))
}

function jumpToScene(index) {
  if (scenes[index]) {
    time.value = scenes[index].start + 0.05
    Object.assign(morph, getSceneTarget(index, time.value))
  }
}

function cycleSpeed() {
  const speeds = [0.5, 1.0, 1.5, 2.0]
  const currentIdx = speeds.indexOf(playbackSpeed.value)
  playbackSpeed.value = speeds[(currentIdx + 1) % speeds.length]
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    containerRef.value?.requestFullscreen?.().catch(() => {})
  } else {
    document.exitFullscreen?.().catch(() => {})
  }
}

// Bug 4 Fix: Pointer events scrubbing supporting desktop, touch, and pause while dragging
function handleScrubStart(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const seek = (ev) => {
    time.value = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width)) * TOTAL_DURATION
  }
  isScrubbing.value = true
  el.setPointerCapture(e.pointerId)
  seek(e)
  const up = () => {
    isScrubbing.value = false
    el.removeEventListener('pointermove', seek)
    el.removeEventListener('pointerup', up)
    el.removeEventListener('pointercancel', up)
  }
  el.addEventListener('pointermove', seek)
  el.addEventListener('pointerup', up)
  el.addEventListener('pointercancel', up)
}

onMounted(() => {
  window.__INTRO_STARTED_AT__ = Date.now()
  window.__MARKETING_VIDEO_PLAYING__ = true
  raf = requestAnimationFrame(tick)

  // Bug 3 Fix: Dynamic ResizeObserver for small mobile viewports
  ro = new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect
    stageScale.value = Math.min(1.0, width / 580, height / 440)
  })
  if (stageRef.value) ro.observe(stageRef.value)
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  ro?.disconnect()
})
</script>

<style scoped>
/* Waveform audio bars animation */
@keyframes wave-pulse-1 { 0%, 100% { height: 4px; } 50% { height: 14px; } }
@keyframes wave-pulse-2 { 0%, 100% { height: 12px; } 50% { height: 6px; } }
@keyframes wave-pulse-3 { 0%, 100% { height: 8px; } 50% { height: 16px; } }
@keyframes wave-pulse-4 { 0%, 100% { height: 14px; } 50% { height: 4px; } }

.animate-wave-1 { animation: wave-pulse-1 0.7s infinite ease-in-out; }
.animate-wave-2 { animation: wave-pulse-2 0.8s infinite ease-in-out; }
.animate-wave-3 { animation: wave-pulse-3 0.6s infinite ease-in-out; }
.animate-wave-4 { animation: wave-pulse-4 0.9s infinite ease-in-out; }

/* Pop & Spring Scale Keyframes */
@keyframes scale-spring {
  0% { transform: scale(0.75); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-scale-spring {
  animation: scale-spring 0.2s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
}

/* ======================================================== */
/* MORPHING CONTAINER — JS-DRIVEN (no CSS transitions)      */
/* All interpolation happens in requestAnimationFrame loop   */
/* ======================================================== */
.morph-container {
  contain: layout style paint;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0); /* Force GPU compositing layer */
}

.scene-inner {
  animation: scene-fade-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scene-fade-in {
  0% { opacity: 0; transform: scale(0.975); }
  100% { opacity: 1; transform: scale(1); }
}
</style>
