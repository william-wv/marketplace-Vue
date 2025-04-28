<!-- PagesComponent.vue -->
<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';

const props = defineProps({
  title: String,
  subtitle: String,
  image: String,
  desc: String
});
</script>

<template>
  <main class="d-flex justify-content-center align-items-center h-100 bg-light">
    <div class="row col-12 h-100">
      
      <!-- Texto -->
      <section class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4">
        <div class="w-75">
          <h1 class="fs-1 mb-3">{{ title }}</h1>
          <h3 class="fs-4 mb-4">{{ subtitle }}</h3> 
          <ButtonComponent :title="'See More'" class="btn btn-primary px-4 py-2" />
        </div>
      </section>
      
      <!-- Imagem -->
      <section class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-4">
        <img :src="image" :alt="desc" class="img-fluid rounded shadow mb-3" style="max-height: 300px; object-fit: contain;">
        <p class="lead text-center w-75">{{ desc }}</p>
      </section>

    </div>
  </main>
</template>

<style scoped>
.h-100 {
  height: 100svh;
}
</style>
