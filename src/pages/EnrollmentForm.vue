<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <AppHeader />

    <div v-if="submitted" class="flex items-center justify-center py-20 px-4 bm-animate-fade-in">
      <div class="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-[var(--bm-shadow-card-hover)] p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle class="w-8 h-8 text-green-600" />
        </div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Üstünlik!</h2>
        <p class="text-sm md:text-base text-gray-600 mb-4">Siz "{{ course?.titleTm }}" kursa üstünlikli ýazyldyňyz.</p>
        <p class="text-sm text-gray-500">Profiliňize geçirilýär...</p>
      </div>
    </div>

    <div v-else-if="course" class="py-6 md:py-12 px-4">
      <div class="max-w-3xl mx-auto">
        <div class="mb-5 md:mb-8">
          <RouterLink :to="`/course/${course.id}`" class="text-blue-600 hover:text-blue-700 mb-3 inline-block text-sm md:text-base">← Kursa dolan</RouterLink>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Kursa ýazylmak</h1>
          <p class="text-sm md:text-base text-gray-600">{{ course.titleTm }}</p>
        </div>

        <!-- Mobile summary -->
        <div class="lg:hidden mb-5">
          <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div class="flex justify-between items-center">
              <span class="text-sm font-semibold text-gray-700">Jemi töleg:</span>
              <span class="text-xl font-bold text-blue-600">{{ currentPrice }} TMT</span>
            </div>
            <p v-if="form.discountType !== '0'" class="text-xs text-green-600 mt-1 text-right">{{ form.discountType }}% arzanladyş goşuldy</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
          <div class="lg:col-span-2">
            <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-sm p-5 md:p-8 space-y-6">

              <!-- 0. Dereje saýlawy (diňe köp derejeli kurslarda) -->
              <div v-if="hasLevels" class="bg-blue-50 border border-blue-100 rounded-xl p-4 md:p-5">
                <h2 class="text-base md:text-lg font-bold text-gray-900 mb-1">📊 Haýsy derejeden başlaýarsyňyz?</h2>
                <p class="text-xs text-gray-500 mb-3">Bu kurs birnäçe derejäni öz içine alýar. Başlajak derejeňizi saýlaň.</p>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button v-for="lvl in courseLevels" :key="lvl.value" type="button"
                    @click="form.startLevel = lvl.value"
                    :class="['flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 text-center',
                      form.startLevel === lvl.value
                        ? 'border-blue-500 bg-blue-100 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-blue-300']">
                    <span class="text-xl">{{ lvl.icon }}</span>
                    <span class="text-xs font-bold" :class="form.startLevel === lvl.value ? 'text-blue-700' : 'text-gray-700'">{{ lvl.label }}</span>
                    <span class="text-xs" :class="form.startLevel === lvl.value ? 'text-blue-500' : 'text-gray-400'">{{ lvl.sub }}</span>
                  </button>
                </div>
                <p class="text-xs text-blue-600 mt-2">ℹ️ Mugallym bilen maslahatlaşyp, dogry derejäni kesgitläp bilersiňiz.</p>
              </div>

              <!-- 1. Şahsy maglumatlar -->
              <div>
                <h2 class="text-base md:text-lg font-bold text-gray-900 mb-1">Şahsy maglumatlar</h2>
                <p class="text-xs text-gray-500 mb-3">Maglumatlary üýtgedip bilersiňiz.</p>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Ady</label>
                    <input type="text" v-model="personalInfo.firstName" required class="input-field" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Familiýasy</label>
                    <input type="text" v-model="personalInfo.lastName" required class="input-field" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">E-poçta</label>
                    <input type="email" v-model="personalInfo.email" required class="input-field" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Telefon</label>
                    <input type="tel" v-model="personalInfo.phone" required class="input-field" />
                  </div>
                </div>
              </div>

              <!-- 2. Iş ýagdaýy -->
              <div class="border-t pt-5">
                <h2 class="text-base md:text-lg font-bold text-gray-900 mb-3">Iş ýagdaýy</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button v-for="s in employmentOptions" :key="s.value" type="button"
                    @click="form.employmentStatus = s.value"
                    :class="['flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all duration-200',
                      form.employmentStatus === s.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300']">
                    <span class="text-lg">{{ s.icon }}</span>
                    <span class="text-xs font-semibold" :class="form.employmentStatus === s.value ? 'text-blue-700' : 'text-gray-700'">{{ s.label }}</span>
                  </button>
                </div>
              </div>

              <!-- 3. Sertifikat görnüşi -->
              <div class="border-t pt-5">
                <h2 class="text-base md:text-lg font-bold text-gray-900 mb-1">Sertifikat görnüşi</h2>
                <p class="text-xs text-gray-500 mb-3">Sertifikatsyz kursyň bahasy esasy bahanyň ýarysy.</p>
                <div class="grid grid-cols-2 gap-3">
                  <button type="button" @click="form.withCertificate = true"
                    :class="['flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all',
                      form.withCertificate ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300']">
                    <span class="text-2xl">🏆</span>
                    <span class="font-bold text-sm" :class="form.withCertificate ? 'text-blue-700' : 'text-gray-800'">Sertifikatly</span>
                    <span class="text-xs text-gray-500">Resmi sertifikat berilýär</span>
                    <span class="font-bold" :class="form.withCertificate ? 'text-blue-700' : 'text-gray-700'">{{ course.basePrice }} TMT</span>
                  </button>
                  <button type="button" @click="form.withCertificate = false"
                    :class="['flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all',
                      !form.withCertificate ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300']">
                    <span class="text-2xl">📚</span>
                    <span class="font-bold text-sm" :class="!form.withCertificate ? 'text-green-700' : 'text-gray-800'">Sertifikatsyz</span>
                    <span class="text-xs text-gray-500">Diňe bilim almak üçin</span>
                    <span class="font-bold" :class="!form.withCertificate ? 'text-green-700' : 'text-gray-700'">{{ Math.round(course.basePrice / 2) }} TMT</span>
                  </button>
                </div>
              </div>

              <!-- 4. Arzanladyş -->
              <div class="border-t pt-5">
                <h2 class="text-base md:text-lg font-bold text-gray-900 mb-1">Arzanladyş saýlaň</h2>
                <p class="text-xs text-gray-500 mb-3">Arzanladyş almak üçin degişli şertleri doldurmaly.</p>
                <div class="space-y-3">

                  <!-- 0% -->
                  <label class="flex items-center justify-between p-3 md:p-4 border-2 rounded-xl cursor-pointer transition-colors"
                    :class="form.discountType === '0' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'">
                    <div class="flex items-center gap-3">
                      <input type="radio" v-model="form.discountType" value="0" class="w-4 h-4 text-blue-600" />
                      <div>
                        <p class="font-semibold text-sm text-gray-900">Arzanladyşsyz</p>
                        <p class="text-xs text-gray-500">Adaty baha</p>
                      </div>
                    </div>
                    <span class="font-bold text-gray-900">{{ basePriceForType }} TMT</span>
                  </label>

                  <!-- 15% - 2 dogan -->
                  <div class="border-2 rounded-xl transition-colors" :class="form.discountType === '15' ? 'border-orange-400' : 'border-gray-200'">
                    <label class="flex items-center justify-between p-3 md:p-4 cursor-pointer"
                      @click="form.discountType = form.discountType === '15' ? '0' : '15'">
                      <div class="flex items-center gap-3">
                        <input type="radio" v-model="form.discountType" value="15" class="w-4 h-4 text-orange-500" />
                        <div>
                          <p class="font-semibold text-sm text-gray-900">👨‍👩‍👦 15% — Iki dogan bile ýazylsa</p>
                          <p class="text-xs text-gray-500">Doganyňyzyň ady, familiýasy we telefony gerek</p>
                        </div>
                      </div>
                      <span class="font-bold text-orange-600">{{ Math.round(basePriceForType * 0.85) }} TMT</span>
                    </label>
                    <!-- Dogan maglumatlary -->
                    <div v-if="form.discountType === '15'" class="px-4 pb-4 border-t border-orange-100 pt-3 space-y-2">
                      <p class="text-xs font-semibold text-orange-700 mb-2">Doganyňyzyň maglumatlary:</p>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-xs text-gray-600 mb-1">Ady</label>
                          <input type="text" v-model="siblingInfo.firstName" required class="input-field text-sm" placeholder="Ady" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-600 mb-1">Familiýasy</label>
                          <input type="text" v-model="siblingInfo.lastName" required class="input-field text-sm" placeholder="Familiýasy" />
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs text-gray-600 mb-1">Telefon belgisi</label>
                        <input type="tel" v-model="siblingInfo.phone" required class="input-field text-sm" placeholder="+993 XX XXXXXX" />
                      </div>
                      <p class="text-xs text-orange-600 mt-1">⚠️ Doganyňyz hem şu kursa ýazylmaly. Iki dogan bile ýazylmasa arzanladyş berilmez.</p>
                    </div>
                  </div>

                  <!-- 30% - Uniwersitet talyby/mugallymy -->
                  <div class="border-2 rounded-xl transition-colors" :class="form.discountType === '30' ? 'border-purple-400' : 'border-gray-200'">
                    <label class="flex items-center justify-between p-3 md:p-4 cursor-pointer"
                      @click="form.discountType = form.discountType === '30' ? '0' : '30'">
                      <div class="flex items-center gap-3">
                        <input type="radio" v-model="form.discountType" value="30" class="w-4 h-4 text-purple-600" />
                        <div>
                          <p class="font-semibold text-sm text-gray-900">🎓 30% — Uniwersitetiň talyby / mugallymy</p>
                          <p class="text-xs text-gray-500">Diňe uniwersitetiň talyplary we mugallymlary üçin</p>
                        </div>
                      </div>
                      <span class="font-bold text-purple-600">{{ Math.round(basePriceForType * 0.70) }} TMT</span>
                    </label>
                    <!-- Uniwersitet maglumatlary -->
                    <div v-if="form.discountType === '30'" class="px-4 pb-4 border-t border-purple-100 pt-3 space-y-3">
                      <p class="text-xs font-semibold text-purple-700 mb-2">Uniwersitet maglumatlary:</p>
                      <div>
                        <label class="block text-xs text-gray-600 mb-1">Rol</label>
                        <div class="flex gap-3">
                          <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" v-model="uniInfo.role" value="student" class="w-4 h-4 text-purple-600" />
                            <span class="text-sm font-medium">Talyp</span>
                          </label>
                          <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" v-model="uniInfo.role" value="teacher" class="w-4 h-4 text-purple-600" />
                            <span class="text-sm font-medium">Mugallym</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs text-gray-600 mb-1">Uniwersitetiň ady</label>
                        <input type="text" v-model="uniInfo.universityName" required class="input-field text-sm" placeholder="Mysal: TOHU, TDU, TDIM..." />
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label class="block text-xs text-gray-600 mb-1">Fakultet</label>
                          <input type="text" v-model="uniInfo.faculty" required class="input-field text-sm" placeholder="Fakultetiňiz" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-600 mb-1">{{ uniInfo.role === 'teacher' ? 'Wezipesi' : 'Kursy' }}</label>
                          <input type="text" v-model="uniInfo.courseYear" required class="input-field text-sm"
                            :placeholder="uniInfo.role === 'teacher' ? 'Mugallym / Dosent...' : '1-nji kurs, 2-nji kurs...'" />
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs text-gray-600 mb-1">Talyp / Işgär ID belgisi</label>
                        <input type="text" v-model="uniInfo.studentId" required class="input-field text-sm" placeholder="ID belgiňiz" />
                      </div>
                      <p class="text-xs text-purple-600 mt-1">⚠️ ID belgiňiz barlanar. Nädogry maglumat berilse arzanladyş ýatyrylýar.</p>
                    </div>
                  </div>

                </div>
              </div>

              <!-- 5. Maksat -->
              <div class="border-t pt-5">
                <label class="block text-sm font-semibold text-gray-900 mb-2">Bu kursy näme üçin almak isleýärsiňiz?</label>
                <textarea v-model="form.learningGoal" required rows="3"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  placeholder="Maksadyňyzy gysgaça düşündiriň..." />
              </div>

              <!-- 6. Töleg usuly -->
              <div class="border-t pt-5">
                <h2 class="text-base md:text-lg font-bold text-gray-900 mb-3">Töleg usuly</h2>
                <div class="space-y-2">
                  <label v-for="p in payments" :key="p.value"
                    class="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors"
                    :class="form.paymentMethod === p.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'">
                    <input type="radio" v-model="form.paymentMethod" :value="p.value" class="w-4 h-4 text-blue-600" />
                    <component :is="p.icon" class="w-5 h-5 text-gray-600" />
                    <span class="font-medium text-sm text-gray-900">{{ p.label }}</span>
                  </label>
                </div>
              </div>

              <button type="submit"
                class="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <CheckCircle class="w-5 h-5" /> Ýazylmany tamamla
              </button>
            </form>
          </div>

          <!-- Desktop summary -->
          <div class="hidden lg:block lg:col-span-1">
            <div class="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-gray-100">
              <h3 class="font-bold text-gray-900 mb-4">Jemi</h3>
              <div class="space-y-2.5 mb-5 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Kurs:</span>
                  <span class="font-medium text-right ml-2 text-xs max-w-[140px]">{{ course.titleTm }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Dowamlylygy:</span>
                  <span class="font-medium">{{ course.weeks }} hepde</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Sertifikat:</span>
                  <span class="font-medium">{{ form.withCertificate ? '✅ Hawa' : '❌ Ýok' }}</span>
                </div>
                <div v-if="form.discountType !== '0'" class="flex justify-between text-green-600">
                  <span>Arzanladyş:</span>
                  <span class="font-bold">-{{ form.discountType }}%</span>
                </div>
              </div>
              <div class="border-t pt-4">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-gray-900">Jemi:</span>
                  <span class="text-2xl font-extrabold text-blue-600">{{ currentPrice }} TMT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CheckCircle, CreditCard, Banknote, Building2 } from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { courses } from '../data/courses'
import { useAuth } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const course = computed(() => courses.find(c => c.id === route.params.id))
const submitted = ref(false)

const form = ref({
  employmentStatus: '',
  learningGoal: '',
  discountType: '0',
  paymentMethod: 'card',
  withCertificate: true,
  startLevel: '',
})

// Kursyň adynda "I-II-III-IV" ýa "dereje" bar bolsa köp derejeli
const hasLevels = computed(() => {
  const title = course.value?.titleTm || ''
  return /I-II|dereje|Level/i.test(title)
})

const courseLevels = [
  { value: 'I', label: 'I dereje', sub: 'Başlangyç', icon: '🌱' },
  { value: 'II', label: 'II dereje', sub: 'Orta', icon: '📗' },
  { value: 'III', label: 'III dereje', sub: 'Ýokary', icon: '📘' },
  { value: 'IV', label: 'IV dereje', sub: 'Ösen', icon: '🏆' },
]

const personalInfo = ref({
  firstName: auth.user.value?.firstName || '',
  lastName: auth.user.value?.lastName || '',
  email: auth.user.value?.email || '',
  phone: auth.user.value?.phone || '',
})

// 15% - dogan maglumatlary
const siblingInfo = ref({ firstName: '', lastName: '', phone: '' })

// 30% - uniwersitet maglumatlary
const uniInfo = ref({ role: 'student', universityName: '', faculty: '', courseYear: '', studentId: '' })

const employmentOptions = [
  { value: 'student_school', label: 'Okuwçy', icon: '📚' },
  { value: 'student_uni', label: 'Talyp', icon: '🎓' },
  { value: 'teacher', label: 'Mugallym', icon: '👨‍🏫' },
  { value: 'employed', label: 'Işgär', icon: '💼' },
  { value: 'temporary', label: 'Wagtlaýyn', icon: '⏳' },
  { value: 'self_employed', label: 'Öz işi', icon: '🏢' },
]

const payments = [
  { value: 'card', label: 'Kart bilen', icon: CreditCard },
  { value: 'cash', label: 'Nagt', icon: Banknote },
  { value: 'bank', label: 'Bank geçirimi', icon: Building2 },
]

const basePriceForType = computed(() => {
  if (!course.value) return 0
  return form.value.withCertificate ? course.value.basePrice : Math.round(course.value.basePrice / 2)
})

const currentPrice = computed(() => {
  const base = basePriceForType.value
  if (form.value.discountType === '15') return Math.round(base * 0.85)
  if (form.value.discountType === '30') return Math.round(base * 0.70)
  return base
})

async function handleSubmit() {
  auth.updateUser(personalInfo.value)
  const courseId = course.value.id
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
  enrollments.push({
    userId: auth.user.value?.id,
    courseId,
    ...form.value,
    siblingInfo: form.value.discountType === '15' ? siblingInfo.value : null,
    uniInfo: form.value.discountType === '30' ? uniInfo.value : null,
    enrolledDate: new Date().toISOString(),
    price: currentPrice.value,
  })
  localStorage.setItem('enrollments', JSON.stringify(enrollments))
  auth.enrollCourse(courseId)
  submitted.value = true
  setTimeout(() => router.push('/profile'), 2000)
}
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  outline: none;
}
.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.3);
}
</style>
