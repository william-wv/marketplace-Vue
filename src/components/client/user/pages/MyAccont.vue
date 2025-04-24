<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: "Perfil", router: "/dashboard/myaccount" },
  { name: "Endereço", router: "/dashboard/myaccount/addressCreate" }
]
</script>


<template>
  <main class="container">
    <h1 class="fs-4">My account</h1>
    <ul>
      <li>
        <router-link v-for="item in navItems" :key="item.name" :to="item.router" class="d-block" :class="{
          active: route.path.startsWith(item.router),
          'text-warning': route.path.startsWith(item.router)
        }">
          {{ item.name }}
        </router-link>
      </li>
    </ul>

  </main>
</template>

<style scoped>
li{
  width: 70px !important;
}
</style>