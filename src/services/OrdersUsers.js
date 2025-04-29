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

export async function getOrders() {
  try {
    const resp = await api.get("orders/")
    return resp
  } catch (error) {
    console.log(error)
  }
}
export async function deleteOrders(id) {
  try {
    const resp = await api.delete(`orders/${id}`)
    return resp
  } catch (error) {
    console.log(error)
  }
}