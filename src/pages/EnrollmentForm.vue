<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <div v-if="submitted" class="flex items-center justify-center py-32 px-4">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle class="w-8 h-8 text-green-600" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Üstünlik!</h2>
        <p class="text-gray-600 mb-4">Siz "{{ course?.titleTm }}" kursyna üstünlikli ýazylдыňyz.</p>
        <p class="text-sm text-gray-500">Kursa geçirilýär...</p>
      </div>
    </div>

    <div v-else-if="course" class="py-12 px-4">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8">
          <RouterLink :to="`/course/${course.id}`" class="text-blue-600 hover:text-blue-700 mb-4 inline-block">← Kursa dolan</RouterLink>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Kursa ýazylmak</h1>
          <p class="text-gray-600">{{ course.titleTm }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-sm p-8 space-y-6">
              <div>
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Şahsy maglumatlar</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="f in userFields" :key="f.label">
                    <label class="block text-sm font-medium text-gray-700 mb-2">{{ f.label }}</label>
                    <input :type="f.type" :value="f.value" disabled
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                </div>
              </div>

              <div class="border-t pt-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Goşmaça maglumatlar</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Iş ýagdaýy</label>
                    <select v-model="form.employmentStatus" required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Saýlaň</option>
                      <option value="student">Okuwçy</option>
                      <option value="employed">Işleýän</option>
                      <option value="unemployed">Işsiz</option>
                      <option value="self-employed">Öz işi</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bu kursy näme üçin almak isleýärsiňiz?</label>
                    <textarea v-model="form.learningGoal" required rows="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Maksadyňyzy düşündiriň..." />
                  </div>
                </div>
              </div>

              <div class="border-t pt-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Arzanladyş saýlaň</h2>
                <div class="space-y-3">
                  <label v-for="d in discounts" :key="d.value"
                    class="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    :class="form.discountType === d.value ? 'border-blue-500' : 'border-gray-200'">
                    <div class="flex items-center gap-3">
                      <input type="radio" v-model="form.discountType" :value="d.value" class="w-4 h-4 text-blue-600" />
                      <div>
                        <span class="font-medium text-gray-900">{{ d.label }}</span>
                        <p v-if="d.sub" class="text-sm text-gray-600">{{ d.sub }}</p>
                      </div>
                    </div>
                    <span :class="['text-lg font-semibold', d.value === '30' ? 'text-green-600' : 'text-gray-900']">
                      {{ d.value === '0' ? course.basePrice : d.value === '15' ? course.price15 : course.price30 }} TMT
                    </span>
                  </label>
                </div>
              </div>

              <div class="border-t pt-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Töleg usuly</h2>
                <div class="space-y-3">
                  <label v-for="p in payments" :key="p.value"
                    class="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    :class="form.paymentMethod === p.value ? 'border-blue-500' : 'border-gray-200'">
                    <input type="radio" v-model="form.paymentMethod" :value="p.value" class="w-4 h-4 text-blue-600" />
                    <component :is="p.icon" class="w-5 h-5 text-gray-600" />
                    <span class="font-medium text-gray-900">{{ p.label }}</span>
                  </label>
                </div>
              </div>

              <button type="submit"
                class="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <CheckCircle class="w-5 h-5" /> Ýazylmany tamamla
              </button>
            </form>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 class="font-semibold text-gray-900 mb-4">Jemi</h3>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Kurs:</span>
                  <span class="font-medium text-right text-sm">{{ course.titleTm }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Dowamlylygy:</span>
                  <span class="font-medium">{{ course.weeks }} hepde</span>
                </div>
                <div v-if="form.discountType !== '0'" class="flex justify-between text-green-600">
                  <span>Arzanladyş:</span>
                  <span class="font-medium">{{ form.discountType }}%</span>
                </div>
              </div>
              <div class="border-t pt-4">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-semibold text-gray-900">Jemi töleg:</span>
                  <span class="text-2xl font-bold text-blue-600">{{ currentPrice }} TMT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CheckCircle, CreditCard, Banknote, Building2 } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const course = computed(() => courses.find(c => c.id === route.params.id))
const submitted = ref(false)

const form = ref({ employmentStatus: '', learningGoal: '', discountType: '0', paymentMethod: 'card' })

const userFields = computed(() => [
  { label: 'Ady', type: 'text', value: auth.user?.firstName },
  { label: 'Familiýasy', type: 'text', value: auth.user?.lastName },
  { label: 'E-poçta', type: 'email', value: auth.user?.email },
  { label: 'Telefon', type: 'tel', value: auth.user?.phone },
])

const discounts = [
  { value: '0', label: 'Arzanladyşsyz', sub: '' },
  { value: '15', label: '15% arzanladyş', sub: 'İki aýda tölemek' },
  { value: '30', label: '30% arzanladyş', sub: 'Doly tölemek' },
]

const payments = [
  { value: 'card', label: 'Kart bilen', icon: CreditCard },
  { value: 'cash', label: 'Nagt', icon: Banknote },
  { value: 'bank', label: 'Bank geçirimi', icon: Building2 },
]

const currentPrice = computed(() => {
  if (!course.value) return 0
  if (form.value.discountType === '15') return course.value.price15
  if (form.value.discountType === '30') return course.value.price30
  return course.value.basePrice
})

function handleSubmit() {
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
  enrollments.push({
    userId: auth.user?.id, courseId: course.value.id,
    ...form.value, enrolledDate: new Date().toISOString(), price: currentPrice.value,
  })
  localStorage.setItem('enrollments', JSON.stringify(enrollments))
  auth.enrollCourse(course.value.id)
  submitted.value = true
  setTimeout(() => router.push(`/course/${course.value.id}/learn`), 2000)
}
</script>
