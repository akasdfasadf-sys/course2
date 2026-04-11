<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md bm-animate-fade-up">
      <div class="text-center mb-6 md:mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2 mb-5 md:mb-6">
          <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2.5 md:p-3 rounded-xl shadow-lg shadow-blue-600/30"><BookOpen class="w-6 h-6 md:w-8 md:h-8" /></div>
          <span class="text-xl md:text-2xl font-semibold text-gray-900">Bilim Merkezi</span>
        </RouterLink>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Hoş geldiňiz</h1>
        <p class="text-sm md:text-base text-gray-600">Hasabyňyza giriň</p>
      </div>

      <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-[var(--bm-shadow-card-hover)] p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-5 md:space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4 flex items-start gap-3">
            <AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">E-poçta</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="email" type="email" required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="mysal@email.com" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Parol</label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="password" type="password" required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-base active:scale-[0.99]">
            {{ loading ? 'Garaşyň...' : 'Giriş' }}
          </button>
        </form>

        <div class="mt-5 md:mt-6 text-center">
          <p class="text-sm md:text-base text-gray-600">
            Hasabyňyz ýokmy?
            <RouterLink to="/register" class="text-blue-600 font-medium hover:text-blue-700"> Hasaba alyň</RouterLink>
          </p>
        </div>
      </div>

      <div class="mt-5 md:mt-6 text-center">
        <RouterLink to="/" class="text-sm md:text-base text-gray-600 hover:text-gray-900">← Baş sahypa</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, Mail, Lock, AlertCircle } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const auth = useAuth()
const router = useRouter()

async function handleSubmit() {
  error.value = ''
  loading.value = true
  const ok = auth.login(email.value, password.value)
  if (ok) {
    router.push('/home')
  } else {
    error.value = 'E-poçta ýa-da parol nädogry'
  }
  loading.value = false
}
</script>
