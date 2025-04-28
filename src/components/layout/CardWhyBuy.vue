<template>
  <div class="card-item ">
    <div class="icon-circle d-flex">
      <i :class="`${icon} fs-3  text-white`"></i>
    </div>
    <h5>{{ title }}</h5>
    <p class="text-muted">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  text: String
});
</script>

<style scoped>
.card-item {
  width: 250px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.icon-circle {
  width: 60px;
  height: 60px;
  background-color:var(--Blue-700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px auto;
}
</style>
