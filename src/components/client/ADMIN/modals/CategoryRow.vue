<script setup>
import { onMounted, ref } from 'vue';
import CategoryDropdown from './Dropdown.vue';
import { getAddressById,  } from '@/services/http';



defineProps(['categoria']);
const emit = defineEmits(['editar', 'deletar']);
const showDropdown = ref(false);
</script>

<template>
  <tr class="border position-relative">
    <td class="p-3 text-center">{{ categoria.id }}</td>
    <td class="p-3">{{ categoria.name }}</td>
    <td class="p-3">{{ categoria.description }}</td>
<<<<<<< HEAD
    <td class="p-3 text-center"> 1 </td>
=======
    <td class="p-3 text-center"></td>
>>>>>>> e6a293dc410a255436b122eac0bfca4d7348d207
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
