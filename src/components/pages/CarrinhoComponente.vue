<script setup>
import { onMounted, ref } from 'vue';
import { useCartStore } from '@/stores/carrinho';
import { getImageUrl } from '@/services/http';
import ButtonComponent from '../common/ButtonComponent.vue';
import InnputName from '../common/InnputName.vue';
import CardCartPay from '../layout/CardCartPay.vue';
import CardLoc from '../layout/CardLoc.vue';

const cartStore = useCartStore();
const carregandoCarrinho = ref(true);

const idEnderecoSelecionado = ref(null);

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
    <!-- Título -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class=" text-uppercase fw-bold">Meu Carrinho <span
          class=" bg-primary p-2 pt-0 pb-0 text-white rounded-circle">{{ cartStore.carrinho.length }}</span>
      </h1>
      <ButtonComponent :icon="'bi bi-trash-fill'" :title="'Clear All'" :class="'red'" @click="excluirCartAlls()" />
    </div>


    <!-- <div v-if="carregandoCarrinho" class="mb-4">
      <div class="skeleton-card mb-3"></div>
      <div class="skeleton-card"></div>
    </div> -->

    <!-- Carrinho com produtos -->
    <div v-if="cartStore.carrinho.length > 0">
      <div class="row">
        <div class="col-12" v-for="prodCarrinho in cartStore.carrinho" :key="prodCarrinho.product_id">
          <div class="card shadow-sm p-3 d-flex flex-row align-items-start">
            <div class="me-3">
              <img class="img-fluid rounded" style="width: 130px; height: 130px; object-fit: cover;"
                :src="getImageUrl(prodCarrinho.image_path) || '/imagem-padrao.jpg'" alt="Imagem do produto" />
            </div>
            <div class="flex-grow-1">
              <ul class="list-unstyled mb-2">
                <li class="text-dark"><strong>ID:</strong> {{ prodCarrinho.product_id }}</li>
                <li class="text-dark"><strong>Nome:</strong> {{ getNomeProduto(prodCarrinho.product_id) }}</li>
                <li class="text-dark"><strong>Preço:</strong> {{ converterParaDolar(prodCarrinho.unit_price) }}</li>
              </ul>
              <div class="d-flex justify-content-between align-items-center">
                <i class="bi bi-trash fs-4 text-danger" role="button" @click="excluirItem(prodCarrinho)"></i>
                <div class="d-flex">
                  <span class="bg-success text-white px-3 py-1 rounded-start"
                    @click="alterarQuantidade(prodCarrinho.product_id, 'incrementar')">+</span>
                  <span class="border px-3 py-1 fw-bold bg-light">{{ prodCarrinho.quantity }}</span>
                  <span class="bg-danger text-white px-3 py-1 rounded-end"
                    @click="alterarQuantidade(prodCarrinho.product_id, 'decrementar')">−</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardLoc @selecionar-endereco="atualizarEndereco" />
      <CardCartPay :idEndereco="idEnderecoSelecionado" />

    </div>

    <!-- Carrinho vazio -->
    <div v-else class="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <i class="bi bi-cart-x display-4 text-muted mb-3"></i>
      <h3 class="mb-2">Seu carrinho está vazio!</h3>
      <p class="mb-4 text-secondary">Adicione itens ao carrinho para visualizar aqui.</p>
      <button class="btn btn-primary" @click="$router.push('/categories')">
        <i class="bi bi-box-seam me-2"></i> Explorar Produtos
      </button>
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

</style>
