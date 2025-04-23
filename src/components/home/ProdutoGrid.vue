<template>
  <div>
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else-if="produtos.length > 0" class="row">
      <div v-for="prod in produtos" :key="prod.id" class="col-md-4 mb-4">
        <ProdutoCard :prod="prod" />
      </div>

      <div class="d-flex justify-content-center mt-4">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: paginaAtual === 1 }">
              <button class="page-link" @click="$emit('mudarPagina', paginaAtual - 1)">Anterior</button>
            </li>
            <li class="page-item" v-for="page in totalPaginas" :key="page" :class="{ active: paginaAtual === page }">
              <button class="page-link" @click="$emit('mudarPagina', page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: paginaAtual === totalPaginas }">
              <button class="page-link" @click="$emit('mudarPagina', paginaAtual + 1)">Próxima</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div v-else class="text-secondary py-5 text-center">
      <i class="bi bi-box-seam fs-1 mb-3"></i>
      <h5 class="mb-2">Nenhum produto encontrado</h5>
      <p class="text-muted">Não há produtos disponíveis nesta categoria no momento.</p>
    </div>
  </div>
</template>

<script setup>
import ProdutoCard from './ProdutoCard.vue';

defineProps(['produtos', 'paginaAtual', 'totalPaginas', 'loading', 'error']);
defineEmits(['mudarPagina']);
</script>
