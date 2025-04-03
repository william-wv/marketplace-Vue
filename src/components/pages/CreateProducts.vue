<script setup>
import { onMounted, ref, watch } from "vue";
import { useProductStore } from "@/stores/postProducts";
import InputName from "../common/InnputName.vue";
import InputPrice from "../common/InputNumber.vue";
import InputImage from "../common/InputImage.vue";

const productStore = useProductStore();

const categoriaSelecionada = ref(null);
const nome = ref("");
const desc = ref("");
const preco = ref(0);
const stock = ref(0);
const imagemSelecionada = ref(null);
const imagemPreview = ref(null);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    imagemSelecionada.value = file;
    imagemPreview.value = URL.createObjectURL(file);
  }
}

async function enviarProd() {
  const produto = {
    name: nome.value,
    description: desc.value || null,
    price: Number(preco.value),
    stock: parseInt(stock.value),
    category_id: parseInt(categoriaSelecionada.value),
    image: imagemSelecionada.value || null,
  };

  await productStore.enviarProd(produto);

  window.location.reload()

}

watch(categoriaSelecionada, (newVal) => {
  productStore.getProdutosPorCategoria(newVal);
});

onMounted(() => {
  productStore.getCategoria();
});
</script>

<template>
  <div class="myproducts">
    <h1>Meus Produtos</h1>
  </div>

  <select v-model="categoriaSelecionada" id="categoria" :disabled="productStore.loading">
    <option value="">Escolha uma categoria</option>
    <option v-for="ctg in productStore.categorias" :key="ctg.id" :value="ctg.id">
      {{ ctg.name }}
    </option>
  </select>

  <section>
    <form @submit.prevent="enviarProd">
      <InputName v-model="nome" :step-name="'Nome do Produto'" />
      <InputName v-model="desc" :step-name="'Descrição do Produto'" />
      <InputPrice v-model="preco" :step-name="'Preço do Produto'" />
      <InputPrice v-model="stock" :step-name="'Stock do produto'" />

      <div>
        <label for="imagem">Escolha uma imagem:</label>
        <InputImage
          :step-name="'Product Image'"
          v-model="imagemSelecionada"
          @change="handleImageUpload"
        />
        <div v-if="imagemPreview">
          <h4>Pré-visualização:</h4>
          <img :src="imagemPreview" alt="Pré-visualização da imagem" width="200" />
        </div>
        <button type="submit" class="btn btn-primary">Adicionar Produto</button>
      </div>
    </form>
  </section>
</template>
