<script setup>
import InnputName from '@/components/common/InnputName.vue';

defineProps(['produto']);
defineEmits(['salvar', 'fechar']);
</script>

<template>
  <!-- Backdrop -->
  <div class="modal-backdrop" @click="$emit('fechar')">
    <!-- Modal -->
    <div class="modal-content" @click.stop>
      <h2>Editar produto</h2>  
      <span class="text-primary"><h3 class="fs-6">{{ produto.name }}</h3></span>
      <InnputName v-model="produto.name" :icon="'bi bi-box'" />
      <InnputName v-model="produto.description" :icon="'bi bi-list'" />

      <div class="botoes">
        <button @click="$emit('fechar')">Cancelar</button>
        <button @click="$emit('salvar', produto)">Salvar</button> <!-- Passando dados do produto ao salvar -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal */
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 50svw;
  z-index: 1001;
  position: relative;
}

/* Estilos dos botões */
.botoes {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>
