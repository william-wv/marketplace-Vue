import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.196.79.227:8000/',
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQ0NTk2ODE2fQ.fbvDjv5nffkMSoA1vra7Gu8NO2m5sDzgFjoFBHioU9E'

// Interceptor para injetar o token antes de cada requisição
api.interceptors.request.use(
  config => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// ------ FUNÇÕES API --------
const user = 6;


export async function login(payload) {
  try {
    const response = await api.post('login', payload);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function register(payload) {
  try {
    const response = await api.post('register', payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getImageUrl(imagePath) {
  if (!imagePath) {
    return '/placeholder.jpg';
  }
  if (imagePath.startsWith('/uploads/products/')) {
    return `http://35.196.79.227:8000${imagePath}`;
  }
  return `http://35.196.79.227:8000/uploads/products/${imagePath}`;
}

export async function getProd() {
  try {
    const response = await api.get(`products/user/${user}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados ', error);
  }
}

export async function postProd(payload) {
  try {
    const response = await api.post('products/', payload, {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Erro ao cadastrar produto ', error);
  }
}

export async function getCategories() {
  try {
    const response = await api.get(`categories/user/${user}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados ', error);
  }
}

export async function getProductsByCategory(id) {
  try {
    const response = await api.get(`products/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos da categoria:', error);
    return [];
  }
}

export async function createCategory(payload) {
  try {
    const response = await api.post('categories/', payload, {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar categoria:', error);
    return null;
  }
}

export const updateCateg = async (id, dados) => {
  try {
    return await axios.put(`/categories/${id}`, {
      name: dados.name,
      description: dados.description
    });
  } catch (error) {
    console.log(error)
  }
};




export async function deleteCategory(id) {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
  }
}

export async function getImgProd(img) {
  try {
    const response = await api.get(`upload/products/${img}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar imagem do produto:', error);
    return null;
  }
}

// Carrinho
export const cartService = {
  
  async getCart() {
    return api.get('cart/');
  },

  async createCart() {
    try {
      const response = await api.post('cart/', {});
      return response.data;
    } catch (error) {
      console.error('Erro ao criar carrinho:', error);
      return null;
    }
  },

  async getCartItems() {
    return api.get('cart/items');
  },

  async addItemToCart(item) {
    try {
      return await api.post('cart/items', item);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error.response?.status, error.response?.data);
    }
  },

  async removeCartItem(productId, quantity, unitPrice) {
    return api.delete('cart/items', {
      data: {
        product_id: productId,
        quantity: quantity,
        unit_price: unitPrice
      }
    });
  },

  async clearCart() {
    return api.delete('cart/clear');
  },
};

export async function editStock(id) {
  try {
    const response = await api.put(`products/${id}/stock`);
    return response.data;
  } catch (e) {
    console.log('Erro ao atualizar estoque: ', e);
  }
}
