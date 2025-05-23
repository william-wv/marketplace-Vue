<script setup>
import list from "../../data/itemsNavLoginDesktop.json"
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import useAuthStore from '@/stores/auth.js'
import ButtonComponent from "../common/ButtonComponent.vue"

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const mostrarItens = ref(false)
const navbarItens = ref(list)
const isCollapsed = ref(false)
const jaMostrou = ref(false)

const goToHome = () => {
  router.push('/')
}


const handleMouseEnter = () => {
  isCollapsed.value = false
  if (!jaMostrou.value) {
    jaMostrou.value = true
    setTimeout(() => {
      mostrarItens.value = true
    }, 0)
  } else {
    mostrarItens.value = true 
  }
}

const submenuVisiveis = ref({})

const toggleSubmenu = (id) => {
  submenuVisiveis.value[id] = !submenuVisiveis.value[id]
}

const filteredNavbarItems = computed(() => {
  const role = auth.user?.role || "guest"
  return navbarItens.value.filter(item => {
    if (item.role === 'all') return true
    if (Array.isArray(item.role))
      return item.role.includes(role)
    return item.role === role
  })
})

</script>


<template>
  <div class="d-flex div-aside">
    <aside class="border-end py-4 sidebar" :class="{ collapsed: isCollapsed }" @mouseenter="handleMouseEnter">
      <div class="container-aside d-flex flex-column h-100">
        <div class="d-flex">
          <div>
            <h1 class="mb-4 px-3 text-uppercase logo fs-2" v-if="!isCollapsed">Compre+</h1>
            <h1 class="logo mb-4 px-3 fs text-uppercase" v-if="isCollapsed">c+</h1>
          </div>
        </div>

        <ul class="nav flex-column">
          <li v-for="item in filteredNavbarItems" :key="item.id" class="nav-item mb-2">
            <div class="nav-link d-flex align-items-center gap-2 position-relative text-white"
              :class="{ active: route.path.startsWith(item.router) }"
              @click="item.options ? toggleSubmenu(item.id) : router.push(item.router)" style="cursor: pointer;">
              <span v-if="route.path.startsWith(item.router)" class="active-indicator"></span>
              <i class="m-2" :class="[item.icon]"></i>
              <span v-if="!isCollapsed">{{ item.text }}</span>
              <i v-if="item.options && !isCollapsed" class="bi"
                :class="submenuVisiveis[item.id] ? 'bi-chevron-up' : 'bi-chevron-down'" style="margin-left:auto;"></i>
            </div>

            <!-- submenu -->
            <ul v-if="item.options && submenuVisiveis[item.id] && !isCollapsed" class="nav flex-column ms-4">
              <li v-for="(opt, index) in item.options" :key="index" class="nav-item">
                <RouterLink :to="opt.route" class="nav-link d-flex align-items-center gap-2 small">
                  <i class="bi bi-dot"></i>
                  {{ opt.name }}
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>

        <div class="mt-auto px-3 d-flex flex-column" v-if="!isCollapsed">
          <ButtonComponent v-if="mostrarItens" :icon="'bi bi-shop'" :style="'btn btn-outline-light'" class="w-100" @click="goToHome"
            :title="''" />

        </div>
      </div>
    </aside>

    <main :class="{
      'ml-notColapse': !isCollapsed,
      'ml-colapse': isCollapsed
    }" class=" bg-fundo flex-grow-1  bg-light" @mouseenter="isCollapsed = true">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.bg-fundo {
  background-color: whitesmoke !important;
  height: 100vh;
}

.ml-notColapse {
  transition: all 0.4s ease-in-out;
  margin-left: 250px !important;
}

.ml-colapse {
  transition: all 0.4s ease-in-out;
  margin-left: 80px !important;
  justify-content: center;
}

.sidebar {
  background-color: var(--Blue-500);
  color: white;
  height: 100svh;
  width: 20px;
  min-width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  transition: all 0.4s ease-in-out;
}

.sidebar.collapsed .nav-link {
  justify-content: center;

}

.sidebar.collapsed {
  width: 80px;
  min-width: 80px;
  font-size: 25px;
  transition: all 0.5s ease-in-out;
}

.sidebar span,
.sidebar i {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.sidebar.collapsed span {
  opacity: 0;
  transform: translateX(-10px);
}

.sidebar:not(.collapsed) span {
  opacity: 1;
  transform: translateX(0);
}


aside a {
  color: white;
  transition: background-color 1, color 1s;
  padding: 0.5rem;
  border-radius: 8px;
  display: block;
}

aside a:hover {
  color: var(--Orange-500) !important;
}

aside .active {
  color: var(--Orange-500) !important;
  font-weight: bold;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 6px;
  background: linear-gradient(180deg, #FFC107, #FF9800);
  border-radius: 0 10px 10px 0;
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.4);
  transition: all 0.3s ease;
}
</style>
