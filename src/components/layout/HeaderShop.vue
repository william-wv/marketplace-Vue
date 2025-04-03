<script setup>
import { ref } from 'vue';

const selectedItem = ref(null);

function selecionarItem(index) {
  selectedItem.value = index;
}
</script>

<template>
  <header>
    <nav>
      <ul class="d-flex justify-content-between m-0 p-0">
        <li 
          v-for="(item, index) in ['Carrinho', 'Comprar novamente', 'Continuar Comprando']" 
          :key="index"
          @click="selecionarItem(index)"
          :class="{ 'selected': selectedItem === index }"
          class="li-item"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: var(--Blue-700);
  font-size: 0.8rem;
  border-radius: 20px;
}

ul {
  padding: 10px !important;
}

.li-item {
  padding: 10px;
  cursor: pointer;
  transition: border 0.3s ease;
}

.selected {
  border-radius: 10px;
  background-color: var(--Blue-500); 
}
</style>
