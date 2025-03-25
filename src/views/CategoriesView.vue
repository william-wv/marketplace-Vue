<script setup>
import { onMounted, ref, watch } from 'vue';
import { getCategories, getImgProd , getProductsByCategory } from '@/services/http.js';

const categorias = ref([]);
const produtos = ref([]);
const categoriaSelecionada = ref('');

// Busca categorias ao montar o componente
async function getCategoria() {
  const response = await getCategories();
  categorias.value = response;
}

// Busca produtos conforme a categoria selecionada
async function getProdutosPorCategoria(idCateg) {
  console.log('Buscando produtos para a categoria:', idCateg);
  if (idCateg) {
    const response = await getProductsByCategory(idCateg)
    produtos.value = response
    return produtos
    // console.log(produtos.value)
  }
  else {
    console.log(error)
    return;
  }
}


// Monitora mudanças na categoria selecionada
watch(categoriaSelecionada, (novaCategoria) => {
  console.log('Categoria alterada:', novaCategoria);
  if (novaCategoria) {
    getProdutosPorCategoria(novaCategoria);
  }
});


onMounted(() => {
  getCategoria();
});
</script>

<template>
  <div>
    <label for="categoria">Selecione uma categoria:</label>
    <select v-model="categoriaSelecionada" id="categoria">
      <option value="">Escolha uma categoria</option>
      <option v-for="ctg in categorias" :key="ctg.id" :value="ctg.id">
        {{ ctg.name }}
        
      </option>
    </select>
    <ul v-for="prod in produtos" :key="prod.id">
      <img :src=prod.image_path >
      <li style="color: black;">{{ prod.name }}</li>

    </ul>
  </div>
</template>


<style scoped>
img {
  width: 500px;
  height: auto;
}
</style>