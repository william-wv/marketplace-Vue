<script setup>
const props = defineProps({
  stepName: String,
  icon: String
})
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mt-2 mb-3">
    <div class="d-flex mb-1">
      <label for="name" class="form-label">{{ stepName }}</label>
    </div>

    <div class="input-group responsive-input-group">
      <span class="input-group-text">
        <i :class="icon"></i>
      </span>
      <input
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Text here"
        id="name"
        type="text"
        class="form-control responsive-input"
        required
      >
    </div>
  </div>
</template>


<style scoped>
.input-group-text {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.input-group-text i {
  font-size: 1.2rem;
  color: #555;
  transition: font-size 0.2s ease;
}

/* Input padrão */
.responsive-input {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: font-size 0.2s ease, padding 0.2s ease;
}

.responsive-input::placeholder {
  color: #aaa;
  font-style: italic;
}

/* Responsivo para telas maiores */
@media (min-width: 768px) {
  .responsive-input {
    font-size: 1.25rem;
    padding: 0.6rem 1.2rem;
  }

  .input-group-text i {
    font-size: 1.5rem;
  }
}

/* Telas muito grandes (ex: 1440px ou mais) */
@media (min-width: 1440px) {
  .responsive-input {
    font-size: 1.5rem;
    padding: 0.75rem 1.5rem;
  }

  .input-group-text i {
    font-size: 1.75rem;
  }
}

</style>
