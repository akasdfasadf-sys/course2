<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <div class="relative bg-white border-b border-gray-100 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
      <div v-bm-reveal:up class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 md:mb-2 tracking-tight">Meniň kurslarym</h1>
        <p class="text-sm md:text-base text-gray-600">Okuw syýahatyňyzy dowam ediň</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8">
      <template v-if="enrolled.length > 0">
        <div class="mb-4 md:mb-6">
          <p class="text-sm md:text-base text-gray-600">{{ enrolled.length }} kurs dowam edýär</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div v-for="(c, idx) in enrolled" :key="c.id" v-bm-reveal:up="idx * 70">
            <CourseCard :course="c" />
          </div>
        </div>
      </template>

      <div v-else v-bm-reveal:scale class="text-center py-12 md:py-16">
        <div class="bg-blue-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen class="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
        </div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Entek kursyňyz ýok</h2>
        <p class="text-sm md:text-base text-gray-600 mb-5 md:mb-6">Häzir kurs saýlap, öwrenmäge başlaň</p>
        <RouterLink to="/courses"
          class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 md:px-6 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 text-sm md:text-base active:scale-[0.99]">
          Kurslary gör
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BookOpen } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import CourseCard from '../components/CourseCard.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const auth = useAuth()
const enrolled = computed(() => courses.filter(c => auth.user.value?.enrolledCourses?.includes(c.id)))
</script>
