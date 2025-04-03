import { defineStore } from "pinia";
import { postProd, getProductsByCategory, getCategories } from "@/services/http";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    produtos: [],
    categorias: [],
    loading: false,
  }),

  actions: {
    async getProdutosPorCategoria(idCateg) {
      if (!idCateg) return;
      this.loading = true;
      try {
        const response = await getProductsByCategory(idCateg);
        this.produtos = response;
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        this.loading = false;
      }
    },

    async getCategoria() {
      this.loading = true;
      try {
        const response = await getCategories();
        this.categorias = response;
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      } finally {
        this.loading = false;
      }
    },

    async enviarProd(produto) {
      try {
        const formData = new FormData();
        formData.append("name", produto.name);
        formData.append("description", produto.description || "");
        formData.append("price", produto.price);
        formData.append("stock", produto.stock);
        formData.append("category_id", produto.category_id);

        if (produto.image) {
          formData.append("image", produto.image);
        }

        const response = await postProd(formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.produtos.push(response);
        console.log("Produto adicionado:", response);
      } catch (e) {
        console.error("Erro ao enviar produto:", e);
      }
    },
  },
});
