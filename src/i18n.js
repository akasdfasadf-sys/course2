import { createI18n } from 'vue-i18n'
import tm from './locales/tm.json'
import ru from './locales/ru.json'
import en from './locales/en.json'

const savedLang = localStorage.getItem('lang') || 'tm'

const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: 'tm',
  messages: { tm, ru, en },
})

export default i18n
