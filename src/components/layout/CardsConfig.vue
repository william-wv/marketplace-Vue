<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String
})

</script>

<template>
  <div class="card d-grid align-items-center p-4  ">
    <div class="d-flex align-items-center gap-2">
      <i :class=icon></i>
      <h1 class="fs-4">{{ title }}</h1>
    </div>
    <h2 class="fs-6">{{ subtitle }}</h2>
  </div>

</template>

<style scoped>

.card{
  width: 600px;
  height: 200px;
  box-shadow: var(--shadow);
}
h2{
  color: var(--Gray-600);
}
</style>