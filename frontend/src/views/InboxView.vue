<template>
  <div class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 no-scrollbar flex flex-col min-h-0 overflow-y-auto overflow-x-hidden lg:overflow-hidden select-none">
    
    <!-- Top Header: Title, Count Badge, Search Pill, and Approve All -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 shrink-0">
      <div class="flex items-center gap-2.5">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Inbox</h2>
        <span v-if="filteredItems.length > 0" class="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
          {{ filteredItems.length }}
        </span>
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
            placeholder="Search inbox..."
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

        <!-- Approve All Button -->
        <button
          v-if="pendingItemsCount > 1"
          @click="handleApproveAll"
          :disabled="approvingAll"
          class="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold px-4 py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 shrink-0 disabled:opacity-50"
        >
          <LoadingLogo v-if="approvingAll" size="sm" class="w-3.5 h-3.5" />
          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ approvingAll ? 'Approving...' : 'Approve All' }}</span>
        </button>
      </div>
    </div>

    <!-- Filter Category Pills & Controls Row -->
    <div class="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-zinc-800/60 shrink-0 mb-4">
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          v-for="tab in filterTabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'bg-gray-900 text-white dark:bg-zinc-800 dark:text-white font-medium shadow-2xs'
              : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900/60',
            'px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap'
          ]"
        >
          {{ tab.name }} ({{ tab.count }})
        </button>
      </div>

      <div class="text-xs text-gray-400 dark:text-zinc-500 font-medium">
        {{ filteredItems.length }} {{ filteredItems.length === 1 ? 'item' : 'items' }}
      </div>
    </div>

    <!-- Scrollable Items List -->
    <div class="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-12">
      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="h-64 flex flex-col items-center justify-center text-center p-8">
        <div class="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-800/80 flex items-center justify-center text-gray-400 dark:text-zinc-500 mb-3 shadow-2xs">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-zinc-100">All caught up</h3>
        <p class="text-xs text-gray-400 dark:text-zinc-500 mt-1 max-w-sm">No pending items in your inbox. New memories captured from IDEs, extensions, and AI agents will appear here for review.</p>
      </div>

      <!-- Item Card -->
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="bg-white dark:bg-[#18181b] border border-gray-200/80 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs hover:shadow-xs group"
      >
        <!-- Card Header: Client Icon + Source + Timestamp + Status -->
        <div class="flex items-center justify-between gap-3 mb-2.5">
          <div class="flex items-center gap-2 min-w-0">
            <div class="w-4.5 h-4.5 flex items-center justify-center shrink-0">
              <template v-if="getIconForSource(item).type === 'svg'">
                <div v-html="getIconForSource(item).content" class="w-full h-full"></div>
              </template>
              <template v-else-if="getIconForSource(item).type === 'img'">
                <img
                  :src="getIconForSource(item).content"
                  alt="Source"
                  :class="['w-full h-full object-contain', getIconForSource(item).darkInvert ? 'dark:invert' : '']"
                  @error="handleImageError($event)"
                />
              </template>
            </div>
            <span class="text-xs font-medium text-gray-600 dark:text-zinc-400 truncate">
              {{ item.source === 'agent_drop' ? 'External AI Agent' : (item.source || 'Direct Entry') }}
            </span>
            <span v-if="item.status === 'approved'" class="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              Approved
            </span>
            <span v-else class="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
              Pending
            </span>
          </div>

          <span class="text-xs text-gray-400 dark:text-zinc-500 shrink-0 font-medium">
            {{ formatTimeAgo(item.created_at) }}
          </span>
        </div>

        <!-- Card Title & Content Preview -->
        <div class="mb-3">
          <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-zinc-100 leading-snug mb-1.5">
            {{ item.details }}
          </h3>
          
          <div v-if="item.content" class="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed bg-gray-50/80 dark:bg-zinc-900/60 rounded-xl p-3 border border-gray-100 dark:border-zinc-800/80 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
            <MarkdownPreview :content="item.content" />
          </div>
        </div>

        <!-- Similarity Alert if any -->
        <div v-if="getSimilarity(item) && getSimilarity(item).score > 90" class="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300">
          <svg class="w-4 h-4 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span class="truncate">
            Matches existing content: 
            <strong class="cursor-pointer hover:underline" @click="router.push(`/editor/${getSimilarity(item).type === 'memory' ? 'mem_' : 'doc_'}${getSimilarity(item).source_id}`)">
              {{ getSimilarity(item).source_title }}
            </strong> 
            ({{ getSimilarity(item).score }}%)
          </span>
        </div>

        <!-- Tags & Actions Footer -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-gray-100 dark:border-zinc-800/80">
          <!-- Tags list -->
          <div class="flex flex-wrap items-center gap-2 min-w-0">
            <span
              v-for="tag in (item.tags || [])"
              :key="tag"
              class="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-200 group/tag transition-colors py-0.5"
            >
              #{{ tag }}
              <button @click.stop="handleRemoveTag(item, tag)" class="opacity-0 group-hover/tag:opacity-100 hover:text-red-500 transition-opacity cursor-pointer">
                <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </span>
            
            <!-- Quick Tag Add Pill -->
            <button
              v-if="activeTagInputId !== item.id"
              @click="activeTagInputId = item.id"
              class="text-xs text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300 py-0.5 hover:underline transition-colors cursor-pointer"
            >
              + Tag
            </button>
            <input
              v-else
              v-model="quickTagText"
              @keyup.enter="handleSaveQuickTag(item)"
              @blur="activeTagInputId = null; quickTagText = ''"
              placeholder="tag..."
              autofocus
              class="text-xs w-20 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:border-[#D97757]"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            <!-- Edit in full studio -->
            <button
              @click="startEditing(item)"
              class="px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Edit full content in editor"
            >
              <svg class="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Edit</span>
            </button>

            <!-- Dismiss -->
            <button
              @click="dismissItem(item)"
              :disabled="actionLoading[item.id]"
              class="px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Dismiss from inbox"
            >
              <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Dismiss</span>
            </button>

            <!-- Approve -->
            <button
              v-if="item.status !== 'approved'"
              @click="approveItem(item)"
              :disabled="actionLoading[item.id]"
              class="px-3.5 py-1.5 text-xs font-semibold text-white bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-2xs active:scale-95 ml-1"
            >
              <LoadingLogo v-if="actionLoading[item.id] === 'approve'" size="sm" class="w-3.5 h-3.5" />
              <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ actionLoading[item.id] === 'approve' ? 'Approving...' : 'Approve' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dismiss Confirmation Modal -->
    <ConfirmationModal
      :is-open="showDismissModal"
      title="Dismiss Item"
      message="Dismiss this item from inbox? This will remove it from pending tasks but keep it in the vault if already saved."
      confirm-text="Dismiss"
      :loading="isDismissConfirming"
      @confirm="confirmDismissItem"
      @cancel="showDismissModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useInboxStore } from '../stores/inbox';
import { useProjectStore } from '../stores/project';
import { useRouter } from 'vue-router';
import api from '../services/api';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import { useToast } from 'vue-toastification';
import { getIconForSource } from '../utils/iconResolver';
import MarkdownPreview from '../components/common/MarkdownPreview.vue';
import LoadingLogo from '@/components/common/LoadingLogo.vue';

const store = useInboxStore();
const projectStore = useProjectStore();
const router = useRouter();
const toast = useToast();

const searchQuery = ref('');
const activeTab = ref('all');
const actionLoading = ref({});
const approvingAll = ref(false);
const itemToDismiss = ref(null);
const showDismissModal = ref(false);
const isDismissConfirming = ref(false);

const activeTagInputId = ref(null);
const quickTagText = ref('');

onMounted(async () => {
  await store.fetchInbox();
  store.connectWebSocket();
});

watch(() => projectStore.currentProjectId, async () => {
  await store.fetchInbox();
});

// Category Filter Tabs
const filterTabs = computed(() => [
  { id: 'all', name: 'All', count: store.items.length },
  { id: 'pending', name: 'Pending', count: store.items.filter(i => i.status !== 'approved').length },
  { id: 'approved', name: 'Approved', count: store.items.filter(i => i.status === 'approved').length }
]);

const pendingItemsCount = computed(() => {
  return store.items.filter(i => i.status !== 'approved').length;
});

// Filtered & Searched Items
const filteredItems = computed(() => {
  let list = store.items || [];

  if (activeTab.value === 'pending') {
    list = list.filter(i => i.status !== 'approved');
  } else if (activeTab.value === 'approved') {
    list = list.filter(i => i.status === 'approved');
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(i => {
      const details = (i.details || '').toLowerCase();
      const content = (i.content || '').toLowerCase();
      const source = (i.source || '').toLowerCase();
      const tags = (i.tags || []).map(t => t.toLowerCase()).join(' ');
      return details.includes(q) || content.includes(q) || source.includes(q) || tags.includes(q);
    });
  }

  return list;
});

const getSimilarity = (item) => {
  if (item && item.task_type) {
    try {
      return JSON.parse(item.task_type);
    } catch {
      return null;
    }
  }
  return null;
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const startEditing = (item) => {
  router.push(`/editor/${item.id}`);
};

const dismissItem = (item) => {
  itemToDismiss.value = item;
  showDismissModal.value = true;
};

const confirmDismissItem = async () => {
  if (!itemToDismiss.value) return;
  isDismissConfirming.value = true;
  try {
    await store.handleAction(itemToDismiss.value.id, 'dismiss');
    toast.success('Item dismissed');
    showDismissModal.value = false;
    itemToDismiss.value = null;
  } catch {
    toast.error('Failed to dismiss item');
  } finally {
    isDismissConfirming.value = false;
  }
};

const approveItem = async (item) => {
  actionLoading.value[item.id] = 'approve';
  try {
    await store.handleAction(item.id, 'approve');
    toast.success('Item approved and moved to memory');
  } catch {
    toast.error('Failed to approve item');
  } finally {
    delete actionLoading.value[item.id];
  }
};

const handleApproveAll = async () => {
  const pending = store.items.filter(i => i.status !== 'approved');
  if (pending.length === 0) return;
  approvingAll.value = true;
  try {
    for (const item of pending) {
      await store.handleAction(item.id, 'approve');
    }
    toast.success(`Approved ${pending.length} items`);
  } catch {
    toast.error('Failed to approve some items');
  } finally {
    approvingAll.value = false;
  }
};

const handleRemoveTag = async (item, tagToRemove) => {
  try {
    const newTags = (item.tags || []).filter(t => t !== tagToRemove);
    item.tags = newTags;
    await api.put(`/inbox/${item.id}`, {
      content: item.content,
      title: item.details,
      tags: newTags
    });
    toast.success(`Tag #${tagToRemove} removed`);
  } catch {
    toast.error('Failed to remove tag');
  }
};

const handleSaveQuickTag = async (item) => {
  if (!quickTagText.value.trim()) {
    activeTagInputId.value = null;
    return;
  }
  const cleanTag = quickTagText.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
  if (!cleanTag) return;

  const currentTags = item.tags || [];
  if (currentTags.includes(cleanTag)) {
    activeTagInputId.value = null;
    quickTagText.value = '';
    return;
  }

  try {
    const newTags = [...currentTags, cleanTag];
    item.tags = newTags;
    activeTagInputId.value = null;
    quickTagText.value = '';
    await api.put(`/inbox/${item.id}`, {
      content: item.content,
      title: item.details,
      tags: newTags
    });
    toast.success(`Tag #${cleanTag} added`);
  } catch {
    toast.error('Failed to add tag');
  }
};
</script>
