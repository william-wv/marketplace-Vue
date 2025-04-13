if (typeof window !== 'undefined') {
  window.localStorage.setItem('vue-devtools-force', 'true');
}

import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap'

console.log('Modo atual:', import.meta.env.MODE);


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router'

import { createNotivue } from 'notivue'

import 'notivue/notification.css' 
import 'notivue/animations.css' 


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const notivue = createNotivue({
  position: 'top-right',
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 4000
    }
  }
})

app.use(notivue)
app.use(pinia)
app.use(router)

app.mount('#app')

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;