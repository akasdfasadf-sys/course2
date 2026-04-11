<template>
  <div
    class="bm-scroll-progress fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
    aria-hidden="true"
  >
    <div
      class="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 origin-left transition-[transform] duration-150 ease-out shadow-[0_0_12px_rgba(37,99,235,0.45)]"
      :style="{ transform: `scaleX(${pct / 100})` }"
    />
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, inject } from 'vue'

const bmLenis = inject('bmLenis')
const pct = ref(0)
let cleanup = () => {}

function bind() {
  cleanup()
  const L = bmLenis.value
  if (L) {
    const update = () => {
      pct.value = Math.min(100, Math.max(0, L.progress * 100))
    }
    cleanup = L.on('scroll', update)
    update()
  } else {
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      pct.value = max <= 0 ? 0 : Math.min(100, Math.max(0, (el.scrollTop / max) * 100))
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    cleanup = () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    update()
  }
}

watch(bmLenis, bind, { immediate: true })
onUnmounted(() => cleanup())
</script>
