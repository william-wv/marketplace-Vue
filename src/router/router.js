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
    {
      path: '/product/:id', 
      name: 'Product id',
      component: () => import('@/views/ProductPage.vue'), 
      props: true 
    },
    // Página da loja (sem nav)
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      meta: { hideNav: true }
    },
    {
      path: '/coupons',
      name: 'coupons',
      component: () => import('../views/CuponsView.vue'),
    },

    // Área do painel (dashboard) protegida por autenticação
    {
      path: '/dashboard',
      component: () => import('@/components/Dashbord/isAuthDesktp.vue'),
      meta: { hideHeader: true, hideFooter: true },
      children: [

        // Visualização de pedidos
        {
          path: 'userOrder',
          name: 'user orders',
          component: () => import('@/components/client/user/pages/ClientOrder.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
          }
        },
        {
          path: '/mycart',
          name: 'cart',
          component: () => import('../views/ShopView.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
          }
        },
        // Página do perfil do usuário
        {
          path: 'myaccount',
          name: 'myAccount',
          redirect: "/dashboard/myaccount/edit",
          component: () => import('@/views/ProfileView.vue'),
          meta: { hideHeader: true, hideFooter: true },
          children: [
            {
              path: 'edit',
              name: 'my account edit',
              component: () => import('@/components/client/user/UserSection.vue')
            },
            {
              path: 'address',
              name: 'my addreess',
              component: () => import('@/components/client/user/pages/UserAddress.vue')
            }
          ]
        },
        // update account
        {
          path: 'update',
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
            {
              path: 'cupons',
              name: 'create cupons',
              component: () => import('@/components/client/ADMIN/pages/CreateCupon.vue'),
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
              },
              children: [

              ]
            },
            {
              path: 'delete',
              name: 'delete order by id',
              component: () => import('@/components/client/ADMIN/orders/DeleteOrders.vue')
            }, {
              path: 'gerenciar',
              name: 'ger',
              component: () => import('@/components/client/ADMIN/orders/UpdateOrders.vue')
            }, {
              path: 'deletePermanente',
              name: 'delete order perm',
              component: () => import('@/components/client/ADMIN/orders/DeleteOrders.vue')
            }, {
              path: 'socket',
              name: 'socket',
              component: () => import('@/components/client/ADMIN/orders/OrdersComponent.vue')
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
        }
        , {
          path: 'editmoderator/createProducts',
          name: 'createProductModerator',
          component: () => import('@/components/client/ADMIN/pages/CreateProducts.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresModeratorAndAdmin: true
          }
        },
        {
          path: 'editAdmin',
          name: 'setupAdmin',
          component: () => import('@/components/client/ADMIN/CategAndProd.vue'),
          meta: {
            hideHeader: true,
            hideFooter: true,
            requiresAdmin: true
          }
        },
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
