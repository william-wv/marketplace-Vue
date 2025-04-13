import { ref } from 'vue';
import { defineStore } from 'pinia';
import { cartService } from '@/services/http'; // Certifique-se de que esse serviço está certo

export const useProductStore = defineStore('product', () => {
  const categorias = ref([]);
  const produtosPorCategoria = ref([]);
  const loading = ref(false);

  

  async function getProdutosPorCategoria(idCategoria) {
    loading.value = true;
    try {
      const response = await cartService.get(`/produtos/categoria/${idCategoria}`);
      produtosPorCategoria.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
    } finally {
      loading.value = false;
    }
  }

  async function enviarProd(produto) {
    loading.value = true;
    try {
      const formData = new FormData();
      formData.append('name', produto.name);
      formData.append('description', produto.description);
      formData.append('price', produto.price);
      formData.append('stock', produto.stock);
      formData.append('category_id', produto.category_id);
      if (produto.image) {
        formData.append('image', produto.image);
      }

      const response = await cartService.post('/produtos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Produto enviado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar produto:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    categorias,
    produtosPorCategoria,
    loading,
    getProdutosPorCategoria,
    enviarProd,
  };
});
