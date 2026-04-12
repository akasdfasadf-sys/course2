import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { bmReveal } from './directives/bmReveal.js'
import i18n from './i18n.js'
import './assets/main.css'

const app = createApp(App)
app.directive('bm-reveal', bmReveal)
app.use(router).use(i18n).mount('#app')
