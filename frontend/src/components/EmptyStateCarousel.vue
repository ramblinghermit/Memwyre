<template>
  <div class="w-full space-y-6 select-none">
    
    <!-- ─── HERO CARD: 3-Step Setup ─── -->
    <div class="rounded-2xl border border-gray-200/90 dark:border-zinc-800 bg-white dark:bg-[#121214] shadow-sm overflow-hidden p-5 sm:p-7 space-y-6">
      
      <!-- Header: Tool Icons + Title + Subtitle -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-zinc-800/80">
        <div>
          <div class="flex items-center gap-3 mb-2.5">
            <img :src="claudeIcon" alt="Claude" class="w-5 h-5 object-contain" title="Claude" />
            <img :src="cursorLightIcon" alt="Cursor" class="w-5 h-5 object-contain dark:hidden" title="Cursor" />
            <img :src="cursorDarkIcon" alt="Cursor" class="w-5 h-5 object-contain hidden dark:block" title="Cursor" />
            <img :src="codexIcon" alt="Codex" class="w-5 h-5 object-contain" title="Codex" />
            <img :src="grokbotIcon" alt="Grokbot" class="w-5 h-5 object-contain rounded-md" title="Grokbot" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Get started in 3 steps
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Connect your IDEs, sync project context, and let AI agents share persistent memory automatically.
          </p>
        </div>

        <router-link
          to="/integrations"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors shrink-0 self-start sm:self-auto"
        >
          <span>All client plugins & configs</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <!-- 3-Step Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

        <!-- STEP 1: Connect IDEs & agents via NPX -->
        <div class="p-5 rounded-2xl bg-gray-50/70 dark:bg-zinc-900/50 border border-gray-200/70 dark:border-zinc-800/80 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-[#1D9BF0]/10 text-[#1D9BF0] font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Connect IDEs & agents</h3>
            </div>
            <p class="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Use the NPX command to seamlessly connect Cursor, Claude Code, Codex, and agent CLIs to Memwyre.
            </p>
          </div>

          <!-- Terminal command box with copy button -->
          <div class="pt-2">
            <div class="flex items-center justify-between gap-2 bg-white dark:bg-[#121214] rounded-xl px-3 py-2 border border-gray-200/80 dark:border-zinc-800 shadow-2xs">
              <code class="font-mono text-xs text-gray-800 dark:text-zinc-200 select-all truncate">npx -y install-memwyre</code>
              <button
                @click="copyNpxCommand"
                class="p-1.5 text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                :title="npxCopied ? 'Copied command!' : 'Copy command'"
              >
                <svg v-if="!npxCopied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <svg v-else class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- STEP 2: Onboard & sync project -->
        <div class="p-5 rounded-2xl bg-gray-50/70 dark:bg-zinc-900/50 border border-gray-200/70 dark:border-zinc-800/80 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-[#1D9BF0]/10 text-[#1D9BF0] font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Onboard & sync project</h3>
            </div>
            <p class="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Use the prompt to onboard and sync your current project, making its memory and context available everywhere.
            </p>
          </div>

          <!-- Action: Copy Prompt + Preview toggle -->
          <div class="pt-2 flex flex-col gap-2">
            <button
              @click="copyPrompt"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <svg v-if="!promptCopied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <svg v-else class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ promptCopied ? 'Copied prompt!' : 'Copy prompt' }}</span>
            </button>

            <button
              @click="showPromptPreview = !showPromptPreview"
              class="w-full text-center text-[11px] font-medium text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <span>{{ showPromptPreview ? 'Hide prompt preview' : 'Preview prompt' }}</span>
              <svg class="w-3 h-3 transition-transform" :class="showPromptPreview ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- STEP 3: Manage through console -->
        <div class="p-5 rounded-2xl bg-gray-50/70 dark:bg-zinc-900/50 border border-gray-200/70 dark:border-zinc-800/80 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-[#1D9BF0]/10 text-[#1D9BF0] font-bold text-xs flex items-center justify-center shrink-0">3</span>
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Manage through console</h3>
            </div>
            <p class="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Context captures and syncs automatically in the background. Use the console anytime to inspect, search, and curate project memories.
            </p>
          </div>

          <!-- Console Navigation Links -->
          <div class="pt-2 flex flex-col gap-2">
            <router-link
              to="/spaces"
              class="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-[#121214] hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-semibold text-gray-800 dark:text-zinc-200 border border-gray-200/80 dark:border-zinc-800 transition-colors shadow-2xs group"
            >
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Spaces</span>
              </div>
              <span class="text-gray-400 group-hover:translate-x-0.5 transition-transform text-xs">→</span>
            </router-link>

            <router-link
              to="/inbox"
              class="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-[#121214] hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-semibold text-gray-800 dark:text-zinc-200 border border-gray-200/80 dark:border-zinc-800 transition-colors shadow-2xs group"
            >
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <span>Review Inbox</span>
              </div>
              <span class="text-gray-400 group-hover:translate-x-0.5 transition-transform text-xs">→</span>
            </router-link>
          </div>
        </div>

      </div>

      <!-- Optional Expandable Prompt Drawer if user wants to preview -->
      <div v-if="showPromptPreview" class="pt-4 border-t border-gray-100 dark:border-zinc-800/80 animate-in fade-in duration-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-700 dark:text-zinc-300">Prompt Preview (Full Context)</span>
          <button @click="copyPrompt" class="text-xs font-semibold text-[#1D9BF0] hover:underline cursor-pointer">
            {{ promptCopied ? 'Copied!' : 'Copy to Clipboard' }}
          </button>
        </div>
        <div class="max-h-64 overflow-y-auto custom-scrollbar p-3.5 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 font-mono text-xs text-gray-700 dark:text-zinc-300 whitespace-pre-wrap select-all">
          {{ promptText }}
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import apiKeysService from '@/services/apiKeys';

// Tool SVG icons
import claudeIcon from '@/assets/claude-color.svg';
import cursorDarkIcon from '@/assets/cursor_CUBE_2D_DARK.svg';
import cursorLightIcon from '@/assets/cursor_CUBE_2D_LIGHT.svg';
import codexIcon from '@/assets/codex-color.svg';
import grokbotIcon from '@/assets/grok-bot.png';

defineEmits(['open-quick-add']);

const toast = useToast();

const promptCopied = ref(false);
const npxCopied = ref(false);
const showPromptPreview = ref(false);
const activeApiKey = ref('');

// Fetch user's API key
onMounted(async () => {
  try {
    const res = await apiKeysService.listKeys();
    if (res.data && res.data.length > 0) {
      activeApiKey.value = res.data[0].masked_key || res.data[0].key || 'bv_sk_live_key';
    }
  } catch (err) {
    console.warn('Could not fetch existing API keys:', err);
  }
});

const apiKeyDisplay = computed(() => {
  return activeApiKey.value || '<MEMWYRE_API_KEY>';
});

// Complete markdown prompt for agent onboarding
const promptText = computed(() => `# You are onboarding this project to Memwyre Persistent Memory
Memwyre is a persistent memory and contextual knowledge layer for AI coding agents and developer tools: ingest architecture decisions, bug fixes, conventions, and project history; retrieve scoped context via semantic search. Every operation is executed through native Model Context Protocol (MCP) tools and IDE plugins.

## What you can call (MCP Tools)
| Operation | MCP Tool | Use when |
|---|---|---|
| Search memories | search_memwyre(query, workspace_name) | Retrieve context, architecture decisions, and past bug fixes |
| Save memory | save_memory(text, tags, workspace_name) | Persist decisions, solved bugs, API schemas, and conventions |
| List memories | list_memories(limit, workspace_name) | Inspect existing memory records and project notes |
| Search by date | search_by_date(start_date, end_date) | Review work done across specific sessions or sprints |
| Inspect taxonomy | get_all_tags(workspace_name) | View active project categories and knowledge tags |
| Inspect inbox | get_inbox(workspace_name) | Check pending memory items waiting for approval |
| Approve memory | approve_memory(memory_id) | Confirm a pending memory and trigger vector ingestion |
| Discard memory | discard_memory(memory_id) | Drop an unapproved or irrelevant pending memory |
| Update memory | update_memory(memory_id, content) | Update existing memory content with latest findings |
| Delete memory | delete_memory(memory_id) | Remove obsolete conventions, superseded specs, or facts |

All memories are containerized and scoped by workspace_name (your current project repository name).
Now work the steps below in order. Do not skip ahead. Stop where a step says to.

## Step 1 — Credentials & Environment
API key env var: MEMWYRE_API_KEY (never hardcode it, never print it back).
Key for this project: ${apiKeyDisplay.value}
If you do not have an API key, ask the user to generate one in Memwyre Settings > API Keys, export it as MEMWYRE_API_KEY, and confirm when set.

## Step 2 — Configure MCP Server / Plugin for Your Client
Set up Memwyre in your respective environment using the official integration guides:
- Cursor: Add to ~/.cursor/mcp.json -> https://memwyre.tech/integrations/cursor
- Claude Desktop / Claude Code: Install plugin or configure claude_desktop_config.json -> https://memwyre.tech/integrations/claude
- Windsurf: Add to ~/.codeium/windsurf/mcp_config.json -> https://memwyre.tech/integrations/windsurf
- VS Code (Roo / Cline): Add to User mcp.json -> https://memwyre.tech/integrations/vscode
- OpenClaw & CLI: Run openclaw plugins install @memwyre/openclaw-plugin or npx -y install-memwyre -> https://memwyre.tech/integrations/openclaw
- All Client Setup Guides: https://memwyre.tech/integrations

Verify the MCP connection by calling search_memwyre(query="project architecture", workspace_name="<current_project>").
Then give the user a short rundown of what Memwyre can do for THIS project, using the table above.

## Step 3 — Scan this repo for integration points
If this directory has application source, read enough to understand it, then map findings against this table. Cite exact files and lines. If the repo is empty or docs-only, say so and skip to Step 5.
| Code pattern | Replace / augment with |
|---|---|
| Repetitive architecture / coding conventions | Save to Memwyre (save_memory), search before refactoring |
| Complex bug fixes or non-obvious workarounds | Store resolution notes so future sessions recall the fix |
| Database schemas, API contracts, design specs | Ingest into project memory for accurate agent grounding |
| Multi-agent or team handoffs | Centralize knowledge in shared project space |

## Step 4 — Propose, then get approval before touching code
Present findings as a numbered list: file + line range, the relevant memory context, and one line on why persisting or querying it improves development. Ask which to implement. Do not modify files until the user approves specific items.

## Step 5 — Suggest uses tailored to this project
Propose 3-5 concrete knowledge entries to seed into Memwyre (e.g., project stack, state management rules, API conventions), each tied to specific workspace_name tags. Propose, do not build without confirmation.`);

const copyNpxCommand = async () => {
  try {
    await navigator.clipboard.writeText('npx -y install-memwyre');
    npxCopied.value = true;
    toast.success('Install command copied to clipboard!');
    setTimeout(() => {
      npxCopied.value = false;
    }, 2500);
  } catch (e) {
    toast.error('Failed to copy to clipboard');
  }
};

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(promptText.value);
    promptCopied.value = true;
    toast.success('Agent onboarding prompt copied to clipboard!');
    setTimeout(() => {
      promptCopied.value = false;
    }, 2500);
  } catch (e) {
    toast.error('Failed to copy to clipboard');
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(150, 150, 150, 0.2);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(150, 150, 150, 0.4);
}
</style>
