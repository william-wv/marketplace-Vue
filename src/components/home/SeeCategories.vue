<script setup>
import { getCategoriesWithImage, getImageUrl } from '@/services/http';
import { onMounted, ref, computed } from 'vue';

const categories = ref([])
const currentPage = ref(1)
const itemsPerPage = 6 // 3x2 layout

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return categories.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(categories.value.length / itemsPerPage)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

async function categoriesGetWImage() {
  const result = await getCategoriesWithImage()
  categories.value = result
}

onMounted(() => {
  categoriesGetWImage()
})
</script>

<template>
  <main class=" mt-5 ">
    <RouterLink to="/categories" >
      <h1 class="text-center mb-4">See Categories</h1>
    </RouterLink>
    <div>

    </div>
    <div class="mx-5 row">
      <div class="col-md-4 mb-4" v-for="cat in paginatedCategories" :key="cat.id">
        <RouterLink  class="text-decoration-none text-dark w-100">
          <div class="card h-100 shadow-sm w-100">
            <img :src="getImageUrl(cat.image_path)" class="card-img-top" alt="Category Image"
              style="height: 200px; object-fit: cover;">
            <div class="card-body text-center">
              <h5 class="card-title">{{ cat.name }}</h5>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- Paginação -->
    <nav class="d-flex justify-content-center mt-4">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">Anterior</button>
        </li>

        <li class="page-item disabled">
          <span class="page-link">Página {{ currentPage }} de {{ totalPages }}</span>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">Próxima</button>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style scoped>
.border{
  border: 1px solid var(--Blue-500) !important;
}

</style>