<template>
  <div class="bg-black w-full" ref="playerWrapper">
    <div class="relative aspect-video bg-gray-950 group" @mousemove="showControls" @mouseleave="hideControls">

      <!-- Actual video (if URL provided) -->
      <video
        v-if="videoUrl"
        ref="videoEl"
        class="w-full h-full object-contain"
        :src="videoUrl"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onMetadata"
        @ended="$emit('ended')"
        @click="togglePlay"
      />

      <!-- Placeholder when no video URL -->
      <div v-else class="w-full h-full flex flex-col items-center justify-center cursor-pointer" @click="togglePlay">
        <div class="bg-white/10 backdrop-blur-sm rounded-full p-5 mb-4 transition-transform duration-200 hover:scale-110">
          <Play class="w-12 h-12 text-white" />
        </div>
        <p class="text-white text-base font-medium px-4 text-center">{{ lessonTitle }}</p>
        <p class="text-gray-400 text-sm mt-2">Wideo ýüklenende bu ýerde görüner</p>
      </div>

      <!-- Big play/pause overlay -->
      <div v-if="videoUrl" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Transition name="fade-scale">
          <div v-if="showPlayIcon" class="bg-black/50 rounded-full p-4">
            <component :is="playing ? Pause : Play" class="w-10 h-10 text-white" />
          </div>
        </Transition>
      </div>

      <!-- Controls overlay -->
      <div
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pt-8 pb-3 transition-opacity duration-300"
        :class="controlsVisible || !playing ? 'opacity-100' : 'opacity-0'">

        <!-- Progress bar -->
        <div class="mb-3 group/progress">
          <div
            class="h-1 group-hover/progress:h-2 bg-white/30 rounded-full overflow-hidden cursor-pointer transition-all duration-150"
            @click="seek">
            <!-- Buffered -->
            <div class="h-full bg-white/20 rounded-full absolute" :style="`width:${buffered}%`" />
            <!-- Played -->
            <div class="h-full bg-red-500 rounded-full relative" :style="`width:${progress}%`">
              <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <!-- Play/Pause -->
            <button @click="togglePlay" class="text-white hover:text-gray-200 transition-colors">
              <Pause v-if="playing" class="w-5 h-5" />
              <Play v-else class="w-5 h-5" />
            </button>

            <!-- Skip back/forward -->
            <button @click="skip(-10)" class="text-white hover:text-gray-200 transition-colors hidden sm:block">
              <RotateCcw class="w-4 h-4" />
            </button>
            <button @click="skip(10)" class="text-white hover:text-gray-200 transition-colors hidden sm:block">
              <RotateCw class="w-4 h-4" />
            </button>

            <!-- Volume -->
            <div class="flex items-center gap-2">
              <button @click="toggleMute" class="text-white hover:text-gray-200 transition-colors">
                <VolumeX v-if="muted || volume === 0" class="w-4 h-4" />
                <Volume1 v-else-if="volume < 0.5" class="w-4 h-4" />
                <Volume2 v-else class="w-4 h-4" />
              </button>
              <input
                type="range" min="0" max="1" step="0.05"
                :value="muted ? 0 : volume"
                @input="setVolume"
                class="w-16 accent-white hidden sm:block"
              />
            </div>

            <!-- Time -->
            <span class="text-white text-xs tabular-nums">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Speed -->
            <div class="relative">
              <button @click="speedMenu = !speedMenu"
                class="text-white text-xs font-semibold hover:text-gray-200 transition-colors bg-white/10 px-2 py-1 rounded">
                {{ speed }}x
              </button>
              <div v-if="speedMenu"
                class="absolute bottom-8 right-0 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-xl z-10">
                <button v-for="s in speeds" :key="s" @click="setSpeed(s)"
                  class="block w-full px-4 py-2 text-sm text-left hover:bg-gray-700 transition-colors"
                  :class="speed === s ? 'text-yellow-400 font-semibold' : 'text-white'">
                  {{ s }}x
                </button>
              </div>
            </div>

            <!-- Fullscreen -->
            <button @click="toggleFullscreen" class="text-white hover:text-gray-200 transition-colors">
              <Minimize v-if="isFullscreen" class="w-4 h-4" />
              <Maximize v-else class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import {
  Play, Pause, Volume2, Volume1, VolumeX, Maximize, Minimize,
  RotateCcw, RotateCw
} from 'lucide-vue-next'

const props = defineProps({
  lessonTitle: String,
  videoUrl: String,
})
const emit = defineEmits(['ended'])

const videoEl = ref(null)
const playerWrapper = ref(null)
const playing = ref(false)
const muted = ref(false)
const volume = ref(1)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const buffered = ref(0)
const speed = ref(1)
const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]
const speedMenu = ref(false)
const isFullscreen = ref(false)
const controlsVisible = ref(true)
const showPlayIcon = ref(false)
let controlsTimer = null
let playIconTimer = null

function togglePlay() {
  if (!videoEl.value) return
  if (playing.value) {
    videoEl.value.pause()
    playing.value = false
  } else {
    videoEl.value.play()
    playing.value = true
  }
  flashPlayIcon()
}

function flashPlayIcon() {
  showPlayIcon.value = true
  clearTimeout(playIconTimer)
  playIconTimer = setTimeout(() => showPlayIcon.value = false, 600)
}

function toggleMute() {
  if (!videoEl.value) return
  muted.value = !muted.value
  videoEl.value.muted = muted.value
}

function setVolume(e) {
  volume.value = parseFloat(e.target.value)
  if (videoEl.value) videoEl.value.volume = volume.value
  muted.value = volume.value === 0
}

function onTimeUpdate() {
  if (!videoEl.value) return
  currentTime.value = videoEl.value.currentTime
  progress.value = duration.value ? (currentTime.value / duration.value) * 100 : 0
  // Buffered
  if (videoEl.value.buffered.length) {
    buffered.value = (videoEl.value.buffered.end(0) / duration.value) * 100
  }
}

function onMetadata() {
  if (!videoEl.value) return
  duration.value = videoEl.value.duration
}

function seek(e) {
  if (!videoEl.value || !duration.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  videoEl.value.currentTime = ratio * duration.value
}

function skip(sec) {
  if (!videoEl.value) return
  videoEl.value.currentTime = Math.max(0, Math.min(duration.value, videoEl.value.currentTime + sec))
}

function setSpeed(s) {
  speed.value = s
  speedMenu.value = false
  if (videoEl.value) videoEl.value.playbackRate = s
}

function toggleFullscreen() {
  if (!playerWrapper.value) return
  if (!document.fullscreenElement) {
    playerWrapper.value.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

function showControls() {
  controlsVisible.value = true
  clearTimeout(controlsTimer)
  controlsTimer = setTimeout(() => {
    if (playing.value) controlsVisible.value = false
  }, 3000)
}

function hideControls() {
  if (playing.value) controlsVisible.value = false
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// Reset when lesson changes
watch(() => props.videoUrl, () => {
  playing.value = false
  currentTime.value = 0
  progress.value = 0
  duration.value = 0
})

onUnmounted(() => {
  clearTimeout(controlsTimer)
  clearTimeout(playIconTimer)
})
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
