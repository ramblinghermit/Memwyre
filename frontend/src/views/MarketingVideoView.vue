<template>
  <div class="marketing-video-view min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col items-center justify-between p-4 sm:p-6 overflow-x-hidden">
    <!-- Top Bar -->
    <header class="w-full max-w-6xl flex items-center justify-between py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md mb-4">
      <div class="flex items-center gap-3">
        <router-link 
          to="/" 
          class="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Home</span>
        </router-link>
        <span class="text-white/20">|</span>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-sm font-semibold tracking-tight text-white/90">Marketing Video Animation</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-mono">24s Auto-Loop</span>
        </div>
      </div>

      <!-- Quick Hint -->
      <div class="hidden sm:flex items-center gap-3 text-xs text-white/50">
        <span class="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px] text-white/80">Space</span> Play/Pause
        <span class="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px] text-white/80">← / →</span> Seek
        <span class="px-2 py-0.5 rounded bg-white/10 font-mono text-[11px] text-white/80">F</span> Fullscreen
      </div>
    </header>

    <!-- Main Player Container -->
    <main class="w-full flex-1 flex items-center justify-center py-2">
      <MarketingAgentVideo />
    </main>

    <!-- Bottom Footer Notes -->
    <footer class="w-full max-w-xl text-center py-3 text-xs text-white/40 font-normal">
      Programmatic Marketing Animation • Built with Vue 3 &amp; Tailored CSS Transitions • Test Route: <code class="text-white/60">/marketing-video</code>
    </footer>
  </div>
</template>

<script setup>
import MarketingAgentVideo from '@/components/marketing/MarketingAgentVideo.vue'
</script>

<style scoped>
.marketing-video-view {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
</style>
