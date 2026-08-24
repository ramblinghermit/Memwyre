<template>
  <Teleport to="body">
    <div v-if="isOpen" class="relative z-[9999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Background backdrop with smooth dark/light overlay and subtle blur -->
      <div 
        class="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-xs transition-opacity" 
        @click="cancel"
        aria-hidden="true"
      ></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-[#18181b] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-gray-200 dark:border-zinc-800">
            <div class="bg-white dark:bg-[#18181b] px-4 pb-4 pt-5 sm:p-6 sm:pb-5">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white" id="modal-title">{{ title }}</h3>
                  <div class="mt-1.5">
                    <p class="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{{ message }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50/80 dark:bg-[#121214] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 border-t border-gray-100 dark:border-zinc-800/80">
              <button 
                type="button" 
                class="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 transition-colors sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" 
                @click="confirm"
                :disabled="loading"
              >
                <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Processing...' : confirmText }}
              </button>
              <button 
                type="button" 
                class="mt-2 sm:mt-0 inline-flex w-full justify-center rounded-xl bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-zinc-300 shadow-xs border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/60 transition-colors sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
                @click="cancel"
                :disabled="loading"
              >
                {{ cancelText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  emit('confirm');
};

const cancel = () => {
  emit('cancel');
};
</script>
