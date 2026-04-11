<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgb(0_0_0/0.04)] transition-shadow duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 md:h-[4.25rem]">
        <RouterLink
          to="/home"
          class="flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <div
            class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-1.5 md:p-2 rounded-xl shadow-md shadow-blue-600/25 transition-transform duration-300 hover:scale-[1.03]"
          >
            <BookOpen class="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span class="text-base md:text-xl font-bold tracking-tight text-gray-900">Bilim Merkezi</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-gray-900 hover:bg-gray-100/80"
            :class="
              navActive(item)
                ? 'text-blue-600 bg-blue-50/90 shadow-sm shadow-blue-600/10 ring-1 ring-blue-100'
                : ''
            "
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-1 md:gap-2">
          <div
            class="hidden md:flex items-center gap-2 mr-1 pl-3 pr-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-700"
          >
            <User class="w-4 h-4 text-gray-500" />
            <span class="font-medium truncate max-w-[10rem]">{{ auth.user.firstName }} {{ auth.user.lastName }}</span>
          </div>
          <button
            type="button"
            @click="handleLogout"
            class="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 active:scale-95"
            title="Çykyş"
          >
            <LogOut class="w-5 h-5" />
          </button>
          <button
            type="button"
            @click="menuOpen = !menuOpen"
            class="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            :aria-expanded="menuOpen"
            aria-label="Menýu"
          >
            <X v-if="menuOpen" class="w-5 h-5" />
            <Menu v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="menuOpen"
        class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50"
      >
        <div class="px-3 py-4 space-y-1 max-h-[min(70vh,28rem)] overflow-y-auto">
          <RouterLink
            v-for="item in navItems"
            :key="item.to + '-m'"
            :to="item.to"
            @click="menuOpen = false"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium transition-all duration-200 active:scale-[0.99]"
            :class="navActive(item) ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'"
          >
            <component :is="item.icon" class="w-5 h-5 opacity-80" />
            {{ item.label }}
          </RouterLink>
          <div class="border-t border-gray-100 pt-4 mt-2 flex items-center gap-2 px-4 text-sm text-gray-600">
            <User class="w-4 h-4" />
            <span>{{ auth.user.firstName }} {{ auth.user.lastName }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookOpen, User, LogOut, Menu, X, Home, GraduationCap, LayoutGrid } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const auth = useAuth()
const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)

const navItems = [
  { to: '/home', label: 'Baş sahypa', match: 'exact', icon: Home },
  { to: '/courses', label: 'Kurslar', match: 'courses', icon: LayoutGrid },
  { to: '/my-learning', label: 'Meniň kurslarym', match: 'exact', icon: GraduationCap },
]

function navActive(item) {
  if (item.match === 'courses') {
    return route.path === '/courses' || route.path.startsWith('/course/')
  }
  return route.path === item.to
}

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>
