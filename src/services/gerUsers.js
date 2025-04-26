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

export async function updateImage(payload) {
  try {
    const response = await api.put("users/image" , payload, {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export async function getUser(params) {
  try {
    const resp = await api.get('users/me')   
    return resp.data 
  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(params) {
  try {
    const resp = await api.put('users/me')   
    return resp.data 
  } catch (error) {
    console.log(error)
  }
}

export async function updateImageProfile(params) {
  try {
    const resp = await api.put('users/image')   
    return resp.data 
  } catch (error) {
    console.log(error)
  }
}

export async function deleteUser(params) {
  try {
    const resp = await api.delete('users/me')   
    return resp.data 
  } catch (error) {
    console.log(error)
  }
}

