<script setup>
import { ref, onMounted, watch } from 'vue';
import { getCategories, getProductsByCategory, getImageUrl } from '@/services/http.js';
import { cartService } from '@/services/http.js';

const produtos = ref([]);
const categorias = ref([]);
const categoriaSelecionada = ref('');
const loading = ref(false);
const error = ref('');
const favoritos = ref({});
const carrinho = ref({});

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

async function getProdutosPorCategoria(idCateg) {
  loading.value = true;
  error.value = '';
  produtos.value = [];
  try {
    produtos.value = await getProductsByCategory(idCateg);
  } catch (err) {
    error.value = 'Erro ao carregar os produtos.';
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

function ativeFav(produtoId) {
  favoritos.value[produtoId] = !favoritos.value[produtoId];
}

watch(
  categoriaSelecionada,
  (novaCategoria, antigaCategoria) => {
    if (novaCategoria && novaCategoria !== antigaCategoria) {
      getProdutosPorCategoria(novaCategoria);
    }
  },
  { immediate: true }
);

onMounted(() => {
  getCategoria();
});
</script>

<template>
  <div class="container mt-4">
    <div class="row mb-4">
      <div
        v-for="cat in categorias"
        :key="cat.id"
        class="col-md-3 mb-2"
      >
        <button
          class="btn w-100"
          :class="categoriaSelecionada === cat.id ? 'btn-primary' : 'btn-outline-primary'"
          @click="categoriaSelecionada = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else-if="produtos.length > 0" class="row">
      <div
        v-for="prod in produtos"
        :key="prod.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="getImageUrl(prod.image_path)"
            class="card-img-top"
            alt="Imagem do produto"
            style="object-fit: cover; height: 200px;"
          />
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">{{ prod.name }}</h5>
              <p class="card-text">{{ prod.description }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="text-success fw-bold">{{ converterParaDolar(prod.price) }}</span>
              <i
                class="bi"
                :class="favoritos[prod.id] ? 'bi-heart-fill text-danger' : 'bi-heart'"
                style="cursor: pointer;"
                @click="ativeFav(prod.id)"
              ></i>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0 text-center">
            <button
              class="btn w-100"
              :class="carrinho[prod.id] ? 'btn-danger' : 'btn-success'"
              @click="toggleCarrinho(prod)"
            >
              <i :class="carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'"></i>
              {{ carrinho[prod.id] ? 'Remover do Carrinho' : 'Adicionar ao Carrinho' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-muted">Não há produtos nesta categoria.</div>
  </div>
</template>

<style scoped>
.bi-heart, .bi-heart-fill {
  font-size: 1.4rem;
}
</style>
