<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-[#0056d2] via-blue-700 to-indigo-900 text-white overflow-hidden">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
        <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-5 border border-white/20">
          <span class="text-sm font-medium">Oguzhan Uniwersiteti</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          Goşmaça we Üznüksiz<br />
          <span class="text-blue-100">Bilim Merkezi</span>
        </h1>
        <p class="text-blue-100 text-base md:text-xl max-w-2xl mx-auto">
          Täze pikir, Täze çözgüt, Täze durmuş!
        </p>
      </div>
    </section>

    <!-- Biz barada -->
    <section class="py-12 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">Biz barada</h2>
            <div class="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                "Goşmaça we üznüksiz bilim" okuw merkezinde dürli ugurlar boýunça okuw bilim işleri alnyp barylýar.
                Toplumyň çäklerinde öz bilim işlerini kämilleşdirmek isleýän her bir okuwçy, talyp we işgär üçin
                "Goşmaça we üznüksiz bilim" okuw merkezi öz gapylaryny giňden açýar.
              </p>
              <p>
                Häzirki zaman bilim talaplary esasynda döredilen bu merkez, dünýäniň öňdebaryjy okuw usullaryny
                ulanmak arkaly her bir okuwçynyň mümkinçiliklerini açmaga we ösdürmäge gönükdirilendir.
              </p>
              <p>
                Her ýyl müňlerçe okuwçy we talyp bu merkezde bilimini kämilleşdirip, hünär derejesini ýokarlandyrýar.
                Tejribeli we bilimli mugallymlar topary bilen bilelikde, okuwçylarymyz üstünlige ýetmek üçin ähli
                zerur goldawy alýarlar.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&fit=crop"
              alt="Okuw merkezi" class="rounded-2xl object-cover w-full h-48 md:h-56 shadow-lg" />
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&fit=crop"
              alt="Okuwçylar" class="rounded-2xl object-cover w-full h-48 md:h-56 shadow-lg mt-6" />
          </div>
        </div>
      </div>
    </section>

    <!-- Ugurlarymyz -->
    <section class="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 md:mb-14">
          <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Ugurlarymyz</h2>
          <p class="text-gray-600 max-w-xl mx-auto">Dürli ugurlarda hünär kurslarymyz bilen bilim alyň</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          <RouterLink
            v-for="ugur in ugurlar" :key="ugur.name"
            :to="{ path: '/courses', query: { search: ugur.search } }"
            class="bg-white border border-gray-100 rounded-2xl px-4 py-3 text-center text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 hover:text-blue-700 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>{{ ugur.icon }}</span>
            <span>{{ ugur.name }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Aýratynlyklarymyz -->
    <section class="py-12 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div class="order-2 lg:order-1">
            <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&fit=crop"
              alt="Mugallymlar" class="rounded-2xl object-cover w-full h-64 md:h-80 shadow-xl" />
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">Aýratynlyklarymyz</h2>
            <ul class="space-y-3">
              <li v-for="item in ayratynlyklar" :key="item"
                class="flex items-start gap-3">
                <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-gray-700 text-sm md:text-base">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const ugurlar = [
  { name: 'Mugallymçylyk işi we pedagogik tehnologiýa', search: 'Mugallymçylyk', icon: '👨‍🏫' },
  { name: 'Iňlis dili', search: 'Iňlis dili', icon: '🇬🇧' },
  { name: 'Ýapon dili', search: 'Ýapon dili', icon: '🇯🇵' },
  { name: 'Rus dili', search: 'Rus dili', icon: '🇷🇺' },
  { name: 'Koreý dili', search: 'Koreý dili', icon: '🇰🇷' },
  { name: 'Matematika', search: 'Matematika', icon: '🔢' },
  { name: 'Fizika', search: 'Fizika', icon: '⚛️' },
  { name: 'Biologiýa', search: 'Biologiýa', icon: '🔬' },
  { name: 'Himiýa', search: 'Himiýa', icon: '🧪' },
  { name: 'Kompýuter sowatlylygy', search: 'Kompýuter sowatlylygy', icon: '🖥️' },
  { name: 'Sanly ykdysadyýet', search: 'Sanly ykdysadyýet', icon: '💹' },
  { name: 'Programirlemek', search: 'Programirlemek', icon: '💻' },
  { name: 'Kiberhowpsuzlyk', search: 'Kiberhowpsuzlyk', icon: '🔐' },
  { name: 'Robot tehnikasy', search: 'Robot tehnikasy', icon: '🤖' },
  { name: 'Kibersport', search: 'Kibersport', icon: '🎮' },
  { name: 'Kompýuterde inženerçilik grafikasy we animasiýasy', search: 'grafikasy', icon: '🎨' },
]

const ayratynlyklar = [
  'Häzirki zaman okuw usullary',
  'Didaktiki ýörelgeler',
  'Sanly tehnologiýalaryň ulanylmagy',
  'Okuw prosesiniň netijeliligini ýokarlandyrýan çäreler',
  'Okuw meýilnamasyna taýýarlamak',
  'Dürleýji bilen gatnaşygy gurmak we netije bilen bermek',
  'Tejribeli mugallymlardan ýöriteleşdirilen bilim almak',
]
</script>
