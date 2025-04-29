<script setup>
import { ref } from 'vue';
import Dropdown from './Dropdown.vue';

const props = defineProps(['produto']);
const emit = defineEmits(['editar', 'deletar']);
const showDropdown = ref(false);
</script>

<template>
  <tr class="border position-relative">
    <td class="p-3 text-center">{{ produto.id }}</td>
    <td class="p-3">{{ produto.name }}</td>
    <td class="p-3 text-center">{{ produto.category.name }}</td>
    <td class="p-3 text-center">{{ produto.stock }}</td>
    <td class="p-3 text-center">
      <span class="bg-success bg-gradient rounded-pill text-white p-2">
        <i class="bi bi-check-circle animate-pulse"></i>
      </span>
    </td>
    <td class="p-3 text-center">
      <i class="fs-4 bi bi-three-dots" role="button" @click="showDropdown = !showDropdown"></i>
      <Dropdown
        v-if="showDropdown"
        @editar="emit('editar', produto)"
        @deletar="emit('deletar', produto)"
      />
    </td>
  </tr>
</template>
