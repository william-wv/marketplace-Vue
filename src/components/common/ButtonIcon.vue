<script setup>

const props = defineProps({
  text: String,
  style: String,
  types: String,
  icon: String
})
</script>

<template>
  <Button :type=types :class=style class="btnn">
    <i :class="icon"></i> {{ text }}
  </Button>
</template>

<style scoped>
button {
  color: var(--White-000);
  padding: 10px;
  border-radius: 5px;
}

.aa {
  padding-left: 10px;

}

.orange {
  background-color: var(--Orange-500);
}

.blue {
  background-color: var(--Blue-900);
}
</style>