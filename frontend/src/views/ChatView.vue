<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useChatStore } from '../stores/chat';
import { useAuthStore } from '../stores/auth';
import { useProjectStore } from '../stores/project';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import AgentProgressRail from '../components/chat/AgentProgressRail.vue';
import AssistantMessageCard from '../components/chat/AssistantMessageCard.vue';
import { useToast } from 'vue-toastification';

const chatStore = useChatStore();
const authStore = useAuthStore();
const projectStore = useProjectStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const inputContent = ref('');
const messagesContainer = ref(null);

const showControls = ref(true);
const showDeleteModal = ref(false);

const expandedThinkingTurns = ref(new Set());
const activeTurnId = computed(() => chatStore.activeTurnId);
const activeThinkingSteps = computed(() => chatStore.getTurnSteps(activeTurnId.value));
const waitingForFirstStep = computed(() => chatStore.thinking && activeThinkingSteps.value.length === 0);

onMounted(async () => {
  await chatStore.fetchSessions();
  chatStore.connectWebSocket();
  
  if (route.params.id) {
    await chatStore.selectSession(route.params.id);
  } else if (chatStore.sessions.length > 0 && !chatStore.currentSession) {
    await chatStore.selectSession(chatStore.sessions[0].id);
    router.replace(`/chat/${chatStore.sessions[0].id}`);
  }
});

onUnmounted(() => {
  chatStore.disconnectWebSocket();
});

watch(() => route.params.id, async (newId) => {
  if (newId && (!chatStore.currentSession || String(chatStore.currentSession.id) !== String(newId))) {
    await chatStore.selectSession(newId);
  }
});

watch(() => chatStore.messages.length, () => nextTick(scrollToBottom));
watch(() => activeThinkingSteps.value.map((s) => `${s.step}:${s.status}:${s.timestamp}`).join('|'), () => nextTick(scrollToBottom));
watch(() => chatStore.thinking, () => nextTick(scrollToBottom));

watch(() => projectStore.currentProjectId, async () => {
  await chatStore.fetchSessions();
  if (chatStore.sessions.length > 0) {
    await chatStore.selectSession(chatStore.sessions[0].id);
    router.replace(`/chat/${chatStore.sessions[0].id}`);
  } else {
    chatStore.currentSession = null;
    chatStore.messages = [];
    chatStore.currentContext = [];
    router.replace('/chat');
  }
});

function toggleThinkingTurn(turnId) {
  if (!turnId) return;
  const next = new Set(expandedThinkingTurns.value);
  if (next.has(turnId)) next.delete(turnId);
  else next.add(turnId);
  expandedThinkingTurns.value = next;
}

function isThinkingExpanded(turnId) {
  return turnId ? expandedThinkingTurns.value.has(turnId) : false;
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

async function createNewChat() {
  const session = await chatStore.createSession();
  if (session?.id) {
    router.push(`/chat/${session.id}`);
  }
}

async function handleSend() {
  const content = inputContent.value.trim();
  if (!content || chatStore.thinking) return;

  if (!chatStore.currentSession) {
    const session = await chatStore.createSession();
    if (session?.id) {
      router.replace(`/chat/${session.id}`);
    }
  }

  inputContent.value = '';
  await chatStore.sendMessage(content, 0.8, 8000);
}

function handleClearHistory() {
  showDeleteModal.value = true;
}

async function confirmClearHistory() {
  await chatStore.clearHistory();
  inputContent.value = '';
  showDeleteModal.value = false;
  router.replace('/chat');
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text || '');
    toast.success('Copied to clipboard');
  } catch (err) {
    toast.error('Failed to copy');
  }
}

async function handleFeedback(messageId, type) {
  await chatStore.sendFeedback(messageId, type);
  toast.success('Feedback submitted');
}

function handleOpenSource(source) {
  if (source?.id) {
    router.push({ name: 'editor', params: { id: source.id } });
  }
}
</script>

<template>
  <div class="h-full flex-1 flex overflow-hidden relative bg-transparent text-gray-900 dark:text-white font-sans transition-colors duration-300">
    <!-- Center Main: Agent Stream & Floating Composer -->
    <main class="flex-1 flex flex-col min-w-0 bg-transparent relative overflow-hidden">
      <div
        v-if="chatStore.messages.length === 0"
        class="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20"
        style="background-image: radial-gradient(#9ca3af 1px, transparent 1px); background-size: 32px 32px;"
      ></div>

        <!-- Chat Stream Container -->
        <div v-if="chatStore.messages.length > 0" class="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth z-10 custom-scrollbar" ref="messagesContainer">
          <div class="space-y-6 max-w-3xl mx-auto">
            <template v-for="msg in chatStore.messages" :key="msg.id">
              <!-- User Message Card -->
              <div v-if="msg.role === 'user'" class="flex justify-end my-3">
                <div class="max-w-[85%] min-w-0 flex flex-col items-end">
                  <div class="bg-gradient-to-r from-[#D97757] to-[#e5896c] text-white px-5 py-3.5 rounded-2xl rounded-tr-xs shadow-xs text-sm md:text-base leading-relaxed">
                    <p class="whitespace-pre-wrap">{{ msg.content }}</p>
                  </div>
                  <div class="text-right mt-1 text-[10px] font-mono text-gray-400 dark:text-zinc-500 tracking-wide mr-1 flex items-center space-x-1">
                    <span>{{ formatDate(msg.created_at).split(',')[1] || 'Now' }}</span>
                  </div>
                </div>
              </div>

              <!-- Assistant Message Card -->
              <AssistantMessageCard
                v-else-if="msg.role === 'assistant'"
                :message="msg"
                @copy="copyToClipboard(msg.content)"
                @feedback="(type) => handleFeedback(msg.id, type)"
                @open-source="handleOpenSource"
              />
            </template>
          </div>

          <!-- Live Agent Progress Rail -->
          <AgentProgressRail
            v-if="chatStore.thinking"
            class="max-w-3xl mx-auto mt-2"
            :steps="activeThinkingSteps"
            :turn-id="activeTurnId || ''"
            :waiting-for-first-step="waitingForFirstStep"
            :expanded="isThinkingExpanded(activeTurnId)"
            @toggle="toggleThinkingTurn(activeTurnId)"
          />
        </div>

        <!-- Floating Input Composer -->
        <div class="px-4 pt-2 pb-6 z-10 shrink-0" v-if="chatStore.messages.length > 0 && chatStore.currentSession">
          <div class="max-w-3xl mx-auto">
            <div class="bg-white dark:bg-[#141416] rounded-2xl transition-all shadow-xs border border-gray-200/80 dark:border-zinc-800 p-2.5 focus-within:border-[#D97757]/60 focus-within:ring-1 focus-within:ring-[#D97757]/30">
              <textarea
                v-model="inputContent"
                @keydown.enter.prevent="handleSend"
                placeholder="Ask your Memwyre assistant..."
                rows="1"
                class="w-full bg-transparent border-0 focus:border-0 focus:ring-0 outline-none focus:outline-none rounded-xl px-3 py-2 text-sm md:text-base text-gray-900 dark:text-white resize-none max-h-36 placeholder-gray-400 dark:placeholder-zinc-500 font-sans"
              ></textarea>

              <div class="px-2 pt-2 border-t border-gray-100 dark:border-zinc-800/80 flex justify-between items-center text-xs text-gray-500">
                <!-- Model Switcher Pill -->
                <div class="relative group inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100/70 dark:bg-zinc-800/60 border border-gray-200/50 dark:border-zinc-700/50">
                  <select
                    v-model="chatStore.selectedModel"
                    class="appearance-none bg-transparent border-none text-xs text-gray-800 dark:text-gray-200 font-medium font-sans cursor-pointer focus:ring-0 pr-5 hover:text-black dark:hover:text-white transition-colors"
                    title="Select AI Model"
                  >
                    <option v-for="model in chatStore.availableModels" :key="model.id" :value="model.id" class="text-gray-900 bg-white dark:bg-surface dark:text-gray-100">{{ model.name }}</option>
                  </select>
                  <svg class="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-600 dark:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </div>

                <div class="flex items-center space-x-3">
                  <span class="hidden sm:inline-block text-[11px] font-mono text-gray-400 dark:text-zinc-500">Enter to send</span>
                  <button
                    @click="handleSend"
                    :disabled="!inputContent.trim() || chatStore.thinking"
                    class="p-2 bg-[#D97757] text-white rounded-xl hover:bg-[#C4654A] disabled:opacity-50 transition-all active:scale-95 shadow-xs flex items-center justify-center w-8 h-8 cursor-pointer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State Hero Composer -->
        <div v-else class="flex-1 flex flex-col items-center justify-center p-4 z-10">
          <div class="max-w-2xl w-full">
            <div class="mb-6 text-left">
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Hello, <span class="text-gray-900 dark:text-white font-bold">{{ authStore.user?.name || authStore.user?.email?.split('@')[0] || 'Traveler' }}</span>
              </h1>
              <p class="text-sm text-gray-500 dark:text-zinc-400 mt-1">What would you like to explore or search across your memories?</p>
            </div>

            <!-- Composer Box -->
            <div class="bg-white dark:bg-[#141416] rounded-2xl shadow-xs border border-gray-200/80 dark:border-zinc-800 p-3 transition-all focus-within:border-[#D97757]/60 focus-within:ring-1 focus-within:ring-[#D97757]/30">
              <textarea
                v-model="inputContent"
                @keydown.enter.prevent="handleSend"
                placeholder="Ask anything about your memories, projects, or notes..."
                rows="3"
                class="w-full bg-transparent border-0 focus:border-0 focus:ring-0 outline-none focus:outline-none rounded-xl p-2 text-base text-gray-900 dark:text-white resize-none placeholder-gray-400 dark:placeholder-zinc-500 font-sans"
              ></textarea>

              <div class="px-2 pt-2 border-t border-gray-100 dark:border-zinc-800/80 flex justify-between items-center text-xs text-gray-500">
                <!-- Model Switcher Pill -->
                <div class="relative group inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100/70 dark:bg-zinc-800/60 border border-gray-200/50 dark:border-zinc-700/50">
                  <select
                    v-model="chatStore.selectedModel"
                    class="appearance-none bg-transparent border-none text-xs text-gray-800 dark:text-gray-200 font-medium font-sans cursor-pointer focus:ring-0 pr-5 hover:text-black dark:hover:text-white transition-colors"
                    title="Select AI Model"
                  >
                    <option v-for="model in chatStore.availableModels" :key="model.id" :value="model.id" class="text-gray-900 bg-white dark:bg-surface dark:text-gray-100">{{ model.name }}</option>
                  </select>
                  <svg class="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-600 dark:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </div>

                <button
                  @click="handleSend"
                  :disabled="!inputContent.trim() || chatStore.thinking"
                  class="px-4 py-2 bg-[#D97757] text-white rounded-xl hover:bg-[#C4654A] disabled:opacity-50 transition-all font-medium flex items-center space-x-1 shadow-xs cursor-pointer"
                >
                  <span>Send</span>
                  <svg class="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Right Panel: Flushed Context Rail -->
      <transition enter-active-class="transition-transform duration-300 ease-in-out" enter-from-class="translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300 ease-in-out" leave-from-class="translate-x-0" leave-to-class="translate-x-full">
        <aside v-if="showControls" class="w-80 bg-transparent border-l border-gray-200/60 dark:border-zinc-800/70 hidden lg:flex flex-col shrink-0">
          <div class="p-4 border-b border-gray-200/60 dark:border-zinc-800/70 flex justify-between items-center">
            <h3 class="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-mono">Retrieved Context</h3>
          </div>

          <div class="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
            <div>
              <div v-if="chatStore.currentContext.length > 0" class="space-y-2">
                <div 
                  v-for="(source, index) in chatStore.currentContext" 
                  :key="index" 
                  class="p-2.5 bg-gray-50/70 dark:bg-zinc-900/50 rounded-xl border border-gray-100 dark:border-zinc-800/80 hover:border-gray-200 dark:hover:border-zinc-700 transition-colors flex justify-between items-center gap-2 group"
                >
                  <div class="overflow-hidden min-w-0">
                    <p class="text-xs text-gray-900 dark:text-white font-medium mb-0.5 truncate" :title="source.title || source">{{ source.title || source }}</p>
                    <span class="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">Memory / Context Source</span>
                  </div>
                  <button
                    v-if="source.id"
                    @click="router.push({ name: 'editor', params: { id: source.id } })"
                    class="shrink-0 text-xs px-2.5 py-1 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-[#D97757] dark:hover:text-[#D97757] hover:bg-gray-200/60 dark:hover:bg-zinc-800 transition-colors font-medium cursor-pointer"
                  >
                    Open
                  </button>
                </div>
              </div>

              <div v-else class="p-4 bg-gray-50/50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800/50 text-center">
                <p class="text-xs text-gray-400 dark:text-zinc-500 font-mono italic">No active document context.</p>
                <p class="text-[11px] text-gray-400 dark:text-zinc-500 mt-1">Retrieved sources will automatically appear here as the agent responds.</p>
              </div>
            </div>
          </div>
        </aside>
      </transition>

      <ConfirmationModal
        :is-open="showDeleteModal"
        title="Clear History"
        message="Are you sure you want to delete all chat history? This cannot be undone."
        confirm-text="Clear History"
        @confirm="confirmClearHistory"
        @cancel="showDeleteModal = false"
      />
    </div>
</template>
