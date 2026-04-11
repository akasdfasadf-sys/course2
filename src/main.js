import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { bmReveal } from './directives/bmReveal.js'
import './assets/main.css'

const app = createApp(App)
app.directive('bm-reveal', bmReveal)
app.use(router).mount('#app')
