o
<script setup>
import { ref, onMounted, watch } from 'vue';
import { getCategories, getProductsByCategory } from '@/services/http.js'
// import { useCartStore } from '@/stores/produtos.js';
import { cartService } from '@/services/http.js';
import ButtonComponent from '@/components/common/ButtonComponent.vue';

const categorias = ref([]);
const produtos = ref([]);
const categoriaSelecionada = ref('');

const loading = ref(false);
const error = ref('');

const favoritos = ref({});

// const produtos = useCartStore()

async function getCategoria() {
  loading.value = true;
  try {
    const response = await getCategories();
    categorias.value = response;
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
    const response = await getProductsByCategory(idCateg);
    produtos.value = response;
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
    error.value = 'Erro ao carregar os produtos. Tente novamente mais tarde.';
  } finally {
    loading.value = false;
  }
}

function getImageUrl(imagePath) {
  if (!imagePath) {
    return '/placeholder.jpg';
  }
  if (imagePath.startsWith('/uploads/products/')) {
    return `http://35.196.79.227:8000${imagePath}`;
  }
  return `http://35.196.79.227:8000/uploads/products/${imagePath}`;
}

const taxaDeCambio = ref(0.17);
function converterParaDolar(precoBRL) {
  if (!precoBRL) return '$ 0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(precoBRL * taxaDeCambio.value);
}

async function adcShop(prod) {
  try {
    // Se o carrinho ainda não foi carregado, busca os itens
    if (!produtos.value || produtos == []) {
      console.log('Carregando carrinho...');
      const criar = await cartService.getCart();
      produtos.value = criar.data.items || [];
      console.log('Carrinho carregado:', produtos.value);
    }

    console.log(`Adicionando produto ${prod.name} ao carrinho...`);
    
    // Adiciona o item ao carrinho
    const response = await cartService.addItemToCart({
      product_id: prod.id,
      quantity: 1,
      unit_price: prod.price
    });

    console.log('Resposta da API:', response);


  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
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
  <div class="mt-4 mb-4 d-flex justify-content-evenly">
    <div>
      <label for="categoria">Select a category:</label>
    </div>
    <div>
      <select v-model="categoriaSelecionada" id="categoria" :disabled="loading">
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
        <div class="img-txts">
          <div class="div-img d-flex justify-content-center">
            <img :src="getImageUrl(prod.image_path)" alt="Imagem do produto" />
          </div>

          <div class="texts">
            <div>
              <p>
                <b>{{ prod.name }}</b>
              </p>
              <h2>{{ prod.description }}</h2>
            </div>
            <div class="price d-flex">
              <div>
                <p>{{ converterParaDolar(prod.price) }}</p>
              </div>
              <div @click="ativeFav(prod.id)" class="i-fav">
                <i class="i-favorite" :class="favoritos[prod.id] ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="div-btn d-flex justify-content-between">
          <ButtonComponent @click="adcShop(prod)" :title="'Add to Cart'" :style="'blue'" :icon="'bi bi-cart'" />
        </div>
      </div>
    </section>

    <p v-else>Não há produtos para esta categoria.</p>
  </div>
</template>

<style scoped>
/* Estilos para o spinner de loading */
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--Blue-700);
  z-index: 1;
}

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
}

h2 {
  font-size: 0.8rem;
  color: var(--text-h2);
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

.i-favorite {
  display: flex;
  align-items: center;
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
