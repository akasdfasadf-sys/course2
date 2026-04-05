<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold mb-6">Täze başarnyklary öwreniň</h1>
          <p class="text-xl text-blue-100 mb-8">
            Hünärmenler tarapyndan öwredilýän müňlerçe kursa giriň. Häzir öwrenip başlaň we karýeraňyzy ösdüriň.
          </p>
          <RouterLink to="/courses"
            class="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Kurslary görmek <ArrowRight class="w-5 h-5" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
          <div class="bg-blue-100 p-3 rounded-lg"><TrendingUp class="w-6 h-6 text-blue-600" /></div>
          <div><p class="text-3xl font-bold text-gray-900">22</p><p class="text-gray-600 mt-1">Hünär kurslary</p></div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
          <div class="bg-green-100 p-3 rounded-lg"><Users class="w-6 h-6 text-green-600" /></div>
          <div><p class="text-3xl font-bold text-gray-900">5,000+</p><p class="text-gray-600 mt-1">Aktiwçi okuwçylar</p></div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
          <div class="bg-purple-100 p-3 rounded-lg"><Award class="w-6 h-6 text-purple-600" /></div>
          <div><p class="text-3xl font-bold text-gray-900">95%</p><p class="text-gray-600 mt-1">Üstünlik derejesi</p></div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Saýlanan kurslar</h2>
          <p class="text-gray-600 mt-2">Siziň üçin saýlanan kurslar</p>
        </div>
        <RouterLink to="/courses" class="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
          Hemmesini gör <ArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard v-for="c in featured" :key="c.id" :course="c" />
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Meşhur kurslar</h2>
          <p class="text-gray-600 mt-2">Bu aýda iň köp ýazylynlan kurslar</p>
        </div>
        <RouterLink to="/courses" class="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
          Hemmesini gör <ArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard v-for="c in popular" :key="c.id" :course="c" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, Users, Award, TrendingUp } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import CourseCard from '../components/CourseCard.vue'
import { courses } from '../data/courses'

const featured = courses.slice(0, 3)
const popular = courses.slice(3, 6)
</script>
