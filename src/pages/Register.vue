<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
    <div class="w-full max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-2 mb-6">
          <div class="bg-blue-600 text-white p-3 rounded-lg"><BookOpen class="w-8 h-8" /></div>
          <span class="text-2xl font-semibold text-gray-900">Bilim Merkezi</span>
        </RouterLink>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Hasaba alyň</h1>
        <p class="text-gray-600">Okuw platformasyna goşulyň</p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ady</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input v-model="form.firstName" type="text" required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adyňyz" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Familiýasy</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input v-model="form.lastName" type="text" required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Familiýaňyz" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">E-poçta</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.email" type="email" required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="mysal@email.com" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
            <div class="relative">
              <Phone class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.phone" type="tel" required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+993 XX XXX-XXX" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Doglan senesi</label>
            <div class="relative">
              <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.dateOfBirth" type="date" required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Salgysy</label>
            <div class="relative">
              <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.address" type="text" required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Salgyňyz" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Bilim derejesi</label>
            <div class="relative">
              <GraduationCap class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select v-model="form.education" required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option value="">Saýlaň</option>
                <option value="secondary">Orta mekdep</option>
                <option value="vocational">Hünär mekdebi</option>
                <option value="bachelor">Bakalawr</option>
                <option value="master">Magistr</option>
                <option value="phd">Ylymlar doktory</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Parol</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input v-model="form.password" type="password" required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Paroly tassyklaň</label>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input v-model="form.confirmPassword" type="password" required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••" />
              </div>
            </div>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            <CheckCircle class="w-5 h-5" />
            {{ loading ? 'Garaşyň...' : 'Hasaba alyň' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Eýýäm hasabyňyz barmy?
            <RouterLink to="/login" class="text-blue-600 font-medium hover:text-blue-700"> Giriş</RouterLink>
          </p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <RouterLink to="/" class="text-gray-600 hover:text-gray-900">← Baş sahypa</RouterLink>
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
