<template>
  <div class="flex-1 flex flex-col h-full min-h-0 bg-transparent font-sans overflow-hidden transition-colors duration-300">

    <!-- Editor Header (Title & Actions) -->
    <header class="h-14 shrink-0 border-b border-gray-200/60 dark:border-zinc-800 flex items-center justify-between px-6 bg-transparent relative z-10">
       <div class="flex items-center gap-3 flex-1 min-w-0">
          <button @click="goBack" class="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer" title="Go Back">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div class="flex items-center gap-2.5 w-full max-w-2xl min-w-0">
              <span class="text-sm sm:text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">
                {{ isViewMode ? 'View Memory' : (documentId === 'new' ? 'New Memory' : 'Edit Memory') }}
              </span>
              <div class="h-4 w-px bg-gray-200 dark:bg-zinc-700"></div>
              <input 
                v-model="title" 
                :readonly="isViewMode"
                class="bg-transparent border border-transparent focus:border-gray-300 dark:focus:border-zinc-700 hover:border-gray-200 dark:hover:border-zinc-800 rounded-lg px-2 py-1 text-xs sm:text-sm text-gray-700 dark:text-zinc-300 w-full transition-colors font-medium"
                :class="{ 'cursor-default': isViewMode }"
                placeholder="Document Title"
              />
          </div>
       </div>
       <div class="flex items-center gap-2 shrink-0">
           <span v-if="saving" class="flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-500">
             <svg class="animate-spin h-3 w-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg> 
             Saving...
           </span>
           <span v-else-if="lastSaved" class="text-xs text-gray-400 dark:text-zinc-500">Saved {{ lastSaved }}</span>
           <button 
             v-if="documentId !== 'new'"
             @click="deleteDocument"
             class="p-2 sm:p-2.5 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
             title="Delete Memory"
           >
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
           </button>
           <button 
             v-if="isInboxItem"
             @click="approveDocument"
             class="px-4 sm:px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
           >
             Approve
           </button>
            <button 
              v-if="isViewMode"
              @click="isViewMode = false"
              class="px-5 py-2 bg-[#D97757] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all hover:bg-[#C4654A] cursor-pointer shadow-2xs active:scale-95"
            >
              Edit
            </button>
            <button 
              v-if="!isViewMode"
              @click="saveDocument"
              :disabled="saving"
              class="px-5 py-2 bg-[#D97757] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all hover:bg-[#C4654A] disabled:opacity-50 cursor-pointer shadow-2xs active:scale-95"
            >
              Save Changes
            </button>
            <button 
              v-if="!isViewMode && documentId !== 'new'"
              @click="isViewMode = true"
              class="px-4 sm:px-4.5 py-2 border border-gray-200/80 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
       </div>
    </header>

    <!-- Toolbar (Functional for Edit Mode) -->
    <div v-if="!isViewMode" class="h-10 shrink-0 border-b border-gray-200/60 dark:border-zinc-800 bg-gray-50/40 dark:bg-zinc-900/30 flex items-center px-6 gap-3 overflow-x-auto">
        <div class="flex items-center gap-1 text-gray-500 dark:text-zinc-400">
            <button @click="insertText('**', '**')" class="p-1.5 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Bold (Markdown **)">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6V4zm0 8h9a5 5 0 015 5 5 5 0 01-5 5H6v-10z" /></svg>
            </button>
            <button @click="insertText('*', '*')" class="p-1.5 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Italic (Markdown *)">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </button>
             <button @click="insertText('<u>', '</u>')" class="p-1.5 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Underline">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 19h14" /></svg>
            </button>
        </div>
        <div class="h-3.5 w-px bg-gray-200 dark:bg-zinc-700"></div>
        <div class="flex items-center gap-1 text-gray-500 dark:text-zinc-400">
            <button @click="insertText('- ')" class="p-1.5 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors" title="List">
                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
             <button @click="insertText('[', '](url)')" class="p-1.5 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Link">
                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </button>
             <button @click="insertText('![alt](', ')')" class="p-1.5 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Image">
                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
        </div>
         <div class="h-3.5 w-px bg-gray-200 dark:bg-zinc-700"></div>
          <div class="flex items-center gap-1 text-gray-500 dark:text-zinc-400">
             <button @click="insertText('```\n', '\n```')" class="p-1.5 hover:bg-gray-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Code Block">
                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </button>
          </div>
    </div>

    <!-- Main Content Area with Centered Document & Right Inspector -->
    <div class="flex-1 overflow-hidden relative flex min-h-0">
        <!-- Main Document Container - Centered and Flushed -->
        <div class="flex-1 h-full overflow-y-auto overflow-x-hidden custom-scrollbar p-6 sm:p-10 flex justify-center">
             <div class="w-full max-w-3xl min-h-[calc(100vh-10rem)] flex flex-col mb-12">
                <div v-if="isDocumentLoading" class="flex-1 flex flex-col items-center justify-center min-h-[500px]">
                    <LoadingLogo size="lg" />
                    <p class="text-sm text-gray-500 mt-4">Loading memory...</p>
                 </div>
                <MarkdownPreview
                  v-else-if="isViewMode"
                  :content="content || ''"
                  class="cursor-text"
                  @click="handlePreviewClick"
                />
                <vue-monaco-editor
                  v-else
                  v-model:value="content"
                  theme="vs-light"
                  :options="editorOptions"
                  @mount="handleEditorMount"
                  language="markdown"
                  class="flex-1 w-full min-h-[500px] rounded-xl overflow-hidden border border-gray-200/60 dark:border-zinc-800"
                />
            </div>
        </div>

        <!-- Right Inspector Panel -->
        <aside class="w-80 border-l border-gray-200/60 dark:border-zinc-800 bg-transparent hidden lg:flex flex-col shrink-0 overflow-hidden">
             <!-- Inspector Header & Tab Switcher -->
             <div class="px-5 pt-3.5 pb-2.5 border-b border-gray-200/60 dark:border-zinc-800 flex items-center justify-between shrink-0">
               <div class="flex items-center gap-1 bg-gray-100/70 dark:bg-zinc-800/60 p-0.5 rounded-lg w-full">
                 <button
                   @click="activeInspectorTab = 'intelligence'"
                   :class="activeInspectorTab === 'intelligence' ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-2xs font-semibold' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white font-medium'"
                   class="flex-1 py-1 text-xs rounded-md transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                 >
                   <span>Intelligence</span>
                   <span v-if="activeChunk" class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
                 </button>
                 <button
                   @click="activeInspectorTab = 'properties'"
                   :class="activeInspectorTab === 'properties' ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-2xs font-semibold' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white font-medium'"
                   class="flex-1 py-1 text-xs rounded-md transition-all cursor-pointer text-center"
                 >
                   Properties
                 </button>
               </div>
             </div>

             <!-- Tab: Intelligence -->
             <div v-show="activeInspectorTab === 'intelligence'" class="flex-1 overflow-hidden">
               <EnrichmentSidebar :active-chunk="activeChunk" :loading="chunksLoading" />
             </div>

             <!-- Tab: Properties & Tags -->
             <div v-show="activeInspectorTab === 'properties'" class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
                 <!-- Metadata Section -->
                <div>
                    <h4 class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider font-mono mb-4 pb-2 border-b border-gray-100 dark:border-zinc-800/80">Properties</h4>
                    <div class="space-y-4">
                        <div class="grid grid-cols-[70px_1fr] items-center gap-2">
                            <label class="text-xs text-gray-400 dark:text-zinc-500 font-medium">Created</label>
                            <p class="text-xs text-gray-900 dark:text-zinc-200 font-medium truncate">{{ formatDate(docMetadata.created_at) }}</p>
                        </div>
                        <div class="grid grid-cols-[70px_1fr] items-center gap-2">
                            <label class="text-xs text-gray-400 dark:text-zinc-500 font-medium">Source</label>
                            <div>
                                <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100/70 dark:bg-zinc-800/70 text-gray-700 dark:text-zinc-300 border border-gray-200/50 dark:border-zinc-700/60">
                                    {{ docMetadata.source_llm || 'User' }}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-[70px_1fr] items-center gap-2">
                             <label class="text-xs text-gray-400 dark:text-zinc-500 font-medium">Status</label>
                             <div class="flex items-center gap-1.5">
                                 <span class="w-1.5 h-1.5 rounded-full" :class="docMetadata.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'"></span>
                                 <span class="text-xs font-medium capitalize" :class="docMetadata.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
                                     {{ docMetadata.status || 'Active' }}
                                 </span>
                             </div>
                        </div>
                        <div class="grid grid-cols-[70px_1fr] items-center gap-2">
                            <label class="text-xs text-gray-400 dark:text-zinc-500 font-medium">Project</label>
                            <select v-model="selectedProjectId" :disabled="isViewMode" class="text-xs border border-gray-200/60 dark:border-zinc-700 rounded-lg px-2 py-1.5 bg-white dark:bg-zinc-800/80 text-gray-900 dark:text-zinc-200 disabled:opacity-80">
                                <option :value="null">Unassigned</option>
                                <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Tags Section -->
                <div>
                    <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-zinc-800/80">
                        <h4 class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider font-mono">Tags</h4>
                        <button 
                          @click="generateTags" 
                          :disabled="generatingTags || !content || isViewMode"
                          class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-[#D97757] disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1.5 cursor-pointer"
                          title="Auto-generate tags"
                        >
                             <span v-if="generatingTags" class="text-[10px] italic text-gray-400">Generating...</span>
                             <svg v-if="generatingTags" class="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                            <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </button>
                    </div>

                    <!-- View Mode Tags -->
                    <div v-if="isViewMode" class="flex flex-wrap gap-1.5">
                        <span v-for="tag in docMetadata.tags" :key="tag" class="px-2.5 py-1 bg-gray-100/70 dark:bg-zinc-800/70 text-gray-700 dark:text-zinc-300 rounded-lg text-xs font-medium border border-gray-200/50 dark:border-zinc-700/60 transition-colors">
                            #{{ tag }}
                        </span>
                        <span v-if="!docMetadata.tags || !docMetadata.tags.length" class="text-xs text-gray-400 dark:text-zinc-500 italic px-1">No tags added</span>
                    </div>

                    <!-- Edit Mode Tags Input -->
                    <div v-else class="space-y-3">
                        <div class="relative group">
                            <textarea 
                              v-model="tags" 
                              @input="handleTagInput"
                              @blur="hideSuggestionsWithDelay"
                              @keydown.down.prevent="navigateSuggestions(1)"
                              @keydown.up.prevent="navigateSuggestions(-1)"
                              @keydown.enter.prevent="selectActiveSuggestion"
                              class="w-full bg-white dark:bg-zinc-900/60 border border-gray-200/80 dark:border-zinc-700 text-gray-900 dark:text-zinc-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#D97757] focus:border-[#D97757] outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500 resize-none h-24 leading-relaxed"
                              placeholder="Enter tags separated by commas..."
                            ></textarea>
                            
                             <!-- Tag Suggestions -->
                            <div v-if="filteredSuggestions.length > 0 && showSuggestions" class="absolute bottom-full left-0 w-full mb-1 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto overflow-x-hidden p-1">
                                <div 
                                  v-for="(suggestion, index) in filteredSuggestions" 
                                  :key="suggestion"
                                  @click="addTag(suggestion)"
                                   :class="['px-2.5 py-1.5 text-xs rounded-lg cursor-pointer transition-colors', activeSuggestionIndex === index ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800']"
                                >
                                    #{{ suggestion }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </aside>
    </div>


    <ConfirmationModal
      :is-open="showDeleteModal"
      title="Delete Memory"
      message="Are you sure you want to delete this memory? This cannot be undone."
      confirm-text="Delete"
      :loading="isDeletingMemory"
      @confirm="confirmDeleteDocument"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';
import { useToast } from 'vue-toastification';
import api from '../services/api';
import { useThemeStore } from '../stores/theme';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import EnrichmentSidebar from '../components/EnrichmentSidebar.vue';
import LoadingLogo from '@/components/common/LoadingLogo.vue';
import MarkdownPreview from '../components/common/MarkdownPreview.vue';
import { useProjectStore } from '../stores/project';

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();
const toast = useToast();
const projectStore = useProjectStore();

const isInboxItem = ref(false);
const activeInspectorTab = ref('intelligence');

const title = ref('');
const content = ref('');
const tags = ref('');
const allTags = ref([]);
const filteredSuggestions = ref([]);
const showSuggestions = ref(false);
const activeSuggestionIndex = ref(-1);

const saving = ref(false);
const lastSaved = ref(null);
const isViewMode = ref(route.params.id !== 'new');
const documentId = computed(() => route.params.id);
const docMetadata = ref({});
const isDocumentLoading = ref(true);
const selectedProjectId = ref(null);
const normalizeInteractionType = (value) => {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'web_snippet') return 'webpage';
  if (['conversation', 'prompt', 'webpage', 'memory'].includes(normalized)) return normalized;
  return 'memory';
};
const interactionType = ref(normalizeInteractionType(route.query.interaction_type));
const sourceApp = ref(route.query.source_app || null);
const projects = ref([]);
const editorInstance = shallowRef(null);

const fetchProjects = async () => {
    try {
        const response = await api.get('/projects/');
        projects.value = response.data || [];
    } catch (e) {
        console.error('Failed to fetch projects', e);
    }
};
const fetchTags = async () => {
    try {
        const response = await api.get('/memory/tags');
        allTags.value = response.data;
    } catch (e) {
        console.error('Failed to fetch tags', e);
    }
};

const generatingTags = ref(false);

const generateTags = async () => {
    if (!content.value) return;
    generatingTags.value = true;
    try {
        const currentTags = tags.value.split(',').map(t => t.trim()).filter(Boolean);
        
        const response = await api.post('/llm/suggest_tags', {
            content: content.value,
            existing_tags: allTags.value
        });
        
        const suggested = response.data;
        if (suggested && suggested.length > 0) {
            const newTags = [...new Set([...currentTags, ...suggested])];
            tags.value = newTags.join(', ') + ', ';
        } else {
            toast.info('No new tags suggested');
        }
    } catch (e) {
        console.error('Auto-tag failed', e);
        toast.error('Failed to generate tags. Please check your API key in Settings.');
    } finally {
        generatingTags.value = false;
    }
};

const handleTagInput = () => {
    const parts = tags.value.split(',');
    const currentInput = parts[parts.length - 1].trim().toLowerCase();
    
    if (!currentInput) {
        showSuggestions.value = false;
        return;
    }
    
    const usedTags = parts.slice(0, -1).map(t => t.trim().toLowerCase());
    
    filteredSuggestions.value = allTags.value.filter(tag => 
        tag.toLowerCase().includes(currentInput) && 
        !usedTags.includes(tag.toLowerCase()) &&
        tag.toLowerCase() !== currentInput // Don't suggest exact match if already typed
    ).slice(0, 5);
    
    showSuggestions.value = filteredSuggestions.value.length > 0;
    activeSuggestionIndex.value = -1;
};

const addTag = (tag) => {
    const parts = tags.value.split(',');
    parts.pop(); // Remove partial
    parts.push(` ${tag}`);
    tags.value = parts.join(',') + ', ';
    showSuggestions.value = false;
};

const hideSuggestionsWithDelay = () => {
    setTimeout(() => {
        showSuggestions.value = false;
    }, 200);
};

const navigateSuggestions = (direction) => {
    if (!showSuggestions.value) return;
    const len = filteredSuggestions.value.length;
    activeSuggestionIndex.value = (activeSuggestionIndex.value + direction + len) % len;
};

const selectActiveSuggestion = () => {
    if (showSuggestions.value && activeSuggestionIndex.value >= 0) {
        addTag(filteredSuggestions.value[activeSuggestionIndex.value]);
    }
};

const editorOptions = computed(() => ({
  automaticLayout: true,
  minimap: { enabled: false },
  wordWrap: 'on',
  fontSize: 15,
  fontFamily: 'Inter, sans-serif',
  theme: themeStore.isDark ? 'vs-dark' : 'vs-light',
  lineNumbers: 'off',
  padding: { top: 16, bottom: 16 },
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden'
  },
  scrollBeyondLastLine: false,
  readOnly: isViewMode.value,
}));

const handleEditorMount = (editor) => {
  editorInstance.value = editor;
  if (themeStore.isDark) {
    // Force dark theme if needed, usually handled by prop
  }
  
  // Listen for cursor changes
  editor.onDidChangeCursorPosition((e) => {
      const model = editor.getModel();
      if (model) {
          const offset = model.getOffsetAt(e.position);
          cursorPosition.value = offset;
      }
  });
};

const insertText = (prefix, suffix = '') => {
  const editor = editorInstance.value;
  if (!editor) return;

  const selection = editor.getSelection();
  const text = editor.getModel().getValueInRange(selection);
  const newText = prefix + text + suffix;

  editor.executeEdits('toolbar', [{
    range: selection,
    text: newText,
    forceMoveMarkers: true
  }]);
  
  editor.focus();
};

const resolvedId = ref(null);

const fetchDocument = async () => {
  try {
    isDocumentLoading.value = true;
    if (documentId.value === 'new') {
        isDocumentLoading.value = false;
        return;
    }

    // 1. Try fetching from Memory List
    let found = false;
    try {
        const response = await api.get('/memory/');
        let doc = response.data.find(d => String(d.id) === String(documentId.value));
        if (!doc) {
           const numericId = String(documentId.value).split('_').pop();
           doc = response.data.find(d => String(d.id).endsWith(`_${numericId}`));
        }
        
        if (doc) {
            resolvedId.value = doc.id;
            title.value = doc.title;
            content.value = doc.content || '';
            tags.value = Array.isArray(doc.tags) ? doc.tags.join(', ') : (doc.tags || '');
            docMetadata.value = {
                created_at: doc.created_at,
                source_llm: doc.source_llm,
                status: doc.status,
                tags: doc.tags,
                project_id: doc.project_id
            };
            selectedProjectId.value = doc.project_id || null;
            isInboxItem.value = false;
            found = true;
        }
    } catch (e) { console.debug('Not in memory list', e); }

    // 2. If not found, try Inbox
    if (!found) {
        try {
            const inboxRes = await api.get(`/inbox/${documentId.value}`);
            if (inboxRes.data) {
                const doc = inboxRes.data;
                resolvedId.value = doc.id;
                title.value = doc.details || 'Untitled';
                content.value = doc.content || '';
                tags.value = Array.isArray(doc.tags) ? doc.tags.join(', ') : (doc.tags || '');
                docMetadata.value = {
                    created_at: doc.created_at,
                    source_llm: doc.source_llm,
                    status: 'pending',
                    tags: doc.tags,
                    project_id: doc.project_id
                };
                selectedProjectId.value = doc.project_id || null;
                isInboxItem.value = true;
                found = true;
            }
        } catch (e) {
             console.debug('Not in inbox', e);
        }
    }

    if (!found) {
        router.push('/dashboard');
    } else {
        // Fetch Chunks for Enrichment Sidebar
        fetchChunks(resolvedId.value);
    }

  } catch (error) {
    console.error('Error fetching document:', error);
  } finally {
    isDocumentLoading.value = false;
  }
};

const chunks = ref([]);
const chunksLoading = ref(false);

const fetchChunks = async (id) => {
    if (!id) return;
    chunksLoading.value = true;
    try {
        const response = await api.get(`/documents/memory/${id}/chunks`);
        // Calculate offsets
        let currentOffset = 0;
        chunks.value = response.data.map(chunk => {
            const start = currentOffset;
            const length = chunk.text.length;
            const end = start + length;
            // The chunk text might vary slightly from actual editor content due to whitespace normalization in ingestion
            // But strict linear length is our best approximation without complex alignment
            currentOffset = end; 
            return {
                ...chunk,
                startOffset: start,
                endOffset: end
            };
        });
        
        // Set initial active chunk to the first one
        if (chunks.value.length > 0) {
            cursorPosition.value = 0;
        }
    } catch (e) {
        console.error("Failed to fetch chunks", e);
    } finally {
        chunksLoading.value = false;
    }
};

const cursorPosition = ref(0);

const handlePreviewClick = () => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return;
    
    // Get the text of the clicked element (usually a text node within a paragraph)
    let text = selection.anchorNode.textContent;
    if (!text || text.trim().length === 0) return;
    
    // Clean up text and find the first occurrence in the raw markdown content
    const searchString = text.trim();
    if (content.value) {
        const offset = content.value.indexOf(searchString);
        if (offset !== -1) {
            // Update the cursor position to trigger the activeChunk computed property
            cursorPosition.value = offset;
            activeInspectorTab.value = 'intelligence';
        }
    }
};

const activeChunk = computed(() => {
    if (!chunks.value || chunks.value.length === 0) return null;
    
    // Find chunk that contains the cursor position
    const pos = cursorPosition.value;
    const found = chunks.value.find(c => pos >= c.startOffset && pos < c.endOffset);
    
    return found || chunks.value[0]; // Fallback to first
});


const saveDocument = async () => {
  if (!title.value || !title.value.trim()) {
    toast.warning('Please enter a title for this memory');
    return;
  }
  
  saving.value = true;
  try {
    const tagsList = tags.value.split(',').map(t => t.trim()).filter(t => t);
    
    if (documentId.value === 'new') {
      const response = await api.post('/memory/', {
        title: title.value,
        content: content.value,
        tags: tagsList,
        project_id: selectedProjectId.value ? Number(selectedProjectId.value) : null,
        interaction_type: interactionType.value,
        source_app: sourceApp.value
      });
      router.replace(`/editor/mem_${response.data.id}`);
    } else {
      const targetId = resolvedId.value || documentId.value;
      
      if (isInboxItem.value) {
           await api.put(`/inbox/${targetId}`, {
              title: title.value,
              content: content.value
          });
      } else {
          await api.put(`/memory/${targetId}`, {
              title: title.value,
              content: content.value,
              tags: tagsList,
              project_id: selectedProjectId.value ? Number(selectedProjectId.value) : null,
              interaction_type: interactionType.value,
              source_app: sourceApp.value
          });
      }
    }
    toast.success('Memory saved successfully');
    lastSaved.value = new Date().toLocaleTimeString();
    isViewMode.value = true;
    fetchDocument(); // Refresh metadata
  } catch (error) {
    console.error('Error saving document:', error);
    const status = error.response?.status;
    if (status !== 403 && status !== 413) {
        toast.error('Failed to save memory');
    }
  } finally {
    saving.value = false;
  }
};

const approveDocument = async () => {
    if (!confirm('Approve this pending item and move to memory?')) return;
    try {
        const targetId = resolvedId.value || documentId.value;
        await api.post(`/inbox/${targetId}/action`, { action: 'approve' });
        toast.success('Document approved');
        router.push('/inbox');
    } catch (e) {
        console.error('Failed to approve', e);
        const status = e.response?.status;
        if (status !== 403 && status !== 413) {
            toast.error('Failed to approve document');
        }
    }
};

const showDeleteModal = ref(false);
const isDeletingMemory = ref(false);

const deleteDocument = async () => {
  if (documentId.value === 'new') {
    router.push('/dashboard');
    return;
  }
  showDeleteModal.value = true;
};

const confirmDeleteDocument = async () => {
  isDeletingMemory.value = true;
  try {
    const targetId = resolvedId.value || documentId.value;
    // Handle 'mem_' prefix if present in ID but API expects int, or vice versa.
    // Usually API takes the ID passed.
    await api.delete(`/memory/${targetId}`);
    toast.success('Document deleted');
    router.push('/dashboard');
  } catch (error) {
    console.error('Error deleting document:', error);
    const status = error.response?.status;
    if (status !== 403 && status !== 413) {
        toast.error('Failed to delete document'); // Simple feedback
    }
  } finally {
    isDeletingMemory.value = false;
    showDeleteModal.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  } catch (e) {
    return 'Invalid Date';
  }
};

const goBack = () => {
  router.go(-1);
};

// Auto-save every 30 seconds if changed
// Auto-save disabled by user request
onMounted(() => {
  fetchDocument();
  fetchTags();
  fetchProjects();

  if (documentId.value === 'new') {
    selectedProjectId.value = projectStore.currentProjectId || null;
    if (!title.value?.trim()) {
      if (interactionType.value === 'prompt') title.value = 'New Prompt';
      else if (interactionType.value === 'conversation') title.value = 'New Conversation';
      else if (interactionType.value === 'webpage') title.value = 'New Webpage Memory';
      else title.value = 'New Memory';
    }
  }
});

watch(
  () => [route.params.id, route.query.interaction_type, route.query.source_app],
  async ([newId, queryInteractionType, querySourceApp]) => {
    resolvedId.value = null;
    isInboxItem.value = false;
    isViewMode.value = newId !== 'new';
    interactionType.value = normalizeInteractionType(queryInteractionType);
    sourceApp.value = querySourceApp || null;

    if (newId === 'new') {
      title.value = '';
      content.value = '';
      tags.value = '';
      selectedProjectId.value = projectStore.currentProjectId || null;
      docMetadata.value = {};
      if (interactionType.value === 'prompt') title.value = 'New Prompt';
      else if (interactionType.value === 'conversation') title.value = 'New Conversation';
      else if (interactionType.value === 'webpage') title.value = 'New Webpage Memory';
      else title.value = 'New Memory';
      return;
    }

    await fetchDocument();
  }
);

onUnmounted(() => {
  // cleanup
});

</script>



















