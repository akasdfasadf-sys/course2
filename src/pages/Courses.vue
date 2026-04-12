<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <div class="relative overflow-hidden bg-white border-b border-gray-100">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-indigo-50/50 pointer-events-none" />
      <div v-bm-reveal:up class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <h1 class="text-2xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-2 tracking-tight">Ähli kurslar</h1>
        <p class="text-sm md:text-base text-gray-600">{{ categories.length }} kategoriýada {{ courses.length }} kursy öwreniň</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8">
      <div v-bm-reveal:scale class="mb-4 md:mb-6">
        <div
          class="relative flex items-center rounded-2xl bg-white border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400 transition-all duration-200"
        >
          <Search class="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            v-model="search"
            type="text"
            placeholder="Kurslary gözle..."
            class="w-full pl-12 pr-4 py-3.5 md:py-4 bg-transparent rounded-2xl focus:outline-none text-base placeholder:text-gray-400"
          />
        </div>
      </div>

      <div v-bm-reveal:up class="mb-5 md:mb-8">
        <CategoryFilter :categories="categories" :selected="selectedCat" @select="selectedCat = $event" />
      </div>

      <!-- Dereje filtri + Sortlama -->
      <div v-bm-reveal:up class="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
        <div class="flex items-center gap-2 flex-wrap flex-1">
          <button
            v-for="lvl in levels"
            :key="lvl.value"
            type="button"
            @click="selectedLevel = selectedLevel === lvl.value ? 'All' : lvl.value"
            :class="[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
              selectedLevel === lvl.value
                ? `${lvl.activeBg} ${lvl.activeText} border-transparent shadow-sm`
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300',
            ]"
          >
            <span>{{ lvl.icon }}</span> {{ lvl.label }}
          </button>
        </div>
        <select
          v-model="sortBy"
          class="text-xs md:text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
        >
          <option value="default">Tertip: Adaty</option>
          <option value="rating">Reýting boýunça</option>
          <option value="students">Okuwçy sany</option>
          <option value="price_asc">Baha: Arzan → Gymmat</option>
          <option value="price_desc">Baha: Gymmat → Arzan</option>
        </select>
      </div>

      <div class="mb-3 md:mb-4">
        <p class="text-sm md:text-base text-gray-600 font-medium">{{ filtered.length }} kurs tapyldy</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div v-for="(c, idx) in filtered" :key="c.id" v-bm-reveal:up="Math.min(idx * 45, 360)">
          <CourseCard :course="c" />
        </div>
      </div>

      <div v-if="filtered.length === 0" v-bm-reveal:scale class="text-center py-12 md:py-16">
        <p class="text-gray-500 text-base md:text-lg">Hiç hili kurs tapylmady</p>
        <button type="button" @click="clearFilters" class="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm md:text-base transition-colors">
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
const selectedLevel = ref('All')
const sortBy = ref('default')

const levels = [
  { value: 'Beginner', label: 'Başlangyç', icon: '🟢', activeBg: 'bg-green-100', activeText: 'text-green-700' },
  { value: 'Intermediate', label: 'Orta', icon: '🟡', activeBg: 'bg-yellow-100', activeText: 'text-yellow-700' },
  { value: 'Advanced', label: 'Ösen', icon: '🔴', activeBg: 'bg-red-100', activeText: 'text-red-700' },
]

const filtered = computed(() => {
  let list = courses.filter(c => {
    const matchCat = selectedCat.value === 'All' || c.categoryTm === selectedCat.value
    const matchLevel = selectedLevel.value === 'All' || c.level === selectedLevel.value
    const matchSearch =
      c.titleTm.toLowerCase().includes(search.value.toLowerCase()) ||
      c.descriptionTm.toLowerCase().includes(search.value.toLowerCase())
    return matchCat && matchLevel && matchSearch
  })

  if (sortBy.value === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
  else if (sortBy.value === 'students') list = [...list].sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
  else if (sortBy.value === 'price_asc') list = [...list].sort((a, b) => a.price30 - b.price30)
  else if (sortBy.value === 'price_desc') list = [...list].sort((a, b) => b.price30 - a.price30)

  return list
})

function clearFilters() {
  search.value = ''
  selectedCat.value = 'All'
  selectedLevel.value = 'All'
  sortBy.value = 'default'
}
</script>
