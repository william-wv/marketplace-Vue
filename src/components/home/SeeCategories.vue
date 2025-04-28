<script setup>
import { getCategoriesWithImage, getImageUrl } from '@/services/http';
import { onMounted, ref, computed } from 'vue';

const categories = ref([])
const currentPage = ref(1)
const itemsPerPage = 6

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
  <main class="bg-primary p-5 my-5">
    <div class="d-flex justify-content-between align-items-center mb-4 ">
      <h2 class="fw-bold text-white">Categorias Populares</h2>
      <RouterLink to="/categories" class="text-decoration-none text-white">Ver todas ></RouterLink>
    </div>

    <div class="d-flex justify-content-center  gap-5">
      <div class="" v-for="cat in paginatedCategories" :key="cat.id">
        <RouterLink class="text-decoration-none text-dark">
          <div class=" border-0 text-center">
            <div class="image-placeholder rounded mb-2">
              <img v-if="cat.image_path" :src="getImageUrl(cat.image_path)" alt="Category Image" class="img-fluid rounded" style="object-fit: cover; width: 100%; height: 100%;">
            </div>
            <div class="card-body p-0">
              <h6 class="fw-bold mt-2 text-white">{{ cat.name }}</h6>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.image-placeholder {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.bg-primary{
  background-color: var(--Blue-700) !important;
}
</style>
