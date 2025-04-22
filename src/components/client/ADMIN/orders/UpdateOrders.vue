<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InputName from '@/components/common/InnputName.vue';
import InputNumber from '@/components/common/InputNumber.vue';
import { putOrders } from '@/services/http';
import { push } from 'notivue';
import { ref } from 'vue';

const ident = ref(0)
const statusUpdate = ref('')

async function enviarUpdate() {
  if (!ident.value || !statusUpdate.value) {
    push.warning('Preencha todos os campos');
    return;
  }

  const response = await putOrders(ident.value, {
    status: statusUpdate.value
  });

  if (response.status === 200) {
    push.success("Atualizado com sucesso");
  } else {
    push.error("Erro ao atualizar");
  }
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center gap-2">
      <i class="fs-3 bi bi-arrow-counterclockwise"></i>
      <h1>Update Status</h1>
    </div>
      <h3 class="fs-6 mt-2 mb-4">expected: PENDING, PROCESSING, SHIPPED, COMPLETED or CANCELED</h3>
    <form @submit.prevent="enviarUpdate" method="put">
      <InputNumber v-model="ident" :step-name="'ID do Pedido'" />
      <InputName v-model="statusUpdate" :step-name="'Novo Status'" :icon="'bi bi-arrow-repeat'" />
      <ButtonComponent :class="'blue'" :title="'Atualizar'" />
    </form>
  </div>
</template>
