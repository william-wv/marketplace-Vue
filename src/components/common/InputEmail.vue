<script setup>
const props = defineProps({
  modelValue: String,
  stepName: String,
});
const emitir = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mb-3">
    <div class="d-flex mb-1">
      <label for="email">{{ stepName }}</label>
    </div>

    <div class="input-group">
      <span class="input-group-text"><i class="bi bi-envelope"></i></span>
      <input id="email" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        placeholder="name@exemple.com" type="text" class="form-control" required>
    </div>
  </div>
</template>

<style scoped>
@media (min-width:1920px) {
  .input-group {
    height: 60px !important;
  }

  input::placeholder {
    font-size: 1.6rem !important;
    position: relative;
    top: 10%;
  }

  i {
    font-size: 1.6rem !important;
  }

}
</style>