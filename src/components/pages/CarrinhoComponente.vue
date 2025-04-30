<script setup>
import { onMounted, ref } from 'vue';
import { useCartStore } from '@/stores/carrinho';
import { getImageUrl } from '@/services/http';
import ButtonComponent from '../common/ButtonComponent.vue';
import CardCartPay from '../layout/CardCartPay.vue';
import CardLoc from '../layout/CardLoc.vue';
import useAuthStore from '@/stores/auth';


const auth = useAuthStore()
console.log(auth.token)

const cartStore = useCartStore();
const carregandoCarrinho = ref(true);

const idEnderecoSelecionado = ref(0);

function atualizarEndereco(id) {
  idEnderecoSelecionado.value = id;
}

onMounted(async () => {
  await Promise.all([
    cartStore.getProducts(),
    cartStore.getItemsCart()
  ]);

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

function excluirCartAlls() {
  cartStore.clearCartAll();
}
</script>
<template>
  <div class="container py-4">
    <div class=" d-flex justify-content-between align-items-center mb-4">
      <h1 class="fs-2 text-uppercase fw-bold">
        My Cart
        <span  class=" p-2 text-primary rounded-circle">{{ cartStore.carrinho.length }}</span>
      </h1>
      <ButtonComponent :icon="'bi bi-trash-fill'" :title="'Clear All'" :class="'red'" @click="excluirCartAlls" />
    </div>

    <div v-if="cartStore.carrinho.length > 0">
      <div class="row">
        <div class="col-12" v-for="prodCarrinho in cartStore.carrinho" :key="prodCarrinho.product_id">
          <div class="card shadow-sm mb-3 d-flex flex-row align-items-start">
            <div class="me-3">
              <img class="img-fluid rounded" :src="getImageUrl(prodCarrinho.image_path) || '/imagem-padrao.jpg'"
                alt="Product image" style="width: 130px; height: 130px; object-fit: cover;" />
            </div>
            <div class="flex-grow-1 mt-3">
              <ul class="list-unstyled mb-2">
                <li class="text-black"><strong>Name:</strong> {{ getNomeProduto(prodCarrinho.product_id) }}</li>
                <li class="text-black"><strong>Unit Price:</strong> {{ converterParaDolar(prodCarrinho.unit_price) }}
                </li>
              </ul>
              <div class="d-flex justify-content-between align-items-center">
                <i class="bi bi-trash fs-4 text-danger" role="button" @click="excluirItem(prodCarrinho)"></i>
                <div class="d-flex">
                  <button class="btn btn-sm btn-success me-1"
                    @click="alterarQuantidade(prodCarrinho.product_id, 'incrementar')">+</button>
                  <span class="border px-3 py-1 fw-bold bg-light">{{ prodCarrinho.quantity }}</span>
                  <button class="btn btn-sm btn-danger ms-1"
                    @click="alterarQuantidade(prodCarrinho.product_id, 'decrementar')">−</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Address and Payment -->
      <CardLoc @selecionar-endereco="atualizarEndereco" />
      <CardCartPay :idEndereco="idEnderecoSelecionado" />
    </div>

    <!-- Empty cart -->
    <div v-else class="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <i class="bi bi-cart-x display-4 text-muted mb-3"></i>
      <h3 class="mb-2">Your cart is empty!</h3>
      <p class="text-secondary mb-4">Add items to your cart to view them here.</p>
      <button class="btn btn-primary" @click="$router.push('/categories')">
        <i class="bi bi-box-seam me-2"></i> Browse Products
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 0.75rem;
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  font-size: 1rem;
}

.bi-trash {
  cursor: pointer;
  transition: color 0.2s ease;
}

.bi-trash:hover {
  color: #dc3545;
}

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
</style>
