<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InputNumber from '@/components/common/InputNumber.vue';
import { editStock } from '@/services/http';
import { push } from 'notivue';
import { ref } from 'vue';

const idProd = ref(0)
const stock = ref(0)

async function editandoProd() {
  try {
    const response = await editStock(idProd.value, { stock: stock.value });
    console.log(response)
    push.success({
      title: 'Stock Notification !!',
      message: 'Your stock is updated',
    });

    // produtos.saveprod(response.data); // <- Só use se `auth` estiver definido corretamente

  } catch (error) {
    console.error('Erro ao editar produto:', error);
    push.error('Fail to update stock');
  }
}
</script>


<template>
  <div class="m-4">
    <h1>Edit your Product Stock</h1>
    <p>You can update your items stock</p>
  </div>

  <RouterLink to="/dashboard/edit">
    <div class="d-flex text-center align-items-center m-5">
      <i class="bi bi-arrow-left"></i>
      <p>Back to Dashboard</p>
    </div>
  </RouterLink>

  <main>
    <div class="d-flex flex-column justify-content-center align-items-center height">
      <form @submit.prevent="editandoProd">
        <InputNumber class="width" v-model="idProd" :step-name="'Id do produto'" />
        <InputNumber   class="width" v-model="stock" :step-name="'stock'" />
        <ButtonComponent  class="width" :title="'Enviar'" :style="'blue'" />
      </form>
    </div>
  </main>
</template>


<style scoped>
.height{
  height: 50svh;
}

.width{
  width: 40svw !important;
}
</style>