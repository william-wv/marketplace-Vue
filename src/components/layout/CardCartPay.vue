<script setup>
import { ref } from 'vue'

import InnputName from '../common/InnputName.vue';
import ButtonComponent from '../common/ButtonComponent.vue';

import { useCartStore } from '@/stores/carrinho';
import { useOrder } from '@/stores/order.js';

const props = defineProps({
  idEndereco: {
    type:  Number,
    default: null
  }
});

const cartStore = useCartStore()
const orders = useOrder()

const cuponSelect = ref(0) 

function converterParaDolar(precoBRL) {
  return cartStore.converterParaDolar(precoBRL);
}

function Enviar() {
  console.log("Cupom enviado:", cuponSelect.value);
  orders.addOrder({
    address_id: props.idEndereco,
    coupon_id: cuponSelect.value || null
  });
}

</script>

<template>
  <div class="mt-5">
    <div class="card">
      <h1 class="p-4">Order Summary</h1>
      <div class="w-100">
        <div class="m-4 bt-1 mb-0 text-cart d-flex justify-content-between">
          <h3>Subtotal:</h3>
          <h2 class="fs-4">{{ converterParaDolar(cartStore.totalPriceCart) }}</h2>
        </div>
        <div class="m-4 bt-1 mb-0 text-cart d-flex justify-content-between">
          <h3>Shipping:</h3>
          <h2 class="fs-4">$0.00</h2>
        </div>
        <div class="m-4 bt-1 mb-4 text-cart d-flex justify-content-between">
          <h3>TAX:</h3>
          <h2 class="fs-4">$0.00</h2>
        </div>
        <div class="m-4 bt-1 mb-0 text-cart d-flex justify-content-between">
          <h3>Total:</h3>
          <h2 class="fs-4">{{ converterParaDolar(cartStore.totalPriceCart) }}</h2>
        </div>
        <p v-if="idEndereco">Endereço Selecionado: {{ idEndereco }}</p>
        <InnputName class="m-4 mt-0 mb-0" :icon="'bi bi-wallet-fill'" :step-name="'Add your cupon'"
          v-model="cuponSelect" />
        <ButtonComponent class="mt-2 mb-3 mx-3 ml-2 w-100" :title="'Submit'" :class="'blue'" @click="Enviar" />
      </div>
    </div>
  </div>
</template>
