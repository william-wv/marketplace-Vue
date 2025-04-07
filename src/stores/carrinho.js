import { cartService } from '@/services/http';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    carregandoCarrinho: false,
    total_amount: 0,
  }),

  getters: {
    totalItems: (state) => state.items.length,
  },

  actions: {
    async carregarCarrinho() {
      this.carregandoCarrinho = true;
      try {
        const response = await cartService.getCartItems();
        this.items = response.data.items;
        console.log('Carrinho carregado:', this.items);
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
      } finally {
        this.carregandoCarrinho = false; 
      }
    },

    async totalCart() {
      try {
        const response = await cartService.getCartItems();
        this.total_amount = response.data.total_amount;
        console.log('Pinia: Total do carrinho carregado:', this.total_amount);
      } catch (error) {
        console.error('Erro ao carregar o total do carrinho:', error);
      }
    },

    async excluirItem(produto) {
      try {
        await cartService.removeCartItem(produto.product_id, produto.quantity, produto.unit_price);
        this.items = this.items.filter(item => item.product_id !== produto.product_id);
        console.log(`Pinia: Item ${produto.product_id} removido com sucesso!`);
      } catch (error) {
        console.error('Erro ao excluir o item:', error);
      }
    },

    async limparCarrinho() {
      try {
        await cartService.clearCart();
        this.items = [];
        console.log('Carrinho limpo com sucesso!');
      } catch (error) {
        console.error('Erro ao limpar o carrinho:', error);
      }
    }
  }
}, { persist: true });
