<template>
  <header class="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgb(0_0_0/0.04)] transition-shadow duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 md:h-[4.25rem]">

        <!-- Logo -->
        <RouterLink to="/home" class="flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
          <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-1.5 md:p-2 rounded-xl shadow-md shadow-blue-600/25 transition-transform duration-300 hover:scale-[1.03]">
            <BookOpen class="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span class="text-base md:text-xl font-bold tracking-tight text-gray-900">Bilim Merkezi</span>
        </RouterLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
            class="relative px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 hover:text-gray-900 hover:bg-gray-100/80"
            :class="navActive(item) ? 'text-blue-600 bg-blue-50/90 shadow-sm shadow-blue-600/10 ring-1 ring-blue-100' : ''">
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-1 md:gap-2">
          <!-- Dil saýlaýjy -->
          <div class="relative" ref="langRef">
            <button type="button"
              @click="langOpen = !langOpen"
              class="flex items-center gap-1 px-1.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
              <span class="w-7 h-5 rounded-sm overflow-hidden flex-shrink-0 shadow-sm">
                <component :is="currentLang.flagSvg" />
              </span>
              <svg class="w-3 h-3 text-gray-400 transition-transform duration-200" :class="langOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div v-if="langOpen" class="absolute right-0 top-full pt-1 z-50">
              <div class="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden min-w-[150px]">
                <button v-for="lang in languages" :key="lang.code" type="button"
                  @click="setLang(lang.code); langOpen = false"
                  class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  :class="locale === lang.code ? 'bg-blue-50' : ''">
                  <span class="w-7 h-5 rounded-sm overflow-hidden flex-shrink-0 shadow-sm">
                    <component :is="lang.flagSvg" />
                  </span>
                  <span class="text-sm font-medium" :class="locale === lang.code ? 'text-blue-700' : 'text-gray-700'">{{ lang.name }}</span>
                  <svg v-if="locale === lang.code" class="w-3.5 h-3.5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Profil -->
          <RouterLink to="/profile"
            class="hidden md:flex items-center gap-2 mr-1 pl-3 pr-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200">
            <User class="w-4 h-4 text-gray-500" />
            <span class="font-medium truncate max-w-[10rem]">{{ auth.user.value?.firstName }} {{ auth.user.value?.lastName }}</span>
          </RouterLink>

          <!-- Çykyş -->
          <button type="button" @click="handleLogout"
            class="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 active:scale-95" title="Çykyş">
            <LogOut class="w-5 h-5" />
          </button>

          <!-- Mobil menýu -->
          <button type="button" @click="menuOpen = !menuOpen"
            class="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            :aria-expanded="menuOpen" aria-label="Menýu">
            <X v-if="menuOpen" class="w-5 h-5" />
            <Menu v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobil menýu -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
      <div v-if="menuOpen" class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg shadow-gray-200/50">
        <div class="px-3 py-4 space-y-1 max-h-[min(70vh,28rem)] overflow-y-auto">
          <RouterLink v-for="item in navItems" :key="item.to + '-m'" :to="item.to" @click="menuOpen = false"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-medium transition-all duration-200 active:scale-[0.99]"
            :class="navActive(item) ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'">
            <component :is="item.icon" class="w-5 h-5 opacity-80" />
            {{ item.label }}
          </RouterLink>
          <div class="border-t border-gray-100 pt-3 mt-2 px-4">
            <p class="text-xs text-gray-500 mb-2 font-medium">Dil saýla</p>
            <div class="flex gap-2">
              <button v-for="lang in languages" :key="lang.code" type="button" @click="setLang(lang.code)"
                class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors border"
                :class="locale === lang.code ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'">
                <span class="w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                  <component :is="lang.flagSvg" />
                </span>
                <span class="text-xs font-semibold" :class="locale === lang.code ? 'text-blue-700' : 'text-gray-600'">{{ lang.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BookOpen, User, LogOut, Menu, X, Home, GraduationCap, LayoutGrid } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'
import FlagTM from './flags/FlagTM.vue'
import FlagRU from './flags/FlagRU.vue'
import FlagEN from './flags/FlagEN.vue'

const auth = useAuth()
const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()

const menuOpen = ref(false)
const langOpen = ref(false)
const langRef = ref(null)

const languages = [
  { code: 'tm', name: 'Türkmençe', flagSvg: FlagTM },
  { code: 'ru', name: 'Русский',   flagSvg: FlagRU },
  { code: 'en', name: 'English',   flagSvg: FlagEN },
]

const currentLang = computed(() => languages.find(l => l.code === locale.value) || languages[0])

function setLang(code) {
  locale.value = code
  localStorage.setItem('lang', code)
}

const navItems = computed(() => [
  { to: '/home', label: t('nav.home'), match: 'exact', icon: Home },
  { to: '/about', label: t('nav.about'), match: 'exact', icon: BookOpen },
  { to: '/courses', label: t('nav.courses'), match: 'courses', icon: LayoutGrid },
  { to: '/my-learning', label: t('nav.myLearning'), match: 'exact', icon: GraduationCap },
  { to: '/profile', label: t('nav.profile'), match: 'exact', icon: User },
])

function navActive(item) {
  if (item.match === 'courses') return route.path === '/courses' || route.path.startsWith('/course/')
  return route.path === item.to
}

function handleLogout() {
  auth.logout()
  router.push('/')
}

function onClickOutside(e) {
  if (langRef.value && !langRef.value.contains(e.target)) langOpen.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>
