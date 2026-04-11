<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-3 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-2 scale-95"
  >
    <button
      v-show="visible"
      type="button"
      class="bm-scroll-top fixed bottom-6 right-6 z-[99] flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/35 ring-2 ring-white/90 hover:from-blue-700 hover:to-indigo-800 hover:shadow-xl hover:shadow-blue-600/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 active:scale-95 md:bottom-8 md:right-8 md:h-14 md:w-14"
      aria-label="Ýokary gaýt"
      title="Ýokary gaýt"
      @click="scrollTop"
    >
      <ChevronUp class="w-6 h-6 md:w-7 md:h-7" :stroke-width="2.25" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted, inject } from 'vue'
import { ChevronUp } from 'lucide-vue-next'

const bmLenis = inject('bmLenis')
const visible = ref(false)
const THRESHOLD = 420
let cleanup = () => {}

function scrollTop() {
  const L = bmLenis.value
  if (L) {
    L.scrollTo(0, { duration: prefersReduced() ? 0 : 0.9 })
  } else {
    window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' })
  }
}

function prefersReduced() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches
}

function bind() {
  cleanup()
  const L = bmLenis.value
  if (L) {
    const update = () => {
      visible.value = L.scroll > THRESHOLD
    }
    cleanup = L.on('scroll', update)
    update()
  } else {
    const update = () => {
      visible.value = window.scrollY > THRESHOLD
    }
    window.addEventListener('scroll', update, { passive: true })
    cleanup = () => window.removeEventListener('scroll', update)
    update()
  }
}

watch(bmLenis, bind, { immediate: true })
onUnmounted(() => cleanup())
</script>
