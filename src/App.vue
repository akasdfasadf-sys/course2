<template>
  <ScrollProgress />
  <RouterView v-slot="{ Component }">
    <Transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <ScrollToTop />
</template>

<script setup>
import { shallowRef, onMounted, onBeforeUnmount, provide, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Lenis from 'lenis'
import ScrollProgress from './components/ScrollProgress.vue'
import ScrollToTop from './components/ScrollToTop.vue'

const bmLenis = shallowRef(null)
provide('bmLenis', bmLenis)

const router = useRouter()
let rafId = 0

onMounted(() => {
  if (typeof matchMedia === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }
  const lenis = new Lenis({
    lerp: 0.068,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.15,
    syncTouch: true,
  })
  bmLenis.value = lenis
  function raf(time) {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  bmLenis.value?.destroy()
  bmLenis.value = null
})

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    nextTick(() => {
      const L = bmLenis.value
      if (L) L.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    })
  },
)
</script>
