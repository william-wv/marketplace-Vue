<script setup>
import { ref } from 'vue';
import CategoryDropdown from './Dropdown.vue';

defineProps(['produtos']);
const emit = defineEmits(['editar', 'deletar']);
const showDropdown = ref(false);
</script>

<template>
  <tr class="border position-relative">
    <td class="p-3 text-center">{{ produtos.id }}</td>
    <td class="p-3">{{ produtos.name }}</td>
    <td class="p-3 text-center">{{ produtos.category.id }}</td>
    <td class="p-3 text-center">{{ produtos.stock }}</td>
    <td class="p-3 text-center">
      <span class="bg-success bg-gradient rounded-pill text-white p-2">
        <i class="bi bi-check-circle animate-pulse"></i>
      </span>
    </td>
    <td class="p-3 text-center">
      <i class="fs-4 bi bi-three-dots" role="button" @click="showDropdown = !showDropdown"></i>
      <CategoryDropdown
        v-if="showDropdown"
        @editar="emit('editar', produtos)"
        @deletar="emit('deletar', produtos)"
      />
    </td>
  </tr>
</template>
