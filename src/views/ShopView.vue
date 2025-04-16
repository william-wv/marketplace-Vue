<script setup>
import HeaderShop from '@/components/layout/HeaderShop.vue';
import CarrinhoComponente from '@/components/pages/CarrinhoComponente.vue';



</script>

<template>
<header>
    <HeaderShop/>
</header>

<main class="d-flex justify-content-center">
  <CarrinhoComponente/>
</main>

  
</template>

<style scoped>
main,header {
  margin: 10px !important ;
}
</style>