<script setup>
  const props = defineProps({
    title: String,
    style: String,
    icon: String,

  })
</script>

<template>
  
  <Button type="submit" :class=style class="btn"
  > <i :class=icon></i> {{ title }}</Button>
</template>

<style scoped>

.blue {
  color: var(--White-000) !important;
  padding: 10px 15px;
  background-color: var(--Blue-900);
}

.red{
  color: var(--White-000) !important;
  padding: 10px 15px;
  background-color: var(--Red-500);
}
</style>