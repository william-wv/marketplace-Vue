<script setup>
import { ref, onMounted, watch } from 'vue';
import { getCategories, getProductsByCategory, getImageUrl } from '@/services/http.js'
import { cartService } from '@/services/http.js';

const produtos = ref([]);
const categorias = ref([]);
const categoriaSelecionada = ref('');
const loading = ref(false);
const error = ref('');
const favoritos = ref({});
const carrinho = ref({}); 

import ButtonComponent from '@/components/common/ButtonComponent.vue';

async function getCategoria() {
  loading.value = true;
  try {
    categorias.value = await getCategories();
    if (categorias.value.length > 0) {
      categoriaSelecionada.value = categorias.value[0].id;
    }
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
    // Remover do carrinho
    const response = await cartService.removeItemFromCart(prod.id);
    if (response.status === 204) {
      delete carrinho.value[prod.id];
      console.log('Item removido do carrinho com sucesso!');
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
      console.log('Item adicionado ao carrinho com sucesso!');
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
<section class="categorias-grid mb-4 mt-5">
  <div
    v-for="cat in categorias"
    :key="cat.id"
    class="card-categoria"
    @click="categoriaSelecionada = cat.id"
    :class="{ active: categoriaSelecionada === cat.id }"
  >
    <p>{{ cat.name }}</p>
  </div>
</section>

  <div>
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>

    <section v-if="error" class="error-message">{{ error }}</section>

    <section v-else-if="produtos.length > 0" class=" card-categ mb-5">
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
          <ButtonComponent
            @click="toggleCarrinho(prod)"
            :title="carrinho[prod.id] ? 'Remove from Cart' : 'Add to Cart'"
            :style="carrinho[prod.id] ? 'red' : 'blue'"
            :icon="carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'"
          />
        </div>
      </div>
    </section>

    <p v-else>Não há produtos para esta categoria.</p>
  </div>
</template>

<style scoped>
.categorias-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.card-categoria {
  background-color: #f9f9f9;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  min-width: 150px;
}

.card-categoria:hover { 
  background-color: #eaeaea;
}

.card-categoria.active {
  border-color: var(--Blue-500);
  background-color: #d0e8ff;
}
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

.select-cat{
  font-size: 1.5rem;
}

.selet-cat{
  padding: 10px !important;
  border-radius: 10px !important;
}

.card-categ {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 30px !important;
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
  height: 200px !important;
}

.i-fav {
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

@media (min-width: 1440px) {
  .card-categ {
    grid-template-columns: repeat(3, 2fr);
  }
}
</style>