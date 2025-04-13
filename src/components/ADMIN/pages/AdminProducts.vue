<script setup>
import { ref , onMounted } from 'vue';
import ProducTable from '../modals/ProducTable.vue';
// import ProductModal from '../modals/ProductModal.vue';
import { deleteProd, getProd } from '@/services/http';

const produtos = ref([])
const mostrarModal = ref(false)

// async function pegandoProd(){
// try {
//   const response = await getProd()
//   products.value = response
//   console.log(products.value)
// } catch (e) {
//   console.log(e)
// }
// } 

const pegandoProd = async () => {
  produtos.value = await getProd();
};

const abrirModalEditar = () => {
  mostrarModal.value = true;
};

// const salvarEdicao = async (product) => {
//   console.log(product)
//   try {
//     await updateProd(product.id, product);
//     await carregarProdutos();
//   } catch (e) {
//     console.error('Erro ao salvar a categoria:', e);
//   }
//   mostrarModal.value = false;
// };

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

      <!-- <ProductModal  
        v-if="mostrarModal" 
        :products="produtoSelecionada"
       @salvar="salvarEdicao(categoriaSelecionada)" 
       @fechar="mostrarModal = false" 
       /> -->
    </div>
  </main>
</template>

<style scoped>
.h-90 {
  height: 70vh;
}

</style>