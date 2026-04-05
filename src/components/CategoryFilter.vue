<template>
  <div class="flex items-center gap-3 overflow-x-auto pb-2">
    <button @click="$emit('select', 'All')"
      :class="['flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors',
        selected === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
      Ähli kurslar
    </button>
    <button v-for="cat in categories" :key="cat.id"
      @click="$emit('select', cat.nameTm)"
      :class="['flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors',
        selected === cat.nameTm ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
      {{ cat.nameTm }}
    </button>
  </div>
</template>

<script setup>
defineProps({ categories: Array, selected: String })
defineEmits(['select'])
</script>
