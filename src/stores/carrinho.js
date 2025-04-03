
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.length,
  },

  actions: {
    addItem(payload) {
      this.items.push(payload);
    },
    removeItem(itemId) {
      this.items = this.items.filter(item => item.product_id !== itemId);
    }
  },
});
