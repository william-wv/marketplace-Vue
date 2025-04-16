<script setup>
import { onMounted, watch } from 'vue';
import { useStore } from '@/stores/produtos'; 
import { getImageUrl } from '@/services/http.js';

const store = useStore(); // Crie uma instância da store

async function getCategoria() {
  await store.getCategoria();
}

watch(
  store.categoriaSelecionada,
  (novaCategoria, antigaCategoria) => {
    if (novaCategoria && novaCategoria !== antigaCategoria) {
      store.getProdutosPorCategoria(novaCategoria);
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
      <div class="d-flex justify-content-center">
        <span style="width: 300px;" class="bg-primary mb-4 p-2 rounded-pill text-white"><h1 class="text-center text-uppercase">Categorias</h1></span>
      </div>
      <div
        v-for="cat in store.categorias"
        :key="cat.id"
        class="col-md-3 mb-2"
      >
        <button
          class="btn w-100"
          :class="store.categoriaSelecionada === cat.id ? 'btn-primary' : 'btn-outline-primary'"
          @click="store.categoriaSelecionada = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div v-if="store.loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="store.error" class="alert alert-danger">{{ store.error }}</div>

    <div v-else-if="store.produtos.length > 0" class="row">
      <div
        v-for="prod in store.produtos"
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
              <span class="text-success fw-bold">{{ store.converterParaDolar(prod.price) }}</span>
              <i
                class="bi"
                :class="store.favoritos[prod.id] ? 'bi-heart-fill text-danger' : 'bi-heart'"
                style="cursor: pointer;"
                @click="store.ativeFav(prod.id)"
              ></i>
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0 text-center">
            <button
              class="btn w-100"
              :class="store.carrinho[prod.id] ? 'btn-danger' : 'btn-success'"
              @click="store.toggleCarrinho(prod)"
            >
              <i :class="store.carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'"></i>
              {{ store.carrinho[prod.id] ? 'Remover do Carrinho' : 'Adicionar ao Carrinho' }}
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
