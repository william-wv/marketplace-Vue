<script setup>

const props = defineProps({
  text: String,
  style: String,
})

</script>

<template>
  <Button :class=style>{{ text }}</Button>
</template>

<style scoped>


button {
  color: var(--White-000);
  padding: 10px;
  border-radius: 5px;
}

.orange{
  
  background-color: var(--Orange-500);
}

</style>