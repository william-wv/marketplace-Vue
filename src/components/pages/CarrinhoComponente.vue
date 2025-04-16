<script setup>
import { onMounted, ref } from 'vue';
import { useCartStore } from '@/stores/carrinho';
import { getImageUrl } from '@/services/http';

const cartStore = useCartStore();
const carregandoCarrinho = ref(true);

// Carregar dados ao montar
onMounted(async () => {
  await Promise.all([
    cartStore.getProducts(),
    cartStore.getItemsCart()
  ]);

  // console.log('Produtos:', cartStore.produtos);
  console.log('Carrinho:', cartStore.carrinho);

  carregandoCarrinho.value = false;
});

function converterParaDolar(precoBRL) {
  return cartStore.converterParaDolar(precoBRL);
}

function getNomeProduto(produtoId) {
  return cartStore.getNomeProduto(produtoId);
}

function alterarQuantidade(produtoId, operacao) {
  cartStore.alterarQuantidade(produtoId, operacao);
}

function excluirItem(prodCarrinho) {
  cartStore.removeItem(prodCarrinho.product_id);
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between m-3">
      <h1 style="font-size: 2.4rem; text-transform: uppercase;">Meu Carrinho</h1>
    </div>

    <!-- Carregando o carrinho -->
    <!-- <div v-if="carregandoCarrinho">
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
    </div> -->

    <!-- Produtos no carrinho -->
    <div v-if="cartStore.carrinho.values && cartStore.produtos.values" class="d-grid">
      <div class="contain-card d-flex" v-for="prodCarrinho in cartStore.carrinho" :key="prodCarrinho.product_id">
        <div class="img-produto d-flex align-items-center">
          <img :src="getImageUrl(prodCarrinho.image_path) || '/imagem-padrao.jpg'" alt="Imagem do produto" />
        </div>
        <div class="col-6">
          <ul>
            <li>Produto ID: {{ prodCarrinho.product_id }}</li>
            <li>Nome: <br> {{ getNomeProduto(prodCarrinho.product_id) }}</li>
            <li>Valor: {{ converterParaDolar(prodCarrinho.unit_price) }}</li>
          </ul>
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
          <h2>Total: {{ converterParaDolar(cartStore.totalPriceCart) }}</h2>
          <button @click="">Finalizar Compra</button>
        </div>
      </div>
    </div>

    <!-- Carrinho vazio -->
    <div v-else class="empty-cart d-flex flex-column align-items-center justify-content-center text-center p-5">
      <i class="bi bi-cart-x fs-1 text-muted mb-3"></i>
      <h3 class="mb-2">Seu carrinho está vazio!</h3>
      <p class="mb-4 text-secondary">Adicione itens ao carrinho para visualizar aqui.</p>
      <button class="btn btn-primary" @click="$router.push('/categories')">
        <i class="bi bi-box-seam me-2"></i> Explorar Produtos
      </button>
    </div>

  </div>
</template>

<style scoped>
/* Estilo das skeletons de carregamento */
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
  grid-template-columns: 1fr;
  gap: 30px;
}

.gerenciator-items {
  align-items: end !important;
  height: 100px;
}

.green {
  background-color: var(--Green-500);
  padding: 3px 10px;
  border-radius: 10px 0 0 10px;
}

.red {
  background-color: var(--Red-500);
  padding: 3px 10px;
  border-radius: 0 10px 10px 0;
}

.qtd {
  background-color: var(--White-200);
  padding: 5px 10px;
}
</style>
