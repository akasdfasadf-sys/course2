<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
    <AppHeader />

    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0056d2] via-blue-700 to-indigo-900 text-white">
      <div class="pointer-events-none absolute top-0 right-0 w-[min(100%,32rem)] h-64 bg-sky-400/20 blur-3xl rounded-full translate-x-1/4 -translate-y-1/2" />
      <div class="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-violet-500/15 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div v-bm-reveal:up class="max-w-3xl">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-tight tracking-tight">{{ t('home.hero_title') }}</h1>
          
          <RouterLink to="/courses"
            class="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 text-sm md:text-base shadow-xl shadow-black/10 hover:-translate-y-0.5 active:translate-y-0">
            {{ t('home.view_courses') }} <ArrowRight class="w-4 h-4 md:w-5 md:h-5" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SaÃ½lanan kurslar -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div v-bm-reveal:left class="flex items-center justify-between mb-5 md:mb-8">
        <div>
          <h2 class="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{{ t('home.featured') }}</h2>
          <p class="text-sm md:text-base text-gray-600 mt-1 md:mt-2">{{ t('home.featured_sub') }}</p>
        </div>
        <RouterLink to="/courses"
          class="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 text-sm md:text-base whitespace-nowrap transition-colors group">
          {{ t('home.see_all') }} <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div v-for="(c, idx) in featured" :key="c.id" v-bm-reveal:scale="idx * 95">
          <CourseCard :course="c" />
        </div>
      </div>
    </section>

    <!-- Meşhur kurslar -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
      <div v-bm-reveal:right class="flex items-center justify-between mb-5 md:mb-8">
        <div>
          <h2 class="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{{ t('home.popular') }}</h2>
          <p class="text-sm md:text-base text-gray-600 mt-1 md:mt-2">{{ t('home.popular_sub') }}</p>
        </div>
        <RouterLink to="/courses"
          class="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 text-sm md:text-base whitespace-nowrap transition-colors group">
          {{ t('home.see_all') }} <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div v-for="(c, idx) in popular" :key="c.id" v-bm-reveal:scale="idx * 95">
          <CourseCard :course="c" />
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import AppHeader from '../components/AppHeader.vue'
import CourseCard from '../components/CourseCard.vue'
import AppFooter from '../components/AppFooter.vue'
import { courses } from '../data/courses'

const { t } = useI18n()
const featured = courses.slice(0, 3)
const popular = courses.slice(3, 6)
</script>

