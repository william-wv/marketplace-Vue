<script setup>
import CreateProducts from './CreateProducts.vue';
import DeleteProducts from './DeleteProducts.vue';
import ViewProdutes from './ViewProdutes.vue';


</script>

<template>
  <main>
    <div class="bg-white box-cards h-90">
      <ViewProdutes />
      <CreateProducts />
      <DeleteProducts />
    </div>
  </main>
</template>

<style scoped>
.h-90{
  height: 70vh;
}

@media (min-width:1000px) {
  .box-cards {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>