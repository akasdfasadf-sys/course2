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
          <RouterLink
            to="/login"
            class="px-3 md:px-4 py-2 text-sm md:text-base font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]"
            :class="
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white/95 hover:bg-white/15 border border-white/20'
            "
          >
            Giriş
          </RouterLink>
          <RouterLink
            to="/register"
            class="px-3 md:px-5 py-2 text-sm md:text-base font-semibold rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98]"
            :class="
              scrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
                : 'bg-white text-blue-700 hover:bg-blue-50 shadow-black/10'
            "
          >
            Hasaba alyň
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section
      class="relative text-white overflow-hidden bm-hero-gradient bg-gradient-to-br from-[#0056d2] via-blue-700 to-indigo-900 pt-14 md:pt-16"
    >
      <div
        class="pointer-events-none absolute -top-24 -right-24 w-[min(100vw,28rem)] h-[min(100vw,28rem)] rounded-full bg-sky-400/25 blur-3xl bm-hero-blob"
      />
      <div
        class="pointer-events-none absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl bm-hero-blob bm-hero-blob-delay"
      />
      <div
        class="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-cyan-400/15 blur-3xl bm-hero-blob bm-hero-blob-delay-2"
      />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.18),transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 lg:py-32">
        <div
          class="text-center max-w-4xl mx-auto bm-stagger will-change-transform"
          :style="heroParallaxStyle"
        >
          <div
            class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-5 md:mb-6 border border-white/20"
          >
            <BookOpen class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span class="text-xs md:text-sm font-medium">Türkmenistanyň iň öňdebaryjy onlaýn okuw platformasy</span>
          </div>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-[1.1] tracking-tight">
            Geljegiňizi <br />
            <span class="text-blue-100">Döretmäge Başlaň</span>
          </h1>
          <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-50/95 mb-6 md:mb-8 leading-relaxed px-2 max-w-3xl mx-auto">
            22 sany hünär kurslary arkaly täze başarnyklary öwreniň.<br />
            Hünärmenlerden onlaýn okuw we resmi sertifikat alyň.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl shadow-black/15 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Hasaba alyň <ArrowRight class="w-5 h-5" />
            </RouterLink>
            <RouterLink
              to="/login"
              class="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/35 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white/20 transition-all duration-300 active:scale-[0.99]"
            >
              Giriş
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-10 md:py-16 bg-gradient-to-b from-slate-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div
            v-for="(s, idx) in stats"
            :key="s.label"
            v-bm-reveal:up="idx * 80"
            class="text-center p-4 md:p-6 rounded-2xl bg-white border border-gray-100 shadow-[var(--bm-shadow-card)] hover:shadow-[var(--bm-shadow-card-hover)] transition-all duration-300 hover:-translate-y-1"
          >
            <div :class="`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 ${s.bg} rounded-2xl mb-3 md:mb-4`">
              <component :is="s.icon" :class="`w-6 h-6 md:w-8 md:h-8 ${s.color}`" />
            </div>
            <p class="text-2xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-2 tabular-nums">{{ s.value }}</p>
            <p class="text-sm md:text-base text-gray-600 font-medium">{{ s.label }}</p>
          </div>
        </div>
      </div>
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
          <p class="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">Dürli ugurlarda hünär kurslaryndan saýlaň</p>
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

    <!-- CTA -->
    <section class="py-14 md:py-20 relative overflow-hidden bg-gradient-to-br from-[#0056d2] to-indigo-900 text-white">
      <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
      <div v-bm-reveal:scale class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 md:mb-6 tracking-tight">Bilim syýahatyňyza häzir başlaň!</h2>
        <p class="text-base md:text-xl text-blue-100 mb-6 md:mb-8">Mugt hasaba alnyň we 22 sany hünär kursyna giriň</p>
        <RouterLink
          to="/register"
          class="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
        >
          Mugt hasaba alyň <ArrowRight class="w-5 h-5" />
        </RouterLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, inject, watch, computed, onMounted, onUnmounted } from 'vue'
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight } from 'lucide-vue-next'
import AppFooter from '../components/AppFooter.vue'

const bmLenis = inject('bmLenis')
const scrolled = ref(false)
const scrollY = ref(0)
let offParallax = () => {}

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
})

onUnmounted(() => {
  offParallax()
  window.removeEventListener('scroll', onScroll)
})

const stats = [
  { value: '22', label: 'Hünär kurslary', icon: BookOpen, bg: 'bg-blue-100', color: 'text-blue-600' },
  { value: '5000+', label: 'Aktiwçi okuwçylar', icon: Users, bg: 'bg-green-100', color: 'text-green-600' },
  { value: '95%', label: 'Üstünlik derejesi', icon: Award, bg: 'bg-purple-100', color: 'text-purple-600' },
  { value: '24/7', label: 'Elýeterli okuw', icon: Clock, bg: 'bg-orange-100', color: 'text-orange-600' },
]

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
  { name: 'Kompýuter endikleri', count: 1, icon: '🖥️' },
]

const footerLinks = [
  { to: '/', label: 'Baş Sahypa' },
  { to: '/courses', label: 'Kurslar' },
  { to: '/login', label: 'Giriş' },
  { to: '/register', label: 'Hasaba alyň' },
]
</script>
