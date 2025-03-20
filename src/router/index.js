import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Perfil from '../views/LoginRegisterView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }, 
    // { path: '/carrinho', component: Carrinho },
    // { path: '/favoritos', component: Favoritos },
    { path: '/perfil', 
      component: Perfil ,
      meta: { 
        hideHeader: true,
        hideFooter: true
      }
    }
  ],
})

export default router
