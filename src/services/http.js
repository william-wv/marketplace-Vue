import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://34.138.111.33:8000/',
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQyNDA0NjMyfQ.jCfO_oGDTkmFCx3tjeZsW3BcVyLbyXwhyWc4PzX2ieo';

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





