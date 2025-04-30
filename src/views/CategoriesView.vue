<script setup>
import { ref, onMounted, watch } from 'vue';
import { getCategories, getProductsByCategory, getImageUrl } from '@/services/http.js';
import { cartService } from '@/services/http.js';
import { push } from 'notivue';

const produtos = ref([]);
const categorias = ref([]);
const categoriaSelecionada = ref('');
const loading = ref(false);
const error = ref('');
const favoritos = ref({});
const carrinho = ref({});
const mostrarSelect = ref(false);

import ButtonComponent from '@/components/common/ButtonComponent.vue';
import CategoriesDeskTop from '@/components/pages/CategoriesDeskTop.vue';
import { useIsMobile } from '@/composable/useIsMobile';

const { isMobile } = useIsMobile();

function toggleSelect() {
  mostrarSelect.value = !mostrarSelect.value;
}

async function getCategoria() {
  loading.value = true;
  try {
    categorias.value = await getCategories();
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
    error.value = 'Erro ao carregar as categorias. Tente novamente mais tarde.';
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
    console.error('Erro ao carregar produtos:', err);
    error.value = 'Erro ao carregar os produtos. Tente novamente mais tarde.';
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
      delete carrinho.value[prod.id];
      push.success('Item removido do carrinho com sucesso!');
    } else {
      console.error('Erro ao remover item do carrinho:', response);
    }
  } else {
    const response = await cartService.addItemToCart({
      product_id: prod.id,
      quantity: 1,
      unit_price: prod.price
    });
    if (response.status === 204) {
      carrinho.value[prod.id] = true;
      push.success('Item adicionado ao carrinho com sucesso!');
    } else {
      console.error('Erro ao adicionar item ao carrinho:', response);
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
  <section v-if="isMobile">
    <div class="my-4 text-center">
      <button class="btn btn-primary" @click="toggleSelect">
        {{ mostrarSelect ? 'Ocultar Categorias' : 'Selecionar Categoria' }}
      </button>

      <div v-if="mostrarSelect" class="mt-3">

        <select class="form-select" v-model="categoriaSelecionada" :disabled="loading">
          <option value="">Escolha uma categoria</option>
          <option v-for="ctg in categorias" :key="ctg.id" :value="ctg.id">
            {{ ctg.name }}
          </option>
        </select>
      </div>
    </div>

    <div>
      <div v-if="loading" class="text-center m-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>

      <div v-else-if="produtos.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 px-3">
        <div class="col" v-for="prod in produtos" :key="prod.id">
          <div class="card h-100 shadow-sm">
            <router-link :to="`/product/${prod.id}`">
              <img :src="getImageUrl(prod.image_path)" class="card-img-top" alt="Imagem do produto" />
            </router-link>
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">{{ prod.name }}</h5>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <span class="text-success fw-bold">{{ converterParaDolar(prod.price) }}</span>
                <i @click="ativeFav(prod.id)" class="fs-5"
                  :class="favoritos[prod.id] ? 'bi bi-heart-fill text-danger' : 'bi bi-heart text-muted'"
                  role="button"></i>
              </div>
            </div>
            <div class="card-footer bg-white border-0 text-center">
              <ButtonComponent @click="toggleCarrinho(prod)"
                :title="carrinho[prod.id] ? 'Remove from Cart' : 'Add to Cart'"
                :style="carrinho[prod.id] ? 'red' : 'blue'"
                :icon="carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="d-flex justify-content-center mt-4 w-100">
    <CategoriesDeskTop />
  </section>
</template>

<style scoped>
.card-img-top {
  max-height: 200px;
  object-fit: cover;
}
</style>
