import { createApp } from 'vue'
import App from './views/App'
import router from './router/index'
import './assets/index.css'

createApp(App).use(router).mount('#app')
