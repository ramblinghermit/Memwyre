<template>
  <div class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-5 lg:px-6 py-6 no-scrollbar flex flex-col min-h-0 overflow-y-auto overflow-x-hidden select-none">
    
    <!-- Top Header -->
    <div class="mb-6 shrink-0">
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h2>
      <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">Manage your workspace preferences, appearance, and account credentials.</p>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex items-center gap-1.5 pb-3 border-b border-gray-200 dark:border-zinc-800 shrink-0 mb-6 overflow-x-auto no-scrollbar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          activeTab === tab.id
            ? 'bg-gray-900 text-white dark:bg-zinc-800 dark:text-white font-medium shadow-2xs'
            : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900/60',
          'px-3.5 py-1 rounded-full text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Flushed Settings Sections -->
    <div class="space-y-8 pb-12 divide-y divide-gray-200/80 dark:divide-zinc-800">
      
      <!-- 1. GENERAL / APPEARANCE -->
      <section v-show="activeTab === 'general' || activeTab === 'all'" class="space-y-6 pt-2 first:pt-0">
        <div>
          <h3 class="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Appearance</h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-0.5">Customize the workspace look and feel.</p>
        </div>

        <div class="flex items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-zinc-800/60">
          <div>
            <span class="text-sm font-semibold text-gray-900 dark:text-zinc-100">Theme</span>
            <p class="text-xs sm:text-[13px] text-gray-500 dark:text-zinc-400 mt-0.5">Choose between light, dark, or system matching theme.</p>
          </div>
          <ThemeToggle />
        </div>

        <div class="space-y-4 pt-2">
          <div>
            <h3 class="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Preferences</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-0.5">Control automated memory indexing and user experience.</p>
          </div>

          <div class="flex items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-zinc-800/60">
            <div>
              <span class="text-sm font-semibold text-gray-900 dark:text-zinc-100">Auto-Approve New Memories</span>
              <p class="text-xs sm:text-[13px] text-gray-500 dark:text-zinc-400 mt-0.5 max-w-lg leading-relaxed">Automatically index memories captured from IDE extensions without waiting in the inbox.</p>
            </div>
            <button 
              @click="toggleAutoApprove" 
              :class="settings.auto_approve ? 'bg-[#1D9BF0]' : 'bg-gray-200 dark:bg-zinc-700'" 
              class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D9BF0]"
            >
              <span 
                aria-hidden="true" 
                :class="settings.auto_approve ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'" 
                class="pointer-events-none inline-block h-5 w-5 rounded-full shadow-xs transform ring-0 transition ease-in-out duration-200"
              ></span>
            </button>
          </div>
        </div>
      </section>

      <!-- 2. ACCOUNT SETTINGS -->
      <section v-show="activeTab === 'account' || activeTab === 'all'" class="space-y-5 pt-8 first:pt-0">
        <div>
          <h3 class="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Account Credentials</h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-0.5">Your email address and verification details.</p>
        </div>

        <div class="py-2 space-y-3">
          <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-zinc-300">Email address</label>
          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <input 
              type="email" 
              disabled 
              :value="authStore.user?.email || 'user@example.com'" 
              class="bg-gray-100/80 dark:bg-zinc-800/80 block w-full sm:max-w-md text-sm border border-gray-200 dark:border-zinc-700 rounded-xl py-2 px-3.5 text-gray-700 dark:text-zinc-200 cursor-not-allowed"
            >
            <div class="flex items-center gap-2">
              <span v-if="authStore.user?.is_verified" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Verified
              </span>
              <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                Unverified
              </span>
            </div>
          </div>

          <div v-if="authStore.user && !authStore.user.is_verified" class="mt-3 p-3.5 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p class="text-xs sm:text-sm text-red-600 dark:text-red-400">Please verify your email address to ensure full account access.</p>
            <button 
              @click="resendVerification" 
              :disabled="resendingEmail" 
              class="inline-flex items-center px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] transition-colors disabled:opacity-50 cursor-pointer shadow-2xs shrink-0"
            >
              <svg v-if="resendingEmail" class="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ resendingEmail ? 'Sending...' : 'Resend Verification' }}
            </button>
          </div>
        </div>
      </section>

      <!-- 3. API KEYS & DEVELOPER ACCESS -->
      <section v-show="activeTab === 'api' || activeTab === 'all'" class="space-y-5 pt-8 first:pt-0">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">API & MCP Keys</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-0.5">Authenticate Cursor, Claude Code, Windsurf, and agent connectors.</p>
          </div>
          <button
            @click="showAddKeyForm = !showAddKeyForm"
            class="bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold px-3.5 py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Key</span>
          </button>
        </div>

        <!-- Create Key Form Drawer -->
        <div v-if="showAddKeyForm" class="p-4 rounded-2xl bg-gray-100/80 dark:bg-zinc-800/80 border border-gray-200/80 dark:border-zinc-700/80 space-y-2.5">
          <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-zinc-300">Key Name</label>
          <div class="flex gap-2">
            <input
              v-model="newKeyName"
              @keyup.enter="generateKey"
              placeholder="e.g. Cursor IDE, Claude CLI..."
              class="flex-1 min-w-0 bg-white dark:bg-zinc-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 rounded-xl px-3.5 py-2 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:border-gray-900 dark:focus:border-white"
            />
            <button
              @click="generateKey"
              :disabled="generatingKey || !newKeyName.trim()"
              class="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
            >
              {{ generatingKey ? 'Generating...' : 'Generate' }}
            </button>
          </div>
        </div>

        <!-- Newly Generated Key Box -->
        <div v-if="justGeneratedKey" class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">Key Created — Copy it now (won't be shown again)</span>
            <button @click="copyGeneratedKey" class="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer">
              {{ keyCopied ? 'Copied!' : 'Copy Key' }}
            </button>
          </div>
          <code class="block text-xs font-mono p-2.5 bg-white dark:bg-zinc-900 rounded-lg text-gray-800 dark:text-zinc-200 break-all select-all border border-emerald-200/50 dark:border-emerald-900/30">
            {{ justGeneratedKey }}
          </code>
        </div>

        <!-- Existing Keys List (Flushed rows) -->
        <div class="space-y-1 divide-y divide-gray-100 dark:divide-zinc-800/60">
          <div v-if="apiKeys.length === 0" class="text-center py-6 text-xs sm:text-sm text-gray-400 dark:text-zinc-500">
            No API keys generated yet. Create one to authenticate MCP servers and agents.
          </div>
          <div
            v-for="k in apiKeys"
            :key="k.id"
            class="flex items-center justify-between py-3 px-1 group"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200/60 dark:border-zinc-700/50 flex items-center justify-center text-gray-500 dark:text-zinc-400 shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-semibold text-gray-900 dark:text-zinc-100 truncate">{{ k.name }}</span>
                <span class="text-xs text-gray-400 dark:text-zinc-500 font-mono">{{ k.masked_key || '••••••••••••••••' }}</span>
              </div>
            </div>
            <button
              @click="deleteKey(k.id)"
              class="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              title="Revoke Key"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      </section>

    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      :is-open="showDeleteModal"
      title="Revoke Key"
      message="Are you sure you want to revoke this API key? Connected tools and MCP clients using this key will immediately lose access."
      confirm-text="Revoke"
      :loading="deletingKey"
      @confirm="confirmDeleteKey"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import api from '../services/api';
import apiKeysService from '../services/apiKeys';
import ThemeToggle from '../components/ThemeToggle.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const activeTab = ref('general');
const tabs = [
  { id: 'general', name: 'General & Appearance' },
  { id: 'account', name: 'Account' },
  { id: 'api', name: 'API & MCP Keys' }
];

const settings = ref({ auto_approve: true });
const resendingEmail = ref(false);

const apiKeys = ref([]);
const showAddKeyForm = ref(false);
const newKeyName = ref("");
const generatingKey = ref(false);
const justGeneratedKey = ref(null);
const keyCopied = ref(false);
const keyToDelete = ref(null);
const showDeleteModal = ref(false);
const deletingKey = ref(false);

onMounted(() => {
  loadSettings();
  loadApiKeys();
});

const loadSettings = async () => {
  try {
    const res = await api.get('/user/settings');
    settings.value = { ...settings.value, ...res.data };
  } catch (err) {
    console.error(err);
  }
};

const toggleAutoApprove = async () => {
  const newVal = !settings.value.auto_approve;
  settings.value.auto_approve = newVal;
  try {
    await api.patch('/user/settings', { auto_approve: newVal });
    toast.success("Preferences updated");
  } catch {
    settings.value.auto_approve = !newVal;
    toast.error("Failed to update preferences");
  }
};

const resendVerification = async () => {
  if (resendingEmail.value) return;
  resendingEmail.value = true;
  try {
    await api.post('/auth/resend-verification');
    toast.success("Verification email sent! Please check your inbox.");
  } catch (err) {
    toast.error(err.response?.data?.detail || "Failed to resend email.");
  } finally {
    resendingEmail.value = false;
  }
};

const loadApiKeys = async () => {
  try {
    const res = await apiKeysService.listKeys();
    apiKeys.value = res.data;
  } catch (err) {
    console.error("Failed to list keys", err);
  }
};

const generateKey = async () => {
  if (!newKeyName.value.trim()) return;
  generatingKey.value = true;
  try {
    const res = await apiKeysService.createKey(newKeyName.value.trim());
    justGeneratedKey.value = res.data.key;
    toast.success("API Key generated successfully");
    newKeyName.value = "";
    showAddKeyForm.value = false;
    loadApiKeys();
  } catch {
    toast.error("Failed to generate key");
  } finally {
    generatingKey.value = false;
  }
};

const copyGeneratedKey = async () => {
  if (justGeneratedKey.value) {
    await navigator.clipboard.writeText(justGeneratedKey.value);
    keyCopied.value = true;
    toast.success("Key copied to clipboard");
    setTimeout(() => (keyCopied.value = false), 2000);
  }
};

const deleteKey = (id) => {
  keyToDelete.value = id;
  showDeleteModal.value = true;
};

const confirmDeleteKey = async () => {
  if (!keyToDelete.value) return;
  deletingKey.value = true;
  try {
    await apiKeysService.revokeKey(keyToDelete.value);
    toast.success("Key revoked");
    showDeleteModal.value = false;
    keyToDelete.value = null;
    loadApiKeys();
  } catch {
    toast.error("Failed to revoke key");
  } finally {
    deletingKey.value = false;
  }
};
</script>
