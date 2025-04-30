<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InputNumber from '@/components/common/InputNumber.vue';
import { useOrderStore } from '@/services/OrdersUsers';



</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center w-100 h-100">
    <div class="d-flex align-items-center gap-2 ">
      <i class="fs-3 bi bi-trash"></i>
      <h1>Delete status</h1>
    </div>

    <form @submit.prevent="enviarDelete" method="delete">
      <InputNumber :step-name="'Id order'" />
      <ButtonComponent :class="'red'" :title="'Submit'"/>
    </form>


  </div>
</template>

<style scoped></style>