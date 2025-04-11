<script setup lang="ts">
import CreateCategory from '../pages/CreateCategory.vue';
import AdminMyCategories from './AdminMyCategories.vue';


</script>



<template>
  <main class="contain d-flex col-12 justify-content-center">
    <div class="col-6">
      <AdminMyCategories />
    </div>
    <div class="col-6">
      <CreateCategory />
    </div>
  </main>
</template>

<style scoped>

.contain{
  background-color: rgba(0, 0, 0, 0.126);
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2) !important;
}


</style>