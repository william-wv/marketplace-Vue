<script setup>
defineProps({
  title: String,
  icon: String,
  style: String
})
</script>

<template>
  <button
    @click="$emit('click')"
    type="submit"
    :class="style"
  >
    <i :class="icon"></i> {{ title }}
  </button>
</template>
<style scoped>

.blue {
  color: var(--White-000) !important;
  padding: 10px 15px;
  background-color: var(--Blue-700);
  border-radius: 8px;
}


.blue:hover {
  box-shadow: 0 6px 16px rgba(201, 186, 186, 0.808);
  background-color: var(--Blue-100);
}

.blue:active {
  transform: scale(0.98);
  box-shadow: 0 2px 6px rgba(86, 83, 190, 0.303);
}

.red {
  color: var(--White-000) !important;
  padding: 10px 15px;
  background-color: var(--Red-500);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.2);
}

.red:hover {
  background-color: var(--Red-600);
  box-shadow: 0 6px 16px rgba(201, 186, 186, 0.808);
  background-color: var(--Red-500);
}

.red:active {
  transform: scale(0.98);
  box-shadow: 0 2px 6px rgba(255, 0, 0, 0.2);
}

.orange {
  color: black !important;
  padding: 10px 15px;
  background-color: var(--Orange-500);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.2);
}

.orange:hover {
  background-color: var(--Orange-600);
  box-shadow: 0 6px 16px rgba(255, 140, 0, 0.3);
}

.orange:active {
  transform: scale(0.98);
  box-shadow: 0 2px 6px rgba(255, 140, 0, 0.2);
}
</style>