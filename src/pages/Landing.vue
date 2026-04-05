<template>
  <div class="min-h-screen bg-white">
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <BookOpen class="w-5 h-5" />
            <span class="text-sm font-medium">Türkmenistanyň iň öňdebaryjy onlaýn okuw platformasy</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Geljekiňizi häzir<br />
            <span class="text-blue-200">Döretmäge Başlaň</span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            22 sany hünär kurslary arkaly täze başarnyklary öwreniň.<br />
            Hünärmenlerden onlaýn okuw we resmi sertifikat alyň.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/register"
              class="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
              Hasaba alyň <ArrowRight class="w-5 h-5" />
            </RouterLink>
            <RouterLink to="/login"
              class="inline-flex items-center justify-center gap-2 bg-blue-500/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500/40 transition-all">
              Giriş
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <BookOpen class="w-8 h-8 text-blue-600" />
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">22</p>
            <p class="text-gray-600">Hünär kurslary</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Users class="w-8 h-8 text-green-600" />
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">5000+</p>
            <p class="text-gray-600">Aktiwçi okuwçylar</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Award class="w-8 h-8 text-purple-600" />
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">95%</p>
            <p class="text-gray-600">Üstünlik derejesi</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Clock class="w-8 h-8 text-orange-600" />
            </div>
            <p class="text-4xl font-bold text-gray-900 mb-2">24/7</p>
            <p class="text-gray-600">Elýeterli okuw</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Näme üçin bizi saýlamaly?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Häzirki zaman okuw usullary we tejribeli mugallymlar bilen bilim alyň</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="f in features" :key="f.title"
            class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div :class="`w-12 h-12 ${f.bg} rounded-lg flex items-center justify-center mb-6`">
              <CheckCircle :class="`w-6 h-6 ${f.color}`" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ f.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kurs kategoriýalary</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Dürli ugurlarda hünär kurslaryndan saýlaň</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="cat in catList" :key="cat.name"
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
            <div class="text-4xl mb-4">{{ cat.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ cat.name }}</h3>
            <p class="text-gray-600">{{ cat.count }} kurs</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Bilim syýahatyňyzy häzir başlaň!</h2>
        <p class="text-xl text-blue-100 mb-8">Mugt hasaba alnyň we 22 sany hünär kursyna giriň</p>
        <RouterLink to="/register"
          class="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg">
          Mugt hasaba alyň <ArrowRight class="w-5 h-5" />
        </RouterLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="flex items-center justify-center gap-2 mb-4">
          <div class="bg-blue-600 text-white p-2 rounded-lg">
            <BookOpen class="w-6 h-6" />
          </div>
          <span class="text-xl font-semibold text-white">Bilim Merkezi</span>
        </div>
        <p class="text-gray-400">© 2026 Bilim Merkezi. Ähli hukuklar goragly.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight } from 'lucide-vue-next'

const features = [
  { title: 'Hünärmen mugallymlar', desc: 'Tejribeli we bilimli mugallymlardan sapak alyň. Her mugallym öz ugrunda hünärmendir.', bg: 'bg-blue-100', color: 'text-blue-600' },
  { title: 'Amaly tejribe', desc: 'Nazaryýet bilen bir hatarda amaly meşgullenmeler we taslamalar arkaly öwreniň.', bg: 'bg-green-100', color: 'text-green-600' },
  { title: 'Resmi sertifikat', desc: 'Kursy üstünlikli tamamlanyňyzdan soň resmi ykrar edilen sertifikat alyň.', bg: 'bg-purple-100', color: 'text-purple-600' },
]

const catList = [
  { name: 'Programirlemek', count: 11, icon: '💻' },
  { name: 'Daşary ýurt dilleri', count: 5, icon: '🗣️' },
  { name: 'Ylymlar', count: 3, icon: '🔬' },
  { name: 'Matematika', count: 1, icon: '🔢' },
  { name: 'Mugallymçylyk', count: 1, icon: '👨‍🏫' },
  { name: 'Kompýuter endikleri', count: 1, icon: '🖥️' },
]
</script>
