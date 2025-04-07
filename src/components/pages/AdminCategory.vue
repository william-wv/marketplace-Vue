<script setup lang="ts">
import CreateCategory from './CreateCategory.vue';
import AdminMyCategories from './AdminMyCategories.vue';

</script>



<template>
  <RouterLink class="m-2" to="/editModerator">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>
    <h1 class="text-center">MODERATOR SETUP</h1>

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

h1{
  padding: 10px 0;
  border-top: 1px solid var(--White-200);
  border-bottom: 1px solid var(--White-200);
}

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