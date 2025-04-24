<script setup>
import { ref , onMounted } from 'vue';
import ProducTable from '../modals/ProducTable.vue';
// import ProductModal from '../modals/ProductModal.vue';
import { deleteProd, getProd } from '@/services/http';

const produtos = ref([])
const mostrarModal = ref(false)



const pegandoProd = async () => {
  produtos.value = await getProd();
};

const abrirModalEditar = () => {
  mostrarModal.value = true;
};

const deletarProduto = async (produtos) => {
  await deleteProd(produtos.id);
  await pegandoProd();
};

onMounted(() => {
  pegandoProd()
});
</script>

<template>

  <main>
    <div class=" bg-white h-90">
      <ProducTable 
      :produtos="produtos"
      @editar="abrirModalEditar"
      @deletar="deletarProduto" 
      />

  z
    </div>
  </main>
</template>

<style scoped>
.h-90 {
  height: 70vh;
}

</style>