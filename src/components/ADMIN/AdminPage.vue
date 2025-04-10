<script setup>

import useAuthStore from '@/stores/auth';
// import AdminCategory from './AdminCategory.vue';
const auth = useAuthStore();

</script>

<template>
  <main>
    <h1 class="text-center mb-5 mt-4">Dashbord de {{ auth.user.name }}</h1>
    <div class="d-flex justify-content-center row col-12">
      <div class="col-5 p-0">
        <RouterLink>
          <p class="text-center">Categorias</p>
        </RouterLink>
      </div>
      <div class="col-5 p-0">
        <RouterLink>
          <p class="text-center">produtos</p>
        </RouterLink>
      </div>
    </div>
    
    <RouterView />

  </main>
</template>

<style scoped></style>