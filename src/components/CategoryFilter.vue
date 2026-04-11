<template>
  <div
    class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
    style="-webkit-overflow-scrolling: touch"
  >
    <button
      type="button"
      @click="$emit('select', 'All')"
      :class="[
        'snap-start flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-full whitespace-nowrap text-xs md:text-sm font-semibold flex-shrink-0 transition-all duration-200 active:scale-[0.98]',
        selected === 'All'
          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-500/20'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent hover:border-gray-200',
      ]"
    >
      Ähli kurslar
    </button>
    <button
      v-for="cat in categories"
      :key="cat.id"
      type="button"
      @click="$emit('select', cat.nameTm)"
      :class="[
        'snap-start flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-full whitespace-nowrap text-xs md:text-sm font-semibold flex-shrink-0 transition-all duration-200 active:scale-[0.98]',
        selected === cat.nameTm
          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-500/20'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent hover:border-gray-200',
      ]"
    >
      {{ cat.nameTm }}
    </button>
  </div>
</template>

<script setup>
defineProps({ categories: Array, selected: String })
defineEmits(['select'])
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
