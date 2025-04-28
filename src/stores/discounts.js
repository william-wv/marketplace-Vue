import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getDiscounts, postDiscounts, putDiscounts, delDiscounts } from '@/services/apiDiscounts.js';

export const useDiscountsStore = defineStore('discounts', () => {
  const discounts = ref([]);
  const loading = ref(false);

  async function fetchDiscounts() {
    loading.value = true;
    const data = await getDiscounts();
    discounts.value = data;
    loading.value = false;
  }

  async function createDiscount(newDiscount) {
    loading.value = true;
    const created = await postDiscounts(newDiscount);
    discounts.value.push(created);
    loading.value = false;
  }

  async function updateDiscount(id, updatedDiscount) {
    loading.value = true;
    const updated = await putDiscounts(id, updatedDiscount);
    const index = discounts.value.findIndex(d => d.id === id);
    if (index !== -1) {
      discounts.value[index] = updated;
    }
    loading.value = false;
  }

  async function deleteDiscount(id) {
    loading.value = true;
    await delDiscounts(id);
    discounts.value = discounts.value.filter(d => d.id !== id);
    loading.value = false;
  }

  return {
    discounts,
    loading,
    fetchDiscounts,
    createDiscount,
    updateDiscount,
    deleteDiscount,
  };
},{persist:true});
