// Importa o store de autenticação
import useAuthStore from '@/stores/auth'
// Importa as funções para criação de rotas no Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// Cria e configura o roteador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // Página inicial
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },

    // Tela de login
    {
      path: '/login',
      component: () => import('../views/LoginRegisterView.vue'),
      meta: {
        hideHeader: true,
        hideFooter: true
      },
    },

    // Tela de registro
    {
      path: '/register',
      component: () => import('../components/auth/RegisterComponent.vue'),
      meta: {
        hideHeader: true,
        hideFooter: true
      }
    },

    // Página de categorias públicas
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    },

    // Página da loja (sem nav)
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      meta: { hideNav: true }
    },

    // Área do painel (dashboard) protegida por autenticação
    {
      path: '/dashboard',
      component: () => import('@/components/Dashbord/isAuthDesktp.vue'),
      meta: { hideHeader: true, hideFooter: true },
      children: [

        // Página do perfil do usuário
        {
          path: 'myaccount',
          name: 'myAccount',
          component: () => import('@/views/ProfileView.vue'),
          meta: { hideHeader: true, hideFooter: true },
          children: [

          ]
        },
        // update account
        {
          path: '/update',
          name: 'update',
          component: () => import('@/components/client/user/pages/UpdateInfo.vue')
        },
        // Página de controle de estoque
        {
          path: 'mystock',
          name: 'myStock',
          component: () => import('@/views/StockView.vue'),
          meta: { hideHeader: true, hideFooter: true }
        },

        // Página de edição e administração geral
        {
          path: 'edit',
          component: () => import('@/components/client/ADMIN/Configurations.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresModeratorAndAdmin: true
          },
          children: [

            // Criar nova categoria
            {
              path: 'categories/create',
              name: 'createCategory',
              component: () => import('@/components/client/ADMIN/pages/CreateCategory.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },

            // Criar novo produto
            {
              path: 'products/create',
              name: 'createProduct',
              component: () => import('@/components/client/ADMIN/pages/CreateProducts.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },

            // Gerenciamento de estoque pelo admin/mod
            {
              path: 'stock',
              name: 'edit stock',
              component: () => import('@/components/client/ADMIN/pages/AdminStock.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },

            // Gerenciamento de usuários
            {
              path: 'menageUser',
              name: 'menage users',
              component: () => import('@/components/client/ADMIN/pages/AdminMenageUser.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },

            // Visualização de pedidos
            {
              path: 'orders',
              name: 'orders',
              component: () => import('@/components/client/ADMIN/pages/AdminOrders.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              }
            },

            // Gerenciamento geral de produtos e categorias
            {
              path: 'admin',
              redirect: 'admin/products',
              component: () => import('@/components/client/ADMIN/CategAndProd.vue'),
              meta: {
                hideHeader: true,
                hideFooter: true,
                requiresModeratorAndAdmin: true
              },
              children: [

                // Gerenciamento de categorias
                {
                  path: 'categories',
                  name: 'adminCategories',
                  component: () => import('@/components/client/ADMIN/pages/AdminCategory.vue')
                },

                // Gerenciamento de produtos
                {
                  path: 'products',
                  name: 'adminProducts',
                  component: () => import('@/components/client/ADMIN/pages/AdminProducts.vue')
                }

              ]
            }
          ]
        },

        // Criar produto pelo moderador
        {
          path: 'editmoderator/createProducts',
          name: 'createProductModerator',
          component: () => import('@/components/client/ADMIN/pages/CreateProducts.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresModeratorAndAdmin: true
          }
        },

        // Acesso exclusivo de admin para configurações gerais
        {
          path: 'editAdmin',
          name: 'setupAdmin',
          component: () => import('@/components/client/ADMIN/CategAndProd.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresAdmin: true
          }
        }

      ]
    },

    // Tela de acesso não autorizado
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
      meta: {
        hideHeader: true,
        hideFooter: true
      }
    },

  ]
})

// Guardião de rotas: verifica se usuário tem permissão
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const user = authStore.user

  // Verifica se precisa ser MODERATOR ou ADMIN
  if (to.meta.requiresModeratorAndAdmin) {
    if (user && (user.role === 'ADMIN' || user.role === 'MODERATOR')) {
      next()
    } else {
      next({ path: '/unauthorized' })
    }

    // Verifica se precisa ser ADMIN
  } else if (to.meta.requiresAdmin) {
    if (user && user.role === 'ADMIN') {
      next()
    } else {
      next({ path: '/unauthorized' })
    }
    // Caso contrário, libera o acesso
  } else {
    next()
  }
})

export default router
