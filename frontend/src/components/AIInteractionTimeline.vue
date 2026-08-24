<template>
  <div class="h-full flex flex-col min-h-0 select-none">
    
    <!-- Top Header: Title, Search Pill, and New Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 shrink-0">
      <div>
        <div class="flex items-center gap-2.5">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Memories</h2>
          <span v-if="filteredItems.length > 0" class="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400">
            {{ filteredItems.length }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Search Input Pill -->
        <div class="relative flex-1 sm:w-64">
          <svg class="w-4 h-4 text-gray-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="w-full bg-gray-100/80 dark:bg-[#18181b] border border-gray-200/80 dark:border-zinc-800 rounded-full pl-9 pr-8 py-1.5 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#D97757] dark:focus:border-[#D97757] transition-all"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- New Pill Button -->
        <button
          @click="handleNewMemory"
          class="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold px-4 py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>New</span>
        </button>
      </div>
    </div>

    <!-- Filter Category Pills & View Controls Row -->
    <div class="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-zinc-800/60 shrink-0">
      
      <!-- Filter Category Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          v-for="cat in categoryTabs"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            activeCategory === cat.id
              ? 'bg-gray-900 text-white dark:bg-zinc-800 dark:text-white font-medium shadow-2xs'
              : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900/60',
            'px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Right Control Icons: Sort Menu + Grid / List Toggle -->
      <div class="flex items-center gap-1 shrink-0">
        
        <!-- Sort Dropdown -->
        <div class="relative" ref="sortDropdownRef">
          <button
            @click="isSortMenuOpen = !isSortMenuOpen"
            class="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Sort Options"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isSortMenuOpen"
              class="absolute right-0 mt-2 w-44 bg-white dark:bg-[#18181b] rounded-xl shadow-2xl py-1.5 border border-gray-100 dark:border-zinc-800 z-50"
            >
              <button
                v-for="sort in sortOptions"
                :key="sort.id"
                @click="currentSort = sort.id; isSortMenuOpen = false"
                class="w-full px-3 py-1.5 text-xs text-left flex items-center justify-between text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                :class="{ 'font-semibold text-[#D97757] dark:text-[#D97757]': currentSort === sort.id }"
              >
                <span>{{ sort.label }}</span>
                <svg v-if="currentSort === sort.id" class="w-3.5 h-3.5 text-[#D97757]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </transition>
        </div>

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

        <!-- Refresh Button -->
        <button
          @click="fetchTimeline"
          :disabled="loading"
          class="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer ml-1"
          title="Refresh"
        >
          <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.97 7.97 0 0112 4a8 8 0 017.446 5.032M18.418 15A7.97 7.97 0 0112 20a8 8 0 01-7.446-5.032" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div v-if="loading" class="flex-1 flex items-center justify-center text-sm text-gray-400 dark:text-zinc-500 py-12">
      <div class="flex flex-col items-center gap-2">
        <svg class="w-6 h-6 animate-spin text-[#D97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.97 7.97 0 0112 4a8 8 0 017.446 5.032M18.418 15A7.97 7.97 0 0112 20a8 8 0 01-7.446-5.032" />
        </svg>
        <span>Loading memories...</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredItems.length === 0" class="flex-1 relative overflow-hidden mt-4">
      <EmptyStateCarousel />
    </div>

    <!-- LIST VIEW (Matching Library Reference) -->
    <div v-else-if="viewMode === 'list'" class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar min-h-0">
      
      <!-- Table Header Row -->
      <div class="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-medium text-gray-400 dark:text-zinc-500 border-b border-gray-100 dark:border-zinc-800/40 sticky top-0 bg-[#F9FAFB] dark:bg-[#0B0B0C] z-10">
        <div class="col-span-7 sm:col-span-6 md:col-span-7">Name</div>
        <div class="col-span-3 sm:col-span-3 md:col-span-3 text-left">Modified</div>
        <div class="col-span-2 sm:col-span-3 md:col-span-2 text-right">Size</div>
      </div>

      <!-- Item Rows -->
      <div class="divide-y divide-gray-100/70 dark:divide-zinc-800/40">
        <div
          v-for="item in paginatedItems"
          :key="item.id"
          @click="$emit('open-item', item)"
          class="grid grid-cols-12 gap-3 px-3 py-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-zinc-900/60 cursor-pointer transition-colors group items-center"
        >
          <!-- Name & Icon -->
          <div class="col-span-7 sm:col-span-6 md:col-span-7 flex items-center gap-3 min-w-0 pr-2">
            <!-- Icon/Thumbnail Container -->
            <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800/80 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200/50 dark:border-zinc-700/40">
              <template v-if="getItemThumbnail(item)">
                <img :src="getItemThumbnail(item)" class="w-full h-full object-cover" />
              </template>
              <template v-else-if="getTimelineIcon(item).type === 'svg'">
                <div v-html="getTimelineIcon(item).content" class="w-4.5 h-4.5"></div>
              </template>
              <template v-else>
                <img :src="getTimelineIcon(item).content" class="w-4.5 h-4.5 object-contain" :class="isOpenAIItem(item) ? 'dark:invert' : ''" />
              </template>
            </div>

            <!-- Title & Snippet Preview -->
            <div class="min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-900 dark:text-zinc-200 group-hover:text-[#D97757] dark:group-hover:text-[#D97757] truncate transition-colors">
                {{ item.title || 'Untitled Memory' }}
              </p>
              <p v-if="item.tags && item.tags.length > 0" class="text-[11px] text-gray-400 dark:text-zinc-500 truncate mt-0.5">
                {{ item.tags.slice(0, 3).map(t => `#${t}`).join(' ') }}
              </p>
            </div>
          </div>

          <!-- Modified Date -->
          <div class="col-span-3 sm:col-span-3 md:col-span-3 text-left">
            <span class="text-xs text-gray-500 dark:text-zinc-400 whitespace-nowrap">
              {{ formatRelativeDate(item.created_at || item.updated_at) }}
            </span>
          </div>

          <!-- Size / Token Count + Actions on Hover -->
          <div class="col-span-2 sm:col-span-3 md:col-span-2 flex items-center justify-end gap-2 text-right">
            <span class="text-xs text-gray-400 dark:text-zinc-500 whitespace-nowrap group-hover:hidden">
              {{ formatItemSize(item) }}
            </span>

            <!-- Hover Quick Actions -->
            <div class="hidden group-hover:flex items-center gap-1.5" @click.stop>
              <button
                @click="copyOnly(item)"
                class="p-1 rounded-md text-gray-400 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-zinc-800 transition-colors"
                title="Copy context"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>

              <details class="relative">
                <summary class="list-none cursor-pointer p-1 rounded-md text-gray-400 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-zinc-800 transition-colors" title="Use in AI">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </summary>
                <div class="absolute right-0 mt-1 w-48 rounded-xl border border-gray-200 dark:border-zinc-700/80 bg-white dark:bg-[#18181b] shadow-2xl z-40 p-1">
                  <button @click="handoff(item, 'chatgpt')" class="w-full text-left text-xs px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition-colors">
                    <img :src="openaiIcon" alt="ChatGPT" class="w-3.5 h-3.5 dark:invert" />
                    <span>Open in ChatGPT</span>
                  </button>
                  <button @click="handoff(item, 'claude')" class="w-full text-left text-xs px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition-colors">
                    <img :src="claudeIcon" alt="Claude" class="w-3.5 h-3.5" />
                    <span>Open in Claude</span>
                  </button>
                  <button @click="handoff(item, 'perplexity')" class="w-full text-left text-xs px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition-colors">
                    <img :src="perplexityIcon" alt="Perplexity" class="w-3.5 h-3.5" />
                    <span>Open in Perplexity</span>
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- GRID VIEW (Bento Card Grid) -->
    <div v-else class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar min-h-0 py-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        <div
          v-for="item in paginatedItems"
          :key="item.id"
          @click="$emit('open-item', item)"
          class="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-gray-200/70 dark:border-zinc-800/80 hover:border-gray-300 dark:hover:border-zinc-700 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between group min-h-[140px]"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-2.5">
              <div class="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                <template v-if="getTimelineIcon(item).type === 'svg'">
                  <div v-html="getTimelineIcon(item).content" class="w-4 h-4"></div>
                </template>
                <template v-else>
                  <img :src="getTimelineIcon(item).content" class="w-4 h-4 object-contain" :class="isOpenAIItem(item) ? 'dark:invert' : ''" />
                </template>
              </div>
              <span class="text-[11px] text-gray-400 dark:text-zinc-500 font-mono">
                {{ formatItemSize(item) }}
              </span>
            </div>

            <h4 class="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#D97757] line-clamp-1 transition-colors">
              {{ item.title || 'Untitled Memory' }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
              {{ item.content }}
            </p>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800/60 mt-3 text-[11px] text-gray-400 dark:text-zinc-500">
            <span>{{ formatRelativeDate(item.created_at || item.updated_at) }}</span>
            <span class="capitalize">{{ displaySource(item.source_app || item.source) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Footer -->
    <div v-if="filteredItems.length > 0" class="pt-3 pb-1 border-t border-gray-100 dark:border-zinc-800/60 flex items-center justify-between select-none shrink-0 text-xs text-gray-500 dark:text-zinc-400">
      <span>
        Page {{ currentPage }} of {{ totalPages }} ({{ filteredItems.length }} items)
      </span>
      <div class="flex gap-1.5">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Previous
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '../services/api';
import { composeContext } from '../services/context';
import { listProjects } from '../services/projects';
import { getIconForSource } from '../utils/iconResolver';
import openaiIcon from '../assets/openai.svg';
import claudeIcon from '../assets/claude-color.svg';
import grokIcon from '../assets/grok-color.svg';
import perplexityIcon from '../assets/perplexity-color.svg';
import EmptyStateCarousel from './EmptyStateCarousel.vue';

const props = defineProps({
  projectId: { type: [Number, String], default: null },
  focusToday: { type: Boolean, default: false },
});

const emit = defineEmits(['open-item', 'open-quick-add']);
const router = useRouter();
const toast = useToast();
const openQuickCreate = inject('openQuickCreate', null);

const loading = ref(true);
const items = ref([]);
const searchQuery = ref('');
const activeCategory = ref('all');
const viewMode = ref('list'); // 'list' | 'grid'
const currentSort = ref('newest'); // 'newest' | 'oldest' | 'name' | 'size'

const isSortMenuOpen = ref(false);
const sortDropdownRef = ref(null);

const categoryTabs = [
  { id: 'all', name: 'All' },
  { id: 'code', name: 'Code & IDE' },
  { id: 'conversations', name: 'Conversations' },
  { id: 'documents', name: 'Documents' },
  { id: 'web', name: 'Web & Notes' },
];

const sortOptions = [
  { id: 'newest', label: 'Most Recent' },
  { id: 'oldest', label: 'Oldest' },
  { id: 'name', label: 'Name (A-Z)' },
  { id: 'size', label: 'Size' },
];

const handleNewMemory = (type = 'note') => {
  if (openQuickCreate) {
    openQuickCreate();
  }
  emit('open-quick-add', type);
  window.dispatchEvent(new CustomEvent('open-quick-add'));
};

const formatRelativeDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  const options = date.getFullYear() === now.getFullYear()
    ? { month: 'short', day: 'numeric' }
    : { month: 'short', day: 'numeric', year: 'numeric' };

  return date.toLocaleDateString('en-US', options);
};

const formatItemSize = (item) => {
  const charCount = (item.content || '').length;
  if (charCount > 1024 * 1024) return `${(charCount / (1024 * 1024)).toFixed(1)} MB`;
  if (charCount > 1024) return `${(charCount / 1024).toFixed(1)} KB`;
  return `${charCount} B`;
};

const getItemThumbnail = (item) => {
  if (item.thumbnail_url) return item.thumbnail_url;
  if (item.image_url) return item.image_url;
  return null;
};

const displaySource = (source) => {
  const normalized = (source || '').toLowerCase();
  if (normalized.includes('chatgpt') || normalized.includes('openai')) return 'ChatGPT';
  if (normalized.includes('claude')) return 'Claude';
  if (normalized.includes('gemini')) return 'Gemini';
  if (normalized.includes('cursor')) return 'Cursor';
  if (normalized.includes('vscode')) return 'VS Code';
  if (normalized.includes('windsurf')) return 'Windsurf';
  if (normalized.includes('notion')) return 'Notion';
  if (normalized.includes('antigravity')) return 'Antigravity';
  if (normalized.includes('web')) return 'Web';
  return source || 'Memory';
};

const getTimelineIcon = (item) => getIconForSource({
  source: item.source_app || item.source || '',
  tags: item.tags || [],
});

const isOpenAIItem = (item) => {
  const src = String(item?.source_app || item?.source || '').toLowerCase();
  return src.includes('chatgpt') || src.includes('openai');
};

// Filtering and Sorting
const filteredItems = computed(() => {
  let list = items.value || [];

  // Category filter
  if (activeCategory.value === 'code') {
    list = list.filter((item) => {
      const src = String(item.source_app || item.source || '').toLowerCase();
      const tags = (item.tags || []).map((t) => t.toLowerCase());
      return src.includes('cursor') || src.includes('vscode') || src.includes('windsurf') || src.includes('antigravity') || src.includes('openclaw') || src.includes('codex') || tags.includes('code') || tags.includes('snippet');
    });
  } else if (activeCategory.value === 'conversations') {
    list = list.filter((item) => {
      const src = String(item.source_app || item.source || '').toLowerCase();
      return src.includes('chatgpt') || src.includes('claude') || src.includes('gemini') || src.includes('grok') || src.includes('perplexity') || item.interaction_type === 'conversation';
    });
  } else if (activeCategory.value === 'documents') {
    list = list.filter((item) => {
      const src = String(item.source_app || item.source || '').toLowerCase();
      return src.includes('notion') || src.includes('gdrive') || String(item.id || '').startsWith('doc_') || item.interaction_type === 'document';
    });
  } else if (activeCategory.value === 'web') {
    list = list.filter((item) => {
      const src = String(item.source_app || item.source || '').toLowerCase();
      return src.includes('web') || src.includes('chrome') || item.interaction_type === 'webpage' || item.interaction_type === 'web_snippet';
    });
  }

  // Text search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter((item) => {
      const titleMatch = String(item.title || '').toLowerCase().includes(q);
      const contentMatch = String(item.content || '').toLowerCase().includes(q);
      const tagMatch = (item.tags || []).some((t) => String(t).toLowerCase().includes(q));
      const sourceMatch = String(item.source_app || item.source || '').toLowerCase().includes(q);
      return titleMatch || contentMatch || tagMatch || sourceMatch;
    });
  }

  // Sort
  return [...list].sort((a, b) => {
    if (currentSort.value === 'newest') {
      return new Date(b.created_at || b.updated_at || 0) - new Date(a.created_at || a.updated_at || 0);
    }
    if (currentSort.value === 'oldest') {
      return new Date(a.created_at || a.updated_at || 0) - new Date(b.created_at || b.updated_at || 0);
    }
    if (currentSort.value === 'name') {
      return String(a.title || '').localeCompare(String(b.title || ''));
    }
    if (currentSort.value === 'size') {
      return (b.content || '').length - (a.content || '').length;
    }
    return 0;
  });
});

const itemsPerPage = 20;
const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage) || 1;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});

// Fetching
const fetchTimeline = async () => {
  loading.value = true;
  currentPage.value = 1;
  try {
    const params = { view: 'timeline', limit: 400 };
    if (props.projectId !== null && props.projectId !== undefined && props.projectId !== '') {
      params.project_id = Number(props.projectId);
    }
    const response = await api.get('/memory/', { params });
    items.value = (response.data || []).filter(
      (x) => String(x.id || '').startsWith('mem_') || String(x.id || '').startsWith('doc_')
    );
  } catch (error) {
    console.error('Failed to fetch library', error);
    toast.error('Failed to load memories library');
  } finally {
    loading.value = false;
  }
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text || '');
      return true;
    } catch (err) {}
  }
  return false;
};

const copyOnly = async (item) => {
  try {
    const payload = await composeContext({ itemIds: [item.id], maxChars: 2800 });
    const copied = await copyText(payload?.context_text || item.content || '');
    if (copied) toast.success('Context copied to clipboard');
    else toast.error('Failed to copy');
  } catch (err) {
    toast.error('Failed to copy context');
  }
};

const handoff = async (item, provider) => {
  try {
    const payload = await composeContext({ itemIds: [item.id], maxChars: 2800 });
    const contextText = payload?.context_text || item.content || '';
    const encoded = encodeURIComponent(contextText);
    let url = null;
    if (provider === 'chatgpt') url = `https://chatgpt.com/?prompt=${encoded}`;
    if (provider === 'claude') url = `https://claude.ai/new?q=${encoded}`;
    if (provider === 'perplexity') url = `https://www.perplexity.ai/?q=${encoded}`;

    await copyText(contextText);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    toast.success('Context copied & opened');
  } catch (err) {
    toast.error('Could not open AI tool');
  }
};

const handleGlobalClick = (event) => {
  if (sortDropdownRef.value && !sortDropdownRef.value.contains(event.target)) {
    isSortMenuOpen.value = false;
  }
};

watch(() => props.projectId, fetchTimeline);
watch(searchQuery, () => { currentPage.value = 1; });
watch(activeCategory, () => { currentPage.value = 1; });

onMounted(async () => {
  document.addEventListener('click', handleGlobalClick);
  await fetchTimeline();
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
});

defineExpose({ fetchTimeline });
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}
</style>
