<template>
  <div class="min-h-screen flex items-center justify-center font-sans text-zinc-900 dark:text-zinc-100 bg-[#FDFCFB] dark:bg-[#141414] p-4 sm:p-6 lg:p-8">
    <!-- Main Form Card Container -->
    <div class="w-full max-w-[440px] py-8">
        <!-- ─── Continue As Known User State ─── -->
        <div v-if="lastKnownUser" class="text-center space-y-6 animate-in fade-in duration-300">
          <div class="flex justify-center flex-col items-center">
            <div class="h-20 w-20 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center text-3xl font-semibold border border-zinc-200 dark:border-zinc-700 shadow-sm mb-4">
              {{ lastKnownUser.name ? lastKnownUser.name.charAt(0).toUpperCase() : 'U' }}
            </div>
            <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">
              Welcome back, {{ lastKnownUser.name }}
            </h1>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ lastKnownUser.email }}</p>
          </div>

          <div class="pt-2">
            <button
              @click="continueAsUser"
              class="w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-[#1D9BF0] hover:bg-[#1A8CD8] shadow-sm transition-colors duration-200 cursor-pointer"
            >
              Continue as {{ lastKnownUser.name ? lastKnownUser.name.split(' ')[0] : 'User' }}
            </button>
          </div>

          <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              @click="switchAccount"
              class="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Not you? Switch account
            </button>
          </div>
        </div>

        <!-- ─── Standard Auth Form ─── -->
        <div v-else class="space-y-6 animate-in fade-in duration-300">
          <!-- Header -->
          <div>
            <router-link to="/" class="inline-block mb-4 group transition-opacity hover:opacity-80">
              <img src="/logo.png" alt="Memwyre" class="h-8 w-auto dark:invert opacity-95" />
            </router-link>
            <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2 whitespace-nowrap">
              Reconnect to your memory layer
            </h1>
            <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
              Sign in to resume continuous context across all your AI tools.
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
              Continue with Google
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
              Continue with GitHub
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
          <form v-if="step === 'email'" @submit.prevent="proceedToPassword" class="space-y-4">
            <div>
              <label for="login-email" class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Email address
              </label>
              <div class="relative">
                <input
                  id="login-email"
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
              Protected by Memwyre. By signing in, you agree to our
              <router-link to="/terms" class="underline hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Terms</router-link>
              and
              <router-link to="/privacy" class="underline hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Privacy</router-link>.
            </p>
          </form>

          <!-- ─── STEP 2: Password Input & Login ─── -->
          <form v-else @submit.prevent="handleLogin" class="space-y-4 animate-in fade-in duration-200">
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

            <!-- Password field -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label for="login-password" class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Password
                </label>
                <router-link
                  to="/forgot-password"
                  class="text-xs font-medium text-gray-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                >
                  Forgot password?
                </router-link>
              </div>

              <div class="relative">
                <input
                  id="login-password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
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
              {{ loading ? 'Authenticating...' : 'Log in' }}
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

          <!-- Switch to Signup -->
          <div class="text-center pt-2">
            <p class="text-sm text-zinc-500 dark:text-zinc-400">
              Don't have an account?
              <router-link
                to="/signup"
                class="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline transition-colors ml-1"
              >
                Sign up
              </router-link>
            </p>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '../services/api';
import LoadingLogo from '@/components/common/LoadingLogo.vue';
import heroBg from '@/assets/hero-bg-v4.jpg';

const step = ref('email'); // 'email' | 'password'
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const emailError = ref('');
const loading = ref(false);
const error = ref('');
const turnstileToken = ref('');
const turnstileId = ref(null);
const lastKnownUser = ref(null);
const lastProvider = ref(null);

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

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

const proceedToPassword = async () => {
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Please enter a valid email address.';
    return;
  }
  emailError.value = '';
  error.value = '';
  step.value = 'password';
  await nextTick();
  setTimeout(loadTurnstile, 80);
};

const backToEmail = () => {
  step.value = 'email';
  error.value = '';
};

const handleSuccessfulLogin = async (defaultRedirect = '/memories') => {
  if (authStore.user && authStore.user.name) {
    toast.success(`Welcome back, ${authStore.user.name}!`);
  }

  const redirectUri = route.query.redirect_uri || sessionStorage.getItem('cli_redirect_uri');
  const cliPort = route.query.cli_port || sessionStorage.getItem('cli_port');
  const clientName = route.query.client || sessionStorage.getItem('cli_client') || 'CLI Auto-Generated';

  if (redirectUri || cliPort) {
    try {
      const res = await api.post('/user/api-keys', { name: clientName });
      const newKey = res.data.key;

      sessionStorage.removeItem('cli_redirect_uri');
      sessionStorage.removeItem('cli_port');
      sessionStorage.removeItem('cli_client');

      const targetUri = cliPort ? `http://localhost:${cliPort}/callback` : redirectUri;
      window.location.href = `${targetUri}?token=${newKey}`;
      return;
    } catch (e) {
      console.error('Failed to generate CLI token', e);
      toast.error('Failed to authenticate CLI.');
    }
  }

  const redirectPath = route.query.redirect || defaultRedirect;
  router.push(redirectPath);
};

const loginWithProvider = (provider) => {
  localStorage.setItem('lastProvider', provider);

  if (route.query.cli_port) sessionStorage.setItem('cli_port', route.query.cli_port);
  if (route.query.redirect_uri) sessionStorage.setItem('cli_redirect_uri', route.query.redirect_uri);
  if (route.query.client) sessionStorage.setItem('cli_client', route.query.client);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.memwyre.tech/api/v1';
  let url = `${apiUrl}/auth/oauth/${provider}/login`;

  const queryParams = new URLSearchParams();
  const activeCliPort = route.query.cli_port || sessionStorage.getItem('cli_port');
  const activeRedirectUri = route.query.redirect_uri || sessionStorage.getItem('cli_redirect_uri');
  const activeClient = route.query.client || sessionStorage.getItem('cli_client');

  if (activeCliPort) queryParams.append('cli_port', activeCliPort);
  if (activeRedirectUri) queryParams.append('redirect_uri', activeRedirectUri);
  if (activeClient) queryParams.append('client', activeClient);

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  window.location.href = url;
};

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.login(email.value, password.value, turnstileToken.value);
    localStorage.setItem('lastProvider', 'email');
    await handleSuccessfulLogin();
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      error.value = err.response.data.detail;
    } else if (err.message) {
      error.value = err.message;
    } else {
      error.value = 'Invalid email or password. Please try again.';
    }
    console.error('Login Error Details:', err);
    if (window.turnstile && turnstileId.value !== null) {
      window.turnstile.reset(turnstileId.value);
      turnstileToken.value = '';
    }
  } finally {
    loading.value = false;
  }
};

const handleGoogleOneTapResponse = async (response) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.memwyre.tech/api/v1';
    const res = await fetch(`${apiUrl}/auth/google-one-tap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential })
    });

    if (!res.ok) throw new Error('Google One Tap Failed');

    const data = await res.json();
    authStore.setTokens(data.access_token, data.refresh_token);
    localStorage.setItem('lastProvider', 'google');
    await handleSuccessfulLogin();
  } catch (e) {
    console.error('Google One Tap Error', e);
  }
};

onMounted(async () => {
  window.onTurnstileSuccess = (token) => {
    turnstileToken.value = token;
  };

  if (route.query.cli_port) sessionStorage.setItem('cli_port', route.query.cli_port);
  if (route.query.redirect_uri) sessionStorage.setItem('cli_redirect_uri', route.query.redirect_uri);
  if (route.query.client) sessionStorage.setItem('cli_client', route.query.client);

  const token = localStorage.getItem('token');
  const cliPort = route.query.cli_port || sessionStorage.getItem('cli_port');
  const redirectUri = route.query.redirect_uri || sessionStorage.getItem('cli_redirect_uri');

  if (token && (cliPort || redirectUri)) {
    try {
      await authStore.fetchUser();
      await handleSuccessfulLogin();
      return;
    } catch (e) {
      console.warn('Existing session auto-login for CLI failed:', e);
    }
  }

  const accessToken = route.query.access_token;
  const refreshToken = route.query.refresh_token;

  if (accessToken) {
    authStore.setTokens(accessToken, refreshToken);
    const query = { ...route.query };
    delete query.access_token;
    delete query.refresh_token;
    router.replace({ query });
    setTimeout(() => handleSuccessfulLogin(), 100);
    return;
  }

  try {
    const storedUser = localStorage.getItem('lastKnownUser');
    const storedProvider = localStorage.getItem('lastProvider');
    if (storedUser && storedProvider) {
      lastKnownUser.value = JSON.parse(storedUser);
      lastProvider.value = storedProvider;
    }
  } catch (e) {}

  if (!document.getElementById('turnstile-script')) {
    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (step.value === 'password') loadTurnstile();
    };
    document.head.appendChild(script);
  }

  if (window.google) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    window.google.accounts.id.initialize({
      client_id: clientId || '',
      callback: handleGoogleOneTapResponse,
      auto_select: true,
      use_fedcm_for_prompt: true
    });
    window.google.accounts.id.prompt();
  }
});

onUnmounted(() => {
  if (window.turnstile && turnstileId.value !== null) {
    try {
      window.turnstile.remove(turnstileId.value);
    } catch (e) {}
  }
});

const continueAsUser = () => {
  if (lastProvider.value && lastProvider.value !== 'email') {
    loginWithProvider(lastProvider.value);
  } else {
    switchAccount();
    email.value = lastKnownUser.value?.email || '';
  }
};

const switchAccount = async () => {
  lastKnownUser.value = null;
  lastProvider.value = null;
  localStorage.removeItem('lastKnownUser');
  localStorage.removeItem('lastProvider');
  step.value = 'email';

  await nextTick();
};
</script>

<style scoped>
</style>
