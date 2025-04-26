<script setup>
import list from "../../data/itemsNavLoginDesktop.json"
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import useAuthStore from '@/stores/auth.js'
import ButtonComponent from "../common/ButtonComponent.vue"

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const isCollapsed = ref(false)
const openItems = ref([])

function isOpen(id) {
  return openItems.value.includes(id)
}

function toggleItem(id) {
  const index = openItems.value.indexOf(id)
  if (index > -1) {
    openItems.value.splice(index, 1)
  } else {
    openItems.value.push(id)
  }
}

function closeItem(id) {
  const index = openItems.value.indexOf(id)
  if (index > -1) {
    openItems.value.splice(index, 1)
  }
}

const goToHome = () => {
  router.push('/')
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}

const filteredNavbarItems = computed(() => {
  const role = auth.user?.role || "guest"
  return list.filter(item => {
    if (item.role === 'all') return true
    if (Array.isArray(item.role)) return item.role.includes(role)
    return item.role === role
  })
})
</script>

<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <nav
      class="d-flex flex-column flex-shrink-0 p-3 bg-primary text-white"
      :class="{ 'collapsed': isCollapsed }"
      style="height: 100vh; width: auto; min-width: 80px; transition: all 0.3s ease-in-out;"
      @mouseenter="isCollapsed = false"
      @mouseleave="isCollapsed = true"
    >
      <!-- Logo -->
      <div class="mb-4 text-center">
        <span class="fs-4 fw-bold">{{ isCollapsed ? 'C+' : 'Compre+' }}</span>
      </div>

      <!-- Navegação -->
      <ul class="nav nav-pills flex-column mb-auto">
        <li v-for="item in filteredNavbarItems" :key="item.id" 
            class="nav-item" 
            @mouseleave="closeItem(item.id)">
          <a
            href="#"
            class="nav-link text-white d-flex align-items-center justify-content-between"
            :class="{ 
              active: route.path.startsWith(item.router), 
              'bg-warning': route.path.startsWith(item.router) 
            }"
            @click.prevent="item.actions ? toggleItem(item.id) : router.push(item.router)"
          >
            <div class="d-flex align-items-center">
              <i :class="['me-2', item.icon]"></i>
              <span v-if="!isCollapsed">{{ item.text }}</span>
            </div>
            <i
              v-if="item.actions && !isCollapsed"
              :class="['bi', isOpen(item.id) ? 'bi-chevron-up' : 'bi-chevron-down']"
            ></i>
          </a>

          <!-- Submenu -->
          <ul
            v-if="item.actions && isOpen(item.id) && !isCollapsed"
            class="nav flex-column ms-4 "
          >
            <li v-for="(action, index) in item.actions" :key="index" class="nav-item">
              <RouterLink :to="action.route" class="nav-link text-white-50">
                {{ action.name }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Botões no final -->
      <div class="mt-auto d-flex flex-column gap-2" v-if="!isCollapsed">
        <ButtonComponent :icon="'bi bi-shop'" :style="'orange'" class="w-100" @click="goToHome" />
        <ButtonComponent :icon="'bi bi-box-arrow-right'" :style="'red'" class="w-100" @click="handleLogout" />
      </div>
    </nav>

    <!-- Conteúdo principal -->
    <main class="flex-grow-1 bg-body" style="min-height: 100svh;">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

.bg-primary{
  background-color: var(--Blue-500) !important;
}

nav.collapsed {
  min-width: 80px !important;
  width: 80px !important;
}

nav.collapsed .nav-link span,
nav.collapsed .mt-auto,
nav.collapsed ul ul {
  display: none !important;
}

.nav-link.bg-warning {
  background-color: #ff9800 !important;
}
nav .nav-link {
  transition: background-color 0.3s ease;
}

nav .nav-link.active {
  background-color: #ff9800 !important; 
  color: white !important; 
}

nav ul ul {
  opacity: 1 !important; 
}

nav ul ul li a {
  color: rgb(255, 255, 255) !important;
}

nav ul ul li a:hover {
  color: #ff9800 !important; 
}

nav .nav-item:hover > ul {
  display: block;
}

.bg-body{
  background-color: aliceblue !important;
}
</style>
