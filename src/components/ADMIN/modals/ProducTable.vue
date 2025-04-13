<script setup>
import ProductRow from './ProductRow.vue';
defineProps(['produtos']);
const emit = defineEmits(['editar', 'deletar']);

</script>

<template>
  <table class="w-100 border-collapse">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-3 text-center">ID</th>
        <th class="p-3">Produto</th>
        <th class="p-3 text-center">Categoria</th>
        <th class="p-3 text-center">Stock</th>
        <th class="p-3 text-center">Status</th>
        <th class="p-3 text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <ProductRow v-for="produtos in produtos" 
        :key="produtos.id"
        :produtos="produtos"
        @editar="emit('editar', $event)" 
        @deletar="emit('deletar', $event)" 
        />
    </tbody>
  </table>
</template>
