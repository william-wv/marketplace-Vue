import axios from 'axios';

// Criação de uma instância do Axios
const api = axios.create({
  baseURL: 'http://35.196.79.227:8000/',
});

// Token para autenticação
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQ0NTk2ODE2fQ.fbvDjv5nffkMSoA1vra7Gu8NO2m5sDzgFjoFBHioU9E';

// Interceptor para injetar o token antes de cada requisição
api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ID do usuário (fixo)
const userId = 6;

// ------ FUNÇÕES DE AUTENTICAÇÃO ------
export async function login(payload) {
  try {
    const response = await api.post('login', payload);
    return response;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
}

export async function register(payload) {
  try {
    const response = await api.post('register', payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
}

// ------ FUNÇÕES DE PRODUTO ------
export async function getProd() {
  try {
    const response = await api.get(`products/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
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
    console.error('Erro ao cadastrar produto:', error);
    throw error;
  }
}

export async function deleteProd(id) {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
}

export async function editStock(id) {
  try {
    const response = await api.put(`products/${id}/stock`);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error);
    throw error;
  }
}

export async function getProductsByCategory(id) {
  try {
    const response = await api.get(`products/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    throw error;
  }
}

export async function getImgProd(img) {
  try {
    const response = await api.get(`upload/products/${img}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar imagem do produto:', error);
    throw error;
  }
}

// ------ FUNÇÕES DE CATEGORIA ------
export async function getCategories() {
  try {
    const response = await api.get(`categories/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
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
    throw error;
  }
}

export async function updateCategory(id, dados) {
  try {
    const response = await api.put(`/categories/${id}`, {
      name: dados.name,
      description: dados.description,
    });
    return response;
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
}

// ------ FUNÇÕES DE IMAGEM ------
export function getImageUrl(imagePath) {
  if (!imagePath) {
    return '/placeholder.jpg';
  }
  return `http://35.196.79.227:8000${imagePath.startsWith('/uploads/products/') ? imagePath : `/uploads/products/${imagePath}`}`;
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