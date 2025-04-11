import useAuthStore from '@/stores/auth'
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
      path: '/dashboard',
      meta: { hideHeader: true, hideFooter: true },
      component: () => import('@/components/auth/isAuthDesktp.vue'),
      children: [
        {
          path: 'myaccount',
          name: 'my account',
          component: () => import('@/views/ProfileView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: 'mystock',
          name: 'my stock',
          component: () => import('@/views/StockView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/dashboard/editAdmin',
          meta: {
            hideHeader: true, 
            hideFooter: true, 
            requiresModeratorAndAdmin: true 
          },
          component: () => import('@/components/ADMIN/AdminPage.vue'),
          children: [
            {
              path: 'products',
              component: () => import('@/components/ADMIN/AdminCategory.vue')
            },
            {
              path: 'categories',
              component: () => import('@/components/ADMIN/AdminProducts.vue')
            }
          ]
        },
        {
          path: 'editmoderator/createProducts',
          name: 'create products',
          component: () => import('@/components/pages/CreateProducts.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresModeratorAndAdmin: true }
        },
        {
          path: 'editmoderator/deleteProducts',
          name: 'delete products',
          component: () => import('@/components/pages/DeleteProducts.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresModeratorAndAdmin: true }
        },
        {
          path: 'editAdmin',
          name: 'setup adm',
          component: () => import('@/components/ADMIN/AdminPage.vue'),
          meta: { hideHeader: true, hideFooter: true, requiresAdmin: true }
        },
      ]
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
      meta: { hideHeader: true, hideFooter: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const user = authStore.user

  if (to.meta.requiresModeratorAndAdmin) {
    if (user && (user.role === 'ADMIN' || user.role === 'MODERATOR')) {
      next()
    } else {
      next({ path: '/unauthorized' })
    }
  } else if (to.meta.requiresAdmin) {
    if (user && user.role === 'ADMIN') {
      next()
    } else {
      next({ path: '/unauthorized' })
    }
  } else {
    next()
  }
})




export default router
