<script setup>
defineProps(['categorias', 'categoriaSelecionada', 'paginaAtual', 'totalPaginas']);
defineEmits(['selecionarCategoria', 'mudarPagina']);
</script>

<template>
  <div>
    <div class="d-flex flex-wrap">
      <div v-for="cat in categorias" :key="cat.id" class="col-md-3 mb-2">
        <button class="btn w-100" :class="categoriaSelecionada === cat.id ? 'btn-primary' : 'btn-outline-primary'"
          @click="$emit('selecionarCategoria', cat.id)">
          {{ cat.name }}
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
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
</template>
