// YouTube embed URL mysaly (mugt wideo üçin)
const FREE_VIDEO = 'https://www.youtube.com/embed/dQw4w9WgXcQ'

// Synag soraglary
const midtermQuestions = [
  {
    id: 'mq1',
    question: 'Aşakdakylaryň haýsy dogry düşünjäni beýan edýär?',
    options: ['A) Birinji jogap', 'B) Ikinji jogap', 'C) Üçünji jogap', 'D) Dördünji jogap'],
    correct: 1,
  },
  {
    id: 'mq2',
    question: 'Kursda öwrenilen esasy düşünje haýsy?',
    options: ['A) Nazaryýet', 'B) Amaly', 'C) Ikisi hem', 'D) Hiç biri'],
    correct: 2,
  },
  {
    id: 'mq3',
    question: 'Aşakdakylaryň haýsy dogry?',
    options: ['A) Birinji', 'B) Ikinji', 'C) Üçünji', 'D) Dördünji'],
    correct: 0,
  },
  {
    id: 'mq4',
    question: 'Esasy prinsip näme?',
    options: ['A) Çalt öwrenmek', 'B) Yzygiderli öwrenmek', 'C) Diňe okamak', 'D) Diňe diňlemek'],
    correct: 1,
  },
  {
    id: 'mq5',
    question: 'Haýsy usul has netijeli?',
    options: ['A) Amaly tejribe', 'B) Diňe teoriýa', 'C) Ýatlamak', 'D) Göçürmek'],
    correct: 0,
  },
]

const finalQuestions = [
  {
    id: 'fq1',
    question: 'Kursyň esasy maksady näme?',
    options: ['A) Sertifikat almak', 'B) Hünär öwrenmek', 'C) Wagt geçirmek', 'D) Synag geçmek'],
    correct: 1,
  },
  {
    id: 'fq2',
    question: 'Ösen düşünjeler haýsy bölümde öwrenildi?',
    options: ['A) 1-nji bölüm', 'B) 2-nji bölüm', 'C) 3-nji bölüm', 'D) 4-nji bölüm'],
    correct: 2,
  },
  {
    id: 'fq3',
    question: 'Hakyky taslamalar näme üçin möhüm?',
    options: ['A) Synag üçin', 'B) Amaly tejribe üçin', 'C) Baha üçin', 'D) Wagt üçin'],
    correct: 1,
  },
  {
    id: 'fq4',
    question: 'Sertifikat almak üçin näme gerek?',
    options: ['A) Diňe ýazylmak', 'B) Kursy tamamlamak', 'C) Töleg etmek', 'D) Synag geçmek'],
    correct: 1,
  },
  {
    id: 'fq5',
    question: 'Iň gowy öwreniş usuly haýsy?',
    options: ['A) Yzygiderli pratika', 'B) Bir gezek okamak', 'C) Diňe wideo görmek', 'D) Bellik ýazmak'],
    correct: 0,
  },
  {
    id: 'fq6',
    question: 'Kursda näçe bölüm bar?',
    options: ['A) 2', 'B) 3', 'C) 4', 'D) 5'],
    correct: 2,
  },
  {
    id: 'fq7',
    question: 'Mugallym bilen habarlaşmak üçin näme ulanylýar?',
    options: ['A) Telefon', 'B) Sorag-jogap bölümi', 'C) E-poçta', 'D) SMS'],
    correct: 1,
  },
  {
    id: 'fq8',
    question: 'Ösüş nädip ölçenilýär?',
    options: ['A) Wagt bilen', 'B) Tamamlanan sapaklar bilen', 'C) Baha bilen', 'D) Synag bilen'],
    correct: 1,
  },
  {
    id: 'fq9',
    question: 'Haýsy format has peýdaly?',
    options: ['A) Diňe tekst', 'B) Diňe wideo', 'C) Wideo + amaly', 'D) Diňe synag'],
    correct: 2,
  },
  {
    id: 'fq10',
    question: 'Kursdan soň näme alynýar?',
    options: ['A) Pul', 'B) Sertifikat', 'C) Kitap', 'D) Hiç zat'],
    correct: 1,
  },
]

export const courseSections = {
  default: [
    {
      id: 's1',
      title: '1-nji bölüm: Giriş we esaslar',
      duration: '1 s 20 min',
      lessons: [
        {
          id: 'l1',
          title: 'Kursa giriş (Mugt görüp bolýar)',
          duration: '5:30',
          type: 'video',
          completed: false,
          preview: true, // MUGT
          videoUrl: FREE_VIDEO,
          description: 'Bu sapakda kursyň maksady we gurluşy barada tanyşarsyňyz.',
        },
        {
          id: 'l2',
          title: 'Esasy düşünjeler',
          duration: '12:45',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Kursyň esasy düşünjeleri we terminleri öwrenilýär.',
        },
        {
          id: 'l3',
          title: 'Gurşaw taýýarlamak',
          duration: '18:20',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Zerur programmalary we gurallary nädip gurnamaly.',
        },
        {
          id: 'l4',
          title: 'Ilkinji ädimler',
          duration: '22:10',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Ilkinji amaly mysallar bilen başlaýarys.',
        },
      ],
    },
    {
      id: 's2',
      title: '2-nji bölüm: Esasy mowzuklar',
      duration: '2 s 15 min',
      lessons: [
        {
          id: 'l5',
          title: 'Nazaryýet esaslary',
          duration: '25:00',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Nazaryýet esaslary çuňňur öwrenilýär.',
        },
        {
          id: 'l6',
          title: 'Amaly mysal 1',
          duration: '30:15',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Birinji amaly mysal bilen işleýäris.',
        },
        {
          id: 'l7',
          title: 'Amaly mysal 2',
          duration: '28:40',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Ikinji amaly mysal — has çylşyrymly mesele.',
        },
        {
          id: 'l8',
          title: 'Meseleleri çözmek',
          duration: '35:20',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Dürli meseleleri çözmek usullary.',
        },
      ],
    },
    {
      id: 's_midterm',
      title: '🎯 Midterm Synag (Ýarym ýyl synagy)',
      duration: '45 min',
      isMidterm: true,
      lessons: [
        {
          id: 'midterm',
          title: 'Midterm Synag',
          duration: '45 min · 5 sual',
          type: 'exam',
          examType: 'midterm',
          completed: false,
          preview: false,
          videoUrl: null,
          questions: midtermQuestions,
          passingScore: 60,
          description: 'Birinji we ikinji bölümleri öz içine alýan ýarym ýyl synagy. Geçmek üçin 60% gerek.',
        },
      ],
    },
    {
      id: 's3',
      title: '3-nji bölüm: Ösen mowzuklar',
      duration: '2 s 45 min',
      lessons: [
        {
          id: 'l9',
          title: 'Ösen düşünjeler',
          duration: '40:00',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Ösen düşünjeler we çylşyrymly mowzuklar.',
        },
        {
          id: 'l10',
          title: 'Hakyky taslamalar',
          duration: '45:30',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Hakyky durmuşdan alnan taslamalar bilen işleýäris.',
        },
        {
          id: 'l11',
          title: 'Iň gowy tejribeler',
          duration: '32:15',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Pudakda ulanylýan iň gowy tejribeler.',
        },
      ],
    },
    {
      id: 's4',
      title: '4-nji bölüm: Jemleýji',
      duration: '1 s 30 min',
      lessons: [
        {
          id: 'l12',
          title: 'Jemleýji taslama',
          duration: '48:20',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Kursyň ähli mowzuklaryny birleşdirýän jemleýji taslama.',
        },
        {
          id: 'l13',
          title: 'Kurs jemi we maslahatlar',
          duration: '15:00',
          type: 'video',
          completed: false,
          preview: false,
          videoUrl: null,
          description: 'Kursyň jemi we indiki ädimler üçin maslahatlar.',
        },
      ],
    },
    {
      id: 's_final',
      title: '🏆 Final Synag (Sertifikat synagy)',
      duration: '90 min',
      isFinal: true,
      lessons: [
        {
          id: 'final',
          title: 'Final Synag',
          duration: '90 min · 10 sual',
          type: 'exam',
          examType: 'final',
          completed: false,
          preview: false,
          videoUrl: null,
          questions: finalQuestions,
          passingScore: 70,
          description: 'Ähli bölümleri öz içine alýan jemleýji synag. Geçmek we sertifikat almak üçin 70% gerek.',
        },
      ],
    },
  ],
}

export function getCourseSections(courseId) {
  // Her kurs üçin aýratyn bölümler goşup bilersiňiz
  // Häzirlikçe ähli kurslar üçin default ulanylýar
  return JSON.parse(JSON.stringify(courseSections[courseId] || courseSections.default))
}
