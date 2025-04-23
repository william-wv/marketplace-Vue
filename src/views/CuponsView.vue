<script setup>
import { getCupons } from '@/services/cupons';
import { onMounted, ref } from 'vue';

const coupons = ref([])

async function couponsTot() {
  const result = await getCupons()
  coupons.value = result.data
}

onMounted(() => {
  couponsTot()
})
</script>

<template>
<main class="d-flex flex-column  my-5">
  <h1 class="text-center mb-3">Coupons Available</h1> 
  <h5 class="text-center text-warning mb-5">Use the Code Number to get your discount!</h5>

  <div class="row g-4">
    <div 
      v-for="coupon in coupons" 
      :key="coupon.id"
      class="col-sm-12 col-md-6 col-lg-4"
    >
      <div class="card shadow-sm border-0 rounded-4 p-3 h-100">
        <div class="card-body text-center">
          <h5 class="card-title text-primary fw-bold">{{ coupon.code }}</h5>
          <p class="card-text mb-1"><strong>Code ID:</strong> {{ coupon.id }}</p>
          <p class="card-text"><strong>Discount:</strong> {{ coupon.discount_percentage }}%</p>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
}
</style>
