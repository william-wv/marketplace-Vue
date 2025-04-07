<script setup lang="ts">
import CreateCategory from './CreateCategory.vue';
import AdminMyCategories from './AdminMyCategories.vue';

</script>



<template>
  <RouterLink class="m-2" to="/editModerator">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>
 

  <main class="contain">
    <div class="card">
      <AdminMyCategories />
    </div>
    <div class="card">
      <CreateCategory />
    </div>
  </main>
</template>

<style scoped>


.contain{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 50px 0;
  justify-content: center;
}

.card {
  width: 300px;
  height: 340px;
  padding: 30px 20px;
}


@media (min-width: 768px) {
  .card {
    width: 300px;
    height: 500px;
  }
}
</style>