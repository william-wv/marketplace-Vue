<script setup>
import { ref } from 'vue';
import CategoryDropdown from './Dropdown.vue';

defineProps(['categoria']);
const emit = defineEmits(['editar', 'deletar']);
const showDropdown = ref(false);
</script>

<template>
  <tr class="border position-relative">
    <td class="p-3 text-center">{{ categoria.id }}</td>
    <td class="p-3">{{ categoria.name }}</td>
    <td class="p-3">{{ categoria.description }}</td>
    <td class="p-3 text-center"></td>
    <td class="p-3 text-center">
      <span class="bg-success bg-gradient rounded-pill text-white p-2">
        <i class="bi bi-check-circle animate-pulse"></i>
      </span>
    </td>
    <td class="p-3 text-center">
      <i class="fs-4 bi bi-three-dots" role="button" @click="showDropdown = !showDropdown"></i>
      <CategoryDropdown
        v-if="showDropdown"
        @editar="emit('editar', categoria)"
        @deletar="emit('deletar', categoria)"
      />
    </td>
  </tr>
</template>
