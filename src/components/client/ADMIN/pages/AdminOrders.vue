<script setup>
import navlist from "@/data/ListNavAdminOrders.json"
import { useRoute } from "vue-router";

const list = navlist
const route = useRoute(); 


</script>

<template>
  <section class="d-flex justify-content-center gap-5">
    <header class="h-100  d-flex flex-column align-items-center justify-content-center">
      <div class="d-flex align-items-center gap-4 fs-2">
        <i class="bi bi-box"></i>
        <h1 class="fs-2">Admin Orders</h1>
      </div>
      <ul>
        <li v-for="l in list" :key="l.router" class="text-black btn border w-100 my-3" :class="{
          'bg-warning': route.path.startsWith(l.router)
        }" @click="$router.push(l.router)">
          {{ l.name }}
        </li>
      </ul>
    </header>
    <span class="h-100 border-end"></span>
    <main class="col-7 mt-5">
      <RouterView />
    </main>
  </section>
</template>


<style scoped>
.h-100 {
  height: 100svh !important;
}

</style>
