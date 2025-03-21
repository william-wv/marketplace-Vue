<script setup>
import { ref } from 'vue';

const props = defineProps({
  stepName: String
})

const nome = ref(''); // Variável reativa para armazenar o nome
</script>

<template>
  <div class="mt-2 mb-3 ">
    <label for="">{{ stepName }}</label>
    <div class="input-group">
      <span class="input-group-text"><i class="bi bi-person"></i></span>
      <input placeholder="Digite seu nome aqui" id="name" v-model="nome" type="text" class="form-control" required>
    </div>
  </div>
</template>

<style scoped>
@media (min-width:1920px) {
  .input-group{
    height: 60px !important;
  }

  input::placeholder{
    font-size: 1.6rem !important;
    position: relative;
    top: 10%;
  }

  i{
    font-size: 1.6rem !important;
  }
  
}
</style>
