<script setup>
  
const props = defineProps({
  title: String,
  lista: Array
})

</script>

<template>
  <h1>{{ title }}</h1>
  <ul>
    <li v-for="item in lista">
      {{ item }}
    </li>
  </ul>
</template>

<style scoped>

  h1 {
    font-size: 2rem;
    margin-bottom: 5px !important;
  }

  ul{
    padding: 0;
  }
</style>