<template>
  <div class="min-h-screen flex items-center justify-center font-sans text-zinc-900 dark:text-zinc-100 bg-[#FDFCFB] dark:bg-[#141414] p-4 sm:p-6 lg:p-8">
    <!-- Main Form Card Container -->
    <div class="w-full max-w-[440px] py-8">
        <!-- ─── STEP 1 / DETAILS: Registration Form ─── -->
        <transition name="slide-up" mode="out-in">
          <div v-if="!showOtp" key="register" class="space-y-6 animate-in fade-in duration-300">
            <!-- Header -->
            <div>
              <router-link to="/" class="inline-block mb-4 group transition-opacity hover:opacity-80">
                <img src="/logo.png" alt="Memwyre" class="h-8 w-auto dark:invert opacity-95" />
              </router-link>
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2 whitespace-nowrap">
                Activate your memory layer
              </h1>
              <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                Set up persistent shared context across all your AI tools.
              </p>
            </div>

            <!-- Socials Login on Top -->
            <div class="space-y-2.5">
              <button
                type="button"
                @click="loginWithProvider('google')"
                class="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg border border-zinc-300/80 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-xs transition-colors duration-200"
              >
                <svg class="h-4 w-4 mr-2.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.09C3.26 21.48 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.41l4.04-3.09z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.52 1.24 6.59l4.04 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
                Sign up with Google
              </button>

              <button
                type="button"
                @click="loginWithProvider('github')"
                class="w-full inline-flex justify-center items-center py-2.5 px-4 rounded-lg border border-zinc-300/80 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-xs transition-colors duration-200"
              >
                <svg class="h-4 w-4 mr-2.5 text-zinc-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                Sign up with GitHub
              </button>
            </div>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>
              <div class="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                <span class="px-3 bg-[#FDFCFB] dark:bg-[#141414] text-zinc-400 dark:text-zinc-500">or continue with email</span>
              </div>
            </div>

            <!-- ─── STEP 1: Small Email Input ─── -->
            <form v-if="step === 'email'" @submit.prevent="proceedToDetails" class="space-y-4">
              <div>
                <label for="register-email" class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Email address
                </label>
                <div class="relative">
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    v-model="email"
                    placeholder="name@example.com"
                    class="appearance-none block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 focus:border-gray-900 dark:focus:border-white text-sm transition-all duration-200"
                  />
                </div>
                <p v-if="emailError" class="mt-1.5 text-xs text-red-500 font-medium">{{ emailError }}</p>
              </div>

              <button
                type="submit"
                class="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] shadow-sm transition-all duration-200 group cursor-pointer"
              >
                Continue
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <!-- Legal / Privacy -->
              <p class="text-center text-xs text-zinc-400 dark:text-zinc-500 pt-1 leading-relaxed">
                Protected by Memwyre. By registering, you agree to our
                <router-link to="/terms" class="underline hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Terms</router-link>
                and
                <router-link to="/privacy" class="underline hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Privacy</router-link>.
              </p>
            </form>

            <!-- ─── STEP 2: Name & Password Details ─── -->
            <form v-else @submit.prevent="handleRegister" class="space-y-4 animate-in fade-in duration-200">
              <!-- Selected Email Pill with Change option -->
              <!-- Selected Email Pill with Change option -->
              <div class="flex items-center justify-between px-3.5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
                <div class="flex items-center gap-2 truncate">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span class="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">{{ email }}</span>
                </div>
                <button
                  type="button"
                  @click="backToEmail"
                  class="text-xs font-semibold text-gray-900 hover:text-black dark:text-white dark:hover:text-zinc-200 ml-2 shrink-0 transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>

              <!-- Full Name Field -->
              <div>
                <label for="register-name" class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Full name
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  v-model="name"
                  placeholder="John Doe"
                  class="appearance-none block w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 focus:border-gray-900 dark:focus:border-white text-sm transition-all duration-200"
                />
              </div>

              <!-- Password Field -->
              <div>
                <label for="register-password" class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div class="relative">
                  <input
                    id="register-password"
                    name="password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    required
                    v-model="password"
                    placeholder="••••••••"
                    class="appearance-none block w-full px-3.5 py-2.5 pr-10 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 focus:border-gray-900 dark:focus:border-white text-sm transition-all duration-200"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    <!-- Eye open -->
                    <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <!-- Eye closed -->
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  </button>
                </div>
                <div v-if="password.length > 0 && password.length < 8" class="mt-1.5 text-xs text-red-500 font-medium">
                  Password must be at least 8 characters.
                </div>
              </div>

              <!-- Turnstile captcha container -->
              <div id="turnstile-container" class="flex justify-center my-2"></div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading || !turnstileToken"
                class="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] shadow-sm disabled:opacity-50 transition-all duration-200 cursor-pointer"
              >
                <LoadingLogo v-if="loading" size="sm" class="mr-2 h-4 w-4" />
                {{ loading ? 'Creating account...' : 'Create account' }}
              </button>

              <!-- Back to email link -->
              <button
                type="button"
                @click="backToEmail"
                class="w-full text-center text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors pt-1"
              >
                ← Use a different email
              </button>
            </form>

            <!-- Error Alert -->
            <div v-if="error" class="p-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/15">
              <p class="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium text-center">{{ error }}</p>
            </div>

            <!-- Switch to Login -->
            <div class="text-center pt-2">
              <p class="text-sm text-zinc-500 dark:text-zinc-400">
                Already have an account?
                <router-link
                  to="/login"
                  class="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline transition-colors ml-1"
                >
                  Sign in
                </router-link>
              </p>
            </div>
          </div>
        </transition>

        <!-- ─── STEP 2: OTP Verification ─── -->
        <transition name="slide-up" mode="out-in">
          <div v-if="showOtp" key="otp" class="space-y-6 animate-in fade-in duration-300">
            <div class="text-center">
              <div class="mx-auto w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-zinc-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1.5">
                Check your email
              </h1>
              <p class="text-sm text-zinc-500 dark:text-zinc-400">
                We sent a 6-digit code to <span class="font-semibold text-zinc-700 dark:text-zinc-200">{{ registeredEmail }}</span>
              </p>
              <p class="text-xs text-zinc-400 dark:text-zinc-500 mt-1">It expires in 10 minutes.</p>
            </div>

            <form class="space-y-5" @submit.prevent="handleVerifyOtp">
              <!-- OTP input boxes -->
              <div>
                <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-3 text-center">
                  Enter verification code
                </label>
                <div class="flex gap-2 justify-center">
                  <input
                    v-for="(_, i) in otpDigits"
                    :key="i"
                    :ref="el => { if (el) otpRefs[i] = el }"
                    v-model="otpDigits[i]"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    @input="onOtpInput(i, $event)"
                    @keydown="onOtpKeydown(i, $event)"
                    @paste="onOtpPaste($event)"
                    class="w-11 sm:w-12 h-13 sm:h-14 text-center text-xl font-bold bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 transition-all duration-150 text-zinc-900 dark:text-zinc-100"
                    :class="{ 'border-gray-900 dark:border-white': otpDigits[i] }"
                  />
                </div>
              </div>

              <div v-if="otpError" class="p-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/15">
                <p class="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium text-center">{{ otpError }}</p>
              </div>

              <button
                type="submit"
                :disabled="otpLoading || otpValue.length < 6"
                class="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] shadow-sm disabled:opacity-50 transition-colors duration-200 cursor-pointer"
              >
                <LoadingLogo v-if="otpLoading" size="sm" class="mr-2 h-4 w-4" />
                {{ otpLoading ? 'Verifying...' : 'Verify & Continue' }}
              </button>

              <div class="text-center space-y-1.5 pt-1">
                <p class="text-xs text-zinc-500 dark:text-zinc-400">Didn't receive the code?</p>
                <button
                  type="button"
                  @click="handleResendOtp"
                  :disabled="resendCooldown > 0 || resendLoading"
                  class="text-xs font-semibold text-gray-900 hover:text-black dark:text-white dark:hover:text-zinc-200 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {{ resendLoading ? 'Sending...' : resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code' }}
                </button>
              </div>

              <div class="text-center pt-2">
                <button
                  type="button"
                  @click="goBack"
                  class="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
                >
                  ← Use a different email
                </button>
              </div>
            </form>
          </div>
        </transition>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useToast } from 'vue-toastification';
import LoadingLogo from '@/components/common/LoadingLogo.vue';
import heroBg from '@/assets/hero-bg-v4.jpg';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// ─── Step 1: Registration state ───
const step = ref('email'); // 'email' | 'details'
const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const emailError = ref('');
const loading = ref(false);
const error = ref('');
const turnstileToken = ref('');
const turnstileId = ref(null);

// ─── Step 2: OTP state ───
const showOtp = ref(false);
const registeredEmail = ref('');
const otpDigits = ref(['', '', '', '', '', '']);
const otpRefs = ref([]);
const otpError = ref('');
const otpLoading = ref(false);
const resendLoading = ref(false);
const resendCooldown = ref(0);
let _resendTimer = null;

const otpValue = computed(() => otpDigits.value.join(''));
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// ─── Step Transitions ───
const proceedToDetails = async () => {
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Please enter a valid email address.';
    return;
  }
  emailError.value = '';
  error.value = '';
  step.value = 'details';
  await nextTick();
  setTimeout(loadTurnstile, 80);
};

const backToEmail = () => {
  step.value = 'email';
  error.value = '';
};

// ─── OTP box interaction ───
const onOtpInput = (index, event) => {
  const val = event.target.value.replace(/\D/g, '');
  otpDigits.value[index] = val.slice(-1);
  if (val && index < 5) {
    nextTick(() => otpRefs.value[index + 1]?.focus());
  }
};

const onOtpKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    nextTick(() => otpRefs.value[index - 1]?.focus());
  }
};

const onOtpPaste = (event) => {
  event.preventDefault();
  const pasted = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
  pasted.split('').forEach((char, i) => {
    if (i < 6) otpDigits.value[i] = char;
  });
  nextTick(() => {
    const lastFilled = Math.min(pasted.length, 5);
    otpRefs.value[lastFilled]?.focus();
  });
};

// ─── Provider Login ───
const loginWithProvider = (provider) => {
  localStorage.setItem('lastProvider', provider);
  window.location.href = `${apiUrl}/auth/oauth/${provider}/login`;
};

// ─── Turnstile ───
const loadTurnstile = () => {
  if (typeof window !== 'undefined' && window.turnstile && document.getElementById('turnstile-container')) {
    try {
      if (turnstileId.value !== null) {
        window.turnstile.remove(turnstileId.value);
        turnstileId.value = null;
      }
      turnstileId.value = window.turnstile.render('#turnstile-container', {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
        callback: window.onTurnstileSuccess
      });
    } catch (e) {
      console.warn('Turnstile render warning:', e);
    }
  }
};

onMounted(() => {
  window.onTurnstileSuccess = (token) => {
    turnstileToken.value = token;
  };

  if (!document.getElementById('turnstile-script')) {
    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (step.value === 'details') loadTurnstile();
    };
    document.head.appendChild(script);
  }
});

onUnmounted(() => {
  if (window.turnstile && turnstileId.value !== null) {
    try {
      window.turnstile.remove(turnstileId.value);
    } catch (e) {}
  }
  clearInterval(_resendTimer);
});

// ─── Step 1: Registration ───
const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        turnstile_token: turnstileToken.value
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Registration failed.');

    registeredEmail.value = data.email;

    if (data.is_verified) {
      toast.success('Account created! Please log in.');
      router.push('/login');
      return;
    }

    // Show OTP screen
    showOtp.value = true;
    startResendCooldown();
    await nextTick();
    otpRefs.value[0]?.focus();
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.';
    if (window.turnstile && turnstileId.value !== null) {
      window.turnstile.reset(turnstileId.value);
      turnstileToken.value = '';
    }
  } finally {
    loading.value = false;
  }
};

// ─── Step 2: OTP Verification ───
const handleVerifyOtp = async () => {
  if (otpValue.value.length < 6) return;
  otpLoading.value = true;
  otpError.value = '';
  try {
    const res = await fetch(`${apiUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: registeredEmail.value, otp: otpValue.value })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Verification failed.');

    authStore.setTokens(data.access_token, data.refresh_token);
    try { await authStore.fetchUser(); } catch (e) {}

    toast.success('Email verified! Welcome to Memwyre 🎉');
    router.push('/memories');
  } catch (err) {
    otpError.value = err.message || 'Verification failed. Please try again.';
    otpDigits.value = ['', '', '', '', '', ''];
    await nextTick();
    otpRefs.value[0]?.focus();
  } finally {
    otpLoading.value = false;
  }
};

// ─── Resend OTP ───
const startResendCooldown = () => {
  resendCooldown.value = 30;
  _resendTimer = setInterval(() => {
    resendCooldown.value -= 1;
    if (resendCooldown.value <= 0) {
      clearInterval(_resendTimer);
      resendCooldown.value = 0;
    }
  }, 1000);
};

const handleResendOtp = async () => {
  if (resendCooldown.value > 0 || resendLoading.value) return;
  resendLoading.value = true;
  otpError.value = '';
  try {
    const res = await fetch(`${apiUrl}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: registeredEmail.value })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Failed to resend code.');
    toast.success('A new code was sent to your email.');
    startResendCooldown();
  } catch (err) {
    otpError.value = err.message || 'Failed to resend code.';
  } finally {
    resendLoading.value = false;
  }
};

const goBack = () => {
  showOtp.value = false;
  step.value = 'email';
  otpDigits.value = ['', '', '', '', '', ''];
  otpError.value = '';
  clearInterval(_resendTimer);
};
</script>

<style scoped>
</style>
