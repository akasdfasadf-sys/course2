<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <div v-if="!course" class="flex items-center justify-center py-32">
      <div class="text-center">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Kurs tapylmady</h2>
        <RouterLink to="/courses" class="text-blue-600 hover:text-blue-700">Ähli kurslary gör</RouterLink>
      </div>
    </div>

    <template v-else>
      <div class="relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-indigo-950 text-white">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.2),transparent)]" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <!-- Mobile: image first -->
          <div class="lg:hidden mb-6">
            <div class="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img :src="course.thumbnail" :alt="course.titleTm" class="w-full aspect-video object-cover"
                @error="e => e.target.src='https://placehold.co/400x225?text=Kurs'" />
            </div>
            <div class="bg-white rounded-2xl p-4 mt-3 shadow-xl border border-gray-100">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-2xl font-bold text-gray-900">{{ course.price30 }} TMT</span>
                <span class="text-base text-gray-500 line-through">{{ course.basePrice }} TMT</span>
              </div>
              <p class="text-sm text-green-600 font-medium mb-3">30% arzanladyş</p>
              <template v-if="isEnrolled">
                <RouterLink :to="`/course/${course.id}/learn`"
                  class="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center px-4 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 mb-3 text-sm active:scale-[0.99]">
                  Dowam et
                </RouterLink>
                <div class="bg-gray-50 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs text-gray-600">Siziň ösüşiňiz</span>
                    <span class="text-xs font-medium text-gray-900">{{ course.progress }}%</span>
                  </div>
                  <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 rounded-full" :style="`width:${course.progress}%`" />
                  </div>
                </div>
              </template>
              <template v-else>
                <RouterLink :to="`/course/${course.id}/enroll`"
                  class="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center px-4 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 mb-2 text-sm active:scale-[0.99]">
                  Ýazylmak
                </RouterLink>
                <p class="text-xs text-gray-600 text-center">Tölegiňizi 2-3 aýa böläýsiňiz</p>
              </template>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="flex items-center gap-2 mb-3 md:mb-4 text-sm">
                <RouterLink to="/courses" class="text-gray-300 hover:text-white">Kurslar</RouterLink>
                <ChevronRight class="w-4 h-4 text-gray-400" />
                <span class="text-gray-300">{{ course.categoryTm }}</span>
              </div>
              <h1 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">{{ course.titleTm }}</h1>
              <p class="text-base md:text-xl text-gray-300 mb-4 md:mb-6">{{ course.descriptionTm }}</p>
              <div class="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6">
                <div class="flex items-center gap-2">
                  <img :src="course.instructorAvatar" :alt="course.instructor"
                    class="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    @error="e => e.target.src='https://placehold.co/40x40'" />
                  <div>
                    <p class="text-xs text-gray-400">Mugallym</p>
                    <p class="text-sm md:text-base font-medium">{{ course.instructor }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <Star class="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  <span class="font-semibold text-sm md:text-base">{{ course.rating }}</span>
                  <span class="text-gray-400 ml-1 text-xs md:text-sm">({{ course.studentsEnrolled }} okuwçy)</span>
                </div>
              </div>
              <div class="flex items-center gap-4 text-gray-300 text-sm md:text-base">
                <div class="flex items-center gap-2"><Clock class="w-4 h-4 md:w-5 md:h-5" /><span>{{ course.weeks }} hepde</span></div>
                <div class="flex items-center gap-2"><Users class="w-4 h-4 md:w-5 md:h-5" /><span>{{ course.studentsEnrolled }} okuwçy</span></div>
              </div>
            </div>

            <!-- Desktop sidebar -->
            <div class="hidden lg:block lg:col-span-1">
              <div class="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 sticky top-24 ring-1 ring-gray-200/60 transition-shadow duration-300 hover:shadow-2xl">
                <div class="aspect-video">
                  <img :src="course.thumbnail" :alt="course.titleTm" class="w-full h-full object-cover"
                    @error="e => e.target.src='https://placehold.co/400x225?text=Kurs'" />
                </div>
                <div class="p-6">
                  <div class="mb-4">
                    <div class="flex items-baseline gap-2 mb-2">
                      <span class="text-3xl font-bold text-gray-900">{{ course.price30 }} TMT</span>
                      <span class="text-lg text-gray-500 line-through">{{ course.basePrice }} TMT</span>
                    </div>
                    <p class="text-sm text-green-600 font-medium">30% arzanladyş</p>
                  </div>
                  <template v-if="isEnrolled">
                    <RouterLink :to="`/course/${course.id}/learn`"
                      class="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center px-6 py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 mb-3 active:scale-[0.99]">
                      Dowam et
                    </RouterLink>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-sm text-gray-600">Siziň ösüşiňiz</span>
                        <span class="text-sm font-medium text-gray-900">{{ course.progress }}%</span>
                      </div>
                      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-600 rounded-full" :style="`width:${course.progress}%`" />
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <RouterLink :to="`/course/${course.id}/enroll`"
                      class="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center px-6 py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 mb-2 active:scale-[0.99]">
                      Ýazylmak
                    </RouterLink>
                    <p class="text-sm text-gray-600 text-center">Tölegiňizi 2-3 aýa böläýsiňiz</p>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div v-bm-reveal:up class="lg:col-span-2 space-y-6">
            <div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Näme öwrenersiňiz</h2>
              <div class="bg-white rounded-2xl border border-gray-100 shadow-[var(--bm-shadow-card)] p-4 md:p-6">
                <ul class="space-y-3">
                  <li v-for="item in learnings" :key="item" class="flex items-start gap-2">
                    <div class="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</div>
                    <span class="text-sm md:text-base text-gray-700">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Talap edilýän bilimler</h2>
              <div class="bg-white rounded-2xl border border-gray-100 shadow-[var(--bm-shadow-card)] p-4 md:p-6">
                <ul class="space-y-2 text-sm md:text-base text-gray-700">
                  <li>• Esasy kompýuter sowatlylygy ýeterlikdir</li>
                  <li>• Täze başarnyklary öwrenmäge isleg we höwes</li>
                  <li>• Her sapak üçin 2-3 sagat wagt</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-bm-reveal:scale="120" class="lg:col-span-1">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Kurs barada</h2>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-[var(--bm-shadow-card)] p-4 md:p-6 space-y-3 md:space-y-4">
              <div class="flex justify-between items-center text-sm md:text-base">
                <span class="text-gray-600">Dowamlylygy:</span>
                <span class="font-medium text-gray-900">{{ course.weeks }} hepde</span>
              </div>
              <div class="flex justify-between items-center text-sm md:text-base">
                <span class="text-gray-600">Okuwçylar:</span>
                <span class="font-medium text-gray-900">{{ course.studentsEnrolled }}</span>
              </div>
              <div class="flex justify-between items-center text-sm md:text-base">
                <span class="text-gray-600">Baha:</span>
                <div class="flex items-center gap-1">
                  <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span class="font-medium text-gray-900">{{ course.rating }}</span>
                </div>
              </div>
              <div class="flex justify-between items-center text-sm md:text-base">
                <span class="text-gray-600">Sertifikat:</span>
                <span class="font-medium text-green-600">Hawa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Star, Users, Clock, ChevronRight } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const route = useRoute()
const auth = useAuth()
const course = computed(() => courses.find(c => c.id === route.params.id))
const isEnrolled = computed(() => auth.user?.enrolledCourses?.includes(course.value?.id))

const learnings = [
  'Esaslardan başlap ösen düşünjelere çenli ähli mowzuklary öwrenersiňiz',
  'Hakyky dünýä taslamalaryny döredip, amaly tejribe gazanarysňyz',
  'Pudakda ulanylýan iň gowy tejribeleri we usullary öwrenersiňiz',
  'Kursy tamamlanyňyzdan soň resmi sertifikat alarysňyz',
]
</script>
