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
  <
</template>

<style scoped>
img {
  width: 200px;
}
</style>