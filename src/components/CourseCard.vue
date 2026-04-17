<template>
  <RouterLink :to="`/course/${course.id}`" class="block group h-full">
    <article
      class="bg-white rounded-3xl overflow-hidden border border-gray-100/50 shadow-lg shadow-gray-200/50 h-full flex flex-col transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:-translate-y-2 group-hover:border-blue-200/60 ring-0 group-hover:ring-2 group-hover:ring-blue-500/10"
    >
      <div class="relative aspect-video overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50">
        <!-- Gradient fallback - internet bolmasa görünýär -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <div class="text-6xl mb-4">{{ categoryIcon }}</div>
          <span class="text-white/90 text-sm font-semibold px-4 text-center line-clamp-2 bg-black/20 rounded-lg py-1">{{ course.titleTm }}</span>
        </div>
        <img
          :src="course.thumbnail"
          :alt="course.titleTm"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.08] group-hover:brightness-110"
          @error="e => e.target.style.display='none'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <!-- Play button overlay -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div class="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-200">
            <Play class="w-6 h-6 text-blue-600 ml-1" />
          </div>
        </div>

        <!-- Progress bar for enrolled courses -->
        <div
          v-if="isEnrolled && course.progress > 0"
          class="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-3 border-t border-white/10"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-white text-sm font-medium">Progress</span>
            <span class="text-white text-sm font-bold">{{ course.progress }}%</span>
          </div>
          <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500" :style="`width:${course.progress}%`" />
          </div>
        </div>

        <!-- Category badge -->
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full border border-white/20">
            {{ course.categoryTm }}
          </span>
        </div>

        <!-- Level badge -->
        <div class="absolute top-4 right-4">
          <span
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm',
              course.level === 'Beginner' ? 'bg-green-500/90 text-white border-green-400/50' :
              course.level === 'Intermediate' ? 'bg-yellow-500/90 text-white border-yellow-400/50' :
              'bg-red-500/90 text-white border-red-400/50'
            ]"
          >
            {{ course.level === 'Beginner' ? '🟢 Başlangyç' : course.level === 'Intermediate' ? '🟡 Orta' : '🔴 Ösen' }}
          </span>
        </div>
      </div>

      <div class="p-6 flex flex-col flex-1">
        <h3
          class="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 text-lg leading-snug flex-1"
        >
          {{ course.titleTm }}
        </h3>

        <p class="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">{{ course.descriptionTm }}</p>

        <!-- Instructor info -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {{ course.instructor[0] }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm text-gray-700 font-medium truncate">{{ course.instructor }}</div>
            <div class="text-xs text-gray-500">{{ course.weeks }} hepde</div>
          </div>
        </div>

        <!-- Rating and students -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
              <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span class="text-sm font-semibold text-gray-800">{{ course.rating }}</span>
            </div>
            <span class="text-xs text-gray-500">({{ course.studentsEnrolled }})</span>
          </div>
          <div class="text-xs text-gray-500">{{ course.weeks }} hepde</div>
        </div>

        <!-- Price section -->
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div class="flex items-baseline gap-2">
            <span class="text-xl font-bold text-gray-900">{{ course.price30 }} TMT</span>
            <span class="text-sm text-gray-500 line-through">{{ course.basePrice }} TMT</span>
          </div>
          <div v-if="isEnrolled" class="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            Ýazylan
          </div>
          <div v-else class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            Elýeterli
          </div>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { Star, Play } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const props = defineProps({ course: Object })
const auth = useAuth()
const isEnrolled = computed(() => auth.user.value?.enrolledCourses?.includes(props.course.id))

const categoryMap = {
  'Programirlemek': { icon: '💻' },
  'Diller': { icon: '🗣️' },
  'Matematika': { icon: '🔢' },
  'Ylymlar': { icon: '🔬' },
  'Mugallymçylyk we pedagogika': { icon: '👨‍🏫' },
  'Kompýuter endikleri': { icon: '🖥️' },
}

const categoryIcon = computed(() =>
  categoryMap[props.course.categoryTm]?.icon || '📚'
)
</script>
