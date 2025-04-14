<script setup>
import { ref, onMounted, watch } from "vue";
import { useProductStore } from "@/stores/postProducts";
import InputName from "@/components/common/InnputName.vue";
import InputPrice from "@/components/common/InputNumber.vue";
import InputImage from "@/components/common/InputImage.vue";
import ButtonComponent from "@/components/common/ButtonComponent.vue";

const productStore = useProductStore();

// Refs do formulário
const categoriaSelecionada = ref('');
const nome = ref("");
const desc = ref("");
const preco = ref(0);
const stock = ref(0);
const imagemSelecionada = ref(null);
const imagemPreview = ref(null);

// Buscar categorias ao carregar componente
onMounted(async () => {
  try {
    const categorias = await productStore.getCategoria(); // <-- Método na store
    console.log(categorias)
  } catch (e) {
    console.error("Erro ao buscar categorias:", e);
  }
});

// Reagir à mudança de categoria
watch(categoriaSelecionada, async (novaCategoria) => {
  if (novaCategoria) {
    await productStore.getProdutosPorCategoria(novaCategoria);
  }
});

// Função de upload de imagem
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    imagemSelecionada.value = file;
    imagemPreview.value = URL.createObjectURL(file);
  }
}

// Função para enviar o produto
async function enviarProd() {
  const produto = {
    name: nome.value,
    description: desc.value || null,
    price: Number(preco.value),
    stock: parseInt(stock.value),
    category_id: parseInt(categoriaSelecionada.value),
    image: imagemSelecionada.value || null,
  };

  // Verificando os dados antes de enviar
  console.log('Produto que será enviado:', produto);

  // Enviar produto
  await productStore.enviarProd(produto);

}
</script>

<template>
  <div class="bg-white p-0 m-0">
    <RouterLink class="m-3 " to="/dashboard/edit/admin/products">
    <i class="bi bi-arrow-left-short fs-1"></i> 
  </RouterLink>
  </div>
    
  <main class="d-flex justify-content-center align-items-center min-vh-100 bg-light"> 
    
    <div class="card p-4 shadow-lg" style="width: 100%; max-width: 600px;">
      <h1 class="text-center mb-4 fw-bold text-primary">Cadastrar Produto</h1>

      <div class="mb-3">
        <label for="categoria" class="form-label fw-semibold">Escolha uma categoria:</label>
        <select
          class="form-select"
          v-model="categoriaSelecionada"
          id="categoria"
          :disabled="productStore.loading"
        >
          <option disabled value="">Selecione uma categoria</option>
          <option
            v-for="ctg in productStore.categorias"
            :key="ctg.id"
            :value="ctg.id"
          >
            {{ ctg.name }}
          </option>
        </select>
      </div>

      <form @submit.prevent="enviarProd" class="d-flex flex-column gap-3">
        <InputName v-model="nome" :step-name="'Nome do Produto'" :icon="'bi bi-type-h1'"/>
        <InputName v-model="desc" :step-name="'Descrição do Produto'":icon="'bi bi-type-h2'" />
        <InputPrice v-model="preco" :step-name="'Preço do Produto'" :icon="'bi bi-123'"/>
        <InputPrice v-model="stock" :step-name="'Estoque do Produto'" :icon="'bi bi-file-earmark-richtext-fill'"/>

        <InputImage
          :step-name="'Imagem do Produto'"
          v-model="imagemSelecionada"
          @change="handleImageUpload"
        />

        <div v-if="imagemPreview" class="text-center">
          <h5 class="mt-3">Pré-visualização:</h5>
          <img
            :src="imagemPreview"
            alt="Pré-visualização da imagem"
            class="img-thumbnail mt-2"
            style="max-width: 250px;"
          />
        </div>

        <div class="d-grid mt-4">
          <ButtonComponent :title="'Adicionar Produto'" :style="'blue'" />
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>

</style>
