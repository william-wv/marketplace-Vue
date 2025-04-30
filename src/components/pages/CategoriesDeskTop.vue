<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '@/stores/produtos';
import { getImageUrl } from '@/services/http.js';




const store = useStore();

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
  <div class="container my-5">
    <!-- Filtro de Categoria -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <h2 class="fw-semibold m-0">Produtos</h2>
      <div>
        <select class="form-select form-select-sm w-auto" v-model="store.categoriaSelecionada"
          @change="paginaAtual = 1">
          <option disabled value="">Selecionar categoria</option>
          <option v-for="cat in store.categorias" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- Erro -->
    <div v-else-if="store.error" class="alert alert-danger text-center">{{ store.error }}</div>

    <!-- Produtos -->
    <div v-else-if="produtosPaginados.length > 0" class="row g-4">
      <div class="col-md-4" v-for="prod in produtosPaginados" :key="prod.id">
        <div class="card border-0 shadow-sm h-100">
          <router-link :to="`/product/${prod.id}`">  {{ console.log('produto:', prod) }}

            <img :src="getImageUrl(prod.image_path)" class="card-img-top" style="object-fit: cover; height: 220px;" />
          </router-link>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-3">{{ prod.name }}</h5>
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <span class="text-success fw-semibold">{{ store.converterParaDolar(prod.price) }}</span>
              <i :class="store.favoritos[prod.id] ? 'bi-heart-fill text-danger' : 'bi-heart'" style="cursor: pointer;"
                @click="store.ativeFav(prod.id)"></i>
            </div>
          </div>
          <div class="card-footer bg-white border-0">
            <button class="btn btn-sm w-100"
              :class="store.carrinho[prod.id] ? 'btn-outline-danger' : 'btn-outline-primary'"
              @click="store.toggleCarrinho(prod)">
              <i :class="store.carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'"></i>
              {{ store.carrinho[prod.id] ? 'Remover' : 'Adicionar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div v-if="produtosPaginados.length > 0" class="d-flex justify-content-center mt-4">
      <ul class="pagination pagination-sm">
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
    </div>

    <!-- Sem produtos -->
    <div v-else class="text-secondary py-5 text-center">
      <i class="bi bi-box-seam fs-1 mb-3"></i>
      <h5 class="fw-normal">Nenhum produto encontrado</h5>
      <p class="text-muted">Tente outra categoria ou volte mais tarde.</p>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-size: 1rem;
}

.card {
  border-radius: 0.75rem;
}

.card-footer .btn {
  border-radius: 0.5rem;
  font-weight: 500;
}

.bi-heart,
.bi-heart-fill {
  font-size: 1.3rem;
  transition: color 0.2s ease;
}
</style>
