<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import { useAuthStore } from './stores/auth'
import { useProjectStore } from './stores/project'
import { useBillingStore } from './stores/billing'

// Initialize theme store to ensure dark mode preference persists on reload
const isClient = typeof window !== 'undefined'
if (isClient) {
  useThemeStore()
}

const authStore = isClient ? useAuthStore() : null

onMounted(async () => {
  // Remove the anti-flash style that hides prerendered landing page on app domain
  const antiFlash = document.getElementById('anti-flash')
  if (antiFlash) antiFlash.remove()
  document.documentElement.removeAttribute('data-app-domain')

  if (!authStore || !authStore.isAuthenticated) return
  try {
    await authStore.fetchUser()
    const projectStore = useProjectStore()
    const billingStore = useBillingStore()
    await Promise.allSettled([
      projectStore.fetchProjects(),
      billingStore.fetchStatus()
    ])
  } catch (e) {
    // Keep app usable even if profile sync fails.
  }
})
</script>

<template>
  <div class="min-h-screen text-[#2D2B2A] dark:text-[#FAF6F0] relative">
    <RouterView />
  </div>
</template>

<style>
/* Global styles are imported in main.js via style.css */
</style>
