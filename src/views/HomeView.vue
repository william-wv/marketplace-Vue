<script setup>

import {getCategories} from "@/services/http.js"
import { onMounted, ref } from "vue"

const categorias = ref([])

const props = defineProps ({
  id: Number,
  name: String,
  description: String,
})

async function category() {
  try {
    const result = await getCategories()
    categorias.value = result;
  } catch (e) { 
    console.error(e)
  }
}

onMounted(() => {
  category()
})

</script>

<template>
  <p>a</p>
  <div v-for="ctg in categorias" :key="ctg.id">
    <p>{{ ctg.name }}</p>
  </div>
</template>

<style scoped>
</style>