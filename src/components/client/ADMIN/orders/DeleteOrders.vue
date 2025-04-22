<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InnputName from '@/components/common/InnputName.vue';
import InputNumber from '@/components/common/InputNumber.vue';


async function enviarDelete() {

}

</script>

<template>
  <div class="">
    <div class="d-flex align-items-center gap-2">
      <i class="fs-3 bi bi-trash"></i>
      <h1>Delete status</h1>
    </div>

    <form @submit.prevent="enviarDelete" method="delete">
      <InputNumber :step-name="'Id stock'" />
      <ButtonComponent :class="'red'" :title="'Submit'"/>
    </form>


  </div>
</template>

<style scoped></style>