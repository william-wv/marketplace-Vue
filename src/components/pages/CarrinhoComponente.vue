<script setup>
import { ref, onMounted, watch } from 'vue';
import { cartService, getProd , getImageUrl } from '@/services/http';

const carrinho = ref([]);
const produtos = ref([]);

async function getProducts() {
  try {
    const resposta = await getProd();
    produtos.value = resposta.data;
    console.log('Produtos carregados:', produtos.value);
  } catch (e) {
    console.error('Erro ao carregar os produtos:', e);
  }
}

async function carregarCarrinho() {
  try {
      const response = await cartService.getCartItems();
      carrinho.value = response.data.items;
      console.log('Carrinho carregado:', carrinho.value);
    
  } catch (error) {
    console.error('Erro ao carregar o carrinho:', error);
  }
}

function getNomeProduto(produtoId) {
  if (!produtos.value.length) return 'Carregando...';
  const produto = produtos.value.find(p => p.id === produtoId);
  return produto ? produto.name : 'Produto não encontrado';
}

async function excluirItem(produto) {
  try {
    await cartService.removeCartItem(produto.product_id, produto.quantity, produto.unit_price);
    // Removendo o item do carrinho localmente
    carrinho.value = carrinho.value.filter(item => item.product_id !== produto.product_id);
    console.log(`Item ${produto.product_id} removido com sucesso!`);
  } catch (error) {
    console.error('Erro ao excluir o item:', error);
  }
}


async function limparCarrinho() {
  try {
    await cartService.clearCart();
    carrinho.value = [];
    console.log('Carrinho limpo com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar o carrinho:', error);
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


watch(produtos, () => {
  carregarCarrinho();
}, { once: true });

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="">
    <h1>Meu Carrinho</h1>


    <div class="d-grid" v-if="carrinho.length && produtos.length">
      <div class="contain-card.contain-card d-flex" v-for="prodCarrinho in carrinho" :key="prodCarrinho.id">
        <div class="img-produto">
          <img :src="getImageUrl(prodCarrinho.image_path)" alt="Imagem do produto" />
        </div>
        <ul>
          <li>Nome: <br> {{ getNomeProduto(prodCarrinho.product_id) }}</li>
          <li>Quantidade:{{ prodCarrinho.quantity }}</li>
          <li>Valor: {{ converterParaDolar(prodCarrinho.unit_price) }}</li>

          <button @click="excluirItem(prodCarrinho)">Delete item</button>
        </ul>

      </div>
    </div>
    <div v-else>
      <p>O carrinho está vazio!</p>
    </div>

    <button @click="limparCarrinho()">Limpar Carrinho</button>
  </div>
</template>

<style scoped>
img {
  width: 200px;
  height: 200px;
}

li {
  color: var(--Gray-600);
}

ul {
  padding: 0;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}

.d-grid {
  display: grid;
  grid-template-columns: repeat(1fr, 1fr);
  gap: 30px;
}


</style>
