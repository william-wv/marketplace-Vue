<script setup>
import { getCupons } from '@/services/cupons';
import { onMounted, ref } from 'vue';

const coupons = ref({})

async function couponsTot() {
  const result = await getCupons()
  return coupons.value = result.data
}

console.log(coupons.value)

onMounted(() => {
  couponsTot()
})
</script>

<template>
<main class="mt-4 mb-4">
  <h1 class="text-center">Coupons Avaliable</h1> 
  <h3 class="text-center mb-5 mt-3" style="color: var(--Orange-500);">You need use the Code Number !!!</h3>

  <div class="d-flex flex-wrap justify-content-center gap-5 mx-5 my-3">
    <div class="card p-3" v-for="coupon in coupons" >
      <p>{{ coupon.code }}</p>  
      <p>Code: {{ coupon.id }}</p>
      <p>Discount:{{ coupon.discount_percentage }}%</p>
    </div>
  </div>
</main>
</template>

<style scoped>

</style>