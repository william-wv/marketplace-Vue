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

export async function postCupon(payload) {
  try {
    const response = await api.post('coupons/', payload)
    return response
  } catch (error) {
    console.error('Erro ao criar cupom:', error.response?.data || error.message)
    return error.response
  }
}


export async function getCupons() {
  try {
    const response = await api.get('coupons/')
    return response
  } catch (error) {
    console.log(error)
  }
}