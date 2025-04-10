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

const goToHome = () => {
  router.push('/')
}

const filteredNavbarItems = computed(() => {
  const role = auth.user?.role || "guest" 
  return navbarItens.value.filter(item => item.role === 'all' || item.role === role)
})
</script>

<template>
  <div class="d-flex vh-100">
    <aside class="border-end py-4" style="width: 250px; min-width: 250px;">
      <div class="container-aside d-flex flex-column h-100">
        <div class="d-flex">
          <div>
            <h5 class="mb-4 px-3">Account</h5>
          </div>
        </div>

        <ul class="nav flex-column px-3">
          <li
            v-for="item in filteredNavbarItems"
            :key="item.id"
            class="nav-item mb-2"
          >
            <RouterLink
              :to="item.router"
              class="nav-link d-flex align-items-center gap-2"
              :class="{ active: route.path === item.router }"
            >
              <i :class="item.icon"></i>
              {{ item.text }}
            </RouterLink>
          </li>
        </ul>

        <div class="mt-auto px-3 d-flex flex-column">
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

    <main class="flex-grow-1 p-4 bg-light overflow-auto">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
aside {
  background-color: var(--Blue-500);
  color: white;
  height: 100vh;
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
  box-shadow: var(--shadow);
  color: var(--Orange-500) !important;
  font-weight: bold;
}

.container-aside {
  flex-direction: column;
}

.arrow-white {
  color: var(--White-000);
}
</style>
