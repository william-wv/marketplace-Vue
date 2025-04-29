<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InputNumber from '@/components/common/InputNumber.vue';
import { putOrders } from '@/services/http';
import { push } from 'notivue';
import { ref } from 'vue';

const ident = ref(0);
const statusUpdate = ref('');

const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELED'];

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
  <div class="d-flex flex-column justify-content-center align-items-center w-100 h-100">
    <div class="d-flex align-items-center gap-2">
      <i class="fs-3 bi bi-arrow-counterclockwise"></i>
      <h1>Update Status</h1>
    </div>
    <h3 class="fs-6 mt-2 mb-4">expected: PENDING, PROCESSING, SHIPPED, COMPLETED or CANCELED</h3>
    <form @submit.prevent="enviarUpdate" method="put">
      <InputNumber v-model="ident" :step-name="'ID do Pedido'" />

      <div class="form-group mb-3">
        <label for="statusSelect" class="form-label">Novo Status</label>
        <select id="statusSelect" v-model="statusUpdate" class="form-select">
          <option disabled value="">Selecione o status</option>
          <option v-for="status in statusOptions" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <ButtonComponent :class="'blue'" :title="'Atualizar'" />
    </form>
  </div>
</template>
