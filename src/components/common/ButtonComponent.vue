<script setup>
  const props = defineProps({
    title: String,
    style: String
  })
</script>

<template>
  <Button :class=style class="btn"
  >{{ title }}</Button>
</template>

<style scoped>

.blue {
  color: var(--White-000) !important;
  padding: 10px 15px;
  background-color: var(--Blue-900);
}

</style>