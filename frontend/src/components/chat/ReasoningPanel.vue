<template>
  <div v-if="thinkingText" class="mb-3">
    <!-- Flushed Thinking Toggle -->
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer select-none group font-medium py-1"
    >
      <svg
        class="w-3.5 h-3.5 transition-transform duration-200 text-gray-400 dark:text-zinc-500 group-hover:text-gray-600 dark:group-hover:text-zinc-300"
        :class="{ 'rotate-90': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span>Thinking Process</span>
      <span class="text-[11px] text-gray-400 dark:text-zinc-600 font-normal">({{ isOpen ? 'hide' : 'show' }})</span>
    </button>

    <!-- Flushed Reasoning Content with Left Border -->
    <div
      v-show="isOpen"
      class="mt-1.5 pl-3 ml-1.5 border-l border-gray-200 dark:border-zinc-800 text-xs leading-relaxed text-gray-500 dark:text-zinc-400"
    >
      <div
        class="prose prose-xs max-w-none dark:prose-invert prose-p:my-1 prose-pre:my-2 prose-pre:p-2.5 prose-pre:rounded-lg opacity-85"
        v-html="renderChatMarkdown(thinkingText)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { renderChatMarkdown } from '../../utils/chatMarkdown';

defineProps({
  thinkingText: { type: String, default: '' },
});

const isOpen = ref(false);
</script>
