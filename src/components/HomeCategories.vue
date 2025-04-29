<script setup>

import { getCategories , getImageUrl} from '@/services/http';
import { onMounted, ref } from 'vue';

const categorias = ref([])
const loading = ref(false)
const error = ref('');

async function getCategoria() {
  loading.value = true;
  try {
    categorias.value = await getCategories();
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
    error.value = 'Erro ao carregar as categorias. Tente novamente mais tarde.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getCategoria()
})
</script>

<template>

<main>
  <h1 class="text-center mb-4 mt-4">Categories</h1>
  <div>
    <section class="categorias-grid mb-4 mt-5">
  <div
    v-for="cat in categorias"
    :key="cat.id"
    class="card-categoria"
    :class="{ active: categoriaSelecionada === cat.id }"
  >
      <img :src="cat.image_path" alt="">
    <p>{{ cat.name }}</p>
  </div>
</section>
  </div>
</main>

</template>

<style scoped>
img{
  width: 400px;
  height: 300px;
}
</style>