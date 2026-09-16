<template>
  <div class="w-full group py-1">
    <div class="w-full bg-[#18181A] rounded-[1.25rem] overflow-hidden shadow-2xl border border-[#2E2E32] text-left">

      <!-- Dark Header Bar with macOS Window Dots -->
      <div class="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2E] bg-[#141416]">
        <div class="flex gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#52525B]"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#52525B]"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#52525B]"></span>
        </div>
        <span class="text-[11px] text-gray-500 font-mono ml-2">claude-code — terminal</span>
      </div>

      <!-- Terminal Body -->
      <div class="p-5 font-mono text-[11px] sm:text-[12px] leading-relaxed text-[#D4D4D8] space-y-3 select-none">

        <!-- Welcome Banner -->
        <div class="flex items-center gap-2 text-xs">
          <span class="text-[#D97756] font-bold text-sm">*</span>
          <span class="text-[#E4E4E7] font-medium">Welcome to <span class="text-[#D97756] font-semibold">Claude Code!</span></span>
        </div>

        <!-- Code Block -->
        <div class="space-y-1 text-[#A1A1AA] pt-1">
          <div>
            <span class="text-[#E4E4E7] font-medium">while</span><span class="text-[#D4D4D8]">(curious) {</span>
          </div>
          <div class="pl-4 text-[#A1A1AA]">
            <span>question_everything();</span>
          </div>
          <div class="pl-4 text-[#A1A1AA]">
            <span>dig_deeper();</span>
          </div>
          <div class="pl-4 text-[#A1A1AA]">
            <span>connect_dots(unexpected);</span>
          </div>
          
          <div class="pt-2 pl-4">
            <span class="text-[#E4E4E7] font-medium">if</span> <span class="text-[#D4D4D8]">(stuck) {</span>
          </div>
          <div class="pl-8 text-[#D97756] font-medium">
            <span>keep_thinking();</span>
          </div>
          <div class="pl-4 text-[#D4D4D8]">
            <span>}</span>
          </div>
          
          <div class="text-[#D4D4D8]">
            <span>}</span>
          </div>
        </div>

        <!-- Status / Simmering line -->
        <div class="pt-2 flex items-center gap-2 text-[#D97756] border-t border-[#2A2A2E]/60 text-xs">
          <span class="font-bold">*</span>
          <span class="font-medium text-[#E28766]">Simmering...</span>
          <span class="inline-block w-1.5 h-3.5 bg-[#D97756] ml-1 animate-pulse"></span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
