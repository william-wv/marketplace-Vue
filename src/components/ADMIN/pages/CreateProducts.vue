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
  window.location.reload(); // Recarrega após adicionar
}
</script>

<template>
  <RouterLink class="m-2" to="/dashboard/edit/admin/products">
    <i class="bi bi-arrow-left-short"></i>
  </RouterLink>

  <main>
    <div class="myproducts">
      <h1 class="text-center">Create Product</h1>
    </div>

    <section class="d-flex justify-content-center align-items-center">
      <div>
        <div style="color: var(--White-100);" class="d-flex justify-content-between">
          <label for="categoria" class="form-label">Escolha uma categoria:</label>
          <select v-model="categoriaSelecionada" id="categoria" :disabled="productStore.loading">
            <option disabled value="">Selecione uma categoria</option>
            <option
              v-for="ctg in productStore.categorias"
              :key="ctg.id"
              :value="ctg.id"
              class="text-center"
            >
              {{ ctg.name }}
            </option>
          </select>
        </div>

        <form @submit.prevent="enviarProd" class="pt-4">
          <InputName v-model="nome" :step-name="'Nome do Produto'" />
          <InputName v-model="desc" :step-name="'Descrição do Produto'" />
          <InputPrice v-model="preco" :step-name="'Preço do Produto'" />
          <InputPrice v-model="stock" :step-name="'Stock do produto'" />

          <div>
            <InputImage
              :step-name="'Product Image'"
              v-model="imagemSelecionada"
              @change="handleImageUpload"
            />

            <div v-if="imagemPreview">
              <h4>Pré-visualização:</h4>
              <img :src="imagemPreview" alt="Pré-visualização da imagem" width="200" />
            </div>

            <ButtonComponent :title="'Add item'" :style="'blue'" />
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card {
  max-width: 600px;
  margin: 20px !important;
  padding: 10px !important;
  border: none;
  color: black !important;
}

select {
  width: 170px;
}
</style>
