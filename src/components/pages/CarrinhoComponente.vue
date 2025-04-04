<script setup>
import { ref, onMounted, watch } from 'vue';
import { cartService, getProd, getImageUrl } from '@/services/http';

const carrinho = ref([]);
const produtos = ref([]);
const total_amount = ref(0)
const carregandoCarrinho = ref(false);

async function carregarCarrinho() {
  carregandoCarrinho.value = true;
  try {
    const response = await cartService.getCartItems();
    carrinho.value = response.data.items;
    console.log('Carrinho carregado:', carrinho.value);

  } catch (error) {
    console.error('Erro ao carregar o carrinho:', error);
  } finally {
    carregandoCarrinho.value = false; 
  }
}

async function getProducts() {
  try {
    const resposta = await getProd();
    produtos.value = resposta.data;
    console.log('Produtos carregados:', produtos.value);
  } catch (e) {
    console.error('Erro ao carregar os produtos:', e);
  }
}

function getNomeProduto(produtoId) {
  if (!produtos.value.length) return 'Carregando...';
  const produto = produtos.value.find(p => p.id === produtoId);
  return produto ? produto.name : 'Produto não encontrado';
}

async function totalCart() {
  try {
    const response = await cartService.getCartItems();
    total_amount.value = response.data.total_amount;
    console.log('total do carrinho carregado:', total_amount.value);
  } catch (error) {
    console.error('Erro ao carregar o total do carrinho:', error);
  }
}

async function excluirItem(produto) {
  try {
    await cartService.removeCartItem(produto.product_id, produto.quantity, produto.unit_price);
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

function alterarQuantidade(produtoId, operacao) {
  const produtoNoCarrinho = carrinho.value.find(item => item.product_id === produtoId);
  const produtoEstoque = produtos.value.find(produto => produto.id === produtoId);

  if (!produtoNoCarrinho || !produtoEstoque) return;

  if (operacao === 'incrementar') {
    if (produtoNoCarrinho.quantity < produtoEstoque.stock) {
      produtoNoCarrinho.quantity++;
      total_amount.value += produtoNoCarrinho.unit_price;
    } else {
      console.warn('Estoque máximo atingido para este produto!');
    }
  } else if (operacao === 'decrementar') {
    if (produtoNoCarrinho.quantity > 1) {
      produtoNoCarrinho.quantity--;
      total_amount.value -= produtoNoCarrinho.unit_price;
    } else {
      console.warn('Quantidade mínima atingida!');
    }
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

onMounted(async () => {
  await Promise.all([getProducts(), carregarCarrinho(), totalCart()]);
});


</script>

<template>
  <div class="">
    <div class="d-flex justify-content-between m-3">
      <h1 style="font-size: 2.4rem; text-transform: uppercase;">Meu Carrinho</h1>
      <button v-if=" carrinho.length" @click="limparCarrinho()">Limpar Carrinho
      </button>
    </div>
    <div v-if="carregandoCarrinho">
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
    </div>

    <div class="d-grid" v-if="carrinho.length && produtos.length">
      <div class="contain-card d-flex" v-for="prodCarrinho in carrinho" :key="prodCarrinho.id">
        <div class="img-produto d-flex align-items-center">
          <img :src="getImageUrl(prodCarrinho.image_path)" alt="Imagem do produto" />
        </div>
        <div class="col-6">
          <div>
            <ul>
              <li>Nome: <br> {{ getNomeProduto(prodCarrinho.product_id) }}</li>
              <li>Valor: {{ converterParaDolar(prodCarrinho.unit_price) }}</li>
            </ul>
          </div>
          <div class="gerenciator-items d-flex justify-content-between ">
            <div @click="excluirItem(prodCarrinho)" style="font-size: 1.5rem;" class="bi bi-trash"></div>
            <div class="d-flex cart">
              <span class="green" @click="alterarQuantidade(prodCarrinho.product_id, 'incrementar')"> + </span>
              <span class="qtd">{{ prodCarrinho.quantity }}</span>
              <span class="red" @click="alterarQuantidade(prodCarrinho.product_id, 'decrementar')"> - </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="d-flex justify-content-between m-3">
          <h2>Total: {{ converterParaDolar(total_amount) }}</h2>
          <button @click="">Finalizar Compra
          </button>

        </div>
      </div>
    </div>


    <div v-else-if="!carregandoCarrinho && !carrinho.length" class="empty-cart">
      <h3>Seu carrinho está vazio!</h3>
      <p>Adicione itens ao carrinho para visualizar aqui.</p>
      <button @click="$router.push('/categories')">Explorar Produtos</button>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  width: 100%;
  height: 120px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 10px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

img {
  width: 150px;
  height: 150px;
  display: flex;
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
  border-radius: 15px;
}


button:hover {
  background-color: darkred;
}

.d-grid {
  display: grid;
  grid-template-columns: repeat(1fr, 1fr);
  gap: 30px;
}



.gerenciator-items {
  align-items: end !important;
  height: 100px;
}

.green {
  background-color: var(--Green-500);
  padding: 3px 10px;
  border-radius: 10px 0px 0px 10px;
}

.red {
  background-color: var(--Red-500);
  padding: 3px 10px;
  border-radius: 0px 10px 10px 0px;
}

.qtd {
  background-color: var(--White-200);
  padding: 5px 10px;
}
</style>
