<script setup>
import { ref } from 'vue'
import ButtonComponent from '../common/ButtonComponent.vue';

import { useCartStore } from '@/stores/carrinho';
import InputNumber from '../common/InputNumber.vue';

const props = defineProps({
  idEndereco: {
    type:  Number,
    default: null
  }
});

const cartStore = useCartStore()

const cuponSelect = ref('') 

function converterParaDolar(precoBRL) {
  return cartStore.converterParaDolar(precoBRL);
}

function Enviar() {
  console.log("Cupom enviado:", cuponSelect.value);
  cartStore.addOrder({
    address_id: props.idEndereco,
    coupon_id: cuponSelect.value || null
  });
}

</script>

<template>
  <div class="container my-5">
    <div class="card shadow rounded">
      <div class="card-header bg-primary text-white text-center">
        <h3 class="mb-0">Resumo do Pedido</h3>
      </div>

      <div class="card-body">
        <!-- Subtotal -->
        <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
          <span class="fw-semibold">Subtotal:</span>
          <span class="fs-5">{{ converterParaDolar(cartStore.totalPriceCart) }}</span>
        </div>

        <!-- Frete -->
        <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
          <span class="fw-semibold">Frete:</span>
          <span class="fs-5">$0.00</span>
        </div>

        <!-- Imposto -->
        <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
          <span class="fw-semibold">Imposto:</span>
          <span class="fs-5">$0.00</span>
        </div>

        <!-- Total -->
        <div class="d-flex justify-content-between mb-4 border-bottom pb-3">
          <span class="fw-bold fs-5">Total:</span>
          <span class="fw-bold fs-5">{{ converterParaDolar(cartStore.totalPriceCart) }}</span>
        </div>

        <!-- Endereço selecionado -->
        <div v-if="idEndereco" class="alert alert-info d-flex align-items-center" role="alert">
          <i class="bi bi-geo-alt-fill me-2"></i>
          <div>Endereço Selecionado: <strong>#{{ idEndereco }}</strong></div>
        </div>

        <!-- Cupom -->
        <InputNumber
          class="mb-3"
          :icon="'bi bi-wallet-fill'"
          :step-name="'Adicione seu cupom'"
          v-model="cuponSelect"
        />

        <!-- Botão -->
        <ButtonComponent
          class="btn btn-primary w-100"
          :title="'Finalizar Pedido'"
          @click="Enviar"
        />
      </div>
    </div>
  </div>
</template>
