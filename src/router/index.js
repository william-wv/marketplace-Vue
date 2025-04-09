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
      component: () => import('../views/ShopView.vue') , 
      meta: {
        hideNav:true
      }
    },
    {
      path: '/editModerator',
      name: 'edit moderator',
      component: () => import('../views/AdminView.vue') , 
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },
    {
      path: '/editmoderator/categories',
      name: 'create categories',
      component: () => import('@/components/pages/AdminCategory.vue') ,
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },{
      path: '/editmoderator/products',
      name: 'options products',
      component: () => import('../components/pages/AdminProducts.vue') ,
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },
    {
      path: '/editmoderator/viewProducts',
      name: 'view products',
      component: () => import('../components/pages/AdminProductsView.vue') ,
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },
    {
      path: '/editmoderator/createProducts',
      name: 'create products',
      component: () => import('@/components/pages/CreateProducts.vue') ,
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },
    {
      path: '/editmoderator/deleteProducts',
      name: 'delete products',
      component: () => import('@/components/pages/DeleteProducts.vue') ,
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },
    {
      path: '/myaccount',
      name: 'my account',
      component: () => import('@/views/ProfileView.vue'),
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },
    {
      path: '/mystock',
      name: 'my stock',
      component: () => import('@/views/StockView.vue'),
        meta: {
            hideHeader: true,
            hideFooter: true    
      }
    },
    // para somente area da conta
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
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/editmoderator',
          name: 'edit moderator',
          component: () => import('@/views/AdminView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/editmoderator/categories',
          name: 'create categories',
          component: () => import('@/components/pages/AdminCategory.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/editmoderator/products',
          name: 'options products',
          component: () => import('@/components/pages/AdminProducts.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/editmoderator/viewProducts',
          name: 'view products',
          component: () => import('@/components/pages/AdminProductsView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/editmoderator/createProducts',
          name: 'create products',
          component: () => import('@/components/pages/CreateProducts.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },
        {
          path: '/editmoderator/deleteProducts',
          name: 'delete products',
          component: () => import('@/components/pages/DeleteProducts.vue'),
          meta: { hideHeader: true, hideFooter: true }
        }
      ]
    }
    
  ],
})
export default router
