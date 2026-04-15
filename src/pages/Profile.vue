<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <!-- Hero banner -->
    <div class="relative bg-gradient-to-br from-[#0056d2] via-blue-700 to-indigo-900 text-white overflow-hidden">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 md:gap-6">
          <!-- Avatar -->
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center flex-shrink-0 shadow-xl">
            <span class="text-3xl md:text-4xl font-extrabold text-white">{{ initials }}</span>
          </div>
          <div class="text-center sm:text-left">
            <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">{{ fullName }}</h1>
            <p class="text-blue-100 text-sm md:text-base mt-1">{{ auth.user.value?.email }}</p>
            <div class="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              <span class="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                <GraduationCap class="w-3.5 h-3.5" /> {{ enrolledCourses.length }} kurs
              </span>
              <span class="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                <Award class="w-3.5 h-3.5" /> {{ completedCount }} tamamlanan
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        <!-- Left: personal info -->
        <div class="lg:col-span-1 space-y-5">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <h2 class="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User class="w-5 h-5 text-blue-600" /> Şahsy maglumatlar
            </h2>
            <div class="space-y-3">
              <div v-for="f in infoFields" :key="f.label" class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <component :is="f.icon" class="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p class="text-xs text-gray-500 font-medium">{{ f.label }}</p>
                  <p class="text-sm font-semibold text-gray-900">{{ f.value || '—' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <h2 class="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp class="w-5 h-5 text-blue-600" /> Statistika
            </h2>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="s in stats" :key="s.label" class="text-center p-3 rounded-xl" :class="s.bg">
                <p class="text-xl md:text-2xl font-extrabold" :class="s.color">{{ s.value }}</p>
                <p class="text-xs text-gray-600 mt-0.5 font-medium">{{ s.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: enrolled courses -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <h2 class="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen class="w-5 h-5 text-blue-600" /> Ýazylan kurslar
            </h2>

            <div v-if="enrolledCourses.length > 0" class="space-y-3">
              <RouterLink
                v-for="c in enrolledCourses"
                :key="c.id"
                :to="`/course/${c.id}/learn`"
                class="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200 group"
              >
                <img
                  :src="c.thumbnail"
                  :alt="c.titleTm"
                  class="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover flex-shrink-0"
                  @error="e => (e.target.src = 'https://placehold.co/64x64?text=Kurs')"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 text-sm md:text-base truncate group-hover:text-blue-700 transition-colors">{{ c.titleTm }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ c.instructor }}</p>
                  <div class="mt-2">
                    <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
                      <div
                        class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                        :style="`width:${c.progress || 0}%`"
                      />
                    </div>
                    <p class="text-xs text-gray-500 mt-1">{{ c.progress || 0 }}% tamamlandy</p>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <span
                    :class="[
                      'text-xs font-semibold px-2.5 py-1 rounded-lg',
                      (c.progress || 0) >= 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    ]"
                  >{{ (c.progress || 0) >= 100 ? 'Tamamlandy' : 'Dowam edýär' }}</span>
                </div>
              </RouterLink>
            </div>

            <div v-else class="text-center py-10">
              <div class="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen class="w-7 h-7 text-blue-400" />
              </div>
              <p class="text-gray-500 text-sm mb-4">Entek ýazylan kursyňyz ýok</p>
              <RouterLink to="/courses" class="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                Kurslara göz aýla
              </RouterLink>
            </div>
          </div>
        </div>

      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { User, Mail, Phone, BookOpen, GraduationCap, Award, TrendingUp, Calendar } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'
import api from '../services/api'

const auth = useAuth()
const apiEnrollments = ref([])

onMounted(async () => {
  try {
    const { data } = await api.get('/enrollments/my')
    apiEnrollments.value = data
  } catch {}
})

const fullName = computed(() => `${auth.user.value?.firstName || ''} ${auth.user.value?.lastName || ''}`.trim())
const initials = computed(() => {
  const f = auth.user.value?.firstName?.[0] || ''
  const l = auth.user.value?.lastName?.[0] || ''
  return (f + l).toUpperCase() || '?'
})

const enrolledCourses = computed(() => {
  // API-dan gelen ýazylmalar bar bolsa şony ulan, ýok bolsa localStorage
  const ids = apiEnrollments.value.length
    ? apiEnrollments.value.map(e => e.courseId)
    : (auth.user.value?.enrolledCourses || [])
  return courses.filter(c => ids.includes(c.id)).map(c => {
    const enrollment = apiEnrollments.value.find(e => e.courseId === c.id)
    return { ...c, progress: enrollment?.progress || c.progress || 0 }
  })
})

const completedCount = computed(() => enrolledCourses.value.filter(c => (c.progress || 0) >= 100).length)

const infoFields = computed(() => [
  { label: 'Ady', value: auth.user.value?.firstName, icon: User },
  { label: 'Familiýasy', value: auth.user.value?.lastName, icon: User },
  { label: 'E-poçta', value: auth.user.value?.email, icon: Mail },
  { label: 'Telefon', value: auth.user.value?.phone, icon: Phone },
  { label: 'Hasaba alnan senesi', value: auth.user.value?.createdAt
    ? new Date(auth.user.value.createdAt).toLocaleDateString('tk-TM')
    : auth.user.value?.id ? new Date(Number(auth.user.value.id)).toLocaleDateString('tk-TM') : '—', icon: Calendar },
])

const stats = computed(() => [
  { label: 'Ýazylan', value: enrolledCourses.value.length, bg: 'bg-blue-50', color: 'text-blue-700' },
  { label: 'Tamamlanan', value: completedCount.value, bg: 'bg-green-50', color: 'text-green-700' },
  { label: 'Dowam edýär', value: enrolledCourses.value.length - completedCount.value, bg: 'bg-yellow-50', color: 'text-yellow-700' },
  { label: 'Kategoriýa', value: new Set(enrolledCourses.value.map(c => c.category)).size, bg: 'bg-purple-50', color: 'text-purple-700' },
])
</script>
