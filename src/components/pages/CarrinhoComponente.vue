<script setup>

import useAuthStore from '@/stores/auth';
import ButtonComponent from '../common/ButtonComponent.vue';
import CardComponente from './CardComponente.vue';

const auth = useAuthStore()

</script>

<template>
  <section v-if="auth.isShoppNull">
    <div class="d-flex flex-column">
      <h1 class="m-3">
      Subtotal: $  <!-- {{ valorCompra }} -->
    </h1>
      <ButtonComponent  
    class="  btn_orange"
    :title="'Fechar pedido'"
    :style="'orange'"
    :icon="''"
    />
    </div>
    
    <CardComponente/>
    

  </section>

  <section v-if="!auth.isShoppNull">
    <div class="d-flex flex-column">
      <i class="bi bi-ban"></i> <h2>Nenhum item adicionado aqui</h2>
    </div>
  </section>
</template>

<style scoped>
.btn_orange{
  margin: 10px 30px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>