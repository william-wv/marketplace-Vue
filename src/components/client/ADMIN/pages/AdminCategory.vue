<script setup>
import { onMounted, ref } from 'vue';
import { getCategories, updateCategory, deleteCategory } from '@/services/http';
import CategoryTable from '@/components/client/ADMIN/modals/CategoryTable.vue';
import CategoryModal from '@/components/client/ADMIN/modals/CategoryModal.vue';


// Reatividade
const categorias = ref([]);
const categoriaSelecionada = ref(null);
const mostrarModal = ref(false);

// Buscar categorias
const carregarCategorias = async () => {
  categorias.value = await getCategories();
};

// Abrir modal para editar
const abrirModalEditar = (categoria) => {
  categoriaSelecionada.value = { ...categoria };
  mostrarModal.value = true;
};



// Salvar categoria
const salvarEdicao = async (categoria) => {
  console.log(categoria)
  try {
    await updateCategory(categoria.id, categoria);
    await carregarCategorias();
  } catch (e) {
    console.error('Erro ao salvar a categoria:', e);
  }
  mostrarModal.value = false;
};

// Deletar categoria
const deletarCategoria = async (categoria) => {
  await deleteCategory(categoria.id);
  await carregarCategorias();
};


onMounted(() => {
  carregarCategorias();
});
</script>

<template>
  <main class="contain bg-white h-90">
    <CategoryTable 
    :categorias="categorias" 
    @editar="abrirModalEditar" 
    @deletar="deletarCategoria"
     />

    <!-- Modal de Edição -->
    <CategoryModal v-if="mostrarModal" 
    :categoria="categoriaSelecionada" 
    @salvar="salvarEdicao(categoriaSelecionada)"
    @fechar="mostrarModal = false" 
    />

  </main>
  
</template>

<style scoped>
.h-90{
  height: 70svh;
}

</style>