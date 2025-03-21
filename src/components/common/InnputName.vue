<script setup>
const props = defineProps({
  stepName: String
})
defineEmits(['update:modelValue']);

// Variável reativa para armazenar o nome
</script>

<template>
  <div class="mt-2 mb-3 ">
    <div class="d-flex">
          <label for="name">{{ stepName }}</label>
    </div>

    <div class="input-group">
      <span class="input-group-text"><i class="bi bi-person"></i></span>
      <input  
        @input="$emit('update:modelValue', $event.target.value)" 
        placeholder="Digite seu nome aqui" 
        id="name" 
        type="text" 
        class="form-control" 
        required
      >
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
