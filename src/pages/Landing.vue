<template>
  <div class="min-h-screen bg-white">
    <!-- Top bar — Coursera / edX style -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
      :class="
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      "
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700">
          <div
            class="p-1.5 md:p-2 rounded-xl transition-all duration-300"
            :class="scrolled ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md' : 'bg-white/20 text-white backdrop-blur-sm border border-white/25'"
          >
            <BookOpen class="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span class="text-base md:text-xl font-bold tracking-tight" :class="scrolled ? 'text-gray-900' : 'text-white drop-shadow-sm'">
            Bilim Merkezi
          </span>
        </RouterLink>
        <div class="flex items-center gap-2 md:gap-3">
          <RouterLink to="/register"
            :class="scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200">
            Hasaba alyň
          </RouterLink>
          <RouterLink to="/login"
            :class="scrolled ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' : 'border border-white/40 text-white hover:bg-white/10'"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200">
            Giriş
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section
      class="relative text-white overflow-hidden pt-14 md:pt-16"
      style="min-height: 100svh;"
    >
      <!-- Slider images -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Öňki surat saga gidýär -->
        <div
          v-if="prevImg >= 0"
          class="absolute inset-0 bg-cover bg-center slide-out-left"
          :style="{ backgroundImage: `url('${heroImages[prevImg]}')`, backgroundPosition: 'center center' }"
        />
        <!-- Täze surat çepden gelýär -->
        <div
          :key="currentImg"
          class="absolute inset-0 bg-cover bg-center"
          :class="sliding ? 'slide-in-right' : ''"
          :style="{ backgroundImage: `url('${heroImages[currentImg]}')`, backgroundPosition: 'center center' }"
        />
      </div>
      <div class="absolute inset-0 bg-black/40" />
    </section>

    <!-- Features -->
    <section class="py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-bm-reveal:up class="text-center mb-10 md:mb-16">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">Näme üçin bizi saýlamaly?</h2>
          <p class="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">Häzirki zaman okuw usullary we tejribeli mugallymlar bilen bilim alyň</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
          <div
            v-for="(f, idx) in features"
            :key="f.title"
            v-bm-reveal:up="idx * 100"
            class="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
          >
            <div
              :class="`w-10 h-10 md:w-12 md:h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110`"
            >
              <CheckCircle :class="`w-5 h-5 md:w-6 md:h-6 ${f.color}`" />
            </div>
            <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{{ f.title }}</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-slate-100/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-bm-reveal:right class="text-center mb-10 md:mb-16">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">Kurs kategoriýalary</h2>
          
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div
            v-for="(cat, idx) in catList"
            :key="cat.name"
            v-bm-reveal:scale="idx * 70"
            class="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
          >
            <div class="text-3xl md:text-4xl mb-3 md:mb-4 transition-transform duration-300 hover:scale-110 inline-block">{{ cat.icon }}</div>
            <h3 class="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{{ cat.name }}</h3>
            <p class="text-sm md:text-base text-gray-600">{{ cat.count }} kurs</p>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, inject, watch, computed, onMounted, onUnmounted } from 'vue'
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-vue-next'
import AppFooter from '../components/AppFooter.vue'

const bmLenis = inject('bmLenis')
const scrolled = ref(false)
const scrollY = ref(0)
let offParallax = () => {}

// Hero slider
const heroImages = ['/download.webp', '/download.jpg']
const currentImg = ref(0)
const prevImg = ref(-1)
const sliding = ref(false)
let sliderInterval = null

const heroParallaxStyle = computed(() => ({
  transform: `translate3d(0, ${Math.min(scrollY.value * 0.08, 52)}px, 0)`,
}))

function bindParallax() {
  offParallax()
  const L = bmLenis.value
  if (L) {
    offParallax = L.on('scroll', inst => {
      scrollY.value = inst.scroll
    })
    scrollY.value = L.scroll
  } else {
    const w = () => {
      scrollY.value = window.scrollY
    }
    window.addEventListener('scroll', w, { passive: true })
    offParallax = () => window.removeEventListener('scroll', w)
    w()
  }
}

watch(bmLenis, bindParallax, { immediate: true })

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  sliderInterval = setInterval(() => {
    prevImg.value = currentImg.value
    sliding.value = true
    currentImg.value = (currentImg.value + 1) % heroImages.length
    setTimeout(() => {
      sliding.value = false
      prevImg.value = -1
    }, 700)
  }, 3000)
})

onUnmounted(() => {
  offParallax()
  window.removeEventListener('scroll', onScroll)
  clearInterval(sliderInterval)
})

const features = [
  { title: 'Hünärmen mugallymlar', desc: 'Tejribeli we bilimli mugallymlardan sapak alyň. Her mugallym öz ugrunda hünärmendir.', bg: 'bg-blue-100', color: 'text-blue-600' },
  { title: 'Amaly tejribe', desc: 'Nazaryýet bilen bir hatarda amaly meşgullenmeler we taslamalar arkaly öwreniň.', bg: 'bg-green-100', color: 'text-green-600' },
  { title: 'Resmi sertifikat', desc: 'Kursy üstünlikli tamamlanyňyzdan soň resmi ykrar edilen sertifikat alyň.', bg: 'bg-purple-100', color: 'text-purple-600' },
]

const catList = [
  { name: 'Programirlemek', count: 11, icon: '💻' },
  { name: 'Daşary ýurt dilleri', count: 5, icon: '🗣️' },
  { name: 'Ylymlar', count: 3, icon: '🔬' },
  { name: 'Matematika', count: 1, icon: '🔢' },
  { name: 'Mugallymçylyk', count: 1, icon: '👨‍🏫' },
  { name: 'Komputer endikleri', count: 1, icon: '🖥️' },
]

const footerLinks = [
  { to: '/', label: 'Baş Sahypa' },
  { to: '/courses', label: 'Kurslar' },
  { to: '/login', label: 'Giriş' },
  { to: '/register', label: 'Hasaba alyň' },
]
</script>

<style scoped>
@keyframes slideOutLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
}
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
.slide-out-left {
  animation: slideOutLeft 0.7s ease-in-out forwards;
}
.slide-in-right {
  animation: slideInRight 0.7s ease-in-out forwards;
}
</style>
