<template>
  <div class="h-screen flex flex-col transition-colors duration-300 font-sans overflow-hidden">
    <NavBar />

    <main class="flex-1 overflow-y-auto lg:overflow-hidden w-full pt-6 pb-10 lg:pb-6 no-scrollbar">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col min-h-full lg:h-full lg:min-h-0">
        <div class="mb-6 shrink-0" id="tour-welcome">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Good {{ timeOfDay }}, {{ user?.name || 'User' }}</h1>
          <p class="mt-1 text-gray-500 dark:text-text-secondary">This is where your AI work lives.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          <div class="lg:col-span-8 min-h-0">
            <div id="tour-timeline" class="bg-white dark:bg-surface rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden h-[512px] lg:h-full min-h-0">
              <AIInteractionTimeline ref="timelineRef" :project-id="projectStore.currentProjectId" :focus-today="focusToday" @open-item="openItem" />
            </div>
          </div>

          <div class="lg:col-span-4 min-h-0 flex flex-col gap-6">
            <div class="bg-white dark:bg-surface rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden h-[400px] lg:flex-1 min-h-0">
              <DashboardInboxList />
            </div>

            <!-- Integration Suggestions Slider -->
            <div class="bg-white dark:bg-surface rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden shrink-0">
              <!-- Content Body -->
              <div class="overflow-hidden relative w-full">
                <div 
                  class="flex transition-transform duration-300 ease-in-out"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <div 
                    v-for="(slide, slideIdx) in slides" 
                    :key="slideIdx" 
                    class="w-full shrink-0 p-6 flex flex-col gap-4"
                  >
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">{{ slide.title }}</span>
                        <span class="text-[10px] font-mono text-gray-400 dark:text-text-muted bg-gray-100 dark:bg-surface-2 px-1.5 py-0.5 rounded">{{ slideIdx + 1 }}/{{ slides.length }}</span>
                      </div>
                      
                      <!-- Inline controls inside slide header -->
                      <div class="flex items-center gap-1 shrink-0 select-none">
                        <button 
                          @click.stop.prevent="prevSlide" 
                          class="p-1 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button 
                          @click.stop.prevent="nextSlide" 
                          class="p-1 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>
                    
                    <p class="text-xs text-gray-500 dark:text-text-secondary leading-relaxed -mt-1">{{ slide.desc }}</p>

                    <div class="flex flex-col gap-3">
                      <router-link 
                        v-for="item in slide.items" 
                        :key="item.id" 
                        to="/integrations" 
                        class="group flex items-center justify-between p-2.5 bg-gray-50/50 dark:bg-zinc-900/30 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-primary/50 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
                      >
                        <div class="flex items-center gap-3 min-w-0">
                          <div class="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/80 flex items-center justify-center shrink-0 shadow-sm">
                            <img :src="item.icon" class="w-4.5 h-4.5 object-contain" :class="{'invert': item.invert, 'dark:invert': item.darkInvert}" :alt="item.name + ' icon'" />
                          </div>
                          <div class="flex flex-col min-w-0">
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ item.name }}</span>
                            <span class="text-[10px] text-gray-400 dark:text-text-muted truncate pr-2">{{ item.desc }}</span>
                          </div>
                        </div>
                        <svg class="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors mr-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Footer / Indicator dot selectors -->
              <div class="p-6 pt-0 border-t border-gray-50 dark:border-zinc-800 flex justify-between items-center bg-gray-50/20 dark:bg-zinc-900/10">
                <div class="flex gap-1.5 select-none">
                  <span 
                    v-for="(_, dotIdx) in slides" 
                    :key="dotIdx" 
                    @click="setSlide(dotIdx)" 
                    class="w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300"
                    :class="currentSlide === dotIdx ? 'bg-primary w-3' : 'bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300'"
                  ></span>
                </div>
                
                <router-link to="/integrations" class="text-xs font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1">
                  View all integrations &rarr;
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <QuickActions @open-review="showDailyReview = true" />
    <DailyReviewModal v-if="showDailyReview" @close="showDailyReview = false" />

    <OnboardingOverlay v-if="showOnboardingModal" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import NavBar from '../components/NavBar.vue';
import QuickActions from '../components/QuickActions.vue';
import DashboardInboxList from '../components/DashboardInboxList.vue';
import DailyReviewModal from '../components/DailyReviewModal.vue';
import AIInteractionTimeline from '../components/AIInteractionTimeline.vue';
import OnboardingOverlay from '../components/OnboardingOverlay.vue';
import { createTour } from '../tour';
import { useInboxStore } from '../stores/inbox';
import { useAuthStore } from '../stores/auth';
import { useProjectStore } from '../stores/project';
import api from '../services/api';
import chromeLogo from '../assets/chrome-logo-svgrepo-com.svg';
import edgeLogo from '../assets/microsoft-edge-logo.svg';
import vscodeIcon from '../assets/vscode.svg';
import claudeCodeIcon from '../assets/claudecode-color.svg';
import openclawIcon from '../assets/openclaw-color.svg';
import notionIcon from '../assets/notion-svgrepo-com.svg';
import gdriveIcon from '../assets/google-drive.svg';
import {
  migrateOnboardingLegacyState,
  readScopedBoolean,
  readScopedString,
  writeScopedBoolean,
  writeScopedString,
} from '../utils/onboardingState';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const inboxStore = useInboxStore();
const authStore = useAuthStore();
const projectStore = useProjectStore();

const user = computed(() => authStore.user);
const isVerified = computed(() => !!user.value?.is_verified);
const showDailyReview = ref(false);
const timelineRef = ref(null);
const resendingVerification = ref(false);
const checkingVerification = ref(false);
const verificationPollActive = ref(false);
const verificationCountdown = ref(8);
let _verificationPollTimer = null;
let _verificationCountdownTimer = null;

const onboardingStep = ref(1);
const selectedType = ref('');
const firstActionDone = ref(false);
const firstActionStartedAt = ref('');
const hasCompletedTour = ref(false);
const extensionChoice = ref('');

// Integration Suggestions Slider
const currentSlide = ref(0);
const slides = [
  {
    title: 'IDE & Editor Extensions',
    desc: 'Capture convention changes, codebase decisions, and context directly from your workspace.',
    items: [
      { id: 'cursor', name: 'Cursor', desc: 'One-click MCP install in Cursor', icon: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/cursor.svg', darkInvert: true },
      { id: 'vscode', name: 'VS Code', desc: 'Native MCP support for VS Code', icon: vscodeIcon }
    ]
  },
  {
    title: 'CLI & Agents',
    desc: 'Integrate persistent context into autonomous developers and terminal runtimes.',
    items: [
      { id: 'claude-code', name: 'Claude Code', desc: 'Convention-aware context retrieval for Claude Code', icon: claudeCodeIcon },
      { id: 'openclaw', name: 'OpenClaw', desc: 'Agent memory backplane for OpenClaw session loops', icon: openclawIcon }
    ]
  },
  {
    title: 'Knowledge Bases',
    desc: 'Sync collaborative documentation and pages to your memory index.',
    items: [
      { id: 'notion', name: 'Notion Workspace', desc: 'Sync docs, databases, and page indexes', icon: notionIcon, darkInvert: true },
      { id: 'gdrive', name: 'Google Drive', desc: 'Index your Docs, Sheets, and Slides', icon: gdriveIcon }
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
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const setSlide = (idx) => {
  currentSlide.value = idx;
  startSlideTimer();
};

const aiWorkTypes = [
  { id: 'conversation', label: 'Conversation', description: 'Save an AI chat exchange.' },
  { id: 'prompt', label: 'Prompt', description: 'Store a reusable prompt template.' },
  { id: 'webpage', label: 'Webpage', description: 'Ingest a web page as memory context.' },
  { id: 'memory', label: 'Memory', description: 'Create a standalone memory note.' },
];

const extensionOptions = [
  {
    id: 'chrome',
    label: 'I use Chrome',
    description: 'Install from the Chrome Web Store.',
    logo: chromeLogo,
    url: 'https://chromewebstore.google.com/detail/memwyre/biplnkodgfdgejgblohhjeckiclfpekn',
  },
  {
    id: 'edge',
    label: 'I use Edge',
    description: 'Install from Microsoft Edge Add-ons.',
    logo: edgeLogo,
    url: 'https://microsoftedge.microsoft.com/addons/detail/memwyre/ihibkjgaiafhhbjmchmkphlkomodkmpd',
  },
];

const focusToday = computed(() => route.query.view === 'today');
const showOnboardingModal = computed(() => authStore.isAuthenticated && (!authStore.hasCompletedOnboarding || route.query.onboarding === 'true'));

const selectedTypeLabel = computed(
  () => aiWorkTypes.find((item) => item.id === selectedType.value)?.label || 'AI work',
);

const selectedTypeHint = computed(() => {
  if (selectedType.value === 'webpage') return 'This opens the existing webpage ingestion flow.';
  if (selectedType.value === 'prompt') return 'The editor will open with prompt type selected.';
  if (selectedType.value === 'conversation') return 'The editor will open with conversation type selected.';
  return 'The editor will open with memory type selected.';
});

const progressPercent = computed(() => {
  const step = Math.max(1, Math.min(3, onboardingStep.value || 1));
  return Math.round((step / 3) * 100);
});

const maxUnlockedStep = computed(() => {
  if (!selectedType.value) return 1;
  if (!extensionChoice.value) return 2;
  return 3;
});

const canRunPrimaryAction = computed(() => {
  if (onboardingStep.value === 1) return !!selectedType.value;
  if (onboardingStep.value === 2) return !!extensionChoice.value;
  return !!selectedType.value && !!extensionChoice.value;
});

const primaryActionLabel = computed(() => {
  if (onboardingStep.value === 1) return 'Continue';
  if (onboardingStep.value === 2) return 'Continue';
  if (!firstActionDone.value) return 'Start first action';
  return 'Finish onboarding';
});

const onboardingStorageReady = computed(() => !!user.value?.id && typeof localStorage !== 'undefined');

const onboardingNow = () => new Date().toISOString().replace('Z', '');

const persistOnboardingStep = () => {
  if (!onboardingStorageReady.value) return;
  writeScopedString(localStorage, user.value.id, 'step', onboardingStep.value);
};

const setStep = (step) => {
  const target = Math.max(1, Math.min(3, Number(step) || 1));
  if (target > maxUnlockedStep.value) return;
  onboardingStep.value = target;
  persistOnboardingStep();
};

const previousStep = () => {
  setStep(onboardingStep.value - 1);
};

const selectType = (typeId) => {
  selectedType.value = typeId;
  if (!onboardingStorageReady.value) return;
  writeScopedString(localStorage, user.value.id, 'selected_type', typeId);
};

const setExtensionChoice = (choice) => {
  extensionChoice.value = choice;
  if (!onboardingStorageReady.value) return;
  writeScopedString(localStorage, user.value.id, 'extension_choice', choice);
};

const handleExtensionChoice = (choice) => {
  if (!choice) return;
  setExtensionChoice(choice.id);
  if (choice.url) {
    window.open(choice.url, '_blank', 'noopener,noreferrer');
  }
};

const hydrateOnboardingState = () => {
  if (!onboardingStorageReady.value) return;

  migrateOnboardingLegacyState(localStorage, user.value.id);

  const storedType = readScopedString(localStorage, user.value.id, 'selected_type', '');
  selectedType.value = aiWorkTypes.some((item) => item.id === storedType) ? storedType : '';
  firstActionDone.value = readScopedBoolean(localStorage, user.value.id, 'first_action_done', false);
  firstActionStartedAt.value = readScopedString(localStorage, user.value.id, 'first_action_started_at', '');
  hasCompletedTour.value = readScopedBoolean(localStorage, user.value.id, 'tour_completed', false);
  extensionChoice.value = readScopedString(localStorage, user.value.id, 'extension_choice', '');

  const rawStep = Number.parseInt(readScopedString(localStorage, user.value.id, 'step', '1'), 10);
  onboardingStep.value = Number.isFinite(rawStep) ? rawStep : 1;

  if (!selectedType.value) onboardingStep.value = 1;
  else if (!extensionChoice.value) onboardingStep.value = Math.max(2, onboardingStep.value);
  else onboardingStep.value = 3;

  persistOnboardingStep();
};

const runTour = () => {
  setTimeout(() => {
    const driver = createTour();
    driver.drive();
    if (onboardingStorageReady.value) {
      writeScopedBoolean(localStorage, user.value.id, 'tour_completed', true);
      writeScopedBoolean(localStorage, user.value.id, 'tour_requested', false);
    }
    hasCompletedTour.value = true;
  }, 250);
};

const startTour = async () => {
  if (onboardingStorageReady.value) {
    writeScopedBoolean(localStorage, user.value.id, 'tour_completed', false);
    writeScopedBoolean(localStorage, user.value.id, 'tour_requested', true);
  }
  hasCompletedTour.value = false;
  // Close the modal first so the tour can highlight elements underneath
  await authStore.completeOnboarding();
  runTour();
};

const refreshFirstActionCompletion = async () => {
  if (!showOnboardingModal.value || !isVerified.value || !selectedType.value) return;
  if (firstActionDone.value) return;

  try {
    const params = {
      view: 'timeline',
      limit: 1,
      interaction_type: selectedType.value,
    };
    if (firstActionStartedAt.value) params.date_from = firstActionStartedAt.value;

    const response = await api.get('/memory/', { params });
    const hasCreatedItem = (response.data || []).some((item) => String(item.id || '').startsWith('mem_'));
    if (!hasCreatedItem) return;

    firstActionDone.value = true;
    if (onboardingStorageReady.value) {
      writeScopedBoolean(localStorage, user.value.id, 'first_action_done', true);
    }
    toast.success('First action completed.');
  } catch (error) {
    console.error('Failed to verify onboarding first action completion', error);
  }
};

const startFirstAction = () => {
  if (!selectedType.value || !onboardingStorageReady.value) return;

  firstActionStartedAt.value = onboardingNow();
  writeScopedString(localStorage, user.value.id, 'first_action_started_at', firstActionStartedAt.value);
  writeScopedString(localStorage, user.value.id, 'selected_type', selectedType.value);

  if (selectedType.value === 'webpage') {
    router.push({
      path: '/dashboard',
      query: {
        ...route.query,
        quick_add: 'webpage',
      },
    });
    return;
  }

  router.push(`/editor/new?interaction_type=${selectedType.value}&source_app=web-app`);
};

const completeOnboarding = async (message, requireReady = true) => {
  if (requireReady && (!selectedType.value || !extensionChoice.value || !firstActionDone.value)) return;
  await authStore.completeOnboarding();
  if (onboardingStorageReady.value) {
    writeScopedBoolean(localStorage, user.value.id, 'tour_requested', false);
  }
  if (message) toast.success(message);
};

const skipOnboarding = async () => {
  await completeOnboarding('Onboarding skipped for now.', false);
};

const handlePrimaryAction = async () => {
  if (onboardingStep.value === 1 && selectedType.value) {
    onboardingStep.value = 2;
    persistOnboardingStep();
    return;
  }

  if (onboardingStep.value === 2 && extensionChoice.value) {
    onboardingStep.value = 3;
    persistOnboardingStep();
    return;
  }

  if (onboardingStep.value === 3) {
    if (!firstActionDone.value) {
      startFirstAction();
      return;
    }
    completeOnboarding('Onboarding completed.');
  }
};

const timeOfDay = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
});

const openItem = (item) => {
  if (!item?.id) return;
  router.push(`/editor/${item.id}`);
};

inboxStore.fetchInbox();
inboxStore.connectWebSocket();

const resendVerification = async () => {
  if (resendingVerification.value) return;
  resendingVerification.value = true;
  try {
    await api.post('/auth/resend-verification');
    toast.success('Verification email sent. Please check your inbox.');
    startVerificationPolling();
  } catch (err) {
    toast.error(err.response?.data?.detail || 'Failed to resend verification email.');
  } finally {
    resendingVerification.value = false;
  }
};

const checkVerificationStatus = async () => {
  if (checkingVerification.value) return;
  checkingVerification.value = true;
  try {
    await authStore.fetchUser();
    if (isVerified.value) {
      stopVerificationPolling();
      toast.success('Email verified! Continuing onboarding.');
    } else {
      toast.info('Email not yet verified. Please check your inbox.');
    }
  } catch (err) {
    toast.error('Failed to check verification status.');
  } finally {
    checkingVerification.value = false;
  }
};

const startVerificationPolling = () => {
  if (verificationPollActive.value) return;
  verificationPollActive.value = true;
  verificationCountdown.value = 8;

  _verificationCountdownTimer = setInterval(() => {
    verificationCountdown.value -= 1;
    if (verificationCountdown.value <= 0) {
      verificationCountdown.value = 8;
    }
  }, 1000);

  _verificationPollTimer = setInterval(async () => {
    if (isVerified.value) {
      stopVerificationPolling();
      return;
    }
    try {
      await authStore.fetchUser();
      if (isVerified.value) {
        stopVerificationPolling();
        toast.success('Email verified! Continuing onboarding.');
      }
    } catch (e) { /* silent */ }
  }, 8000);
};

const stopVerificationPolling = () => {
  verificationPollActive.value = false;
  clearInterval(_verificationPollTimer);
  clearInterval(_verificationCountdownTimer);
  _verificationPollTimer = null;
  _verificationCountdownTimer = null;
};

watch(
  () => user.value?.id,
  () => {
    hydrateOnboardingState();
    refreshFirstActionCompletion();
  },
);

watch(
  () => route.fullPath,
  () => {
    refreshFirstActionCompletion();
  },
);

onMounted(() => {
  hydrateOnboardingState();
  if (onboardingStorageReady.value && readScopedBoolean(localStorage, user.value.id, 'tour_requested', false)) {
    runTour();
  }
  refreshFirstActionCompletion();
  // Start polling for email verification if modal is shown and not yet verified
  if (showOnboardingModal.value && !isVerified.value) {
    startVerificationPolling();
  }
  startSlideTimer();
});

// Stop polling when component unmounts
onUnmounted(() => {
  stopVerificationPolling();
  stopSlideTimer();
});

// Watch: if verification is detected via any means, stop polling
watch(isVerified, (verified) => {
  if (verified) stopVerificationPolling();
});

watch(() => projectStore.currentProjectId, async () => {
  await inboxStore.fetchInbox();
});
</script>

