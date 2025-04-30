<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/stores/produtos';
import { getImageUrl } from '@/services/http';

const route = useRoute();
const router = useRouter();
const store = useStore();

const produto = ref(null);
const carregando = ref(true);

onMounted(async () => {
  const id = parseInt(route.params.id);
  if (isNaN(id)) {
    console.error('ID inválido');
    router.push('/'); // ou para uma rota de erro
    return;
  }

  try {
    // Garante que os produtos estejam disponíveis
    if (store.produtos.length === 0) {
      await store.getProdutos();
    }

    produto.value = store.produtos.find(p => p.id === id);

    if (!produto.value) {
      console.warn('Produto não encontrado');
    }
  } catch (e) {
    console.error('Erro ao carregar produto:', e);
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <div v-if="carregando" class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-3">Carregando produto...</p>
  </div>

  <div v-else-if="produto" class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <img :src="getImageUrl(produto.image_path)" class="img-fluid" />
      </div>
      <div class="col-md-6">
        <h2>{{ produto.name }}</h2>
        <p>{{ produto.description }}</p>
        <h4 class="text-success">{{ store.converterParaDolar(produto.price) }}</h4>
        <button class="btn btn-primary" @click="store.toggleCarrinho(produto)">
          {{ store.carrinho[produto.id] ? 'Remover do carrinho' : 'Adicionar ao carrinho' }}
        </button>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5 text-danger">
    <i class="bi bi-exclamation-circle fs-1"></i>
    <h4 class="mt-3">Produto não encontrado</h4>
    <router-link to="/" class="btn btn-outline-primary mt-3">Voltar para a loja</router-link>
  </div>
</template>
