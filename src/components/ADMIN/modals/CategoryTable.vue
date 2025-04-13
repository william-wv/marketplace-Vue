<script setup>
import CategoryRow from './CategoryRow.vue';
defineProps(['categorias']);
const emit = defineEmits(['editar', 'deletar']);

</script>

<template>
  <table class="min-w-full border-collapse">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-3 text-center">ID</th>
        <th class="p-3">Nome</th>
        <th class="p-3">Descrição</th>
        <th class="p-3 text-center">Qtd</th>
        <th class="p-3 text-center">Status</th>
        <th class="p-3 text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <CategoryRow
        v-for="categoria in categorias"
        :key="categoria.id"
        :categoria="categoria"
        @editar="emit('editar', $event)"
        @deletar="emit('deletar', $event)"
      />
    </tbody>
  </table>
</template>
