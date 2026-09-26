<template>
  <div class="flex justify-start my-2">
    <div class="max-w-[85%] min-w-0">
      <div class="py-1">
        <div class="flex items-center gap-2">
          <button
            class="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors font-medium cursor-pointer select-none group"
            @click="$emit('toggle')"
          >
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200 text-gray-400 dark:text-zinc-500 group-hover:text-gray-600 dark:group-hover:text-zinc-300"
              :class="{ 'rotate-90': expanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="animate-pulse text-gray-900 dark:text-white font-semibold">Thinking...</span>
            <span v-if="steps.length > 0" class="text-[11px] text-gray-400 dark:text-zinc-600 font-mono">
              ({{ steps.filter(s => s.status === 'completed').length }}/{{ steps.length }})
            </span>
          </button>
        </div>

        <p v-if="waitingForFirstStep" class="mt-1 pl-5 text-xs text-gray-400 dark:text-zinc-500 italic">
          Connecting to agent...
        </p>

        <template v-else-if="steps.length > 0">
          <p v-if="!expanded" class="mt-1 pl-5 text-xs text-gray-400 dark:text-zinc-500 truncate">
            {{ summaryLine }}
          </p>

          <ul v-else class="mt-2 pl-3 ml-1.5 space-y-1.5 border-l border-gray-200 dark:border-zinc-800">
            <li
              v-for="step in steps"
              :key="`${turnId}-${step.step}`"
              class="flex items-start justify-between text-xs min-w-0"
            >
              <div class="flex items-center space-x-2 min-w-0">
                <span
                  class="w-1.5 h-1.5 rounded-full shrink-0"
                  :class="dotClass(step.status)"
                ></span>
                <span class="text-gray-600 dark:text-zinc-300 font-medium truncate">{{ step.label }}</span>
                <span v-if="metaText(step.meta)" class="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">
                  ({{ metaText(step.meta) }})
                </span>
              </div>
              <span class="text-[10px] text-gray-400 dark:text-zinc-500 shrink-0 font-mono">{{ formatTime(step.timestamp) }}</span>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  steps: { type: Array, default: () => [] },
  expanded: { type: Boolean, default: false },
  turnId: { type: String, default: '' },
  waitingForFirstStep: { type: Boolean, default: false },
});

defineEmits(['toggle']);

const latestStep = computed(() => {
  if (!props.steps.length) return null;
  const active = props.steps.find((s) => s.status === 'active');
  return active || props.steps[props.steps.length - 1];
});

const summaryLine = computed(() => {
  const completedCount = props.steps.filter((s) => s.status === 'completed').length;
  if (!latestStep.value) return `${completedCount} steps completed`;
  return `${latestStep.value.label} (${completedCount}/${props.steps.length})`;
});

const dotClass = (status) => {
  if (status === 'failed') return 'bg-red-500';
  if (status === 'active') return 'bg-amber-500 animate-pulse';
  if (status === 'completed') return 'bg-emerald-500';
  return 'bg-gray-300 dark:bg-zinc-600';
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(timestamp));
};

const metaText = (meta) => {
  if (!meta || typeof meta !== 'object') return '';
  const parts = [];
  if (typeof meta.result_count === 'number') parts.push(`${meta.result_count} results`);
  if (typeof meta.source_count === 'number') parts.push(`${meta.source_count} sources`);
  if (meta.model) parts.push(meta.model);
  if (meta.error) parts.push('error');
  return parts.join(' | ');
};
</script>
