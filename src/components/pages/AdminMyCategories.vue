<script setup>
import { ref, onMounted } from 'vue';
import { getCategories, deleteCategory } from '@/services/http';
import ButtonComponent from '../common/ButtonComponent.vue';


const loading = ref(false);
const categorias = ref([]);
const categoriaSelecionada = ref(null);
const produtos = ref([]);


async function getCategoria() {
  loading.value = true;
  try {
    const response = await getCategories();
    categorias.value = response;
    console.log('Categorias carregadas:', categorias.value);
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
  } finally {
    loading.value = false;
  }
}



async function deleteCategoria(id) {
  if (!id) return;

  loading.value = true;
  try {
    await deleteCategory(id);
    categorias.value = categorias.value.filter(cat => cat.id !== id);

    if (categoriaSelecionada.value === id) {
      categoriaSelecionada.value = null;
      produtos.value = [];
    }
  } catch (err) {
    console.error('Erro ao excluir categoria:', err);
  } finally {
    loading.value = false;
  }
}


onMounted(() => {
  getCategoria();
});


</script>

<template>

  <main>
    <section v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </section>

    <section v-else>
      <div class="my-categories">
        <h1 class="text-center mb-3">Minhas <br> Categorias</h1>

        <div v-if="categorias.length === 0">
          <p>Nenhuma categoria encontrada.</p>
        </div>

        <div v-else>
          <div v-for="cat in categorias" :key="cat.id" class=" card d-flex col-12">
      
              <p class="text-center p-1" style="color: black;">Nome: {{ cat.name }}</p>
              
              <ButtonComponent
              @click="deleteCategoria(cat.id)"
              :title="'Remover'"
              :style="'blue'"
              :icon="''"
              />
    
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  background-color: var(--White-000) !important;
  padding: 0!important;
}

button {
  padding: 0 !important;
}
.card {
  margin-bottom: 1rem !important;
  background-color: var(--White-FFF);
  border-radius: 4px;
}
</style>
