<script setup>
defineProps({
  zip:String
})

const emit = defineEmits(['click']) 
</script>


<template>
  <div>
    <input    @click="$emit('click')" type="radio" id="address" name="zip" value="huey"  />
    <label for="address"></label>
  </div>
</template>