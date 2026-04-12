import { createI18n } from 'vue-i18n'
import tm from './locales/tm.json'

const i18n = createI18n({
  legacy: false,
  locale: 'tm',
  fallbackLocale: 'tm',
  messages: { tm },
})

export default i18n
