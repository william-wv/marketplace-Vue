<script setup>
import { ref, computed } from 'vue';
import ProductRow from './ProductRow.vue';
import Modal from './ProductModal.vue';  // Modal importado

const props = defineProps(['produtos']);
const emit = defineEmits(['editar', 'deletar']);

const categoriaSelecionada = ref('');
const showModal = ref(false);  // Controle do modal
const produtoEditando = ref(null);  // Produto que está sendo editado

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

const abrirModal = (produto) => {
  produtoEditando.value = produto;  // Setando o produto para editar
  showModal.value = true;  // Abrindo o modal
};

const fecharModal = () => {
  showModal.value = false;  // Fechando o modal
};

const salvarProduto = (produtoAtualizado) => {
  // Lógica para salvar o produto atualizado
  emit('editar', produtoAtualizado);
  fecharModal();  // Fechar modal após salvar
};
</script>

<template>
  <div class="mb-4 d-flex align-items-center gap-3 justify-content-center mt-4 ">
    <label for="filtro" class="mr-2">Filtrar por Categoria:</label>
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
        :produto="produto"
        @editar="abrirModal(produto)"
        @deletar="emit('deletar', produto)"
      />
    </tbody>
  </table>

  <!-- Modal de edição -->
  <Modal
    v-if="showModal"
    :produto="produtoEditando"
    @fechar="fecharModal"
    @salvar="salvarProduto"
  />
</template>
