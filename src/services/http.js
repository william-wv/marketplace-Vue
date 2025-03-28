import axios from 'axios';


axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://34.138.111.33:8000/',
});

const user = 6

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQzMTM2NTI4fQ.kdLWUxaS_Bj3ypU6V7aCsbRaOqersEGWe5TeWw51RGE';

export async function getProd(){
  try {
    const response = await api.get(`products/user/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response;
  } catch (error) {
    console.error('Erro ao buscar dados ', error);
  }
}

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
    return response;
  } catch (error) {
    console.error(error)
    throw error;
  }
}


export const cartService = {
  async getCart() {
    return api.get('cart/', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },

  async createCart() {
    return api.post('cart/', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },

  async getCartItems() {
    return api.get('cart/items', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },

  async addItemToCart(payload) {
    return api.post('cart/items', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },

  // async updateCartItem(item) {
  //   return api.put('cart/items', item, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // },

  async removeCartItem(productId, quantity, unitPrice) {
    return api.delete('cart/items', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        product_id: productId,
        quantity: quantity,
        unit_price: unitPrice
      }
    });
  }
  ,

  async clearCart() {
    return api.delete('cart/clear', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
};
