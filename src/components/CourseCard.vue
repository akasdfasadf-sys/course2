<template>
  <RouterLink :to="`/course/${course.id}`" class="block group">
    <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div class="relative aspect-video overflow-hidden">
        <img :src="course.thumbnail" :alt="course.titleTm"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          @error="e => e.target.src='https://placehold.co/400x225?text=Kurs'" />
        <div v-if="isEnrolled && course.progress > 0"
          class="absolute bottom-0 left-0 right-0 bg-gray-900/80 p-2">
          <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 rounded-full" :style="`width:${course.progress}%`" />
          </div>
          <p class="text-white text-xs mt-1">{{ course.progress }}% tamamlandy</p>
        </div>
      </div>

      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{{ course.categoryTm }}</span>
          <span class="text-xs text-gray-500">{{ course.weeks }} hepde</span>
        </div>
        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {{ course.titleTm }}
        </h3>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ course.descriptionTm }}</p>
        <div class="flex items-center gap-1 mb-3">
          <img :src="course.instructorAvatar" :alt="course.instructor"
            class="w-6 h-6 rounded-full object-cover"
            @error="e => e.target.src='https://placehold.co/24x24'" />
          <span class="text-sm text-gray-700">{{ course.instructor }}</span>
        </div>
        <div class="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div class="flex items-center gap-1">
            <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span class="font-medium">{{ course.rating }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Users class="w-4 h-4" />
            <span>{{ course.studentsEnrolled }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xl font-semibold text-gray-900">{{ course.price30 }} TMT</span>
            <span class="text-sm text-gray-500 line-through ml-2">{{ course.basePrice }} TMT</span>
          </div>
          <span v-if="isEnrolled" class="text-sm font-medium text-green-600">Ýazylan</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { Star, Users } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const props = defineProps({ course: Object })
const auth = useAuth()
const isEnrolled = computed(() => auth.user?.enrolledCourses?.includes(props.course.id))
</script>
