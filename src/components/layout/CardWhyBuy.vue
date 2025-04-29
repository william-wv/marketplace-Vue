<template>
  <div class="card-whybuy p-3 m-3 text-center">
    <i :class="`bi ${icon}`" class="icon mb-3"></i>
    <h5 class="mb-2">{{ title }}</h5>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  text: String,
});
</script>

<style scoped>
.card-whybuy {
  background-color: white;

  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  width: 250px;
  transition: transform 0.3s ease;
}

.card-whybuy:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2.5rem;
  color: var(--Blue-700);
}
</style>
