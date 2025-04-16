import api from './api';
import { useAuthStore } from '@/stores/useAuthStore';

export async function loginUser(email, password) {
  const authStore = useAuthStore();

  try {
    const response = await api.post('/login', { email, password });
    const { token, user } = response.data;

    authStore.setToken(token);
    authStore.setUser(user);

    return true;
  } catch (err) {
    console.error('Login falhou:', err);
    return false;
  }
}
