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
      },
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
      component: () => import('@/components/Dashbord/isAuthDesktp.vue'),
      meta: { hideHeader: true, hideFooter: true },
      children: [
        {
          path: 'myaccount',
          name: 'myAccount',
          component: () => import('@/views/ProfileView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: 'mystock',
          name: 'myStock',
          component: () => import('@/views/StockView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: 'edit',
          component: () => import('@/components/ADMIN/Configurations.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresModeratorAndAdmin: true
          },
          children: [
            {
              path: 'categories/create',
              name: 'createCategory',
              component: () => import('@/components/ADMIN/pages/CreateCategory.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            }, 
            {
              path: 'products/create',
              name: 'createProduct',
              component: () => import('@/components/ADMIN/pages/CreateProducts.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },
            {
              path: 'stock',
              name: 'edit stock',
              component: () => import('@/components/ADMIN/pages/AdminStock.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },
            {
              path: 'menageUser',
              name: 'menage users',
              component: () => import('@/components/ADMIN/pages/AdminMenageUser.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },
            {
              path: 'orders',
              name: 'orders',
              component: () => import('@/components/ADMIN/pages/AdminOrders.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },
            {
              path: 'admin',
              redirect: 'admin/products',
              component: () => import('@/components/ADMIN/CategAndProd.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              },
              children: [
                {
                  path: 'categories',
                  name: 'adminCategories',
                  component: () => import('@/components/ADMIN/pages/AdminCategory.vue')
                },
                {
                  path: 'products',
                  name: 'adminProducts',
                  component: () => import('@/components/ADMIN/pages/AdminProducts.vue')
                }
              ]
            }
          ]
        },
        {
          path: 'editmoderator/createProducts',
          name: 'createProductModerator',
          component: () => import('@/components/ADMIN/pages/CreateProducts.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresModeratorAndAdmin: true
          }
        },
        {
          path: 'editAdmin',
          name: 'setupAdmin',
          component: () => import('@/components/ADMIN/CategAndProd.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresAdmin: true
          }
        }
      ]
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
      meta: {
        hideHeader: true,
        hideFooter: true
      }
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
