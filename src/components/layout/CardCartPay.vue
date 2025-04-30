<script setup>
import { ref } from 'vue'
import ButtonComponent from '../common/ButtonComponent.vue'

import { useCartStore } from '@/stores/carrinho'
import InputNumber from '../common/InputNumber.vue'

const props = defineProps({
  idEndereco: {
    type: Number,
    default: null
  }
})

const cartStore = useCartStore()

const selectedCoupon = ref(0)

function convertToDollar(priceBRL) {
  return cartStore.converterParaDolar(priceBRL)
}

function submitOrder() {
  console.log("Coupon submitted:", selectedCoupon.value)
  cartStore.addOrder({
    address_id: props.idEndereco,
    coupon_id: selectedCoupon.value || null
  })
}
</script>

<template>
  <div class="container my-5">
    <div class="card shadow rounded">
      <div class="card-header bg-primary text-white text-center">
        <h3 class="mb-0">Order Summary</h3>
      </div>

      <div class="card-body">
        <!-- Subtotal -->
        <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
          <span class="fw-semibold">Subtotal:</span>
          <span class="fs-5">{{ convertToDollar(cartStore.totalPriceCart) }}</span>
        </div>

        <!-- Shipping -->
        <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
          <span class="fw-semibold">Shipping:</span>
          <span class="fs-5">$0.00</span>
        </div>

        <!-- Tax -->
        <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
          <span class="fw-semibold">Tax:</span>
          <span class="fs-5">$0.00</span>
        </div>

        <!-- Total -->
        <div class="d-flex justify-content-between mb-4 border-bottom pb-3">
          <span class="fw-bold fs-5">Total:</span>
          <span class="fw-bold fs-5">{{ convertToDollar(cartStore.totalPriceCart) }}</span>
        </div>

        <!-- Selected Address -->
        <div v-if="idEndereco" class="alert alert-info d-flex align-items-center" role="alert">
          <i class="bi bi-geo-alt-fill me-2"></i>
          <div>Selected Address: <strong>#{{ idEndereco }}</strong></div>
        </div>

        <!-- Coupon -->
        <InputNumber
          class="mb-3"
          :icon="'bi bi-wallet-fill'"
          :step-name="'Enter your coupon'"
          v-model="selectedCoupon"
        />

        <!-- Button -->
        <ButtonComponent
          class="btn btn-primary w-100"
          :title="'Place Order'"
          @click="submitOrder"
        />
      </div>
    </div>
  </div>
</template>
