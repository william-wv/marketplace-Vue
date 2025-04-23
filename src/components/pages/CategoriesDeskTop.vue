<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '@/stores/produtos';
import CategoriesList from '../home/CategoriesList.vue';
import ProdutoGrid from '../home/ProdutoGrid.vue';

const store = useStore();

const paginaAtual = ref(1);
const itensPorPagina = 6;

const paginaCategoriaAtual = ref(1);
const categoriasPorPagina = 8;

const totalPaginas = computed(() =>
  Math.ceil(store.produtos.length / itensPorPagina)
);

const totalPaginasCategorias = computed(() =>
  Math.ceil(store.categorias.length / categoriasPorPagina)
);

const produtosPaginados = computed(() => {
  const start = (paginaAtual.value - 1) * itensPorPagina;
  return store.produtos.slice(start, start + itensPorPagina);
});

const categoriasPaginadas = computed(() => {
  const start = (paginaCategoriaAtual.value - 1) * categoriasPorPagina;
  return store.categorias.slice(start, start + categoriasPorPagina);
});

function mudarPagina(pagina) {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaAtual.value = pagina;
  }
}

function mudarPaginaCategoria(pagina) {
  if (pagina >= 1 && pagina <= totalPaginasCategorias.value) {
    paginaCategoriaAtual.value = pagina;
  }
}

async function getCategoria() {
  await store.getCategoria();
}

watch(
  () => store.categoriaSelecionada,
  async (nova, antiga) => {
    if (nova && nova !== antiga) {
      paginaAtual.value = 1;
      await store.getProdutosPorCategoria(nova);
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
        <span style="width: 300px;" class="bg-primary mb-4 p-2 rounded-pill text-white">
          <h1 class="text-center text-uppercase">Categorias</h1>
        </span>
      </div>
      <CategoriesList
        :categorias="categoriasPaginadas"
        :categoriaSelecionada="store.categoriaSelecionada"
        :paginaAtual="paginaCategoriaAtual"
        :totalPaginas="totalPaginasCategorias"
        @selecionarCategoria="store.categoriaSelecionada = $event"
        @mudarPagina="mudarPaginaCategoria"
      />
    </div>

    <ProdutoGrid
      :produtos="produtosPaginados"
      :paginaAtual="paginaAtual"
      :totalPaginas="totalPaginas"
      :loading="store.loading"
      :error="store.error"
      @mudarPagina="mudarPagina"
    />
  </div>
</template>
