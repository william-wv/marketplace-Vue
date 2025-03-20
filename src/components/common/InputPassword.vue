<script setup>
import { ref } from 'vue';
// Estado para controlar a visibilidade da senha
const mostrarSenha = ref(false);

// Alterna entre 'text' e 'password'
const toggleSenha = () => {
  mostrarSenha.value = !mostrarSenha.value;
};
</script>

<template>
  <div class="mb-4">
    <div class="input-group">
      <span class="input-group-text"><i class="bi bi-lock"></i></span>

      <input placeholder="• • • • • • • •" :type="mostrarSenha ? 'text' : 'password'" class="form-control" required>
      
      <span class="input-group-text" @click="toggleSenha">
        <i :class="mostrarSenha ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
      </span>
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