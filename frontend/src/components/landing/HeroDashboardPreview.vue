<template>
  <div class="w-full relative flex justify-center">
    <!-- Ambient Depth Glow behind Dummy Dashboard -->
    <div class="absolute inset-x-8 sm:inset-x-16 top-10 bottom-2 bg-black/[0.08] blur-3xl rounded-[3rem] pointer-events-none -z-10"></div>

    <!-- Outer Window Chrome (Mac Style) -->
    <div class="w-full max-w-[1020px] lg:max-w-[1120px] rounded-xl overflow-hidden ring-1 ring-gray-200/80 flex flex-col h-[560px] sm:h-[650px] lg:h-[740px] bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12),0_12px_32px_-10px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.04)] relative z-10">
      
      <!-- Fake Browser Bar -->
      <div class="h-8 sm:h-9 bg-[#F9FAFB] border-b border-gray-200/80 flex items-center px-3.5 shrink-0 justify-between">
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500/20"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500/20"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-500/20"></div>
        </div>
        <div class="flex-1 flex justify-center items-center">
          <span class="text-[11px] font-mono text-gray-400 font-medium tracking-tight select-none">app.memwyre.tech</span>
        </div>
        <div class="w-12"></div>
      </div>

      <!-- App Layout Replica (matches actual Memwyre UI) -->
      <div class="flex-1 flex bg-[#F9FAFB] text-gray-900 font-sans overflow-hidden" style="zoom: 0.90;">
        
        <!-- Sidebar Replica -->
        <aside class="hidden sm:flex w-[260px] bg-gray-50 border-r border-gray-200/80 flex-col shrink-0">
          <!-- Top Header -->
          <div class="h-14 border-b border-gray-200/80 shrink-0 flex items-center justify-between px-3">
            <div class="flex items-center gap-2 px-1 py-1">
              <img src="/logo.png" alt="Memwyre" class="h-7 w-auto object-contain" />
            </div>
            <div class="p-1.5 text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18" />
              </svg>
            </div>
          </div>
          
          <div class="flex-1 pt-3 flex flex-col justify-between overflow-y-auto px-2 pb-3">
            <div class="space-y-6">
              <!-- Main Nav -->
              <nav class="space-y-0.5">
                <!-- Nav Links -->
                <nav class="space-y-1 select-none">
                  <!-- Home Button -->
                  <div 
                    @click="setView('memories')"
                    class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                    :class="(currentView === 'memories' || (currentView === 'view-memory' && previousView === 'memories')) ? 'bg-gray-200/60 text-gray-950' : 'text-gray-700 hover:bg-gray-100'"
                  >
                    <svg class="w-4 h-4 shrink-0" :class="(currentView === 'memories' || (currentView === 'view-memory' && previousView === 'memories')) ? 'text-gray-900' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span class="truncate flex-1">Home</span>
                  </div>
                  <!-- Spaces Button -->
                  <div 
                    @click="setView('spaces')"
                    class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                    :class="(currentView === 'spaces' || (currentView === 'view-memory' && previousView === 'spaces')) ? 'bg-gray-200/60 text-gray-950 font-semibold' : 'text-gray-700 hover:bg-gray-100'"
                  >
                    <svg class="w-4 h-4 shrink-0" :class="(currentView === 'spaces' || (currentView === 'view-memory' && previousView === 'spaces')) ? 'text-gray-900' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span class="truncate flex-1">Spaces</span>
                    <span class="text-[11px] font-semibold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">{{ spacesList.length }}</span>
                  </div>
                  <!-- Inbox Button -->
                  <div 
                    @click="setView('inbox')"
                    class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                    :class="(currentView === 'inbox' || (currentView === 'view-memory' && previousView === 'inbox')) ? 'bg-gray-200/60 text-gray-950' : 'text-gray-700 hover:bg-gray-100'"
                  >
                    <svg class="w-4 h-4 shrink-0" :class="(currentView === 'inbox' || (currentView === 'view-memory' && previousView === 'inbox')) ? 'text-gray-900' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span class="truncate flex-1">Inbox</span>
                    <span v-if="inboxItems.length > 0" class="text-[11px] font-semibold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">{{ inboxItems.length }}</span>
                  </div>
                  <!-- Ask AI Button -->
                  <div 
                    @click="setView('chat')"
                    class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                    :class="currentView === 'chat' ? 'bg-gray-200/60 text-gray-950 font-semibold' : 'text-gray-700 hover:bg-gray-100'"
                  >
                    <svg class="w-4 h-4 shrink-0" :class="currentView === 'chat' ? 'text-gray-900' : 'text-gray-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    <span class="truncate flex-1">Ask AI</span>
                  </div>
                </nav>
              </nav>

              <!-- Conversations List (in the Ask AI section, listed below the nav bar options above integrations) -->
              <div v-if="currentView === 'chat'" class="pt-0.5">
                <div class="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                  <span>Conversations</span>
                  <span class="text-[10px] font-mono text-gray-400 font-semibold">{{ conversations.length }}</span>
                </div>
                <div class="space-y-0.5 mt-1">
                  <div 
                    v-for="conv in conversations" 
                    :key="conv.id"
                    @click="activeConversationId = conv.id; setView('chat')"
                    class="flex items-center px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-all group"
                    :class="activeConversationId === conv.id 
                      ? 'bg-gray-200/80 text-gray-950 font-semibold shadow-2xs' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium'"
                  >
                    <span class="truncate flex-1">{{ conv.title }}</span>
                  </div>
                </div>
              </div>

              <!-- Integrations Block -->
              <div>
                <div class="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Integrations</div>
                <div class="space-y-0.5 mt-1">
                  <div class="flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-xs text-gray-950 font-medium">
                    <img :src="chromeIcon" class="w-4 h-4 object-contain" />
                    <span class="truncate">Chrome Extension</span>
                  </div>
                  <div class="flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-xs text-gray-950 font-medium">
                    <img :src="cursorIcon" class="w-4 h-4 object-contain" />
                    <span class="truncate">Cursor MCP</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Bottom User Profile -->
            <div class="pt-2 border-t border-gray-200/80">
              <div class="flex items-center gap-3 px-2 py-1.5 rounded-xl border border-gray-200/50 bg-white">
                <div class="w-8 h-8 rounded-lg bg-gray-900 text-white font-bold flex items-center justify-center text-xs">MV</div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold text-gray-900 truncate">Marcus</div>
                  <div class="text-xs text-gray-500 truncate">Pro Plan</div>
                </div>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white relative">
          <!-- Topbar (hidden in view-memory mode) -->
          <header v-if="currentView !== 'view-memory'" class="h-16 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 w-full">
            <div class="flex items-center gap-3">
              <!-- Workspace Switcher with Dropdown -->
              <div class="relative">
                <button 
                  @click="isWorkspaceMenuOpen = !isWorkspaceMenuOpen"
                  class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-100 border border-transparent hover:border-gray-200/80 transition-all cursor-pointer group"
                >
                  <div v-if="currentSpace.iconSvg" v-html="currentSpace.iconSvg" class="w-4 h-4 text-gray-500 shrink-0 flex items-center justify-center"></div>
                  <span v-else class="text-sm shrink-0 text-gray-500">{{ currentSpace.icon }}</span>
                  <span class="truncate max-w-[140px] font-medium">{{ currentSpace.name }}</span>
                  <svg 
                    class="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200" 
                    :class="{ 'rotate-180': isWorkspaceMenuOpen }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Click outside backdrop -->
                <div v-if="isWorkspaceMenuOpen" class="fixed inset-0 z-[65]" @click="isWorkspaceMenuOpen = false"></div>

                <!-- Dropdown Menu -->
                <div 
                  v-if="isWorkspaceMenuOpen" 
                  class="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl p-2 z-[70] border border-gray-200/90 backdrop-blur-md"
                >
                  <!-- Consolidated View Option -->
                  <div class="px-2.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                    View
                  </div>
                  <button 
                    @click="selectSpace('space_all')"
                    class="flex w-full items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group mb-1"
                    :class="activeSpaceId === 'space_all' 
                      ? 'bg-gray-100 text-gray-900 font-semibold border border-gray-200/80 shadow-2xs' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium'"
                  >
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div v-html="allSpacesOption.iconSvg" class="w-4 h-4 text-gray-500 shrink-0 flex items-center justify-center"></div>
                      <div class="min-w-0">
                        <div class="truncate font-semibold">{{ allSpacesOption.name }}</div>
                        <div class="text-[10px] text-gray-400 truncate">Consolidated view • 15 memories</div>
                      </div>
                    </div>
                    <svg v-if="activeSpaceId === 'space_all'" class="w-4 h-4 text-gray-900 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>

                  <div class="h-px bg-gray-100 my-1"></div>

                  <!-- Spaces Header -->
                  <div class="px-2.5 py-1 flex items-center justify-between">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Spaces</span>
                    <span class="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md">{{ spacesList.length }} spaces</span>
                  </div>

                  <!-- Spaces List -->
                  <div class="space-y-0.5 max-h-56 overflow-y-auto custom-scrollbar py-1">
                    <button 
                      v-for="space in spacesList" 
                      :key="space.id"
                      @click="selectSpace(space.id)"
                      class="flex w-full items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group"
                      :class="activeSpaceId === space.id 
                        ? 'bg-gray-100 text-gray-900 font-semibold border border-gray-200/80 shadow-2xs' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium'"
                    >
                      <div class="flex items-center gap-2.5 min-w-0">
                        <div v-if="space.iconSvg" v-html="space.iconSvg" class="w-4 h-4 text-gray-500 shrink-0 flex items-center justify-center"></div>
                        <span v-else class="text-sm shrink-0 select-none text-gray-500">{{ space.icon }}</span>
                        <div class="min-w-0">
                          <div class="truncate font-semibold">{{ space.name }}</div>
                          <div class="text-[10px] text-gray-400 truncate">{{ space.memoryCount }} memories</div>
                        </div>
                      </div>
                      <svg v-if="activeSpaceId === space.id" class="w-4 h-4 text-gray-900 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>

                  <!-- Dropdown Footer: Manage Spaces -->
                  <div class="mt-1 pt-1.5 border-t border-gray-100 px-1">
                    <button 
                      @click="setView('spaces'); isWorkspaceMenuOpen = false"
                      class="flex w-full items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>Manage Spaces</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Actions -->
            <div class="flex items-center gap-3">
              <div 
                @click="setView('inbox')"
                class="relative p-2.5 rounded-xl cursor-pointer transition-colors"
                :class="currentView === 'inbox' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <span v-if="inboxItems.length > 0" class="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold bg-[#D97757] text-white rounded-full px-1 ring-2 ring-white">{{ inboxItems.length }}</span>
              </div>
            </div>
          </header>

          <!-- Timeline / Dashboard Inner -->
          <div v-if="currentView === 'memories'" class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 no-scrollbar flex flex-col min-h-0 h-full overflow-hidden">
            <!-- Header (Fixed) -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 shrink-0">
              <div>
                <div class="flex items-center gap-2.5">
                  <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Memories</h2>
                  <span class="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-700 border border-gray-200/80">
                    {{ searchQuery.trim() ? filteredMemories.length : (categoryCounts[activeCategory] || filteredMemories.length) }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-0.5">
                  Search, inspect, and retrieve captured technical context.
                </p>
              </div>

              <!-- Search Input Pill -->
              <div class="relative w-full sm:w-60">
                <svg class="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search memories..."
                  class="w-full bg-gray-50 border border-gray-200/90 rounded-full pl-8 pr-7 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                />
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <!-- Filter Category Pills & View Controls Row (Fixed) -->
            <div class="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 shrink-0 mb-2">
              <!-- Filter Category Pills -->
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  v-for="tab in filterTabs"
                  :key="tab.id"
                  @click="activeCategory = tab.id"
                  :class="[
                    'px-3.5 py-1 rounded-full text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap font-medium select-none',
                    activeCategory === tab.id
                      ? 'bg-gray-900 text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>
              
              <!-- Right Control Icons -->
              <div class="flex items-center gap-1 shrink-0 hidden sm:flex">
                <button class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg></button>
                <div class="h-4 w-px bg-gray-200 mx-1"></div>
                <button class="text-gray-400 p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-gray-100"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
                <button class="bg-gray-200 text-gray-900 p-1.5 rounded-lg transition-colors cursor-pointer"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
              </div>
            </div>

            <!-- List View (Matching Library Reference) -->
            <div class="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar min-h-0">
              
              <!-- Table Header Row -->
              <div class="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-medium text-gray-400 border-b border-gray-100 sticky top-0 bg-white z-10">
                <div class="col-span-7 sm:col-span-6 md:col-span-7">Name</div>
                <div class="col-span-3 sm:col-span-3 md:col-span-3 text-left">Modified</div>
                <div class="col-span-2 sm:col-span-3 md:col-span-2 text-right">Size</div>
              </div>

              <!-- Item Rows -->
              <div v-if="filteredMemories.length > 0" class="divide-y divide-gray-100/70">
                <div
                  v-for="(item, index) in filteredMemories"
                  :key="item.id || index"
                  @click="openMemory(item)"
                  class="grid grid-cols-12 gap-3 px-3 py-3 rounded-xl hover:bg-gray-100/80 cursor-pointer transition-colors group items-center"
                >
                  <!-- Name & Icon -->
                  <div class="col-span-7 sm:col-span-6 md:col-span-7 flex items-center gap-3 min-w-0 pr-2">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                      <img v-if="item.iconSrc" :src="item.iconSrc" class="w-6 h-6 sm:w-7 sm:h-7 object-contain" :class="item.iconClass" />
                      <div v-else v-html="item.iconSvg" class="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center"></div>
                    </div>
                    
                    <div class="min-w-0 flex-1">
                      <p class="text-xs sm:text-sm font-medium text-gray-900 truncate transition-colors">
                        {{ item.title || item.details || 'Untitled Memory' }}
                      </p>
                      <p class="text-[11px] text-gray-400 truncate mt-0.5">
                        {{ item.content || item.snippet || item.summary || '' }}
                      </p>
                    </div>
                  </div>

                  <!-- Modified Date -->
                  <div class="col-span-3 sm:col-span-3 md:col-span-3 text-left">
                    <span class="text-xs text-gray-400 whitespace-nowrap">
                      {{ item.time }}
                    </span>
                  </div>

                  <!-- Size / Token Count -->
                  <div class="col-span-2 sm:col-span-3 md:col-span-2 flex items-center justify-end gap-2 text-right">
                    <span class="text-xs text-gray-400 whitespace-nowrap group-hover:hidden">
                      {{ item.size }}
                    </span>
                    
                    <!-- Hover Open Indicator (No CRUD buttons) -->
                    <div class="hidden group-hover:flex items-center gap-1 text-xs text-gray-900 font-medium">
                      <span>Open</span>
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="py-16 text-center">
                <div class="w-10 h-10 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <p class="text-xs sm:text-sm font-medium text-gray-700">No memories found</p>
                <p class="text-xs text-gray-400 mt-0.5">Try selecting another filter or adjusting your search.</p>
              </div>
            </div>
          </div>

          <!-- Inbox View Replica -->
          <div v-else-if="currentView === 'inbox'" class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 no-scrollbar flex flex-col min-h-0 h-full overflow-hidden">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 shrink-0">
              <div>
                <div class="flex items-center gap-2.5">
                  <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Inbox</h2>
                  <span v-if="inboxItems.length > 0" class="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-700 border border-gray-200/80">
                    {{ inboxItems.length }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-0.5">
                  Review and verify incoming memories before indexing.
                </p>
              </div>
              <div class="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  v-if="inboxItems.some(i => i.status === 'pending')" 
                  @click="approveAllInbox" 
                  class="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200/90 font-semibold px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 shrink-0 cursor-pointer"
                >
                  <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                  <span>Approve All</span>
                </button>
              </div>
            </div>

            <!-- Filter Category Pills & Controls Row -->
            <div class="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 shrink-0 mb-4">
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  @click="activeInboxTab = 'all'"
                  :class="activeInboxTab === 'all' ? 'bg-gray-900 text-white font-medium shadow-2xs' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
                  class="px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  All ({{ inboxItems.length }})
                </button>
                <button
                  @click="activeInboxTab = 'pending'"
                  :class="activeInboxTab === 'pending' ? 'bg-gray-900 text-white font-medium shadow-2xs' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
                  class="px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  Pending ({{ inboxItems.filter(i => i.status === 'pending').length }})
                </button>
                <button
                  @click="activeInboxTab = 'approved'"
                  :class="activeInboxTab === 'approved' ? 'bg-gray-900 text-white font-medium shadow-2xs' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
                  class="px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  Approved ({{ inboxItems.filter(i => i.status === 'approved').length }})
                </button>
              </div>
              <div class="text-xs text-gray-400 font-medium">
                {{ filteredInboxItems.length }} {{ filteredInboxItems.length === 1 ? 'item' : 'items' }}
              </div>
            </div>

            <!-- List View -->
            <div class="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-12">
              <!-- Empty State -->
              <div v-if="filteredInboxItems.length === 0" class="h-64 flex flex-col items-center justify-center text-center p-8">
                <div class="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-3 shadow-2xs">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                </div>
                <h3 class="text-sm font-semibold text-gray-900">All caught up</h3>
                <p class="text-xs text-gray-400 mt-1 max-w-sm">No items in this view. New memories captured from IDEs, extensions, and AI agents will appear here for review.</p>
              </div>
              
              <!-- Item Card -->
              <div 
                v-for="item in filteredInboxItems" 
                :key="item.id" 
                @click="openInboxItem(item)"
                class="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
              >
                <!-- Card Header -->
                <div class="flex items-center justify-between gap-3 mb-2.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <img v-if="item.iconSrc" :src="item.iconSrc" alt="Source" class="w-4 h-4 object-contain shrink-0" />
                    <span class="text-xs font-medium text-gray-600 truncate">{{ item.source }}</span>
                    <span v-if="item.status === 'approved'" class="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      Approved
                    </span>
                    <span v-else class="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600 border border-gray-200/70 shrink-0">
                      <span class="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
                      Pending
                    </span>
                  </div>
                  <span class="text-xs text-gray-400 shrink-0 font-medium">{{ item.time }}</span>
                </div>
                
                <!-- Card Title & Raw Text Snippet -->
                <div class="mb-3">
                  <h4 class="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">{{ item.details }}</h4>
                  <p class="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed font-normal">{{ item.snippet }}</p>
                </div>
                
                <!-- Tags & Actions Footer -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-gray-100">
                  <!-- Tags list (View only) -->
                  <div class="flex flex-wrap items-center gap-1.5 min-w-0">
                    <span v-for="tag in item.tags.slice(0, 5)" :key="tag" class="inline-flex items-center text-xs font-medium text-gray-500 py-0.5">
                      #{{ tag }}
                    </span>
                    <span v-if="item.tags.length > 5" class="text-xs text-gray-400 font-medium">+{{ item.tags.length - 5 }}</span>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto" @click.stop>
                    <button @click.stop="openInboxItem(item)" class="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100">
                      <span>View</span>
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button @click.stop="dismissInboxItem(item.id)" class="text-xs font-medium text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:bg-red-50">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      <span>Dismiss</span>
                    </button>
                    <button @click.stop="approveInboxItem(item)" class="text-xs font-semibold text-white bg-black hover:bg-gray-800 transition-all flex items-center gap-1.5 cursor-pointer px-3 py-1 rounded-lg shadow-2xs active:scale-95 ml-1">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Spaces View Replica (matches actual Memwyre ProjectsView in view mode) -->
          <div v-else-if="currentView === 'spaces'" class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 no-scrollbar flex flex-col min-h-0 h-full overflow-hidden select-none">
            <!-- Header Row: Title, Count Badge, and Search Input -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 shrink-0">
              <div>
                <div class="flex items-center gap-2.5">
                  <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Spaces</h2>
                  <span class="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-700 border border-gray-200/80">
                    {{ spacesList.length }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 mt-0.5">
                  Organize, isolate, and manage your AI memory spaces.
                </p>
              </div>

              <!-- Search Input Pill -->
              <div class="relative w-full sm:w-60">
                <svg class="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  v-model="spacesSearchQuery" 
                  type="text" 
                  placeholder="Search spaces..." 
                  class="w-full bg-gray-50 border border-gray-200/90 rounded-full pl-8 pr-7 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                />
                <button 
                  v-if="spacesSearchQuery" 
                  @click="spacesSearchQuery = ''" 
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <!-- Filter Category Pills & Count Row -->
            <div class="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 shrink-0 mb-4 text-xs">
              <div class="flex items-center gap-1.5">
                <button
                  @click="activeSpacesTab = 'active'"
                  :class="activeSpacesTab === 'active' ? 'bg-gray-900 text-white font-medium shadow-2xs' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
                  class="px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  Active ({{ spacesList.length }})
                </button>
                <button
                  @click="activeSpacesTab = 'archived'"
                  :class="activeSpacesTab === 'archived' ? 'bg-gray-900 text-white font-medium shadow-2xs' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
                  class="px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  Archived (0)
                </button>
              </div>

              <div class="text-xs text-gray-400 font-medium">
                {{ filteredSpaces.length }} {{ filteredSpaces.length === 1 ? 'space' : 'spaces' }}
              </div>
            </div>

            <!-- Spaces Cards Grid (3 per row - equal height) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 overflow-y-auto custom-scrollbar pb-6">
              <div
                v-for="space in filteredSpaces"
                :key="space.id"
                @click="selectSpace(space.id); setView('memories')"
                class="group bg-white border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between cursor-pointer h-full"
                :class="activeSpaceId === space.id 
                  ? 'border-gray-300 ring-1 ring-gray-900/5 shadow-xs' 
                  : 'border-gray-200/80 hover:border-gray-300'"
              >
                <div>
                  <!-- Card Header: Icon Container + Badges -->
                  <div class="flex items-start justify-between gap-3 mb-3">
                    <!-- Icon Container -->
                    <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                      <div v-if="space.iconSvg" v-html="space.iconSvg" class="w-4 h-4 text-gray-600 flex items-center justify-center"></div>
                      <span v-else class="text-sm leading-none select-none">{{ space.icon }}</span>
                    </div>

                    <!-- Badges -->
                    <div class="flex items-center gap-1.5 flex-wrap justify-end">
                      <span 
                        v-if="activeSpaceId === space.id" 
                        class="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-900 border border-gray-300 shadow-2xs"
                      >
                        Active
                      </span>
                      <span 
                        v-if="space.isDefault" 
                        class="text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500 border border-gray-200/70"
                      >
                        Default
                      </span>
                    </div>
                  </div>

                  <!-- Space Title & Description -->
                  <div class="mb-3">
                    <h3 class="text-sm font-semibold text-gray-900 truncate group-hover:text-black transition-colors" :title="space.name">
                      {{ space.name }}
                    </h3>
                    <p class="text-xs text-gray-500 line-clamp-2 mt-1 min-h-[34px] leading-relaxed">
                      {{ space.description }}
                    </p>
                  </div>

                  <!-- Tool Badges (uniform 2-line min height) -->
                  <div class="flex flex-wrap gap-1 min-h-[46px] content-start">
                    <span 
                      v-for="tool in space.tools" 
                      :key="tool" 
                      class="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200/70 font-medium"
                    >
                      #{{ tool }}
                    </span>
                  </div>
                </div>

                <!-- Footer: Stats & Single Clear Action Button (aligned baseline) -->
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div class="text-[11px] text-gray-400 font-mono">
                    {{ space.memoryCount }} memories
                  </div>

                  <div @click.stop>
                    <button
                      v-if="activeSpaceId === space.id"
                      @click="setView('memories')"
                      class="py-1 px-3 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200/80 text-gray-800 border border-gray-200/90 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Open</span>
                      <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button
                      v-else
                      @click="selectSpace(space.id)"
                      class="py-1 px-3 text-xs font-semibold rounded-lg bg-gray-900 hover:bg-black text-white transition-all shadow-2xs cursor-pointer active:scale-95"
                    >
                      Switch to
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ask AI / Chat Replica -->
          <div v-else-if="currentView === 'chat'" class="flex-1 flex flex-col h-full bg-white relative overflow-hidden">


            <!-- Messages Stream (fades out as chats reach the floating input) -->
            <div 
              class="flex-1 overflow-y-auto p-3 sm:p-5 pb-28 sm:pb-32 scroll-smooth z-10 custom-scrollbar"
              style="mask-image: linear-gradient(to bottom, black 0%, black calc(100% - 110px), transparent calc(100% - 20px)); -webkit-mask-image: linear-gradient(to bottom, black 0%, black calc(100% - 110px), transparent calc(100% - 20px));"
            >
              <div class="space-y-4 max-w-3xl mx-auto">
                <template v-for="msg in currentConversation.messages" :key="msg.id">
                  <!-- User Message -->
                  <div v-if="msg.role === 'user'" class="flex justify-end my-2">
                    <div class="max-w-[85%] min-w-0 flex flex-col items-end">
                      <div class="bg-gray-100 text-gray-800 border border-gray-200/80 px-3.5 py-2.5 rounded-2xl rounded-tr-xs shadow-2xs text-[12.5px] leading-relaxed">
                        <p class="whitespace-pre-wrap">{{ msg.content }}</p>
                      </div>
                      <span class="text-[10px] text-gray-400 mt-1 font-mono pr-1">{{ msg.time || '10:42 AM' }}</span>
                    </div>
                  </div>

                  <!-- Assistant Message -->
                  <div v-else class="flex justify-start my-2">
                    <div class="max-w-[92%] sm:max-w-[88%] min-w-0">
                      <div class="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs text-[12.5px]">
                        <!-- Reasoning Panel (replicates ReasoningPanel.vue) -->
                        <div v-if="msg.thinking" class="mb-3">
                          <button
                            @click="toggleThinking(msg.id)"
                            class="inline-flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-800 transition-colors cursor-pointer select-none group font-medium py-0.5"
                          >
                            <svg
                              class="w-3.5 h-3.5 transition-transform duration-200 text-gray-400 group-hover:text-gray-600"
                              :class="{ 'rotate-90': isThinkingOpen(msg.id) }"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                            <span class="font-mono text-gray-700 font-semibold">Thinking Process</span>
                            <span class="text-[10.5px] text-gray-400 font-normal">({{ isThinkingOpen(msg.id) ? 'hide' : 'show' }})</span>
                          </button>

                          <div
                            v-show="isThinkingOpen(msg.id)"
                            class="mt-1.5 pl-3 ml-1.5 border-l-2 border-[#D97757]/40 text-[11.5px] leading-relaxed text-gray-600 font-sans italic bg-orange-50/30 rounded-r-lg py-2 pr-2.5"
                          >
                            <p class="whitespace-pre-wrap">{{ msg.thinking }}</p>
                          </div>
                        </div>

                        <!-- Markdown Answer Content -->
                        <div class="dashboard-chat-content">
                          <MarkdownPreview :content="msg.content" compact />
                        </div>

                        <!-- Sources Section (replicates AssistantMessageCard.vue) -->
                        <div v-if="msg.sources && msg.sources.length > 0" class="mt-3.5 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
                          <div class="flex items-center justify-between">
                            <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold font-mono flex items-center gap-1">
                              <svg class="w-3 h-3 text-[#D97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              Indexed Sources ({{ msg.sources.length }})
                            </span>
                            <span class="text-[10px] text-gray-400">Click to view in dashboard</span>
                          </div>

                          <div class="flex flex-wrap gap-1.5">
                            <button
                              v-for="srcKey in msg.sources"
                              :key="srcKey"
                              @click="openMemory(srcKey)"
                              class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-gray-50/90 hover:bg-gray-100 border border-gray-200/90 hover:border-gray-300 text-gray-700 hover:text-gray-900 transition-all cursor-pointer truncate max-w-xs group shadow-2xs"
                              :title="`Open memory: ${resolveSource(srcKey)?.title || srcKey}`"
                            >
                              <img 
                                v-if="resolveSource(srcKey)?.iconSrc" 
                                :src="resolveSource(srcKey)?.iconSrc" 
                                class="w-3.5 h-3.5 shrink-0 object-contain" 
                                :alt="resolveSource(srcKey)?.source || ''" 
                              />
                              <span 
                                v-else-if="resolveSource(srcKey)?.iconSvg" 
                                class="w-3.5 h-3.5 shrink-0 inline-flex items-center justify-center text-gray-500" 
                                v-html="resolveSource(srcKey)?.iconSvg"
                              ></span>
                              <span class="truncate font-medium text-[11px] group-hover:text-gray-900">
                                {{ resolveSource(srcKey)?.title || srcKey }}
                              </span>
                              <svg class="w-3 h-3 text-gray-400 group-hover:text-gray-700 shrink-0 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <!-- Card Footer / Actions -->
                        <div class="mt-2.5 pt-2 border-t border-gray-100/70 flex items-center justify-between text-[11px] text-gray-400">
                          <div class="flex items-center gap-2">
                            <button
                              @click="copyAnswer(msg.id, msg.content)"
                              class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                              :title="copiedMessageId === msg.id ? 'Copied!' : 'Copy response'"
                            >
                              <svg v-if="copiedMessageId === msg.id" class="w-3.5 h-3.5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <svg v-else class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span>{{ copiedMessageId === msg.id ? 'Copied' : 'Copy' }}</span>
                            </button>
                            <span class="text-gray-300">•</span>
                            <span class="inline-flex items-center gap-1 text-[10.5px] text-gray-500">
                              <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                              Kimi K2.5
                            </span>
                          </div>
                          <span class="text-[10px] text-gray-400 font-mono">{{ msg.time || '10:42 AM' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Live Agent Progress Rail (replicates AgentProgressRail.vue) -->
                <div v-if="isThinking" class="flex justify-start my-2">
                  <div class="max-w-[90%] sm:max-w-[85%] min-w-0 bg-white border border-gray-200/90 rounded-2xl p-3 shadow-2xs">
                    <div class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 animate-spin text-[#D97757]" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      <span class="text-xs font-semibold text-gray-900 animate-pulse">Thinking & Retrieving...</span>
                      <span class="text-[10px] text-gray-400 font-mono">({{ currentStepIndex + 1 }}/4)</span>
                    </div>

                    <div class="mt-2.5 pl-2.5 ml-1 border-l border-gray-200 space-y-1.5">
                      <div
                        v-for="(step, idx) in agentSteps"
                        :key="idx"
                        class="flex items-center gap-2 text-[11px]"
                        :class="idx < currentStepIndex ? 'text-gray-700' : (idx === currentStepIndex ? 'text-[#D97757] font-medium' : 'text-gray-300')"
                      >
                        <span
                          class="w-1.5 h-1.5 rounded-full shrink-0"
                          :class="idx < currentStepIndex ? 'bg-gray-600' : (idx === currentStepIndex ? 'bg-[#D97757] animate-ping' : 'bg-gray-200')"
                        ></span>
                        <span class="truncate">{{ step }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Composer Area -->
            <div class="absolute bottom-0 inset-x-0 px-3 sm:px-4 pb-4 z-20 pointer-events-none">
              <div class="max-w-3xl mx-auto pointer-events-auto">
                <!-- Floating Input Box -->
                <div class="bg-white rounded-2xl shadow-xs border border-gray-200/90 p-2.5 focus-within:border-gray-300 focus-within:ring-1 focus-within:ring-gray-200 transition-all">
                  <textarea
                    v-model="chatInput"
                    @keydown.enter.prevent="handleSendChat"
                    placeholder="Ask Memwyre about your indexed memories..."
                    rows="1"
                    class="w-full bg-transparent border-0 focus:ring-0 outline-none rounded-lg px-2 py-1 text-[12.5px] text-gray-900 resize-none max-h-32 placeholder-gray-400"
                  ></textarea>
                  <div class="px-1.5 pt-1.5 border-t border-gray-100 flex justify-between items-center text-xs">
                    <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200/80 text-[11px] text-gray-700 font-medium">
                      <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      <span>Kimi K2.5</span>
                    </div>
                    <button
                      @click="handleSendChat"
                      :disabled="!chatInput.trim() || isThinking"
                      class="p-1.5 rounded-lg transition-all flex items-center justify-center w-7 h-7 cursor-pointer"
                      :class="chatInput.trim() && !isThinking 
                        ? 'bg-[#D97757] hover:bg-[#c46647] text-white shadow-2xs' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200/80 cursor-not-allowed'"
                      title="Send message"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- View Memory Replica (matches actual Memwyre EditorView in view mode) -->
          <div v-else-if="currentView === 'view-memory' && selectedMemory" class="flex-1 flex flex-col h-full min-h-0 bg-white overflow-hidden">
            <!-- View Header (Title & Read-only Actions) -->
            <!-- View Header (Title & Read-only Actions) -->
            <header class="h-12 shrink-0 border-b border-gray-200/80 flex items-center justify-between px-3.5 sm:px-5 bg-white z-10">
              <div class="flex items-center gap-2.5 flex-1 min-w-0">
                <button 
                  @click="goBackFromMemory" 
                  class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer shrink-0 flex items-center gap-1" 
                  :title="previousView === 'chat' ? 'Back to Ask AI' : 'Back to Memories'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span v-if="previousView === 'chat'" class="text-[11px] font-medium text-gray-500 hidden sm:inline">Ask AI</span>
                </button>
                <div class="flex items-center gap-2 w-full max-w-2xl min-w-0">
                  <span class="text-xs font-bold text-gray-900 whitespace-nowrap">View Memory</span>
                  <div class="h-3.5 w-px bg-gray-200 shrink-0"></div>
                  <input 
                    :value="selectedMemory.title" 
                    readonly 
                    class="bg-transparent border border-transparent rounded-lg px-1.5 py-0.5 text-xs text-gray-700 w-full font-medium cursor-default truncate outline-none" 
                  />
                </div>
              </div>
              
              <div class="flex items-center gap-2 shrink-0">
                <button
                  v-if="selectedMemory.category === 'inbox'"
                  @click="approveInboxItem(selectedMemory)"
                  class="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-black hover:bg-gray-800 transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
                  <span>Approve & Save</span>
                </button>
                <span v-else class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700 border border-gray-200/80">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                  Synced
                </span>
                <span class="text-[11px] text-gray-400 hidden sm:inline">{{ selectedMemory.time }}</span>
              </div>
            </header>

            <!-- Main Content Area with Centered Document & Right Inspector -->
            <div class="flex-1 overflow-hidden relative flex min-h-0">
              <!-- Main Document Container - Centered and Scrollable -->
              <div class="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 flex justify-center no-scrollbar">
                <div class="w-full max-w-2xl min-h-full flex flex-col pb-12">
                  <!-- Memory Content Header / Source pill -->
                  <div class="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-gray-100">
                    <div class="w-6 h-6 flex items-center justify-center shrink-0">
                      <img v-if="selectedMemory.iconSrc" :src="selectedMemory.iconSrc" class="w-5 h-5 object-contain" />
                      <div v-else-if="selectedMemory.iconSvg" v-html="selectedMemory.iconSvg" class="w-5 h-5 flex items-center justify-center"></div>
                    </div>
                    <div class="min-w-0">
                      <div class="text-[11px] font-semibold text-gray-900 flex items-center gap-1.5">
                        <span>{{ selectedMemory.source }}</span>
                        <span class="text-gray-300">•</span>
                        <span class="text-gray-400 font-normal text-[10px]">{{ selectedMemory.category ? selectedMemory.category.toUpperCase() : 'SHARED MEMORY' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Markdown Document Body (Scaled down for dashboard preview) -->
                  <div class="dashboard-memory-content">
                    <MarkdownPreview
                      :content="selectedMemory.markdown || selectedMemory.content"
                      compact
                      class="cursor-text leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <!-- Right Inspector Panel (Matching Real App) -->
              <aside class="w-72 border-l border-gray-200/80 bg-gray-50/40 hidden md:flex flex-col shrink-0 overflow-hidden">
                <!-- Tab Switcher -->
                <div class="px-3.5 pt-2.5 pb-2 border-b border-gray-200/80 flex items-center justify-between shrink-0">
                  <div class="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg w-full">
                    <button
                      @click="activeInspectorTab = 'intelligence'"
                      :class="activeInspectorTab === 'intelligence' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-500 hover:text-gray-900 font-medium'"
                      class="flex-1 py-1 text-[11px] rounded-md transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Intelligence</span>
                      <span class="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                    </button>
                    <button
                      @click="activeInspectorTab = 'properties'"
                      :class="activeInspectorTab === 'properties' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-500 hover:text-gray-900 font-medium'"
                      class="flex-1 py-1 text-[11px] rounded-md transition-all cursor-pointer text-center"
                    >
                      Properties
                    </button>
                  </div>
                </div>

                <!-- Tab 1: Intelligence -->
                <div v-show="activeInspectorTab === 'intelligence'" class="flex-1 overflow-y-auto p-3.5 space-y-4 no-scrollbar">
                  <!-- Summary Section -->
                  <section v-if="selectedMemory.summary">
                    <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">Summary</h4>
                    <div class="p-2.5 bg-white rounded-xl text-[11px] text-gray-600 leading-relaxed border border-gray-200/80 shadow-2xs">
                      {{ selectedMemory.summary }}
                    </div>
                  </section>

                  <!-- Suggested Questions / Q&A -->
                  <section v-if="selectedMemory.qas && selectedMemory.qas.length">
                    <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">Suggested Questions</h4>
                    <div class="space-y-1.5">
                      <div 
                        v-for="(qa, idx) in selectedMemory.qas" 
                        :key="idx" 
                        class="p-2 bg-white border border-gray-200/80 rounded-xl shadow-2xs"
                      >
                        <p class="text-[11px] font-semibold text-gray-900 mb-0.5 flex items-center gap-1.5">
                          <span class="text-[#D97757]">Q:</span> {{ qa.question }}
                        </p>
                        <p class="text-[10.5px] text-gray-500 pl-2.5 border-l-2 border-gray-200 leading-normal">{{ qa.answer }}</p>
                      </div>
                    </div>
                  </section>

                  <!-- Entities Section -->
                  <section v-if="selectedMemory.entities && selectedMemory.entities.length">
                    <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">Entities</h4>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="entity in selectedMemory.entities" :key="entity" class="px-2 py-0.5 bg-white text-gray-700 text-[10px] rounded-md border border-gray-200/80 font-medium">
                        {{ entity }}
                      </span>
                    </div>
                  </section>
                </div>

                <!-- Tab 2: Properties & Tags -->
                <div v-show="activeInspectorTab === 'properties'" class="flex-1 overflow-y-auto p-3.5 space-y-4 no-scrollbar">
                  <!-- Metadata -->
                  <div>
                    <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-2.5 pb-1 border-b border-gray-100">Properties</h4>
                    <div class="space-y-2.5">
                      <div class="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label class="text-[11px] text-gray-400 font-medium">Created</label>
                        <p class="text-[11px] text-gray-900 font-medium truncate">{{ selectedMemory.time }}</p>
                      </div>
                      <div class="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label class="text-[11px] text-gray-400 font-medium">Source</label>
                        <div>
                          <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-gray-700 border border-gray-200/80">
                            {{ selectedMemory.source }}
                          </span>
                        </div>
                      </div>
                      <div class="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label class="text-[11px] text-gray-400 font-medium">Status</label>
                        <div class="flex items-center gap-1.5">
                          <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                          <span class="text-[11px] font-medium text-gray-700 capitalize">Approved & Indexed</span>
                        </div>
                      </div>
                      <div class="grid grid-cols-[60px_1fr] items-center gap-2">
                        <label class="text-[11px] text-gray-400 font-medium">Project</label>
                        <div>
                          <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-gray-700 border border-gray-200/80">
                            {{ selectedMemory.projectName || currentSpace.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tags -->
                  <div>
                    <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5 pb-1 border-b border-gray-100">Tags</h4>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="tag in (selectedMemory.tags || ['persistent-memory', selectedMemory.category || 'ai'])" :key="tag" class="px-2 py-0.5 bg-white text-gray-600 rounded-md text-[10px] font-medium border border-gray-200/80">
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import MarkdownPreview from '@/components/common/MarkdownPreview.vue';
import cursorIcon from '@/assets/cursor_CUBE_2D_LIGHT.svg';
import claudeCodeIcon from '@/assets/claudecode-color.svg';
import claudeIcon from '@/assets/claude-color.svg';
import notionIcon from '@/assets/notion-svgrepo-com.svg';
import chatgptIcon from '@/assets/openai.svg';
import chromeIcon from '@/assets/chrome-logo-svgrepo-com.svg';
import slackIcon from '@/assets/slack-color.svg';

const currentView = ref('memories'); // 'memories', 'spaces', 'inbox', 'chat', 'view-memory'
const previousView = ref('memories');
const selectedMemory = ref(null);
const activeInspectorTab = ref('intelligence'); // 'intelligence', 'properties'

// --- Spaces Data & State ---
const isWorkspaceMenuOpen = ref(false);
const activeSpaceId = ref('space_all'); // default to All Spaces
const spacesSearchQuery = ref('');
const activeSpacesTab = ref('active');

const allSpacesOption = {
  id: 'space_all',
  name: 'All Spaces',
  icon: '🌐',
  iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-500"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  description: 'Consolidated cross-space view aggregating all team memory graphs and knowledge domains.',
  memoryCount: 15
};

const spacesList = ref([
  {
    id: 'space_core',
    name: 'Memwyre Core',
    icon: '📁',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-500"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    description: 'Core platform architecture, vector ingestion pipelines, API schemas, and frontend design tokens.',
    memoryCount: 8,
    tools: ['Cursor', 'Claude', 'Claude Code', 'Slack'],
    isDefault: true
  },
  {
    id: 'space_infra',
    name: 'Infra & DevOps',
    icon: '⚡',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    description: 'Production failover runbooks, Docker healthchecks, Redis sliding window rate limiting, and SOC2 compliance.',
    memoryCount: 4,
    tools: ['Notion', 'ChatGPT', 'Claude Code', 'Slack'],
    isDefault: false
  },
  {
    id: 'space_research',
    name: 'AI Research & Benchmarks',
    icon: '🔬',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-500"><path d="M10 2v7.31L4.1 19.46A2 2 0 0 0 5.76 22h12.48a2 2 0 0 0 1.66-2.54L14 9.31V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="15" x2="17" y2="15"/></svg>`,
    description: 'Inference benchmarks (vLLM vs TRT-LLM on H100s), DeepSeek V3 vs Sonnet 3.5, and multi-agent isolation rules.',
    memoryCount: 3,
    tools: ['ChatGPT', 'Claude', 'Notion', 'Cursor'],
    isDefault: false
  }
]);

const currentSpace = computed(() => {
  if (activeSpaceId.value === 'space_all') {
    return allSpacesOption;
  }
  return spacesList.value.find(s => s.id === activeSpaceId.value) || spacesList.value[0];
});

const currentSpaceMemoriesCount = computed(() => {
  if (activeSpaceId.value === 'space_all') {
    return memoryItems.value.length;
  }
  return memoryItems.value.filter(m => m.spaceId === activeSpaceId.value).length;
});

const filteredSpaces = computed(() => {
  let list = spacesList.value;
  if (spacesSearchQuery.value.trim()) {
    const q = spacesSearchQuery.value.toLowerCase().trim();
    list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.tools && s.tools.some(t => t.toLowerCase().includes(q)))
    );
  }
  return list;
});

const selectSpace = (spaceId) => {
  activeSpaceId.value = spaceId;
  isWorkspaceMenuOpen.value = false;
};

const openMemory = (item) => {
  const resolved = typeof item === 'string' ? memoryItems.value.find(m => m.id === item) : item;
  if (!resolved) return;
  previousView.value = currentView.value === 'view-memory' ? previousView.value : currentView.value;
  selectedMemory.value = resolved;
  currentView.value = 'view-memory';
};

const resolveSource = (sourceRef) => {
  if (typeof sourceRef === 'object' && sourceRef !== null) return sourceRef;
  return memoryItems.value.find(m => m.id === sourceRef) || null;
};

const openInboxItem = (item) => {
  previousView.value = 'inbox';
  const itemTitle = item.title || item.details || 'Untitled Memory';
  const itemSnippet = item.snippet || item.content || item.summary || '';
  selectedMemory.value = {
    id: item.id,
    spaceId: item.spaceId || 'space_core',
    title: itemTitle,
    details: itemTitle,
    source: item.source,
    iconSrc: item.iconSrc,
    time: item.time,
    category: 'inbox',
    markdown: item.markdown || `# ${itemTitle}\n\n${itemSnippet}\n\n### Review Status\n- **Status**: ${item.status === 'approved' ? 'Approved & Indexed' : 'Pending Verification'}\n- **Source Channel**: ${item.source}\n- **Capture Time**: ${item.time}\n\n### Tags\n${(item.tags || []).map(t => `- \`#${t}\``).join('\n')}`,
    summary: itemSnippet,
    snippet: itemSnippet,
    content: itemSnippet,
    qas: [
      { question: 'What does this memory record?', answer: itemTitle },
      { question: 'What is its verification status?', answer: `Currently marked as ${item.status}.` }
    ],
    entities: (item.tags || []).slice(0, 5),
    tags: item.tags || []
  };
  currentView.value = 'view-memory';
};

const goBackFromMemory = () => {
  currentView.value = previousView.value || 'memories';
  selectedMemory.value = null;
};

const setView = (view) => {
  currentView.value = view;
  selectedMemory.value = null;
  isWorkspaceMenuOpen.value = false;
};

const activeCategory = ref('all');
const searchQuery = ref('');

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'code', label: 'Code & IDE' },
  { id: 'conversations', label: 'Conversations' },
  { id: 'documents', label: 'Documents' },
];

const categoryCounts = computed(() => {
  const currentList = activeSpaceId.value === 'space_all' 
    ? memoryItems.value 
    : memoryItems.value.filter(m => m.spaceId === activeSpaceId.value);
  return {
    all: currentList.length,
    code: currentList.filter(m => m.category === 'code').length,
    conversations: currentList.filter(m => m.category === 'conversations').length,
    documents: currentList.filter(m => m.category === 'documents').length,
  };
});

// --- Memories Data ---
const memoryItems = ref([
  // 1. Cursor (Code & IDE)
  { 
    id: 'mem_1', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'Postgres pooling: enforce transaction mode in serverless', 
    source: 'Cursor', 
    content: 'When querying via Neon or Supabase pooled connection strings, disable prepared statements in Prisma/Drizzle to avoid PgBouncer error 42P05...', 
    markdown: `# Postgres Connection Pooling in Serverless Runtimes

When querying via Neon or Supabase pooled connection strings in serverless environments (AWS Lambda, Cloudflare Workers, Vercel Functions), disable prepared statements to prevent PgBouncer error:
\`\`\`text
PgBouncer Error: 42P05: prepared statement "s0" already exists
\`\`\`

### Root Cause
PgBouncer operating in **transaction pooling mode** binds a database connection only for the duration of a single transaction. When a serverless runtime creates prepared statements on a pooled connection, subsequent requests routed to that same connection fail because the statement name is already registered.

### Recommended Configuration

#### Prisma Setup
Configure \`relationMode = "prisma"\` and set directUrl for migrations:
\`\`\`prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_POOL_URL")
  directUrl = env("DIRECT_URL")
}
\`\`\`

#### Drizzle ORM Setup
\`\`\`typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_POOL_URL!, {
  prepare: false, // Required for transaction-mode PgBouncer
  max: 1,         // Limit socket count per serverless function instance
});

export const db = drizzle(client);
\`\`\`

### Verification Benchmark
- Simulated 5,000 concurrent serverless invocations with zero dropped sockets.
- p99 database roundtrip latency reduced from 64ms to 18ms.`,
    time: '4m ago', 
    size: '1.8 KB', 
    iconSrc: cursorIcon, 
    category: 'code',
    summary: 'Enforces PgBouncer transaction-mode pooling guidelines in serverless runtimes by disabling prepared statements to eliminate error 42P05.',
    qas: [
      { question: 'Why do prepared statements fail with PgBouncer?', answer: 'In transaction pooling, connections are shared across disparate client requests, causing statement name collisions.' },
      { question: 'How is Drizzle ORM configured for transaction pooling?', answer: 'Set prepare: false and max: 1 in the postgres client connection options.' }
    ],
    entities: ['PostgreSQL', 'PgBouncer', 'Neon', 'Prisma', 'Drizzle ORM'],
    tags: ['database', 'serverless', 'pooling', 'postgres', 'cursor']
  },

  // 2. Claude Code (Code & IDE)
  { 
    id: 'mem_2', 
    spaceId: 'space_infra',
    projectName: 'Infra & DevOps',
    title: 'Fix: Docker compose Redis cold-start connection timeout', 
    source: 'Claude Code', 
    content: 'Resolved local dev startup race condition by adding container healthcheck intervals and exponential backoff retry in the API gateway boot script...', 
    markdown: `# Docker Compose Redis Cold-Start Timeout Fix

Resolved a recurring local development race condition where backend microservices attempted to initialize before Redis completed memory allocation and opened its listening socket.

### Root Cause
Docker Compose \`depends_on\` without a healthcheck condition only waits until the container is created, not until the application inside is actually accepting connections.

### Solution
Updated \`docker-compose.yml\` to declare a native container healthcheck:
\`\`\`yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 2s
      timeout: 3s
      retries: 5
      start_period: 2s

  api-gateway:
    build: .
    depends_on:
      redis:
        condition: service_healthy
\`\`\`

### Client Resiliency
Added exponential backoff in \`src/redis/client.ts\` with a 5-retry circuit breaker before rejecting cold-boot health checks.`,
    time: '18m ago', 
    size: '2.4 KB', 
    iconSrc: claudeCodeIcon, 
    category: 'code',
    summary: 'Fixes container cold-start race conditions by pairing Docker Compose service_healthy dependencies with exponential backoff retries.',
    qas: [
      { question: 'Why did the API crash on boot?', answer: 'The API started immediately upon container creation before Redis finished binding to port 6379.' },
      { question: 'How does Docker ensure readiness?', answer: 'Through a periodic redis-cli ping healthcheck evaluated before starting downstream services.' }
    ],
    entities: ['Docker Compose', 'Redis', 'Healthcheck', 'Circuit Breaker'],
    tags: ['devops', 'docker', 'redis', 'claude-code']
  },

  // 3. Claude (Conversations)
  { 
    id: 'mem_6', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'RFC: Hybrid vector search with BM25 Reciprocal Rank Fusion', 
    source: 'Claude', 
    content: 'Evaluated dense embeddings against lexical BM25 for code retrieval. Reciprocal Rank Fusion (RRF k=60) achieved 28% higher recall on camelCase identifiers...', 
    markdown: `# RFC: Hybrid Vector Search with BM25 Reciprocal Rank Fusion

Evaluated dense embedding retrieval against BM25 lexical keyword matching for source code and technical entity retrieval.

### Problem
Dense embeddings often miss exact camelCase symbol names (e.g. \`getUserAuthTokensBySessionId\`), while lexical BM25 fails semantic intent queries (e.g. "where do we handle session expiry?").

### Solution: Reciprocal Rank Fusion (RRF)
Run dual retrieval passes in parallel and fuse rankings:
$$RRF(d) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}$$
Where $k = 60$.

### Results
- BM25 alone: 68.4% Recall@10
- Dense Embeddings alone: 74.2% Recall@10
- **Hybrid RRF (Dense + BM25)**: **89.6% Recall@10** (+15.4% improvement)`,
    time: '45m ago', 
    size: '4.5 KB', 
    iconSrc: claudeIcon, 
    category: 'conversations',
    summary: 'Proposes hybrid code retrieval combining dense vector embeddings with lexical BM25 using Reciprocal Rank Fusion (k=60), boosting recall by 15.4%.',
    qas: [
      { question: 'Why do dense embeddings alone struggle on code?', answer: 'Dense embeddings miss exact camelCase symbol names, while BM25 excels at literal token matches.' },
      { question: 'What is the recall improvement?', answer: 'Hybrid RRF achieved 89.6% Recall@10 compared to 74.2% for dense embeddings alone.' }
    ],
    entities: ['BM25', 'Dense Vectors', 'RRF', 'Hybrid Search', 'Recall@10'],
    tags: ['retrieval', 'search', 'embeddings', 'claude']
  },

  // 4. Slack (Conversations)
  { 
    id: 'mem_8', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'Team consensus: Deprecate REST v1 endpoints in favor of gRPC v2', 
    source: 'Slack', 
    content: 'Engineering alignment: all internal microservices must migrate to v2 Protobuf/gRPC by Nov 1. Maintained backward-compatible REST shim for web...', 
    markdown: `# Architecture Consensus: Deprecate REST v1 in Favor of gRPC v2

### Alignment Summary
Agreed in \`#eng-architecture\` on Nov 1 deadline for deprecating internal REST v1 service-to-service communication.

### Directives
- **Internal Microservices**: Must communicate via Protobuf definitions stored in \`packages/proto\`.
- **Public Developer API**: Maintained via automatic envoy transcoding / REST reverse proxy.
- **Latency Target**: p99 internal call latency reduced from 28ms to 3.4ms with HTTP/2 multiplexing.`,
    time: '2h ago', 
    size: '3.8 KB', 
    iconSrc: slackIcon, 
    category: 'conversations',
    summary: 'Engineering consensus to deprecate internal REST endpoints by Nov 1, standardizing on Protobuf/gRPC v2 for lower latency.',
    qas: [
      { question: 'What is the target p99 latency reduction?', answer: 'Internal call latency decreases from 28ms over HTTP/1.1 REST to 3.4ms over HTTP/2 gRPC.' },
      { question: 'How will public clients interact with the API?', answer: 'An Envoy reverse proxy will transcode incoming REST HTTP requests into gRPC calls.' }
    ],
    entities: ['gRPC', 'Protobuf', 'Envoy', 'HTTP/2', 'Microservices'],
    tags: ['architecture', 'grpc', 'protocols', 'slack']
  },

  // 5. Notion (Documents)
  { 
    id: 'mem_7', 
    spaceId: 'space_infra',
    projectName: 'Infra & DevOps',
    title: 'Production runbook: Database failover & disaster recovery SOP', 
    source: 'Notion', 
    content: 'Step-by-step checklist: promoting Aurora read replica to primary, updating DNS endpoint records, and triggering cache warm-up script without downtime...', 
    markdown: `# Production Runbook: Aurora PostgreSQL Database Failover SOP

Step-by-step checklist for planned maintenance or unplanned primary node failover.

### SOP Steps
1. **Pre-flight Check**: Verify replication lag on read replica is \`< 5ms\`.
   \`\`\`sql
   SELECT extract(epoch from now() - pg_last_xact_replay_timestamp()) as lag_seconds;
   \`\`\`
2. **Failover Execution**: Initiate cluster failover via AWS CLI:
   \`\`\`bash
   aws rds failover-db-cluster --db-cluster-identifier prod-memwyre-cluster
   \`\`\`
3. **Endpoint Propagation**: DNS failover completes within 15–25 seconds.
4. **Cache Warmup**: Trigger the background cache warming job:
   \`\`\`bash
   pnpm run warmup:cache --env=prod
   \`\`\`
5. **Post-verification**: Inspect error rate on Datadog APM dashboard.`,
    time: '5h ago', 
    size: '12.4 KB', 
    iconSrc: notionIcon, 
    category: 'documents',
    summary: 'Detailed disaster recovery runbook covering pre-flight replication lag checks, AWS RDS cluster failover execution, and cache warmup.',
    qas: [
      { question: 'What is the maximum acceptable replication lag before failover?', answer: 'Replication lag must be verified to be under 5ms before initiating manual promotion.' },
      { question: 'How long does DNS propagation take?', answer: 'RDS cluster endpoint DNS updates propagate globally in 15 to 25 seconds.' }
    ],
    entities: ['AWS Aurora', 'PostgreSQL', 'Failover SOP', 'DNS Propagation'],
    tags: ['devops', 'runbook', 'disaster-recovery', 'notion']
  },

  // 6. ChatGPT (Conversations)
  { 
    id: 'mem_3', 
    spaceId: 'space_infra',
    projectName: 'Infra & DevOps',
    title: 'Distributed rate limiting: Redis sliding window algorithm spec', 
    source: 'ChatGPT', 
    content: 'Decided on Redis sorted set (ZSET) sliding window rate limiter over fixed token bucket to prevent traffic bursts at window boundary edges...', 
    markdown: `# Distributed Rate Limiting: Redis Sliding Window Spec

### Decision Summary
Selected a Redis Sorted Set (ZSET) sliding window rate limiter over fixed token buckets. Fixed window counters allow clients to make double their quota at boundary transitions.

### Specification
- Key format: \`rl:{tenant_id}:{tier}:{window_sec}\`
- Score: current Unix timestamp in milliseconds (\`now\`)
- Value: unique request ID / UUID

### Lua Script Implementation
\`\`\`lua
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local clearBefore = now - (window * 1000)

-- 1. Evict entries outside the sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)

-- 2. Count active requests
local currentRequests = redis.call('ZCARD', key)

if currentRequests < limit then
  redis.call('ZADD', key, now, ARGV[4])
  redis.call('EXPIRE', key, window)
  return 1 -- Allowed
else
  return 0 -- Rejected (429 Too Many Requests)
end
\`\`\`

### SLA & Latency Target
Atomic Lua execution under 1.2ms across 20,000 sustained RPS.`,
    time: 'Yesterday', 
    size: '3.2 KB', 
    iconSrc: chatgptIcon, 
    category: 'conversations',
    summary: 'Defines an atomic Redis sliding window rate limiting algorithm using ZSETs and Lua scripting to eliminate boundary edge bursts.',
    qas: [
      { question: 'Why choose sliding window over fixed counters?', answer: 'Sliding window guarantees strict enforcement across any arbitrary rolling duration, preventing 2x quota spikes.' },
      { question: 'How is concurrency handled?', answer: 'Using atomic Redis Lua scripts so no race condition can bypass the quota check.' }
    ],
    entities: ['Redis ZSET', 'Sliding Window', 'Lua Scripts', 'Rate Limiting'],
    tags: ['system-design', 'redis', 'rate-limiting', 'architecture']
  },

  // 7. Cursor (Code & IDE)
  { 
    id: 'mem_5', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'Stripe webhook idempotency pattern to prevent duplicate billing', 
    source: 'Cursor', 
    content: 'All billing webhook handlers must verify signatures and validate Redis idempotency keys with 24h TTL before dispatching license fulfillment...', 
    markdown: `# Stripe Webhook Idempotency & Replay Protection

All payment and subscription lifecycle webhooks must be verified cryptographically and guarded with an idempotency lock before triggering database mutations.

### Sequence Pattern
1. Verify signature with \`stripe.webhooks.constructEvent(body, sig, secret)\`.
2. Generate idempotency key: \`webhook:stripe:\${event.id}\`.
3. Acquire Redis lock using \`SET NX EX 86400\` (24-hour expiration).
4. If key already exists: return \`200 OK\` immediately (event already processed).
5. If lock acquired:
   - Dispatch user license upgrade in transaction.
   - Mark event status as \`processed\` in audit table.

### Code Reference
\`\`\`typescript
export async function handleStripeWebhook(req: Request) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature')!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  const lockKey = \`idemp:stripe:\${event.id}\`;
  const isNew = await redis.set(lockKey, '1', 'NX', 'EX', 86400);

  if (!isNew) {
    return new Response(JSON.stringify({ received: true, deduplicated: true }), { status: 200 });
  }

  await fulfillCustomerPlan(event.data.object);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
\`\`\``,
    time: 'Yesterday', 
    size: '2.1 KB', 
    iconSrc: cursorIcon, 
    category: 'code',
    summary: 'Guards billing webhooks against duplicate delivery by validating cryptographic signatures and utilizing Redis SET NX 24-hour keys.',
    qas: [
      { question: 'How is replay protection achieved?', answer: 'Using Redis SET NX with the unique Stripe event ID for 24 hours.' },
      { question: 'What does the endpoint return on duplicate requests?', answer: 'A 200 OK status indicating the event was already received and processed.' }
    ],
    entities: ['Stripe API', 'Redis Lock', 'Idempotency', 'Webhooks'],
    tags: ['billing', 'stripe', 'security', 'cursor']
  },

  // 8. Claude (Conversations)
  { 
    id: 'mem_4', 
    spaceId: 'space_research',
    projectName: 'AI Research & Benchmarks',
    title: 'vLLM vs TensorRT-LLM latency & throughput benchmark on H100s', 
    source: 'Claude', 
    content: 'Researched inference engines: vLLM PagedAttention delivers 2.4x higher concurrency throughput; TensorRT-LLM has 18% lower TTFT for streaming...', 
    markdown: `# LLM Inference Benchmark: vLLM vs TensorRT-LLM on NVIDIA H100s

Synthesized empirical evaluation for serving **Llama-3-70B-Instruct (FP8)** across dual NVIDIA H100 SXM5 GPUs.

### Benchmark Results
| Metric | vLLM (v0.6.1) | TensorRT-LLM (v0.12) | Margin |
|---|---|---|---|
| **Max Concurrent Throughput** | 1,420 tokens/sec | 1,180 tokens/sec | **vLLM (+20%)** |
| **Time to First Token (TTFT)** | 38ms | 31ms | **TRT-LLM (-18%)** |
| **Inter-token Latency (ITL)** | 11.2ms | 10.4ms | **TRT-LLM (-7%)** |
| **KV Cache Utilization** | 96% (PagedAttention) | 88% (Static Blocks) | **vLLM** |
| **Engine Compilation Time** | Instant (JIT) | 38 min (TRT Engine) | **vLLM** |

### Architectural Decision
- Deploy **vLLM** for the multi-tenant public API because dynamic batching and PagedAttention yield superior GPU utilization and simpler CI/CD deployment.`,
    time: '2 days ago', 
    size: '2.9 KB', 
    iconSrc: claudeIcon, 
    category: 'conversations',
    summary: 'Empirical benchmark comparing vLLM and TensorRT-LLM on H100s, determining vLLM as the optimal multi-tenant production engine.',
    qas: [
      { question: 'Which engine showed higher throughput?', answer: 'vLLM achieved 1,420 tokens/sec vs 1,180 tokens/sec for TensorRT-LLM.' },
      { question: 'Where did TensorRT-LLM outperform?', answer: 'TensorRT-LLM produced lower Time to First Token (31ms vs 38ms).' }
    ],
    entities: ['vLLM', 'TensorRT-LLM', 'NVIDIA H100', 'PagedAttention', 'Llama 3'],
    tags: ['llm-inference', 'benchmarks', 'vllm', 'claude']
  },

  // 9. Claude Code (Code & IDE)
  { 
    id: 'mem_9', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'Monorepo audit: Circular dependency resolution across 45k LOC', 
    source: 'Claude Code', 
    content: 'Analyzed full monorepo graph in automated CLI session. Identified 4 circular import cycles between core-auth and session-store; extracted shared package...', 
    markdown: `# Monorepo Audit: Circular Dependency Graph Resolution

Analyzed the entire monorepo codebase (45,000 LOC) using Claude Code terminal agent analysis.

### Discovered Cycles
1. \`core-auth\` $\\leftrightarrow$ \`session-store\` (mutual type and token imports).
2. \`billing-service\` $\\rightarrow$ \`tenant-manager\` $\\rightarrow$ \`billing-service\`.

### Refactoring Plan Executed
- Created \`@memwyre/contracts\` to hold pure TypeScript interfaces, eliminating circular type dependencies.
- Replaced direct imports with dependency injection via factory functions.
- Added \`madge --circular\` check to CI pipeline to prevent regressions.`,
    time: '4 days ago', 
    size: '6.2 KB', 
    iconSrc: claudeCodeIcon, 
    category: 'code',
    summary: 'Automated CLI code analysis that identified and resolved 4 circular import cycles between core-auth and session-store packages.',
    qas: [
      { question: 'Where were the circular dependencies located?', answer: 'Between core-auth and session-store, caused by reciprocal type imports.' },
      { question: 'How were they resolved?', answer: 'Extracted shared interface contracts into a standalone @memwyre/contracts package.' }
    ],
    entities: ['Monorepo', 'Dependency Graph', 'Claude Code', 'TypeScript'],
    tags: ['refactoring', 'monorepo', 'audit', 'claude-code']
  },

  // 10. Slack (Conversations)
  { 
    id: 'mem_10', 
    spaceId: 'space_research',
    projectName: 'AI Research & Benchmarks',
    title: 'Community benchmarks: DeepSeek V3 vs Claude 3.5 Sonnet on coding', 
    source: 'Slack', 
    content: 'Shared from #research: DeepSeek V3 matches Sonnet on standard Python/Go refactoring at 1/7th inference cost; Sonnet leads multi-file logic...', 
    markdown: `# Community Benchmarks: DeepSeek V3 vs Claude 3.5 Sonnet

Synthesis shared from team discussion in \`#research\` analyzing developer benchmarks, SWE-bench performance, and cost economics.

### Key Observations
- **Single-File Refactoring**: DeepSeek V3 achieves 94% parity with Claude 3.5 Sonnet on standard Python, Go, and TypeScript algorithmic tasks.
- **Cost Factor**: DeepSeek V3 runs at approximately 1/7th the token price of Sonnet 3.5 ($0.27/M input tokens vs $3.00/M).
- **Multi-File Architecture**: Sonnet maintains a clear advantage on holistic repo refactors and subtle race condition debugging.`,
    time: '5 days ago', 
    size: '3.1 KB', 
    iconSrc: slackIcon, 
    category: 'conversations',
    summary: 'Team benchmark synthesis shared in Slack showing DeepSeek V3 parity on single-file code refactors at 1/7th inference cost.',
    qas: [
      { question: 'Where does DeepSeek V3 match Claude 3.5 Sonnet?', answer: 'On single-file Python and Go algorithms, function generation, and test creation.' },
      { question: 'Where does Claude 3.5 Sonnet retain an edge?', answer: 'On complex multi-file architectural planning and subtle edge-case debugging.' }
    ],
    entities: ['DeepSeek V3', 'Claude 3.5 Sonnet', 'Coding Benchmarks', 'Inference Costs'],
    tags: ['llm', 'benchmarks', 'coding', 'slack']
  },

  // 11. Claude Code (Code & IDE)
  { 
    id: 'mem_11', 
    spaceId: 'space_research',
    projectName: 'AI Research & Benchmarks',
    title: 'Multi-agent memory isolation rules for background subagents', 
    source: 'Claude Code', 
    content: 'Configured tenant and workspace namespace boundaries so autonomous background tasks cannot overwrite production architectural prompt templates...', 
    markdown: `# Multi-Agent Memory Isolation Rules for Autonomous Subagents

Establishes strict boundaries preventing parallel background subagents from contaminating primary workspace context or overwriting system prompt specifications.

### Security Directives
1. **Scoped Namespaces**: All subagent memory writes are routed to a sub-workspace partition \`workspace:{id}:subagent:{task_id}\`.
2. **Promotion Gate**: Subagent insights require human approval or parent-agent verification before merging into the root project memory graph.
3. **Read Permissions**: Subagents receive read access to parent conventions while maintaining isolated scratchpad state.`,
    time: '6 days ago', 
    size: '2.6 KB', 
    iconSrc: claudeCodeIcon, 
    category: 'code',
    summary: 'Defines tenant and workspace namespace boundaries preventing autonomous subagents from modifying master system prompt templates.',
    qas: [
      { question: 'How is memory isolation enforced between subagents?', answer: 'Through scoped tenant namespace keys and cryptographic token permissions.' },
      { question: 'Can subagents write to parent workspace prompts?', answer: 'No, subagents operate with read-only access to master templates unless explicitly elevated.' }
    ],
    entities: ['Autonomous Agents', 'Namespace Isolation', 'Claude Code', 'Subagents'],
    tags: ['multi-agent', 'security', 'subagents', 'claude-code']
  },

  // 12. Notion (Documents)
  { 
    id: 'mem_12', 
    spaceId: 'space_infra',
    projectName: 'Infra & DevOps',
    title: 'SOC2 compliance: Tenant encryption keys & memory retention policy', 
    source: 'Notion', 
    content: 'Cryptographic spec: all memory embeddings and entity nodes encrypted with per-tenant KMS keys. 90-day automatic purge policy for inactive sessions...', 
    markdown: `# SOC2 Type II Compliance: Tenant Key Encryption & Data Retention

Formal cryptographic and data governance specification approved for enterprise compliance.

### Encryption Standards
- **Envelope Encryption**: Memory documents and vector embeddings are encrypted using per-tenant AWS KMS customer-managed keys (CMK).
- **In-Transit**: TLS 1.3 enforced across all API endpoints with strict cipher suite pinning.

### Retention & Purge Policy
- Unpinned session memories are automatically flagged for archival after 90 days of zero access.
- Hard delete executes within 7 days of archival flag, permanently scrubbing vector chunks and relational metadata.`,
    time: '1 week ago', 
    size: '8.6 KB', 
    iconSrc: notionIcon, 
    category: 'documents',
    summary: 'Security and compliance policy mandating per-tenant KMS key encryption for vector embeddings and a 90-day automatic purge for inactive sessions.',
    qas: [
      { question: 'How are vector embeddings encrypted at rest?', answer: 'Each tenant has an isolated AWS KMS key ARN used for envelope encryption.' },
      { question: 'What is the automatic data retention schedule?', answer: 'Unpinned session memories are automatically archived and scrubbed after 90 days of inactivity.' }
    ],
    entities: ['SOC2 Type II', 'AWS KMS', 'Envelope Encryption', 'Data Retention'],
    tags: ['compliance', 'security', 'soc2', 'notion']
  },

  // 13. Cursor (Code & IDE)
  { 
    id: 'mem_13', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'OpenAPI v3 schema validation & end-to-end TypeScript typegen', 
    source: 'Cursor', 
    content: 'Automated schema contract validation using Zod with ts-to-zod pipeline, enforcing runtime guarantees between backend services and frontend clients...', 
    markdown: `# OpenAPI v3 Schema Validation & End-to-End Typegen

Pipeline configuration enforcing 100% type parity between Go/Node backend services and Vue 3 frontend applications.

### Toolchain
- \`openapi-typescript\`: generates static TypeScript definitions from OpenAPI v3 JSON specs.
- \`zod\`: runtime schema validation for incoming payloads.

### Build Step
\`\`\`bash
# Generate TypeScript interfaces from spec
pnpm dlx openapi-typescript https://server.memwyre.tech/v1/openapi.json -o src/types/api.ts
\`\`\`
Automated in GitHub Actions PR checks to flag breaking contract changes prior to merging.`,
    time: '1 week ago', 
    size: '5.7 KB', 
    iconSrc: cursorIcon, 
    category: 'code',
    summary: 'Automated build pipeline that converts OpenAPI v3 specifications into runtime Zod schemas and compile-time TypeScript types.',
    qas: [
      { question: 'How are runtime schemas generated?', answer: 'Using openapi-typescript combined with ts-to-zod during the pre-build pipeline.' },
      { question: 'What guarantee does this provide?', answer: 'Guarantees 100% type parity between backend REST responses and frontend client stores.' }
    ],
    entities: ['OpenAPI v3', 'Zod', 'TypeScript', 'Typegen'],
    tags: ['tooling', 'typescript', 'openapi', 'cursor']
  },

  // 14. Cursor (Code & IDE)
  { 
    id: 'mem_14', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'Tailwind v4 CSS migration: CSS variables over tailwind.config.js', 
    source: 'Cursor', 
    content: 'Standardized styling architecture: migrated all custom theme tokens and brand hex codes into @theme block in style.css, removing legacy JS config...', 
    markdown: `# Tailwind CSS v4 Migration: CSS Variables Architecture

Successfully refactored the design system away from JavaScript configuration to pure CSS custom properties.

### Key Changes
- Removed legacy \`tailwind.config.js\`.
- Defined tokens directly inside \`src/assets/css/style.css\`:
\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #000000;
  --color-brand-orange: #D97757;
  --font-serif: "Instrument Serif", serif;
  --font-sans: "Inter", sans-serif;
}
\`\`\`

### Results
- Build and HMR speed improved by 3.4x.
- Full zero-runtime variable customization supported natively in modern browsers.`,
    time: '2 weeks ago', 
    size: '1.9 KB', 
    iconSrc: cursorIcon, 
    category: 'code',
    summary: 'Standardized styling architecture by migrating theme tokens, colors, and font definitions into @theme CSS variables in style.css.',
    qas: [
      { question: 'What replaces tailwind.config.js in Tailwind v4?', answer: 'Native @theme blocks with CSS custom properties in src/assets/css/style.css.' },
      { question: 'What performance benefit does this provide?', answer: 'Eliminates JavaScript config evaluation, yielding faster Vite HMR reload times.' }
    ],
    entities: ['Tailwind CSS v4', 'CSS Custom Properties', 'Vite', 'Cursor'],
    tags: ['frontend', 'tailwind', 'css', 'cursor']
  },

  // 15. Notion (Documents)
  { 
    id: 'mem_15', 
    spaceId: 'space_core',
    projectName: 'Memwyre Core',
    title: 'Technical spec: Sub-50ms predicate-filtered memory retrieval', 
    source: 'Notion', 
    content: 'Full engineering blueprint covering memory ingestion pipelines, HNSW index partitioning, and client SDK interfaces for IDE integrations...', 
    markdown: `# Technical Spec: Sub-50ms Predicate-Filtered Memory Retrieval

Architectural specification for high-throughput, low-latency memory queries filtered by project, user tags, and timestamps.

### Retrieval Architecture
1. **Partition Pruning**: Target node candidates are filtered first by tenant and workspace partition keys before graph traversal.
2. **HNSW Graph Search**: Multi-layer hierarchical navigable small world graph execution on residual candidates.
3. **Re-ranking**: Top 50 results evaluated with cross-encoder re-ranking for final context prompt injection.

### Measured Latency
- Single query p50: 16ms
- Filtered query p99: 38ms across 10,000,000 vector records.`,
    time: '3 weeks ago', 
    size: '14.2 KB', 
    iconSrc: notionIcon, 
    category: 'documents',
    summary: 'Engineering architecture specification for sub-50ms metadata-filtered vector search using partitioned HNSW index segments.',
    qas: [
      { question: 'How does partitioned HNSW achieve sub-50ms retrieval?', answer: 'By pre-filtering candidate nodes by tenant and project partitions before running approximate nearest neighbor graphs.' },
      { question: 'What is the measured p99 query latency?', answer: '38ms across 10 million vector records with 5 filtering predicates.' }
    ],
    entities: ['HNSW Index', 'Vector Database', 'Metadata Filtering', 'Retrieval Spec'],
    tags: ['performance', 'vector-db', 'retrieval', 'notion']
  }
]);

const filteredMemories = computed(() => {
  let list = memoryItems.value;
  if (activeSpaceId.value !== 'space_all') {
    list = list.filter(item => item.spaceId === activeSpaceId.value);
  }
  if (activeCategory.value !== 'all') {
    list = list.filter(item => item.category === activeCategory.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(item =>
      ((item.title || item.details) && (item.title || item.details).toLowerCase().includes(q)) ||
      ((item.content || item.snippet) && (item.content || item.snippet).toLowerCase().includes(q)) ||
      (item.source && item.source.toLowerCase().includes(q))
    );
  }
  return list;
});

// --- Inbox Data & Handlers ---
const activeInboxTab = ref('all'); // 'all', 'pending', 'approved'

const inboxItems = ref([
  {
    id: 'inbox_1',
    source: 'Claude Code',
    iconSrc: claudeCodeIcon,
    status: 'pending',
    time: '8m ago',
    spaceId: 'space_core',
    title: 'FastAPI SSE streaming: handle client disconnect with AnyIO cancel scopes',
    details: 'FastAPI SSE streaming: handle client disconnect with AnyIO cancel scopes',
    snippet: 'Configured AnyIO cancellation scopes on Server-Sent Events (SSE) streaming endpoints to abort upstream LLM inference when client aborts HTTP connection...',
    content: 'Configured AnyIO cancellation scopes on Server-Sent Events (SSE) streaming endpoints to abort upstream LLM inference when client aborts HTTP connection...',
    markdown: `# FastAPI SSE Streaming: Client Disconnect & Cancellation Pattern

When streaming LLM completions over Server-Sent Events (SSE), client aborts (closing browser tab, pressing stop generation) must immediately terminate upstream model generation to eliminate wasted GPU token compute.

### Solution Pattern
Wrap the asynchronous generator loop inside an AnyIO task group cancel scope bound to \`Request.is_disconnected()\`:

\`\`\`python
from fastapi import FastAPI, Request
from sse_starlette.sse import EventSourceResponse
import anyio

@app.post("/api/chat/stream")
async def chat_stream(request: Request, body: ChatPrompt):
    async def event_generator():
        async with anyio.create_task_group() as tg:
            async for token in llm_service.stream(body.prompt):
                if await request.is_disconnected():
                    logger.info("Client disconnected; aborting LLM inference")
                    tg.cancel_scope.cancel()
                    break
                yield {"event": "token", "data": token}

    return EventSourceResponse(event_generator())
\`\`\`

### Verification Results
- 0 dangling background tasks upon client aborts.
- Reduced abandoned LLM inference compute overhead by 22%.`,
    size: '2.4 KB',
    tags: ['fastapi', 'sse', 'streaming', 'claude-code', 'python']
  },
  {
    id: 'inbox_2',
    source: 'Cursor',
    iconSrc: cursorIcon,
    status: 'pending',
    time: '24m ago',
    spaceId: 'space_core',
    title: 'Drizzle ORM migration safety: zero-downtime column rename SOP',
    details: 'Drizzle ORM migration safety: zero-downtime column rename SOP',
    snippet: 'Standardized 3-step expand/contract pattern for database column renames in production PostgreSQL to prevent schema lockouts and query failures...',
    content: 'Standardized 3-step expand/contract pattern for database column renames in production PostgreSQL to prevent schema lockouts and query failures...',
    markdown: `# Drizzle ORM Zero-Downtime Column Renaming Pattern

Never execute a raw \`ALTER TABLE ... RENAME COLUMN\` on high-concurrency production PostgreSQL tables, as concurrent application queries will fail during rolling deployment transitions.

### 3-Phase Expand/Contract Protocol
1. **Phase 1 (Expand)**: Add the new column as nullable; configure Drizzle application code with dual-write into both columns.
2. **Phase 2 (Backfill)**: Run asynchronous background migration copying historical records in batches of 5,000.
3. **Phase 3 (Contract)**: Switch application reads to the new column; deprecate writes to legacy field and drop in subsequent release.

### Verification Benchmark
- Simulated 4,000 concurrent database writes with zero 500 error spikes during migration window.`,
    size: '3.1 KB',
    tags: ['drizzle-orm', 'postgres', 'database', 'migrations', 'cursor']
  },
  {
    id: 'inbox_3',
    source: 'Slack',
    iconSrc: slackIcon,
    status: 'pending',
    time: '1h ago',
    spaceId: 'space_infra',
    title: 'Kubernetes HPA scaling: custom Prometheus metrics for vector queue depth',
    details: 'Kubernetes HPA scaling: custom Prometheus metrics for vector queue depth',
    snippet: 'Shared in #infra: Replaced default CPU/Memory HPA metrics with custom Prometheus vector queue depth to scale AI worker pods before GPU memory saturates...',
    content: 'Shared in #infra: Replaced default CPU/Memory HPA metrics with custom Prometheus vector queue depth to scale AI worker pods before GPU memory saturates...',
    markdown: `# Kubernetes HPA Scaling on Prometheus Vector Queue Depth

Discussion and deployment spec shared in \`#infra\` regarding memory worker scaling.

Default CPU and memory utilization metrics lag behind sudden traffic bursts during bulk ingestion of high-dimensional vector embeddings.

### Configuration
Exposed \`memwyre_ingestion_queue_depth\` metric via Prometheus Adapter to drive Horizontal Pod Autoscaling:

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: vector-worker-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: vector-worker
  minReplicas: 3
  maxReplicas: 25
  metrics:
  - type: External
    external:
      metric:
        name: memwyre_ingestion_queue_depth
      target:
        type: AverageValue
        averageValue: "50"
\`\`\`

### Measured SLA
- Worker scaling reaction time dropped from 90s to under 12s, preventing ingestion buffer overflows.`,
    size: '3.6 KB',
    tags: ['kubernetes', 'prometheus', 'hpa', 'infra', 'slack']
  },
  {
    id: 'inbox_4',
    source: 'ChatGPT',
    iconSrc: chatgptIcon,
    status: 'pending',
    time: '3h ago',
    spaceId: 'space_research',
    title: 'AST-aware semantic code chunking using Tree-sitter boundary parsing',
    details: 'AST-aware semantic code chunking using Tree-sitter boundary parsing',
    snippet: 'Evaluated fixed 512-token chunking vs AST-aware syntax splitting for TypeScript & Rust. Semantic boundaries reduced context fragmentation by 34%...',
    content: 'Evaluated fixed 512-token chunking vs AST-aware syntax splitting for TypeScript & Rust. Semantic boundaries reduced context fragmentation by 34%...',
    markdown: `# AST-Aware Semantic Chunking for Code Repositories

Fixed-size character chunking frequently fractures function signatures, class interfaces, and lexical blocks across chunk borders.

### Strategy
Utilized Tree-sitter parsers to split source code strictly on top-level semantic AST nodes:
- Function declarations (\`function_declaration\`, \`arrow_function\`)
- Class & Struct declarations (\`class_declaration\`, \`impl_item\`)
- Interface definitions (\`interface_declaration\`)

### Benchmark Evaluation
- **Context Recall Accuracy**: Improved from 62.1% to 83.7% on code retrieval benchmarks.
- **Chunk Overlap**: Reduced from 15% token redundancy to 0% with parent context headers.`,
    size: '2.8 KB',
    tags: ['ast', 'tree-sitter', 'chunking', 'rag', 'chatgpt']
  }
]);

const filteredInboxItems = computed(() => {
  if (activeInboxTab.value === 'pending') {
    return inboxItems.value.filter(i => i.status === 'pending');
  }
  if (activeInboxTab.value === 'approved') {
    return inboxItems.value.filter(i => i.status === 'approved');
  }
  return inboxItems.value;
});

const dismissInboxItem = (id) => {
  inboxItems.value = inboxItems.value.filter(item => item.id !== id);
  if (selectedMemory.value && selectedMemory.value.id === id) {
    goBackFromMemory();
  }
};

const approveInboxItem = (item) => {
  if (!item) return;

  const itemTitle = item.title || item.details || 'Untitled Memory';
  const itemSnippet = item.snippet || item.content || item.summary || '';

  // 1. Mark status as 'approved' in inboxItems
  const inboxIdx = inboxItems.value.findIndex(i => i.id === item.id);
  if (inboxIdx !== -1) {
    inboxItems.value[inboxIdx].status = 'approved';
    inboxItems.value[inboxIdx].title = itemTitle;
    inboxItems.value[inboxIdx].details = itemTitle;
  }

  // 2. Add as proper memory to memoryItems if not already there
  const existingIndex = memoryItems.value.findIndex(m => m.id === item.id);
  if (existingIndex === -1) {
    const spaceMap = {
      space_core: 'Memwyre Core',
      space_infra: 'Infra & DevOps',
      space_research: 'AI Research & Benchmarks'
    };
    memoryItems.value.unshift({
      id: item.id,
      spaceId: item.spaceId || 'space_core',
      projectName: spaceMap[item.spaceId] || 'Memwyre Core',
      title: itemTitle,
      details: itemTitle,
      source: item.source || 'External Agent',
      content: itemSnippet,
      snippet: itemSnippet,
      summary: itemSnippet,
      markdown: item.markdown || `# ${itemTitle}\n\n${itemSnippet}`,
      time: 'Just now',
      size: item.size || '2.4 KB',
      iconSrc: item.iconSrc,
      category: item.category === 'inbox' ? 'code' : (item.category || 'code'),
      qas: [
        { question: 'What does this memory cover?', answer: itemTitle },
        { question: 'What is its verification status?', answer: 'Verified and indexed into memory vault.' }
      ],
      entities: item.tags ? item.tags.slice(0, 5) : [],
      tags: item.tags || []
    });
  } else {
    memoryItems.value[existingIndex].title = itemTitle;
    memoryItems.value[existingIndex].details = itemTitle;
    memoryItems.value[existingIndex].content = itemSnippet;
  }

  // 3. Update selectedMemory if it's currently open
  if (selectedMemory.value && selectedMemory.value.id === item.id) {
    selectedMemory.value.title = itemTitle;
    selectedMemory.value.details = itemTitle;
    selectedMemory.value.category = 'code';
    goBackFromMemory();
  }
};

const approveAllInbox = () => {
  const itemsToApprove = [...inboxItems.value];
  itemsToApprove.forEach(item => {
    approveInboxItem(item);
  });
};

// --- Chat Data & Handlers ---
const activeConversationId = ref('conv_1');

const conversations = ref([
  {
    id: 'conv_1',
    title: 'Serverless DB Pooling',
    subtitle: 'Cursor Postgres & Notion SOP',
    messages: [
      {
        id: 'm1_1',
        role: 'user',
        content: 'How are we configuring connection pooling for Postgres in our serverless runtimes? We keep hitting PgBouncer prepared statement collisions.',
        time: '10:42 AM'
      },
      {
        id: 'm1_2',
        role: 'assistant',
        thinking: 'Identified error 42P05 in serverless runtimes connecting via PgBouncer. Cross-referencing database configuration memories: Cursor Postgres pooling guidelines (mem_1) and AWS Aurora failover SOP (mem_7). Found specific setup instructions for Drizzle ORM and Prisma relationMode.',
        content: `In serverless environments using transaction-mode PgBouncer, prepared statements must be explicitly disabled to prevent \`error 42P05: prepared statement already exists\`.

#### 1. Drizzle ORM Setup
Set \`prepare: false\` and cap the client pool to 1 socket per serverless function instance:
\`\`\`typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_POOL_URL!, {
  prepare: false, // Required for PgBouncer transaction mode
  max: 1,         // Limit socket count per lambda instance
});
export const db = drizzle(client);
\`\`\`

#### 2. Prisma Client Setup
Configure \`relationMode = "prisma"\` and declare \`directUrl\` for migrations:
\`\`\`prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_POOL_URL")
  directUrl = env("DIRECT_URL")
}
\`\`\`

> **Aurora Failover Notice:** During RDS maintenance, check that replication lag remains \`< 5ms\` before triggering failovers via \`aws rds failover-db-cluster\`.`,
        sources: ['mem_1', 'mem_7'],
        time: '10:42 AM'
      }
    ]
  },
  {
    id: 'conv_2',
    title: 'Rate Limiting & Cold Starts',
    subtitle: 'ChatGPT spec & Claude Code',
    messages: [
      {
        id: 'm2_1',
        role: 'user',
        content: 'What rate limiting algorithm did we select for public endpoints, and how are we preventing Redis cold-start timeouts in Docker Compose?',
        time: '11:15 AM'
      },
      {
        id: 'm2_2',
        role: 'assistant',
        thinking: 'Retrieving architecture decisions on API traffic control. Found ChatGPT sliding window specification (mem_3) using Redis ZSET with atomic Lua scripts. Cross-referencing DevOps container startup race condition resolution in Claude Code (mem_2) using Docker Compose service_healthy checks.',
        content: `We chose an **atomic Redis Sorted Set (ZSET) sliding window** over fixed token buckets to eliminate 2x traffic bursts at window boundary transitions.

#### Sliding Window Implementation
The rate limiter evaluates keys with format \`rl:{tenant_id}:{tier}:{window_sec}\`. Eviction and quota validation are executed atomically via Lua:
\`\`\`lua
-- 1. Evict entries outside the sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
local currentRequests = redis.call('ZCARD', key)

if currentRequests < limit then
  redis.call('ZADD', key, now, requestId)
  redis.call('EXPIRE', key, window)
  return 1 -- Allowed
else
  return 0 -- Rejected (429 Too Many Requests)
end
\`\`\`

#### Docker Compose Cold-Start Healthcheck
To prevent API containers from crashing during local dev before Redis finishes binding to port 6379, we declare a native container healthcheck:
\`\`\`yaml
redis:
  image: redis:7-alpine
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 2s
    retries: 5

api-gateway:
  depends_on:
    redis:
      condition: service_healthy
\`\`\``,
        sources: ['mem_3', 'mem_2'],
        time: '11:15 AM'
      }
    ]
  },
  {
    id: 'conv_3',
    title: 'Hybrid Search & Sub-50ms Latency',
    subtitle: 'Claude RFC & Notion spec',
    messages: [
      {
        id: 'm3_1',
        role: 'user',
        content: 'Why do dense vector embeddings fail on camelCase identifiers, and how does our partitioned index guarantee sub-50ms retrieval?',
        time: '01:20 PM'
      },
      {
        id: 'm3_2',
        role: 'assistant',
        thinking: 'Analyzing retrieval evaluation records: Claude RFC on BM25 Reciprocal Rank Fusion (mem_6) and Notion technical spec on sub-50ms predicate-filtered memory retrieval (mem_15). Fusing dense vector semantic search with lexical token matching for camelCase identifiers.',
        content: `Dense embeddings often miss exact code identifiers like \`getUserAuthTokensBySessionId\` because semantic subword tokenizers blur specific symbol boundaries.

#### Solution: Reciprocal Rank Fusion (RRF)
We run parallel dense vector and lexical BM25 passes, combining rankings using $k = 60$:
$$RRF(d) = \\sum_{m \\in M} \\frac{1}{60 + r_m(d)}$$

- **BM25 alone:** 68.4% Recall@10
- **Dense alone:** 74.2% Recall@10
- **Hybrid RRF:** **89.6% Recall@10** (+15.4% improvement)

#### Partitioned HNSW Architecture
Our Notion spec achieves sub-50ms queries through a 2-stage execution:
1. **Partition Pruning:** Pre-filter candidates by \`tenant_id\` and project partition keys before graph traversal.
2. **HNSW Graph Search:** Multi-layer approximate nearest neighbor search across residual nodes.

Measured p50 is **16ms**, with p99 holding at **38ms** across 10,000,000 vector records with 5 active predicate filters.`,
        sources: ['mem_6', 'mem_15'],
        time: '01:20 PM'
      }
    ]
  }
]);

const currentConversation = computed(() => {
  return conversations.value.find(c => c.id === activeConversationId.value) || conversations.value[0];
});

const thinkingOpenMap = ref({});
const isThinkingOpen = (id) => !!thinkingOpenMap.value[id];
const toggleThinking = (id) => {
  thinkingOpenMap.value[id] = !thinkingOpenMap.value[id];
};

const agentSteps = [
  'Parsing query intent & extracting semantic entity tokens',
  'Executing BM25 + dense vector hybrid search across 15 memories',
  'Cross-Encoder re-ranking & candidate filtering',
  'Synthesizing architectural answer with Kimi K2.5'
];
const currentStepIndex = ref(0);

const quickChips = [
  { label: 'Postgres serverless pooling', convId: 'conv_1' },
  { label: 'Redis sliding window limiter', convId: 'conv_2' },
  { label: 'BM25 + Dense hybrid search', convId: 'conv_3' },
  { label: 'Docker container cold start', convId: 'conv_2' }
];

const applyQuickChip = (chip) => {
  if (chip.convId) {
    activeConversationId.value = chip.convId;
  }
};

const copiedMessageId = ref(null);
const copyAnswer = async (id, text) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    }
    copiedMessageId.value = id;
    setTimeout(() => {
      if (copiedMessageId.value === id) {
        copiedMessageId.value = null;
      }
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text', err);
  }
};

const chatInput = ref('');
const isThinking = ref(false);

const handleSendChat = () => {
  if (!chatInput.value.trim() || isThinking.value) return;
  
  const text = chatInput.value.trim();
  chatInput.value = '';
  
  currentConversation.value.messages.push({
    id: `usr_${Date.now()}`,
    role: 'user',
    content: text,
    time: 'Just now'
  });
  
  isThinking.value = true;
  currentStepIndex.value = 0;
  
  setTimeout(() => { currentStepIndex.value = 1; }, 350);
  setTimeout(() => { currentStepIndex.value = 2; }, 750);
  setTimeout(() => { currentStepIndex.value = 3; }, 1150);
  
  setTimeout(() => {
    const lower = text.toLowerCase();
    let relevantSources = ['mem_1', 'mem_6'];
    let respContent = `I retrieved relevant engineering guidelines from your connected workspace knowledge graph.

All implementations should adhere to documented runbooks and avoid bypassing connection pools or idempotency locks. Check the linked memory records below for technical specifications.`;
    let respThinking = `Analyzed query "${text}". Searched across 15 workspace memories. Found relevant runbooks and specifications.`;

    if (lower.includes('docker') || lower.includes('redis') || lower.includes('rate') || lower.includes('limit')) {
      relevantSources = ['mem_3', 'mem_2'];
      respThinking = `Matched Redis sliding window spec (mem_3) and Docker compose container healthcheck fix (mem_2).`;
      respContent = `Based on our Redis sliding window specification and Docker Compose runbook:

- **Sliding Window:** We use atomic ZSET evaluation via Lua scripts (\`rl:{tenant_id}:{tier}:{window_sec}\`) to prevent boundary quota spikes.
- **Docker Compose:** Redis cold starts are mitigated by using \`condition: service_healthy\` paired with \`redis-cli ping\` healthchecks.`;
    } else if (lower.includes('search') || lower.includes('bm25') || lower.includes('vector') || lower.includes('hnsw') || lower.includes('latency')) {
      relevantSources = ['mem_6', 'mem_15'];
      respThinking = `Matched hybrid search RFC (mem_6) and sub-50ms predicate retrieval spec (mem_15).`;
      respContent = `According to our search architecture RFC:

- **Hybrid RRF ($k=60$):** Combines lexical BM25 token matching with dense vectors, achieving **89.6% Recall@10** on camelCase symbol identifiers.
- **Partitioned HNSW:** Multi-tenant partition pre-filtering ensures p99 latency stays under **38ms** across 10M records.`;
    } else if (lower.includes('postgres') || lower.includes('db') || lower.includes('pool') || lower.includes('failover') || lower.includes('drizzle') || lower.includes('prisma')) {
      relevantSources = ['mem_1', 'mem_7'];
      respThinking = `Matched Cursor Postgres pooling guidelines (mem_1) and AWS Aurora failover SOP (mem_7).`;
      respContent = `Per our database guidelines for serverless lambdas:

- **PgBouncer:** Always set \`prepare: false\` and \`max: 1\` in your Drizzle or Prisma client configuration to avoid statement collisions.
- **Aurora Failover:** Always confirm replication lag is \`< 5ms\` before executing \`aws rds failover-db-cluster\`.`;
    }

    currentConversation.value.messages.push({
      id: `ast_${Date.now()}`,
      role: 'assistant',
      thinking: respThinking,
      content: respContent,
      sources: relevantSources,
      time: 'Just now'
    });
    
    isThinking.value = false;
    currentStepIndex.value = 0;
  }, 1500);
};
</script>

<style scoped>
.dashboard-memory-content :deep(.mw-markdown) {
  font-size: 0.8125rem !important; /* 13px */
  line-height: 1.6 !important;
  color: #374151 !important;
}

.dashboard-memory-content :deep(.mw-markdown h1) {
  font-size: 1.05rem !important; /* ~16.8px */
  font-weight: 700 !important;
  color: #111827 !important;
  margin-top: 0.75rem !important;
  margin-bottom: 0.4rem !important;
  line-height: 1.35 !important;
}

.dashboard-memory-content :deep(.mw-markdown h2) {
  font-size: 0.95rem !important; /* ~15.2px */
  font-weight: 700 !important;
  color: #111827 !important;
  margin-top: 0.65rem !important;
  margin-bottom: 0.35rem !important;
  line-height: 1.35 !important;
}

.dashboard-memory-content :deep(.mw-markdown h3) {
  font-size: 0.875rem !important; /* 14px */
  font-weight: 600 !important;
  color: #1f2937 !important;
  margin-top: 0.55rem !important;
  margin-bottom: 0.25rem !important;
  line-height: 1.35 !important;
}

.dashboard-memory-content :deep(.mw-markdown h4) {
  font-size: 0.8125rem !important; /* 13px */
  font-weight: 600 !important;
  color: #1f2937 !important;
}

.dashboard-memory-content :deep(.mw-markdown p) {
  font-size: 0.8125rem !important; /* 13px */
  margin-top: 0.35rem !important;
  margin-bottom: 0.35rem !important;
  line-height: 1.58 !important;
  color: #4b5563 !important;
}

.dashboard-memory-content :deep(.mw-markdown pre) {
  font-size: 0.75rem !important; /* 12px */
  padding: 0.65rem 0.85rem !important;
  margin: 0.5rem 0 !important;
  border-radius: 0.65rem !important;
  line-height: 1.5 !important;
  background-color: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  color: #334155 !important;
}

.dashboard-memory-content :deep(.mw-markdown code) {
  font-size: 0.75rem !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  color: #334155 !important;
}

.dashboard-memory-content :deep(.mw-markdown :not(pre) > code) {
  background-color: #f1f5f9 !important;
  border: 1px solid #e2e8f0 !important;
  color: #334155 !important;
  padding: 0.1rem 0.3rem !important;
  border-radius: 0.25rem !important;
}

.dashboard-memory-content :deep(.mw-markdown ul),
.dashboard-memory-content :deep(.mw-markdown ol) {
  font-size: 0.8125rem !important;
  margin-top: 0.3rem !important;
  margin-bottom: 0.45rem !important;
  padding-left: 1.15rem !important;
  color: #4b5563 !important;
}

.dashboard-memory-content :deep(.mw-markdown li) {
  margin-top: 0.12rem !important;
  margin-bottom: 0.12rem !important;
}

.dashboard-memory-content :deep(.mw-markdown table) {
  font-size: 0.75rem !important;
  margin: 0.5rem 0 !important;
}

.dashboard-memory-content :deep(.mw-markdown th),
.dashboard-memory-content :deep(.mw-markdown td) {
  padding: 0.3rem 0.5rem !important;
}

/* Chat Assistant Markdown Typography - scaled down to match compact view mode */
.dashboard-chat-content :deep(.mw-markdown) {
  font-size: 0.8125rem !important; /* 13px */
  line-height: 1.58 !important;
  color: #374151 !important;
}

.dashboard-chat-content :deep(.mw-markdown h1),
.dashboard-chat-content :deep(.mw-markdown h2),
.dashboard-chat-content :deep(.mw-markdown h3),
.dashboard-chat-content :deep(.mw-markdown h4) {
  font-weight: 600 !important;
  color: #111827 !important;
  margin-top: 0.55rem !important;
  margin-bottom: 0.25rem !important;
  line-height: 1.35 !important;
}

.dashboard-chat-content :deep(.mw-markdown h1) { font-size: 0.95rem !important; }
.dashboard-chat-content :deep(.mw-markdown h2) { font-size: 0.9rem !important; }
.dashboard-chat-content :deep(.mw-markdown h3) { font-size: 0.84rem !important; }
.dashboard-chat-content :deep(.mw-markdown h4) { font-size: 0.8125rem !important; }

.dashboard-chat-content :deep(.mw-markdown p) {
  font-size: 0.8125rem !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.3rem !important;
  line-height: 1.58 !important;
  color: #374151 !important;
}

.dashboard-chat-content :deep(.mw-markdown pre) {
  font-size: 0.72rem !important;
  padding: 0.55rem 0.75rem !important;
  margin: 0.45rem 0 !important;
  border-radius: 0.5rem !important;
  line-height: 1.5 !important;
  background-color: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  color: #334155 !important;
  overflow-x: auto;
}

.dashboard-chat-content :deep(.mw-markdown code) {
  font-size: 0.72rem !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  color: #334155 !important;
}

.dashboard-chat-content :deep(.mw-markdown :not(pre) > code) {
  background-color: #f1f5f9 !important;
  border: 1px solid #e2e8f0 !important;
  color: #334155 !important;
  padding: 0.1rem 0.3rem !important;
  border-radius: 0.25rem !important;
  font-size: 0.75rem !important;
}

.dashboard-chat-content :deep(.mw-markdown ul),
.dashboard-chat-content :deep(.mw-markdown ol) {
  font-size: 0.8125rem !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.35rem !important;
  padding-left: 1.15rem !important;
  color: #374151 !important;
}

.dashboard-chat-content :deep(.mw-markdown li) {
  margin-top: 0.1rem !important;
  margin-bottom: 0.1rem !important;
}

.dashboard-chat-content :deep(.mw-markdown blockquote) {
  border-left: 2px solid #D97757 !important;
  padding-left: 0.65rem !important;
  margin: 0.4rem 0 !important;
  color: #6b7280 !important;
  font-style: italic !important;
  font-size: 0.78rem !important;
}
</style>

