import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'
app.use(pinia)
app.use(router)

app.mount('#app')
