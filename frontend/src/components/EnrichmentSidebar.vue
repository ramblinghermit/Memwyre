<template>
  <div class="h-full flex flex-col bg-transparent">
    <!-- Content (Scrollable) -->
    <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">

      <!-- Loading State (Center) -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-8">
        <LoadingLogo size="md" />
        <span class="text-xs text-gray-400 dark:text-zinc-500 mt-2">Analyzing content...</span>
      </div>

      <!-- No Selection State -->
      <div v-if="!activeChunk && !loading" class="text-center py-8 text-gray-400 dark:text-zinc-500 text-xs">
        <p>Select a section of the document to see AI insights.</p>
      </div>

      <!-- Active Content -->
      <div v-if="activeChunk && !loading" class="space-y-6">
        
        <!-- Summary Section -->
        <section v-if="activeChunk.summary">
          <h3 class="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-bold font-mono mb-2">Summary</h3>
          <div class="p-3 bg-gray-50/70 dark:bg-zinc-900/50 rounded-xl text-xs text-gray-700 dark:text-zinc-300 leading-relaxed border border-gray-100 dark:border-zinc-800/80">
            {{ activeChunk.summary }}
          </div>
        </section>

        <!-- Q&A Section -->
        <section v-if="activeChunk.generated_qas && activeChunk.generated_qas.length">
          <h3 class="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-bold font-mono mb-2">Suggested Questions</h3>
          <div class="space-y-2.5">
            <div 
              v-for="(qa, idx) in normalizedQAs" 
              :key="idx" 
              class="p-3 bg-gray-50/70 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/80 rounded-xl transition-colors"
            >
              <p class="text-xs font-semibold text-gray-900 dark:text-white mb-1.5 q-icon">{{ qa.question }}</p>
              <p class="text-xs text-gray-600 dark:text-zinc-400 pl-3 border-l-2 border-[#D97757]/60 leading-relaxed">{{ qa.answer }}</p>
            </div>
          </div>
        </section>

        <!-- Entities Section -->
        <section v-if="activeChunk.entities && activeChunk.entities.length">
           <h3 class="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-bold font-mono mb-2">Entities</h3>
           <div class="flex flex-wrap gap-1.5">
             <span v-for="entity in activeChunk.entities" :key="entity" class="px-2.5 py-0.5 bg-[#D97757]/10 text-[#D97757] text-xs rounded-lg border border-[#D97757]/20 font-medium">
               {{ entity }}
             </span>
           </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import LoadingLogo from '@/components/common/LoadingLogo.vue';

const props = defineProps({
  activeChunk: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Helper to normalize QA format (handle string vs object)
const normalizedQAs = computed(() => {
  if (!props.activeChunk || !props.activeChunk.generated_qas) return [];
  
  return props.activeChunk.generated_qas.map(qa => {
    if (typeof qa === 'string') {
      // Try to parse "Q: ... A: ..." format if simple string
      if (qa.includes('Q:') && qa.includes('A:')) {
         const parts = qa.split('A:');
         return {
           question: parts[0].replace('Q:', '').trim(),
           answer: parts[1].trim()
         };
      }
      return { question: qa, answer: '' };
    }
    // Handle object format with short keys (from LLM service)
    if (qa.q && qa.a) {
        return { question: qa.q, answer: qa.a };
    }
    return qa;
  });
});
</script>

<style scoped>
.q-icon::before {
  content: "Q.";
  margin-right: 4px;
  color: #a3a3a3;
  font-size: 10px;
}
</style>
