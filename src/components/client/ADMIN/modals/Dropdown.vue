<script setup>
defineProps(['produto']);
defineEmits(['editar', 'deletar']);
</script>

<template>
  <div class="position-absolute bg-white border rounded shadow p-1" style="z-index: 100; right: 60px;">
    <div class="d-flex flex-column gap-2">
      <h4 class="mb-2">Ações</h4>
      <i class="fs-5 bi bi-pen p-1" role="button" @click="$emit('editar')"> Editar </i>
      <i class="fs-5 bi bi-trash p-1 text-danger" role="button" @click="$emit('deletar')"> Deletar </i>
    </div>
  </div>
</template>

<style scoped>
i:hover {
  background-color: var(--foregraund-w);
  border-radius: 10px;
}
</style>
