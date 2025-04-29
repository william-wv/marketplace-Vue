<script setup>
import { getCategoriesWithImage, getImageUrl } from '@/services/http';
import { onMounted, ref } from 'vue';

const categories = ref([])

async function categoriesGetWImage() {
  const result = await getCategoriesWithImage()
  categories.value = result
}

onMounted(() => {
  categoriesGetWImage()
})
</script>

<template>
  <main class="my-5 px-4">
    <div class="d-flex justify-content-between text-primary mx-5 align-items-center mb-4">
      <h2 class="fw-bold">Categorias</h2>
      <RouterLink to="/categories" class="text-dark fw-semibold see">
        See All &gt;
      </RouterLink>
    </div>

    <!-- Scroll horizontal -->
    <div class="d-flex justify-content-center overflow-auto gap-3 pb-2">
      <div
        v-for="cat in categories.slice(0, 10)"
        :key="cat.id"
        class=" text-center shadow-sm flex-shrink-0"
        style="width: 160px; border-radius: 12px; overflow: hidden;"
      >
        <div
          class="bg-light d-flex align-items-center justify-content-center"
          style="height: 120px;"
        >
          <img
            v-if="cat.image_path"
            :src="getImageUrl(cat.image_path)"
            class="img-fluid"
            style="max-height: 100%; object-fit: cover;"
            alt="Categoria"
          />
        </div>
        <div class="border-top px-2 py-3">
          <p class="card-title fw-semibold m-0" style="font-size: 0.95rem;">
            {{ cat.name }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.see:hover{
  text-decoration:underline !important; 
  color: var(--Blue-700) !important;
}
</style>