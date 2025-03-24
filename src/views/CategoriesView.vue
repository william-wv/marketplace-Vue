<script setup>
import { onMounted, ref, watch } from 'vue';
import { getCategories, getProductsByCategory } from '@/services/http.js';

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
  if (!idCateg) return;
  const response = await getProductsByCategory(idCateg);
  produtos.value = response;
}

// Monitora mudanças na categoria selecionada
watch(categoriaSelecionada, (novaCategoria) => {
  getProdutosPorCategoria(novaCategoria);
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
      <option v-for="ctg in categorias" :key="ctg.id" :value="ctg.name">
        {{ ctg.name }} {{ ctg.id }}
      </option>
    </select>

    <h2>Produtos</h2>
    <ul v-if="produtos.length">
      <li v-for="produto in produtos" :key="produto.id">
        <strong>{{ produto.name }}</strong> - R$ {{ produto.price }}
      </li>
    </ul>
    <p v-else>Nenhum produto encontrado.</p>
  </div>
</template>
