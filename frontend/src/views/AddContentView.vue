<template>
  <div class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-5 lg:px-6 py-6 no-scrollbar flex flex-col min-h-0 overflow-y-auto overflow-x-hidden">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 shrink-0">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Add Context</h2>
        <p class="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Choose a method to add context, memories, articles, and documents to your Brain Vault.
        </p>
      </div>

      <!-- Current Workspace Destination Pill -->
      <div class="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-gray-100 dark:bg-zinc-800/80 border border-gray-200/80 dark:border-zinc-700/70 text-xs text-gray-600 dark:text-zinc-300 sm:mt-1">
        <svg class="w-3.5 h-3.5 text-gray-900 dark:text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <span class="font-medium">Saving to:</span>
        <span class="font-semibold text-gray-900 dark:text-white max-w-[140px] truncate">{{ currentWorkspaceName }}</span>
      </div>
    </div>

    <!-- Main Ingestion Methods Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      
      <!-- Left Column: Write a Memory & Ingest Webpage (7 cols on lg) -->
      <div class="lg:col-span-6 flex flex-col gap-6">
        
        <!-- Card 1: Write a Memory -->
        <div class="border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-xs group">
          <div>
            <div class="flex items-start gap-4 mb-3">
              <div class="p-2.5 h-11 w-11 shrink-0 rounded-xl bg-gray-100 dark:bg-zinc-800/80 border border-gray-200/60 dark:border-zinc-700/60 text-gray-700 dark:text-zinc-300 flex items-center justify-center group-hover:text-black dark:group-hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div class="min-w-0">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white">Write a Memory</h3>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Create a new memory in the editor with markdown formatting, live preview, and semantic indexing.
                </p>
              </div>
            </div>

            <!-- Highlights -->
            <div class="flex flex-wrap gap-1.5 my-3 pl-0 sm:pl-15">
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">Markdown</span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">Auto-Indexing</span>
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">Context Search</span>
            </div>
          </div>

          <div class="mt-2 pt-3 border-t border-gray-100 dark:border-zinc-800/80">
            <button 
              @click="navigateToEditor" 
              class="w-full py-2.5 px-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white rounded-xl transition-all font-semibold text-xs sm:text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-md"
            >
              <span>Open Editor</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Card 2: Ingest Webpage -->
        <div class="border border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-[#121214] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-xs group">
          <div>
            <div class="flex items-start gap-4 mb-3">
              <div class="p-2.5 h-11 w-11 shrink-0 rounded-xl bg-gray-100 dark:bg-zinc-800/80 border border-gray-200/60 dark:border-zinc-700/60 text-gray-700 dark:text-zinc-300 flex items-center justify-center group-hover:text-black dark:group-hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div class="min-w-0">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white">Ingest Webpage</h3>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Extract and save articles, blog posts, documentation links, or YouTube video transcripts.
                </p>
              </div>
            </div>

            <!-- URL Input Box with Action Button -->
            <div class="flex gap-2 mt-4">
              <div class="relative flex-grow">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400 dark:text-zinc-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a2 2 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input 
                  v-model="urlInput" 
                  type="url" 
                  class="block w-full pl-10 pr-8 py-2.5 border border-gray-200 dark:border-zinc-700/80 rounded-xl focus:outline-none focus:border-gray-900 dark:focus:border-white focus:ring-1 focus:ring-gray-900/20 dark:focus:ring-white/20 bg-gray-50/60 dark:bg-zinc-900/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 text-xs sm:text-sm transition-all" 
                  placeholder="https://example.com/article"
                  @keyup.enter="ingestUrl"
                  @input="handleWebpageUrlChange"
                />
                <button
                  v-if="urlInput"
                  @click="clearUrl"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 p-0.5 cursor-pointer"
                  title="Clear input"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <button
                @click="ingestUrl"
                :disabled="!urlInput || uploadingUrl"
                class="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <svg v-if="uploadingUrl" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ uploadingUrl ? 'Ingesting...' : 'Ingest' }}</span>
              </button>
            </div>

            <!-- Ingestion Status & Preview -->
            <div class="mt-2.5 min-h-[22px] flex items-center justify-between">
              <div v-if="webpagePreview.loading" class="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                <LoadingLogo size="xs" />
                <span>Fetching page info...</span>
              </div>
              <div v-else-if="webpagePreview.url" class="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium truncate max-w-full">
                <span class="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                <span class="truncate">Ready: {{ webpagePreview.title }}</span>
              </div>
              <p v-else class="text-xs text-gray-400 dark:text-zinc-500">
                Supports articles, blog posts, news, and YouTube video links.
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Document Upload Zone (6 cols on lg) -->
      <div class="lg:col-span-6 flex flex-col">
        <div 
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          :class="[
            'h-full min-h-[320px] lg:min-h-full border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all cursor-pointer relative',
            isDragging 
              ? 'border-gray-900 bg-gray-900/5 dark:border-white dark:bg-white/10 scale-[1.005]' 
              : 'border-gray-200/90 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-white/60 dark:bg-[#121214]/60'
          ]"
          @click="triggerFileInput"
        >
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileChange" 
            class="hidden" 
            accept=".pdf,.docx,.txt,.md"
          />
          
          <!-- Default Ready State -->
          <template v-if="!selectedFile && !uploadingFile && !fileSuccess">
            <div class="p-4 rounded-2xl bg-gray-100 dark:bg-zinc-800/80 text-gray-500 dark:text-zinc-400 mb-4 shadow-2xs group-hover:scale-105 transition-transform">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 class="text-base font-semibold text-gray-900 dark:text-white text-center">Upload Files</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1.5 text-center max-w-xs">
              Drag & drop files here, or click to browse from your device
            </p>
            <div class="flex items-center gap-2 mt-4">
              <span class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
                PDF, DOCX, TXT, MD
              </span>
              <span class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">
                Max 10MB
              </span>
            </div>
          </template>

          <!-- Uploading State -->
          <div v-else-if="uploadingFile" class="flex flex-col items-center w-full max-w-xs text-center py-6" @click.stop>
            <LoadingLogo size="lg" />
            <span class="text-sm font-semibold text-gray-900 dark:text-white mt-4">Uploading and processing document...</span>
            <span class="text-xs text-gray-500 dark:text-zinc-400 mt-1">Chunking and embedding content for your vault</span>
          </div>

          <!-- File Selected / Upload Success State -->
          <div v-else class="w-full max-w-md px-2" @click.stop>
            <div class="bg-gray-100 dark:bg-zinc-800 border border-gray-200/80 dark:border-zinc-700/80 rounded-xl p-4 flex items-center justify-between shadow-2xs">
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="p-2.5 rounded-lg bg-white dark:bg-zinc-700 text-gray-700 dark:text-zinc-200 shrink-0 shadow-2xs">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="min-w-0 flex-grow text-left">
                  <p class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {{ selectedFile ? selectedFile.name : 'document.pdf' }}
                  </p>
                  <p class="text-[11px] text-gray-500 dark:text-zinc-400 mt-0.5">
                    {{ selectedFile ? formatSize(selectedFile.size) : 'Ready' }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-1 shrink-0">
                <button 
                  v-if="!fileSuccess"
                  @click="clearFile" 
                  class="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <div v-else class="w-7 h-7 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Success Confirmation & Action Buttons -->
            <div v-if="fileSuccess" class="mt-4 flex flex-col items-center">
              <p class="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium text-center">
                File processed and added to your vault successfully!
              </p>
              <div class="flex items-center gap-3 mt-3">
                <button
                  @click="clearFile"
                  class="px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
                >
                  Upload another file
                </button>
                <router-link
                  to="/memories"
                  class="px-3.5 py-1.5 text-xs font-semibold text-white bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-lg transition-colors shadow-2xs"
                >
                  View in Timeline
                </router-link>
              </div>
            </div>

            <!-- Upload Action Button if file is selected but not yet uploaded -->
            <div v-else-if="selectedFile && !uploadingFile" class="mt-4 flex justify-end">
              <button
                @click="uploadFile"
                class="w-full py-2.5 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Upload & Ingest</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Integrations & Auto-Ingestion Footer Banner -->
    <div class="border border-gray-200/80 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Looking for continuous background sync?</h4>
          <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
            Connect your IDE (Cursor, VS Code), Notion workspace, or Chrome extension to ingest knowledge automatically.
          </p>
        </div>
      </div>

      <router-link
        to="/integrations"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white transition-colors shrink-0 self-start sm:self-auto shadow-2xs"
      >
        <span>Explore Integrations</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useProjectStore } from '../stores/project';
import api from '../services/api';
import LoadingLogo from '@/components/common/LoadingLogo.vue';

const router = useRouter();
const toast = useToast();
const projectStore = useProjectStore();

// Workspace display
const currentWorkspaceName = computed(() => {
  if (projectStore.currentProjectId === null) return 'All Spaces';
  if (!projectStore.projects.length) return 'All Spaces';
  const proj = projectStore.projects.find(p => p.id === projectStore.currentProjectId);
  return proj?.name || 'All Spaces';
});

// 1. Write a Memory
const navigateToEditor = () => {
  router.push('/editor/new');
};

// 2. Webpage & YouTube Ingestion
const urlInput = ref('');
const uploadingUrl = ref(false);
const webpagePreview = ref({
  url: null,
  domain: null,
  favicon: null,
  title: null,
  loading: false
});

let urlDebounceTimer = null;

const extractYouTubeId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const handleWebpageUrlChange = () => {
  clearTimeout(urlDebounceTimer);
  
  const url = urlInput.value.trim();
  if (!url || !url.startsWith('http')) {
    webpagePreview.value = { url: null, domain: null, favicon: null, title: null, loading: false };
    return;
  }
  
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  if (isYouTube) {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      webpagePreview.value = {
        url: url,
        domain: 'youtube.com',
        favicon: `https://www.google.com/s2/favicons?sz=64&domain=youtube.com`,
        title: 'YouTube Video Link',
        loading: false
      };
    }
    return;
  }

  urlDebounceTimer = setTimeout(() => {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      webpagePreview.value = {
        url: url,
        domain: domain,
        favicon: `https://www.google.com/s2/favicons?sz=64&domain=${domain}`,
        title: domain,
        loading: false
      };
    } catch (e) {
      webpagePreview.value = { url: null, domain: null, favicon: null, title: null, loading: false };
    }
  }, 300);
};

const clearUrl = () => {
  urlInput.value = '';
  webpagePreview.value = { url: null, domain: null, favicon: null, title: null, loading: false };
};

const ingestUrl = async () => {
  const url = urlInput.value.trim();
  if (!url || !url.startsWith('http')) {
    toast.error('Please enter a valid URL starting with http:// or https://');
    return;
  }

  uploadingUrl.value = true;
  try {
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    const payload = { url };
    if (projectStore.currentProjectId) {
      payload.project_id = projectStore.currentProjectId;
    }

    if (isYouTube) {
      await api.post('/documents/upload-youtube', payload);
      toast.success('YouTube video transcript queued for ingestion');
    } else {
      payload.tags = ['web-import'];
      await api.post('/ingest/url', payload);
      toast.success('Webpage queued for ingestion');
    }

    clearUrl();
  } catch (error) {
    console.error(error);
    const status = error.response?.status;
    if (status !== 403 && status !== 413) {
      toast.error('Ingestion failed: ' + (error.response?.data?.detail || error.message));
    }
  } finally {
    uploadingUrl.value = false;
  }
};

// 3. File Upload
const fileInput = ref(null);
const selectedFile = ref(null);
const uploadingFile = ref(false);
const fileSuccess = ref(false);
const isDragging = ref(false);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = (e) => {
  const files = e.target.files;
  if (files && files.length) {
    processSelectedFile(files[0]);
  }
};

const handleDrop = (e) => {
  isDragging.value = false;
  const files = e.dataTransfer.files;
  if (files && files.length) {
    processSelectedFile(files[0]);
  }
};

const processSelectedFile = (file) => {
  selectedFile.value = file;
  fileSuccess.value = false;
  // Automatically trigger upload like the modal did
  uploadFile();
};

const clearFile = () => {
  selectedFile.value = null;
  fileSuccess.value = false;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const uploadFile = async () => {
  if (!selectedFile.value) return;

  uploadingFile.value = true;
  fileSuccess.value = false;

  try {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const params = {};
    if (projectStore.currentProjectId) {
      params.project_id = projectStore.currentProjectId;
    }

    await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params
    });

    fileSuccess.value = true;
    toast.success('Document uploaded and processed successfully');
  } catch (error) {
    console.error(error);
    const status = error.response?.status;
    if (status !== 403 && status !== 413) {
      toast.error('Upload failed: ' + (error.response?.data?.detail || error.message));
    }
  } finally {
    uploadingFile.value = false;
  }
};
</script>
