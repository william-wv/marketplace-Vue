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

export async function postMod(payload) {
  try {
    const resp  = api.post('users/create-moderator',payload , {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }) 
    
    return resp
  } catch (error) {
    console.log(error)
  }
}