<template>
  <div class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-5 lg:px-6 py-6 no-scrollbar flex flex-col min-h-0 overflow-y-auto overflow-x-hidden lg:overflow-hidden">
    <div class="flex-1 min-h-0 flex flex-col h-full w-full">
      <div id="tour-timeline" class="flex-1 min-h-0 flex flex-col overflow-hidden">
        <AIInteractionTimeline 
          ref="timelineRef" 
          :project-id="projectStore.currentProjectId" 
          :focus-today="focusToday" 
          @open-item="openItem" 
          @open-quick-add="handleOpenQuickAdd"
        />
      </div>
    </div>

    <OnboardingOverlay v-if="showOnboardingModal" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import AIInteractionTimeline from '../components/AIInteractionTimeline.vue';
import OnboardingOverlay from '../components/OnboardingOverlay.vue';
import { createTour } from '../tour';
import { useInboxStore } from '../stores/inbox';
import { useAuthStore } from '../stores/auth';
import { useProjectStore } from '../stores/project';
import api from '../services/api';
import chromeLogo from '../assets/chrome-logo-svgrepo-com.svg';
import edgeLogo from '../assets/microsoft-edge-logo.svg';
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
const openQuickCreate = inject('openQuickCreate', null);

const handleOpenQuickAdd = () => {
  if (openQuickCreate) {
    openQuickCreate();
  } else {
    window.dispatchEvent(new CustomEvent('open-quick-add'));
  }
};

const isMobileSidebarOpen = ref(false);
const isWorkspaceMenuOpen = ref(false);
const newWorkspaceName = ref('');
const workspaceDropdownRef = ref(null);

const currentProjectName = computed(() => {
  if (projectStore.currentProjectId === null) return 'All Spaces';
  const proj = projectStore.projects.find((p) => p.id === projectStore.currentProjectId);
  return proj ? proj.name : 'All Spaces';
});

const selectWorkspace = (id) => {
  projectStore.selectProject(id);
  isWorkspaceMenuOpen.value = false;
};

const handleCreateWorkspace = async () => {
  const name = newWorkspaceName.value.trim();
  if (!name) return;
  try {
    const newProj = await projectStore.createProject(name);
    if (newProj?.id) {
      projectStore.selectProject(newProj.id);
    }
    newWorkspaceName.value = '';
    isWorkspaceMenuOpen.value = false;
    toast.success('Space created');
  } catch (err) {
    toast.error('Failed to create space');
  }
};

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
});

// Stop polling when component unmounts
onUnmounted(() => {
  stopVerificationPolling();
});

// Watch: if verification is detected via any means, stop polling
watch(isVerified, (verified) => {
  if (verified) stopVerificationPolling();
});

watch(() => projectStore.currentProjectId, async () => {
  await inboxStore.fetchInbox();
});
</script>

