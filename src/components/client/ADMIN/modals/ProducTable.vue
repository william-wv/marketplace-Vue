<script setup>
import { ref, computed } from 'vue';
import ProductRow from './ProductRow.vue';

const props = defineProps(['produtos']);
const emit = defineEmits(['editar', 'deletar']);

const categoriaSelecionada = ref('');

const categorias = computed(() => {
  const unicos = new Map();
  props.produtos.forEach(p => {
    if (p.category && !unicos.has(p.category.id)) {
      unicos.set(p.category.id, p.category.name);
    }
  });
  return Array.from(unicos, ([id, name]) => ({ id, name }));
});

const produtosFiltrados = computed(() => {
  if (!categoriaSelecionada.value) return props.produtos;
  return props.produtos.filter(p => p.category.id === Number(categoriaSelecionada.value));
});

</script>

<template>
  <div class="mb-4 d-flex align-items-center gap-3 justify-content-center mt-4 ">
    <label for="filtro" class="mr-2 ">Filtrar por Categoria:</label>
    <select id="filtro" v-model="categoriaSelecionada" class="p-2 border rounded">
      <option value="">Todas</option>
      <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>
  </div>

  <table class="w-100 border-collapse">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-3 text-center">ID</th>
        <th class="p-3">Produto</th>
        <th class="p-3 text-center">Categoria</th>
        <th class="p-3 text-center">Stock</th>
        <th class="p-3 text-center">Status</th>
        <th class="p-3 text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <ProductRow 
        v-for="produto in produtosFiltrados" 
        :key="produto.id"
        :produtos="produto"
        @editar="emit('editar', $event)" 
        @deletar="emit('deletar', $event)" 
      />
    </tbody>
  </table>
</template>
