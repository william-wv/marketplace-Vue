// stores/products.js
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { getCategories, getProductsByCategory } from '@/services/http.js';
import { cartService } from '@/services/http.js';

export const useStore = defineStore('store', () => {
  const produtos = ref([]);
  const categorias = ref([]);
  const categoriaSelecionada = ref('');
  const loading = ref(false);
  const error = ref('');
  const favoritos = ref({});
  const carrinho = ref({});


  console.log(carrinho.value)
  // Função para buscar categorias
  async function getCategoria() {
    loading.value = true;
    try {
      categorias.value = await getCategories();
      if (categorias.value.length > 0) {
        categoriaSelecionada.value = categorias.value[0].id;
      }
    } catch (err) {
      error.value = 'Erro ao carregar categorias.';
    } finally {
      loading.value = false;
    }
  }

  // Função para buscar produtos por categoria
  async function getProdutosPorCategoria(idCateg) {
    loading.value = true;
    error.value = '';
    produtos.value = [];
    try {
      produtos.value = await getProductsByCategory(idCateg);
      // console.log(produtos.value); 
    } catch (err) {
      error.value = 'Erro ao carregar os produtos.';
      console.error(err); // Log do erro
    } finally {
      loading.value = false;
    }
  }
  
  const taxaDeCambio = ref(0.17);
  function converterParaDolar(precoBRL) {
    if (!precoBRL) return '$ 0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(precoBRL * taxaDeCambio.value);
  }

  // Função para adicionar/remover produtos do carrinho
  async function toggleCarrinho(prod) {
    if (carrinho.value[prod.id]) {
      const response = await cartService.removeCartItem(prod.id);
      if (response.status === 204) {
        const novoCarrinho = { ...carrinho.value };
        delete novoCarrinho[prod.id];
        carrinho.value = novoCarrinho;
      }
    } else {
      const response = await cartService.addItemToCart({
        product_id: prod.id,
        quantity: 1,
        unit_price: prod.price
      });
      if (response.status === 204) {
        carrinho.value = {
          ...carrinho.value,
          [prod.id]: true
        };
      }
    }
  }

  // Função para alternar entre os favoritos
  function ativeFav(produtoId) {
    favoritos.value[produtoId] = !favoritos.value[produtoId];
  }

  watch(
    categoriaSelecionada,
    (novaCategoria, antigaCategoria) => {
      console.log('Categoria selecionada:', novaCategoria); // Verifique o valor da categoria
      if (novaCategoria && novaCategoria !== antigaCategoria) {
        getProdutosPorCategoria(novaCategoria);
      }
    },
    { immediate: true }
  );
  

  return {
    produtos,
    categorias,
    categoriaSelecionada,
    loading,
    error,
    favoritos,
    carrinho,
    getCategoria,
    getProdutosPorCategoria,
    converterParaDolar,
    toggleCarrinho,
    ativeFav
  };
},
{
  persist: {
    key: 'cart',
    storage: localStorage,
  }
}
);
