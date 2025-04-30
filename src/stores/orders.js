import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import useAuthStore from '@/stores/auth';

const api = axios.create({
  baseURL: 'http://35.196.79.227:8000/',
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  } else {
    const adminToken = import.meta.env.VITE_ADMIN_TOKEN;
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  return config;
});

export const useOrderStore = defineStore('order', () => {
  const orders = ref([]);
  const coupons = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchOrders() {
    loading.value = true;
    try {
      const resp = await api.get('orders/');
      orders.value = resp.data;
    } catch (err) {
      error.value = err;
      console.error('Erro ao buscar pedidos:', err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchAllOrders() {
    loading.value = true;
    try {
      const resp = await api.get('orders/all');
      orders.value = resp.data;
    } catch (err) {
      error.value = err;
      console.error('Erro ao buscar todos os pedidos:', err);
    } finally {
      loading.value = false;
    }
  }

  async function deleteOrder(id) {
    try {
      await api.delete(`orders/${id}`);
      orders.value = orders.value.filter(order => order.id !== id);
    } catch (err) {
      error.value = err;
      console.error('Erro ao deletar pedido:', err);
    }
  }

  async function updateOrder(order) {
    try {
      const resp = await api.put('orders/', order);
      return resp.data;
    } catch (err) {
      error.value = err;
      console.error('Erro ao atualizar pedido:', err);
    }
  }

  async function fetchCoupons() {
    try {
      const resp = await api.get('coupons/');
      coupons.value = resp.data;
    } catch (err) {
      error.value = err;
      console.error('Erro ao buscar cupons:', err);
    }
  }

  return {
    orders,
    coupons,
    loading,
    error,
    fetchOrders,
    fetchAllOrders,
    deleteOrder,
    updateOrder,
    fetchCoupons,
  };
});
