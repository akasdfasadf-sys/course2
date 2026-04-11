<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="!course" class="flex items-center justify-center py-32">
      <div class="text-center">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Kurs tapylmady</h2>
        <RouterLink to="/courses" class="text-blue-600 hover:text-blue-700">Ähli kurslary gör</RouterLink>
      </div>
    </div>

    <template v-else>
      <!-- Top bar -->
      <div class="bg-white/90 backdrop-blur-xl border-b border-gray-200/80 sticky top-0 z-10 shadow-sm">
        <div class="max-w-7xl mx-auto px-3 md:px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-12 md:h-16 gap-3">
            <RouterLink :to="`/course/${course.id}`" class="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 flex-shrink-0">
              <ChevronLeft class="w-5 h-5" />
              <span class="font-medium text-sm md:text-base hidden sm:inline">Kursa dolan</span>
            </RouterLink>
            <div class="flex-1 max-w-xs md:max-w-md">
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-green-600 rounded-full transition-all duration-300" :style="`width:${course.progress}%`" />
              </div>
              <p class="text-xs text-gray-600 mt-0.5 md:mt-1">{{ course.progress }}% tamamlandy</p>
            </div>
            <div class="text-xs md:text-sm text-gray-600 flex-shrink-0">Sapak 1</div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-3 md:px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div class="lg:col-span-2 space-y-4 md:space-y-6">
            <VideoPlayer :lesson-title="'Kursa giriş'" />

            <div class="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h1 class="text-lg md:text-2xl font-bold text-gray-900 mb-2">Kursa giriş</h1>
              <p class="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Bu sapakda esasy düşünjeleri we amaly ulanylyşlaryny öwrenersiňiz.</p>
              <button v-if="!showCert" @click="showCert = true"
                class="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm md:text-base">
                <CheckCircle class="w-4 h-4 md:w-5 md:h-5" /> Tamamlandy diýip bellemek
              </button>
            </div>

            <div v-if="showCert" class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm p-6 md:p-8 border-2 border-blue-200">
              <div class="text-center">
                <div class="w-14 h-14 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award class="w-7 h-7 md:w-8 md:h-8 text-yellow-600" />
                </div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Gutlaýarys!</h2>
                <p class="text-sm md:text-base text-gray-700 mb-5 md:mb-6">Siz "{{ course.titleTm }}" kursyny üstünlikli tamamladyňyz!</p>
                <button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base">
                  Sertifikaty göçürip almak
                </button>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="border-b overflow-x-auto">
                <div class="flex min-w-max">
                  <button class="px-4 py-2.5 md:px-6 md:py-3 font-medium text-blue-600 border-b-2 border-blue-600 text-sm md:text-base whitespace-nowrap">Syn</button>
                  <button class="px-4 py-2.5 md:px-6 md:py-3 font-medium text-gray-600 hover:text-gray-900 text-sm md:text-base whitespace-nowrap">Çeşmeler</button>
                  <button class="px-4 py-2.5 md:px-6 md:py-3 font-medium text-gray-600 hover:text-gray-900 text-sm md:text-base whitespace-nowrap">Soraglar</button>
                </div>
              </div>
              <div class="p-4 md:p-6">
                <h3 class="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Bu sapak barada</h3>
                <p class="text-sm md:text-base text-gray-600 leading-relaxed">
                  Bu giňişleýin sapak esasy mowzuklary öz içine alýar we size düşünjeleri netijeli ulanyp we amaly mysal bilen işlemäge kömek edýär.
                </p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="bg-gray-50 px-4 py-3 border-b">
                <h3 class="font-semibold text-gray-900 text-sm md:text-base">Kurs mazmuny</h3>
                <p class="text-xs md:text-sm text-gray-600 mt-1">Sapaklar meýilnamasy</p>
              </div>
              <div class="p-4">
                <p class="text-sm md:text-base text-gray-600">Bu kurs üçin sapaklar entek goşulmady. Ýakyn wagtda goşular.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeft, CheckCircle, Award } from 'lucide-vue-next'
import VideoPlayer from '../components/VideoPlayer.vue'
import { courses } from '../data/courses'

const route = useRoute()
const course = computed(() => courses.find(c => c.id === route.params.id))
const showCert = ref(false)
</script>
