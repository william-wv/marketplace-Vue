import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { getProd, cartService } from '@/services/http';
import { useStore } from './produtos';
 const prd = useStore()

export const useCartStore = defineStore('cart', () => {
  const produtos = prd.produtos; 
  const carrinho = ref([]);
  const totalPriceCart = ref(0); 
  const carregandoCarrinho = ref(true);
  const taxaDeCambio = ref(0.17); 

  function atualizarTotal() {
    totalPriceCart.value = carrinho.value.reduce((total, item) => {
      return total + item.unit_price * item.quantity;
    }, 0);
  }

  async function getProducts() {
    try {
      const resposta = await getProd();
      produtos.value = resposta || [];
      // console.log(produtos.value)
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
    }
  }

  async function getItemsCart() {
    try {
      const resposta = await cartService.getCartItems();
      carrinho.value = resposta.data.items
      // console.log(carrinho.value)
    } catch (error) {
      console.error('Erro ao carregar os itens do carrinho:', error);
      carrinho.value = []; 
    }
  }

  async function removeItem(id) {
    try {
      await cartService.removeCartItem(id);
      carrinho.value = carrinho.value.filter(item => item.product_id !== id);
      atualizarTotal();
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  }

  async function clearCarts(id) {
    try {
      const resposta = await cartService.clearCart(id);
      carrinho.value = [];
      atualizarTotal();
      console.log(resposta.status);
    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error);
    }
  }

  function alterarQuantidade(produtoId, operacao) {
    const produtoNoCarrinho = carrinho.value.find(item => item.product_id === produtoId);
    const produtoEstoque = produtos.value.find(produto => produto.id === produtoId);

    if (!produtoNoCarrinho || !produtoEstoque) return;

    if (operacao === 'incrementar' && produtoNoCarrinho.quantity < produtoEstoque.stock) {
      produtoNoCarrinho.quantity++;
    } else if (operacao === 'decrementar' && produtoNoCarrinho.quantity > 1) {
      produtoNoCarrinho.quantity--;
    }
    atualizarTotal();
  }

  function getNomeProduto(produtoId) {
    if (!produtos.value) return 'Carregando...';
    const produto = produtos.value.find(p => p.id === produtoId);
    return produto ? produto.name : 'Produto não encontrado';
  }


  function converterParaDolar(precoBRL) {
    if (!precoBRL) return '$ 0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(precoBRL * taxaDeCambio.value);
  }


  onMounted(() => {
    getProd()
  })

  return {
    produtos,
    carrinho,
    totalPriceCart,
    carregandoCarrinho,
    taxaDeCambio,
    getProducts,
    getItemsCart,
    removeItem,
    clearCarts,
    alterarQuantidade,
    getNomeProduto,
    converterParaDolar,
  };
}, {
  persist: {
    key: 'cart',
    storage: localStorage, 
  },
});
