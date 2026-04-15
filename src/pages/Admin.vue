<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div class="mb-6 md:mb-8">
        <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900">Admin Panel</h1>
        <p class="text-sm text-gray-500 mt-1">Ähli maglumatlar we statistika</p>
      </div>

      <!-- Statistika -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div v-for="s in statCards" :key="s.label"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 text-center">
          <p class="text-2xl md:text-3xl font-extrabold" :class="s.color">{{ s.value }}</p>
          <p class="text-xs md:text-sm text-gray-500 mt-1 font-medium">{{ s.label }}</p>
        </div>
      </div>

      <!-- Tablar -->
      <div class="flex gap-2 mb-6 border-b border-gray-200">
        <button v-for="t in tabs" :key="t.key" type="button"
          @click="activeTab = t.key"
          :class="['px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors',
            activeTab === t.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">
          {{ t.label }}
        </button>
      </div>

      <!-- Ulanyjylar -->
      <div v-if="activeTab === 'users'">
        <div class="flex items-center gap-3 mb-4">
          <input v-model="userSearch" type="text" placeholder="Gözle (at, e-poçta)..."
            class="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
          <span class="text-sm text-gray-500 whitespace-nowrap">{{ filteredUsers.length }} ulanyjy</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Ady</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">E-poçta</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Telefon</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Ýazylan</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Rol</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Amal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="6" class="py-8 text-center text-gray-400">Ulanyjy tapylmady</td>
                </tr>
                <tr v-for="u in filteredUsers" :key="u.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 font-medium text-gray-900">{{ u.firstName }} {{ u.lastName }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ u.email }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ u.phone || '—' }}</td>
                  <td class="px-4 py-3">
                    <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-lg">
                      {{ u.enrolledCourses?.length || 0 }} kurs
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span :class="u.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'"
                      class="text-xs font-semibold px-2 py-0.5 rounded-lg">
                      {{ u.isAdmin ? 'Admin' : 'Ulanyjy' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 flex items-center gap-2">
                    <button type="button" @click="toggleAdmin(u.id)"
                      class="text-xs text-purple-600 hover:text-purple-700 font-semibold px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors">
                      {{ u.isAdmin ? 'Admin aýyr' : 'Admin et' }}
                    </button>
                    <button type="button" @click="deleteUser(u.id)"
                      class="text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
                      Öçür
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Ýazylmalar -->
      <div v-if="activeTab === 'enrollments'">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Ulanyjy</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Kurs</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Töleg</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Usul</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600">Senesi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-if="enrollments.length === 0">
                  <td colspan="5" class="py-8 text-center text-gray-400">Ýazylma tapylmady</td>
                </tr>
                <tr v-for="e in enrollments" :key="e.userId + e.courseId" class="hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <p class="font-medium text-gray-900">{{ getUserName(e.userId) }}</p>
                    <p class="text-xs text-gray-400">{{ getUserEmail(e.userId) }}</p>
                  </td>
                  <td class="px-4 py-3 text-gray-600 text-xs max-w-[180px] truncate">{{ getCourseTitle(e.courseId) }}</td>
                  <td class="px-4 py-3 font-semibold text-blue-700">{{ e.price }} TMT</td>
                  <td class="px-4 py-3 text-gray-500 text-xs">{{ e.paymentMethod }}</td>
                  <td class="px-4 py-3 text-gray-500 text-xs">{{ formatDate(e.enrolledDate) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import { courses } from '../data/courses'

const activeTab = ref('users')
const tabs = [
  { key: 'users', label: 'Ulanyjylar' },
  { key: 'enrollments', label: 'Ýazylmalar' },
]

const allUsers = ref([])
const enrollments = ref([])
const userSearch = ref('')

function loadData() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  allUsers.value = users.map(({ password, ...u }) => u)
  enrollments.value = JSON.parse(localStorage.getItem('enrollments') || '[]')
}

const filteredUsers = computed(() => {
  if (!userSearch.value) return allUsers.value
  const q = userSearch.value.toLowerCase()
  return allUsers.value.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
    u.email?.toLowerCase().includes(q)
  )
})

const statCards = computed(() => [
  { label: 'Ulanyjylar', value: allUsers.value.length, color: 'text-blue-700' },
  { label: 'Ýazylmalar', value: enrollments.value.length, color: 'text-green-700' },
  { label: 'Kurslar', value: courses.length, color: 'text-purple-700' },
  { label: 'Jemi girdeji', value: enrollments.value.reduce((s, e) => s + (e.price || 0), 0) + ' TMT', color: 'text-orange-700' },
])

function deleteUser(id) {
  if (!confirm('Ulanyjyny öçürmek isleýärsiňizmi?')) return
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  localStorage.setItem('users', JSON.stringify(users.filter(u => u.id !== id)))
  loadData()
}

function toggleAdmin(id) {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  localStorage.setItem('users', JSON.stringify(
    users.map(u => u.id === id ? { ...u, isAdmin: !u.isAdmin } : u)
  ))
  loadData()
}

function getUserName(userId) {
  const u = allUsers.value.find(u => u.id === userId)
  return u ? `${u.firstName} ${u.lastName}` : userId
}

function getUserEmail(userId) {
  return allUsers.value.find(u => u.id === userId)?.email || ''
}

function getCourseTitle(id) {
  return courses.find(c => c.id === id)?.titleTm || id
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('tk-TM')
}

onMounted(loadData)
</script>
