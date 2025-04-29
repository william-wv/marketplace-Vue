<script setup>
defineProps(['title'])
const emit = defineEmits(['change'])

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    emit('change', file)
  }
}
</script>

<template>
  <label>
    {{ title }}
    <input type="file" class="hidden" @change="onFileChange" />
  </label>
</template>
