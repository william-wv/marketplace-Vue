<script setup>
// json
import list from "@/data/itemsNavLoginDesktop.json"
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
  <div class="d-flex">
    <!-- Sidebar -->
    <aside
      class="border-end py-4 sidebar"
      :class="{ collapsed: isCollapsed }"
      @mouseenter="isCollapsed = false"
    >
      <div class="container-aside d-flex flex-column h-100">
        <div class="d-flex">
          <div>
            <h5 class="mb-4 px-3" v-if="!isCollapsed">Dashbord</h5>
          </div>
        </div>

        <ul class="nav flex-column">
          <li
            v-for="item in filteredNavbarItems"
            :key="item.id"
            class="nav-item mb-2"
          >
            <RouterLink
              :to="item.router"
              class="nav-link d-flex align-items-center gap-2 position-relative"
              :class="{ active: route.path === item.router }"
            >
              <span
                v-if="route.path === item.router"
                class="active-indicator"
              ></span>

              <i :class="item.icon"></i>
              <span v-if="!isCollapsed">{{ item.text }}</span>
            </RouterLink>
          </li>
        </ul>

        <div class="mt-auto px-3 d-flex flex-column" v-if="!isCollapsed">
          <ButtonComponent
            :icon="'bi bi-shop'"
            :title="'Visit Site'"
            :style="'orange'"
            class="w-100"
            @click="goToHome"
          />
          <ButtonComponent
            :icon="'bi bi-box-arrow-right'"
            :title="'Logout'"
            :style="'red'"
            @click="auth.logout()"
          />
        </div>
      </div>
    </aside>

    <!-- Conteúdo principal -->
    <main
    class="flex-grow-1 p-4 bg-light overflow-auto"
      @mouseenter="isCollapsed = true"
    >
      <RouterView />
    </main>
  </div>
</template>


<style scoped>
.sidebar {
  background-color: var(--Blue-500);
  color: white;
  height: 100vh;
  width: 250px;
  min-width: 250px;
  transition: width 0.3s ease, min-width 0.3s ease;
}

.sidebar.collapsed {
  width: 80px;
  min-width: 80px;
}

aside a {
  color: white;
  transition: background-color 0.3s, color 0.3s;
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
