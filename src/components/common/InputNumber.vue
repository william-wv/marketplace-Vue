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
        type="number" class="form-control" 
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