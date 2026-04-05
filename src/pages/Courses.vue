<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Ähli kurslar</h1>
        <p class="text-gray-600">{{ categories.length }} kategoriýada {{ courses.length }} kursy öwreniň</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input v-model="search" type="text" placeholder="Kurslary gözle..."
            class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>

      <div class="mb-8">
        <CategoryFilter :categories="categories" :selected="selectedCat" @select="selectedCat = $event" />
      </div>

      <div class="mb-4">
        <p class="text-gray-600">{{ filtered.length }} kurs tapyldy</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard v-for="c in filtered" :key="c.id" :course="c" />
      </div>

      <div v-if="filtered.length === 0" class="text-center py-16">
        <p class="text-gray-500 text-lg">Hiç hili kurs tapylmady</p>
        <button @click="search=''; selectedCat='All'" class="mt-4 text-blue-600 hover:text-blue-700 font-medium">
          Filtrleri aýyr
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import CourseCard from '../components/CourseCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { courses, categories } from '../data/courses'

const search = ref('')
const selectedCat = ref('All')

const filtered = computed(() => courses.filter(c => {
  const matchCat = selectedCat.value === 'All' || c.categoryTm === selectedCat.value
  const matchSearch = c.titleTm.toLowerCase().includes(search.value.toLowerCase()) ||
    c.descriptionTm.toLowerCase().includes(search.value.toLowerCase())
  return matchCat && matchSearch
}))
</script>
