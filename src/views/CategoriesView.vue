<script setup>
import { onMounted, ref } from 'vue';

import {getCategories} from '@/services/http.js'

async function getCategoria() {
  const response = await getCategories()
  categorias.value = response
}

const categorias = ref([])

onMounted(() => {
  getCategoria()
})

</script>


<template>
  <select name="categoria" id="categoria">
    <option v-for="ctg in categorias" :key="ctg.id">
      {{ ctg.name }}
    </option>
  </select>

</template>