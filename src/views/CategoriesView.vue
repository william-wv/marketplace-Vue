<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { getCategories, getProductsByCategory, getImageUrl } from '@/services/http.js'
import { cartService } from '@/services/http.js';
import { push } from 'notivue';

const produtos = ref([]);
const categorias = ref([]);
const categoriaSelecionada = ref('');
const loading = ref(false);
const error = ref('');
const favoritos = ref({});
const carrinho = ref({});

import ButtonComponent from '@/components/common/ButtonComponent.vue';
import CategoriesDeskTop from '@/components/pages/CategoriesDeskTop.vue';
import { useIsMobile } from '@/composable/useIsMobile';

const {isMobile} = useIsMobile()


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
      push.success('Item removido ao carrinho com sucesso!')
    } else {
      console.error('Erro ao remover item do carrinho:', response);
    }
  } else {
    // Adicionar ao carrinho
    const response = await cartService.addItemToCart({
      product_id: prod.id,
      quantity: 1,
      unit_price: prod.price
    });

    if (response.status === 204) {
      carrinho.value[prod.id] = true;
      push.success('Item adicionado ao carrinho com sucesso!')
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
    <div class="mt-4 mb-4 d-flex justify-content-evenly">
      <div>
        <label class="select-cat" for="categoria">Select a category:</label>
      </div>
      <div>
        <select class="selet-cat" v-model="categoriaSelecionada" id="categoria" :disabled="loading">
          <option value="">Choose a category</option>
          <option v-for="ctg in categorias" :key="ctg.id" :value="ctg.id">
            {{ ctg.name }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
      </div>

      <section v-if="error" class="error-message">{{ error }}</section>

      <section v-else-if="produtos.length > 0" class="card card-categ mb-5">
        <div v-for="prod in produtos" :key="prod.id" class="div-categ">

          <div class="contain-card ">
            <div class="div-img d-flex justify-content-center">
              <img :src="getImageUrl(prod.image_path)" alt="Imagem do produto" />
            </div>

            <div class="texts">
              <div>
                <p class="p-name"><b>{{ prod.name }}</b></p>
                <h2 class="p-desc">{{ prod.description }}</h2>
              </div>
              <div class="price d-flex">
                <div>
                  <p class="p-price">{{ converterParaDolar(prod.price) }}</p>
                </div>
                <div @click="ativeFav(prod.id)" class="i-fav">
                  <i class="i-favorite" :class="favoritos[prod.id] ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="div-btn">
            <ButtonComponent @click="toggleCarrinho(prod)"
              :title="carrinho[prod.id] ? 'Remove from Cart' : 'Add to Cart'"
              :style="carrinho[prod.id] ? 'red' : 'blue'"
              :icon="carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'" />
          </div>
        </div>
      </section>

      <p v-else>Não há produtos para esta categoria.</p>
    </div>
  </section>

  <section v-else-if="!isMobile">
    <CategoriesDeskTop/>
  </section>
</template>

<style scoped>
/* Animação de rotação do spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  color: red;
  font-size: 16px;
}

.div-img {
  width: 100%;
}

p,
h1 {
  color: black;
  font-size: 1.5rem;
}

h2 {
  font-size: 1rem;
  color: var(--text-h2);
}

.select-cat {
  font-size: 1.5rem;
}

.selet-cat {
  padding: 10px !important;
  border-radius: 10px !important;
}

.card-categ {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 20px 30px;
  gap: 10px;
}

.div-categ {
  padding: 5px;
  border-radius: 10px;
  border: 1px solid var(--Gray-600);
}

.img-txts {
  display: flex;
}

.texts {
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
}

.price {
  align-self: end;
  display: flex;
  justify-content: space-between;
}

img {
  width: 100%;
  max-width: 150px;
  height: auto;
}



.i-fav {
  padding: 5px;
  background-color: var(--White-100);
  border-radius: 50%;
  cursor: pointer;
}

.bi-heart-fill {
  color: var(--Red-500) !important;
}

.btn {
  background-color: var(--Blue-500);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.div-btn {
  width: 100%;
  background-color: white;
  padding: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.div-btn button {
  flex: 1;
  width: 100%;
  max-width: 400px;
}

@media (min-width: 768px) {
  .card-categ {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-categ {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>