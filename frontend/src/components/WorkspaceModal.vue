<template>
  <Teleport to="body">
    <div v-if="isOpen" class="relative z-[9999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div 
        class="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-xs transition-opacity" 
        @click="cancel"
        aria-hidden="true"
      ></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#18181b] text-left shadow-2xl transition-all sm:my-8 w-full sm:max-w-lg border border-gray-200 dark:border-zinc-800 flex flex-col max-h-[90vh]">
            
            <!-- Header -->
            <div class="px-5 py-4 border-b border-gray-100 dark:border-zinc-800 shrink-0 flex items-center justify-between">
              <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white" id="modal-title">
                {{ isEditing ? 'Edit Space' : 'Create Space' }}
              </h3>
              <button @click="cancel" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-4">
              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-1.5">Space Name <span class="text-red-500">*</span></label>
                <input 
                  v-model="formData.name" 
                  type="text" 
                  placeholder="e.g. Personal, Work, Side Project..." 
                  class="w-full bg-white dark:bg-zinc-900/50 text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors text-gray-900 dark:text-white"
                  :disabled="isDefaultWorkspace"
                  maxlength="100"
                  ref="nameInputRef"
                />
                <p v-if="isDefaultWorkspace" class="mt-1 text-xs text-amber-600 dark:text-amber-500">The default space cannot be renamed.</p>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-1.5">Description (Optional)</label>
                <textarea 
                  v-model="formData.description" 
                  placeholder="What is this space for?" 
                  rows="3"
                  maxlength="200"
                  class="w-full bg-white dark:bg-zinc-900/50 text-sm border border-gray-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors text-gray-900 dark:text-white resize-none"
                ></textarea>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-5 py-4 bg-gray-50/80 dark:bg-[#121214] border-t border-gray-100 dark:border-zinc-800/80 shrink-0 flex items-center justify-end gap-2 sm:gap-3 rounded-b-2xl">
              <button 
                type="button" 
                class="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700/60 shadow-xs transition-colors cursor-pointer" 
                @click="cancel"
                :disabled="loading"
              >
                Cancel
              </button>
              <button 
                type="button" 
                class="px-5 py-2 text-sm font-semibold text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] rounded-xl shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2" 
                @click="save"
                :disabled="loading || !isValid"
              >
                <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Space') }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  project: { type: Object, default: null }, // Null for create, object for edit
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['save', 'cancel']);

const nameInputRef = ref(null);

const formData = ref({
  name: '',
  description: '',
  color: '#4F46E5',
  icon: '📁'
});

const isEditing = computed(() => !!props.project);
const isDefaultWorkspace = computed(() => isEditing.value && props.project?.name?.toLowerCase() === 'default');

const isValid = computed(() => {
  return formData.value.name && formData.value.name.trim().length > 0;
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.project) {
      formData.value = {
        name: props.project.name || '',
        description: props.project.description || '',
        color: props.project.color || '#4F46E5',
        icon: props.project.icon || '📁'
      };
    } else {
      formData.value = {
        name: '',
        description: '',
        color: '#4F46E5',
        icon: '📁'
      };
    }
    nextTick(() => {
      if (nameInputRef.value && !isDefaultWorkspace.value) {
        nameInputRef.value.focus();
      }
    });
  }
});

const save = () => {
  if (!isValid.value) return;
  emit('save', {
    ...formData.value,
    name: formData.value.name.trim(),
    description: formData.value.description.trim()
  });
};

const cancel = () => {
  if (props.loading) return;
  emit('cancel');
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(82, 82, 91, 0.5);
}
</style>
