<script setup>
const props = defineProps({
  stepName: String,
})
defineEmits(['update:modelValue']);

</script>

<template>
  <div class="mt-2 mb-3 ">
    <div class="d-flex">
      <label for="name">{{ stepName }}</label>
    </div>

    <div class="input-group">
      <span class="input-"><i class="bi bi-card-image"></i></span>
      <input @input="$emit('update:modelValue', $event.target.value)" type="file" id="imagem"
        @change="handleImageUpload" accept="image/*" required class="form-control" />
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
