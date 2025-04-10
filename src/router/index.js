import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/LoginRegisterView.vue'),
      meta: { 
        hideHeader: true,
        hideFooter: true
      }
    },
    {
      path: '/register',
      component: () => import('../components/auth/RegisterComponent.vue'),
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
      component: () => import('../views/ShopView.vue'),
      meta: { hideNav: true }
    },

    // Rotas protegidas
    {
      path: '/painel',
      component: () => import('@/components/auth/isAuthDesktp.vue'),
      children: [
        {
          path: '/myaccount',
          name: 'my account',
          component: () => import('@/views/ProfileView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/mystock',
          name: 'my stock',
          component: () => import('@/views/StockView.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        },
        {
          path: '/editmoderator',
          name: 'edit moderator',
          component: () => import('@/views/AdminView.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        },
        {
          path: '/editmoderator/categories',
          name: 'create categories',
          component: () => import('@/components/pages/AdminCategory.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        },
        {
          path: '/editmoderator/products',
          name: 'options products',
          component: () => import('@/components/pages/AdminProducts.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        },
        {
          path: '/editmoderator/viewProducts',
          name: 'view products',
          component: () => import('@/components/pages/AdminProductsView.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        },
        {
          path: '/editmoderator/createProducts',
          name: 'create products',
          component: () => import('@/components/pages/CreateProducts.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        },
        {
          path: '/editmoderator/deleteProducts',
          name: 'delete products',
          component: () => import('@/components/pages/DeleteProducts.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        }
      ]
    },
    // Página de acesso negado (opcional)
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
      meta: { hideHeader: true, hideFooter: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAdmin) {
    if (user && user.role === 'admin') {
      next()
    } else {
      next({ path: '/unauthorized' })
    }
  } else {
    next()
  }
})

export default router
