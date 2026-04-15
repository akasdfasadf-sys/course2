<template>
  <RouterLink :to="`/course/${course.id}`" class="block group h-full">
    <article
      class="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-[var(--bm-shadow-card)] h-full flex flex-col transition-all duration-300 ease-out group-hover:shadow-[var(--bm-shadow-card-hover)] group-hover:-translate-y-1.5 group-hover:border-blue-200/60 ring-0 group-hover:ring-2 group-hover:ring-blue-500/10"
    >
      <div class="relative aspect-video overflow-hidden flex-shrink-0 bg-slate-100">
        <!-- Gradient fallback - internet bolmasa görünýär -->
        <div class="absolute inset-0 flex flex-col items-center justify-center" :class="categoryGradient">
          <span class="text-4xl mb-2">{{ categoryIcon }}</span>
          <span class="text-white/90 text-xs font-semibold px-3 text-center line-clamp-2">{{ course.titleTm }}</span>
        </div>
        <img
          :src="course.thumbnail"
          :alt="course.titleTm"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          @error="e => e.target.style.display='none'"
        />
        <div
          v-if="isEnrolled && course.progress > 0"
          class="absolute bottom-0 left-0 right-0 bg-gray-950/85 backdrop-blur-sm p-2.5 border-t border-white/10"
        >
          <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" :style="`width:${course.progress}%`" />
          </div>
          <p class="text-white text-xs mt-1.5 font-medium">{{ course.progress }}% tamamlandy</p>
        </div>
      </div>

      <div class="p-3 md:p-4 flex flex-col flex-1">
        <div class="flex items-center gap-2 mb-2 flex-wrap">
          <span class="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100/80">{{ course.categoryTm }}</span>
          <span
            :class="[
              'text-xs font-semibold px-2 py-0.5 rounded-lg',
              course.level === 'Beginner' ? 'bg-green-50 text-green-700' :
              course.level === 'Intermediate' ? 'bg-yellow-50 text-yellow-700' :
              'bg-red-50 text-red-700'
            ]"
          >{{ course.level === 'Beginner' ? '🟢 Başlangyç' : course.level === 'Intermediate' ? '🟡 Orta' : '🔴 Ösen' }}</span>
          <span class="text-xs text-gray-500 font-medium">{{ course.weeks }} hepde</span>
        </div>

        <h3
          class="font-bold text-gray-900 mb-1.5 md:mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200 text-sm md:text-base flex-1 leading-snug"
        >
          {{ course.titleTm }}
        </h3>

        <p class="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2 leading-relaxed">{{ course.descriptionTm }}</p>

        <div class="flex items-center gap-1.5 mb-2 md:mb-3">
          <img
            :src="course.instructorAvatar"
            :alt="course.instructor"
            class="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
            @error="e => (e.target.src = 'https://placehold.co/24x24')"
          />
          <span class="text-xs md:text-sm text-gray-700 truncate font-medium">{{ course.instructor }}</span>
        </div>

        <div class="flex items-center justify-between text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
          <div class="flex items-center gap-1">
            <Star class="w-3.5 h-3.5 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
            <span class="font-semibold text-gray-800">{{ course.rating }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Users class="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>{{ course.studentsEnrolled }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between mt-auto pt-1">
          <div>
            <span class="text-base md:text-xl font-bold text-gray-900">{{ course.price30 }} TMT</span>
            <span class="text-xs md:text-sm text-gray-500 line-through ml-1.5">{{ course.basePrice }} TMT</span>
          </div>
          <span v-if="isEnrolled" class="text-xs md:text-sm font-semibold text-emerald-600">Ýazylan</span>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { Star, Users } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const props = defineProps({ course: Object })
const auth = useAuth()
const isEnrolled = computed(() => auth.user.value?.enrolledCourses?.includes(props.course.id))

const categoryMap = {
  'Programirlemek':            { gradient: 'bg-gradient-to-br from-blue-600 to-indigo-700',   icon: '💻' },
  'Diller':                    { gradient: 'bg-gradient-to-br from-green-500 to-teal-600',     icon: '🗣️' },
  'Matematika':                { gradient: 'bg-gradient-to-br from-purple-600 to-violet-700',  icon: '🔢' },
  'Ylymlar':                   { gradient: 'bg-gradient-to-br from-orange-500 to-red-600',     icon: '🔬' },
  'Mugallymçylyk we pedagogika': { gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',   icon: '👨‍🏫' },
  'Kompýuter endikleri':       { gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',      icon: '🖥️' },
}

const categoryGradient = computed(() =>
  categoryMap[props.course.categoryTm]?.gradient || 'bg-gradient-to-br from-slate-600 to-gray-700'
)
const categoryIcon = computed(() =>
  categoryMap[props.course.categoryTm]?.icon || '📚'
)
</script>
