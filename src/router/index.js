import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Perfil from '../views/LoginRegisterView.vue'
import Register from '@/components/auth/RegisterComponent.vue'

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
    { path: '/login', 
      component: Perfil ,
      meta: { 
        hideHeader: true,
        hideFooter: true
      }
    },
    { 
      path: '/register', 
      component: Register ,
      meta: { 
        hideHeader: true,
        hideFooter: true
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    }
    
  ],
})

export default router
