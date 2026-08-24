<template>
  <div class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 no-scrollbar flex flex-col min-h-0 overflow-y-auto overflow-x-hidden select-none">
    
    <!-- Top Header -->
    <div class="mb-6 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2.5">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Billing & Subscription</h2>
          <span
            :class="billing.isPro ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300 border-gray-200 dark:border-zinc-700'"
            class="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border"
          >
            {{ billing.plan || 'Free' }}
          </span>
        </div>
        <p class="text-sm text-gray-500 dark:text-zinc-400 mt-1">Manage your membership, daily token allowances, and renewal settings.</p>
      </div>

      <!-- Dev Mode Badge -->
      <div v-if="billing.isDevMode" class="px-3 py-1 bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-xl text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
        🛠 Dev Mode Active
      </div>
    </div>

    <!-- Feedback Banners -->
    <div v-if="queryStatus === 'success'" class="mb-5 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl animate-fade-in flex items-center gap-3">
      <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <div>
        <p class="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Payment Successful!</p>
        <p class="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">Your Pro subscription has been activated.</p>
      </div>
    </div>

    <div v-if="queryStatus === 'cancelled'" class="mb-5 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl animate-fade-in flex items-center gap-3">
      <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
      <p class="text-xs sm:text-sm text-amber-800 dark:text-amber-200">Checkout was cancelled. No charges were made.</p>
    </div>

    <!-- Loading State -->
    <div v-if="billing.loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D97757]"></div>
    </div>

    <!-- Flushed Content Sections -->
    <div v-else class="space-y-8 pb-12 divide-y divide-gray-200/80 dark:divide-zinc-800">
      
      <!-- Current Plan Section (Flushed) -->
      <section class="space-y-4 pt-2 first:pt-0">
        <div>
          <h3 class="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Current Membership</h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-0.5">Your active plan and renewal status.</p>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-zinc-800/60">
          <div>
            <div class="flex items-center gap-2.5">
              <span class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {{ billing.isPro ? 'Memwyre Pro Plan' : 'Free Starter Plan' }}
              </span>
              <span
                :class="{
                  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20': billing.status === 'active' || billing.isDevMode,
                  'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20': billing.status === 'on_hold',
                  'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20': billing.status === 'failed' || billing.status === 'cancelled',
                  'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400 border-gray-200 dark:border-zinc-700': billing.status === 'inactive'
                }"
                class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                {{ billing.statusLabel }}
              </span>
            </div>
            <p v-if="billing.currentPeriodEnd && billing.isPro" class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Renews {{ formatDate(billing.currentPeriodEnd) }}
            </p>
          </div>

          <button
            v-if="!billing.isPro"
            @click="handleUpgrade"
            :disabled="checkingOut"
            class="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50 shrink-0 self-start sm:self-auto"
          >
            <svg v-if="checkingOut" class="animate-spin -ml-1 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>{{ checkingOut ? 'Redirecting...' : 'Upgrade to Pro — $12/mo' }}</span>
          </button>
        </div>
      </section>

      <!-- Pro Features Section (Flushed) -->
      <section v-if="!billing.isPro" class="space-y-4 pt-8 first:pt-0">
        <div>
          <h3 class="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Features in Pro</h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-0.5">Supercharge your workflow with persistent context across every AI tool.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
          <div v-for="feature in proFeatures" :key="feature" class="flex items-center gap-2 text-sm text-gray-700 dark:text-zinc-200">
            <svg class="w-4 h-4 text-[#D97757] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ feature }}</span>
          </div>
        </div>
      </section>

      <!-- Manage / Cancel (Flushed) -->
      <section v-if="billing.isPro && !billing.isDevMode" class="space-y-4 pt-8 first:pt-0">
        <div>
          <h3 class="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Subscription Management</h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-0.5">Manage your renewal preferences or cancel active plan.</p>
        </div>

        <div class="flex items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-zinc-800/60">
          <div>
            <p class="text-sm font-semibold text-gray-900 dark:text-zinc-100">Cancel Membership</p>
            <p class="text-xs sm:text-[13px] text-gray-500 dark:text-zinc-400 mt-0.5">Your Pro features will remain active until the end of your billing cycle.</p>
          </div>
          <button
            @click="handleCancel"
            :disabled="cancelling"
            class="px-3.5 py-1.5 border border-red-200 dark:border-red-900/60 text-xs sm:text-sm font-medium rounded-xl text-red-600 dark:text-red-400 bg-red-50/50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs shrink-0"
          >
            {{ cancelling ? 'Cancelling...' : 'Cancel Plan' }}
          </button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBillingStore } from '../stores/billing';
import { useToast } from 'vue-toastification';

const route = useRoute();
const billing = useBillingStore();
const toast = useToast();

const checkingOut = ref(false);
const cancelling = ref(false);

const queryStatus = computed(() => route.query.status);

const proFeatures = [
  'Unlimited memory indexing',
  '100K daily AI token budget',
  'PDF, Markdown & web capture',
  'Universal MCP server connection',
  'Full IDE & agent integrations',
  'Priority vector search retrieval'
];

onMounted(async () => {
  await billing.fetchSubscription();
});

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const handleUpgrade = async () => {
  checkingOut.value = true;
  try {
    const url = await billing.createCheckoutSession();
    if (url) {
      window.location.href = url;
    } else {
      toast.error('Failed to create checkout session');
    }
  } catch (err) {
    toast.error(err.response?.data?.detail || 'Upgrade failed. Please try again.');
  } finally {
    checkingOut.value = false;
  }
};

const handleCancel = async () => {
  if (!confirm('Are you sure you want to cancel your Pro subscription? You will retain access until the end of the billing period.')) {
    return;
  }
  cancelling.value = true;
  try {
    await billing.cancelSubscription();
    toast.success('Subscription cancelled. Access remains active through billing period.');
  } catch (err) {
    toast.error(err.response?.data?.detail || 'Failed to cancel subscription.');
  } finally {
    cancelling.value = false;
  }
};
</script>
