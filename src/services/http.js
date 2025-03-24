import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://34.138.111.33:8000/',
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQyOTExMjUyfQ.HtK6-hdppyUH-n8Ngz4yXhe1LpYha5J13FA7w28IyRA';

export async function getCategories(){
  try {
    const response = await api.get('categories/', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados ', error);
  }
}

export async function login(payload) {
  try {
      const response = await api.post('login', payload)
      return response
  }
  catch (error) {
      console.log(error.response.data)
  }
}

export async function register(payload) {
  try {
    const response = await api.post('register', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      } 
    })
    login(payload)
  } catch (error) {
    console.error(error)
    throw error;
  }
}

