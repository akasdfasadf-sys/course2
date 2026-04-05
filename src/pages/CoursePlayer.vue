<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="!course" class="flex items-center justify-center py-32">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Kurs tapylmady</h2>
        <RouterLink to="/courses" class="text-blue-600 hover:text-blue-700">Ähli kurslary gör</RouterLink>
      </div>
    </div>

    <template v-else>
      <div class="bg-white border-b sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <RouterLink :to="`/course/${course.id}`" class="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ChevronLeft class="w-5 h-5" />
              <span class="font-medium">Kursa dolan</span>
            </RouterLink>
            <div class="flex-1 mx-8 max-w-md">
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-green-600 rounded-full transition-all duration-300" :style="`width:${course.progress}%`" />
              </div>
              <p class="text-sm text-gray-600 mt-1">{{ course.progress }}% tamamlandy</p>
            </div>
            <div class="text-sm text-gray-600">Sapak 1</div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <VideoPlayer :lesson-title="'Kursa giriş'" />

            <div class="bg-white rounded-lg shadow-sm p-6">
              <h1 class="text-2xl font-bold text-gray-900 mb-2">Kursa giriş</h1>
              <p class="text-gray-600 mb-6">Bu sapakda esasy düşünjeleri we amaly ulanylyşlaryny öwrenersiňiz.</p>
              <button v-if="!showCert" @click="showCert = true"
                class="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                <CheckCircle class="w-5 h-5" /> Tamamlandy diýip bellemek
              </button>
            </div>

            <div v-if="showCert" class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm p-8 border-2 border-blue-200">
              <div class="text-center">
                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award class="w-8 h-8 text-yellow-600" />
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Gutlaýarys!</h2>
                <p class="text-gray-700 mb-6">Siz "{{ course.titleTm }}" kursyny üstünlikli tamamladyňyz!</p>
                <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Sertifikaty göçürip almak
                </button>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="border-b">
                <div class="flex">
                  <button class="px-6 py-3 font-medium text-blue-600 border-b-2 border-blue-600">Syn</button>
                  <button class="px-6 py-3 font-medium text-gray-600 hover:text-gray-900">Çeşmeler</button>
                  <button class="px-6 py-3 font-medium text-gray-600 hover:text-gray-900">Soraglar</button>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-semibold text-gray-900 mb-3">Bu sapak barada</h3>
                <p class="text-gray-600 leading-relaxed">
                  Bu giňişleýin sapak esasy mowzuklary öz içine alýar we size düşünjeleri netijeli ulanyp we amaly mysal bilen işlemäge kömek edýär.
                </p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="bg-gray-50 px-4 py-3 border-b">
                <h3 class="font-semibold text-gray-900">Kurs mazmuny</h3>
                <p class="text-sm text-gray-600 mt-1">Sapaklar meýilnamasy</p>
              </div>
              <div class="p-4">
                <p class="text-gray-600">Bu kurs üçin sapaklar entek goşulmady. Ýakyn wagtda goşular.</p>
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
