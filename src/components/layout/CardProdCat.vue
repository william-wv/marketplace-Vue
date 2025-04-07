<script setup>
import { getProductsByCategory, getImageUrl } from '@/services/http';
import { onMounted, ref, } from 'vue';


const produtos = ref([]);

async function prodByCat(id) {
  try {
    const response = await getProductsByCategory(id);
    produtos.value = response;
    console.log(produtos.value);
  } catch (e) {
    console.error('Error:', e);
  }
}

const props = defineProps({
  category: String,
  id: String,
})

const id = props.id;


const taxaDeCambio = ref(0.17);
function converterParaDolar(precoBRL) {
  if (!precoBRL) return '$ 0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(precoBRL * taxaDeCambio.value);
}

onMounted(() => {
  prodByCat(id);
})

</script>

<template>
  <main class="mb-2 mt-4">

    <h1>{{ category }}</h1>
    <div class="produto-card" v-for="prod in produtos" :key="prod.id">
      <div class="contain-card  mb-4">
        <div class="div-img d-flex justify-content-center">
          <img :src="getImageUrl(prod.image_path)" alt="Imagem do produto" />
        </div>

        <div class="texts col-6">
          <div>
            <h2 class="p-name"><b>{{ prod.name }}</b></h2>
            <p class="p-desc">{{ prod.description }}</p>
          </div>
          <div class="price d-flex col-6">
            <div>
              <p class="p-price">{{ converterParaDolar(prod.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
img {
  width: 200px;
}
</style>