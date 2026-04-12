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
            Geljegiňizi häzir<br />
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

    <!-- Footer -->
    <footer class="bg-gray-950 text-gray-400">

      <!-- Top bar: sahypa ady + sosial ikonkalar -->
      <div class="border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Logo -->
          <div class="flex items-center gap-2.5">
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-xl shadow-lg shadow-blue-900/40">
              <BookOpen class="w-5 h-5" />
            </div>
            <span class="text-lg font-bold text-white">Bilim Merkezi</span>
          </div>

          <!-- Sosial ikonkalar -->
          <div class="flex items-center gap-3">
            <!-- Jaň -->
            <a
              href="tel:+99364716128"
              title="Jaň et: +993 64 716128"
              class="w-10 h-10 rounded-xl bg-green-600 hover:bg-green-500 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/30"
            >
              <Phone class="w-5 h-5 text-white" />
            </a>

            <!-- Gmail -->
            <a
              href="mailto:akasadfasadf@gmail.com?subject=Bilim Merkezi - Habar"
              title="Gmail: akasadfasadf@gmail.com"
              class="w-10 h-10 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
              </svg>
            </a>

            <!-- Instagram -->
            <a
              href="https://www.instagram.com/akasadfasadf"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style="background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <!-- TikTok -->
            <a
              href="https://www.tiktok.com/@akasadfasadf"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok"
              class="w-10 h-10 rounded-xl bg-black border border-gray-700 hover:border-gray-500 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Main footer: 3 sütün -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          <!-- Col 1: desc -->
          <div>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">Bilim platformasy – Öwreniň we ösdüriň</p>
            <p class="text-xs text-gray-600 leading-relaxed">Türkmenistanyň iň öňdebaryjy onlaýn okuw platformasy. Hünärmenlerden öwreniň, sertifikat alyň.</p>
          </div>

          <!-- Col 2: Links -->
          <div>
            <h3 class="text-white font-bold text-xs uppercase tracking-widest mb-5">Baglanyşyklar</h3>
            <ul class="space-y-3">
              <li v-for="link in footerLinks" :key="link.to">
                <RouterLink :to="link.to" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Col 3: Contact -->
          <div>
            <h3 class="text-white font-bold text-xs uppercase tracking-widest mb-5">Habarlaşmak</h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-2.5">
                <a href="tel:+99364716128" class="flex items-center gap-2.5 hover:text-white transition-colors group">
                  <Phone class="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span class="text-sm">+993 64 716128</span>
                </a>
              </li>
              <li class="flex items-center gap-2.5">
                <a href="mailto:akasadfasadf@gmail.com" class="flex items-center gap-2.5 hover:text-white transition-colors">
                  <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                  </svg>
                  <span class="text-sm">akasadfasadf@gmail.com</span>
                </a>
              </li>
              <li class="flex items-center gap-2.5">
                <MapPin class="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span class="text-sm">Aşgabat, Türkmenistan</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p class="text-xs text-gray-600">© 2026 Bilim Merkezi. Ähli hukuklar goragly.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, inject, watch, computed, onMounted, onUnmounted } from 'vue'
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight, Phone, MapPin } from 'lucide-vue-next'

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
