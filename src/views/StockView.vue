<script setup>
import { onMounted, ref } from 'vue';
import { editStock } from '@/services/http';
import InnputName from '@/components/common/InnputName.vue';

const stock = ref('');


onMounted(async () => {

  const update = await editStq(id);
  if (update?.stock) {
    stock.value = update.stock;
  }
});

async function editStq(id) {
  try {
    const response = await editStock(id);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o estoque:', error);
  }
}
</script>

<template>
  <RouterLink class="m-2" to="/login">
    <i class="bi bi-arrow-left-short"></i>
  </RouterLink>

  <main>
    <InnputName
      placeholder_name="stock"
      v-model="stock"
      :icon="'bi bi-pen'"
      step-name="Selecione o produto"
    />
  </main>
</template>
