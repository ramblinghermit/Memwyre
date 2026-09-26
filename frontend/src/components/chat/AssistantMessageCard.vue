<template>
  <div class="flex justify-start my-2">
    <div class="max-w-[85%] min-w-0">
      <div class="bg-[#313131] text-[#ecece8] px-5 py-4 rounded-2xl rounded-tl-xs text-sm md:text-base leading-relaxed shadow-xs">
        <ReasoningPanel :thinking-text="thinkingText" />

        <section :class="{ 'mb-4': keyPoints.length > 0 || actions.length > 0 || sourceRows.length > 0 }">
          <div
            class="prose prose-invert prose-sm max-w-none prose-headings:mb-2 prose-headings:text-[#ecece8] prose-p:my-2 prose-p:text-[#ecece8] prose-strong:text-white prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-li:text-[#ecece8] prose-pre:my-3 prose-pre:p-3 prose-pre:rounded-xl prose-pre:bg-[#202020] prose-code:text-[0.9em] prose-code:text-[#ecece8] prose-table:block prose-table:overflow-x-auto text-[#ecece8]"
            v-html="renderChatMarkdown(answerText)"
          ></div>
        </section>

        <section v-if="keyPoints.length > 0" class="mb-4">
          <p class="text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-semibold font-mono">Key Points</p>
          <ul class="list-disc pl-5 space-y-1 text-sm text-[#ecece8]">
            <li v-for="(point, idx) in keyPoints.slice(0, 5)" :key="`kp-${idx}`">{{ point }}</li>
          </ul>
        </section>

        <section v-if="actions.length > 0" class="mb-4">
          <p class="text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-semibold font-mono">Actions</p>
          <ul class="list-disc pl-5 space-y-1 text-sm text-[#ecece8]">
            <li v-for="(action, idx) in actions.slice(0, 5)" :key="`act-${idx}`">{{ action }}</li>
          </ul>
        </section>

        <section v-if="sourceRows.length > 0" class="pt-2.5 border-t border-white/10">
          <p class="text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5 font-bold font-mono">Sources</p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="(source, idx) in sourceRows"
              :key="`src-${idx}`"
              class="inline-flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-zinc-400 hover:text-white text-zinc-300 transition-all cursor-pointer truncate max-w-xs"
              @click="$emit('open-source', source)"
            >
              <svg class="w-3 h-3 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="truncate">{{ source.title || source.id || source }}</span>
            </button>
          </div>
        </section>
      </div>

      <MessageActions @copy="$emit('copy')" @feedback="(type) => $emit('feedback', type)" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import MessageActions from './MessageActions.vue';
import ReasoningPanel from './ReasoningPanel.vue';
import { splitChatContent, renderChatMarkdown } from '../../utils/chatMarkdown';

const props = defineProps({
  message: { type: Object, required: true },
});

defineEmits(['copy', 'feedback', 'open-source']);

const parsedContent = computed(() => splitChatContent(props.message?.content || ''));

const thinkingText = computed(() => {
  return parsedContent.value.reasoningText;
});

const answerText = computed(() => {
  return parsedContent.value.answerText;
});

const lines = computed(() =>
  answerText.value
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
);

const keyPoints = computed(() =>
  lines.value.filter((line) => /^([-*]|\d+\.)\s+/.test(line)).map((line) => line.replace(/^([-*]|\d+\.)\s+/, ''))
);

const actions = computed(() =>
  lines.value.filter((line) => /^(next|action|todo|should|try|consider)\b/i.test(line))
);

const sourceRows = computed(() => {
  const src = props.message?.sources;
  return Array.isArray(src) ? src : [];
});
</script>
