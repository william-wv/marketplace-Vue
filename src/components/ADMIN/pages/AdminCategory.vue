<script setup>
import { onMounted, ref } from 'vue';
import { getCategories, updateCateg, deleteCategory } from '@/services/http';
import CategoryTable from '@/components/ADMIN/modals/CategoryTable.vue';
import CategoryModal from '@/components/ADMIN/modals/CategoryModal.vue';


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
    await updateCateg(categoria.id, categoria);
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
 <!-- // Carrinho
export const cartService = {
  
  async getCart() {
    return api.get('cart/');
  },

  async createCart() {
    try {
      const response = await api.post('cart/', {});
      return response.data;
    } catch (error) {
      console.error('Erro ao criar carrinho:', error);
      return null;
    }
  },

  async getCartItems() {
    return api.get('cart/items');
  },

  async addItemToCart(item) {
    try {
      return await api.post('cart/items', item);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error.response?.status, error.response?.data);
    }
  },

  async removeCartItem(productId, quantity, unitPrice) {
    return api.delete('cart/items', {
      data: {
        product_id: productId,
        quantity: quantity,
        unit_price: unitPrice
      }
    });
  },

  async clearCart() {
    return api.delete('cart/clear');
  },
};
 -->
</template>

<style scoped>
.h-90{
  height: 70svh;
}

</style>