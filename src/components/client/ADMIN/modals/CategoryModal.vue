<script setup>
import InnputName from '@/components/common/InnputName.vue';

defineProps(['categoria']);
defineEmits(['salvar', 'fechar']);

// const salvar = () => {
//   emit('salvar', categoriaEditavel.value); // <- Emitindo os dados editados
// };
</script>

<template>
  <!-- Backdrop -->
  <div class="modal-backdrop" @click="$emit('fechar')">
    <!-- Modal -->
    <div class="modal-content" @click.stop>
      <h2>{{ categoria.id ? 'Editar Categoria' : 'Nova Categoria' }}</h2>
      <!-- < v-model="categoria.name" placeholder="Nome da categoria" /> -->
      <InnputName v-model="categoria.name" placeholder="Nome da categoria" :icon="'bi bi-box'"/>
      <InnputName v-model="categoria.description"  placeholder="Descrição da categoria" :icon="'bi bi-list'"/>

      <div class="botoes">
        <button @click="$emit('fechar')">Cancelar</button>
        <button @click="$emit('salvar')">Salvar</button>
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
  /* Fundo semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* Coloca o backdrop acima de outros elementos */
}

/* Modal */
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 50svw;
  z-index: 1001;
  /* Coloca o modal acima do backdrop */
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
