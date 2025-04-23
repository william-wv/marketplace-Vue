<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '@/stores/produtos';
import { getImageUrl } from '@/services/http.js';

const store = useStore();

// Paginação de produtos
const paginaAtual = ref(1);
const itensPorPagina = 6;

const totalPaginas = computed(() => {
  return Math.ceil(store.produtos.length / itensPorPagina);
});

const produtosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina;
  return store.produtos.slice(inicio, inicio + itensPorPagina);
});

function mudarPagina(pagina) {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaAtual.value = pagina;
  }
}

// Paginação de categorias
const paginaCategoriaAtual = ref(1);
const categoriasPorPagina = 8;

const totalPaginasCategorias = computed(() => {
  return Math.ceil(store.categorias.length / categoriasPorPagina);
});

const categoriasPaginadas = computed(() => {
  const inicio = (paginaCategoriaAtual.value - 1) * categoriasPorPagina;
  return store.categorias.slice(inicio, inicio + categoriasPorPagina);
});

function mudarPaginaCategoria(pagina) {
  if (pagina >= 1 && pagina <= totalPaginasCategorias.value) {
    paginaCategoriaAtual.value = pagina;
  }
}

async function getCategoria() {
  await store.getCategoria();
}

watch(
  store.categoriaSelecionada,
  async (novaCategoria, antigaCategoria) => {
    if (novaCategoria && novaCategoria !== antigaCategoria) {
      paginaAtual.value = 1;
      await store.getProdutosPorCategoria(novaCategoria);
    }
  },
  { immediate: true }
);

onMounted(() => {
  getCategoria();
});
</script>

<template>
  <div class="container mt-4 mb-5">
    <div class="row mb-4">
      <div class="d-flex justify-content-center">
        <span style="width: 300px;" class="bg-primary mb-4 p-2 rounded-pill text-white">
          <h1 class="text-center text-uppercase">Categorias</h1>
        </span>
      </div>

      <!-- Categorias com Paginação -->
      <div v-for="cat in categoriasPaginadas" :key="cat.id" class="col-md-3 mb-2">
        <button class="btn w-100" :class="store.categoriaSelecionada === cat.id ? 'btn-primary' : 'btn-outline-primary'"
          @click="store.categoriaSelecionada = cat.id">
          {{ cat.name }}
        </button>
      </div>

      <!-- Controles de Paginação das Categorias -->
      <div class="d-flex justify-content-center mt-3">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: paginaCategoriaAtual === 1 }">
              <button class="page-link" @click="mudarPaginaCategoria(paginaCategoriaAtual - 1)">Anterior</button>
            </li>
            <li class="page-item" v-for="page in totalPaginasCategorias" :key="page"
              :class="{ active: paginaCategoriaAtual === page }">
              <button class="page-link" @click="mudarPaginaCategoria(page)">
                {{ page }}
              </button>
            </li>
            <li class="page-item" :class="{ disabled: paginaCategoriaAtual === totalPaginasCategorias }">
              <button class="page-link" @click="mudarPaginaCategoria(paginaCategoriaAtual + 1)">Próxima</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Produtos -->
    <div v-if="store.loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="store.error" class="alert alert-danger">{{ store.error }}</div>

    <div v-else-if="produtosPaginados.length > 0" class="row">
      <div v-for="prod in produtosPaginados" :key="prod.id" class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img :src="getImageUrl(prod.image_path)" class="card-img-top" alt="Imagem do produto"
            style="object-fit: cover; height: 200px;" />
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">{{ prod.name }}</h5>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="text-success fw-bold">{{ store.converterParaDolar(prod.price) }}</span>
              <i :class="store.favoritos[prod.id] ? 'bi-heart-fill text-danger' : 'bi-heart'" style="cursor: pointer;"
                @click="store.ativeFav(prod.id)"></i>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0 text-center">
            <button class="btn w-100" :class="store.carrinho[prod.id] ? 'btn-danger' : 'btn-success'"
              @click="store.toggleCarrinho(prod)">
              <i :class="store.carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'"></i>
              {{ store.carrinho[prod.id] ? 'Remover do Carrinho' : 'Adicionar ao Carrinho' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Paginação de Produtos -->
      <div class="d-flex justify-content-center mt-4">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: paginaAtual === 1 }">
              <button class="page-link" @click="mudarPagina(paginaAtual - 1)">Anterior</button>
            </li>
            <li class="page-item" v-for="page in totalPaginas" :key="page" :class="{ active: paginaAtual === page }">
              <button class="page-link" @click="mudarPagina(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: paginaAtual === totalPaginas }">
              <button class="page-link" @click="mudarPagina(paginaAtual + 1)">Próxima</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div v-else class=" text-secondary py-5 ">
      <div class="d-flex flex-column align-items-center justify-content-center height">
        <i class="bi bi-box-seam fs-1 mb-3"></i>
        <h5 class="mb-2">Nenhum produto encontrado</h5>
        <p class="text-muted">Não há produtos disponíveis nesta categoria no momento.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.height {
  height: 50svh;
}

.bi-heart,
.bi-heart-fill {
  font-size: 1.4rem;
}
</style>
