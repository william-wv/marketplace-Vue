<script setup>
// json
import list from "../../data/itemsNavLoginDesktop.json"
// vue
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
// store
import useAuthStore from '@/stores/auth.js'
// components
import ButtonComponent from "../common/ButtonComponent.vue"

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const navbarItens = ref(list)
const isCollapsed = ref(false)

const goToHome = () => {
  router.push('/')
}

const filteredNavbarItems = computed(() => {
  const role = auth.user?.role || "guest"
  return navbarItens.value.filter(item => item.role === 'all' || item.role === role)
})
</script>

<template>
  <div class="d-flex div-aside">
    <!-- Sidebar -->
    <aside class="border-end py-4 sidebar" :class="{ collapsed: isCollapsed }" @mouseenter="isCollapsed = false">
      <div class="container-aside d-flex flex-column h-100">
        <div class="d-flex">
          <div>
            <h5 class="mb-4 px-3" v-if="!isCollapsed">Dashbord</h5>
            <h5 class="mb-4 px-3 fs" v-if="isCollapsed">Compre+</h5>
          </div>
        </div>

        <ul class="nav flex-column">
          <li v-for="item in filteredNavbarItems" :key="item.id" class="nav-ite  m mb-2">
            <RouterLink :to="item.router" class="nav-link d-flex align-items-center gap-2 position-relative"
            :class="{ active: route.path.startsWith(item.router)}"
            >
              <span v-if="route.path.startsWith(item.router)" class="active-indicator"></span>

              <i class="m-2" :class="[item.icon]"></i>
              <span v-if="!isCollapsed">{{ item.text }}</span>
            </RouterLink>
          </li>
        </ul>

        <div class="mt-auto px-3 d-flex flex-column" v-if="!isCollapsed">
          <ButtonComponent :icon="'bi bi-shop'" :style="'orange'" class="w-100" @click="goToHome"
            :title="'Visit Site'" />
          <ButtonComponent :icon="'bi bi-box-arrow-right'" :title="'Logout'" :style="'red'" @click="auth.logout()" />
        </div>
      </div>
    </aside>

    <!-- Conteúdo principal -->
    <main
  :class="{ 'ml-250': !isCollapsed, 'ml-110': isCollapsed }"
  class="flex-grow-1 p-4 bg-light overflow-auto"
  @mouseenter="isCollapsed = true"
>      <RouterView />
    </main>
  </div>
</template>


<style scoped>

.ml-250 { 
  transition: all 0.4s ease-in-out;
  margin-left: 250px !important;  

}
.ml-110 { 
  transition: all 0.4s ease-in-out;
  margin-left: 110px !important;  
}
.sidebar {
  background-color: var(--Blue-500);
  color: white;
  height: 100svh;
  width: 250px;
  min-width: 250px;
  position: fixed; 
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.4s ease-in-out;
}

.sidebar.collapsed {
  width: 110px;
  min-width: 110px;
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
