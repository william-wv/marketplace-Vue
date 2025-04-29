<script setup lang="ts">
import ButtonComponent from '@/components/common/ButtonComponent.vue';

const props = defineProps({
  title: String,
  subtitle: String,
  image: String,
  desc: String
});
</script>

<template>
  <main class="d-flex justify-content-center align-items-center h-100">
    <div class="row col-12 h-100">
      
      <section class="col-6 d-flex flex-column justify-content-center align-items-center h-100">
        <div class="text-center mb-4">
          <h1>{{ title }}</h1>
          <h3>{{ subtitle }}</h3>
        </div>
        <ButtonComponent :title="'See'" class="blue"/>
      </section>
      
      <section class="col-6 d-flex flex-column justify-content-center align-items-center h-100">
        <img :src="image" :alt="desc" class="img-fluid mb-2" style="max-height: 300px; object-fit: contain;">
        <p>{{ desc }}</p>
      </section>

    </div>
  </main>
</template>

<style scoped>
.h-100 {
  height: 100svh;
}
</style>
