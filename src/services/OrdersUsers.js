import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import useAuthStore from '@/stores/auth';

const api = axios.create({
  baseURL: 'http://35.196.79.227:8000/',
});
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  console.log(authStore.token)
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  } else {
    const adminToken = import.meta.env.VITE_ADMIN_TOKEN;
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  return config;
});

export const useOrderStore = defineStore('orderManage', () => {
  const orders = ref([]);
  const coupons = ref([]);

  async function fetchOrders() {
    try {
      const resp = await api.get('orders/');
      orders.value = resp.data;
      return resp;
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      throw error; 
    }
  }
  

  async function fetchAllOrders() {
    try {
      const resp = await api.get('orders/all');
      orders.value = resp.data;
    } catch (error) {
      console.error('Erro ao carregar todos os pedidos:', error);
    }
  }

  async function deleteOrder(id) {
    try {
      const resp = await api.delete(`orders/${id}`);
      await fetchOrders(); // ou fetchAllOrders() se necessário
      return resp;
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
    }
  }

  async function updateOrder(id, data) {
    try {
      const resp = await api.put(`orders/${id}`, data);
      await fetchOrders();
      return resp;
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  }

  async function fetchCoupons() {
    try {
      const resp = await api.get('coupons/');
      coupons.value = resp.data;
    } catch (error) {
      console.error('Erro ao carregar cupons:', error);
    }
  }

  return {
    orders,
    coupons,
    fetchOrders,
    fetchAllOrders,
    deleteOrder,
    updateOrder,
    fetchCoupons
  };
}, {
  persist: true, // Persistência ativada (por padrão usa localStorage)
});
