<template>
  <div class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-5 lg:px-6 py-6 no-scrollbar flex flex-col min-h-0 overflow-y-auto select-none">
    
    <!-- Top Header: Title, Count Badge, Search Pill, and New Workspace Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shrink-0">
      <div>
        <div class="flex items-center gap-2.5">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Spaces</h2>
          <span v-if="displayWorkspaces.length > 0" class="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
            {{ displayWorkspaces.length }}
          </span>
        </div>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Organize, isolate, and manage your AI memory spaces.
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Search Input Pill (Matching Memories & Inbox) -->
        <div class="relative flex-1 sm:w-64">
          <svg class="w-4 h-4 text-gray-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search spaces..." 
            class="w-full bg-gray-100/80 dark:bg-[#18181b] border border-gray-200/80 dark:border-zinc-800 rounded-full pl-9 pr-8 py-1.5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-all"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''" 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 cursor-pointer"
            title="Clear search"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- New Space Button (Pill style matching Memories & Inbox) -->
        <button 
          @click="openCreateModal"
          class="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold px-4 py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Space</span>
        </button>
      </div>
    </div>


    <!-- Filter Category Pills & View Controls Row (Matching Memories) -->
    <div class="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-zinc-800/60 shrink-0 mb-4">
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          @click="activeTab = 'active'"
          :class="[
            activeTab === 'active'
              ? 'bg-gray-900 text-white dark:bg-zinc-800 dark:text-white font-medium shadow-2xs'
              : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900/60',
            'px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap'
          ]"
        >
          Active ({{ projectStore.projects.length }})
        </button>
        <button
          @click="activeTab = 'archived'"
          :class="[
            activeTab === 'archived'
              ? 'bg-gray-900 text-white dark:bg-zinc-800 dark:text-white font-medium shadow-2xs'
              : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900/60',
            'px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap'
          ]"
        >
          Archived ({{ projectStore.archivedProjects.length }})
        </button>
      </div>

      <!-- Right Controls: Count + Grid / List Toggle -->
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-xs text-gray-400 dark:text-zinc-500 font-medium hidden sm:inline">
          {{ displayWorkspaces.length }} {{ displayWorkspaces.length === 1 ? 'space' : 'spaces' }}
        </span>

        <div class="flex items-center gap-1 border-l border-gray-200/60 dark:border-zinc-800/80 pl-2">
          <!-- Grid View Button -->
          <button
            @click="viewMode = 'grid'"
            :class="[
              viewMode === 'grid'
                ? 'bg-gray-200 text-gray-900 dark:bg-zinc-800 dark:text-white'
                : 'text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-200',
              'p-1.5 rounded-lg transition-colors cursor-pointer'
            ]"
            title="Grid view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          <!-- List View Button -->
          <button
            @click="viewMode = 'list'"
            :class="[
              viewMode === 'list'
                ? 'bg-gray-200 text-gray-900 dark:bg-zinc-800 dark:text-white'
                : 'text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-200',
              'p-1.5 rounded-lg transition-colors cursor-pointer'
            ]"
            title="List view"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="projectStore.loading && displayWorkspaces.length === 0" class="flex-1 flex items-center justify-center min-h-[300px]">
      <div class="flex flex-col items-center gap-2 text-sm text-gray-400 dark:text-zinc-500">
        <svg class="w-6 h-6 animate-spin text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.97 7.97 0 0112 4a8 8 0 017.446 5.032M18.418 15A7.97 7.97 0 0112 20a8 8 0 01-7.446-5.032" />
        </svg>
        <span>Loading spaces...</span>
      </div>
    </div>

    <!-- Empty State (Matching Memories & Inbox) -->
    <div v-else-if="displayWorkspaces.length === 0" class="h-64 flex flex-col items-center justify-center text-center p-8">
      <div class="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-800/80 flex items-center justify-center text-gray-400 dark:text-zinc-500 mb-3 shadow-2xs">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-gray-900 dark:text-zinc-100">
        {{ searchQuery ? 'No spaces found' : (activeTab === 'archived' ? 'No archived spaces' : 'No spaces yet') }}
      </h3>
      <p class="text-xs text-gray-400 dark:text-zinc-500 mt-1 max-w-sm">
        {{ searchQuery ? `No spaces match "${searchQuery}".` : (activeTab === 'archived' ? 'Archived spaces will be listed here.' : 'Create a space to isolate and organize memory across different projects and AI agents.') }}
      </p>
      <button 
        v-if="activeTab === 'active' && !searchQuery" 
        @click="openCreateModal" 
        class="mt-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold px-4 py-1.5 rounded-full text-xs transition-all shadow-xs cursor-pointer active:scale-95"
      >
        Create Space
      </button>
      <button 
        v-if="searchQuery" 
        @click="searchQuery = ''" 
        class="mt-4 text-xs font-semibold text-[#1D9BF0] hover:underline cursor-pointer"
      >
        Clear search
      </button>
    </div>
    
    <!-- GRID VIEW (Bento Cards matching Memories) -->
    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pb-12">
      <div 
        v-for="proj in displayWorkspaces" 
        :key="proj.id"
        class="group bg-white dark:bg-[#18181b] border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between relative overflow-hidden"
        :class="[
          proj.id === projectStore.currentProjectId 
            ? 'border-gray-300 dark:border-zinc-700 ring-1 ring-gray-900/5 dark:ring-white/5' 
            : 'border-gray-200/80 dark:border-zinc-800/80 hover:border-gray-300 dark:hover:border-zinc-700'
        ]"
      >
        <!-- Top Bar: Icon and Status Badges -->
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <!-- Icon Container (Clean neutral monochrome) -->
            <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800/80 flex items-center justify-center text-gray-700 dark:text-zinc-300 shrink-0">
              <span v-if="isEmoji(proj.icon)" class="text-sm leading-none select-none">{{ proj.icon }}</span>
              <svg v-else class="w-4 h-4 text-gray-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            
            <!-- Badges (Neutral minimalist pills) -->
            <div class="flex items-center gap-1.5 flex-wrap justify-end">
              <span 
                v-if="proj.id === projectStore.currentProjectId" 
                class="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100"
              >
                Active
              </span>
              <span 
                v-if="proj.name.toLowerCase() === 'default'" 
                class="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400"
              >
                Default
              </span>
              <span 
                v-if="proj.archived_at" 
                class="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500"
              >
                Archived
              </span>
            </div>
          </div>
          
          <!-- Title and Description -->
          <div class="mb-3">
            <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate group-hover:text-black dark:group-hover:text-white transition-colors" :title="proj.name">
              {{ proj.name }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 mt-1 min-h-[34px] leading-relaxed">
              {{ proj.description || 'No description provided.' }}
            </p>
          </div>

          <!-- Stats Row (Clean minimalist typography) -->
          <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-500 mb-4">
            <span>{{ proj.stats?.memories_count || 0 }} memories</span>
            <span>·</span>
            <span>{{ proj.stats?.documents_count || 0 }} docs</span>
          </div>
        </div>

        <!-- Action Buttons Bar -->
        <div class="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800/80 mt-auto">
          <!-- Active Current Indicator -->
          <div 
            v-if="proj.id === projectStore.currentProjectId" 
            class="flex-1 text-center py-1.5 px-3 text-xs font-medium text-gray-400 dark:text-zinc-500 select-none"
          >
            Current space
          </div>

          <!-- Switch to Button -->
          <button 
            v-else-if="!proj.archived_at" 
            @click="projectStore.selectProject(proj.id)"
            class="flex-1 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold py-1.5 px-3 rounded-full transition-all shadow-2xs active:scale-95 cursor-pointer text-center"
          >
            Switch to
          </button>

          <!-- Restore Button -->
          <button 
            v-else 
            @click="handleRestore(proj.id)"
            class="flex-1 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold py-1.5 px-3 rounded-full transition-all shadow-2xs active:scale-95 cursor-pointer text-center"
          >
            Restore
          </button>
          
          <!-- Edit Button -->
          <button 
            @click="openEditModal(proj)"
            class="px-3 py-1.5 border border-gray-200 dark:border-zinc-700/80 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-xs font-medium rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1 shrink-0"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>

          <!-- More Actions Dropdown -->
          <details class="relative">
            <summary 
              class="list-none cursor-pointer p-1.5 border border-gray-200 dark:border-zinc-700/80 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-full transition-colors flex items-center justify-center"
              title="More actions"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </summary>
            
            <div class="absolute right-0 bottom-full mb-1.5 w-44 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#18181b] shadow-xl z-30 p-1">
              <template v-if="!proj.archived_at">
                <button 
                  v-if="proj.name.toLowerCase() !== 'default'"
                  @click="(e) => { e.currentTarget.closest('details')?.removeAttribute('open'); confirmArchive(proj); }" 
                  class="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <svg class="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span>Archive Space</span>
                </button>
              </template>
              
              <template v-else>
                <button 
                  @click="(e) => { e.currentTarget.closest('details')?.removeAttribute('open'); handleRestore(proj.id); }" 
                  class="w-full text-left px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.97 7.97 0 0112 4a8 8 0 017.446 5.032M18.418 15A7.97 7.97 0 0112 20a8 8 0 01-7.446-5.032" />
                  </svg>
                  <span>Restore Space</span>
                </button>
              </template>

              <button 
                v-if="proj.name.toLowerCase() !== 'default'"
                @click="(e) => { e.currentTarget.closest('details')?.removeAttribute('open'); confirmDelete(proj); }" 
                class="w-full text-left px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete Permanently</span>
              </button>
            </div>
          </details>
        </div>
      </div>
    </div>

    <!-- LIST VIEW (Table style matching Memories) -->
    <div v-else class="flex-1 overflow-y-auto no-scrollbar min-h-0 pb-12">
      <!-- Table Header -->
      <div class="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-medium text-gray-400 dark:text-zinc-500 border-b border-gray-100 dark:border-zinc-800/40 sticky top-0 bg-white dark:bg-[#0B0B0C] z-10">
        <div class="col-span-6 sm:col-span-5">Space</div>
        <div class="col-span-3 sm:col-span-3">Status</div>
        <div class="col-span-3 sm:col-span-4 text-right">Actions</div>
      </div>

      <!-- Rows -->
      <div class="divide-y divide-gray-100/70 dark:divide-zinc-800/40">
        <div 
          v-for="proj in displayWorkspaces" 
          :key="proj.id"
          class="grid grid-cols-12 gap-3 px-3 py-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-zinc-900/60 transition-colors group items-center"
        >
          <!-- Space Info & Icon -->
          <div class="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0 pr-2">
            <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800/80 flex items-center justify-center text-gray-700 dark:text-zinc-300 shrink-0">
              <span v-if="isEmoji(proj.icon)" class="text-sm leading-none select-none">{{ proj.icon }}</span>
              <svg v-else class="w-4 h-4 text-gray-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white truncate transition-colors">
                  {{ proj.name }}
                </p>
                <span v-if="proj.name.toLowerCase() === 'default'" class="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400">
                  Default
                </span>
              </div>
              <p class="text-[11px] text-gray-400 dark:text-zinc-500 truncate mt-0.5">
                {{ proj.description || `${proj.stats?.memories_count || 0} memories · ${proj.stats?.documents_count || 0} docs` }}
              </p>
            </div>
          </div>

          <!-- Status Column -->
          <div class="col-span-3 sm:col-span-3 flex items-center gap-2">
            <span 
              v-if="proj.id === projectStore.currentProjectId" 
              class="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100"
            >
              Active
            </span>
            <span 
              v-else-if="proj.archived_at" 
              class="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500"
            >
              Archived
            </span>
            <span 
              v-else 
              class="text-xs text-gray-400 dark:text-zinc-500"
            >
              Inactive
            </span>
          </div>

          <!-- Action Buttons Column -->
          <div class="col-span-3 sm:col-span-4 flex items-center justify-end gap-1.5">
            <button 
              v-if="proj.id !== projectStore.currentProjectId && !proj.archived_at" 
              @click="projectStore.selectProject(proj.id)"
              class="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold py-1 px-3 rounded-full transition-all shadow-2xs active:scale-95 cursor-pointer hidden sm:inline-block"
            >
              Switch to
            </button>

            <button 
              @click="openEditModal(proj)"
              class="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Edit space"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <details class="relative">
              <summary 
                class="list-none cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center"
                title="More actions"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </summary>

              <div class="absolute right-0 top-full mt-1 w-44 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#18181b] shadow-xl z-30 p-1">
                <template v-if="!proj.archived_at">
                  <button 
                    v-if="proj.id !== projectStore.currentProjectId"
                    @click="(e) => { e.currentTarget.closest('details')?.removeAttribute('open'); projectStore.selectProject(proj.id); }" 
                    class="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer sm:hidden flex items-center gap-2"
                  >
                    <svg class="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Switch to</span>
                  </button>
                  <button 
                    v-if="proj.name.toLowerCase() !== 'default'"
                    @click="(e) => { e.currentTarget.closest('details')?.removeAttribute('open'); confirmArchive(proj); }" 
                    class="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <svg class="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>Archive</span>
                  </button>
                </template>
                <template v-else>
                  <button 
                    @click="(e) => { e.currentTarget.closest('details')?.removeAttribute('open'); handleRestore(proj.id); }" 
                    class="w-full text-left px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.97 7.97 0 0112 4a8 8 0 017.446 5.032M18.418 15A7.97 7.97 0 0112 20a8 8 0 01-7.446-5.032" />
                    </svg>
                    <span>Restore</span>
                  </button>
                </template>

                <button 
                  v-if="proj.name.toLowerCase() !== 'default'"
                  @click="(e) => { e.currentTarget.closest('details')?.removeAttribute('open'); confirmDelete(proj); }" 
                  class="w-full text-left px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <WorkspaceModal 
      :is-open="isWorkspaceModalOpen"
      :project="editingProject"
      :loading="isSavingWorkspace"
      @save="handleSaveWorkspace"
      @cancel="isWorkspaceModalOpen = false"
    />

    <ConfirmationModal
      :is-open="showConfirmModal"
      :title="confirmTitle"
      :message="confirmMessage"
      :confirm-text="confirmActionText"
      :loading="isConfirming"
      @confirm="executeConfirmAction"
      @cancel="showConfirmModal = false"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useProjectStore } from '../stores/project';
import WorkspaceModal from '../components/WorkspaceModal.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';

const projectStore = useProjectStore();
const toast = useToast();

const activeTab = ref('active');
const searchQuery = ref('');
const viewMode = ref('grid');

const isWorkspaceModalOpen = ref(false);
const editingProject = ref(null);
const isSavingWorkspace = ref(false);

const showConfirmModal = ref(false);
const confirmTitle = ref('');
const confirmMessage = ref('');
const confirmActionText = ref('');
const isConfirming = ref(false);
let pendingAction = null;

const isEmoji = (str) => {
  if (!str) return false;
  return /\p{Extended_Pictographic}/u.test(str);
};

const displayWorkspaces = computed(() => {
  let list = activeTab.value === 'active' ? projectStore.projects : projectStore.archivedProjects;
  if (searchQuery.value && searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    list = list.filter(p => 
      (p.name && p.name.toLowerCase().includes(query)) || 
      (p.description && p.description.toLowerCase().includes(query))
    );
  }
  return list;
});

onMounted(() => {
  projectStore.fetchProjects(true);
});

const openCreateModal = () => {
  editingProject.value = null;
  isWorkspaceModalOpen.value = true;
};

const openEditModal = (project) => {
  editingProject.value = project;
  isWorkspaceModalOpen.value = true;
};

const handleSaveWorkspace = async (formData) => {
  isSavingWorkspace.value = true;
  try {
    if (editingProject.value) {
      await projectStore.updateExistingProject(editingProject.value.id, formData);
      toast.success('Space updated successfully.');
    } else {
      await projectStore.createNewProject(formData);
      toast.success('Space created successfully.');
    }
    isWorkspaceModalOpen.value = false;
    await projectStore.fetchProjects(true);
  } catch (error) {
    const msg = error.response?.data?.detail || 'Failed to save space';
    toast.error(msg);
  } finally {
    isSavingWorkspace.value = false;
  }
};

const handleRestore = async (id) => {
  try {
    await projectStore.restoreExistingProject(id);
    toast.success('Space restored.');
    await projectStore.fetchProjects(true);
  } catch (err) {
    toast.error('Failed to restore space.');
  }
};

const confirmArchive = (project) => {
  confirmTitle.value = 'Archive Space';
  confirmMessage.value = `Are you sure you want to archive '${project.name}'? It will be hidden from the active space switcher.`;
  confirmActionText.value = 'Archive';
  pendingAction = async () => {
    await projectStore.archiveExistingProject(project.id);
    toast.success('Space archived.');
    await projectStore.fetchProjects(true);
  };
  showConfirmModal.value = true;
};

const confirmDelete = (project) => {
  confirmTitle.value = 'Permanently Delete Space';
  confirmMessage.value = `Permanently delete space '${project.name}'? All memories, documents, and chats will be safely reassigned to your 'default' space. This action cannot be undone.`;
  confirmActionText.value = 'Delete Permanently';
  pendingAction = async () => {
    await projectStore.deleteProjectPermanently(project.id);
    toast.success('Space permanently deleted.');
    await projectStore.fetchProjects(true);
  };
  showConfirmModal.value = true;
};

const executeConfirmAction = async () => {
  if (!pendingAction) return;
  isConfirming.value = true;
  try {
    await pendingAction();
  } catch (error) {
    toast.error(error.response?.data?.detail || 'An error occurred.');
  } finally {
    isConfirming.value = false;
    showConfirmModal.value = false;
    pendingAction = null;
  }
};
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
