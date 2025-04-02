<script setup>
import { ref, onMounted } from 'vue';
import { getCategories, deleteCategory } from '@/services/http';

const loading = ref(false);
const categorias = ref([]);

async function getCategoria() {
  loading.value = true;
  try {
    const response = await getCategories();
    categorias.value = response;
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
  } finally {
    loading.value = false;
  }
}

async function deleteCategoria(id) {
  if (!id) return; // Evita chamadas sem ID

  loading.value = true;
  try {
    await deleteCategory(id);
    categorias.value = categorias.value.filter(cat => cat.id !== id); // Remove a categoria localmente
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
    <RouterLink class="m-2" to="/login">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>

    <section v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </section>

    <section v-else>
      <div class="my-categories pb-5">
        <h1>Minhas Categorias</h1>

        <div v-if="categorias.length === 0">
          <p>Nenhuma categoria encontrada.</p>
        </div>

        <div v-else>
          <div v-for="cat in categorias" :key="cat.id" class="d-flex justify-content-between">
            <div>
              <p style="color: black;">Nome: {{ cat.name }}</p>
              <p style="color: black;">Identificador: {{ cat.id }}</p>
            </div>
            <div>
              <button @click="deleteCategoria(cat.id)">Remover categoria</button>
            </div>
          </div>
        </div>

        <div class="">
          <RouterLink to="/categoriesModerator/categorias/criar">
            <button class="btn btn-primary">Adicionar Categoria</button>
          </RouterLink>
        </div>
      </div>

      <div class="myproducts">
        <h1>Meus Produtos</h1>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  background-color: var(--White-000) !important;
}
</style>
