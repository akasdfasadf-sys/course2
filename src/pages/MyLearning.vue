<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Meniň kurslarym</h1>
        <p class="text-gray-600">Okuw syýahatyňyzy dowam ediň</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <template v-if="enrolled.length > 0">
        <div class="mb-6">
          <p class="text-gray-600">{{ enrolled.length }} kurs dowam edýär</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard v-for="c in enrolled" :key="c.id" :course="c" />
        </div>
      </template>

      <div v-else class="text-center py-16">
        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen class="w-8 h-8 text-blue-600" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Entek kursyňyz ýok</h2>
        <p class="text-gray-600 mb-6">Häzir kurs saýlap, öwrenmäge başlaň</p>
        <RouterLink to="/courses"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
const enrolled = computed(() => courses.filter(c => auth.user?.enrolledCourses?.includes(c.id)))
</script>
