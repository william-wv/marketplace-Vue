<script setup>

const props = defineProps({
  stepName: String,
  modelValue: String,
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mb-3">
    <div class="password-space d-flex mb-1">
      <label class="password">{{ stepName }}</label>
      <p class="forgot">{{ forgot }}</p>
    </div>
    <div class="input-group">
      <span class="input-group-text"><i class="bi bi-123"></i></span>

      <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="'Number'"
        type="number" class="form-control responsive-input" 
        required>
    </div>
  </div>
</template>

<style scoped>

.password-space {
  display: flex;
  justify-content: space-between;
}

.forgot {
  color: var(--text-h2);
  cursor: pointer;
  font-size: 0.8rem;
}

.input-group-text {
  cursor: pointer;
}

.forgot:hover {
  text-decoration: underline;
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
