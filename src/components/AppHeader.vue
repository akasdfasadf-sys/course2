<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/home" class="flex items-center gap-2">
          <div class="bg-blue-600 text-white p-2 rounded-lg">
            <BookOpen class="w-6 h-6" />
          </div>
          <span class="text-xl font-semibold">Bilim Merkezi</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-8">
          <RouterLink to="/home" class="text-gray-700 hover:text-blue-600 transition-colors">Baş sahypa</RouterLink>
          <RouterLink to="/courses" class="text-gray-700 hover:text-blue-600 transition-colors">Kurslar</RouterLink>
          <RouterLink to="/my-learning" class="text-gray-700 hover:text-blue-600 transition-colors">Meniň kurslarym</RouterLink>
        </nav>

        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center gap-2 text-sm text-gray-700">
            <User class="w-4 h-4" />
            <span>{{ auth.user.firstName }} {{ auth.user.lastName }}</span>
          </div>
          <button @click="handleLogout" class="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Çykyş">
            <LogOut class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { BookOpen, User, LogOut } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuth()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>
