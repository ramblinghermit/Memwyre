<template>
  <div class="shape-morph-wrapper relative inline-flex items-center justify-center">
    <svg
      :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`"
      :width="widthAttr"
      :height="heightAttr"
      class="shape-morph block overflow-visible select-none"
      aria-hidden="true"
    >
      <defs>
        <!-- Optional Drop Shadow / Glow filter -->
        <filter v-if="glow" id="shape-morph-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" :flood-color="glowColor" flood-opacity="0.25" />
        </filter>
      </defs>

      <!-- Morphing Rect Shape -->
      <rect
        :x="x"
        :y="y"
        :width="width"
        :height="height"
        :rx="radius"
        :ry="radius"
        :fill="fill"
        :stroke="stroke"
        :stroke-width="strokeWidth"
        :filter="glow ? 'url(#shape-morph-glow)' : undefined"
        class="transition-colors duration-200"
      />

      <!-- Optional Embedded SVG Slot -->
      <g :transform="`translate(${x}, ${y})`">
        <foreignObject
          v-if="$slots.default"
          :width="width"
          :height="height"
          class="overflow-hidden pointer-events-none"
        >
          <div class="w-full h-full flex items-center justify-center pointer-events-auto">
            <slot
              :progress="effectiveProgress"
              :width="width"
              :height="height"
              :radius="radius"
              :x="x"
              :y="y"
              :is-pill="isPillState"
              :is-rect="isRectState"
            />
          </div>
        </foreignObject>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  /**
   * Controlled animation progress (0.0 to 1.0).
   * If provided, overrides internal playback.
   */
  progress: {
    type: Number,
    default: null
  },
  /** Start Dimensions (Pill state) */
  startWidth: {
    type: Number,
    default: 120
  },
  startHeight: {
    type: Number,
    default: 44
  },
  startRadius: {
    type: Number,
    default: 22
  },
  /** End Dimensions (Rounded Rectangle state) */
  endWidth: {
    type: Number,
    default: 280
  },
  endHeight: {
    type: Number,
    default: 120
  },
  endRadius: {
    type: Number,
    default: 20
  },
  /** SVG ViewBox dimensions */
  viewBoxWidth: {
    type: Number,
    default: 400
  },
  viewBoxHeight: {
    type: Number,
    default: 180
  },
  /** Rendered width/height attributes (defaults to viewBox dimensions) */
  svgWidth: {
    type: [Number, String],
    default: null
  },
  svgHeight: {
    type: [Number, String],
    default: null
  },
  /** Position behavior: 'center' automatically centers in viewBox; 'fixed' uses fixedX / fixedY */
  center: {
    type: Boolean,
    default: true
  },
  fixedX: {
    type: Number,
    default: 60
  },
  fixedY: {
    type: Number,
    default: null
  },
  /** Visual Styling */
  fill: {
    type: String,
    default: 'currentColor'
  },
  stroke: {
    type: String,
    default: 'none'
  },
  strokeWidth: {
    type: Number,
    default: 0
  },
  glow: {
    type: Boolean,
    default: false
  },
  glowColor: {
    type: String,
    default: '#000000'
  },
  /** Self-contained Playback Configuration */
  duration: {
    type: Number,
    default: 1200
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: false
  },
  /**
   * Overlap Phase Configuration:
   * - widthEnd: timeline fraction when width reaches final size (~0.55)
   * - heightStart: timeline fraction when height begins expansion (~0.38)
   * - radiusStart: timeline fraction when radius transition begins (~0.35)
   */
  widthEndFraction: {
    type: Number,
    default: 0.55
  },
  heightStartFraction: {
    type: Number,
    default: 0.38
  },
  radiusStartFraction: {
    type: Number,
    default: 0.35
  }
})

const emit = defineEmits(['update:progress', 'start', 'complete'])

// Internal progress for self-contained playback
const internalProgress = ref(0)
let rafId = null
let isPlaying = ref(false)

// Effective progress: controlled prop has priority if specified
const effectiveProgress = computed(() => {
  const p = props.progress !== null && props.progress !== undefined
    ? props.progress
    : internalProgress.value
  return Math.max(0, Math.min(1, p))
})

/**
 * Linear Interpolation
 */
function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * Smoothstep cubic easing: 3t^2 - 2t^3
 * Zero first-derivative at endpoints, perfectly continuous, no bounce or overshoot.
 */
function easeSmoothstep(t) {
  const clamped = Math.max(0, Math.min(1, t))
  return clamped * clamped * (3 - 2 * clamped)
}

/**
 * Phase 1: Width Expansion
 * Begins immediately at progress 0, completing around `widthEndFraction` (~0.55).
 */
const width = computed(() => {
  const p = effectiveProgress.value
  const t = easeSmoothstep(Math.min(p / props.widthEndFraction, 1))
  return lerp(props.startWidth, props.endWidth, t)
})

/**
 * Phase 2: Height Expansion
 * Begins at `heightStartFraction` (~0.38) before width finishes, smoothly overlapping.
 */
const height = computed(() => {
  const p = effectiveProgress.value
  const fractionRemaining = 1 - props.heightStartFraction
  const rawT = Math.max(0, (p - props.heightStartFraction) / fractionRemaining)
  const t = easeSmoothstep(Math.min(rawT, 1))
  return lerp(props.startHeight, props.endHeight, t)
})

/**
 * Corner Radius
 * Retains capsule pill curvature (rx = startHeight / 2) during horizontal expansion,
 * then gently settles toward rounded rectangle (endRadius).
 */
const radius = computed(() => {
  const p = effectiveProgress.value
  const fractionRemaining = 1 - props.radiusStartFraction
  const rawT = Math.max(0, (p - props.radiusStartFraction) / fractionRemaining)
  const t = easeSmoothstep(Math.min(rawT, 1))
  const target = lerp(props.startRadius, props.endRadius, t)

  // Guard: Corner radius must never exceed half of current height for smooth convex curvature
  return Math.min(target, height.value / 2)
})

/**
 * Horizontal Position (X)
 */
const x = computed(() => {
  if (props.center) {
    return (props.viewBoxWidth - width.value) / 2
  }
  return props.fixedX
})

/**
 * Vertical Position (Y)
 */
const y = computed(() => {
  if (props.fixedY !== null && props.fixedY !== undefined) {
    return props.fixedY
  }
  return (props.viewBoxHeight - height.value) / 2
})

const widthAttr = computed(() => props.svgWidth || props.viewBoxWidth)
const heightAttr = computed(() => props.svgHeight || props.viewBoxHeight)

// Convenient state helpers for template slot consumers
const isPillState = computed(() => effectiveProgress.value < 0.1)
const isRectState = computed(() => effectiveProgress.value > 0.9)

/**
 * Animation Driver: play()
 * Returns a Promise that resolves when progress reaches 1.0.
 */
function play({ duration = props.duration, loop = props.loop } = {}) {
  stop()
  isPlaying.value = true
  emit('start')

  return new Promise((resolve) => {
    const startTime = performance.now()
    const startProgress = internalProgress.value >= 1 ? 0 : internalProgress.value

    function frame(now) {
      if (!isPlaying.value) {
        resolve()
        return
      }

      const elapsed = now - startTime
      const progressFraction = Math.min(startProgress + elapsed / duration, 1)
      internalProgress.value = progressFraction
      emit('update:progress', progressFraction)

      if (progressFraction < 1) {
        rafId = requestAnimationFrame(frame)
      } else {
        emit('complete')
        if (loop) {
          internalProgress.value = 0
          rafId = requestAnimationFrame(frame)
        } else {
          isPlaying.value = false
          resolve()
        }
      }
    }

    rafId = requestAnimationFrame(frame)
  })
}

function pause() {
  isPlaying.value = false
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function stop() {
  pause()
}

function reset() {
  stop()
  internalProgress.value = 0
  emit('update:progress', 0)
}

function seek(targetProgress) {
  stop()
  internalProgress.value = Math.max(0, Math.min(1, targetProgress))
  emit('update:progress', internalProgress.value)
}

// Watch external progress if driven reactively
watch(
  () => props.progress,
  (newVal) => {
    if (newVal !== null && newVal !== undefined) {
      internalProgress.value = Math.max(0, Math.min(1, newVal))
    }
  }
)

onMounted(() => {
  if (props.autoPlay) {
    play()
  }
})

onBeforeUnmount(() => {
  stop()
})

defineExpose({
  play,
  pause,
  stop,
  reset,
  seek,
  progress: effectiveProgress,
  isPlaying,
  width,
  height,
  radius,
  x,
  y
})
</script>

<style scoped>
.shape-morph {
  contain: layout style;
  will-change: transform;
}
</style>
