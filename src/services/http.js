import axios from 'axios';
const api=axios.create({ baseURL: 'http://35.196.79.227:8000', });
const user = 6
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Iiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzQ0MzQ1MDMxfQ.v6XKbEy4ZYWgVZ--ax0Nwqu5-LPRMUvWHfhdGYP3JJw';

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
  export function getImageUrl(imagePath) {
    if (!imagePath) {
      return '/placeholder.jpg';
  }
  if (imagePath.startsWith('/uploads/products/')) {
    return `http://35.196.79.227:8000${imagePath}`;
  }
  return `http://35.196.79.227:8000/uploads/products/${imagePath}`;
}
export async function getProd(){
  try {
    const response = await api.get(`products/user/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response;
  } catch (error) {
    console.error('Erro ao buscar dados ', error);
  }
}
export async function postProd(payload){
  try {
    const response = await api.post('products/', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    })
    return response;
  } catch (error) {
    console.error('Erro ao cadastrar produto ', error);
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
export async function createCategory(payload){
  try {
    const response = await api.post('categories/', payload ,{
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function deleteCategory(id){
  try {
    const response =  await api.delete(`categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });  return response.data
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
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
    try {
      const response = await api.post(
        'cart/',
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao criar carrinho:', error);
      return null; // Retorna `null` para evitar quebrar a aplicação
    }
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

  async  addItemToCart(item) {
    try {
      return await api.post('cart/items', item, { 
        headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json', 
        }
      });
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error.response?.status, error.response?.data);
    }
  }
  ,

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
  },
};

export async function editStock(id){
  try{
    const response = await api.put(`products/${id}/stock`)
    return response.data
  } catch( e ) {
    console.log('error ao autualuzar: ', e)
  }
}