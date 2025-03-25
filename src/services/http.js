import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://34.138.111.33:8000/',
});

const user = 6

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQyODY2NjkxfQ.fYnidZkKq76sE4Sd1VvFgpWl4NKHya7kQ5G8hD3WlOU';

export async function getCategories(){
  try {
    const response = await api.get(`categories/user/${user}`, {
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
export async function getProductsByCategory(id) {
  try {
    const response = await api.get(`products/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos da categoria:', error);
    return [];
  }
}


export async function getImgProd(img) {
  try {
    const response = await api.get(`upload/products/${img}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar imagem do produto:', error);
    return null;
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
    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
}



