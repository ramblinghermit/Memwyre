<template>
  <div>
    <!-- Mobile Backdrop -->
    <transition
      enter-active-class="transition-opacity ease-linear duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMobileOpen" 
        @click="$emit('close-mobile')" 
        class="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-xs z-40 lg:hidden"
      ></div>
    </transition>

    <!-- Sidebar Container (Light & Dark Theme Responsive) -->
    <aside
      class="fixed lg:static top-0 bottom-0 left-0 z-50 flex flex-col bg-gray-50 dark:bg-[#09090b] text-gray-700 dark:text-zinc-200 border-r border-gray-200 dark:border-zinc-800/80 transition-all duration-300 select-none shadow-2xl lg:shadow-none h-screen shrink-0"
      :class="[
        isCollapsed ? 'w-[68px]' : 'w-[260px] sm:w-[280px]',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Top Header -->
      <div 
        class="h-14 border-b border-gray-200/80 dark:border-zinc-800/50 shrink-0 flex items-center px-3"
        :class="isCollapsed ? 'justify-center' : 'justify-between'"
      >
        <!-- Expanded: Logo + action buttons -->
        <template v-if="!isCollapsed">
          <router-link 
            to="/dashboard" 
            class="flex items-center gap-2 overflow-hidden transition-opacity hover:opacity-90 px-1 py-1 rounded-md group"
            title="Memwyre Dashboard"
          >
            <img 
              src="/logo.png" 
              alt="Memwyre" 
              class="h-7 w-auto dark:invert transition-transform duration-200 group-hover:scale-[1.02] object-contain select-none" 
            />
          </router-link>

          <div class="flex items-center gap-1">
            <!-- Toggle Sidebar Collapse (Desktop) -->
            <button
              @click="toggleCollapse"
              title="Collapse Sidebar"
              class="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer hidden lg:flex items-center justify-center"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18" />
              </svg>
            </button>

            <!-- Close Mobile Drawer -->
            <button
              @click="$emit('close-mobile')"
              class="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer lg:hidden"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </template>

        <!-- Collapsed: Just the expand toggle button -->
        <template v-else>
          <button
            @click="toggleCollapse"
            title="Expand Sidebar"
            class="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18" />
            </svg>
          </button>
        </template>
      </div>


      <!-- Scrollable Navigation & Item Lists -->
      <div 
        class="flex-1 overflow-y-auto no-scrollbar pt-2 flex flex-col justify-between"
        :class="isCollapsed ? 'px-1.5' : 'px-2'"
      >
        <!-- Top Nav & Pinned Group -->
        <div class="space-y-3">
          <!-- Main Navigation Links -->
          <nav class="space-y-0.5">
            <!-- 1. Dashboard -->
            <router-link
              to="/dashboard"
              class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70 transition-colors group relative"
              :class="{ 
                'justify-center px-0': isCollapsed, 
                'bg-gray-200/80 text-gray-900 font-semibold dark:bg-zinc-800 dark:text-white': $route.path === '/dashboard' 
              }"
              title="Dashboard"
            >
            <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span v-if="!isCollapsed" class="truncate flex-1">Dashboard</span>
          </router-link>

          <!-- 2. Inbox (with live count badge) -->
          <router-link
            to="/inbox"
            class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70 transition-colors group relative"
            :class="{ 
              'justify-center px-0': isCollapsed, 
              'bg-gray-200/80 text-gray-900 font-semibold dark:bg-zinc-800 dark:text-white': $route.path === '/inbox' 
            }"
            title="Inbox Approvals"
          >
            <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <span v-if="!isCollapsed" class="truncate flex-1">Inbox</span>
            <span 
              v-if="!isCollapsed && inboxCount > 0" 
              class="text-[11px] font-bold bg-[#D97757] text-white px-1.5 py-0.2 rounded-full"
            >
              {{ inboxCount }}
            </span>
          </router-link>

          <!-- 3. Ask AI / Chat -->
          <router-link
            to="/chat"
            class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70 transition-colors group"
            :class="{ 
              'justify-center px-0': isCollapsed, 
              'bg-gray-200/80 text-gray-900 font-semibold dark:bg-zinc-800 dark:text-white': $route.path.startsWith('/chat') 
            }"
            title="Ask AI & Chat"
          >
            <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span v-if="!isCollapsed" class="truncate">Ask AI</span>
          </router-link>



          <!-- 5. Integrations & MCP -->
          <router-link
            to="/integrations"
            class="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70 transition-colors group"
            :class="{ 
              'justify-center px-0': isCollapsed, 
              'bg-gray-200/80 text-gray-900 font-semibold dark:bg-zinc-800 dark:text-white': $route.path === '/integrations' 
            }"
            title="Integrations & MCP"
          >
            <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <span v-if="!isCollapsed" class="truncate">Integrations</span>
          </router-link>
        </nav>

        <!-- Pinned Section (Interactive Pinned Memories/Chats) -->
        <div v-if="!isCollapsed && pinnedItems.length > 0" class="pt-2">
          <div class="px-2.5 pb-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center justify-between">
            <span>Pinned</span>
            <span class="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">{{ pinnedItems.length }}</span>
          </div>
          <div class="space-y-0.5">
            <div
              v-for="item in pinnedItems"
              :key="item.id"
              class="group relative flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
              @click="handleSelectPinned(item)"
            >
              <div class="flex items-center gap-2 min-w-0 pr-2">
                <svg class="w-3.5 h-3.5 text-[#D97757] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                </svg>
                <span class="truncate text-xs font-medium">{{ item.title }}</span>
              </div>
              <button 
                @click.stop="unpinItem(item.id)" 
                title="Unpin"
                class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-0.5 rounded transition-opacity"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>
          <!-- Real Conversations in Chat Mode (Flows naturally from the top under nav) -->
          <div v-if="!isCollapsed && isChatMode" class="pt-2 space-y-1">
            <div class="px-2.5 pb-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center justify-between">
              <span>Conversations</span>
              <button 
                @click="startNewChat" 
                class="text-[10px] text-[#D97757] hover:underline font-semibold cursor-pointer"
                title="Start New Chat"
              >
                + New Chat
              </button>
            </div>
            <div v-if="displayRecents.length > 0" class="space-y-0.5">
              <div
                v-for="recent in displayRecents"
                :key="recent.id"
                @click="handleSelectRecent(recent)"
                class="group relative flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer font-normal"
                :class="[
                  isSessionActive(recent.id)
                    ? 'bg-gray-200/90 dark:bg-zinc-800 text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/70'
                ]"
              >
                <span class="truncate pr-2">{{ recent.title }}</span>
                <div class="flex items-center gap-0.5 shrink-0">
                  <button
                    @click.stop="openDeleteChatModal(recent)"
                    title="Delete chat"
                    class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-0.5 rounded transition-opacity cursor-pointer"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <button
                    @click.stop="pinItem(recent)"
                    title="Pin this item"
                    class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#D97757] p-0.5 rounded transition-opacity cursor-pointer"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="px-2.5 py-2">
              <p class="text-[11px] text-gray-400 dark:text-zinc-500 italic">No conversations yet</p>
            </div>
          </div>
        </div>

        <!-- Bottom Section: Integration Spotlight in Non-Chat Modes -->
        <div 
          v-if="!isCollapsed && !isChatMode" 
          class="mt-auto pt-3 pb-1 px-1 space-y-2"
          @mouseenter="stopSlideTimer"
          @mouseleave="startSlideTimer"
        >
          <!-- Section Header & Carousel Controls -->
          <div class="px-2.5 flex items-center justify-between">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Integrations</span>
            <div class="flex items-center gap-0.5">
              <button 
                @click.stop="prevSlide" 
                class="p-1 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                title="Previous"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                @click.stop="nextSlide" 
                class="p-1 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                title="Next"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <!-- Slide Category Title & Indicator Dots -->
          <div class="px-2.5 flex items-center justify-between">
            <span class="text-[11px] font-medium text-gray-600 dark:text-zinc-300">{{ integrationSlides[currentSlide].category }}</span>
            <div class="flex items-center gap-1 select-none">
              <span 
                v-for="(_, dotIdx) in integrationSlides" 
                :key="dotIdx" 
                @click="setSlide(dotIdx)" 
                class="h-1 rounded-full cursor-pointer transition-all duration-300"
                :class="currentSlide === dotIdx ? 'bg-gray-800 dark:bg-zinc-200 w-3' : 'bg-gray-300 dark:bg-zinc-700 w-1.5 hover:bg-gray-400'"
              ></span>
            </div>
          </div>

          <!-- Slide Items List -->
          <div class="space-y-0.5">
            <router-link
              v-for="item in integrationSlides[currentSlide].items"
              :key="item.id"
              :to="item.to"
              class="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-zinc-800/70 text-gray-700 dark:text-zinc-300 transition-colors group cursor-pointer"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200/80 dark:border-zinc-700/60 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden p-1">
                  <img :src="item.icon" class="w-full h-full object-contain" :class="{'dark:invert': item.darkInvert}" :alt="item.name" />
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs font-semibold text-gray-900 dark:text-zinc-100 group-hover:text-[#D97757] dark:group-hover:text-[#D97757] transition-colors truncate leading-tight">{{ item.name }}</span>
                  <span class="text-[11px] text-gray-500 dark:text-zinc-400 truncate leading-tight mt-0.5">{{ item.desc }}</span>
                </div>
              </div>
              <svg class="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 dark:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </router-link>
          </div>

          <!-- All Integrations Footer Link -->
          <div class="px-2.5 pt-0.5 text-right">
            <router-link to="/integrations" class="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              <span>All integrations</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bottom Footer: Real User Profile Tile & Account Menu -->
      <div 
        ref="userMenuRef"
        class="border-t border-gray-200/80 dark:border-zinc-800/80 shrink-0 bg-gray-50/80 dark:bg-[#09090b] relative"
        :class="isCollapsed ? 'p-2' : 'p-3'"
      >
        <div 
          @click.stop="toggleUserMenu"
          class="flex items-center rounded-xl hover:bg-gray-200/60 dark:hover:bg-zinc-800/70 cursor-pointer transition-colors"
          :class="isCollapsed ? 'justify-center p-1.5' : 'justify-between p-1.5'"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <!-- Orange Initials Avatar -->
            <div class="w-8 h-8 rounded-full bg-[#D97757] flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-xs ring-1 ring-black/5 dark:ring-white/10">
              {{ userInitials }}
            </div>
            
            <div v-if="!isCollapsed" class="flex flex-col min-w-0">
              <span class="text-xs font-semibold text-gray-900 dark:text-white truncate leading-tight">{{ userName }}</span>
              <span class="text-[11px] text-gray-500 dark:text-zinc-400 leading-tight">{{ userTier }}</span>
            </div>
          </div>

          <div v-if="!isCollapsed" class="text-gray-400 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white p-1 transition-colors">
            <!-- Settings / Account trigger icon -->
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
        </div>

        <!-- User Account Popup Menu -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div 
            v-if="isUserMenuOpen" 
            @click.stop
            class="absolute bottom-full left-0 mb-2 w-60 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-zinc-700/80 rounded-2xl shadow-2xl py-1.5 z-[100] text-sm text-gray-700 dark:text-zinc-200"
          >
            <div class="px-3.5 py-2.5 border-b border-gray-100 dark:border-zinc-800">
              <p class="text-[11px] font-medium text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Signed in as</p>
              <p class="text-xs font-semibold text-gray-900 dark:text-white truncate mt-0.5">{{ authStore.user?.email || 'user@memwyre.tech' }}</p>
            </div>

            <div class="p-1 space-y-0.5">
              <router-link to="/settings" @click="isUserMenuOpen = false" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/80 hover:text-gray-900 dark:hover:text-white transition-colors">
                <svg class="w-4 h-4 text-gray-400 dark:text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
                <span class="text-xs font-medium truncate">Account & Settings</span>
              </router-link>
              <router-link to="/billing" @click="isUserMenuOpen = false" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/80 hover:text-gray-900 dark:hover:text-white transition-colors">
                <svg class="w-4 h-4 text-gray-400 dark:text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                <span class="text-xs font-medium truncate">Subscription & Usage</span>
              </router-link>
            </div>

            <div class="p-1 border-t border-gray-100 dark:border-zinc-800">
              <button @click="handleLogout" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-colors text-left cursor-pointer">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span class="text-xs font-medium">Log out</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </aside>

    <!-- Search Modal Trigger Overlay -->
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isSearchOpen" 
        class="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/50 dark:bg-black/70 backdrop-blur-xs"
        @click.self="isSearchOpen = false"
      >
        <div class="w-full max-w-lg bg-white dark:bg-[#18181b] border border-gray-200 dark:border-zinc-700/90 rounded-2xl shadow-2xl overflow-hidden">
          <div class="p-3 border-b border-gray-200 dark:border-zinc-700/80 flex items-center gap-3">
            <svg class="w-5 h-5 text-gray-400 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              v-model="searchQuery" 
              placeholder="Search memories, sessions, tools, and pages..." 
              class="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none"
              autofocus
              @keydown.esc="isSearchOpen = false"
            />
            <kbd class="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-gray-200 dark:border-zinc-700">ESC</kbd>
          </div>
          <div class="max-h-72 overflow-y-auto p-2 space-y-1">
            <div v-if="filteredSearchResults.length === 0" class="text-center py-6 text-xs text-gray-400 dark:text-zinc-500">
              No matching results found.
            </div>
            <button 
              v-for="res in filteredSearchResults" 
              :key="res.id"
              @click="selectSearchResult(res)"
              class="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800/80 text-left transition-colors cursor-pointer group"
            >
              <div class="flex items-center gap-2.5 truncate">
                <span class="text-gray-400 group-hover:text-primary dark:text-zinc-400">
                  {{ res.type === 'chat' ? '💬' : res.type === 'page' ? '🔗' : '📝' }}
                </span>
                <span class="text-xs font-medium text-gray-800 dark:text-zinc-200 group-hover:text-gray-900 dark:group-hover:text-white truncate">{{ res.title }}</span>
              </div>
              <span class="text-[10px] font-mono text-gray-400 dark:text-zinc-500 uppercase">{{ res.type }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Conversation Confirmation Modal -->
    <ConfirmationModal
      :is-open="showDeleteChatModal"
      title="Delete Conversation"
      :message="`Are you sure you want to delete '${chatToDelete?.title || 'this conversation'}'? This cannot be undone.`"
      confirm-text="Delete"
      :loading="isDeletingChat"
      @confirm="confirmDeleteChat"
      @cancel="showDeleteChatModal = false"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useChatStore } from '../stores/chat';
import { useInboxStore } from '../stores/inbox';
import { useBillingStore } from '../stores/billing';
import ConfirmationModal from './ConfirmationModal.vue';
import cursorLightIcon from '../assets/cursor_CUBE_2D_LIGHT.svg';
import vscodeIcon from '../assets/vscode.svg';
import claudeCodeIcon from '../assets/claudecode-color.svg';
import openclawIcon from '../assets/openclaw-color.svg';
import notionIcon from '../assets/notion-svgrepo-com.svg';
import gdriveIcon from '../assets/google-drive.svg';
import windsurfIcon from '../assets/windsurf-color.svg';
import antigravityIcon from '../assets/Google-Antigravity-Icon-Full-Color.png';
import chromeLogo from '../assets/chrome-logo-svgrepo-com.svg';

const props = defineProps({
  isMobileOpen: { type: Boolean, default: false }
});

const emit = defineEmits([
  'close-mobile', 
  'open-quick-add', 
  'open-review',
  'select-item'
]);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const chatStore = useChatStore();
const inboxStore = useInboxStore();
const billingStore = useBillingStore();

const isCollapsed = ref(false);
const isUserMenuOpen = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref('');
const showDeleteChatModal = ref(false);
const chatToDelete = ref(null);
const isDeletingChat = ref(false);

const userMenuRef = ref(null);

const isChatMode = computed(() => route.path.startsWith('/chat'));

// Integration Spotlight Slides (3 options per card)
const currentSlide = ref(0);
const integrationSlides = [
  {
    category: 'IDE & Editors',
    title: 'Codebase Memory',
    items: [
      { id: 'cursor', name: 'Cursor', desc: 'One-click MCP install', icon: cursorLightIcon, darkInvert: true, to: '/integrations/cursor' },
      { id: 'vscode', name: 'VS Code', desc: 'Native MCP extension', icon: vscodeIcon, to: '/integrations/vscode' },
      { id: 'windsurf', name: 'Windsurf', desc: 'Windsurf IDE connector', icon: windsurfIcon, darkInvert: true, to: '/integrations/windsurf' }
    ]
  },
  {
    category: 'CLI & Agents',
    title: 'Agent Backplane',
    items: [
      { id: 'claude-code', name: 'Claude Code', desc: 'Context retrieval for Claude', icon: claudeCodeIcon, to: '/integrations/claude-code' },
      { id: 'openclaw', name: 'OpenClaw', desc: 'Session memory backplane', icon: openclawIcon, to: '/integrations/openclaw' },
      { id: 'antigravity', name: 'Antigravity', desc: 'Deep context memory tool', icon: antigravityIcon, to: '/integrations/antigravity' }
    ]
  },
  {
    category: 'Knowledge & Web',
    title: 'Docs & Capture',
    items: [
      { id: 'notion', name: 'Notion', desc: 'Sync docs & databases', icon: notionIcon, darkInvert: true, to: '/integrations/notion' },
      { id: 'gdrive', name: 'Google Drive', desc: 'Index Docs, Sheets & Slides', icon: gdriveIcon, to: '/integrations/gdrive' },
      { id: 'chrome', name: 'Chrome Extension', desc: 'Instant web memory capture', icon: chromeLogo, to: '/integrations/chrome' }
    ]
  }
];

let slideInterval = null;

const startSlideTimer = () => {
  stopSlideTimer();
  slideInterval = setInterval(() => {
    nextSlide();
  }, 6000);
};

const stopSlideTimer = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % integrationSlides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + integrationSlides.length) % integrationSlides.length;
};

const setSlide = (idx) => {
  currentSlide.value = idx;
  startSlideTimer();
};

function handleDocumentClick(e) {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target)) {
    isUserMenuOpen.value = false;
  }
}

// Load sessions and collapse preference on mount
onMounted(async () => {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('memwyre_sidebar_collapsed');
    if (saved !== null) {
      isCollapsed.value = saved === 'true';
    }
    loadPinnedFromStorage();
  }

  // Fetch real chat sessions, inbox, and subscription status
  if (authStore.isAuthenticated) {
    try {
      await Promise.allSettled([
        chatStore.fetchSessions(),
        inboxStore.fetchInbox(),
        billingStore.fetchStatus()
      ]);
    } catch (e) {
      // Keep working
    }
  }

  startSlideTimer();

  // Global listeners
  window.addEventListener('keydown', handleGlobalKeydown);
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  stopSlideTimer();
  window.removeEventListener('keydown', handleGlobalKeydown);
  document.removeEventListener('click', handleDocumentClick);
});

function handleGlobalKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('memwyre_sidebar_collapsed', String(isCollapsed.value));
  }
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

function openSearch() {
  isSearchOpen.value = true;
  searchQuery.value = '';
}

function handleNewAction() {
  emit('open-quick-add');
}

function handleScheduledClick() {
  isMoreMenuOpen.value = false;
  emit('open-review');
}

async function startNewChat() {
  try {
    await chatStore.createSession();
    router.push('/chat');
  } catch (e) {
    router.push('/chat');
  }
}

function openDeleteChatModal(recent) {
  chatToDelete.value = recent;
  showDeleteChatModal.value = true;
}

async function confirmDeleteChat() {
  if (!chatToDelete.value) return;
  const sessionId = chatToDelete.value.id;
  const wasActive = chatStore.currentSession?.id === sessionId;
  isDeletingChat.value = true;
  try {
    const deleted = await chatStore.deleteSession(sessionId);
    if (deleted && wasActive) {
      router.push('/chat');
    }
  } finally {
    isDeletingChat.value = false;
    showDeleteChatModal.value = false;
    chatToDelete.value = null;
  }
}

function handleLogout() {
  isUserMenuOpen.value = false;
  authStore.logout();
  router.push('/login');
}

// Real User details
const userName = computed(() => {
  return authStore.user?.name || authStore.user?.email?.split('@')[0] || 'User';
});

const userInitials = computed(() => {
  const name = userName.value;
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
});

const userTier = computed(() => {
  if (billingStore.isDevMode) {
    return 'Dev Mode';
  }
  if (billingStore.isPro || billingStore.plan === 'pro') {
    return 'Pro Tier';
  }
  if (billingStore.plan === 'free') {
    return 'Free Tier';
  }
  if (authStore.user?.tier) {
    return authStore.user.tier;
  }
  return 'Free Tier';
});

const inboxCount = computed(() => {
  return inboxStore.count || inboxStore.items?.length || 0;
});

// Pinned Items state & storage
const defaultPinned = [];

const pinnedItems = ref([...defaultPinned]);

function loadPinnedFromStorage() {
  if (typeof localStorage === 'undefined') return;
  const stored = localStorage.getItem('memwyre_pinned_items');
  if (stored) {
    try {
      pinnedItems.value = JSON.parse(stored);
    } catch (e) {
      pinnedItems.value = [];
    }
  }
}

function savePinnedToStorage() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('memwyre_pinned_items', JSON.stringify(pinnedItems.value));
}

function pinItem(item) {
  if (!pinnedItems.value.some((p) => p.id === item.id)) {
    pinnedItems.value.push(item);
    savePinnedToStorage();
  }
}

function unpinItem(pinId) {
  pinnedItems.value = pinnedItems.value.filter((p) => p.id !== pinId);
  savePinnedToStorage();
}

// Recents Section Items (connected exclusively to real chatStore.sessions)
const displayRecents = computed(() => {
  if (chatStore.sessions && chatStore.sessions.length > 0) {
    return chatStore.sessions.map((s) => ({
      id: s.id,
      title: s.title || 'Untitled Session',
      type: 'chat'
    }));
  }
  return [];
});

function isSessionActive(sessionId) {
  if (route.path.startsWith('/chat') && chatStore.currentSession?.id === sessionId) {
    return true;
  }
  return false;
}

async function handleSelectPinned(item) {
  emit('select-item', item);
  if (item.sessionId) {
    await chatStore.selectSession(item.sessionId);
    router.push(`/chat/${item.sessionId}`);
  } else {
    router.push('/chat');
  }
}

async function handleSelectRecent(recent) {
  emit('select-item', recent);
  if (recent.id && !String(recent.id).startsWith('rec-')) {
    await chatStore.selectSession(recent.id);
    router.push(`/chat/${recent.id}`);
  } else {
    router.push('/chat');
  }
}

// Search Results Computation across pages and data
const appPages = [
  { id: 'page-dash', title: 'Dashboard & Timeline', type: 'page', path: '/dashboard' },
  { id: 'page-inbox', title: 'Inbox & Approvals', type: 'page', path: '/inbox' },
  { id: 'page-chat', title: 'Ask AI Chat Assistant', type: 'page', path: '/chat' },
  { id: 'page-proj', title: 'Projects & Workspaces', type: 'page', path: '/projects' },
  { id: 'page-integ', title: 'Integrations & MCP', type: 'page', path: '/integrations' },
  { id: 'page-prompts', title: 'Prompt Studio', type: 'page', path: '/prompts' },
  { id: 'page-map', title: 'Memory Map Graph', type: 'page', path: '/map' },
  { id: 'page-vis', title: 'Retrieval Visualizer', type: 'page', path: '/retrieval-visualizer' },
  { id: 'page-settings', title: 'Settings & API Keys', type: 'page', path: '/settings' },
  { id: 'page-billing', title: 'Billing & Plans', type: 'page', path: '/billing' }
];

const allSearchable = computed(() => {
  return [...appPages, ...pinnedItems.value, ...displayRecents.value];
});

const filteredSearchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return allSearchable.value;
  return allSearchable.value.filter((i) => i.title.toLowerCase().includes(q));
});

function selectSearchResult(res) {
  isSearchOpen.value = false;
  if (res.path) {
    router.push(res.path);
  } else if (res.type === 'chat') {
    handleSelectRecent(res);
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
