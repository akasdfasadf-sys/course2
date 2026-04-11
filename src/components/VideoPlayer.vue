<template>
  <div class="bg-gray-900 rounded-lg overflow-hidden">
    <div class="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <div class="text-center px-4">
        <div class="bg-white/10 backdrop-blur-sm rounded-full p-3 md:p-4 inline-block mb-3 md:mb-4">
          <Play class="w-8 h-8 md:w-12 md:h-12 text-white" />
        </div>
        <p class="text-white text-sm md:text-lg">{{ lessonTitle }}</p>
        <p class="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">Video player placeholder</p>
      </div>

      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
        <div class="mb-2 md:mb-3">
          <div class="h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer">
            <div class="h-full bg-blue-500 rounded-full" style="width:23%" />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 md:gap-3">
            <button @click="playing = !playing" class="text-white hover:text-blue-400 transition-colors">
              <Pause v-if="playing" class="w-5 h-5 md:w-6 md:h-6" />
              <Play v-else class="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button @click="muted = !muted" class="text-white hover:text-blue-400 transition-colors">
              <VolumeX v-if="muted" class="w-4 h-4 md:w-5 md:h-5" />
              <Volume2 v-else class="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <span class="text-white text-xs md:text-sm">12:34 / 45:20</span>
          </div>
          <button class="text-white hover:text-blue-400 transition-colors">
            <Maximize class="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-vue-next'
defineProps({ lessonTitle: String })
const playing = ref(false)
const muted = ref(false)
</script>
