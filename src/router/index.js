import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    }, 
    // { path: '/carrinho', component: Carrinho },
    // { path: '/favoritos', component: Favoritos },
    { path: '/login', 
      component: () => import('../views/LoginRegisterView.vue'),
      meta: { 
        hideHeader: true,
        hideFooter: true
      }
    },
    { 
      path: '/register', 
      component: () => import('../components/auth/RegisterComponent.vue') ,
      meta: { 
        hideHeader: true,
        hideFooter: true
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
  ],
})

export default router
