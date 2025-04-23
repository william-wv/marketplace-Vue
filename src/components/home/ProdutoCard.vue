<template>
  <div class="card h-100 shadow-sm">
    <img :src="getImageUrl(prod.image_path)" class="card-img-top" alt="Imagem do produto"
      style="object-fit: cover; height: 200px;" />
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title">{{ prod.name }}</h5>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <span class="text-success fw-bold">{{ converterParaDolar(prod.price) }}</span>
        <i :class="favoritos[prod.id] ? 'bi-heart-fill text-danger' : 'bi-heart'" style="cursor: pointer;"
          @click="ativeFav(prod.id)"></i>
      </div>
    </div>
    <div class="card-footer bg-transparent border-top-0 text-center">
      <button class="btn w-100" :class="carrinho[prod.id] ? 'btn-danger' : 'btn-success'"
        @click="toggleCarrinho(prod)">
        <i :class="carrinho[prod.id] ? 'bi bi-cart-dash' : 'bi bi-cart'"></i>
        {{ carrinho[prod.id] ? 'Remover do Carrinho' : 'Adicionar ao Carrinho' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { getImageUrl } from '@/services/http.js';
import { useStore } from '@/stores/produtos';

const store = useStore();

const props = defineProps(['prod']);

const favoritos = store.favoritos;
const carrinho = store.carrinho;
const ativeFav = store.ativeFav;
const toggleCarrinho = store.toggleCarrinho;
const converterParaDolar = store.converterParaDolar;
</script>
