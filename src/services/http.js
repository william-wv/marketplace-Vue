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
function authHeaders() {
  const authStore = useAuthStore();
  const token = authStore.token;

  return {
    'Authorization': `Bearer ${token}`
  };
}

// ID do usuário (fixo)
const userId = 6;

// ------ FUNÇÕES DE AUTENTICAÇÃO ------
export async function login(payload) {
  try {
    const response = await api.post('login', payload);
    const { token } = response.data;

    // Salva no Pinia (authStore)
    const authStore = useAuthStore();
    authStore.setToken(token);

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
    const response = await api.get(`products/`);
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

export async function putProd(id, payload) {
  try {
    const response = await api.put(`products/${id}`, payload);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
}




export async function editStock(id, payload) {
  try {
    const response = await api.put(`products/${id}/stock`, payload);
    return response;
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
    const response = await api.get(`categories/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
}

export async function getCategoriesWithImage() {
  try {
    const response = await api.get(`categories/`, {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    });
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
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}
// ---------- ADDRESS ----------------

export async function getAddress() {
  try {
    const response = await api.get(`/addresses/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
export async function criarEndereco(endereco) {
  const response = await api.post('/addresses/', endereco)
  return response.data
}

export async function getAddressById(addressId) {
  const response = await api.get(`/addresses/${addressId}`);
  return response;
}

export async function deleteAddress(id) {
  const response = await api.delete(`/addresses/${id}`);
  return response;
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
      console.error('Erro ao adicionar item ao carrinho:', error);
    }
  },

  async removeCartItem(productId) {
    try {
      const resp = await api.delete('/cart/items', {
        data: { product_id: productId }
      });
      return resp;
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      throw error;
    }
  },

  async clearCart() {
    return api.delete('cart/clear');
  },
};


// orders
export async function postOrders(order) {
  try {
    const reponse = await api.post('orders/', order, {
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json'
      }
    })
    return reponse
  } catch (error) {
    console.log(error)
  }
}

export async function putOrders(id_Order, payload) {
  try {
    const reponse = await api.put(`orders/${id_Order}`, payload, {
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json'
      }
    })
    return reponse
  } catch (error) {
    console.log(error)
  }
}


export async function getOrdersById(id_Order) {
  try{
    const response = await api.get(`orders/${id_Order}`, {
      headers: {
        ...authHeaders(),
        'Content-Type': 'application/json'
      }
    }) 
  return response.data
  } catch(e){
    console.log(e)
  }
}

export default api