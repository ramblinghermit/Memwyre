<template>
  <transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="transform translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-full opacity-0"
  >
    <div
      v-if="isVisible"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      class="fixed bottom-0 inset-x-0 w-full z-[100] bg-white/95 dark:bg-[#0c0d10]/95 backdrop-blur-xl border-t border-gray-200/85 dark:border-zinc-800/85 shadow-[0_-10px_35px_-5px_rgba(0,0,0,0.12)] dark:shadow-[0_-12px_40px_-5px_rgba(0,0,0,0.5)] transition-colors"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
          <!-- Left: Cookie Icon + Explanatory Text -->
          <div class="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
            <div class="w-10 h-10 rounded-xl bg-[#D97756]/10 dark:bg-[#D97756]/20 flex items-center justify-center text-[#D97756] shrink-0 mt-0.5 sm:mt-0 shadow-xs">
              <!-- Modern Cookie SVG Icon -->
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 2a10 10 0 1010 10c0-.42-.02-.83-.07-1.24a4.5 4.5 0 01-3.69-3.69c-.41-.05-.82-.07-1.24-.07a5 5 0 01-5-5c0-.42.02-.83.07-1.24A4.5 4.5 0 018.38 2.07C8.79 2.02 9.2 2 9.62 2H12z"
                />
                <circle cx="8.5" cy="14.5" r="1.1" fill="currentColor" />
                <circle cx="14.5" cy="15.5" r="1.1" fill="currentColor" />
                <circle cx="12" cy="10" r="1.1" fill="currentColor" />
                <circle cx="16.5" cy="11.5" r="1.1" fill="currentColor" />
              </svg>
            </div>

            <div class="space-y-1 text-left">
              <div class="flex items-center gap-2">
                <h3 class="text-sm sm:text-base font-semibold text-[rgb(1,1,16)] dark:text-zinc-100 tracking-tight font-sans">
                  We value your privacy
                </h3>
                <span class="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#D97756]/10 text-[#D97756]">
                  Cookies Notice
                </span>
              </div>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
                Memwyre uses essential cookies and storage to maintain your authenticated session, remember workspace preferences, and optimize knowledge retrieval speeds across your connected AI agents. Learn more in our
                <router-link
                  to="/privacy"
                  class="font-medium text-[#D97756] hover:underline underline-offset-2 transition-colors ml-0.5"
                >
                  Privacy Policy
                </router-link>.
              </p>
            </div>
          </div>

          <!-- Right: Interactive Buttons & Dismiss -->
          <div class="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end lg:self-center w-full sm:w-auto justify-end">
            <button
              type="button"
              @click="acceptNecessary"
              class="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-gray-700 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 active:scale-[0.98] transition-all duration-150 cursor-pointer text-center"
            >
              Necessary Only
            </button>

            <button
              type="button"
              @click="acceptAll"
              class="flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#050614] dark:bg-white dark:text-[#050614] hover:bg-gray-800 dark:hover:bg-zinc-100 active:scale-[0.98] shadow-md transition-all duration-150 cursor-pointer text-center"
            >
              Accept All
            </button>

            <button
              type="button"
              @click="acceptNecessary"
              class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 rounded-lg transition-colors cursor-pointer hidden sm:block"
              title="Close banner"
              aria-label="Close cookie consent banner"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const STORAGE_KEY = 'memwyre_cookie_consent';
const isVisible = ref(false);

const recordConsent = (consentSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentSettings));
  } catch (e) {
    console.warn('Could not store cookie preference:', e);
  }
  isVisible.value = false;
};

const acceptAll = () => {
  recordConsent({
    necessary: true,
    analytics: true,
    timestamp: new Date().toISOString()
  });
};

const acceptNecessary = () => {
  recordConsent({
    necessary: true,
    analytics: false,
    timestamp: new Date().toISOString()
  });
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Soft glide-up after the landing page mounts
      setTimeout(() => {
        isVisible.value = true;
      }, 600);
    }
  } catch (e) {
    // If localStorage is blocked or restricted
  }
});
</script>

<style scoped>
</style>
