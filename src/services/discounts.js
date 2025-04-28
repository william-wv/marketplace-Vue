import axios from 'axios';
import { useAuthStore } from '@/stores/auth.js';

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

// Função GET
export async function getDiscounts() {
  try {
    const resp = await api.get('discounts/');
    return resp.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Função POST (envia dados)
export async function postDiscounts(data) {
  try {
    const resp = await api.post('discounts/', data);
    return resp.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Função PUT (atualiza desconto pelo ID)
export async function putDiscounts(id, data) {
  try {
    const resp = await api.put(`discounts/${id}/`, data);
    return resp.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Função DELETE (deleta desconto pelo ID)
export async function delDiscounts(id) {
  try {
    const resp = await api.delete(`discounts/${id}/`);
    return resp.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
