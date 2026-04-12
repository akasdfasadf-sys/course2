<template>
  <div class="min-h-screen bg-gray-950 flex flex-col">

    <!-- Top bar -->
    <div class="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div class="flex items-center justify-between h-14 px-4 gap-4">
        <RouterLink :to="`/course/${course?.id}`"
          class="flex items-center gap-2 text-gray-300 hover:text-white transition-colors flex-shrink-0">
          <ChevronLeft class="w-5 h-5" />
          <span class="text-sm font-medium hidden sm:inline truncate max-w-[180px]">{{ course?.titleTm }}</span>
        </RouterLink>

        <div class="flex-1 max-w-sm">
          <div class="flex items-center gap-2">
            <div class="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-green-500 rounded-full transition-all duration-500"
                :style="`width:${progressPercent}%`" />
            </div>
            <span class="text-xs text-gray-400 whitespace-nowrap">{{ progressPercent }}%</span>
          </div>
        </div>

        <button @click="sidebarOpen = !sidebarOpen"
          class="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white bg-gray-800 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
          <LayoutList class="w-4 h-4" />
          <span class="hidden sm:inline">Kurs mazmuny</span>
        </button>
      </div>
    </div>

    <div v-if="!course" class="flex-1 flex items-center justify-center">
      <div class="text-center text-white">
        <h2 class="text-xl font-bold mb-2">Kurs tapylmady</h2>
        <RouterLink to="/courses" class="text-blue-400">Ähli kurslary gör</RouterLink>
      </div>
    </div>

    <div v-else class="flex flex-1 overflow-hidden relative">

      <!-- Main content -->
      <div class="flex-1 overflow-y-auto transition-all duration-300"
        :class="sidebarOpen ? 'lg:mr-[380px]' : ''">

        <!-- ===== EXAM MODE ===== -->
        <div v-if="currentLesson?.type === 'exam'" class="max-w-3xl mx-auto px-4 py-8">
          <ExamPanel
            :lesson="currentLesson"
            :is-enrolled="isEnrolled"
            @passed="onExamPassed"
            @failed="onExamFailed"
          />
        </div>

        <!-- ===== VIDEO MODE ===== -->
        <template v-else>
          <!-- Video -->
          <div class="bg-black">
            <div class="max-w-5xl mx-auto">
              <!-- Locked overlay for non-enrolled -->
              <div v-if="!currentLesson?.preview && !isEnrolled"
                class="aspect-video bg-gray-900 flex flex-col items-center justify-center gap-4">
                <div class="bg-gray-800 rounded-full p-5">
                  <Lock class="w-10 h-10 text-gray-400" />
                </div>
                <p class="text-white font-semibold text-lg">Bu sapak ýapyk</p>
                <p class="text-gray-400 text-sm text-center px-4">Ähli sapaklara girmek üçin kursa ýazylyň</p>
                <RouterLink :to="`/course/${course.id}/enroll`"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors">
                  Kursa ýazylmak
                </RouterLink>
              </div>
              <VideoPlayer v-else
                :lesson-title="currentLesson?.title"
                :video-url="currentLesson?.videoUrl"
                @ended="onVideoEnded"
              />
            </div>
          </div>

          <!-- Lesson info -->
          <div class="max-w-5xl mx-auto px-4 py-6">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p class="text-gray-400 text-sm mb-1">{{ currentSection?.title }}</p>
                <h1 class="text-white text-xl md:text-2xl font-bold">{{ currentLesson?.title }}</h1>
                <div class="flex items-center gap-3 mt-2 flex-wrap">
                  <span class="text-gray-400 text-sm flex items-center gap-1">
                    <Clock class="w-4 h-4" />{{ currentLesson?.duration }}
                  </span>
                  <span v-if="currentLesson?.preview"
                    class="text-xs text-green-400 border border-green-400/50 px-2 py-0.5 rounded-full">
                    Mugt görüp bolýar
                  </span>
                </div>
              </div>
              <div class="flex-shrink-0">
                <button v-if="isEnrolled && !currentLesson?.completed && currentLesson?.type === 'video'"
                  @click="markComplete"
                  class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors text-sm">
                  <CheckCircle class="w-4 h-4" /> Tamamlandy diýip bellemek
                </button>
                <div v-else-if="currentLesson?.completed"
                  class="flex items-center gap-2 text-green-400 font-semibold text-sm">
                  <CheckCircle class="w-5 h-5" /> Tamamlandy
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="border-b border-gray-700 mb-6">
              <div class="flex gap-1 overflow-x-auto">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                  class="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors"
                  :class="activeTab === tab.id ? 'text-white border-white' : 'text-gray-400 hover:text-gray-200 border-transparent'">
                  {{ tab.label }}
                </button>
              </div>
            </div>

            <div class="text-gray-300">
              <div v-if="activeTab === 'overview'">
                <p class="leading-relaxed">{{ currentLesson?.description || 'Bu sapak barada maglumat ýok.' }}</p>
                <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div class="bg-gray-800 rounded-xl p-4">
                    <p class="text-gray-400 text-xs mb-1">Dowamlylygy</p>
                    <p class="text-white font-semibold">{{ currentLesson?.duration }}</p>
                  </div>
                  <div class="bg-gray-800 rounded-xl p-4">
                    <p class="text-gray-400 text-xs mb-1">Görnüşi</p>
                    <p class="text-white font-semibold">Wideo sapak</p>
                  </div>
                  <div class="bg-gray-800 rounded-xl p-4">
                    <p class="text-gray-400 text-xs mb-1">Ýagdaýy</p>
                    <p class="font-semibold" :class="currentLesson?.completed ? 'text-green-400' : 'text-yellow-400'">
                      {{ currentLesson?.completed ? 'Tamamlandy' : 'Dowam edýär' }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'resources'">
                <h3 class="text-white font-semibold mb-3">Çeşmeler</h3>
                <div class="space-y-2">
                  <div v-for="i in 3" :key="i"
                    class="flex items-center gap-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer">
                    <FileText class="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span class="text-sm">Sapak materialy {{ i }}.pdf</span>
                    <Download class="w-4 h-4 text-gray-400 ml-auto" />
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'notes'">
                <h3 class="text-white font-semibold mb-3">Bellikler</h3>
                <textarea v-model="notes" placeholder="Bu sapak barada bellik ýazyň..."
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none h-40 text-sm" />
                <button class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Sakla
                </button>
              </div>
            </div>

            <!-- Certificate -->
            <div v-if="progressPercent === 100 && isEnrolled"
              class="mt-8 bg-gradient-to-br from-yellow-900/40 to-amber-900/30 border border-yellow-700/50 rounded-2xl p-6 text-center">
              <div class="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award class="w-8 h-8 text-yellow-400" />
              </div>
              <h2 class="text-white text-xl font-bold mb-2">Gutlaýarys!</h2>
              <p class="text-gray-300 mb-6">Siz "{{ course.titleTm }}" kursyny üstünlikli tamamladyňyz!</p>
              <button class="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl font-bold transition-colors">
                Sertifikaty göçürip almak
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- ===== SIDEBAR ===== -->
      <div class="fixed top-14 right-0 bottom-0 w-full sm:w-[380px] bg-gray-900 border-l border-gray-700 overflow-y-auto z-40 transition-transform duration-300"
        :class="sidebarOpen ? 'translate-x-0' : 'translate-x-full'">

        <div class="sticky top-0 bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <h3 class="text-white font-semibold">Kurs mazmuny</h3>
          <button @click="sidebarOpen = false" class="text-gray-400 hover:text-white transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Progress summary -->
        <div class="px-4 py-3 bg-gray-800/50 border-b border-gray-700">
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-gray-400">{{ completedCount }} / {{ totalLessons }} tamamlandy</span>
            <span class="text-green-400 font-semibold">{{ progressPercent }}%</span>
          </div>
          <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-green-500 rounded-full transition-all duration-500"
              :style="`width:${progressPercent}%`" />
          </div>
        </div>

        <!-- Sections -->
        <div v-for="section in sections" :key="section.id" class="border-b border-gray-700/50">
          <!-- Section header -->
          <button @click="toggleSection(section.id)"
            class="w-full flex items-start justify-between px-4 py-4 hover:bg-gray-800/50 transition-colors text-left">
            <div class="flex-1 pr-2">
              <p class="text-white text-sm font-semibold leading-snug">{{ section.title }}</p>
              <p class="text-gray-400 text-xs mt-1">{{ section.lessons.length }} sapak · {{ section.duration }}</p>
            </div>
            <ChevronDown class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-200"
              :class="openSections.includes(section.id) ? 'rotate-180' : ''" />
          </button>

          <!-- Lessons -->
          <div v-if="openSections.includes(section.id)">
            <button v-for="lesson in section.lessons" :key="lesson.id"
              @click="selectLesson(section, lesson)"
              class="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left border-t border-gray-700/30"
              :class="currentLesson?.id === lesson.id ? 'bg-blue-900/30 border-l-2 border-l-blue-500' : ''">

              <!-- Icon -->
              <div class="flex-shrink-0 mt-0.5">
                <CheckCircle v-if="lesson.completed" class="w-5 h-5 text-green-400" />
                <div v-else-if="currentLesson?.id === lesson.id"
                  class="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center">
                  <div class="w-2 h-2 bg-blue-400 rounded-full" />
                </div>
                <ClipboardList v-else-if="lesson.type === 'exam'" class="w-5 h-5"
                  :class="section.isFinal ? 'text-yellow-500' : 'text-purple-400'" />
                <Lock v-else-if="!lesson.preview && !isEnrolled" class="w-5 h-5 text-gray-600" />
                <PlayCircle v-else class="w-5 h-5 text-gray-500" />
              </div>

              <div class="flex-1 min-w-0">
                <p class="text-sm leading-snug"
                  :class="currentLesson?.id === lesson.id ? 'text-white font-medium' : 'text-gray-300'">
                  {{ lesson.title }}
                </p>
                <div class="flex items-center gap-2 mt-1 flex-wrap">
                  <span class="text-xs text-gray-500">{{ lesson.duration }}</span>
                  <span v-if="lesson.preview"
                    class="text-xs text-green-400 border border-green-400/40 px-1.5 py-0.5 rounded-full">Mugt</span>
                  <span v-if="lesson.type === 'exam'"
                    class="text-xs px-1.5 py-0.5 rounded-full border"
                    :class="section.isFinal
                      ? 'text-yellow-400 border-yellow-400/40'
                      : 'text-purple-400 border-purple-400/40'">
                    {{ section.isFinal ? 'Final' : 'Midterm' }}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile overlay -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronLeft, ChevronDown, CheckCircle, PlayCircle, ClipboardList,
  LayoutList, X, Clock, Award, FileText, Download, Lock
} from 'lucide-vue-next'
import VideoPlayer from '../components/VideoPlayer.vue'
import ExamPanel from '../components/ExamPanel.vue'
import { courses } from '../data/courses'
import { getCourseSections } from '../data/lessons'
import { useAuth } from '../stores/auth'

const route = useRoute()
const auth = useAuth()
const course = computed(() => courses.find(c => c.id === route.params.id))
const isEnrolled = computed(() => auth.user.value?.enrolledCourses?.includes(course.value?.id))

const sections = ref([])
const sidebarOpen = ref(true)
const openSections = ref([])
const currentSection = ref(null)
const currentLesson = ref(null)
const activeTab = ref('overview')
const notes = ref('')

const tabs = [
  { id: 'overview', label: 'Syn' },
  { id: 'resources', label: 'Çeşmeler' },
  { id: 'notes', label: 'Bellikler' },
]

onMounted(() => {
  sections.value = getCourseSections(route.params.id)
  if (sections.value.length) {
    openSections.value = [sections.value[0].id]
    currentSection.value = sections.value[0]
    currentLesson.value = sections.value[0].lessons[0]
  }
})

function toggleSection(id) {
  openSections.value = openSections.value.includes(id)
    ? openSections.value.filter(s => s !== id)
    : [...openSections.value, id]
}

function selectLesson(section, lesson) {
  // Non-enrolled can only see preview lessons
  if (!lesson.preview && !isEnrolled.value) return
  currentSection.value = section
  currentLesson.value = lesson
  activeTab.value = 'overview'
  if (window.innerWidth < 1024) sidebarOpen.value = false
}

function markComplete() {
  if (!currentLesson.value) return
  for (const sec of sections.value) {
    const l = sec.lessons.find(l => l.id === currentLesson.value.id)
    if (l) { l.completed = true; currentLesson.value = { ...l }; break }
  }
  autoAdvance()
}

function onVideoEnded() {
  if (isEnrolled.value) markComplete()
}

function onExamPassed(score) {
  for (const sec of sections.value) {
    const l = sec.lessons.find(l => l.id === currentLesson.value.id)
    if (l) { l.completed = true; l.score = score; currentLesson.value = { ...l }; break }
  }
  autoAdvance()
}

function onExamFailed() { /* stay on exam */ }

function autoAdvance() {
  const allLessons = sections.value.flatMap(s => s.lessons)
  const idx = allLessons.findIndex(l => l.id === currentLesson.value?.id)
  if (idx !== -1 && idx < allLessons.length - 1) {
    const next = allLessons[idx + 1]
    for (const sec of sections.value) {
      if (sec.lessons.find(l => l.id === next.id)) {
        openSections.value = [...new Set([...openSections.value, sec.id])]
        currentSection.value = sec
        currentLesson.value = next
        break
      }
    }
  }
}

const totalLessons = computed(() =>
  sections.value.reduce((acc, s) => acc + s.lessons.length, 0)
)
const completedCount = computed(() =>
  sections.value.reduce((acc, s) => acc + s.lessons.filter(l => l.completed).length, 0)
)
const progressPercent = computed(() =>
  totalLessons.value ? Math.round((completedCount.value / totalLessons.value) * 100) : 0
)
</script>
