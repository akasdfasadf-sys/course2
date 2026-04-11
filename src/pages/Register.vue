<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-8 px-4">
    <div class="w-full max-w-2xl mx-auto bm-animate-fade-up">
      <div class="text-center mb-6 md:mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2 mb-5 md:mb-6">
          <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2.5 md:p-3 rounded-xl shadow-lg shadow-blue-600/30"><BookOpen class="w-6 h-6 md:w-8 md:h-8" /></div>
          <span class="text-xl md:text-2xl font-semibold text-gray-900">Bilim Merkezi</span>
        </RouterLink>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Hasaba alyň</h1>
        <p class="text-sm md:text-base text-gray-600">Okuw platformasyna goşulyň</p>
      </div>

      <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-[var(--bm-shadow-card-hover)] p-5 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4 flex items-start gap-3">
            <AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3 md:gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Ady</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input v-model="form.firstName" type="text" required
                  class="w-full pl-9 md:pl-10 pr-3 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  placeholder="Adyňyz" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Familiýasy</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input v-model="form.lastName" type="text" required
                  class="w-full pl-9 md:pl-10 pr-3 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  placeholder="Familiýaňyz" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">E-poçta</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input v-model="form.email" type="email" required
                class="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="mysal@email.com" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
            <div class="relative">
              <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input v-model="form.phone" type="tel" required
                class="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="+993 XX XXX-XXX" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 md:gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Doglan senesi</label>
              <div class="relative">
                <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input v-model="form.dateOfBirth" type="date" required
                  class="w-full pl-9 md:pl-10 pr-2 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Bilim derejesi</label>
              <div class="relative">
                <GraduationCap class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <select v-model="form.education" required
                  class="w-full pl-9 md:pl-10 pr-2 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm md:text-base">
                  <option value="">Saýlaň</option>
                  <option value="secondary">Orta mekdep</option>
                  <option value="vocational">Hünär mekdebi</option>
                  <option value="bachelor">Bakalawr</option>
                  <option value="master">Magistr</option>
                  <option value="phd">Ylymlar doktory</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Salgysy</label>
            <div class="relative">
              <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input v-model="form.address" type="text" required
                class="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="Salgyňyz" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 md:gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Parol</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input v-model="form.password" type="password" required
                  class="w-full pl-9 md:pl-10 pr-3 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  placeholder="••••••••" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Tassyklaň</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input v-model="form.confirmPassword" type="password" required
                  class="w-full pl-9 md:pl-10 pr-3 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  placeholder="••••••••" />
              </div>
            </div>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 text-base active:scale-[0.99]">
            <CheckCircle class="w-5 h-5" />
            {{ loading ? 'Garaşyň...' : 'Hasaba alyň' }}
          </button>
        </form>

        <div class="mt-5 text-center">
          <p class="text-sm md:text-base text-gray-600">
            Eýýäm hasabyňyz barmy?
            <RouterLink to="/login" class="text-blue-600 font-medium hover:text-blue-700"> Giriş</RouterLink>
          </p>
        </div>
      </div>

      <div class="mt-5 text-center">
        <RouterLink to="/" class="text-sm md:text-base text-gray-600 hover:text-gray-900">← Baş sahypa</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, Mail, Lock, User, Phone, Calendar, MapPin, GraduationCap, AlertCircle, CheckCircle } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const router = useRouter()
const auth = useAuth()
const error = ref('')
const loading = ref(false)

const form = ref({
  firstName: '', lastName: '', email: '', phone: '',
  dateOfBirth: '', address: '', education: '',
  password: '', confirmPassword: '',
})

async function handleSubmit() {
  error.value = ''
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Parollar gabat gelenok'; return
  }
  if (form.value.password.length < 6) {
    error.value = 'Parol azyndan 6 harpdan ybarat bolmaly'; return
  }
  loading.value = true
  const { confirmPassword, password, ...userData } = form.value
  const ok = auth.register(userData)
  if (ok) {
    router.push('/home')
  } else {
    error.value = 'Bu e-poçta eýýäm ulanylypdyr'
  }
  loading.value = false
}
</script>
