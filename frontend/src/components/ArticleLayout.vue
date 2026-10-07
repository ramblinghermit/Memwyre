<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';

const props = defineProps({
  // Breadcrumbs / Meta
  section: {
    type: String,
    default: 'Research'
  },
  sectionLabel: {
    type: String,
    default: ''
  },
  sectionTo: {
    type: [String, Object],
    default: '/research'
  },
  category: {
    type: String,
    default: ''
  },
  categoryTo: {
    type: [String, Object],
    default: null
  },
  date: {
    type: String,
    default: ''
  },
  readTime: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  coverAlt: {
    type: String,
    default: 'Cover'
  },
  // Author
  authorName: {
    type: String,
    default: 'Himansh Shivhare'
  },
  authorSub: {
    type: String,
    default: ''
  },
  authorRole: {
    type: String,
    default: ''
  },
  authorAvatar: {
    type: String,
    default: 'https://avatars.githubusercontent.com/u/170114968?v=4'
  },
  // Table of Contents
  toc: {
    type: Array,
    default: () => []
  },
  activeSection: {
    type: String,
    default: ''
  },
  // Sharing
  shareTitle: {
    type: String,
    default: ''
  },
  shareLabel: {
    type: String,
    default: 'SHARE THIS ARTICLE'
  }
});

const emit = defineEmits(['update:activeSection']);

const effectiveSection = computed(() => props.sectionLabel || props.section || 'Research');
const effectiveAuthorSub = computed(() => props.authorRole || props.authorSub || '');
const formattedReadTime = computed(() => {
  if (!props.readTime) return '';
  return props.readTime.toUpperCase().includes('READ') ? props.readTime : `${props.readTime} READ`;
});

const internalActiveSection = ref(props.activeSection);

const currentActiveSection = computed({
  get: () => props.activeSection || internalActiveSection.value,
  set: (val) => {
    internalActiveSection.value = val;
    emit('update:activeSection', val);
  }
});

const normalizedToc = computed(() => {
  if (!props.toc || props.toc.length === 0) return [];
  
  // Check if toc is already hierarchical with children
  const hasChildren = props.toc.some(item => item.children && item.children.length > 0);
  
  if (hasChildren && props.toc.length <= 5) {
    return props.toc.map(item => ({
      text: item.text,
      slug: item.slug,
      children: (item.children || []).map(c => ({
        text: c.text,
        slug: c.slug
      }))
    }));
  }

  // If toc has level 2 and level 3 headings
  const hasLevels = props.toc.some(item => item.level && item.level >= 3);
  if (hasLevels) {
    const majors = [];
    let currentMajor = null;

    props.toc.forEach(item => {
      if (item.level === 2 || !currentMajor) {
        currentMajor = {
          text: item.text,
          slug: item.slug,
          children: []
        };
        majors.push(currentMajor);
      } else {
        currentMajor.children.push({
          text: item.text,
          slug: item.slug
        });
      }
    });

    // If majors <= 5, return them
    if (majors.length <= 5) {
      return majors;
    }

    // If more than 5 majors, cluster them into at most 4-5 major points
    return clusterMajors(majors, 5);
  }

  // Flat list with > 5 items: cluster into at most 5 major points
  if (props.toc.length > 5) {
    return clusterFlatList(props.toc, 5);
  }

  // 1-5 flat items: convert to standard format with empty children
  return props.toc.map(item => ({
    text: item.text,
    slug: item.slug,
    children: (item.children || []).map(c => ({
      text: c.text,
      slug: c.slug
    }))
  }));
});

// Cluster an array of majors with existing children into at most maxCount items
function clusterMajors(majors, maxCount = 5) {
  if (majors.length <= maxCount) return majors;

  const chunkSize = Math.ceil(majors.length / maxCount);
  const clustered = [];

  for (let i = 0; i < majors.length; i += chunkSize) {
    const chunk = majors.slice(i, i + chunkSize);
    const primary = chunk[0];
    const combinedChildren = [...(primary.children || [])];

    // Other items in chunk become sub-points of the primary
    for (let j = 1; j < chunk.length; j++) {
      combinedChildren.push({
        text: chunk[j].text,
        slug: chunk[j].slug
      });
      if (chunk[j].children && chunk[j].children.length > 0) {
        combinedChildren.push(...chunk[j].children);
      }
    }

    clustered.push({
      text: primary.text,
      slug: primary.slug,
      children: combinedChildren
    });
  }

  return clustered.slice(0, maxCount);
}

// Cluster a flat list into at most maxCount major points with child sub-points
function clusterFlatList(list, maxCount = 5) {
  const chunkSize = Math.ceil(list.length / maxCount);
  const clustered = [];

  for (let i = 0; i < list.length; i += chunkSize) {
    const chunk = list.slice(i, i + chunkSize);
    const primary = chunk[0];
    const children = chunk.slice(1).map(c => ({
      text: c.text,
      slug: c.slug
    }));

    clustered.push({
      text: primary.text,
      slug: primary.slug,
      children
    });
  }

  return clustered.slice(0, maxCount);
}

// Helper to check if a major heading or one of its children is currently active
const isSectionOrChildActive = (heading) => {
  if (currentActiveSection.value === heading.slug) return true;
  if (heading.children && heading.children.length > 0) {
    return heading.children.some(child => child.slug === currentActiveSection.value);
  }
  return false;
};

// Set initial active section if none provided
onMounted(() => {
  if (!currentActiveSection.value && normalizedToc.value.length > 0) {
    currentActiveSection.value = normalizedToc.value[0].slug;
  }
});

const pageUrl = computed(() => (typeof window !== 'undefined' ? window.location.href : ''));
const effectiveShareTitle = computed(() => props.shareTitle || props.title || 'Memwyre');

const copied = ref(false);
const copyLink = () => {
  if (typeof window !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  }
};
</script>

<template>
  <div class="relative min-h-screen bg-white dark:bg-[#0c0c0c] pt-14 sm:pt-16 pb-0 [overflow-x:clip] font-sans">
    <!-- Grid Blueprint background line effects -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    <div class="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10 animate-fade-in">
      
      <!-- 2-Column Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-0 pb-24">
        
        <!-- Left Sidebar (Author, Dynamic Ruler TOC, Related Links, Sharing) -->
        <aside class="lg:col-span-3 lg:border-r border-gray-200 dark:border-gray-800 lg:pr-8 pt-4 text-left">
          <div class="sticky top-20 space-y-7 max-h-[calc(100vh-5.5rem)] overflow-y-auto pr-2">
            
            <!-- Author Card -->
            <slot name="author">
              <div class="flex items-center gap-3">
                <img 
                  :src="authorAvatar" 
                  :alt="authorName" 
                  class="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-zinc-800"
                  @error="$event.target.src = 'https://ui-avatars.com/api/?name=Himansh+Shivhare&background=f3f4f6&color=333'"
                />
                <div>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white block">
                    {{ authorName }}
                  </span>
                  <span v-if="effectiveAuthorSub" class="text-[11px] text-gray-500 font-mono">
                    {{ effectiveAuthorSub }}
                  </span>
                </div>
              </div>
            </slot>

            <!-- Table of Contents (Ruler & Tick Marks Layout) -->
            <div v-if="normalizedToc && normalizedToc.length > 0" class="hidden lg:block pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-5">ON THIS PAGE</div>
              <nav class="relative pl-0 space-y-0">
                <div v-for="(heading, idx) in normalizedToc" :key="heading.slug" class="relative group">
                  <!-- Major Section Item Link -->
                  <a
                    :href="`#${heading.slug}`"
                    @click="currentActiveSection = heading.slug"
                    class="flex items-start gap-3.5 transition-colors duration-150 py-0.5 group"
                    :class="isSectionOrChildActive(heading)
                      ? 'text-gray-950 dark:text-white font-semibold' 
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-zinc-100 font-normal'"
                  >
                    <!-- Left Major Tick -->
                    <div class="w-8 shrink-0 flex items-center pt-[9px]">
                      <span
                        class="block transition-all duration-200"
                        :class="isSectionOrChildActive(heading)
                          ? 'w-8 h-[2.5px] bg-[#0562ef]' 
                          : 'w-4.5 h-[1.5px] bg-[#c9cbcc] dark:bg-zinc-600 group-hover:w-6 group-hover:bg-gray-600 dark:group-hover:bg-zinc-300'"
                      ></span>
                    </div>

                    <!-- Section Title -->
                    <span class="text-[14.5px] leading-[1.35] tracking-[-0.01em]">
                      {{ heading.text }}
                    </span>
                  </a>

                  <!-- Blank Dashes representing the real sub-points under this major section -->
                  <div v-if="heading.children && heading.children.length > 0" class="flex flex-col gap-2.5 py-1.5 pl-0 my-0.5">
                    <a
                      v-for="(sub, subIdx) in heading.children"
                      :key="sub.slug"
                      :href="`#${sub.slug}`"
                      @click="currentActiveSection = sub.slug"
                      :title="sub.text"
                      class="group/sub flex items-center h-2 cursor-pointer py-1"
                    >
                      <span
                        class="block h-[1.5px] transition-all duration-200"
                        :class="[
                          currentActiveSection === sub.slug
                            ? 'w-6 bg-[#0562ef] h-[2px]'
                            : isSectionOrChildActive(heading)
                              ? (subIdx === 0 ? 'w-5 bg-[#d1d5db] dark:bg-zinc-700 group-hover/sub:w-6 group-hover/sub:bg-[#0562ef]' :
                                 subIdx === 1 ? 'w-4 bg-[#d1d5db] dark:bg-zinc-700 group-hover/sub:w-6 group-hover/sub:bg-[#0562ef]' :
                                 subIdx === 2 ? 'w-3 bg-[#e5e7eb] dark:bg-zinc-800 group-hover/sub:w-6 group-hover/sub:bg-[#0562ef]' :
                                                'w-2.5 bg-[#e5e7eb] dark:bg-zinc-800 group-hover/sub:w-6 group-hover/sub:bg-[#0562ef]')
                              : 'w-2.5 bg-[#e2e4e6] dark:bg-zinc-800 group-hover/sub:w-5 group-hover/sub:bg-gray-400 dark:group-hover/sub:bg-zinc-500'
                        ]"
                      ></span>
                    </a>
                  </div>

                  <!-- Default decorative spacing dashes if major heading has no sub-points (except last) -->
                  <div v-else-if="idx < normalizedToc.length - 1" class="flex flex-col gap-2.5 py-1.5 pl-0 my-0.5 select-none pointer-events-none">
                    <span
                      v-for="tick in 3"
                      :key="tick"
                      class="block h-[1px] transition-all duration-200"
                      :class="[
                        currentActiveSection === heading.slug
                          ? (tick === 1 ? 'w-5 bg-[#d1d5db] dark:bg-zinc-700' :
                             tick === 2 ? 'w-4 bg-[#d1d5db] dark:bg-zinc-700' :
                                          'w-2.5 bg-[#e5e7eb] dark:bg-zinc-800')
                          : 'w-2.5 bg-[#e2e4e6] dark:bg-zinc-800'
                      ]"
                    ></span>
                  </div>
                </div>
              </nav>
            </div>

            <!-- Related Links / Studies Slot -->
            <slot name="sidebar-links">
              <slot name="related"></slot>
            </slot>

            <!-- Social Share Buttons -->
            <div class="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-900">
              <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold">{{ shareLabel }}</div>
              <div class="flex items-center gap-2">
                <a 
                  :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                  aria-label="Share on LinkedIn"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a 
                  :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(effectiveShareTitle)}`" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111]"
                  aria-label="Share on X / Twitter"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <button 
                  @click="copyLink"
                  class="w-9 h-9 rounded border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:text-[#D97757] dark:hover:text-[#D97757] transition-all bg-white dark:bg-[#111] cursor-pointer"
                  aria-label="Copy article link"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
              <div v-if="copied" class="text-[10px] text-[#D97757] font-mono">Link copied to clipboard!</div>
            </div>

          </div>
        </aside>

        <!-- Main Content Column -->
        <main class="lg:col-span-9 px-0 lg:pl-8 pt-4 text-left">
          
          <!-- Article Header -->
          <div class="space-y-3.5 mb-8 text-left">
            <!-- Operational Path Navigation -->
            <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider flex-wrap">
              <router-link 
                :to="sectionTo" 
                class="text-gray-400 dark:text-gray-500 hover:text-[#D97757] transition-colors"
              >
                {{ effectiveSection }}
              </router-link>
              <template v-if="category">
                <span class="text-gray-300 dark:text-gray-700">/</span>
                <router-link 
                  v-if="categoryTo"
                  :to="categoryTo"
                  class="text-[#D97757] hover:text-[#c05c3d] transition-colors"
                >
                  {{ category }}
                </router-link>
                <span v-else class="text-[#D97757]">
                  {{ category }}
                </span>
              </template>
              <template v-if="date">
                <span class="text-gray-300 dark:text-gray-700">/</span>
                <span class="text-gray-400 dark:text-gray-500 font-normal">
                  {{ date }}
                </span>
              </template>
            </nav>

            <!-- Heading Slot or Prop -->
            <slot name="title">
              <h1 class="font-sans font-normal text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.2] text-black dark:text-white">
                {{ title }}
              </h1>
            </slot>

            <!-- Read Time & Badges -->
            <div v-if="formattedReadTime || badge" class="text-[10px] tracking-wider uppercase font-mono text-gray-400 dark:text-gray-500 pt-1">
              <span v-if="formattedReadTime">{{ formattedReadTime }}</span>
              <span v-if="formattedReadTime && badge"> · </span>
              <span v-if="badge">{{ badge }}</span>
            </div>
          </div>

          <!-- Cover Image Slot or Prop -->
          <slot name="cover">
            <div v-if="coverImage" class="w-full aspect-[2/1] overflow-hidden mb-10 bg-gray-50 dark:bg-zinc-900/30">
              <img 
                :src="coverImage" 
                :alt="coverAlt" 
                class="w-full h-full object-cover" 
                @error="$event.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'" 
              />
            </div>
          </slot>

          <!-- Main Article Body -->
          <slot></slot>

          <!-- Bottom Footer / CTA / Next Reading Slot -->
          <slot name="after-content">
            <slot name="footer"></slot>
          </slot>

        </main>
      </div>

    </div>
    
    <SiteFooter />
  </div>
</template>
