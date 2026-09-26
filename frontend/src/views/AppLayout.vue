<template>
  <div class="h-screen flex bg-gray-50 dark:bg-[#0B0B0C] text-gray-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">
    <!-- Sidebar -->
    <MemwyreSidebar 
      :is-mobile-open="isMobileSidebarOpen"
      @close-mobile="isMobileSidebarOpen = false"
      @open-quick-add="router.push('/add-context')"
      @open-review="showDailyReview = true"
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0B0C]">
      <!-- Minimal Top Bar (Hidden in Editor mode so Editor header takes over the top) -->
      <header v-if="!isEditorRoute" class="h-16 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 w-full">
        <div class="flex items-center gap-3">
          <!-- Mobile Hamburger -->
          <button 
            @click="isMobileSidebarOpen = true" 
            class="p-2 -ml-1 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 lg:hidden cursor-pointer"
            title="Open Menu"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Workspace Switcher -->
          <div class="relative" ref="workspaceDropdownRef">
            <button 
              @click="isWorkspaceMenuOpen = !isWorkspaceMenuOpen" 
              class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-all text-sm font-semibold text-gray-800 dark:text-zinc-200 cursor-pointer group border border-transparent hover:border-gray-200/60 dark:hover:border-zinc-700/50"
            >
              <svg class="w-4 h-4 text-gray-500 group-hover:text-gray-900 dark:text-zinc-400 dark:group-hover:text-white transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span class="max-w-[160px] truncate text-xs sm:text-sm font-medium">{{ currentProjectName }}</span>
              <svg 
                class="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-transform duration-200" 
                :class="{ 'rotate-180': isWorkspaceMenuOpen }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Workspace Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="isWorkspaceMenuOpen" 
                class="absolute left-0 mt-2 w-72 bg-white dark:bg-[#18181b] rounded-2xl shadow-2xl p-2 z-[70] border border-gray-200/90 dark:border-zinc-700/80 backdrop-blur-md"
              >
                <!-- Dropdown Header -->
                <div class="px-2.5 py-1.5 flex items-center justify-between">
                  <span class="text-[11px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Spaces</span>
                  <span class="text-[10px] font-medium bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 px-1.5 py-0.5 rounded-md">{{ projectStore.projects.length }}</span>
                </div>

                <!-- Projects List -->
                <div class="max-h-52 overflow-y-auto py-1 space-y-0.5 custom-scrollbar">
                  <button 
                    @click="selectWorkspace(null)"
                    class="flex w-full items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group"
                    :class="projectStore.currentProjectId === null ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 font-medium'"
                  >
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-6 h-6 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-gray-300 dark:group-hover:border-zinc-600 transition-colors">
                        <svg class="w-3.5 h-3.5" :class="projectStore.currentProjectId === null ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-zinc-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <span class="truncate">All Spaces</span>
                    </div>
                    <svg v-if="projectStore.currentProjectId === null" class="w-4 h-4 text-gray-900 dark:text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button 
                    v-for="proj in projectStore.projects" 
                    :key="proj.id"
                    @click="selectWorkspace(proj.id)"
                    class="flex w-full items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group"
                    :class="proj.id === projectStore.currentProjectId ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/60 font-medium'"
                  >
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-6 h-6 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-gray-300 dark:group-hover:border-zinc-600 transition-colors">
                        <svg class="w-3.5 h-3.5" :class="proj.id === projectStore.currentProjectId ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-zinc-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <span class="truncate">{{ proj.name }}</span>
                    </div>
                    <svg v-if="proj.id === projectStore.currentProjectId" class="w-4 h-4 text-gray-900 dark:text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>

                <!-- Create Space Input Bar -->
                <div class="mt-1 pt-2 border-t border-gray-100 dark:border-zinc-800 px-1 pb-0.5">
                  <div class="relative flex items-center">
                    <input 
                      v-model="newWorkspaceName" 
                      @keyup.enter="handleCreateWorkspace"
                      placeholder="Create space..."
                      class="w-full bg-gray-50 dark:bg-zinc-900 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 rounded-xl pl-3 pr-14 py-2 border border-gray-200/80 dark:border-zinc-700/80 focus:border-gray-900 dark:focus:border-white focus:outline-none transition-all"
                    />
                    <button 
                      @click="handleCreateWorkspace"
                      :disabled="!newWorkspaceName.trim()"
                      class="absolute right-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <router-link 
            to="/inbox" 
            class="relative p-2.5 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Inbox"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <span 
              v-if="inboxStore.count > 0" 
              class="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold bg-[#1D9BF0] text-white rounded-full px-1 ring-2 ring-white dark:ring-[#0B0B0C]"
            >
              {{ inboxStore.count > 99 ? '99+' : inboxStore.count }}
            </span>
          </router-link>
        </div>
      </header>

      <!-- Page Content Slot -->
      <main class="flex-1 overflow-y-auto overflow-x-hidden lg:overflow-hidden no-scrollbar flex flex-col min-h-0">
        <router-view />
      </main>
    </div>

    <!-- Daily Review Modal -->
    <DailyReviewModal
      v-if="showDailyReview"
      @close="showDailyReview = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MemwyreSidebar from '../components/MemwyreSidebar.vue';
import DailyReviewModal from '../components/DailyReviewModal.vue';
import { useProjectStore } from '../stores/project';
import { useInboxStore } from '../stores/inbox';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const inboxStore = useInboxStore();

const isEditorRoute = computed(() => route.name === 'editor' || route.path.startsWith('/editor/'));

const isMobileSidebarOpen = ref(false);
const showDailyReview = ref(false);
const isWorkspaceMenuOpen = ref(false);
const newWorkspaceName = ref('');
const workspaceDropdownRef = ref(null);

const openQuickCreate = () => {
  router.push('/add-context');
};

provide('openQuickCreate', openQuickCreate);

const currentProjectName = computed(() => {
  if (projectStore.currentProjectId === null) return 'All Spaces';
  if (!projectStore.projects.length) return 'All Spaces';
  const proj = projectStore.projects.find(p => p.id === projectStore.currentProjectId);
  return proj?.name || 'All Spaces';
});

function selectWorkspace(id) {
  projectStore.setCurrentProjectId(id);
  isWorkspaceMenuOpen.value = false;
}

async function handleCreateWorkspace() {
  const name = newWorkspaceName.value.trim();
  if (!name) return;
  try {
    await projectStore.createProject(name);
    newWorkspaceName.value = '';
  } catch (e) {
    console.error('Failed to create workspace:', e);
  }
}

function handleClickOutside(e) {
  if (workspaceDropdownRef.value && !workspaceDropdownRef.value.contains(e.target)) {
    isWorkspaceMenuOpen.value = false;
  }
}

const handleOpenQuickAddEvent = () => {
  router.push('/add-context');
};

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('open-quick-add', handleOpenQuickAddEvent);
  await projectStore.fetchProjects();
  inboxStore.fetchInbox();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('open-quick-add', handleOpenQuickAddEvent);
});
</script>
