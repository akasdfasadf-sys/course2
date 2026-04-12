<template>
  <div>
    <!-- Not enrolled -->
    <div v-if="!isEnrolled"
      class="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
      <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock class="w-8 h-8 text-gray-400" />
      </div>
      <h2 class="text-white text-xl font-bold mb-2">Synag ýapyk</h2>
      <p class="text-gray-400 mb-6">Synaga gatnaşmak üçin kursa ýazylyň</p>
      <RouterLink :to="`/course/${$route.params.id}/enroll`"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
        Kursa ýazylmak
      </RouterLink>
    </div>

    <!-- Exam intro (not started) -->
    <div v-else-if="phase === 'intro'"
      class="bg-gray-900 border rounded-2xl p-8"
      :class="lesson.examType === 'final' ? 'border-yellow-700/50' : 'border-purple-700/50'">

      <div class="flex items-center gap-3 mb-6">
        <div class="w-14 h-14 rounded-full flex items-center justify-center"
          :class="lesson.examType === 'final' ? 'bg-yellow-500/20' : 'bg-purple-500/20'">
          <Trophy v-if="lesson.examType === 'final'" class="w-7 h-7 text-yellow-400" />
          <ClipboardList v-else class="w-7 h-7 text-purple-400" />
        </div>
        <div>
          <p class="text-gray-400 text-sm">{{ lesson.examType === 'final' ? 'Jemleýji synag' : 'Ýarym ýyl synagy' }}</p>
          <h2 class="text-white text-2xl font-bold">{{ lesson.title }}</h2>
        </div>
      </div>

      <p class="text-gray-300 mb-6 leading-relaxed">{{ lesson.description }}</p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div class="bg-gray-800 rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-white">{{ lesson.questions.length }}</p>
          <p class="text-gray-400 text-xs mt-1">Sual sany</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-white">{{ lesson.duration }}</p>
          <p class="text-gray-400 text-xs mt-1">Wagt</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-4 text-center">
          <p class="text-2xl font-bold" :class="lesson.examType === 'final' ? 'text-yellow-400' : 'text-purple-400'">
            {{ lesson.passingScore }}%
          </p>
          <p class="text-gray-400 text-xs mt-1">Geçmek üçin</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-white">{{ attempts }}</p>
          <p class="text-gray-400 text-xs mt-1">Synanyşyk</p>
        </div>
      </div>

      <!-- Previous result -->
      <div v-if="lesson.score !== undefined"
        class="mb-6 p-4 rounded-xl border"
        :class="lesson.score >= lesson.passingScore
          ? 'bg-green-900/30 border-green-700/50'
          : 'bg-red-900/30 border-red-700/50'">
        <p class="text-sm font-medium"
          :class="lesson.score >= lesson.passingScore ? 'text-green-400' : 'text-red-400'">
          Öňki netije: {{ lesson.score }}% —
          {{ lesson.score >= lesson.passingScore ? 'Geçildi ✓' : 'Geçilmedi ✗' }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button @click="startExam"
          class="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-colors"
          :class="lesson.examType === 'final'
            ? 'bg-yellow-600 hover:bg-yellow-500'
            : 'bg-purple-600 hover:bg-purple-500'">
          <PlayCircle class="w-5 h-5" />
          {{ lesson.score !== undefined ? 'Täzeden synanyşmak' : 'Synagy başlatmak' }}
        </button>
      </div>
    </div>

    <!-- Exam in progress -->
    <div v-else-if="phase === 'taking'" class="space-y-6">

      <!-- Exam header -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p class="text-gray-400 text-sm">{{ lesson.title }}</p>
          <p class="text-white font-semibold">{{ currentQ + 1 }} / {{ lesson.questions.length }} sual</p>
        </div>
        <div class="flex items-center gap-2 text-orange-400 font-mono font-bold text-lg">
          <Timer class="w-5 h-5" />
          {{ timeLeft }}
        </div>
      </div>

      <!-- Progress dots -->
      <div class="flex gap-2 flex-wrap">
        <button v-for="(q, i) in lesson.questions" :key="q.id"
          @click="currentQ = i"
          class="w-8 h-8 rounded-full text-xs font-bold transition-colors"
          :class="
            i === currentQ ? 'bg-blue-600 text-white' :
            answers[i] !== undefined ? 'bg-green-600 text-white' :
            'bg-gray-700 text-gray-400 hover:bg-gray-600'
          ">
          {{ i + 1 }}
        </button>
      </div>

      <!-- Question card -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6">
        <p class="text-white text-lg font-semibold mb-6 leading-relaxed">
          {{ currentQ + 1 }}. {{ lesson.questions[currentQ].question }}
        </p>

        <div class="space-y-3">
          <button v-for="(opt, oi) in lesson.questions[currentQ].options" :key="oi"
            @click="selectAnswer(oi)"
            class="w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 font-medium"
            :class="answers[currentQ] === oi
              ? 'border-blue-500 bg-blue-900/40 text-white'
              : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700'">
            {{ opt }}
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between gap-3">
        <button @click="currentQ--" :disabled="currentQ === 0"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium">
          <ChevronLeft class="w-4 h-4" /> Öňki
        </button>

        <button v-if="currentQ < lesson.questions.length - 1"
          @click="currentQ++"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium">
          Indiki <ChevronRight class="w-4 h-4" />
        </button>

        <button v-else @click="submitExam"
          :disabled="answeredCount < lesson.questions.length"
          class="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="lesson.examType === 'final' ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-purple-600 hover:bg-purple-500'">
          <CheckCircle class="w-4 h-4" />
          Synagy tabşyrmak
          <span v-if="answeredCount < lesson.questions.length" class="text-xs opacity-70">
            ({{ answeredCount }}/{{ lesson.questions.length }})
          </span>
        </button>
      </div>
    </div>

    <!-- Result -->
    <div v-else-if="phase === 'result'"
      class="bg-gray-900 border rounded-2xl p-8 text-center"
      :class="passed ? 'border-green-700/50' : 'border-red-700/50'">

      <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        :class="passed ? 'bg-green-500/20' : 'bg-red-500/20'">
        <component :is="passed ? Trophy : XCircle" class="w-10 h-10"
          :class="passed ? 'text-green-400' : 'text-red-400'" />
      </div>

      <h2 class="text-white text-2xl font-bold mb-2">
        {{ passed ? 'Gutlaýarys! Geçdiňiz!' : 'Gynansak-da, geçilmedi' }}
      </h2>
      <p class="text-gray-400 mb-8">
        {{ passed
          ? 'Synagy üstünlikli tamamladyňyz!'
          : `Geçmek üçin ${lesson.passingScore}% gerek. Täzeden synanyşyň.` }}
      </p>

      <!-- Score circle -->
      <div class="relative w-36 h-36 mx-auto mb-8">
        <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#374151" stroke-width="8" />
          <circle cx="50" cy="50" r="42" fill="none"
            :stroke="passed ? '#22c55e' : '#ef4444'"
            stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="`${score * 2.64} 264`" />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-3xl font-bold" :class="passed ? 'text-green-400' : 'text-red-400'">{{ score }}%</span>
          <span class="text-gray-400 text-xs">Netije</span>
        </div>
      </div>

      <!-- Detailed results -->
      <div class="grid grid-cols-3 gap-4 mb-8 text-center">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="text-2xl font-bold text-green-400">{{ correctCount }}</p>
          <p class="text-gray-400 text-xs mt-1">Dogry</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="text-2xl font-bold text-red-400">{{ lesson.questions.length - correctCount }}</p>
          <p class="text-gray-400 text-xs mt-1">Ýalňyş</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="text-2xl font-bold text-white">{{ lesson.questions.length }}</p>
          <p class="text-gray-400 text-xs mt-1">Jemi</p>
        </div>
      </div>

      <!-- Answer review -->
      <div class="text-left space-y-3 mb-8">
        <h3 class="text-white font-semibold text-lg mb-4">Jogaplaryň seljermesi</h3>
        <div v-for="(q, i) in lesson.questions" :key="q.id"
          class="bg-gray-800 rounded-xl p-4 border"
          :class="answers[i] === q.correct ? 'border-green-700/50' : 'border-red-700/50'">
          <div class="flex items-start gap-2 mb-3">
            <CheckCircle v-if="answers[i] === q.correct" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <XCircle v-else class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p class="text-white text-sm font-medium">{{ i + 1 }}. {{ q.question }}</p>
          </div>
          <div class="space-y-1.5 ml-7">
            <div v-for="(opt, oi) in q.options" :key="oi"
              class="text-sm px-3 py-1.5 rounded-lg"
              :class="
                oi === q.correct ? 'bg-green-900/40 text-green-300' :
                oi === answers[i] && oi !== q.correct ? 'bg-red-900/40 text-red-300' :
                'text-gray-500'
              ">
              {{ opt }}
              <span v-if="oi === q.correct" class="ml-2 text-xs text-green-400">✓ Dogry jogap</span>
              <span v-else-if="oi === answers[i] && oi !== q.correct" class="ml-2 text-xs text-red-400">✗ Siziň jogabyňyz</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button @click="retryExam"
          class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors">
          <RotateCcw class="w-4 h-4" /> Täzeden synanyşmak
        </button>
        <button v-if="passed" @click="$emit('passed', score)"
          class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-colors"
          :class="lesson.examType === 'final' ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-green-600 hover:bg-green-500'">
          <ChevronRight class="w-4 h-4" /> Dowam et
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import {
  Lock, Trophy, ClipboardList, PlayCircle, Timer,
  CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw
} from 'lucide-vue-next'

const props = defineProps({
  lesson: Object,
  isEnrolled: Boolean,
})
const emit = defineEmits(['passed', 'failed'])

const phase = ref('intro') // intro | taking | result
const currentQ = ref(0)
const answers = ref({})
const score = ref(0)
const correctCount = ref(0)
const attempts = ref(0)
const timeLeft = ref('')
let timer = null

const passed = computed(() => score.value >= props.lesson.passingScore)
const answeredCount = computed(() => Object.keys(answers.value).length)

function startExam() {
  phase.value = 'taking'
  currentQ.value = 0
  answers.value = {}
  attempts.value++
  startTimer()
}

function startTimer() {
  // Parse duration minutes
  const mins = parseInt(props.lesson.duration) || 45
  let secs = mins * 60
  updateTimeDisplay(secs)
  timer = setInterval(() => {
    secs--
    updateTimeDisplay(secs)
    if (secs <= 0) {
      clearInterval(timer)
      submitExam()
    }
  }, 1000)
}

function updateTimeDisplay(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  timeLeft.value = `${m}:${s.toString().padStart(2, '0')}`
}

function selectAnswer(optionIndex) {
  answers.value = { ...answers.value, [currentQ.value]: optionIndex }
}

function submitExam() {
  clearInterval(timer)
  // Calculate score
  let correct = 0
  props.lesson.questions.forEach((q, i) => {
    if (answers.value[i] === q.correct) correct++
  })
  correctCount.value = correct
  score.value = Math.round((correct / props.lesson.questions.length) * 100)
  phase.value = 'result'
  if (!passed.value) emit('failed')
}

function retryExam() {
  phase.value = 'intro'
  clearInterval(timer)
}

onUnmounted(() => clearInterval(timer))
</script>
