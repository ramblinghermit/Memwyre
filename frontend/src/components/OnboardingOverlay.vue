<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[2000] bg-zinc-950 text-white flex flex-col justify-between overflow-hidden selection:bg-white selection:text-zinc-900 font-sans">
      
      <!-- Background Patterns (Clipped to viewport) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#71717a_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
        <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5" />
        <div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-white/5" />
      </div>

      <!-- Top Header Navigation -->
      <header class="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between shrink-0">
        <!-- Landing Page Memwyre Logo -->
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Memwyre" class="h-8 w-auto invert transition-transform duration-300" />
        </div>

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span class="text-white font-semibold">{{ String(currentStep).padStart(2, '0') }}</span>
            <span>/</span>
            <span>04</span>
          </div>

          <!-- Skip button only visible on final step (Actions screen) -->
          <button
            v-if="currentStep === 4"
            @click="skipOnboarding"
            class="text-xs text-zinc-400 hover:text-white font-medium transition-colors px-3 py-1.5 rounded-lg border border-transparent hover:border-white/10"
          >
            Skip to Vault →
          </button>
        </div>
      </header>

      <!-- Main Step Content Viewport -->
      <main class="relative z-10 flex-1 w-full max-w-3xl mx-auto px-6 py-4 flex flex-col justify-center overflow-y-auto custom-scrollbar">
        
        <!-- STEP 1: Primary Role & Purpose -->
        <div v-if="currentStep === 1" class="space-y-8 animate-in fade-in zoom-in-98 duration-300">
          <div class="text-center space-y-3">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Step 1 — Role</span>
            <h2 class="text-2xl sm:text-4xl font-semibold tracking-tight text-white">What is your primary AI workflow?</h2>
            <p class="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Select your main focus so we can customize your context vault & shortcuts.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <button
              v-for="role in roles"
              :key="role.id"
              @click="selectedRole = role.id"
              class="group relative p-5 rounded-2xl border text-left transition-all duration-200 backdrop-blur-md flex items-start gap-4"
              :class="[
                selectedRole === role.id
                  ? 'border-white bg-white/10 shadow-lg shadow-white/5 ring-1 ring-white/20'
                  : 'border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-white/20'
              ]"
            >
              <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="role.iconPath" />
                </svg>
              </div>
              <div class="space-y-1 min-w-0 flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-white tracking-tight">{{ role.title }}</h3>
                  <div
                    class="w-4 h-4 rounded-full border flex items-center justify-center transition-colors"
                    :class="selectedRole === role.id ? 'border-white bg-white' : 'border-white/20'"
                  >
                    <div v-if="selectedRole === role.id" class="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                  </div>
                </div>
                <p class="text-xs text-zinc-400 leading-relaxed font-normal">{{ role.desc }}</p>
              </div>
            </button>
          </div>
        </div>

        <!-- STEP 2: AI Toolstack Selection (Original SVG Asset Logos) -->
        <div v-else-if="currentStep === 2" class="space-y-8 animate-in fade-in zoom-in-98 duration-300">
          <div class="text-center space-y-3">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Step 2 — Tools</span>
            <h2 class="text-2xl sm:text-4xl font-semibold tracking-tight text-white">Which AI tools do you use daily?</h2>
            <p class="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Select all that apply. We'll surface tailored MCP setup guides and context injection shortcuts.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <button
              v-for="tool in tools"
              :key="tool.id"
              @click="toggleTool(tool.id)"
              class="group relative p-4 rounded-2xl border text-left transition-all duration-200 backdrop-blur-md flex flex-col justify-between gap-4 h-32"
              :class="[
                selectedTools.includes(tool.id)
                  ? 'border-white bg-white/10 shadow-lg ring-1 ring-white/20'
                  : 'border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-white/20'
              ]"
            >
              <div class="flex items-center justify-between w-full">
                <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 p-1.5">
                  <img :src="tool.logo" :alt="tool.name" class="w-full h-full object-contain" :class="{ 'invert': tool.darkInvert }" />
                </div>
                <div
                  class="w-4 h-4 rounded-md border flex items-center justify-center transition-colors"
                  :class="selectedTools.includes(tool.id) ? 'border-white bg-white text-zinc-950' : 'border-white/20'"
                >
                  <svg v-if="selectedTools.includes(tool.id)" class="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              <div>
                <h3 class="text-xs font-semibold text-white tracking-tight">{{ tool.name }}</h3>
                <p class="text-[10px] text-zinc-400 font-mono mt-0.5">{{ tool.tag }}</p>
              </div>
            </button>
          </div>
        </div>

        <!-- STEP 3: Workspace Setup & Default Naming -->
        <div v-else-if="currentStep === 3" class="space-y-8 animate-in fade-in zoom-in-98 duration-300">
          <div class="text-center space-y-3">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Step 3 — Workspace</span>
            <h2 class="text-2xl sm:text-4xl font-semibold tracking-tight text-white">Name your primary workspace</h2>
            <p class="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Workspaces isolate your memory vault, architecture notes, and connected AI tools.
            </p>
          </div>

          <div class="max-w-md mx-auto pt-2 space-y-4">
            <div class="space-y-2">
              <label class="text-xs font-medium text-zinc-300">Workspace Name</label>
              <input
                type="text"
                v-model="workspaceName"
                placeholder="e.g. Personal Vault, Core Engineering, Strategy"
                class="w-full px-4 py-3 bg-zinc-900/80 border border-white/15 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 transition-all"
                @keyup.enter="handleNext"
              />
            </div>
            <div class="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-xl p-3">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>This workspace will be set as your active default across all AI tools & extensions.</span>
            </div>
          </div>
        </div>

        <!-- STEP 4: Initial Seed Action (Actions screen) -->
        <div v-else-if="currentStep === 4" class="space-y-8 animate-in fade-in zoom-in-98 duration-300">
          <div class="text-center space-y-3">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Step 4 — Actions</span>
            <h2 class="text-2xl sm:text-4xl font-semibold tracking-tight text-white">How would you like to start?</h2>
            <p class="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Choose an action to seed your memory timeline, or jump directly to your workspace.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <button
              v-for="action in actions"
              :key="action.id"
              @click="selectedAction = action.id"
              class="group relative p-5 rounded-2xl border text-left transition-all duration-200 backdrop-blur-md flex items-start gap-4"
              :class="[
                selectedAction === action.id
                  ? 'border-white bg-white/10 shadow-lg ring-1 ring-white/20'
                  : 'border-white/10 bg-zinc-900/60 hover:bg-zinc-900 hover:border-white/20'
              ]"
            >
              <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="action.iconPath" />
                </svg>
              </div>
              <div class="space-y-1 min-w-0 flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-white tracking-tight">{{ action.title }}</h3>
                  <div
                    class="w-4 h-4 rounded-full border flex items-center justify-center transition-colors"
                    :class="selectedAction === action.id ? 'border-white bg-white' : 'border-white/20'"
                  >
                    <div v-if="selectedAction === action.id" class="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                  </div>
                </div>
                <p class="text-xs text-zinc-400 leading-relaxed font-normal">{{ action.desc }}</p>
              </div>
            </button>
          </div>
        </div>

      </main>

      <!-- Bottom Navigation Footer -->
      <footer class="relative z-10 w-full max-w-3xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between shrink-0 border-t border-white/5">
        <button
          v-if="currentStep > 1"
          @click="currentStep--"
          class="text-xs font-semibold text-zinc-400 hover:text-white px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
        >
          ← Back
        </button>
        <div v-else />

        <button
          @click="handleNext"
          class="text-xs px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-100 font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 group"
        >
          <span>{{ currentStep === 4 ? 'Complete Setup' : 'Continue' }}</span>
          <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </footer>

    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useProjectStore } from '../stores/project';

// Import original SVG brand icons from assets folder
import openaiLogo from '../assets/openai.svg';
import claudeLogo from '../assets/claude-color.svg';
import cursorDarkLogo from '../assets/cursor_CUBE_2D_DARK.svg';
import geminiLogo from '../assets/gemini-color.svg';
import perplexityLogo from '../assets/perplexity-color.svg';
import openclawLogo from '../assets/openclaw-color.svg';

const router = useRouter();
const authStore = useAuthStore();
const projectStore = useProjectStore();

const currentStep = ref(1);
const selectedRole = ref('developer');
const selectedTools = ref(['chatgpt', 'claude', 'cursor']);
const workspaceName = ref('Personal Vault');
const selectedAction = ref('editor');

// Role options
const roles = [
  {
    id: 'developer',
    title: 'Software Engineer',
    desc: 'Architecture RFCs, code snippets, Cursor & Copilot context injection.',
    iconPath: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
  },
  {
    id: 'researcher',
    title: 'Researcher & Analyst',
    desc: 'Web page captures, research papers, and deep search synthesis.',
    iconPath: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
  {
    id: 'product',
    title: 'Product & Founder',
    desc: 'Company playbooks, strategy docs, and shared team knowledge base.',
    iconPath: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5s1.5 0 1.5 1.5-1.5 1.5-1.5 1.5H9m0-3v3m0 0v3m6-6h1.5s1.5 0 1.5 1.5-1.5 1.5-1.5 1.5H15m0-3v3m0 0v3',
  },
  {
    id: 'power_user',
    title: 'AI Power User',
    desc: 'Cross-model persistent memory across ChatGPT, Claude & Gemini.',
    iconPath: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
  },
];

// Toolstack options using original SVG assets
const tools = [
  { id: 'chatgpt', name: 'ChatGPT', tag: 'Web & Mobile', logo: openaiLogo, darkInvert: true },
  { id: 'claude', name: 'Claude Code', tag: 'Desktop & CLI', logo: claudeLogo, darkInvert: false },
  { id: 'cursor', name: 'Cursor / VS Code', tag: 'IDE Extension', logo: cursorDarkLogo, darkInvert: false },
  { id: 'gemini', name: 'Gemini AI', tag: 'Google Ecosystem', logo: geminiLogo, darkInvert: false },
  { id: 'perplexity', name: 'Perplexity', tag: 'Research Search', logo: perplexityLogo, darkInvert: false },
  { id: 'mcp', name: 'OpenClaw / MCP', tag: 'Protocol Plugin', logo: openclawLogo, darkInvert: false },
];

// Seed action options
const actions = [
  {
    id: 'editor',
    title: 'Create a Memory Note',
    desc: 'Store a reusable architecture spec, prompt, or code snippet.',
    iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
  },
  {
    id: 'mcp',
    title: 'Connect MCP / IDE Server',
    desc: 'Generate your 1-click config for Cursor, Claude, or OpenClaw.',
    iconPath: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
  },
  {
    id: 'extension',
    title: 'Install Chrome Extension',
    desc: 'Capture web pages, documentation, and chats directly from your browser.',
    iconPath: 'M12 21a9 9 0 100-18 9 9 0 000 18z',
  },
  {
    id: 'dashboard',
    title: 'Explore Vault Dashboard',
    desc: 'Jump straight into your interactive timeline and memory map.',
    iconPath: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z',
  },
];

const toggleTool = (toolId) => {
  if (selectedTools.value.includes(toolId)) {
    if (selectedTools.value.length > 1) {
      selectedTools.value = selectedTools.value.filter((t) => t !== toolId);
    }
  } else {
    selectedTools.value.push(toolId);
  }
};

const ensureWorkspaceCreated = async () => {
  const nameToUse = workspaceName.value.trim() || 'Personal Vault';
  try {
    await projectStore.fetchProjects();
    const existing = projectStore.projects.find(
      (p) => p.name.toLowerCase() === nameToUse.toLowerCase()
    );
    if (existing) {
      projectStore.setCurrentProjectId(existing.id);
    } else {
      await projectStore.createNewProject(nameToUse);
    }
  } catch (err) {
    console.error('Failed to setup default workspace during onboarding:', err);
  }
};

const handleNext = async () => {
  if (currentStep.value === 3) {
    await ensureWorkspaceCreated();
  }
  if (currentStep.value < 4) {
    currentStep.value++;
  } else {
    await completeSetup();
  }
};

const skipOnboarding = async () => {
  await ensureWorkspaceCreated();
  await authStore.completeOnboarding({
    primary_role: selectedRole.value,
    selected_tools: selectedTools.value,
    workspace_name: workspaceName.value.trim() || 'Personal Vault',
    default_project_id: projectStore.currentProjectId,
  });
  if (router.currentRoute.value.path !== '/dashboard') {
    router.push('/dashboard');
  }
};

const completeSetup = async () => {
  await ensureWorkspaceCreated();
  await authStore.completeOnboarding({
    primary_role: selectedRole.value,
    selected_tools: selectedTools.value,
    workspace_name: workspaceName.value.trim() || 'Personal Vault',
    default_project_id: projectStore.currentProjectId,
  });

  if (selectedAction.value === 'editor') {
    router.push('/editor/new?interaction_type=conversation&source_app=chatgpt');
  } else if (selectedAction.value === 'mcp') {
    router.push('/mcp');
  } else if (selectedAction.value === 'extension') {
    window.open('https://chrome.google.com/webstore', '_blank');
    router.push('/dashboard');
  } else {
    router.push('/dashboard');
  }
};
</script>
